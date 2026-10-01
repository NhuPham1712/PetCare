import React, { useState } from 'react';
import { 
  Dog, 
  ShoppingBag, 
  User, 
  Crown,
  LogOut,
  LogIn,
  LayoutDashboard,
  Users,
  PlusCircle,
  Eye,
  Calendar,
  Stethoscope,
  CreditCard,
  BarChart2,
  Bell,
  AlignRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    dbConnected,
    isLoggedIn,
    isAdmin,
    isStaff,
    logoutRole,
    cart, 
    setIsCartOpen,
    notifications,
    markAllNotificationsAsRead,
    user,
    currentProfile
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unreadCount = (notifications || []).filter(n => n.unread).length;

  const getUserDisplayName = () => {
    if (isAdmin) return currentProfile?.name || 'Quản Trị Viên';
    if (isStaff) return currentProfile?.name || 'BS. Nguyễn Văn Hoàng';
    return user?.name || currentProfile?.name || 'Nguyễn Văn A';
  };

  const publicNavLinks = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'petshop', label: 'Bán Thú Cưng' },
    { id: 'supplies', label: 'Thức Ăn & Đồ Dùng' },
    { id: 'services', label: 'Dịch Vụ' },
    { id: 'about', label: 'Giới Thiệu' }
  ];

  const adminNavLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'staff_mgmt', label: 'Quản Lý Bác Sĩ/Nhân Viên', icon: Users },
    { id: 'schedule_mgmt', label: 'Quản Lý Lịch Làm Việc', icon: Calendar },
    { id: 'admin', label: 'Quản Lý Thú Cưng & Sản Phẩm', icon: PlusCircle },
    { id: 'management', label: 'Quản Lý Đơn Hàng', icon: ShoppingBag },
    { id: 'user', label: 'Hồ Sơ Của Tôi', icon: User }
  ];

  const staffNavLinks = [
    { id: 'staff_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'staff_appointments', label: 'Quản Lý Lịch Hẹn', icon: Calendar },
    { id: 'staff_medical', label: 'Khám & Bệnh Án', icon: Stethoscope },
    { id: 'staff_billing', label: 'Thanh Toán', icon: CreditCard },
    { id: 'staff_reports', label: 'Báo Cáo - Thống Kê', icon: BarChart2 },
    { id: 'user', label: 'Hồ Sơ Của Tôi', icon: User }
  ];

  // Mobile Drawer (No "Menu" text and No "🍔" emoji)
  const renderMobileDrawer = () => {
    if (!isMobileMenuOpen) return null;
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justify: 'flex-end'
      }}>
        <div className="animate-fade-in" style={{
          width: '85vw',
          maxWidth: '340px',
          height: '100%',
          background: '#0f172a',
          color: 'white',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          overflowY: 'auto'
        }}>
          <div>
            {/* Drawer Header - Clean title without "Menu" or "🍔" */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Dog size={22} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>PetCare Center</div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, marginTop: '2px' }}>
                    👋 Xin chào, {isLoggedIn ? getUserDisplayName() : 'Khách Hàng'}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(isAdmin ? adminNavLinks : isStaff ? staffNavLinks : publicNavLinks).map(link => {
                const Icon = link.icon || Dog;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? 'white' : '#cbd5e1',
                      background: isActive ? 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)' : 'rgba(255,255,255,0.06)',
                      border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={18} color={isActive ? '#ffffff' : '#38bdf8'} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(isAdmin || isStaff) && (
              <button
                onClick={() => {
                  setActiveTab('home');
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#38bdf8',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  justify: 'center'
                }}
              >
                <Eye size={18} />
                <span>👁️ Xem Web Khách Hàng</span>
              </button>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  logoutRole();
                  setIsMobileMenuOpen(false);
                }}
                className="btn-danger"
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  justify: 'center',
                  width: '100%',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={18} />
                <span>🚪 Đăng Xuất Tài Khoản</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('login');
                  setIsMobileMenuOpen(false);
                }}
                className="btn-primary"
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  justify: 'center',
                  width: '100%',
                  cursor: 'pointer'
                }}
              >
                <LogIn size={18} />
                <span>🔑 Đăng Nhập / Đăng Ký</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // 1. DEDICATED ADMIN NAVBAR (When Admin Logged In)
  // ==========================================
  if (isAdmin) {
    return (
      <>
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)'
        }}>
          <div className="top-thin-bar" style={{
            background: 'rgba(2, 132, 199, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            color: '#38bdf8',
            fontSize: '0.76rem',
            padding: '4px 24px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            fontWeight: 600
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#0284c7', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>ADMIN PORTAL</span>
              <span>Cổng Điều Hành Quản Trị Hệ Thống PetCare Center</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: '#4ade80', fontWeight: 700 }}>
                🟢 Hệ Thống: Trực Tuyến & Đồng Bộ
              </span>
              <span style={{ opacity: 0.9 }}>👋 Xin chào, <strong>{getUserDisplayName()}</strong></span>
            </div>
          </div>

          <div className="navbar-main-container" style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            gap: '16px'
          }}>
            <div 
              className="navbar-logo"
              onClick={() => setActiveTab('dashboard')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
              }}>
                <Crown size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>
                  PetCare <span style={{ color: '#38bdf8' }}>ADMIN</span>
                </div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600 }}>TRUNG TÂM QUẢN TRỊ</div>
              </div>
            </div>

            <nav 
              className="navbar-nav-links no-scrollbar"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}
            >
              {adminNavLinks.map(link => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    style={{
                      padding: '7px 12px', borderRadius: '10px', fontSize: '0.84rem',
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? 'white' : '#cbd5e1',
                      background: isActive ? 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)' : 'rgba(255, 255, 255, 0.06)',
                      border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                      display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
                    }}
                  >
                    <Icon size={15} color={isActive ? '#ffffff' : '#38bdf8'} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <button
                onClick={() => setActiveTab('home')}
                className="desktop-only-btn"
                style={{
                  padding: '7px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.08)', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer'
                }}
              >
                <Eye size={14} color="#38bdf8" />
                <span>Xem Web Khách</span>
              </button>

              <button onClick={logoutRole} className="btn-danger desktop-only-btn" style={{ padding: '7px 14px', borderRadius: '10px', fontSize: '0.84rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <LogOut size={15} />
                <span>Đăng Xuất</span>
              </button>

              <button
                className="mobile-nav-trigger-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  padding: '8px 10px', borderRadius: '10px', border: '1px solid #38bdf8',
                  background: '#0284c7', color: 'white', cursor: 'pointer'
                }}
              >
                <AlignRight size={22} />
              </button>
            </div>
          </div>
        </header>
        {renderMobileDrawer()}
      </>
    );
  }

  // ==========================================
  // 2. DEDICATED DOCTOR / STAFF NAVBAR (When Staff Logged In)
  // ==========================================
  if (isStaff) {
    return (
      <>
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)',
          color: 'white',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 30px rgba(2, 132, 199, 0.25)'
        }}>
          {/* Top Staff Thin Bar */}
          <div className="top-thin-bar" style={{
            background: 'rgba(2, 132, 199, 0.25)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#38bdf8',
            fontSize: '0.76rem',
            padding: '4px 24px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            fontWeight: 600
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#0284c7', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>BÁC SĨ / NHÂN VIÊN PORTAL</span>
              <span>Cổng Thông Tin Khám Bệnh & Phân Trực PetCare</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: '#4ade80', fontWeight: 700 }}>
                🟢 Bác Sĩ Portal: Trực Tuyến
              </span>
              <span style={{ opacity: 0.9 }}>👋 Xin chào, <strong>{getUserDisplayName()}</strong></span>
            </div>
          </div>

          {/* Main Staff Navbar Container */}
          <div className="navbar-main-container" style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            gap: '16px'
          }}>
            {/* Staff Logo */}
            <div 
              className="navbar-logo"
              onClick={() => setActiveTab('staff_dashboard')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
              }}>
                <Stethoscope size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>
                  PetCare <span style={{ color: '#38bdf8' }}>BÁC SĨ</span>
                </div>
                <div style={{ fontSize: '0.6rem', color: '#93c5fd', fontWeight: 600 }}>CỔNG THÔNG TIN KHÁM BỆNH</div>
              </div>
            </div>

            {/* Dedicated Staff Menu Links */}
            <nav 
              className="navbar-nav-links no-scrollbar"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}
            >
              {staffNavLinks.map(link => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    style={{
                      padding: '7px 12px', borderRadius: '10px', fontSize: '0.84rem',
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? 'white' : '#e0f2fe',
                      background: isActive ? 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)' : 'rgba(255, 255, 255, 0.08)',
                      border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                      display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
                    }}
                  >
                    <Icon size={15} color={isActive ? '#ffffff' : '#38bdf8'} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Staff Actions Bar */}
            <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <button
                onClick={() => setActiveTab('home')}
                className="desktop-only-btn"
                style={{
                  padding: '7px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.08)', color: '#e0f2fe', fontSize: '0.8rem', fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer'
                }}
              >
                <Eye size={14} color="#38bdf8" />
                <span>Xem Web Khách</span>
              </button>

              <button onClick={logoutRole} className="btn-danger desktop-only-btn" style={{ padding: '7px 14px', borderRadius: '10px', fontSize: '0.84rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <LogOut size={15} />
                <span>Đăng Xuất</span>
              </button>

              <button
                className="mobile-nav-trigger-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  padding: '8px 10px', borderRadius: '10px', border: '1px solid #38bdf8',
                  background: '#0284c7', color: 'white', cursor: 'pointer'
                }}
              >
                <AlignRight size={22} />
              </button>
            </div>
          </div>
        </header>
        {renderMobileDrawer()}
      </>
    );
  }

  // ==========================================
  // 3. PUBLIC / CUSTOMER NAVBAR
  // ==========================================
  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 4px 20px rgba(2, 132, 199, 0.08)'
      }}>
        {/* Top Thin Bar */}
        <div className="top-thin-bar" style={{
          background: 'linear-gradient(90deg, #0284c7 0%, #1e40af 100%)',
          color: 'white',
          fontSize: '0.78rem',
          padding: '5px 24px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          fontWeight: 500,
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span>🚑 <strong>CẤP CỨU THÚ Y 24/7:</strong> 1900 888 999 - 0988 777 666</span>
            <span style={{ opacity: 0.85 }}>| Xe ô tô đưa đón tận nhà</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isLoggedIn && (
              <span style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', padding: '2px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                👋 Xin chào, {getUserDisplayName()}
              </span>
            )}
            <span style={{ 
              background: 'rgba(16, 185, 129, 0.25)', 
              color: '#6ee7b7',
              padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 
            }}>
              🟢 Hệ Thống Trực Tuyến 24/7
            </span>
            <span>📍 123 Nguyễn Thị Minh Khai, Q.3, TP.HCM</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="navbar-main-container" style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          gap: '12px'
        }}>
          {/* Logo */}
          <div 
            className="navbar-logo"
            onClick={() => setActiveTab('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              userSelect: 'none',
              flexShrink: 0
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
            }}>
              <Dog size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0284c7', lineHeight: 1, fontFamily: 'Inter' }}>
                PetCare<span style={{ color: '#0f172a' }}>Center</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.5px' }}>
                CHĂM SÓC & DỊCH VỤ THÚ CƯNG
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav 
            className="navbar-nav-links no-scrollbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexWrap: 'wrap',
              justify: 'center',
              flex: 1
            }}
          >
            {publicNavLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0284c7' : '#334155',
                    background: isActive ? '#e0f2fe' : 'transparent',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {link.label}
                </button>
              );
            })}

            {/* User Profile Link if logged in */}
            {isLoggedIn && (
              <button
                onClick={() => setActiveTab('user')}
                style={{
                  padding: '7px 12px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: activeTab === 'user' ? 700 : 500,
                  color: activeTab === 'user' ? '#0284c7' : '#334155',
                  background: activeTab === 'user' ? '#e0f2fe' : 'transparent',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                Hồ Sơ Của Tôi
              </button>
            )}
          </nav>

          {/* Actions Bar */}
          <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Notification Bell Button (Customer) */}
            {isLoggedIn && (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  style={{
                    position: 'relative',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                    fontSize: '0.84rem',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}
                >
                  <Bell size={16} color="#0284c7" />
                  <span className="desktop-only-btn">Thông Báo</span>
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px', right: '-6px',
                      background: '#ef4444', color: 'white',
                      fontSize: '0.7rem', fontWeight: 800,
                      width: '18px', height: '18px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
                    }}>
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown Panel */}
                {showNotifDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    width: '360px',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    padding: '16px',
                    zIndex: 2000
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '10px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                        🔔 Thông Báo Mới ({unreadCount})
                      </h4>
                      <button 
                        onClick={() => markAllNotificationsAsRead()} 
                        style={{ background: 'transparent', color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Đánh dấu đã đọc
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                      {(notifications || []).length === 0 ? (
                        <div style={{ padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '0.84rem' }}>Chưa có thông báo nào</div>
                      ) : (
                        (notifications || []).map(n => (
                          <div 
                            key={n.id}
                            style={{
                              padding: '10px',
                              borderRadius: '10px',
                              background: n.unread ? '#eff6ff' : '#f8fafc',
                              border: n.unread ? '1px solid #bfdbfe' : '1px solid #f1f5f9',
                              fontSize: '0.82rem'
                            }}
                          >
                            <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>{n.title}</div>
                            <div style={{ color: '#475569', lineHeight: 1.4 }}>{n.message}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', textAlign: 'right' }}>{n.time}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: 'relative',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '0.84rem',
                color: '#0f172a',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={16} color="#0284c7" />
              <span className="desktop-only-btn">Giỏ Hàng</span>
              {cart.reduce((sum, i) => sum + i.quantity, 0) > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px', right: '-6px',
                  background: '#ef4444', color: 'white',
                  fontSize: '0.7rem', fontWeight: 700,
                  width: '18px', height: '18px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
                }}>
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* User Role Badge & LOGOUT Button */}
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge-blue desktop-only-btn" style={{ padding: '6px 10px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                  👋 Xin chào, {getUserDisplayName()}
                </span>

                <button
                  onClick={logoutRole}
                  className="btn-danger desktop-only-btn"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.25)'
                  }}
                >
                  <LogOut size={14} />
                  <span>Đăng Xuất</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="btn-primary desktop-only-btn"
                style={{ padding: '8px 14px', fontSize: '0.84rem', whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <LogIn size={15} />
                <span>Đăng Nhập</span>
              </button>
            )}

            {/* CLEAN MOBILE DRAWER TRIGGER BUTTON (NO "Menu" TEXT, NO "🍔" EMOJI) */}
            <button
              className="mobile-nav-trigger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '8px 10px',
                borderRadius: '10px',
                border: '1px solid #0284c7',
                background: '#0284c7',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <AlignRight size={22} />
            </button>
          </div>
        </div>
      </header>
      {renderMobileDrawer()}
    </>
  );
};
