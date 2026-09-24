import React, { useState } from 'react';
import { User, Phone, MapPin, Mail, Lock, Crown, Dog, CheckCircle2, ShieldCheck, ArrowRight, LogIn, UserPlus, Stethoscope, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthView = () => {
  const { 
    setActiveTab, 
    loginAsCustomer, 
    loginAsStaff,
    loginAsAdmin, 
    user, 
    showToast 
  } = useApp();

  const [tabMode, setTabMode] = useState('customer_login'); // 'customer_login', 'customer_register', 'staff_login', 'admin_login'

  // Customer Register Form State
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: ''
  });

  // Customer Login Form State
  const [loginForm, setLoginForm] = useState({
    phoneOrEmail: user.phone || '0988 777 888',
    password: ''
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    loginAsCustomer({
      name: registerForm.name,
      phone: registerForm.phone,
      address: registerForm.address,
      email: registerForm.email
    });
    setActiveTab('user');
    showToast('🎉 Đăng ký tài khoản thành công! Đã lưu Địa chỉ & SĐT của bạn.');
  };

  const handleCustomerLoginSubmit = (e) => {
    e.preventDefault();
    loginAsCustomer({
      name: user.name || 'Đặng Ngọc Nhuy',
      phone: loginForm.phoneOrEmail,
      address: user.address || ''
    });
    setActiveTab('user');
  };

  const handleStaffLoginSubmit = (e) => {
    e.preventDefault();
    loginAsStaff();
    setActiveTab('user');
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    loginAsAdmin();
    setActiveTab('management');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 180px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '40px 24px'
    }}>
      <div className="animate-fade-in" style={{
        maxWidth: '1040px',
        width: '100%',
        background: 'white',
        borderRadius: '28px',
        boxShadow: '0 25px 50px -12px rgba(2, 132, 199, 0.2)',
        border: '1px solid #cbd5e1',
        display: 'grid',
        gridTemplateColumns: '1fr 1.15fr',
        overflow: 'hidden'
      }}>
        
        {/* Left Side: Branding & Role Intro */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0284c7 100%)',
          color: 'white',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'white', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Dog size={24} />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Inter' }}>
                PetCare<span style={{ color: '#38bdf8' }}>Center</span>
              </span>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', lineHeight: 1.25, marginBottom: '16px' }}>
              Cổng Đăng Nhập & Phân Quyền Hệ Thống
            </h2>

            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '32px' }}>
              Đăng nhập tài khoản tương ứng với vai trò của bạn để truy cập đúng hồ sơ & quyền hạn.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#38bdf8" />
                <span><strong>Khách Hàng:</strong> Hồ sơ, chó mèo cá nhân, lịch sử dịch vụ & đơn hàng</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#f59e0b" />
                <span><strong>Nhân Viên / Bác Sĩ:</strong> Xem ca trực, lịch làm việc & danh sách ca bệnh</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#f43f5e" />
                <span><strong>Quản Lý / Admin:</strong> Toàn quyền quản lý CSDL MySQL XAMPP & đơn hàng</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '20px', marginTop: '30px', fontSize: '0.82rem', color: '#94a3b8' }}>
            🚑 Cấp cứu thú y 24/7: <strong>1900 888 999</strong>
          </div>
        </div>

        {/* Right Side: Tab Forms */}
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Tab Switcher Header */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '14px', marginBottom: '28px', flexWrap: 'wrap', gap: '2px' }}>
            <button
              onClick={() => setTabMode('customer_login')}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: '10px', border: 'none',
                fontWeight: tabMode === 'customer_login' ? 700 : 500, fontSize: '0.82rem',
                background: tabMode === 'customer_login' ? 'white' : 'transparent',
                color: tabMode === 'customer_login' ? '#0284c7' : '#64748b',
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              👤 Khách Hàng
            </button>

            <button
              onClick={() => setTabMode('customer_register')}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: '10px', border: 'none',
                fontWeight: tabMode === 'customer_register' ? 700 : 500, fontSize: '0.82rem',
                background: tabMode === 'customer_register' ? 'white' : 'transparent',
                color: tabMode === 'customer_register' ? '#0284c7' : '#64748b',
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              ✍️ Đăng Ký
            </button>

            <button
              onClick={() => setTabMode('staff_login')}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: '10px', border: 'none',
                fontWeight: tabMode === 'staff_login' ? 700 : 500, fontSize: '0.82rem',
                background: tabMode === 'staff_login' ? 'white' : 'transparent',
                color: tabMode === 'staff_login' ? '#d97706' : '#64748b',
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              👨‍⚕️ Bác Sĩ / NV
            </button>

            <button
              onClick={() => setTabMode('admin_login')}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: '10px', border: 'none',
                fontWeight: tabMode === 'admin_login' ? 700 : 500, fontSize: '0.82rem',
                background: tabMode === 'admin_login' ? 'white' : 'transparent',
                color: tabMode === 'admin_login' ? '#be123c' : '#64748b',
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              👑 Admin
            </button>
          </div>

          {/* Form 1: Customer Login */}
          {tabMode === 'customer_login' && (
            <form onSubmit={handleCustomerLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Đăng Nhập Khách Hàng</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Đăng nhập để xem thông tin hồ sơ & chó mèo cá nhân</p>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>Số Điện Thoại / Email</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input 
                    type="text" required className="input-field" style={{ paddingLeft: '40px' }}
                    value={loginForm.phoneOrEmail}
                    onChange={e => setLoginForm({ ...loginForm, phoneOrEmail: e.target.value })}
                    placeholder="0988 777 888"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>Mật Khẩu</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input type="password" required className="input-field" style={{ paddingLeft: '40px' }} placeholder="••••••••" />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: '10px' }}>
                <LogIn size={18} />
                <span>Đăng Nhập Khách Hàng & Xem Hồ Sơ</span>
              </button>
            </form>
          )}

          {/* Form 2: Customer Register */}
          {tabMode === 'customer_register' && (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Đăng Ký Tài Khoản Mới</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Lưu trữ địa chỉ & số điện thoại cho việc đưa đón thú cưng</p>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Họ và Tên Khách Hàng</label>
                <input type="text" required className="input-field" placeholder="Đặng Ngọc Nhuy" value={registerForm.name} onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Số Điện Thoại</label>
                <input type="tel" required className="input-field" placeholder="0988 777 888" value={registerForm.phone} onChange={e => setRegisterForm({ ...registerForm, phone: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Địa Chỉ Giao Hàng & Đưa Đón Chó Mèo</label>
                <input type="text" required className="input-field" placeholder="123 Đường Nguyễn Thị Minh Khai, P.6, Q.3, TP.HCM" value={registerForm.address} onChange={e => setRegisterForm({ ...registerForm, address: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Email</label>
                <input type="email" required className="input-field" placeholder="nhuy.petcare@gmail.com" value={registerForm.email} onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })} />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: '6px' }}>
                <UserPlus size={18} />
                <span>Tạo Tài Khoản & Lưu Thông Tin Hồ Sơ</span>
              </button>
            </form>
          )}

          {/* Form 3: Staff / Vet Doctor Login */}
          {tabMode === 'staff_login' && (
            <form onSubmit={handleStaffLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', padding: '12px', borderRadius: '12px', color: '#92400e', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={20} color="#d97706" />
                <span>Cổng đăng nhập cho Bác sĩ Thú y & Nhân viên Grooming</span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Đăng Nhập Bác Sĩ / Nhân Viên</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Xem lịch làm việc ca trực & danh sách bệnh án thú cưng</p>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Mã Nhân Viên / Email Công Vụ</label>
                <input type="text" required className="input-field" defaultValue="bs.minh@petcare.vn" />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Mật Khẩu</label>
                <input type="password" required className="input-field" defaultValue="123456" />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', background: '#d97706' }}>
                <Stethoscope size={18} />
                <span>Đăng Nhập Quyền Bác Sĩ / NV</span>
              </button>
            </form>
          )}

          {/* Form 4: Admin Login */}
          {tabMode === 'admin_login' && (
            <form onSubmit={handleAdminLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ background: '#ffe4e6', border: '1px solid #fecdd3', padding: '12px', borderRadius: '12px', color: '#be123c', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Crown size={20} color="#be123c" />
                <span>Cổng Quản Trị Viên cao cấp điều hành toàn hệ thống</span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Đăng Nhập Quản Trị Viên</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Truy cập Quản Lý Đơn Hàng & CSDL MySQL XAMPP</p>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Tên Đăng Nhập Admin</label>
                <input type="text" required className="input-field" defaultValue="admin" />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Mật Khẩu Admin</label>
                <input type="password" required className="input-field" defaultValue="admin123" />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)' }}>
                <Crown size={18} />
                <span>Xác Nhận Đăng Nhập Admin</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
