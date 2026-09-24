import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function initCloud() {
  const configFile = fs.readFileSync(path.resolve('./db_config.json'), 'utf8');
  const parsed = JSON.parse(configFile);
  const cloudConfig = {
    ...parsed.cloud,
    ssl: { rejectUnauthorized: false }
  };

  try {
    console.log(`🔌 Đang kết nối tới Aiven Cloud MySQL (${cloudConfig.host}:${cloudConfig.port})...`);
    const conn = await mysql.createConnection(cloudConfig);
    console.log('✅ Kết nối Aiven Cloud thành công!');

    // Recreate all tables
    await conn.query('DROP TABLE IF EXISTS users, pets, products, customer_pets, bookings, orders');

    // Create Users Table
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

    // Insert Users
    await conn.query(`
      INSERT INTO users (username, name, email, phone, address, role, password) VALUES
      ('khachhang', 'Đặng Ngọc Nhuy', 'nhuy.petcare@gmail.com', '0988 777 888', '123 Đường Nguyễn Thị Minh Khai, P.6, Q.3, TP.HCM', 'customer', '123456'),
      ('bacsi', 'ThS. BS. Nguyễn Văn Minh', 'bs.minh@petcare.vn', '0909 123 456', 'Trung Tâm PetCare Q.3', 'staff', '123456'),
      ('admin', 'Quản Trị Viên PetCare', 'admin.manager@petcare.vn', '0988 777 999', 'Hệ Thống PetCare Center', 'admin', 'admin123');
    `);

    // Create Pets Table
    await conn.query(`
      CREATE TABLE pets (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        species VARCHAR(50) NOT NULL,
        breed VARCHAR(100) NOT NULL,
        weight VARCHAR(50),
        weightCategory VARCHAR(50),
        gender VARCHAR(20),
        color VARCHAR(100),
        vaccination VARCHAR(100),
        origin VARCHAR(100),
        price DECIMAL(12, 2) NOT NULL,
        image TEXT,
        description TEXT,
        status VARCHAR(50) DEFAULT 'Còn hàng',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Insert Pets
    await conn.query(`
      INSERT INTO pets (id, name, species, breed, weight, weightCategory, gender, color, vaccination, origin, price, image, description) VALUES
      ('pet-01', 'Corgi Pembroke Chân Ngắn', 'Chó', 'Corgi Pembroke', '3.5 kg', '2-5kg', 'Đực', 'Vàng Trắng', '3 Mũi (Full + Dại)', 'Thuần chủng VKA', 14500000, 'https://images.unsplash.com/photo-1612536057832-2ff7ead7819c?auto=format&fit=crop&w=800&q=80', 'Bé Corgi đực mông trái tim siêu xinh, thần thái vui tươi, ăn uống rất khỏe, đã chích ngừa đầy đủ và kèm phả VKA.'),
      ('pet-02', 'Mèo Anh Lông Ngắn Silver Shaded', 'Mèo', 'British Shorthair', '2.1 kg', '2-5kg', 'Cái', 'Trắng Silver (NS11)', '2 Mũi', 'Nhập Khẩu Thái Lan', 12000000, 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80', 'Mèo Aln màu Silver cực quý phái, mắt xanh ngọc bảo, cực quấn người và thích được nũng nịu.'),
      ('pet-03', 'Poodle Teacup Nâu Đỏ', 'Chó', 'Poodle', '1.4 kg', '<2kg', 'Cái', 'Nâu Đỏ', '2 Mũi', 'Nhân Giống Tại Trại', 8500000, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80', 'Bé Poodle dòng Teacup siêu nhỏ gọn, lông xoăn tít không rụng lông, rất phù hợp nuôi căn hộ.');
    `);

    // Create Products Table
    await conn.query(`
      CREATE TABLE products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(12, 2) NOT NULL,
        rating DECIMAL(3, 1) DEFAULT 5.0,
        sold INT DEFAULT 0,
        image TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Insert Products
    await conn.query(`
      INSERT INTO products (id, name, category, price, rating, sold, image, description) VALUES
      ('prod-01', 'Thức Ăn Hạt Royal Canin Mini Adult (2kg)', 'Thức Ăn', 340000, 4.9, 420, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80', 'Hạt cao cấp dành riêng cho chó cỡ nhỏ, giàu dinh dưỡng, bảo vệ tim mạch và nâng cao chất lượng lông.'),
      ('prod-02', 'Pate Cấp Nước Chăm Sóc Thận Mèo Ciao Churu (Túi 10 thanh)', 'Thức Ăn', 110000, 5.0, 1250, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80', 'Thưởng số 1 cho mèo từ Nhật Bản, bổ sung hàm lượng nước giúp hỗ trợ tiết niệu và ngừa sỏi thận.');
    `);

    // Create Bookings Table
    await conn.query(`
      CREATE TABLE bookings (
        id VARCHAR(50) PRIMARY KEY,
        customerName VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        petName VARCHAR(255) NOT NULL,
        serviceCategory VARCHAR(100) NOT NULL,
        serviceName VARCHAR(255) NOT NULL,
        date VARCHAR(50) NOT NULL,
        transportMode VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Đã nhận',
        createdAt VARCHAR(50) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Create Orders Table
    await conn.query(`
      CREATE TABLE orders (
        id VARCHAR(50) PRIMARY KEY,
        customerName VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address TEXT NOT NULL,
        items_json TEXT NOT NULL,
        total DECIMAL(12, 2) NOT NULL,
        paymentMethod VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'Đã nhận đơn',
        createdAt VARCHAR(50) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('🎉 ĐÃ TẠO VÀ NẠP NHAU TOÀN BỘ CSDL LÊN AIVEN CLOUD THÀNH CÔNG!');
    await conn.end();
  } catch (err) {
    console.error('❌ Lỗi nạp Aiven Cloud:', err.message);
  }
}

initCloud();
