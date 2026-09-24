-- SQL Schema Database for PetCare Center (Import into phpMyAdmin in XAMPP)
CREATE DATABASE IF NOT EXISTS `petcare_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `petcare_db`;

-- 1. Table Pets (CSDL Chó/Mèo Bán)
CREATE TABLE IF NOT EXISTS `pets` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `species` VARCHAR(50) NOT NULL,
  `breed` VARCHAR(100) NOT NULL,
  `weight` VARCHAR(50),
  `weightCategory` VARCHAR(50),
  `gender` VARCHAR(20),
  `color` VARCHAR(100),
  `vaccination` VARCHAR(100),
  `origin` VARCHAR(100),
  `price` DECIMAL(12, 2) NOT NULL,
  `image` TEXT,
  `description` TEXT,
  `status` VARCHAR(50) DEFAULT 'Còn hàng',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table Products (CSDL Thức Ăn & Đồ Dùng)
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
  `rating` DECIMAL(3, 1) DEFAULT 5.0,
  `sold` INT DEFAULT 0,
  `image` TEXT,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table Users (Lưu Trữ Tài Khoản & Phân Quyền MySQL)
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `address` TEXT NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'customer', -- 'customer', 'staff', 'admin'
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table Customer Pets (Lưu Trữ Thú Cưng Khách Hàng)
CREATE TABLE IF NOT EXISTS `customer_pets` (
  `id` VARCHAR(50) PRIMARY KEY,
  `user_phone` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `species` VARCHAR(50) NOT NULL,
  `breed` VARCHAR(100),
  `weight` VARCHAR(50),
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Table Bookings (Lịch Đặt Spa, Khám Bệnh & Lưu Trú)
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` VARCHAR(50) PRIMARY KEY,
  `customerName` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `petName` VARCHAR(255) NOT NULL,
  `serviceCategory` VARCHAR(100) NOT NULL,
  `serviceName` VARCHAR(255) NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `transportMode` VARCHAR(255) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Đã nhận',
  `createdAt` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Table Orders (Đơn Hàng Mua Thú Cưng & Sản Phẩm)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) PRIMARY KEY,
  `customerName` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `address` TEXT NOT NULL,
  `items_json` TEXT NOT NULL,
  `total` DECIMAL(12, 2) NOT NULL,
  `paymentMethod` VARCHAR(100) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Đã nhận đơn',
  `createdAt` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SEED DATA FOR USERS (Tài Khoản Phân Quyền)
INSERT INTO `users` (`username`, `name`, `email`, `phone`, `address`, `role`, `password`) VALUES
('khachhang', 'Đặng Ngọc Nhuy', 'nhuy.petcare@gmail.com', '0988 777 888', '123 Đường Nguyễn Thị Minh Khai, P.6, Q.3, TP.HCM', 'customer', '123456'),
('bacsi', 'ThS. BS. Nguyễn Văn Minh', 'bs.minh@petcare.vn', '0909 123 456', 'Trung Tâm PetCare Q.3', 'staff', '123456'),
('admin', 'Quản Trị Viên PetCare', 'admin.manager@petcare.vn', '0988 777 999', 'Hệ Thống PetCare Center', 'admin', 'admin123');

-- SEED DATA FOR PETS
INSERT INTO `pets` (`id`, `name`, `species`, `breed`, `weight`, `weightCategory`, `gender`, `color`, `vaccination`, `origin`, `price`, `image`, `description`) VALUES
('pet-01', 'Corgi Pembroke Chân Ngắn', 'Chó', 'Corgi Pembroke', '3.5 kg', '2-5kg', 'Đực', 'Vàng Trắng', '3 Mũi (Full + Dại)', 'Thuần chủng VKA', 14500000, 'https://images.unsplash.com/photo-1612536057832-2ff7ead7819c?auto=format&fit=crop&w=800&q=80', 'Bé Corgi đực mông trái tim siêu xinh, thần thái vui tươi, ăn uống rất khỏe, đã chích ngừa đầy đủ và kèm phả VKA.'),
('pet-02', 'Mèo Anh Lông Ngắn Silver Shaded', 'Mèo', 'British Shorthair', '2.1 kg', '2-5kg', 'Cái', 'Trắng Silver (NS11)', '2 Mũi', 'Nhập Khẩu Thái Lan', 12000000, 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80', 'Mèo Aln màu Silver cực quý phái, mắt xanh ngọc bảo, cực quấn người và thích được nũng nịu.'),
('pet-03', 'Poodle Teacup Nâu Đỏ', 'Chó', 'Poodle', '1.4 kg', '<2kg', 'Cái', 'Nâu Đỏ', '2 Mũi', 'Nhân Giống Tại Trại', 8500000, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80', 'Bé Poodle dòng Teacup siêu nhỏ gọn, lông xoăn tít không rụng lông, rất phù hợp nuôi căn hộ.'),
('pet-04', 'Mèo Ragdoll Mắt Xanh Dương', 'Mèo', 'Ragdoll', '4.2 kg', '2-5kg', 'Đực', 'Trắng Tam Thể / Bi-color', '3 Mũi (Full + Dại)', 'Nhập Khẩu Châu Âu (WCF)', 26000000, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80', 'Hoàng tử Ragdoll mắt biển xanh thăm thẫm, bộ lông mượt như lụa, phả hệ WCF quốc tế cực đẹp.')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- SEED DATA FOR PRODUCTS
INSERT INTO `products` (`id`, `name`, `category`, `price`, `rating`, `sold`, `image`, `description`) VALUES
('prod-01', 'Thức Ăn Hạt Royal Canin Mini Adult (2kg)', 'Thức Ăn', 340000, 4.9, 420, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80', 'Hạt cao cấp dành riêng cho chó cỡ nhỏ, giàu dinh dưỡng, bảo vệ tim mạch và nâng cao chất lượng lông.'),
('prod-02', 'Pate Cấp Nước Chăm Sóc Thận Mèo Ciao Churu (Túi 10 thanh)', 'Thức Ăn', 110000, 5.0, 1250, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80', 'Thưởng số 1 cho mèo từ Nhật Bản, bổ sung hàm lượng nước giúp hỗ trợ tiết niệu và ngừa sỏi thận.'),
('prod-03', 'Sữa Tắm Dưỡng Lông Trị Ve Rể SOS (500ml)', 'Đồ Dùng', 165000, 4.8, 890, 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=800&q=80', 'Sữa tắm chuyên dụng khử mùi hôi, làm mềm lông, phòng chống ve rận hiệu quả đến 14 ngày.')
ON DUPLICATE KEY UPDATE `id`=`id`;
