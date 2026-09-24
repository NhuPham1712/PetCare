import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  FileText, 
  User, 
  Dog, 
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StaffBillingView = () => {
  const { customerInvoices, createInvoice, showToast } = useApp();

  const [activeTab, setActiveTabState] = useState('create_invoice'); // 'create_invoice', 'invoices_list'

  // Available Services
  const AVAILABLE_SERVICES = [
    { name: 'Khám sức khỏe tổng quát', price: 150000 },
    { name: 'Spa & Grooming trọn gói 8 bước', price: 250000 },
    { name: 'Tiêm phòng Vaccine 5 bệnh', price: 220000 },
    { name: 'Khách sạn Penthouse chó mèo (1 ngày)', price: 300000 },
    { name: 'Xe ô tô đưa đón thú cưng tận nhà', price: 100000 }
  ];

  // Available Medicines
  const AVAILABLE_MEDICINES = [
    { name: 'Kháng sinh PetCare Amox 250mg', price: 120000 },
    { name: 'Siro Bổ Gan & Hạ Sốt Cho Chó', price: 85000 },
    { name: 'Thuốc Xổ Giún Broad-Spectrum', price: 65000 },
    { name: 'Vitamin & Khoáng Chất PetCare', price: 150000 }
  ];

  // Invoice Form State
  const [invoiceForm, setInvoiceForm] = useState({
    customerName: 'Đặng Ngọc Nhuy',
    phone: '0988 777 888',
    petName: 'Mochi (Chó Poodle)',
    paymentMethod: 'Chuyển Khoản VietQR / MBBank'
  });

  const [selectedServices, setSelectedServices] = useState([
    { name: 'Khám sức khỏe tổng quát', price: 150000 },
    { name: 'Spa & Grooming trọn gói 8 bước', price: 250000 }
  ]);

  const [selectedMedicines, setSelectedMedicines] = useState([
    { name: 'Kháng sinh PetCare Amox 250mg', qty: 1, price: 120000 },
    { name: 'Siro Bổ Gan & Hạ Sốt Cho Chó', qty: 1, price: 85000 }
  ]);

  // Dynamic Total Calculation
  const totalServicesPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalMedicinesPrice = selectedMedicines.reduce((sum, m) => sum + (m.price * m.qty), 0);
  const grandTotal = totalServicesPrice + totalMedicinesPrice;

  const handleAddService = (service) => {
    setSelectedServices([...selectedServices, service]);
  };

  const handleRemoveService = (index) => {
    setSelectedServices(selectedServices.filter((_, idx) => idx !== index));
  };

  const handleAddMedicine = (med) => {
    setSelectedMedicines([...selectedMedicines, { ...med, qty: 1 }]);
  };

  const handleRemoveMedicine = (index) => {
    setSelectedMedicines(selectedMedicines.filter((_, idx) => idx !== index));
  };

  const handleCreateInvoiceSubmit = (e) => {
    e.preventDefault();

    const invoiceData = {
      id: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      ...invoiceForm,
      services: selectedServices,
      medicines: selectedMedicines,
      totalAmount: grandTotal,
      paymentStatus: 'Đã thanh toán'
    };

    createInvoice(invoiceData);
    showToast(`🎉 Lập Hóa Đơn ${invoiceData.id} thành công! Đã chuyển sang tài khoản Khách Hàng.`);
    setActiveTabState('invoices_list');
  };

  const handlePrint = (invId) => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '36px 24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge-blue">HỆ THỐNG THANH TOÁN & QUẢN LÝ HÓA ĐƠN</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Lập Hóa Đơn & Thanh Toán
          </h1>
          <p style={{ color: '#64748b' }}>
            Chọn dịch vụ, kê đơn thuốc, tự động tính tổng tiền & in hóa đơn trực tiếp cho Khách Hàng
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTabState('create_invoice')}
            style={{
              padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
              background: activeTab === 'create_invoice' ? '#0284c7' : 'white',
              color: activeTab === 'create_invoice' ? 'white' : '#475569',
              border: '1px solid #cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <CreditCard size={18} />
            <span>Lập Hóa Đơn Mới</span>
          </button>

          <button
            onClick={() => setActiveTabState('invoices_list')}
            style={{
              padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
              background: activeTab === 'invoices_list' ? '#0284c7' : 'white',
              color: activeTab === 'invoices_list' ? 'white' : '#475569',
              border: '1px solid #cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <FileText size={18} />
            <span>Danh Sách Hóa Đơn ({customerInvoices?.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Form Lập Hóa Đơn Mới */}
      {activeTab === 'create_invoice' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          {/* Left Box: Form selection */}
          <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857', marginBottom: '16px' }}>
              1. Thông Tin Khách Hàng & Chọn Dịch Vụ / Thuốc
            </h3>

            <form onSubmit={handleCreateInvoiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Tên Khách Hàng</label>
                <input type="text" required className="input-field" value={invoiceForm.customerName} onChange={e => setInvoiceForm({ ...invoiceForm, customerName: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Số Điện Thoại</label>
                  <input type="text" required className="input-field" value={invoiceForm.phone} onChange={e => setInvoiceForm({ ...invoiceForm, phone: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Tên Thú Cưng</label>
                  <input type="text" required className="input-field" value={invoiceForm.petName} onChange={e => setInvoiceForm({ ...invoiceForm, petName: e.target.value })} />
                </div>
              </div>

              {/* Select Service Dropdown */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#047857', display: 'block', marginBottom: '8px' }}>
                  ➕ Chọn Dịch Vụ Khám / Spa / Boarding:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {AVAILABLE_SERVICES.map((srv, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>{srv.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <strong style={{ color: '#047857', fontSize: '0.84rem' }}>{srv.price.toLocaleString('vi-VN')} đ</strong>
                        <button type="button" onClick={() => handleAddService(srv)} style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>+ Thêm</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Medicine Dropdown */}
              <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '14px', border: '1px solid #a7f3d0' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#047857', display: 'block', marginBottom: '8px' }}>
                  💊 Chọn Thuốc Kê Đơn Thanh Toán:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {AVAILABLE_MEDICINES.map((med, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>{med.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <strong style={{ color: '#047857', fontSize: '0.84rem' }}>{med.price.toLocaleString('vi-VN')} đ</strong>
                        <button type="button" onClick={() => handleAddMedicine(med)} style={{ background: '#d1fae5', color: '#047857', border: 'none', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>+ Thêm</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Hình Thức Thanh Toán</label>
                <select className="input-field" value={invoiceForm.paymentMethod} onChange={e => setInvoiceForm({ ...invoiceForm, paymentMethod: e.target.value })}>
                  <option value="Chuyển Khoản VietQR / MBBank">Chuyển Khoản VietQR / MBBank</option>
                  <option value="Tiền Mặt Trực Tiếp">Tiền Mặt Trực Tiếp</option>
                  <option value="Quẹt Thẻ POS">Quẹt Thẻ POS</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)', justifyContent: 'center', padding: '12px', fontSize: '1rem', marginTop: '10px' }}
              >
                🎉 Hoàn Tất Lập Hóa Đơn & Đồng Bộ Cho Khách
              </button>
            </form>
          </div>

          {/* Right Box: Printable Invoice Preview & Auto-total Calculation */}
          <div style={{ background: '#f8fafc', borderRadius: '24px', border: '2px dashed #0284c7', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0284c7', paddingBottom: '14px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0284c7' }}>HÓA ĐƠN THANH TOÁN</h3>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>PETCARE CENTER PORTAL</div>
                </div>
                <button onClick={() => handlePrint()} style={{ background: '#e0f2fe', color: '#0284c7', padding: '8px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <Printer size={16} />
                  <span>In Hóa Đơn</span>
                </button>
              </div>

              <div style={{ fontSize: '0.86rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                <div><strong>Khách hàng:</strong> {invoiceForm.customerName} (SĐT: {invoiceForm.phone})</div>
                <div><strong>Thú cưng:</strong> {invoiceForm.petName}</div>
                <div><strong>Phương thức:</strong> {invoiceForm.paymentMethod}</div>
              </div>

              {/* Selected Services breakdown */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', marginBottom: '6px' }}>1. DỊCH VỤ SỬ DỤNG:</div>
                {selectedServices.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: '0.84rem' }}>
                    <span>{s.name}</span>
                    <strong style={{ color: '#0f172a' }}>{s.price.toLocaleString('vi-VN')} đ</strong>
                  </div>
                ))}
              </div>

              {/* Selected Medicines breakdown */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', marginBottom: '6px' }}>2. THUỐC KÊ ĐƠN:</div>
                {selectedMedicines.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: '0.84rem' }}>
                    <span>{m.name} (x{m.qty})</span>
                    <strong style={{ color: '#0f172a' }}>{(m.price * m.qty).toLocaleString('vi-VN')} đ</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Total calculation Footer */}
            <div style={{ background: '#e0f2fe', padding: '16px', borderRadius: '16px', border: '1px solid #7dd3fc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0369a1' }}>TỔNG CỘNG THANH TOÁN:</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0284c7' }}>
                  {grandTotal.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Danh Sách Hóa Đơn Đã Lập */}
      {activeTab === 'invoices_list' && (
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Danh Sách Hóa Đơn Thanh Toán Đã Xuất</h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                  <th style={{ padding: '14px 16px' }}>Mã Hóa Đơn</th>
                  <th style={{ padding: '14px 16px' }}>Khách Hàng & Thú Cưng</th>
                  <th style={{ padding: '14px 16px' }}>Ngày Xuất</th>
                  <th style={{ padding: '14px 16px' }}>Phương Thức</th>
                  <th style={{ padding: '14px 16px' }}>Tổng Tiền</th>
                  <th style={{ padding: '14px 16px' }}>In Hóa Đơn</th>
                </tr>
              </thead>
              <tbody>
                {(customerInvoices || []).map(inv => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#047857' }}>{inv.id}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                      {inv.customerName}
                      <div style={{ fontSize: '0.78rem', color: '#0284c7' }}>🐶 {inv.petName}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>{inv.date}</td>
                    <td style={{ padding: '14px 16px' }}><span className="badge-blue">{inv.paymentMethod}</span></td>
                    <td style={{ padding: '14px 16px', fontWeight: 900, color: '#047857', fontSize: '1.05rem' }}>
                      {inv.totalAmount?.toLocaleString('vi-VN')} đ
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => handlePrint(inv.id)} style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Printer size={14} />
                        <span>In Bản Khách</span>
                      </button>
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
