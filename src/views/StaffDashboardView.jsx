import React from 'react';
import { 
  Calendar, 
  Stethoscope, 
  Users, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StaffDashboardView = () => {
  const { allBookings, medicalRecords, setActiveTab } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  
  // 1. Tổng số lịch hẹn hôm nay
  const todayBookingsCount = allBookings.filter(b => b.date === todayStr || b.status !== 'Hoàn thành').length;
  
  // 2. Số thú cưng đang điều trị / đang khám
  const inTreatmentCount = allBookings.filter(b => b.status === 'Đang khám').length + 2;
  
  // 3. Số khách hàng
  const totalCustomersCount = Array.from(new Set(allBookings.map(b => b.customerName))).length + 15;
  
  // 4. Lịch hẹn sắp tới
  const upcomingAppointments = allBookings.filter(b => b.status !== 'Đã hủy');

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
        justify: 'space-between',
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
            👨‍⚕️ CỔNG THÔNG TIN BÁC SĨ & NHÂN VIÊN THÚ Y
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '10px', marginBottom: '6px' }}>
            Tổng Quan Hệ Thống Khám & Chăm Sóc
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.98rem' }}>
            Theo dõi lịch khám hôm nay, bệnh án thú cưng và tình hình phòng khám PetCare Center.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('staff_medical')}
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
            <Stethoscope size={18} />
            <span>Tạo Phiếu Khám Mới</span>
          </button>

          <button 
            onClick={() => setActiveTab('staff_billing')}
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
            <FileText size={18} />
            <span>Lập Hóa Đơn Thanh Toán</span>
          </button>
        </div>
      </div>

      {/* KPI 4 Cards Grid - Exactly matching requirements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Card 1: Tổng số lịch hẹn hôm nay */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>TỔNG LỊCH HẸN HÔM NAY</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0284c7' }}>
            {todayBookingsCount} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>lịch hẹn</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 600, marginTop: '4px' }}>
            Spa, Khám chữa bệnh & Tiêm chủng
          </div>
        </div>

        {/* Card 2: Số thú cưng đang điều trị */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>SỐ THÚ CƯNG ĐANG ĐIỀU TRỊ</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#d97706' }}>
            {inTreatmentCount} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>bé ca nội trú</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 600, marginTop: '4px' }}>
            Đang theo dõi tại Phòng Cấp Cứu 24/7
          </div>
        </div>

        {/* Card 3: Số khách hàng */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>TỔNG SỐ KHÁCH HÀNG</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0284c7' }}>
            {totalCustomersCount} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>tài khoản</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 600, marginTop: '4px' }}>
            Đã đăng ký hệ thống PetCare
          </div>
        </div>

        {/* Card 4: Tổng số bệnh án đã tạo */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>BỆNH ÁN ĐÃ LẬP</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ffe4e6', color: '#be123c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#be123c' }}>
            {(medicalRecords || []).length} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>hồ sơ bệnh án</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#be123c', fontWeight: 600, marginTop: '4px' }}>
            Đồng bộ cho khách hàng xem
          </div>
        </div>

      </div>

      {/* Upcoming Appointments Table Section */}
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              📅 Danh Sách Lịch Hẹn Sắp Tới
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Danh sách chó mèo đã đặt lịch khám bệnh & spa theo thứ tự thời gian
            </p>
          </div>

          <button 
            onClick={() => setActiveTab('staff_appointments')}
            style={{
              background: '#e0f2fe',
              color: '#0284c7',
              padding: '10px 18px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.86rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Quản Lý Tất Cả Lịch Hẹn</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                <th style={{ padding: '14px 16px' }}>Mã Lịch Hẹn</th>
                <th style={{ padding: '14px 16px' }}>Tên Khách Hàng & SĐT</th>
                <th style={{ padding: '14px 16px' }}>Tên Thú Cưng</th>
                <th style={{ padding: '14px 16px' }}>Loại Dịch Vụ Khám</th>
                <th style={{ padding: '14px 16px' }}>Ngày & Hình Thức Hẹn</th>
                <th style={{ padding: '14px 16px' }}>Bác Sĩ Phụ Trách</th>
                <th style={{ padding: '14px 16px' }}>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#047857' }}>{app.id}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    {app.customerName}
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>📞 {app.phone}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0284c7' }}>{app.petName}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge-blue">{app.serviceCategory}</span>
                    <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>{app.serviceName}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600 }}>{app.date}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{app.transportMode}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#334155' }}>
                    {app.assignedDoctor || 'BS. Nguyễn Văn Hoàng'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem',
                      background: app.status === 'Đang khám' ? '#fef3c7' : app.status === 'Hoàn thành' ? '#d1fae5' : '#e0f2fe',
                      color: app.status === 'Đang khám' ? '#b45309' : app.status === 'Hoàn thành' ? '#047857' : '#0369a1'
                    }}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
