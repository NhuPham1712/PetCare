import React, { useState } from 'react';
import { X, Calendar, Clock, Truck, Store, PhoneCall, Sparkles, Stethoscope, Hotel, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServiceBookingModal = () => {
  const { selectedServiceForBooking, setSelectedServiceForBooking, createBooking, user } = useApp();

  const [bookingForm, setBookingForm] = useState({
    petName: user.myPets?.[0]?.name ? `${user.myPets[0].name} (${user.myPets[0].breed || 'Thú cưng'})` : 'Mochi (Poodle)',
    serviceName: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    transportMode: 'Vận chuyển tại nhà (Xe đưa đón tận nơi)',
    note: ''
  });

  if (!selectedServiceForBooking) return null;

  const { category, title, items } = selectedServiceForBooking;

  const handleSubmit = (e) => {
    e.preventDefault();
    createBooking({
      serviceCategory: title,
      serviceName: bookingForm.serviceName || items[0]?.name || 'Dịch vụ tổng hợp',
      petName: bookingForm.petName || 'Thú cưng của bạn',
      date: bookingForm.date,
      time: bookingForm.time,
      transportMode: bookingForm.transportMode,
      note: bookingForm.note
    });
    setSelectedServiceForBooking(null);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div className="animate-fade-in" style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '620px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -10px rgba(2, 132, 199, 0.4), 0 0 30px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
          color: 'white',
          padding: '24px 28px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '9999px',
              display: 'inline-block',
              marginBottom: '6px',
              letterSpacing: '0.5px'
            }}>
              🐾 ĐẶT LỊCH ONLINE TRỰC TUYẾN
            </span>
            <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
              {title}
            </h3>
          </div>

          <button 
            onClick={() => setSelectedServiceForBooking(null)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Emergency Notice if Khám Bệnh */}
          {category === 'healthcare' && (
            <div style={{
              background: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)',
              border: '1.5px solid #f43f5e',
              borderRadius: '16px',
              padding: '14px 18px',
              color: '#9f1239',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '12px'
            }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#881337' }}>
                  🚑 Trường Hợp Cấp Cứu Khẩn Cấp 24/7?
                </strong>
                <span style={{ fontSize: '0.82rem', color: '#9f1239' }}>
                  Gọi ngay hotline để xe chở Bác sĩ Thú y đến tận nhà hỗ trợ tức thì!
                </span>
              </div>
              <a href="tel:1900888999" style={{
                background: '#be123c', color: 'white', padding: '8px 14px', borderRadius: '10px',
                fontSize: '0.88rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px',
                whiteSpace: 'nowrap', boxShadow: '0 4px 10px rgba(190, 18, 60, 0.3)'
              }}>
                <PhoneCall size={16} /> 1900 888 999
              </a>
            </div>
          )}

          {/* Select Specific Service */}
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '8px' }}>
              Chọn Gói Dịch Vụ Cụ Thể
            </label>
            <select 
              className="input-field"
              style={{ padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem' }}
              value={bookingForm.serviceName}
              onChange={e => setBookingForm({ ...bookingForm, serviceName: e.target.value })}
            >
              {items?.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name} {item.price ? `(${item.price})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Pet Name */}
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '8px' }}>
              Tên & Giống Thú Cưng Của Bạn
            </label>
            <input 
              type="text" 
              required
              className="input-field"
              style={{ padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem' }}
              placeholder="VD: Mochi (Poodle 3.2kg)"
              value={bookingForm.petName}
              onChange={e => setBookingForm({ ...bookingForm, petName: e.target.value })}
            />
          </div>

          {/* Transport Mode Options - Key Requirement */}
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '8px' }}>
              Hình Thức Vận Chuyển & Đưa Đón (Bắt Buộc)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              
              {/* Option A */}
              <div 
                onClick={() => setBookingForm({ ...bookingForm, transportMode: 'Vận chuyển tại nhà (Xe đưa đón tận nơi)' })}
                style={{
                  border: `2px solid ${bookingForm.transportMode.includes('tại nhà') ? '#0284c7' : '#e2e8f0'}`,
                  background: bookingForm.transportMode.includes('tại nhà') ? '#eff6ff' : '#ffffff',
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: bookingForm.transportMode.includes('tại nhà') ? '0 4px 14px rgba(2, 132, 199, 0.15)' : 'none'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={18} color="#0284c7" /> Vận Chuyển Tại Nhà
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', lineHeight: 1.4 }}>
                  Xe ô tô chuyên dụng đến đón bé tận nhà
                </div>
              </div>

              {/* Option B */}
              <div 
                onClick={() => setBookingForm({ ...bookingForm, transportMode: 'Trực tiếp đưa đến cửa hàng' })}
                style={{
                  border: `2px solid ${bookingForm.transportMode.includes('Trực tiếp') ? '#0284c7' : '#e2e8f0'}`,
                  background: bookingForm.transportMode.includes('Trực tiếp') ? '#eff6ff' : '#ffffff',
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: bookingForm.transportMode.includes('Trực tiếp') ? '0 4px 14px rgba(2, 132, 199, 0.15)' : 'none'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Store size={18} color="#0284c7" /> Trực Tiếp Đưa Đến
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', lineHeight: 1.4 }}>
                  Mang chó/mèo trực tiếp tới trung tâm
                </div>
              </div>

            </div>
          </div>

          {/* Date & Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '8px' }}>
                Ngày Đặt Lịch
              </label>
              <input 
                type="date"
                required
                className="input-field"
                style={{ padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem' }}
                value={bookingForm.date}
                onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '8px' }}>
                Giờ Hẹn
              </label>
              <input 
                type="time"
                required
                className="input-field"
                style={{ padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem' }}
                value={bookingForm.time}
                onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })}
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '8px' }}>
              Ghi Chú Thêm Về Tình Trạng Chó/Mèo
            </label>
            <textarea 
              rows={3}
              className="input-field"
              style={{ padding: '12px 16px', borderRadius: '12px', fontSize: '0.92rem', resize: 'vertical' }}
              placeholder="VD: Bé hơi nhát người lạ, cần cắt lông mông ngắn bớt..."
              value={bookingForm.note}
              onChange={e => setBookingForm({ ...bookingForm, note: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ 
              width: '100%', 
              justify: 'center', 
              padding: '16px', 
              fontSize: '1.05rem', 
              borderRadius: '14px',
              marginTop: '8px',
              boxShadow: '0 6px 20px rgba(2, 132, 199, 0.35)'
            }}
          >
            <CheckCircle2 size={20} />
            <span>Xác Nhận Đặt Lịch Hẹn</span>
          </button>
        </form>
      </div>
    </div>
  );
};
