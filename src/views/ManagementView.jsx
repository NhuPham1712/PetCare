import React, { useState } from 'react';
import { LayoutDashboard, Calendar, ShoppingBag, Clock, CheckCircle, Truck, PhoneCall, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ManagementView = () => {
  const { allBookings, allOrders, updateBookingStatusAdmin, updateOrderStatusAdmin } = useApp();

  const [managementTab, setManagementTab] = useState('bookings'); // 'bookings', 'orders'
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  const filteredBookings = allBookings.filter(b => {
    if (filterStatus !== 'Tất cả' && b.status !== filterStatus) return false;
    return true;
  });

  const filteredOrders = allOrders.filter(o => {
    if (filterStatus !== 'Tất cả' && o.status !== filterStatus) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '32px' }}>
        <span className="badge-blue">TRANG QUẢN LÝ DỊCH VỤ & THÚ CƯNG</span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
          Quản Lý Lưu Trữ Thông Tin Chó Mèo & Dịch Vụ
        </h1>
        <p style={{ color: '#64748b' }}>
          Theo dõi tiến độ lịch hẹn Spa, Khám bệnh 24/7, Khách sạn lưu trú chó mèo và các đơn hàng đã đặt
        </p>
      </div>

      {/* Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>TỔNG LỊCH DỊCH VỤ</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>{allBookings.length}</div>
          <div style={{ fontSize: '0.78rem', color: '#16a34a', marginTop: '2px' }}>Spa, Khám chữa bệnh & Lưu trú</div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>TỔNG ĐƠN HÀNG</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>{allOrders.length}</div>
          <div style={{ fontSize: '0.78rem', color: '#0284c7', marginTop: '2px' }}>Bán thú cưng & đồ dùng</div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>YÊU CẦU ĐƯA ĐÓN TẬN NHÀ</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
            {allBookings.filter(b => b.transportMode?.includes('tại nhà')).length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#b45309', marginTop: '2px' }}>Xe chuyên dụng PetCare</div>
        </div>
      </div>

      {/* Tabs & Status Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setManagementTab('bookings')}
            style={{
              padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem',
              background: managementTab === 'bookings' ? '#0284c7' : 'white',
              color: managementTab === 'bookings' ? 'white' : '#475569',
              border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <Calendar size={18} />
            <span>Quản Lý Lịch Dịch Vụ ({allBookings.length})</span>
          </button>

          <button
            onClick={() => setManagementTab('orders')}
            style={{
              padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem',
              background: managementTab === 'orders' ? '#0284c7' : 'white',
              color: managementTab === 'orders' ? 'white' : '#475569',
              border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <ShoppingBag size={18} />
            <span>Quản Lý Đơn Hàng ({allOrders.length})</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Trạng thái:</span>
          <select 
            className="input-field"
            style={{ width: 'auto', padding: '8px 14px' }}
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="Tất cả">Tất cả trạng thái</option>
            <option value="Đã nhận">Đã nhận</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      {managementTab === 'bookings' && (
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                  <th style={{ padding: '14px 16px' }}>Mã Lịch</th>
                  <th style={{ padding: '14px 16px' }}>Khách Hàng & SĐT</th>
                  <th style={{ padding: '14px 16px' }}>Thú Cưng</th>
                  <th style={{ padding: '14px 16px' }}>Loại Dịch Vụ</th>
                  <th style={{ padding: '14px 16px' }}>Hình Thức Vận Chuyển</th>
                  <th style={{ padding: '14px 16px' }}>Ngày Hẹn</th>
                  <th style={{ padding: '14px 16px' }}>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(bk => (
                  <tr key={bk.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0284c7' }}>{bk.id}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                      {bk.customerName}
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>📞 {bk.phone}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 600 }}>{bk.petName}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className="badge-blue">{bk.serviceCategory}</span>
                      <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>{bk.serviceName}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className={bk.transportMode?.includes('tại nhà') ? 'badge-amber' : 'badge-emerald'}>
                        {bk.transportMode}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>{bk.date}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <select 
                        value={bk.status}
                        onChange={e => updateBookingStatusAdmin(bk.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          border: '1px solid #cbd5e1',
                          background: bk.status === 'Hoàn thành' ? '#d1fae5' : bk.status === 'Đang xử lý' ? '#fef3c7' : '#e0f2fe',
                          color: bk.status === 'Hoàn thành' ? '#047857' : bk.status === 'Đang xử lý' ? '#b45309' : '#0369a1'
                        }}
                      >
                        <option value="Đã nhận">Đã nhận</option>
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Table */}
      {managementTab === 'orders' && (
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                  <th style={{ padding: '14px 16px' }}>Mã Đơn</th>
                  <th style={{ padding: '14px 16px' }}>Khách Hàng & SĐT</th>
                  <th style={{ padding: '14px 16px' }}>Địa Chỉ Giao Hàng</th>
                  <th style={{ padding: '14px 16px' }}>Thanh Toán</th>
                  <th style={{ padding: '14px 16px' }}>Tổng Tiền</th>
                  <th style={{ padding: '14px 16px' }}>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(ord => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0284c7' }}>{ord.id}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                      {ord.customerName}
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>📞 {ord.phone}</div>
                    </td>
                    <td style={{ padding: '14px 16px', maxWidth: '240px' }}>{ord.address}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className="badge-blue">{ord.paymentMethod}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0284c7' }}>
                      {ord.total?.toLocaleString('vi-VN')} đ
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <select 
                        value={ord.status}
                        onChange={e => updateOrderStatusAdmin(ord.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          border: '1px solid #cbd5e1',
                          background: ord.status === 'Hoàn thành' ? '#d1fae5' : '#e0f2fe',
                          color: ord.status === 'Hoàn thành' ? '#047857' : '#0369a1'
                        }}
                      >
                        <option value="Đã nhận đơn">Đã nhận đơn</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
