import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  Dog, 
  ShoppingBag, 
  Stethoscope, 
  Hotel, 
  Plus, 
  Trash2, 
  Save, 
  Calendar, 
  Clock, 
  Crown, 
  Briefcase, 
  FileText, 
  Activity, 
  CheckCircle2, 
  ShieldAlert, 
  LogOut 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserProfileView = () => {
  const { 
    user, 
    updateUserProfile, 
    addCustomerPet, 
    deleteCustomerPet, 
    userRole, 
    isLoggedIn, 
    isAdmin, 
    isStaff, 
    currentProfile, 
    logoutRole, 
    setActiveTab,
    medicalRecords,
    customerInvoices,
    notifications,
    markAllNotificationsAsRead
  } = useApp();

  const [activeTab, setActiveTabTab] = useState(userRole === 'staff' ? 'schedule' : userRole === 'admin' ? 'logs' : 'pets');

  // Profile Form state for customer
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    email: user.email
  });

  const [newPetForm, setNewPetForm] = useState({
    name: '',
    species: 'Chó',
    breed: '',
    age: '',
    weight: '',
    gender: 'Đực',
    notes: ''
  });
  const [showAddPet, setShowAddPet] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
  };

  const handleAddPetSubmit = (e) => {
    e.preventDefault();
    addCustomerPet(newPetForm);
    setNewPetForm({ name: '', species: 'Chó', breed: '', age: '', weight: '', gender: 'Đực', notes: '' });
    setShowAddPet(false);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Title & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className={isAdmin ? 'badge-rose' : isStaff ? 'badge-amber' : 'badge-blue'}>
            {isAdmin ? '👑 TÀI KHOẢN QUẢN TRỊ VIÊN' : isStaff ? '👨‍⚕️ TÀI KHOẢN NHÂN VIÊN / BÁC SĨ' : '👤 TÀI KHOẢN KHÁCH HÀNG'}
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Hồ Sơ Cá Nhân & Nhiệm Vụ
          </h1>
          <p style={{ color: '#64748b' }}>
            {isAdmin ? 'Quản trị hệ thống CSDL XAMPP & Nhật ký phụ trợ Admin' : isStaff ? 'Xem lịch làm việc ca trực & Danh sách chó mèo đang theo dõi y tế' : 'Lưu trữ thông tin địa chỉ, SĐT, chó mèo cá nhân & Lịch sử dịch vụ đã đặt'}
          </p>
        </div>

        <button onClick={logoutRole} className="btn-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <LogOut size={16} />
          <span>Đăng Xuất Tài Khoản</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '30px' }}>
        
        {/* Left Column: Role Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 4px 14px rgba(2, 132, 199, 0.08)',
          height: 'fit-content'
        }}>
          <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <div style={{
              width: '76px', height: '76px', borderRadius: '50%',
              background: isAdmin ? 'linear-gradient(135deg, #be123c 0%, #ef4444 100%)' : isStaff ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' : 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
              color: 'white', fontSize: '1.8rem', fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
            }}>
              {currentProfile.name.charAt(0)}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{currentProfile.name}</h3>
            <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>
              {isStaff ? currentProfile.roleTitle : isAdmin ? currentProfile.roleTitle : 'Khách Hàng Thân Thiết'}
            </div>
          </div>

          {/* Editable Customer Info OR Staff/Admin Readonly Info */}
          {userRole === 'customer' ? (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Họ và tên</label>
                <input 
                  type="text" className="input-field" required
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Số điện thoại liên hệ</label>
                <input 
                  type="tel" className="input-field" required
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Địa chỉ giao hàng & Đưa đón chó mèo</label>
                <textarea 
                  rows={3} className="input-field" required
                  value={profileForm.address}
                  onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                <Save size={16} />
                <span>Cập Nhật Thông Tin</span>
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Email công vụ:</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{currentProfile.email}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Hotline làm việc:</span>
                <div style={{ fontWeight: 700, color: '#0284c7' }}>{currentProfile.phone}</div>
              </div>
              {isStaff && (
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Chuyên khoa:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{currentProfile.department}</div>
                </div>
              )}
              {isAdmin && (
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Quyền hạn:</span>
                  <div style={{ fontWeight: 700, color: '#be123c' }}>{currentProfile.permissions}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Role Specific Content */}
        <div>

          {/* ================= ROLE 1: NHÂN VIÊN / BÁC SĨ (STAFF PROFILE) ================= */}
          {userRole === 'staff' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Staff Schedule */}
              <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={20} color="#0284c7" /> Lịch Làm Việc & Ca Trực Tuần Này
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentProfile.schedule?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid #0284c7' }}>
                      <div>
                        <strong style={{ color: '#0f172a', display: 'block' }}>{item.day}: {item.shift}</strong>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.task}</span>
                      </div>
                      <span className="badge-emerald">Đã Phân Ca</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Assigned Medical Cases */}
              <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={20} color="#f43f5e" /> Ca Bệnh & Chó Mèo Phụ Trách Hôm Nay
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentProfile.assignedPets?.map((pet, idx) => (
                    <div key={idx} style={{ background: '#eff6ff', padding: '16px', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, color: '#0284c7', fontSize: '1rem' }}>{pet.petName} (Chủ: {pet.owner})</span>
                        <span className="badge-rose">{pet.room}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155' }}>Dịch vụ: <strong>{pet.service}</strong></div>
                      <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 600, marginTop: '4px' }}>Trạng thái: {pet.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= ROLE 2: QUẢN LÝ / ADMIN (ADMIN PROFILE) ================= */}
          {userRole === 'admin' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Crown size={20} color="#be123c" /> Bảng Phụ Trợ & Phân Quyền Admin
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <button onClick={() => setActiveTab('management')} className="btn-primary" style={{ padding: '16px', justifyContent: 'center' }}>
                    <ShoppingBag size={20} />
                    <span>Đến Trang Quản Lý Đơn Hàng</span>
                  </button>

                  <button onClick={() => setActiveTab('admin')} className="btn-secondary" style={{ padding: '16px', justifyContent: 'center', borderColor: '#0284c7', color: '#0284c7' }}>
                    <Briefcase size={20} />
                    <span>Đến Trang Admin (CSDL MySQL)</span>
                  </button>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Nhật Ký Hoạt Động CSDL XAMPP System Logs:</h4>
                <div style={{ background: '#0f172a', color: '#38bdf8', padding: '16px', borderRadius: '14px', fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentProfile.systemLogs?.map((log, idx) => (
                    <div key={idx}>[{log.time}] SYS_OK: {log.action}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= ROLE 3: KHÁCH HÀNG (CUSTOMER PROFILE) ================= */}
          {userRole === 'customer' && (
            <div>
              {/* Customer Tabs */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveTabTab('pets')}
                  style={{
                    padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                    background: activeTab === 'pets' ? '#0284c7' : 'white',
                    color: activeTab === 'pets' ? 'white' : '#475569',
                    border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <Dog size={16} />
                  <span>Chó Mèo Của Tôi ({user.myPets?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTabTab('orders')}
                  style={{
                    padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                    background: activeTab === 'orders' ? '#0284c7' : 'white',
                    color: activeTab === 'orders' ? 'white' : '#475569',
                    border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Lịch Sử Đặt Hàng</span>
                </button>

                <button
                  onClick={() => setActiveTabTab('services')}
                  style={{
                    padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                    background: activeTab === 'services' ? '#0284c7' : 'white',
                    color: activeTab === 'services' ? 'white' : '#475569',
                    border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <Stethoscope size={16} />
                  <span>Lịch Sử Khám Bệnh & Spa</span>
                </button>

                <button
                  onClick={() => setActiveTabTab('medical')}
                  style={{
                    padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                    background: activeTab === 'medical' ? '#0284c7' : 'white',
                    color: activeTab === 'medical' ? 'white' : '#475569',
                    border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <FileText size={16} />
                  <span>🩺 Bệnh Án Thú Cưng ({medicalRecords?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTabTab('invoices')}
                  style={{
                    padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                    background: activeTab === 'invoices' ? '#0284c7' : 'white',
                    color: activeTab === 'invoices' ? 'white' : '#475569',
                    border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <FileText size={16} />
                  <span>📜 Hóa Đơn Thanh Toán ({customerInvoices?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTabTab('notif')}
                  style={{
                    padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                    background: activeTab === 'notif' ? '#0284c7' : 'white',
                    color: activeTab === 'notif' ? 'white' : '#475569',
                    border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <Bell size={16} />
                  <span>🔔 Thông Báo Của Tôi ({(notifications || []).filter(n => n.unread).length})</span>
                </button>
              </div>

              {/* Customer Tab 1: Pets Manager */}
              {activeTab === 'pets' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Thú Cưng Của Bạn</h3>
                    <button onClick={() => setShowAddPet(!showAddPet)} className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                      <Plus size={16} />
                      <span>Thêm Chó/Mèo Mới</span>
                    </button>
                  </div>

                  {showAddPet && (
                    <form onSubmit={handleAddPetSubmit} style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #bfdbfe', marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0284c7', marginBottom: '12px' }}>Khai Báo Chó/Mèo Mới</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Tên bé</label>
                          <input type="text" required className="input-field" placeholder="Mochi" value={newPetForm.name} onChange={e => setNewPetForm({ ...newPetForm, name: e.target.value })} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Loài</label>
                          <select className="input-field" value={newPetForm.species} onChange={e => setNewPetForm({ ...newPetForm, species: e.target.value })}>
                            <option value="Chó">Chó 🐶</option>
                            <option value="Mèo">Mèo 🐱</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Giống chó/mèo</label>
                          <input type="text" required className="input-field" placeholder="VD: Poodle, Corgi..." value={newPetForm.breed} onChange={e => setNewPetForm({ ...newPetForm, breed: e.target.value })} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Cân nặng (kg)</label>
                          <input type="text" required className="input-field" placeholder="3.5 kg" value={newPetForm.weight} onChange={e => setNewPetForm({ ...newPetForm, weight: e.target.value })} />
                        </div>
                      </div>
                      <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Lưu Thú Cưng</button>
                    </form>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                    {user.myPets?.map(pet => (
                      <div key={pet.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <span className="badge-blue">{pet.species}</span>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>{pet.name}</h4>
                          </div>
                          <button onClick={() => deleteCustomerPet(pet.id)} style={{ color: '#ef4444', background: 'transparent' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span>Giống: <strong>{pet.breed}</strong></span>
                          <span>Cân nặng: <strong>{pet.weight}</strong></span>
                          {pet.notes && <span>Ghi chú: {pet.notes}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Tab 2: Orders */}
              {activeTab === 'orders' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {user.ordersHistory?.map(ord => (
                    <div key={ord.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 800, color: '#0284c7' }}>Mã đơn: {ord.id}</span>
                        <span className="badge-emerald">{ord.status}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
                        Ngày đặt: {ord.date} | Phương thức: {ord.paymentMethod}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                        Sản phẩm: {ord.items?.join(', ')}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7', marginTop: '8px' }}>
                        Tổng tiền: {ord.total?.toLocaleString('vi-VN')} đ
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Tab 3: Medical & Spa */}
              {activeTab === 'services' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {user.servicesHistory?.map(ser => (
                    <div key={ser.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="badge-blue">{ser.serviceType}</span>
                        <span style={{
                          padding: '4px 10px', borderRadius: '8px', fontWeight: 700, fontSize: '0.78rem',
                          background: ser.status === 'Chờ xác nhận' ? '#fef3c7' : ser.status === 'Đã xác nhận' ? '#e0f2fe' : ser.status === 'Đang thực hiện' ? '#ffedd5' : ser.status === 'Hoàn thành' ? '#d1fae5' : '#ffe4e6',
                          color: ser.status === 'Chờ xác nhận' ? '#b45309' : ser.status === 'Đã xác nhận' ? '#0369a1' : ser.status === 'Đang thực hiện' ? '#c2410c' : ser.status === 'Hoàn thành' ? '#047857' : '#ef4444'
                        }}>
                          {ser.status === 'Chờ xác nhận' ? '🟡 Chờ xác nhận' : ser.status === 'Đã xác nhận' ? '🔵 Đã xác nhận' : ser.status === 'Đang thực hiện' ? '🟠 Đang thực hiện' : ser.status === 'Hoàn thành' ? '🟢 Hoàn thành' : '🔴 Đã hủy'}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{ser.detail}</h4>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px' }}>
                        Thú cưng: <strong>{ser.petName}</strong> | Ngày hẹn: {ser.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Tab 4: Boarding */}
              {activeTab === 'boarding' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {user.boardingHistory?.map(brd => (
                    <div key={brd.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="badge-amber">{brd.roomType}</span>
                        <span className="badge-emerald">{brd.status}</span>
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Gửi lưu trú {brd.days} ngày ({brd.startDate} - {brd.endDate})</h4>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Tab 5: Medical Examination Records (Bệnh Án Thú Cưng) */}
              {activeTab === 'medical' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857', marginBottom: '8px' }}>
                    🩺 Hồ Sơ Bệnh Án Khám Bệnh Của Bác Sĩ
                  </h3>
                  {(medicalRecords || []).map(rec => (
                    <div key={rec.id} style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                        <div>
                          <strong style={{ color: '#047857', fontSize: '0.95rem' }}>{rec.id}</strong>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '10px' }}>🗓️ Ngày khám: {rec.date}</span>
                        </div>
                        <span className="badge-emerald">👨‍⚕️ {rec.doctorName}</span>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>🐶 Thú cưng: {rec.petName}</div>
                        <div style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 700, marginTop: '4px' }}>⚠️ Triệu chứng: {rec.symptoms}</div>
                        <div style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700, marginTop: '2px' }}>🔬 Chẩn đoán: {rec.diagnosis}</div>
                      </div>

                      <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '12px', border: '1px solid #a7f3d0', marginBottom: '10px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#047857', marginBottom: '4px' }}>💊 ĐƠN THUỐC BÁC SĨ KÊ:</div>
                        {rec.prescription.map((p, i) => (
                          <div key={i} style={{ fontSize: '0.82rem', color: '#0f172a' }}>
                            • <strong>{p.medicineName}</strong> - {p.dosage} ({p.price.toLocaleString('vi-VN')} đ)
                          </div>
                        ))}
                      </div>

                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        📌 <strong>Kết quả & Dặn dò:</strong> {rec.result} | {rec.notes}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Tab 6: Invoices (Hóa Đơn Thanh Toán) */}
              {activeTab === 'invoices' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857', marginBottom: '8px' }}>
                    📜 Hóa Đơn Thanh Toán Phòng Khám
                  </h3>
                  {(customerInvoices || []).map(inv => (
                    <div key={inv.id} style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                        <div>
                          <strong style={{ color: '#047857', fontSize: '0.95rem' }}>{inv.id}</strong>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '10px' }}>🗓️ Ngày: {inv.date}</span>
                        </div>
                        <span className="badge-emerald">✅ {inv.paymentStatus}</span>
                      </div>

                      <div style={{ fontSize: '0.86rem', color: '#334155', marginBottom: '12px' }}>
                        <div>Thú cưng: <strong>{inv.petName}</strong> | Phương thức: {inv.paymentMethod}</div>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>DỊCH VỤ & THUỐC ĐÃ THANH TOÁN:</div>
                        {inv.services.map((s, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                            <span>• {s.name}</span>
                            <strong>{s.price.toLocaleString('vi-VN')} đ</strong>
                          </div>
                        ))}
                        {inv.medicines.map((m, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                            <span>• {m.name} (x{m.qty})</span>
                            <strong>{(m.price * m.qty).toLocaleString('vi-VN')} đ</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Tab 7: Notifications */}
              {activeTab === 'notif' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                      🔔 Danh Sách Thông Báo Của Tôi
                    </h3>
                    <button onClick={() => markAllNotificationsAsRead()} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                      Đánh dấu tất cả đã đọc
                    </button>
                  </div>

                  {(notifications || []).length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      Chưa có thông báo nào
                    </div>
                  ) : (
                    (notifications || []).map(n => (
                      <div 
                        key={n.id}
                        style={{
                          background: n.unread ? '#eff6ff' : 'white',
                          borderRadius: '16px',
                          padding: '18px',
                          border: n.unread ? '1.5px solid #38bdf8' : '1px solid #e2e8f0',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{n.title}</span>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>⏰ {n.time}</span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
