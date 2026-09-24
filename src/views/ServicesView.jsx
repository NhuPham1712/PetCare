import React, { useState } from 'react';
import { 
  Sparkles, 
  Stethoscope, 
  Hotel, 
  PhoneCall, 
  Truck, 
  Store, 
  Clock, 
  CheckCircle2, 
  Plane, 
  Globe, 
  ShieldAlert 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES_CATALOG } from '../data/mockData';

export const ServicesView = () => {
  const { setSelectedServiceForBooking } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('spa'); // 'spa', 'healthcare', 'boarding'

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
        color: 'white',
        borderRadius: '24px',
        padding: '40px 32px',
        marginBottom: '40px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <span className="badge-blue" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: '8px' }}>
            DỊCH VỤ THÚ Y & CHĂM SÓC
          </span>
          <h1 style={{ fontSize: '2.2rem', color: 'white', fontWeight: 800 }}>Dịch Vụ PetCare Chuyên Nghiệp</h1>
          <p style={{ color: '#e0f2fe', marginTop: '6px' }}>
            Spa Grooming • Khám Bệnh & Cấp Cứu 24/7 • Khách Sạn Lưu Trú (Hỗ trợ xe đưa đón tận nhà & đưa đến cửa hàng)
          </p>
        </div>

        {/* Emergency Hotline Button */}
        <div style={{
          background: '#ffe4e6',
          border: '2px solid #f43f5e',
          borderRadius: '16px',
          padding: '16px 20px',
          color: '#9f1239',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#be123c', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <PhoneCall size={18} /> HOTLINE CẤP CỨU 24/7
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#9f1239', marginTop: '4px' }}>
            1900 888 999
          </div>
          <div style={{ fontSize: '0.8rem', color: '#be123c', marginTop: '2px' }}>
            Kèm Hotline 2: 0988 777 666
          </div>
        </div>
      </div>

      {/* Main Service Category Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveSubTab('spa')}
          style={{
            padding: '12px 24px',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeSubTab === 'spa' ? '#0284c7' : 'white',
            color: activeSubTab === 'spa' ? 'white' : '#475569',
            border: '1px solid #cbd5e1'
          }}
        >
          <Sparkles size={20} />
          <span>1. Spa & Grooming</span>
        </button>

        <button
          onClick={() => setActiveSubTab('healthcare')}
          style={{
            padding: '12px 24px',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeSubTab === 'healthcare' ? '#0284c7' : 'white',
            color: activeSubTab === 'healthcare' ? 'white' : '#475569',
            border: '1px solid #cbd5e1'
          }}
        >
          <Stethoscope size={20} />
          <span>2. Y Tế & Khám Bệnh 24/7</span>
        </button>

        <button
          onClick={() => setActiveSubTab('boarding')}
          style={{
            padding: '12px 24px',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeSubTab === 'boarding' ? '#0284c7' : 'white',
            color: activeSubTab === 'boarding' ? 'white' : '#475569',
            border: '1px solid #cbd5e1'
          }}
        >
          <Hotel size={20} />
          <span>3. Khách Sạn & Lưu Trú</span>
        </button>
      </div>

      {/* Tab 1: SPA GROOMING */}
      {activeSubTab === 'spa' && (
        <div>
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Dịch Vụ Spa, Tắm Rửa & Làm Đẹp Cho Chó Mèo
            </h2>
            <p style={{ color: '#64748b' }}>
              Quy trình Spa 8 bước tiêu chuẩn quốc tế giúp thú cưng sạch sẽ, thơm tho, sảng khoái và tự tin với diện mạo mới.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { title: 'Cắt, Tỉa & Nhuộm Lông Thời Trang', desc: 'Tạo kiểu lông mông trái tim, lông kiểu Teddy Poodle, nhuộm tai & đuôi an toàn 100% bằng thảo dược.' },
              { title: 'Vệ Sinh Răng Miệng & Tai', desc: 'Đánh răng lấy mảng bám, lấy cao răng nhẹ, nhổ lông tai & rửa sạch chất bẩn sáp tai chống viêm tai.' },
              { title: 'Cắt & Dũa Móng An Toàn', desc: 'Cắt móng đúng kỹ thuật tránh chạm mạch máu, dũa mịn móng giúp bé không làm trầy xước chủ.' },
              { title: 'Gỡ Rối Lông & Dưỡng Lông', desc: 'Kỹ thuật gỡ rối không gây đau rát, hấp dầu lông siêu mượt và xịt nước hoa dưỡng lông nhập khẩu.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <CheckCircle2 size={20} color="#0284c7" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setSelectedServiceForBooking(SERVICES_CATALOG.spa)}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <span>Đặt Lịch Spa Grooming Online</span>
          </button>
        </div>
      )}

      {/* Tab 2: KHÁM BỆNH */}
      {activeSubTab === 'healthcare' && (
        <div>
          <div style={{ background: '#fff1f2', padding: '24px', borderRadius: '20px', border: '1.5px solid #fecdd3', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#9f1239', marginBottom: '8px' }}>
              Trung Tâm Y Tế Khám Bệnh & Cấp Cứu Thú Y 24/7
            </h2>
            <p style={{ color: '#be123c', lineHeight: 1.6 }}>
              Trang bị hệ thống máy Siêu âm 4D, X-Quang kỹ thuật số, Phòng phẫu thuật vô trùng và Đội ngũ Thạc sĩ Bác sĩ Thú y giàu kinh nghiệm.
            </p>

            <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ background: 'white', padding: '10px 16px', borderRadius: '12px', color: '#0284c7', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} /> Vận chuyển xe đưa đón tận nhà
              </div>
              <div style={{ background: 'white', padding: '10px 16px', borderRadius: '12px', color: '#0284c7', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Store size={18} /> Trực tiếp đưa đến cửa hàng
              </div>
            </div>
          </div>

          {/* List of Medical Services Required by Prompt */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              '🚨 Cấp Cứu 24/7 (Hotline 1900 888 999)',
              '🩺 Khám Định Kỳ & Tư Vấn Dinh Dưỡng',
              '💊 Điều Trị Bệnh Nội Khoa & Tiêu Hóa',
              '✂ Phẫu Thuật Triệt Sản & Chỉnh Hình',
              '🔬 Xét Nghiệm & Chẩn Đoán Hình Ảnh (X-Quang, Siêu Âm)',
              '💉 Tiêm Phòng Vắc-xin 5/7 Bệnh & Dại',
              '🛡 Phòng Chống Bệnh Ve, Rận, Giun Sán',
              '🐶 Hộ Sinh Chó Mèo & Mổ Đẻ An Toàn',
              '🔄 Tái Khám Lại & Theo Dõi Sức Khỏe'
            ].map((srv, idx) => (
              <div key={idx} style={{ background: 'white', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>
                {srv}
              </div>
            ))}
          </div>

          <button 
            onClick={() => setSelectedServiceForBooking(SERVICES_CATALOG.healthcare)}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <span>Đặt Lịch Khám Bệnh / Tiêm Ngừa</span>
          </button>
        </div>
      )}

      {/* Tab 3: LƯU TRÚ */}
      {activeSubTab === 'boarding' && (
        <div>
          <div style={{ background: '#fef3c7', padding: '24px', borderRadius: '20px', border: '1.5px solid #fde68a', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#92400e', marginBottom: '8px' }}>
              Khách Sạn Thú Cưng, Dịch Vụ Xuất Nhập Cảnh & Vận Chuyển
            </h2>
            <p style={{ color: '#b45309', lineHeight: 1.6 }}>
              Không gian lưu trú tiêu chuẩn 5 sao có điều hòa 24/24, camera trực tuyến cho chủ nuôi xem bé chơi, cùng trọn gói hồ sơ xuất nhập cảnh & vận chuyển toàn quốc.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
              <Hotel size={28} color="#d97706" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Dịch Vụ Lưu Chuồng</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '12px' }}>
                Phòng Standard & VIP Penthouse sạch sẽ, khử trùng hàng ngày. Tùy chọn Vận chuyển xe đưa đón tại nhà hoặc Trực tiếp đưa đến cửa hàng.
              </p>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>Từ 150.000đ / ngày</div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
              <Globe size={28} color="#0284c7" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Dịch Vụ Xuất Nhập Cảnh</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '12px' }}>
                Hỗ trợ làm Passport thú cưng, xét nghiệm huyết thanh Rabies Titre Test, kiểm dịch động vật trọn gói đi Mỹ, Châu Âu, Nhật Bản, Hàn Quốc.
              </p>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>Tư vấn hồ sơ trọn gói</div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
              <Plane size={28} color="#059669" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Vận Chuyển Trong Nước</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '12px' }}>
                Vận chuyển chó mèo toàn quốc bằng máy bay hàng không & xe ô tô điều hòa chuyên dụng, bảo đảm sức khỏe 100% suốt hành trình.
              </p>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>Báo giá theo lộ trình</div>
            </div>
          </div>

          <button 
            onClick={() => setSelectedServiceForBooking(SERVICES_CATALOG.boarding)}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <span>Đặt Phòng Lưu Trú / Tư Vấn Vận Chuyển</span>
          </button>
        </div>
      )}

    </div>
  );
};
