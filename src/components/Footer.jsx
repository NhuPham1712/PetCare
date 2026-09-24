import React from 'react';
import { Dog, PhoneCall, ShieldCheck, Heart, MapPin, Clock, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { setActiveTab } = useApp();

  return (
    <footer style={{
      background: '#0f172a',
      color: '#94a3b8',
      paddingTop: '60px',
      paddingBottom: '30px',
      borderTop: '4px solid #0284c7'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px', background: '#0284c7',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                <Dog size={24} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', fontFamily: 'Inter' }}>
                PetCare<span style={{ color: '#38bdf8' }}>Center</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
              Hệ thống chăm sóc thú cưng uy tín hàng đầu. Cung cấp đầy đủ dịch vụ Spa, Y tế khám bệnh 24/7, Khách sạn lưu trú, Bán chó mèo thuần chủng & Đồ dùng chính hãng.
            </p>
            <div style={{ background: 'rgba(2, 132, 199, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '12px 16px', borderRadius: '12px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PhoneCall size={16} /> HOTLINE CẤP CỨU 24/7
              </div>
              <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>
                1900 888 999 - 0988 777 666
              </div>
            </div>
          </div>

          {/* Col 2: Dịch Vụ */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700 }}>
              Dịch Vụ Nổi Bật
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li onClick={() => setActiveTab('services')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>
                • Spa & Grooming (Cắt, tỉa, nhuộm, dưỡng lông)
              </li>
              <li onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
                • Khám chữa bệnh, Phẫu thuật, X-quang
              </li>
              <li onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
                • Khách sạn lưu trú chó mèo (Vận chuyển tận nhà)
              </li>
              <li onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
                • Dịch vụ Xuất nhập cảnh & Passport thú cưng
              </li>
              <li onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
                • Vận chuyển chó mèo toàn quốc
              </li>
            </ul>
          </div>

          {/* Col 3: Cửa Hàng & Bán Hàng */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700 }}>
              Thú Cưng & Sản Phẩm
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li onClick={() => setActiveTab('petshop')} style={{ cursor: 'pointer' }}>
                • Bán Chó Cảnh Thuần Chủng VKA
              </li>
              <li onClick={() => setActiveTab('petshop')} style={{ cursor: 'pointer' }}>
                • Bán Mèo Cảnh Nhập Khẩu Thái & Châu Âu
              </li>
              <li onClick={() => setActiveTab('supplies')} style={{ cursor: 'pointer' }}>
                • Thức ăn hạt khô & Pate dinh dưỡng
              </li>
              <li onClick={() => setActiveTab('supplies')} style={{ cursor: 'pointer' }}>
                • Phụ kiện, Chuồng nuôi, Khay vệ sinh
              </li>
              <li onClick={() => setActiveTab('about')} style={{ cursor: 'pointer' }}>
                • Cẩm nang & Kinh nghiệm nuôi thú cưng
              </li>
            </ul>
          </div>

          {/* Col 4: Liên Hệ & Giờ Làm Việc */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700 }}>
              Thông Tin Liên Hệ
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={20} color="#38bdf8" />
                <span>123 Đường Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. Hồ Chí Minh</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Clock size={20} color="#38bdf8" />
                <span>Mở cửa: 07:30 - 21:00 hàng ngày (Cấp cứu trực 24/7)</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Mail size={20} color="#38bdf8" />
                <span>hotro@petcarecenter.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '24px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.85rem'
        }}>
          <div>© 2026 PetCare Center. Tất cả quyền được bảo lưu.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Thanh toán linh hoạt: COD | QR Code VietQR</span>
            <span>Vận chuyển toàn quốc</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
