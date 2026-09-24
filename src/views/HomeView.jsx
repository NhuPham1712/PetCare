import React from 'react';
import { 
  Dog, 
  Sparkles, 
  Stethoscope, 
  Hotel, 
  PhoneCall, 
  ShieldCheck, 
  Truck, 
  Award, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES_CATALOG, REVIEWS } from '../data/mockData';

export const HomeView = () => {
  const { setActiveTab, pets, products, setSelectedPetForDetail, setSelectedServiceForBooking, addToCart } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', paddingBottom: '60px' }}>
      
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0284c7 100%)',
        color: 'white',
        padding: '80px 24px 100px',
        overflow: 'hidden'
      }}>
        {/* Decorative Circles */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%', width: '450px', height: '450px',
          borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', filter: 'blur(50px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%', width: '350px', height: '350px',
          borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', filter: 'blur(60px)'
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, color: '#38bdf8', marginBottom: '20px' }}>
              <Sparkles size={16} /> HỆ THỐNG PHÒNG KHÁM & SPA THÚ CƯNG SỐ 1
            </div>
            
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '20px', fontFamily: 'Inter' }}>
              Chăm Sóc Thú Cưng <br />
              <span style={{ color: '#38bdf8', textShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}>Chuyên Nghiệp & Tận Tâm</span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '32px', maxWidth: '520px' }}>
              Dịch vụ Spa Grooming cao cấp, Khám chữa bệnh thú y 24/7 có xe đưa đón tận nhà, Khách sạn lưu trú chó mèo và Cung cấp thú cưng thuần chủng VKA.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setActiveTab('services')}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem', background: '#ffffff', color: '#0284c7' }}
              >
                <span>Đặt Dịch Vụ Ngay</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => setActiveTab('petshop')}
                className="btn-secondary"
                style={{ padding: '14px 28px', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                <span>Xem Chó Mèo Cảnh</span>
              </button>
            </div>

            {/* Quick Badges */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '40px', fontSize: '0.85rem', color: '#e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={18} color="#38bdf8" /> 100% Thuần Chủng VKA
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={18} color="#38bdf8" /> Xe Đưa Đón Tận Nhà
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PhoneCall size={18} color="#f43f5e" /> Hotline 24/7
              </div>
            </div>
          </div>

          {/* Hero Card Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '4px solid rgba(255, 255, 255, 0.2)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80" 
                alt="PetCare Hero" 
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Card Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              padding: '16px 20px',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              border: '1px solid #bfdbfe'
            }}>
              <div style={{ background: '#dbeafe', padding: '10px', borderRadius: '12px', color: '#0284c7' }}>
                <Award size={28} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>50,000+</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Thú cưng đã được chăm sóc</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 3 Services Highlight Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge-blue">DỊCH VỤ TRỌN GÓI</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '8px' }}>
            Dịch Vụ Chăm Sóc Thú Cưng Tại PetCare
          </h2>
          <p style={{ color: '#64748b', marginTop: '6px' }}>Đầy đủ 3 mảng dịch vụ: Spa Grooming, Y Tế Khám Bệnh & Khách Sạn Lưu Trú</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* Card 1: Spa */}
          <div className="glass-panel" style={{ borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', transition: 'all 0.3s' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Sparkles size={26} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>1. Dịch Vụ Spa Grooming</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '16px' }}>
              Cắt, tỉa, nhuộm lông nghệ thuật, vệ sinh răng miệng, tai, cắt dũa móng, gỡ rối lông và dưỡng lông bóng mượt.
            </p>
            <button 
              onClick={() => setSelectedServiceForBooking(SERVICES_CATALOG.spa)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Đặt Lịch Spa Ngay
            </button>
          </div>

          {/* Card 2: Khám Bệnh */}
          <div className="glass-panel" style={{ borderRadius: '20px', padding: '28px', border: '1.5px solid #38bdf8', background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', boxShadow: '0 10px 25px rgba(2, 132, 199, 0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#ffe4e6', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stethoscope size={26} />
              </div>
              <span className="badge-rose">HOTLINE 24/7</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>2. Y Tế & Khám Chữa Bệnh</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '16px' }}>
              Cấp cứu 24/7 (1900 888 999), Khám định kỳ, Điều trị, Phẫu thuật, X-quang, Tiêm phòng, Hộ sinh & Tái khám (Xe đưa đón tận nhà).
            </p>
            <button 
              onClick={() => setSelectedServiceForBooking(SERVICES_CATALOG.healthcare)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Đặt Khám Bệnh / Cấp Cứu
            </button>
          </div>

          {/* Card 3: Lưu Trú */}
          <div className="glass-panel" style={{ borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Hotel size={26} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>3. Khách Sạn & Lưu Trú</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '16px' }}>
              Lưu chuồng Standard & VIP Penthouse, Dịch vụ Vận chuyển trong nước và Hồ sơ Thủ tục Xuất nhập cảnh cho chó mèo.
            </p>
            <button 
              onClick={() => setSelectedServiceForBooking(SERVICES_CATALOG.boarding)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Đặt Phòng Lưu Trú
            </button>
          </div>

        </div>
      </section>

      {/* Featured Pet Shop Preview */}
      <section style={{ background: '#f1f5f9', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge-blue">CHÓ MÈO CẢNH MỚI VỀ</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
                Thú Cưng Thuần Chủng Đang Tìm Chủ
              </h2>
            </div>
            <button 
              onClick={() => setActiveTab('petshop')}
              className="btn-secondary"
              style={{ background: 'white' }}
            >
              <span>Xem Tất Cả & Bộ Lọc</span>
              <Filter size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {pets.slice(0, 4).map(pet => (
              <div key={pet.id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge-blue" style={{ position: 'absolute', top: '12px', left: '12px' }}>{pet.species}</span>
                  <span className="badge-emerald" style={{ position: 'absolute', top: '12px', right: '12px' }}>{pet.vaccination}</span>
                </div>

                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{pet.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>
                      Cân nặng: {pet.weight} | Màu: {pet.color}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7', marginBottom: '12px' }}>
                      {pet.price.toLocaleString('vi-VN')} đ
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setSelectedPetForDetail(pet)}
                        className="btn-secondary"
                        style={{ flex: 1, padding: '8px', fontSize: '0.85rem', justifyContent: 'center' }}
                      >
                        Chi Tiết
                      </button>
                      <button 
                        onClick={() => addToCart(pet, 'pet')}
                        className="btn-primary"
                        style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      >
                        Đặt Mua
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Highlight */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge-blue">ĐÁNH GIÁ TỪ KHÁCH HÀNG</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
            Khách Hàng Nói Gì Về PetCare?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {REVIEWS.map(rev => (
            <div key={rev.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <img src={rev.avatar} alt={rev.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{rev.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>Chủ nuôi: {rev.petName}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, italic: 'true' }}>
                "{rev.comment}"
              </p>
              <div style={{ marginTop: '12px', color: '#f59e0b', fontSize: '0.9rem' }}>
                {'★'.repeat(rev.rating)}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
