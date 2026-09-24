import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Dog, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboardView = () => {
  const { 
    pets, 
    products, 
    allBookings, 
    allOrders, 
    setActiveTab, 
    dbConnected 
  } = useApp();

  // Financial & Stat Computations
  const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = allOrders.filter(o => o.status !== 'Hoàn thành').length;
  const todayBookings = allBookings.filter(b => b.status !== 'Hoàn thành').length;

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '36px 24px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
        borderRadius: '24px',
        padding: '32px',
        color: 'white',
        marginBottom: '32px',
        boxShadow: '0 12px 30px rgba(2, 132, 199, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <span style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            fontSize: '0.82rem', 
            fontWeight: 700, 
            letterSpacing: '0.5px' 
          }}>
            👑 BẢNG ĐIỀU HÀNH QUẢN TRỊ ADMIN PORTAL
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '10px', marginBottom: '6px' }}>
            Tổng Quan Hệ Thống PetCare Center
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.98rem' }}>
            Chào mừng Quản trị viên! Theo dõi doanh thu, lịch làm nhân viên & điều hành hệ thống CSDL Cloud Aiven.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('admin')}
            style={{
              background: 'white',
              color: '#0284c7',
              padding: '12px 20px',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
            }}
          >
            <Plus size={18} />
            <span>Thêm Chó/Mèo & Sản Phẩm</span>
          </button>

          <button 
            onClick={() => setActiveTab('staff_mgmt')}
            style={{
              background: 'rgba(255,255,255,0.18)',
              color: 'white',
              backdropFilter: 'blur(8px)',
              padding: '12px 20px',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: '1px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={18} />
            <span>Quản Lý Nhân Viên & Ca Làm</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Card 1: Doanh thu */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>TỔNG DOANH THU ĐƠN HÀNG</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={22} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            {totalRevenue.toLocaleString('vi-VN')} đ
          </div>
          <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={14} /> +18.5% so với tháng trước
          </div>
        </div>

        {/* Card 2: Lịch hẹn dịch vụ */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>LỊCH DỊCH VỤ CẦN XỬ LÝ</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={22} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706' }}>
            {todayBookings} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b' }}>/ {allBookings.length} tổng</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 600, marginTop: '4px' }}>
            Spa, Khám chữa bệnh & Boarding
          </div>
        </div>

        {/* Card 3: CSDL Thú Cưng */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>THÚ CƯNG TRÊN CSDL</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ffe4e6', color: '#be123c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Dog size={22} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            {pets.length} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b' }}>bé chó & mèo</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#be123c', fontWeight: 600, marginTop: '4px' }}>
            Đã đồng bộ Aiven Cloud Database
          </div>
        </div>

        {/* Card 4: Nhân Viên Đang Trực */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>NHÂN VIÊN ĐANG TRỰC</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#d1fae5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={22} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#047857' }}>
            5 <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b' }}>/ 8 nhân sự</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 600, marginTop: '4px' }}>
            Ca Sáng (08:00 - 17:00)
          </div>
        </div>

      </div>

      {/* Main Content Grid: Quick Actions & Recent Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Recent Orders & Bookings Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Recent Bookings Quick Table */}
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Lịch Hẹn Dịch Vụ Mới Nhất</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Theo dõi ca khám, dịch vụ spa và đón tận nhà</p>
              </div>
              <button 
                onClick={() => setActiveTab('management')}
                style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Xem Tất Cả Đơn Hàng →
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#64748b', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '10px 12px' }}>Mã Lịch</th>
                    <th style={{ padding: '10px 12px' }}>Khách Hàng</th>
                    <th style={{ padding: '10px 12px' }}>Thú Cưng</th>
                    <th style={{ padding: '10px 12px' }}>Dịch Vụ</th>
                    <th style={{ padding: '10px 12px' }}>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings.slice(0, 4).map(bk => (
                    <tr key={bk.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 800, color: '#0284c7' }}>{bk.id}</td>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{bk.customerName}</td>
                      <td style={{ padding: '12px' }}>{bk.petName}</td>
                      <td style={{ padding: '12px' }}><span className="badge-blue">{bk.serviceCategory}</span></td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: '8px', fontWeight: 700, fontSize: '0.78rem',
                          background: bk.status === 'Hoàn thành' ? '#d1fae5' : '#fef3c7',
                          color: bk.status === 'Hoàn thành' ? '#047857' : '#b45309'
                        }}>
                          {bk.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
              ⚡ Nút Tắt Điều Hành Nhanh Cho Admin
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              
              <div 
                onClick={() => setActiveTab('admin')}
                style={{ padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.95rem' }}>🐶 Thêm Chó/Mèo Vào CSDL</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Cập nhật chó mèo thuần chủng VKA mới lên web</div>
              </div>

              <div 
                onClick={() => setActiveTab('admin')}
                style={{ padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.95rem' }}>📦 Thêm Thức Ăn & Phụ Kiện</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Nhập sản phẩm hạt, pate, đồ chơi mới</div>
              </div>

              <div 
                onClick={() => setActiveTab('staff_mgmt')}
                style={{ padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.95rem' }}>👥 Quản Lý Ca Làm Nhân Viên</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Phân ca trực Bác sĩ & KTV Spa</div>
              </div>

              <div 
                onClick={() => setActiveTab('user')}
                style={{ padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.95rem' }}>👤 Hồ Sơ Admin & Cài Đặt</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Chỉnh sửa thông tin quản trị viên</div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Database System Status & Quick Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Cloud Database Connection Status Widget */}
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Database size={24} color="#0284c7" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>CSDL Cloud Online</h3>
            </div>

            <div style={{
              background: dbConnected ? '#f0fdf4' : '#fffbeb',
              border: dbConnected ? '1px solid #bbf7d0' : '1px solid #fde68a',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: dbConnected ? '#166534' : '#92400e', fontSize: '0.9rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: dbConnected ? '#22c55e' : '#f59e0b' }}></span>
                {dbConnected ? 'Kết Nối Aiven MySQL Thành Công' : 'Đang sử dụng dữ liệu tạm thời'}
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px', lineHeight: 1.5 }}>
                Host: <code>petcare-csdl...aivencloud.com:12368</code><br />
                Đồng bộ dữ liệu trực tiếp theo thời gian thực.
              </p>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tổng số bảng:</span>
                <strong>6 Tables</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Bảo mật SSL Cloud:</span>
                <strong style={{ color: '#16a34a' }}>Đã bật (Active)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Lần đồng bộ cuối:</span>
                <strong>Vừa xong</strong>
              </div>
            </div>
          </div>

          {/* Quick Notice Panel */}
          <div style={{ background: '#0f172a', color: 'white', borderRadius: '20px', padding: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8', marginBottom: '8px' }}>
              💡 Ghi Chú Phân Quyền Admin
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Bạn đang ở giao diện **Admin Portal riêng biệt**. Thanh menu trên cùng đã được tối ưu chỉ giữ lại các chức năng điều hành của Quản trị viên.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
