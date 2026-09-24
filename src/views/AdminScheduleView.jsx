import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  ArrowRightLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  UserCheck, 
  Edit3, 
  UserX, 
  Stethoscope, 
  Scissors, 
  Filter,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminScheduleView = () => {
  const { 
    staffList, 
    updateStaffSchedule, 
    updateStaffStatus, 
    allBookings, 
    reassignBooking,
    showToast 
  } = useApp();

  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
  const shiftOptions = [
    'Sáng (08:00 - 12:00)',
    'Chiều (13:00 - 17:00)',
    'Trực Tối (17:00 - 21:00)',
    'Cả ngày (08:00 - 17:00)',
    'Nghỉ phép',
    'Nghỉ'
  ];

  const statusOptions = ['Đang làm', 'Đang trực', 'Nghỉ phép', 'Nghỉ ca'];

  // State for Shift Edit Modal
  const [editingSchedule, setEditingSchedule] = useState(null); // { staffId, staffName, day, currentShift }
  const [selectedShift, setSelectedShift] = useState('');

  // State for Workload Reassignment Modal
  const [reassignModalStaff, setReassignModalStaff] = useState(null); // overloaded staff object
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [targetStaffName, setTargetStaffName] = useState('');

  // Filter department
  const [deptFilter, setDeptFilter] = useState('Tất cả');

  // Compute workload per staff member
  const getStaffWorkload = (staffName) => {
    return (allBookings || []).filter(b => b.assignedStaff === staffName || (!b.assignedStaff && staffName.includes('Hoàng'))).length;
  };

  const filteredStaffList = (staffList || []).filter(s => {
    if (deptFilter !== 'Tất cả' && s.department !== deptFilter) return false;
    return true;
  });

  const handleOpenEditShift = (staff, day) => {
    setEditingSchedule({
      staffId: staff.id,
      staffName: staff.name,
      day: day,
      currentShift: staff.schedule?.[day] || 'Sáng (08:00 - 12:00)'
    });
    setSelectedShift(staff.schedule?.[day] || 'Sáng (08:00 - 12:00)');
  };

  const handleSaveShift = () => {
    if (editingSchedule) {
      updateStaffSchedule(editingSchedule.staffId, editingSchedule.day, selectedShift);
      setEditingSchedule(null);
    }
  };

  const handleOpenReassign = (staff) => {
    setReassignModalStaff(staff);
    const staffBookings = (allBookings || []).filter(b => b.assignedStaff === staff.name || (!b.assignedStaff && staff.name.includes('Hoàng')));
    if (staffBookings.length > 0) {
      setSelectedBookingId(staffBookings[0].id);
    } else {
      setSelectedBookingId('');
    }
    
    const otherStaff = (staffList || []).find(s => s.name !== staff.name);
    if (otherStaff) {
      setTargetStaffName(otherStaff.name);
    }
  };

  const handleConfirmReassign = () => {
    if (!selectedBookingId || !targetStaffName) {
      showToast('Vui lòng chọn lịch hẹn và nhân viên nhận bàn giao!', 'error');
      return;
    }
    reassignBooking(selectedBookingId, targetStaffName);
    setReassignModalStaff(null);
  };

  const getShiftBadgeStyle = (shiftText) => {
    if (!shiftText || shiftText === 'Nghỉ') return { bg: '#f1f5f9', color: '#64748b', label: 'Nghỉ' };
    if (shiftText.includes('Nghỉ phép')) return { bg: '#ffe4e6', color: '#e11d48', label: 'Nghỉ phép' };
    if (shiftText.includes('Sáng')) return { bg: '#e0f2fe', color: '#0369a1', label: '☀️ Ca Sáng' };
    if (shiftText.includes('Chiều')) return { bg: '#f3e8ff', color: '#7e22ce', label: '🌆 Ca Chiều' };
    if (shiftText.includes('Trực Tối')) return { bg: '#fef3c7', color: '#b45309', label: '🌙 Trực Tối' };
    if (shiftText.includes('Cả ngày')) return { bg: '#d1fae5', color: '#047857', label: '🌟 Cả Ngày' };
    return { bg: '#e2e8f0', color: '#334155', label: shiftText };
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Đang làm':
        return <span className="badge-emerald">🟢 Đang Làm Việc</span>;
      case 'Đang trực':
        return <span className="badge-blue">🔵 Đang Trực Hotline</span>;
      case 'Nghỉ phép':
        return <span style={{ background: '#ffe4e6', color: '#be123c', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>🔴 Nghỉ Phép</span>;
      default:
        return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>⚪ Nghỉ Ca</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '36px 24px' }}>
      
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
            📅 HỆ THỐNG QUẢN TRỊ ADMIN PORTAL
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '10px', marginBottom: '6px' }}>
            Quản Lý Lịch Làm Việc & Cân Bằng Khối Lượng Công Việc
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.96rem' }}>
            Sắp xếp lịch làm của Bác sĩ / Nhân viên, phân ca trực, theo dõi khối lượng lịch hẹn hôm nay & điều phối nhân sự hiệu quả.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setDeptFilter('Tất cả')}
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
            <Users size={18} />
            <span>Xem Tất Cả Nhân Sự ({staffList.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Card 1 */}
        <div style={{ background: 'white', padding: '22px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>NHÂN VIÊN ĐANG LÀM HÔM NAY</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#d1fae5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={22} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            {staffList.filter(s => s.status === 'Đang làm' || s.status === 'Đang trực').length} <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 500 }}>/ {staffList.length} nhân viên</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 600, marginTop: '4px' }}>
            🟢 Đang hoạt động tại các phòng khám & Spa
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ background: 'white', padding: '22px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>TỔNG LỊCH HẸN KHÁM & SPA</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={22} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7' }}>
            {allBookings.length} <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 500 }}>lịch khám</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 600, marginTop: '4px' }}>
            📊 Đã được phân công công việc
          </div>
        </div>

        {/* Card 3 */}
        <div style={{ background: 'white', padding: '22px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>BÁC SĨ QUÁ TẢI ( &gt; 8 LỊCH )</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ffe4e6', color: '#be123c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={22} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#be123c' }}>
            {staffList.filter(s => getStaffWorkload(s.name) >= 8).length} <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 500 }}>bác sĩ</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#e11d48', fontWeight: 600, marginTop: '4px' }}>
            ⚠️ Cần Admin hỗ trợ chuyển bớt lịch
          </div>
        </div>

      </div>

      {/* SECTION 1: WORKLOAD MONITORING & APPOINTMENT REASSIGNMENT */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #e2e8f0', marginBottom: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={22} color="#0284c7" />
              <span>Theo Dõi Tình Trạng & Điều Phối Lịch Hẹn Bác Sĩ</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
              Admin xem số lịch hẹn thực tế hôm nay của từng bác sĩ/nhân viên và tiến hành chuyển giao lịch khi quá tải.
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 16px' }}>Nhân Viên / Bác Sĩ</th>
                <th style={{ padding: '14px 16px' }}>Chuyên Khoa / Phòng</th>
                <th style={{ padding: '14px 16px' }}>Ca Làm Hôm Nay</th>
                <th style={{ padding: '14px 16px', textAlign: 'center' }}>Số Lịch Hẹn Phân Công</th>
                <th style={{ padding: '14px 16px' }}>Trạng Thái Làm Việc</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Thao Tác Điều Phối</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaffList.map(staff => {
                const workload = getStaffWorkload(staff.name);
                const isOverloaded = workload >= 8;
                return (
                  <tr key={staff.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={staff.avatar} 
                          alt={staff.name} 
                          style={{ width: '42px', height: '42px', borderRadius: '12px', objectFit: 'cover' }} 
                        />
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{staff.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Mã: {staff.id}</div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '16px', color: '#334155', fontWeight: 600 }}>
                      {staff.department}
                    </td>

                    <td style={{ padding: '16px' }}>
                      <span style={{
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        display: 'inline-block'
                      }}>
                        ⏰ {staff.schedule?.['Thứ 2'] || 'Sáng (08:00 - 12:00)'}
                      </span>
                    </td>

                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: isOverloaded ? '#ffe4e6' : workload > 4 ? '#e0f2fe' : '#f1f5f9',
                        color: isOverloaded ? '#be123c' : workload > 4 ? '#0369a1' : '#475569',
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}>
                        {isOverloaded && <AlertTriangle size={15} color="#e11d48" />}
                        <span>{workload} lịch hẹn</span>
                        {isOverloaded && <span style={{ fontSize: '0.72rem', background: '#be123c', color: 'white', padding: '1px 6px', borderRadius: '8px' }}>Quá tải</span>}
                      </div>
                    </td>

                    <td style={{ padding: '16px' }}>
                      <select
                        value={staff.status}
                        onChange={(e) => updateStaffStatus(staff.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          background: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>

                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenReassign(staff)}
                        className="btn-primary"
                        style={{
                          padding: '7px 14px',
                          fontSize: '0.82rem',
                          background: isOverloaded ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' : 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <ArrowRightLeft size={14} />
                        <span>Chuyển Bớt Lịch</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: WEEKLY SHIFT MATRIX TABLE */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={22} color="#0284c7" />
              <span>Bảng Phân Ca Làm Việc Theo Tuần (Weekly Shift Matrix)</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
              Click trực tiếp vào từng ô ca làm để phân công hoặc đổi ca trực cho Bác sĩ / Nhân viên.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Filter size={16} color="#64748b" />
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: 600 }}>Phòng ban:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.86rem', fontWeight: 700 }}
            >
              <option value="Tất cả">Tất cả Phòng Ban</option>
              <option value="Bác Sĩ Thú Y">Bác Sĩ Thú Y</option>
              <option value="Kỹ Thuật Viên Spa">Kỹ Thuật Viên Spa</option>
              <option value="Lễ Tân">Lễ Tân</option>
              <option value="Vận Chuyển">Vận Chuyển</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', textAlign: 'center' }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', minWidth: '180px' }}>Bác Sĩ / Nhân Viên</th>
                {daysOfWeek.map(day => (
                  <th key={day} style={{ padding: '14px 10px', minWidth: '130px' }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStaffList.map(staff => (
                <tr key={staff.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={staff.avatar} alt={staff.name} style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div>{staff.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>{staff.department}</div>
                      </div>
                    </div>
                  </td>

                  {daysOfWeek.map(day => {
                    const shiftText = staff.schedule?.[day] || 'Sáng (08:00 - 12:00)';
                    const badge = getShiftBadgeStyle(shiftText);
                    return (
                      <td key={day} style={{ padding: '10px', textAlign: 'center' }}>
                        <div
                          onClick={() => handleOpenEditShift(staff, day)}
                          style={{
                            background: badge.bg,
                            color: badge.color,
                            padding: '6px 8px',
                            borderRadius: '10px',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'transform 0.15s ease',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                            userSelect: 'none'
                          }}
                          title="Click để thay đổi ca làm"
                        >
                          {badge.label}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT SHIFT MODAL */}
      {editingSchedule && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '20px'
        }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '480px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              ✏️ Thay Đổi Ca Làm Việc
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '20px' }}>
              Phân công lại ca trực cho <strong>{editingSchedule.staffName}</strong> vào ngày <strong>{editingSchedule.day}</strong>.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Chọn Ca Làm Việc Mới:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {shiftOptions.map(opt => (
                  <label 
                    key={opt}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
                      borderRadius: '12px', border: selectedShift === opt ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      background: selectedShift === opt ? '#eff6ff' : 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="shift" 
                      value={opt} 
                      checked={selectedShift === opt}
                      onChange={() => setSelectedShift(opt)} 
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setEditingSchedule(null)} 
                className="btn-secondary" 
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                Hủy Bỏ
              </button>
              <button 
                onClick={handleSaveShift} 
                className="btn-primary" 
                style={{ padding: '10px 20px', fontSize: '0.88rem' }}
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REASSIGN WORKLOAD MODAL */}
      {reassignModalStaff && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '20px'
        }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '540px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0284c7', marginBottom: '8px' }}>
              <ArrowRightLeft size={24} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                Chuyển Lịch Hẹn Cho Bác Sĩ / Nhân Viên Khác
              </h3>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '20px' }}>
              Bàn giao lịch khám từ <strong>{reassignModalStaff.name}</strong> sang nhân sự có thời gian rảnh để giảm tải công việc.
            </p>

            {/* Select Booking */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                1. Chọn Lịch Hẹn Cần Chuyển:
              </label>
              <select
                value={selectedBookingId}
                onChange={(e) => setSelectedBookingId(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 600 }}
              >
                {(allBookings || [])
                  .filter(b => b.assignedStaff === reassignModalStaff.name || (!b.assignedStaff && reassignModalStaff.name.includes('Hoàng')))
                  .map(b => (
                    <option key={b.id} value={b.id}>
                      [{b.id}] {b.customerName} - {b.petName} ({b.serviceName})
                    </option>
                  ))
                }
              </select>
            </div>

            {/* Select Target Doctor */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                2. Bàn Giao Cho Bác Sĩ / Nhân Viên Tiếp Nhận:
              </label>
              <select
                value={targetStaffName}
                onChange={(e) => setTargetStaffName(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 600 }}
              >
                {(staffList || [])
                  .filter(s => s.name !== reassignModalStaff.name)
                  .map(s => {
                    const currentWorkload = getStaffWorkload(s.name);
                    return (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.department}) - Đang có {currentWorkload} lịch
                      </option>
                    );
                  })
                }
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setReassignModalStaff(null)} 
                className="btn-secondary" 
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                Hủy Bỏ
              </button>
              <button 
                onClick={handleConfirmReassign} 
                className="btn-primary" 
                style={{ padding: '10px 20px', fontSize: '0.88rem', background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)' }}
              >
                Xác Nhận Chuyển Lịch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminScheduleView;
