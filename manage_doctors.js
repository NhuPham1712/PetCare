import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { promisify } from 'node:util';
import { randomBytes, scrypt } from 'node:crypto';

const scryptAsync = promisify(scrypt);

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString('hex');
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt}$${hash.toString('hex')}`;
};

async function run() {
  const configFile = fs.readFileSync(path.resolve('./db_config.json'), 'utf8');
  const parsed = JSON.parse(configFile);
  const cloudConfig = {
    ...parsed.cloud,
    ssl: { rejectUnauthorized: false }
  };

  const conn = await mysql.createConnection(cloudConfig);
  console.log('✅ Kết nối thành công tới Aiven MySQL!');

  // 1. Delete all customer pets if any exist
  const [petsResult] = await conn.query('DELETE FROM customer_pets');
  console.log('🧹 Đã dọn dẹp các hồ sơ thú cưng tự tạo:', petsResult.affectedRows);

  // 2. Doctor / Staff accounts to create with password '123456'
  const doctors = [
    {
      username: 'bacsi',
      name: 'ThS. BS. Nguyễn Văn Minh',
      email: 'bs.minh@petcare.vn',
      phone: '0909123456',
      address: 'Khoa Y Tế & Phẫu Thuật Thú Y, PetCare Center',
      role: 'staff'
    },
    {
      username: 'bs.hoang',
      name: 'BS. Nguyễn Văn Hoàng',
      email: 'hoang.nguyen@petcare.com',
      phone: '0988123456',
      address: 'Khoa Bác Sĩ Thú Y Trưởng, PetCare Center',
      role: 'staff'
    },
    {
      username: 'bs.mai',
      name: 'BS. Trần Thị Mai',
      email: 'mai.tran@petcare.com',
      phone: '0977234567',
      address: 'Khoa Bác Sĩ Thú Y Chuyên Khoa, PetCare Center',
      role: 'staff'
    },
    {
      username: 'ktv.cuong',
      name: 'Lê Văn Cường',
      email: 'cuong.le@petcare.com',
      phone: '0966345678',
      address: 'Bộ Phận Kỹ Thuật Viên Spa & Grooming, PetCare Center',
      role: 'staff'
    },
    {
      username: 'nv.huong',
      name: 'Phạm Thị Hương',
      email: 'huong.pham@petcare.com',
      phone: '0955456789',
      address: 'Bộ Phận Lễ Tân & Chăm Sóc Khách Hàng, PetCare Center',
      role: 'staff'
    },
    {
      username: 'nv.tu',
      name: 'Ngô Minh Tú',
      email: 'tu.ngo@petcare.com',
      phone: '0944567890',
      address: 'Bộ Phận Vận Chuyển & Cấp Cứu Thú Cưng, PetCare Center',
      role: 'staff'
    }
  ];

  const defaultPassword = '123456';
  const hashedPassword = defaultPassword;

  for (const doc of doctors) {
    const [existing] = await conn.query(
      'SELECT id, username, email FROM users WHERE username = ? OR email = ? OR phone = ?',
      [doc.username, doc.email, doc.phone]
    );

    if (existing.length > 0) {
      await conn.query(
        'UPDATE users SET name = ?, email = ?, phone = ?, address = ?, role = ?, password = ? WHERE id = ?',
        [doc.name, doc.email, doc.phone, doc.address, doc.role, hashedPassword, existing[0].id]
      );
      console.log(`🔄 Đã cập nhật tài khoản Bác Sĩ: ${doc.name} (${doc.username} / ${doc.email}) - Mật khẩu: 123456`);
    } else {
      await conn.query(
        'INSERT INTO users (username, name, email, phone, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [doc.username, doc.name, doc.email, doc.phone, doc.address, doc.role, hashedPassword]
      );
      console.log(`✨ Đã tạo mới tài khoản Bác Sĩ: ${doc.name} (${doc.username} / ${doc.email}) - Mật khẩu: 123456`);
    }
  }

  // 3. Show all users in DB
  const [allUsers] = await conn.query('SELECT id, username, name, email, phone, role, created_at FROM users');
  console.log('\n--- TẤT CẢ TÀI KHOẢN TRONG CSDL AIVEN ---');
  console.table(allUsers);

  await conn.end();
}

run().catch(console.error);
