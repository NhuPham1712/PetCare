import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  UserCheck, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRightLeft,
  Filter,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StaffAppointmentsView = () => {
  const { allBookings, setAllBookings, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');

  const staffList = [
    'BS. Nguyễn Văn Hoàng (Bác sĩ trưởng)',
    'BS. Trần Thị Mai (Chuyên khoa Spa)',
    'KTV. Lê Văn Cường (Kỹ thuật viên)',
    'NV. Ngô Minh Tú (Lễ tân/Vận chuyển)'
  ];

  // Search by customer name & filter by status
  const filteredAppointments = allBookings.filter(b => {
    const matchesName = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        b.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'Tất cả' || b.status === statusFilter;
    return matchesName && matchesStatus;
  });

  // Chuyển lịch hẹn cho Bác sĩ khác
  const handleReassignDoctor = (bookingId, newDoctor) => {
    setAllBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, assignedDoctor: newDoctor };
      }
      return b;
    }));
    showToast(`Đã chuyển lịch hẹn ${bookingId} cho ${newDoctor}`);
  };

  // Cập nhật trạng thái
  const handleUpdateStatus = (bookingId, newStatus) => {
    setAllBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    }));
    showToast(`Cập nhật trạng thái lịch hẹn ${bookingId} -> ${newStatus}`);
  };

  // Hủy lịch hẹn
  const handleCancelAppointment = (bookingId) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy lịch hẹn ${bookingId}?`)) {
      handleUpdateStatus(bookingId, 'Đã hủy');
    }
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '36px 24px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '28px' }}>
        <span className="badge-blue">QUẢN LÝ LỊCH HẸN KHÁM & DỊCH VỤ</span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
          Danh Sách Lịch Hẹn Khách Hàng
        </h1>
        <p style={{ color: '#64748b' }}>
          Tìm kiếm khách hàng, chuyển ca cho Bác sĩ/Nhân viên phụ trách & cập nhật trạng thái hẹn
        </p>
      </div>

      {/* Control Bar: Search & Status Filter */}
      <div style={{ 
        background: 'white', 
        borderRadius: '20px', 
        padding: '20px', 
        border: '1px solid #e2e8f0', 
        marginBottom: '24px', 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        {/* Search by Customer Name */}
        <div style={{ position: 'relative', minWidth: '300px', flex: 1 }}>
          <Search size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="🔎 Tìm kiếm theo tên khách hàng hoặc SĐT..."
            className="input-field"
            style={{ paddingLeft: '42px' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#475569' }}>Trạng thái:</span>
          <select
            className="input-field"
            style={{ width: 'auto', padding: '8px 14px', fontWeight: 600 }}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="Tất cả">Tất cả trạng thái</option>
            <option value="Đã nhận">Đã nhận</option>
            <option value="Đang khám">Đang khám</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Appointments List Table */}
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                <th style={{ padding: '14px 16px' }}>Mã Lịch</th>
                <th style={{ padding: '14px 16px' }}>Khách Hàng</th>
                <th style={{ padding: '14px 16px' }}>Thú Cưng</th>
                <th style={{ padding: '14px 16px' }}>Dịch Vụ Đặt</th>
                <th style={{ padding: '14px 16px' }}>Ngày & Đưa Đón</th>
                <th style={{ padding: '14px 16px' }}>Chuyển Bác Sĩ Phụ Trách</th>
                <th style={{ padding: '14px 16px' }}>Cập Nhật Trạng Thái</th>
                <th style={{ padding: '14px 16px' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    Chưa tìm thấy lịch hẹn nào phù hợp với từ khóa "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(app => (
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

                    {/* Chuyển lịch hẹn cho Nhân viên / Bác sĩ khác */}
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={app.assignedDoctor || staffList[0]}
                        onChange={e => handleReassignDoctor(app.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          border: '1px solid #cbd5e1',
                          background: '#f8fafc',
                          width: '100%'
                        }}
                      >
                        {staffList.map((st, idx) => (
                          <option key={idx} value={st.split(' (')[0]}>{st}</option>
                        ))}
                      </select>
                    </td>

                    {/* Cập nhật trạng thái đồng bộ 5 trạng thái */}
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={app.status}
                        onChange={e => handleUpdateStatus(app.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          border: '1px solid #cbd5e1',
                          background: app.status === 'Chờ xác nhận' ? '#fef3c7' : app.status === 'Đã xác nhận' ? '#e0f2fe' : app.status === 'Đang thực hiện' ? '#ffedd5' : app.status === 'Hoàn thành' ? '#d1fae5' : '#ffe4e6',
                          color: app.status === 'Chờ xác nhận' ? '#b45309' : app.status === 'Đã xác nhận' ? '#0369a1' : app.status === 'Đang thực hiện' ? '#c2410c' : app.status === 'Hoàn thành' ? '#047857' : '#ef4444'
                        }}
                      >
                        <option value="Chờ xác nhận">🟡 Chờ xác nhận</option>
                        <option value="Đã xác nhận">🔵 Đã xác nhận</option>
                        <option value="Đang thực hiện">🟠 Đang thực hiện</option>
                        <option value="Hoàn thành">🟢 Hoàn thành</option>
                        <option value="Đã hủy">🔴 Đã hủy</option>
                      </select>
                    </td>

                    {/* Hủy lịch hẹn */}
                    <td style={{ padding: '14px 16px' }}>
                      {app.status !== 'Đã hủy' && (
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          style={{
                            background: '#ffe4e6',
                            color: '#ef4444',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          Hủy Lịch
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
