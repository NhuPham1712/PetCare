import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const app = express();
const PORT = 5000;

const getDbSourceLabel = (config) => {
  if (!config || !config.host) return 'Unknown DB';
  const host = config.host.toLowerCase();
  if (host.includes('aiven') || host.includes('aivencloud')) return 'Aiven';
  if (host.includes('localhost') || host.includes('127.0.0.1')) return 'Local XAMPP';
  return 'Cloud MySQL';
};

app.use(cors());
app.use(express.json());

const hashPassword = (password) => {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
};

const verifyPassword = (password, storedPassword) => {
  if (typeof storedPassword !== 'string') return false;
  const [scheme, salt, storedHash] = storedPassword.split('$');
  if (scheme !== 'scrypt') {
    const supplied = Buffer.from(password);
    const stored = Buffer.from(storedPassword);
    return supplied.length === stored.length && timingSafeEqual(supplied, stored);
  }
  if (!salt || !/^[a-f\d]{32}$/i.test(salt) || !storedHash || !/^[a-f\d]{128}$/i.test(storedHash)) return false;

  const expected = Buffer.from(storedHash, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
};

const getUserByIdentifier = async (identifier, role = 'customer') => {
  const normalizedPhone = String(identifier).replace(/\D/g, '');
  const [rows] = await pool.query(
    `SELECT * FROM users
     WHERE (username = ? OR email = ? OR phone = ?
       OR REPLACE(REPLACE(REPLACE(phone, ' ', ''), '-', ''), '+', '') = ?)
       AND role = ?
     LIMIT 1`,
    [identifier, identifier, identifier, normalizedPhone, role]
  );
  return rows[0];
};

// Load DB Config
let dbConfig;
try {
  const configFile = fs.readFileSync(path.resolve('./db_config.json'), 'utf8');
  const parsed = JSON.parse(configFile);
  if (parsed.useCloud) {
    dbConfig = parsed.cloud;
    console.log('☁️ Đang sử dụng cấu hình Cloud MySQL Online');
  } else {
    dbConfig = parsed.local;
    console.log('💻 Đang sử dụng cấu hình Local XAMPP MySQL (Port ' + dbConfig.port + ')');
  }
} catch (e) {
    dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petcare_db',
    port: 3307
  };
}

let pool;
let parsedConfig = null;

const initDb = async () => {
  try {
    const configFile = fs.readFileSync(path.resolve('./db_config.json'), 'utf8');
    parsedConfig = JSON.parse(configFile);
  } catch (e) {}

  try {
    const connectionOptions = { ...dbConfig };
    if (dbConfig.host && !dbConfig.host.includes('localhost') && !dbConfig.host.includes('127.0.0.1')) {
      connectionOptions.ssl = { rejectUnauthorized: false };
    }

    pool = mysql.createPool(connectionOptions);
    const connection = await pool.getConnection();
    console.log(`✅ Đã kết nối thành công tới CSDL MySQL tại ${dbConfig.host}:${dbConfig.port} (Database: ${dbConfig.database})`);
    connection.release();
  } catch (error) {
    console.warn('⚠️ Chưa kết nối được Cloud MySQL:', error.message);
    
    // Try auto-fallback to local XAMPP MySQL if cloud failed
    if (parsedConfig && parsedConfig.local) {
      console.log('🔄 Đang tự động chuyển sang CSDL Local XAMPP MySQL...');
      try {
        const localOpts = { ...parsedConfig.local };
        pool = mysql.createPool(localOpts);
        const connection = await pool.getConnection();
        console.log(`✅ Đã kết nối thành công tới Local XAMPP MySQL tại ${localOpts.host}:${localOpts.port}`);
        connection.release();
        return;
      } catch (err2) {
        console.warn('⚠️ CSDL Local XAMPP chưa bật hoặc chưa cài đặt.');
      }
    }

    console.log('💡 Ghi chú: Hệ thống Backend vẫn đang chạy API tại http://localhost:5000. Frontend Web chạy bình thường ở chế độ LocalStorage!');
  }
};

initDb();

// Root route handler
app.get('/', (req, res) => {
  res.json({ 
    status: 'ONLINE', 
    message: 'PetCare Center Express API đang hoạt động!', 
    dbHost: dbConfig.host,
    dbPort: dbConfig.port,
    dbSource: getDbSourceLabel(dbConfig),
    endpoints: ['/api/health', '/api/pets', '/api/products', '/api/bookings', '/api/orders'] 
  });
});

// 1. Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    if (!pool) return res.json({ connected: false, message: 'MySQL Pool not initialized', source: getDbSourceLabel(dbConfig) });
    const [rows] = await pool.query('SELECT 1');
    res.json({
      connected: true,
      source: getDbSourceLabel(dbConfig),
      message: `MySQL Server ${dbConfig.host}:${dbConfig.port} is active`
    });
  } catch (err) {
    res.json({ connected: false, error: err.message, source: getDbSourceLabel(dbConfig) });
  }
});

// 1.5 USER AUTHENTICATION ENDPOINTS (Đăng Nhập & Đăng Ký Lưu CSDL)
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string' || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tài khoản và mật khẩu.' });
    }
    if (!pool) return res.status(503).json({ success: false, message: 'Cơ sở dữ liệu hiện không khả dụng.' });

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE (username = ? OR email = ? OR phone = ?) AND role = ? LIMIT 1',
      [username.trim(), username.trim(), username.trim(), role || 'customer']
    );
    const user = rows[0];
    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Tài khoản hoặc mật khẩu không chính xác.' });
    }

    if (!String(user.password).startsWith('scrypt$')) {
      await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashPassword(password), user.id]);
    }
    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, address: user.address, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, phone, address, password, role } = req.body;
    if (role && role !== 'customer') {
      return res.status(400).json({ success: false, message: 'Không thể đăng ký tài khoản với vai trò này.' });
    }
    if (![name, email, phone, address, password].every(value => typeof value === 'string' && value.trim())) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin và mật khẩu.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Email không hợp lệ hoặc mật khẩu chưa đủ 8 ký tự.' });
    }
    if (!pool) return res.status(503).json({ success: false, message: 'Cơ sở dữ liệu hiện không khả dụng.' });

    const normalizedEmail = email.trim().toLowerCase();
    const username = normalizedEmail;
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR phone = ? OR username = ? LIMIT 1',
      [normalizedEmail, phone.trim(), username]
    );
    if (existing.length) {
      return res.status(409).json({ success: false, message: 'Email hoặc số điện thoại đã được đăng ký.' });
    }

    await pool.query(
      'INSERT INTO users (username, name, email, phone, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, name.trim(), normalizedEmail, phone.trim(), address.trim(), 'customer', hashPassword(password)]
    );
    res.status(201).json({ success: true, message: 'Tạo tài khoản thành công.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Email hoặc tên đăng nhập đã được sử dụng.' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/change-password', async (req, res) => {
  try {
    const { identifier, currentPassword, newPassword, role = 'customer' } = req.body;
    if (typeof identifier !== 'string' || typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return res.status(400).json({ success: false, message: 'Thông tin đổi mật khẩu không hợp lệ.' });
    }
    if (role !== 'customer' && role !== 'staff') {
      return res.status(400).json({ success: false, message: 'Chỉ tài khoản khách hàng và nhân viên được đổi mật khẩu tại đây.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới phải có ít nhất 8 ký tự.' });
    }
    if (newPassword === currentPassword) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới phải khác mật khẩu hiện tại.' });
    }
    if (!pool) return res.status(503).json({ success: false, message: 'Cơ sở dữ liệu hiện không khả dụng.' });

    const user = await getUserByIdentifier(identifier.trim(), role);
    if (!user || !verifyPassword(currentPassword, user.password)) {
      return res.status(401).json({ success: false, message: 'Mật khẩu hiện tại không chính xác.' });
    }

    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashPassword(newPassword), user.id]);
    return res.json({ success: true, message: 'Đổi mật khẩu thành công.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Không thể cập nhật mật khẩu. Vui lòng thử lại.' });
  }
});

// 2. GET & POST Pets (CSDL Thú Cưng)
app.get('/api/pets', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pets ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/pets', async (req, res) => {
  try {
    const p = req.body;
    const query = `INSERT INTO pets (id, name, species, breed, weight, weightCategory, gender, color, vaccination, origin, price, image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await pool.query(query, [p.id, p.name, p.species, p.breed, p.weight, p.weightCategory, p.gender, p.color, p.vaccination, p.origin, p.price, p.image, p.description]);
    res.json({ success: true, message: 'Đã thêm chó/mèo vào CSDL MySQL' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/pets/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pets WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Đã xóa chó/mèo khỏi CSDL MySQL' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET & POST Products (CSDL Thức Ăn & Phụ Kiện)
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const pr = req.body;
    const query = `INSERT INTO products (id, name, category, price, rating, sold, image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await pool.query(query, [pr.id, pr.name, pr.category, pr.price, pr.rating || 5.0, pr.sold || 0, pr.image, pr.description]);
    res.json({ success: true, message: 'Đã thêm sản phẩm vào CSDL MySQL' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. GET & POST Bookings (CSDL Lịch Hẹn Service)
app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings ORDER BY createdAt DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const b = req.body;
    const query = `INSERT INTO bookings (id, customerName, phone, petName, serviceCategory, serviceName, date, transportMode, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await pool.query(query, [b.id, b.customerName, b.phone, b.petName, b.serviceCategory, b.serviceName, b.date, b.transportMode, b.status || 'Đã nhận', b.createdAt]);
    res.json({ success: true, message: 'Đã lưu lịch hẹn vào CSDL MySQL' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  try {
    await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET & POST Orders (CSDL Đơn Hàng Mua Sắm)
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY createdAt DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const o = req.body;
    const query = `INSERT INTO orders (id, customerName, phone, address, items_json, total, paymentMethod, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await pool.query(query, [o.id, o.customerName, o.phone, o.address, JSON.stringify(o.items), o.total, o.paymentMethod, o.status || 'Đã nhận đơn', o.createdAt]);
    res.json({ success: true, message: 'Đã lưu đơn hàng vào CSDL MySQL' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend Express API đang chạy tại http://localhost:${PORT}`);
});
