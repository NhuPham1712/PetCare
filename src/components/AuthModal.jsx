import React, { useState } from 'react';
import { X, User, Phone, MapPin, Mail, Lock, Crown, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    user, 
    updateUserProfile, 
    loginAsAdmin, 
    loginAsCustomer, 
    showToast 
  } = useApp();

  const [isRegister, setIsRegister] = useState(false);

  // Customer Form State
  const [customerData, setCustomerData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || ''
  });

  // Admin Form State
  const [adminData, setAdminData] = useState({
    username: 'admin',
    password: 'admin123'
  });

  if (!isAuthModalOpen) return null;

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    loginAsCustomer(customerData);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (adminData.username === 'admin' && adminData.password === 'admin123') {
      loginAsAdmin();
    } else {
      loginAsAdmin(); // Allow login for demo
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      width: '100vw', height: '100vh',
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
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
        maxWidth: '500px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -10px rgba(2, 132, 199, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        margin: 'auto',
        overflow: 'hidden'
      }}>
        {/* Header Tabs */}
        <div style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
          color: 'white',
          padding: '20px 24px 0',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'white', fontWeight: 800, margin: 0 }}>
                {authMode === 'admin' ? '🔑 Đăng Nhập Quản Trị Viên' : '👤 Tài Khoản Khách Hàng'}
              </h3>
              <p style={{ fontSize: '0.82rem', opacity: 0.9, marginTop: '2px', margin: 0 }}>
                {authMode === 'admin' ? 'Quyền truy cập Quản Lý Đơn Hàng & CSDL Admin' : 'Lưu trữ địa chỉ, SĐT & lịch sử đặt hàng'}
              </p>
            </div>
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', padding: '6px', border: 'none', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setAuthMode('customer')}
              style={{
                flex: 1,
                padding: '10px',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                background: authMode === 'customer' ? 'white' : 'rgba(255,255,255,0.2)',
                color: authMode === 'customer' ? '#0284c7' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              👤 Khách Hàng
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('admin')}
              style={{
                flex: 1,
                padding: '10px',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                background: authMode === 'admin' ? 'white' : 'rgba(255,255,255,0.2)',
                color: authMode === 'admin' ? '#be123c' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              👑 Admin / Quản Lý
            </button>
          </div>
        </div>

        {/* Form Body for Customer */}
        {authMode === 'customer' && (
          <form onSubmit={handleCustomerSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Họ và Tên Khách Hàng
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="text" required className="input-field" style={{ paddingLeft: '40px' }}
                  value={customerData.name}
                  onChange={e => setCustomerData({ ...customerData, name: e.target.value })}
                  placeholder="Đặng Ngọc Nhuy"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Số Điện Thoại (Nhận lịch hẹn & Giao hàng)
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="tel" required className="input-field" style={{ paddingLeft: '40px' }}
                  value={customerData.phone}
                  onChange={e => setCustomerData({ ...customerData, phone: e.target.value })}
                  placeholder="0988 777 888"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Địa Chỉ Giao Hàng & Đưa Đón Thú Cưng
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="text" required className="input-field" style={{ paddingLeft: '40px' }}
                  value={customerData.address}
                  onChange={e => setCustomerData({ ...customerData, address: e.target.value })}
                  placeholder="123 Đường Nguyễn Thị Minh Khai, P.6, Q.3, TP.HCM"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '12px' }}>
              Đăng Nhập Khách Hàng
            </button>
          </form>
        )}

        {/* Form Body for Admin */}
        {authMode === 'admin' && (
          <form onSubmit={handleAdminSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#ffe4e6', border: '1px solid #fecdd3', padding: '12px 14px', borderRadius: '12px', color: '#be123c', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Crown size={20} color="#be123c" />
              <span>Dành riêng cho Bác sĩ Thú y & Nhân viên Quản trị cửa hàng PetCare</span>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Tên Đăng Nhập Admin
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="text" required className="input-field" style={{ paddingLeft: '40px' }}
                  value={adminData.username}
                  onChange={e => setAdminData({ ...adminData, username: e.target.value })}
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Mật Khẩu Quản Trị
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="password" required className="input-field" style={{ paddingLeft: '40px' }}
                  value={adminData.password}
                  onChange={e => setAdminData({ ...adminData, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)' }}>
              <Crown size={18} />
              <span>Xác Nhận Đăng Nhập Quyền Admin</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
