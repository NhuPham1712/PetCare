import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

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

// Helper pool
let pool;

const initDb = async () => {
  try {
    // Enable SSL for Aiven Cloud MySQL if connecting to cloud
    const connectionOptions = { ...dbConfig };
    if (dbConfig.host && !dbConfig.host.includes('localhost') && !dbConfig.host.includes('127.0.0.1')) {
      connectionOptions.ssl = { rejectUnauthorized: false };
    }

    pool = mysql.createPool(connectionOptions);
    const connection = await pool.getConnection();
    console.log(`✅ Đã kết nối thành công tới CSDL MySQL tại ${dbConfig.host}:${dbConfig.port} (Database: ${dbConfig.database})`);
    connection.release();
  } catch (error) {
    console.error('❌ Chưa kết nối được MySQL:', error.message);
    console.log('👉 Vui lòng kiểm tra lại cấu hình thông tin trong file db_config.json!');
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
    endpoints: ['/api/health', '/api/pets', '/api/products', '/api/bookings', '/api/orders'] 
  });
});

// 1. Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    if (!pool) return res.json({ connected: false, message: 'MySQL Pool not initialized' });
    const [rows] = await pool.query('SELECT 1');
    res.json({ connected: true, message: `MySQL Server ${dbConfig.host}:${dbConfig.port} is active` });
  } catch (err) {
    res.json({ connected: false, error: err.message });
  }
});

// 1.5 USER AUTHENTICATION ENDPOINTS (Đăng Nhập & Đăng Ký Lưu CSDL)
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE (username = ? OR email = ? OR phone = ?) AND password = ?', [username, username, username, password]);
    if (rows.length > 0) {
      const user = rows[0];
      res.json({ success: true, user: { name: user.name, email: user.email, phone: user.phone, address: user.address, role: user.role } });
    } else {
      res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, phone, address, password, role } = req.body;
    const username = email.split('@')[0] || `user_${Date.now()}`;
    const userRole = role || 'customer';
    await pool.query('INSERT INTO users (username, name, email, phone, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, name, email, phone, address, userRole, password || '123456']);
    res.json({ success: true, message: 'Đã lưu tài khoản khách hàng mới vào CSDL MySQL' });
  } catch (err) {
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
