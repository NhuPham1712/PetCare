import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  Plus, 
  UserCheck, 
  ShieldCheck, 
  Stethoscope, 
  Scissors, 
  CheckCircle2, 
  XCircle,
  Phone,
  Mail,
  Edit,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StaffManagementView = () => {
  const { showToast } = useApp();

  const [staffList, setStaffList] = useState([
    {
      id: 'NV-001',
      name: 'BS. Nguyễn Văn Hoàng',
      role: 'Bác Sĩ Thú Y Trưởng',
      department: 'Bác Sĩ Thú Y',
      phone: '0988 123 456',
      email: 'hoang.nguyen@petcare.com',
      shift: 'Ca Sáng (08:00 - 12:00 & 13:00 - 17:00)',
      days: 'T2, T3, T4, T5, T6, T7',
      status: 'Đang Làm Việc',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'NV-002',
      name: 'BS. Trần Thị Mai',
      role: 'Bác Sĩ Thú Y Chuyên Khoa Spa',
      department: 'Bác Sĩ Thú Y',
      phone: '0977 234 567',
      email: 'mai.tran@petcare.com',
      shift: 'Ca Chiều & Tối (13:00 - 21:00)',
      days: 'T3, T4, T5, T6, T7, CN',
      status: 'Đang Làm Việc',
      avatar: 'https://images.unsplash.com/photo-1594824813566-78a9942a033f?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'NV-003',
      name: 'Lê Văn Cường',
      role: 'Kỹ Thuật Viên Grooming & Spa',
      department: 'Kỹ Thuật Viên Spa',
      phone: '0966 345 678',
      email: 'cuong.le@petcare.com',
      shift: 'Ca Sáng (08:00 - 16:00)',
      days: 'T2, T3, T4, T5, T6',
      status: 'Đang Làm Việc',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'NV-004',
      name: 'Phạm Thị Hương',
      role: 'Lễ Tân & Chăm Sóc Khách Hàng',
      department: 'Lễ Tân',
      phone: '0955 456 789',
      email: 'huong.pham@petcare.com',
      shift: 'Ca Hành Chính (08:00 - 17:00)',
      days: 'T2, T3, T4, T5, T6, T7',
      status: 'Đã Xin Nghỉ Phép',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'NV-005',
      name: 'Ngô Minh Tú',
      role: 'Chuyên Viên Đưa Đón Thú Cưng',
      department: 'Vận Chuyển',
      phone: '0944 567 890',
      email: 'tu.ngo@petcare.com',
      shift: 'Ca Xoay Vòng (24/7 Hotline)',
      days: 'T2, T4, T6, CN',
      status: 'Đang Làm Việc',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    }
  ]);

  const [activeDepartmentFilter, setActiveDepartmentFilter] = useState('Tất cả');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Bác Sĩ Thú Y',
    department: 'Bác Sĩ Thú Y',
    phone: '',
    email: '',
    shift: 'Ca Sáng (08:00 - 17:00)',
    days: 'T2, T3, T4, T5, T6, T7',
    status: 'Đang Làm Việc',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
  });

  const filteredStaff = staffList.filter(s => {
    if (activeDepartmentFilter !== 'Tất cả' && s.department !== activeDepartmentFilter) return false;
    return true;
  });

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    const created = {
      ...newStaff,
      id: `NV-00${staffList.length + 1}`
    };
    setStaffList([created, ...staffList]);
    setShowAddModal(false);
    showToast(`Đã thêm nhân viên "${created.name}" vào danh sách!`);
  };

  const handleToggleStatus = (id) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Đang Làm Việc' ? 'Đã Xin Nghỉ Phép' : 'Đang Làm Việc';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
    showToast('Đã cập nhật trạng thái làm việc nhân viên!');
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '36px 24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge-blue">TRANG QUẢN TRỊ ADMIN PORTAL</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Quản Lý Nhân Viên & Phân Ca Làm Việc
          </h1>
          <p style={{ color: '#64748b' }}>
            Quản lý đội ngũ bác sĩ thú y, kỹ thuật viên spa, lịch làm việc & phân ca trực 24/7
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '12px 20px', fontSize: '0.92rem' }}
        >
          <Plus size={18} />
          <span>Thêm Nhân Viên Mới</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>TỔNG NHÂN SỰ</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>{staffList.length} người</div>
          <div style={{ fontSize: '0.78rem', color: '#16a34a', marginTop: '2px' }}>Đầy đủ các bộ phận</div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>ĐANG TRỰC HÔM NAY</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
            {staffList.filter(s => s.status === 'Đang Làm Việc').length} người
          </div>
          <div style={{ fontSize: '0.78rem', color: '#15803d', marginTop: '2px' }}>Đang sẵn sàng phục vụ</div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>NGHỈ PHÉP</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
            {staffList.filter(s => s.status !== 'Đang Làm Việc').length} người
          </div>
          <div style={{ fontSize: '0.78rem', color: '#b45309', marginTop: '2px' }}>Đã có lịch duyệt thay ca</div>
        </div>
      </div>

      {/* Department Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
        {['Tất cả', 'Bác Sĩ Thú Y', 'Kỹ Thuật Viên Spa', 'Lễ Tân', 'Vận Chuyển'].map(dept => (
          <button
            key={dept}
            onClick={() => setActiveDepartmentFilter(dept)}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.86rem',
              background: activeDepartmentFilter === dept ? '#0284c7' : 'white',
              color: activeDepartmentFilter === dept ? 'white' : '#475569',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Staff Table */}
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                <th style={{ padding: '14px 16px' }}>Mã NV</th>
                <th style={{ padding: '14px 16px' }}>Họ & Tên</th>
                <th style={{ padding: '14px 16px' }}>Chức Danh / Bộ Phận</th>
                <th style={{ padding: '14px 16px' }}>Liên Hệ (SĐT & Email)</th>
                <th style={{ padding: '14px 16px' }}>Ca Làm Việc Phân Công</th>
                <th style={{ padding: '14px 16px' }}>Ngày Trực</th>
                <th style={{ padding: '14px 16px' }}>Trạng Thái</th>
                <th style={{ padding: '14px 16px' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0284c7' }}>{s.id}</td>
                  
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={s.avatar} alt={s.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{s.name}</div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#334155' }}>{s.role}</div>
                    <span className="badge-blue" style={{ fontSize: '0.75rem', marginTop: '2px' }}>{s.department}</span>
                  </td>

                  <td style={{ padding: '14px 16px', fontSize: '0.82rem' }}>
                    <div>📞 {s.phone}</div>
                    <div style={{ color: '#64748b' }}>✉️ {s.email}</div>
                  </td>

                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="#0284c7" />
                      <span>{s.shift}</span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px', fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
                    {s.days}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '8px', fontWeight: 700, fontSize: '0.78rem',
                      background: s.status === 'Đang Làm Việc' ? '#d1fae5' : '#fef3c7',
                      color: s.status === 'Đang Làm Việc' ? '#047857' : '#b45309',
                      display: 'inline-flex', alignItems: 'center', gap: '4px'
                    }}>
                      {s.status === 'Đang Làm Việc' ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                      {s.status}
                    </span>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <button 
                      onClick={() => handleToggleStatus(s.id)}
                      style={{
                        padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700,
                        border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer'
                      }}
                    >
                      Đổi Trạng Thái
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '540px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>Thêm Nhân Viên & Phân Ca Làm Mới</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleAddStaffSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Họ và Tên Nhân Viên</label>
                <input type="text" required className="input-field" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Bộ phận</label>
                  <select className="input-field" value={newStaff.department} onChange={e => setNewStaff({ ...newStaff, department: e.target.value, role: e.target.value })}>
                    <option value="Bác Sĩ Thú Y">Bác Sĩ Thú Y</option>
                    <option value="Kỹ Thuật Viên Spa">Kỹ Thuật Viên Spa</option>
                    <option value="Lễ Tân">Lễ Tân</option>
                    <option value="Vận Chuyển">Vận Chuyển</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Số điện thoại</label>
                  <input type="text" required className="input-field" value={newStaff.phone} onChange={e => setNewStaff({ ...newStaff, phone: e.target.value })} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Email làm việc</label>
                <input type="email" required className="input-field" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Ca làm việc phân công</label>
                <select className="input-field" value={newStaff.shift} onChange={e => setNewStaff({ ...newStaff, shift: e.target.value })}>
                  <option value="Ca Sáng (08:00 - 12:00 & 13:00 - 17:00)">Ca Sáng (08:00 - 17:00)</option>
                  <option value="Ca Chiều & Tối (13:00 - 21:00)">Ca Chiều & Tối (13:00 - 21:00)</option>
                  <option value="Ca Xoay Vòng (24/7 Hotline)">Ca Xoay Vòng 24/7 Hotline</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '12px', marginTop: '10px' }}>
                Xác Nhận Thêm Nhân Viên
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
