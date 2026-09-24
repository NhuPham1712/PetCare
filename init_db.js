import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'petcare_db',
  port: 3307
};

async function seed() {
  try {
    console.log('🔌 Đang kết nối tới MySQL XAMPP Port 3307...');
    const conn = await mysql.createConnection(dbConfig);
    console.log('✅ Đã kết nối MySQL!');

    // Re-create users table with role & password columns
    await conn.query('DROP TABLE IF EXISTS users');

    await conn.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address TEXT NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer',
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Insert 3 Role Seed Accounts into MySQL
    await conn.query(`
      INSERT INTO users (username, name, email, phone, address, role, password) VALUES
      ('khachhang', 'Đặng Ngọc Nhuy', 'nhuy.petcare@gmail.com', '0988 777 888', '123 Đường Nguyễn Thị Minh Khai, P.6, Q.3, TP.HCM', 'customer', '123456'),
      ('bacsi', 'ThS. BS. Nguyễn Văn Minh', 'bs.minh@petcare.vn', '0909 123 456', 'Trung Tâm PetCare Q.3', 'staff', '123456'),
      ('admin', 'Quản Trị Viên PetCare', 'admin.manager@petcare.vn', '0988 777 999', 'Hệ Thống PetCare Center', 'admin', 'admin123');
    `);

    console.log('🎉 ĐÃ CẬP NHẬT THÀNH CÔNG BẢNG USERS VÀ NẠP NHAU 3 TÀI KHOẢN (KHACHHANG, BACSI, ADMIN) VÀO MYSQL XAMPP!');
    await conn.end();
  } catch (err) {
    console.error('❌ Lỗi khi nạp dữ liệu MySQL:', err.message);
  }
}

seed();
