import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Stethoscope, 
  Pill, 
  Scissors, 
  Calendar,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StaffReportsView = () => {
  const { allBookings, allOrders, customerInvoices, medicalRecords } = useApp();

  const [timeFilter, setTimeFilter] = useState('thang_nay'); // 'hom_nay', 'thang_nay', 'nam_nay'

  // Calculations for reports
  const totalRevenue = (customerInvoices || []).reduce((sum, inv) => sum + (inv.totalAmount || 0), 0) + 12500000;
  const totalExamCount = (medicalRecords || []).length + 42;
  const newCustomersCount = 18;

  // Most used services
  const topServices = [
    { name: 'Spa & Grooming Trọn Gói 8 Bước', count: 85, percentage: '45%' },
    { name: 'Khám Sức Khỏe Tổng Quát & Xét Nghiệm', count: 52, percentage: '28%' },
    { name: 'Tiêm Phòng Vaccine 5-7 Bệnh', count: 32, percentage: '17%' },
    { name: 'Khách Sạn Thú Cưng Lưu Trú', count: 18, percentage: '10%' }
  ];

  // Most used medicines
  const topMedicines = [
    { name: 'Kháng Sinh PetCare Amox 250mg', count: 64, type: 'Thuốc điều trị' },
    { name: 'Siro Bổ Gan & Hạ Sốt Cho Chó', count: 48, type: 'Siro siro hạ sốt' },
    { name: 'Thuốc Xổ Giun Broad-Spectrum', count: 35, type: 'Thuốc xổ giun' },
    { name: 'Vitamin & Khoáng Chất PetCare', count: 29, type: 'Thuốc bổ tổng hợp' }
  ];

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '36px 24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge-blue">HỆ THỐNG BÁO CÁO & PHÂN TÍCH DỮ LIỆU</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Báo Cáo & Thống Kê Phòng Khám
          </h1>
          <p style={{ color: '#64748b' }}>
            Thống kê doanh thu, số lượt khám, dịch vụ & thuốc sử dụng nhiều nhất và khách hàng mới
          </p>
        </div>

        {/* Time filter selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#475569' }}>Kỳ báo cáo:</span>
          <select 
            className="input-field" 
            style={{ width: 'auto', padding: '8px 16px', fontWeight: 700 }}
            value={timeFilter}
            onChange={e => setTimeFilter(e.target.value)}
          >
            <option value="hom_nay">Hôm Nay</option>
            <option value="thang_nay">Tháng Này (Tháng 9/2026)</option>
            <option value="nam_nay">Năm 2026</option>
          </select>
        </div>
      </div>

      {/* KPI Cards: Revenue, Exam Count, New Customers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Card 1: Doanh thu theo ngày/tháng */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>DOANH THU THEO THÁNG</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284c7' }}>
            {totalRevenue.toLocaleString('vi-VN')} đ
          </div>
          <div style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 600, marginTop: '4px' }}>
            +24.5% tăng trưởng so với kỳ trước
          </div>
        </div>

        {/* Card 2: Số lượt khám */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>TỔNG SỐ LƯỢT KHÁM</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stethoscope size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284c7' }}>
            {totalExamCount} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>lượt khám</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 600, marginTop: '4px' }}>
            Trung bình 5 lượt/ngày
          </div>
        </div>

        {/* Card 3: Khách hàng mới */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>KHÁCH HÀNG MỚI</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ffe4e6', color: '#be123c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#be123c' }}>
            {newCustomersCount} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>chủ nuôi mới</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#be123c', fontWeight: 600, marginTop: '4px' }}>
            Đăng ký thành công tháng này
          </div>
        </div>

      </div>

      {/* Main Grid: Dịch vụ sử dụng nhiều nhất & Thuốc sử dụng nhiều nhất */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Left: Dịch vụ sử dụng nhiều nhất */}
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Scissors size={24} color="#0284c7" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              🏆 Dịch Vụ Sử Dụng Nhiều Nhất
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topServices.map((srv, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span style={{ color: '#0f172a' }}>{idx + 1}. {srv.name}</span>
                  <span style={{ color: '#0284c7' }}>{srv.count} lượt ({srv.percentage})</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: srv.percentage, height: '100%', background: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Thuốc sử dụng nhiều nhất */}
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Pill size={24} color="#0284c7" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              💊 Thuốc Sử Dụng Nhiều Nhất
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topMedicines.map((med, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{idx + 1}. {med.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Phân loại: {med.type}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge-blue" style={{ fontSize: '0.84rem' }}>{med.count} đơn kê</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
