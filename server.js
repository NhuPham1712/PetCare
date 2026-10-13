import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { promisify } from 'node:util';
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

const app = express();
const PORT = 5000;
const scryptAsync = promisify(scrypt);

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString('hex');
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt}$${hash.toString('hex')}`;
};

const verifyPassword = async (password, storedPassword) => {
  if (!storedPassword?.startsWith('scrypt$')) return password === storedPassword;

  const [, salt, storedHash] = storedPassword.split('$');
  if (!salt || !storedHash) return false;
  const expectedHash = Buffer.from(storedHash, 'hex');
  const actualHash = await scryptAsync(password, salt, expectedHash.length);
  return expectedHash.length === actualHash.length && timingSafeEqual(expectedHash, actualHash);
};

const getDbSourceLabel = (config) => {
  if (!config || !config.host) return 'Unknown DB';
  const host = config.host.toLowerCase();
  if (host.includes('aiven') || host.includes('aivencloud')) return 'Aiven';
  if (host.includes('localhost') || host.includes('127.0.0.1')) return 'Local XAMPP';
  return 'Cloud MySQL';
};

app.use(cors());
app.use(express.json());

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
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email/số điện thoại và mật khẩu.' });
    }
    const [rows] = await pool.query(
      `SELECT * FROM users
       WHERE LOWER(username) = LOWER(?)
          OR LOWER(email) = LOWER(?)
          OR REPLACE(REPLACE(phone, ' ', ''), '-', '') = REPLACE(REPLACE(?, ' ', ''), '-', '')
       ORDER BY CASE
         WHEN REPLACE(REPLACE(phone, ' ', ''), '-', '') = REPLACE(REPLACE(?, ' ', ''), '-', '') THEN 0
         WHEN LOWER(email) = LOWER(?) THEN 1
         ELSE 2
       END
       LIMIT 1`,
      [username, username, username, username, username]
    );
    const user = rows[0];
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
    }
    if (role && user.role !== role) {
      return res.status(403).json({ success: false, message: 'Tài khoản không có quyền truy cập mục này.' });
    }

    if (!user.password.startsWith('scrypt$')) {
      await pool.query('UPDATE users SET password = ? WHERE id = ?', [await hashPassword(password), user.id]);
    }
    res.json({ success: true, user: { name: user.name, email: user.email, phone: user.phone, address: user.address, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/change-password', async (req, res) => {
  const { identifier, currentPassword, newPassword } = req.body;
  if (!identifier || !currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin; mật khẩu mới cần ít nhất 6 ký tự.' });
  }

  try {
    const [users] = await pool.query(
      'SELECT id, password FROM users WHERE (email = ? OR phone = ?) AND role = ? LIMIT 1',
      [identifier, identifier, 'customer']
    );
    if (users.length === 0 || !(await verifyPassword(currentPassword, users[0].password))) {
      return res.status(401).json({ message: 'Mật khẩu hiện tại không đúng hoặc tài khoản không tồn tại.' });
    }

    await pool.query('UPDATE users SET password = ? WHERE id = ?', [await hashPassword(newPassword), users[0].id]);
    res.json({ success: true, message: 'Đổi mật khẩu thành công.' });
  } catch (err) {
    console.error('Không thể đổi mật khẩu khách hàng:', err.message);
    res.status(500).json({ message: 'Không thể đổi mật khẩu lúc này. Vui lòng thử lại sau.' });
  }
});

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, phone, address, password, role } = req.body;
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !address?.trim() || !password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập đủ thông tin; mật khẩu cần ít nhất 6 ký tự.' });
    }
    if (role && role !== 'customer') {
      return res.status(400).json({ success: false, message: 'Không thể đăng ký tài khoản với quyền này.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    const [existingUsers] = await pool.query(
      `SELECT id FROM users
       WHERE LOWER(email) = ?
          OR REPLACE(REPLACE(phone, ' ', ''), '-', '') = REPLACE(REPLACE(?, ' ', ''), '-', '')
       LIMIT 1`,
      [normalizedEmail, normalizedPhone]
    );
    if (existingUsers.length > 0) {
      return res.status(409).json({ success: false, message: 'Email hoặc số điện thoại đã được đăng ký.' });
    }

    const username = normalizedEmail;
    await pool.query(
      'INSERT INTO users (username, name, email, phone, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, name.trim(), normalizedEmail, normalizedPhone, address.trim(), 'customer', await hashPassword(password)]
    );
    res.status(201).json({ success: true, message: 'Đã tạo tài khoản khách hàng.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Email hoặc số điện thoại đã được đăng ký.' });
    }
    res.status(500).json({ error: err.message });
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
