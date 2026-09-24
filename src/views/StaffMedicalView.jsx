import React, { useState } from 'react';
import { 
  Stethoscope, 
  Plus, 
  FileText, 
  Pill, 
  CheckCircle2, 
  History, 
  User, 
  Dog, 
  Search,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StaffMedicalView = () => {
  const { medicalRecords, createMedicalRecord, showToast } = useApp();

  const [activeTab, setActiveTabState] = useState('create'); // 'create', 'history'
  const [searchPetTerm, setSearchPetTerm] = useState('');

  // Form State for Creating Medical Ticket (Phiếu khám)
  const [form, setForm] = useState({
    customerName: 'Đặng Ngọc Nhuy',
    phone: '0988 777 888',
    petName: 'Mochi (Chó Poodle)',
    doctorName: 'BS. Nguyễn Văn Hoàng',
    symptoms: 'Sốt nhẹ, uể uải, bỏ ăn 1 ngày',
    diagnosis: 'Viêm đường hô hấp trên do thay đổi thời tiết',
    result: 'Phản xạ tốt, nhịp tim đều 110 nhịp/phút. Cần tiêm kháng sinh & dùng thuốc bổ.',
    notes: 'Tái khám sau 3 ngày nếu còn triệu chứng sốt.'
  });

  // Prescription medicines list inside the ticket
  const [prescriptionList, setPrescriptionList] = useState([
    { medicineName: 'Kháng sinh PetCare Amox 250mg', dosage: '2 viên/ngày (Sáng / Tối)', price: 120000 },
    { medicineName: 'Siro Bổ Gan & Hạ Sốt Cho Chó', dosage: '5ml/lần (Sau ăn)', price: 85000 }
  ]);

  const [newMed, setNewMed] = useState({ medicineName: '', dosage: '', price: 50000 });

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!newMed.medicineName) return;
    setPrescriptionList([...prescriptionList, { ...newMed, price: Number(newMed.price) }]);
    setNewMed({ medicineName: '', dosage: '', price: 50000 });
  };

  const handleRemoveMedicine = (index) => {
    setPrescriptionList(prescriptionList.filter((_, idx) => idx !== index));
  };

  const handleCreateRecordSubmit = (e) => {
    e.preventDefault();
    
    const recordData = {
      id: `MR-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...form,
      prescription: prescriptionList
    };

    createMedicalRecord(recordData);

    showToast('🎉 Đã tạo Phiếu Khám Bệnh thành công! Đã gửi đến Hồ sơ Khách Hàng.');
    setActiveTabState('history');
  };

  const filteredHistory = (medicalRecords || []).filter(r => 
    r.petName.toLowerCase().includes(searchPetTerm.toLowerCase()) ||
    r.customerName.toLowerCase().includes(searchPetTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '36px 24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge-blue">HỆ THỐNG Y TẾ & BỆNH ÁN THÚ Y</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Khám Bệnh & Bệnh Án Điện Tử
          </h1>
          <p style={{ color: '#64748b' }}>
            Lập phiếu khám, nhập triệu chứng, chẩn đoán, kê đơn thuốc & tự động đồng bộ sang tài khoản Khách hàng
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTabState('create')}
            style={{
              padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
              background: activeTab === 'create' ? '#0284c7' : 'white',
              color: activeTab === 'create' ? 'white' : '#475569',
              border: '1px solid #cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <Stethoscope size={18} />
            <span>Tạo Phiếu Khám Mới</span>
          </button>

          <button
            onClick={() => setActiveTabState('history')}
            style={{
              padding: '10px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
              background: activeTab === 'history' ? '#0284c7' : 'white',
              color: activeTab === 'history' ? 'white' : '#475569',
              border: '1px solid #cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <History size={18} />
            <span>Lịch Sử Bệnh Án ({medicalRecords?.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Tạo Phiếu Khám Mới */}
      {activeTab === 'create' && (
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={22} />
              <span>Biểu Mẫu Tạo Phiếu Khám & Bệnh Án</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.86rem' }}>
              Sau khi lưu, phiếu khám này sẽ được gửi trực tiếp đến phần **Hồ Sơ Của Tôi** của Khách Hàng.
            </p>
          </div>

          <form onSubmit={handleCreateRecordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Patient & Customer Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Tên Khách Hàng</label>
                <input type="text" required className="input-field" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Số Điện Thoại</label>
                <input type="text" required className="input-field" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Tên Thú Cưng (Chó/Mèo)</label>
                <input type="text" required className="input-field" value={form.petName} onChange={e => setForm({ ...form, petName: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Bác Sĩ Khám Chữa</label>
                <input type="text" required className="input-field" value={form.doctorName} onChange={e => setForm({ ...form, doctorName: e.target.value })} />
              </div>
            </div>

            {/* Symptoms & Diagnosis */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>1. Nhập Triệu Chứng Lâm Sàng</label>
                <textarea rows={3} required className="input-field" value={form.symptoms} onChange={e => setForm({ ...form, symptoms: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>2. Chẩn Đoán Bệnh Lý</label>
                <textarea rows={3} required className="input-field" value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })} />
              </div>
            </div>

            {/* Examination Result */}
            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>3. Kết Quả Khám & Chỉ Số Sức Khỏe</label>
              <textarea rows={2} required className="input-field" value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} />
            </div>

            {/* Prescription Section (Kê Đơn Thuốc) */}
            <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '16px', border: '1px solid #bae6fd' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Pill size={20} color="#0284c7" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0284c7' }}>4. Danh Mục Đơn Thuốc Kê Đơn</h3>
              </div>

              {/* Add Medicine Inline Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr auto', gap: '10px', marginBottom: '14px' }}>
                <input 
                  type="text" 
                  placeholder="Tên thuốc..." 
                  className="input-field"
                  value={newMed.medicineName}
                  onChange={e => setNewMed({ ...newMed, medicineName: e.target.value })}
                />
                <input 
                  type="text" 
                  placeholder="Liều dùng & cách dùng..." 
                  className="input-field"
                  value={newMed.dosage}
                  onChange={e => setNewMed({ ...newMed, dosage: e.target.value })}
                />
                <input 
                  type="number" 
                  placeholder="Giá (VNĐ)" 
                  className="input-field"
                  value={newMed.price}
                  onChange={e => setNewMed({ ...newMed, price: Number(e.target.value) })}
                />
                <button 
                  onClick={handleAddMedicine}
                  style={{ background: '#0284c7', color: 'white', padding: '0 16px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                >
                  + Thêm
                </button>
              </div>

              {/* Medicines List Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', background: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#e0f2fe', color: '#0284c7', fontWeight: 700 }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Tên Thuốc Kê Đơn</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Liều Dùng Phân Công</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right' }}>Đơn Giá</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionList.map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 700, color: '#0f172a' }}>{m.medicineName}</td>
                      <td style={{ padding: '8px 12px' }}>{m.dosage}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, color: '#0284c7' }}>
                        {m.price.toLocaleString('vi-VN')} đ
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                        <button onClick={() => handleRemoveMedicine(idx)} style={{ background: 'transparent', color: '#ef4444', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Doctor Notes & Submit */}
            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Dặn Dò Tái Khám Của Bác Sĩ</label>
              <textarea rows={2} className="input-field" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: '10px' }}
            >
              🎉 Xác Nhận Lưu Phiếu Khám & Gửi Cho Khách Hàng
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Lịch Sử Bệnh Án */}
      {activeTab === 'history' && (
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Lịch Sử Khám Bệnh Của Thú Cưng</h2>
            
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Tìm tên thú cưng hoặc khách hàng..." 
                className="input-field"
                style={{ paddingLeft: '38px' }}
                value={searchPetTerm}
                onChange={e => setSearchPetTerm(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredHistory.map(rec => (
              <div key={rec.id} style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontWeight: 800, color: '#047857', fontSize: '0.9rem' }}>{rec.id}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '10px' }}>🗓️ Ngày khám: {rec.date}</span>
                  </div>
                  <span className="badge-emerald">👨‍⚕️ {rec.doctorName}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>KHÁCH HÀNG & THÚ CƯNG</div>
                    <div style={{ fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{rec.petName}</div>
                    <div style={{ fontSize: '0.82rem', color: '#475569' }}>Chủ nuôi: {rec.customerName} ({rec.phone})</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>TRIỆU CHỨNG & CHẨN ĐOÁN</div>
                    <div style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 700, marginTop: '2px' }}>⚠️ {rec.symptoms}</div>
                    <div style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700, marginTop: '2px' }}>🔬 {rec.diagnosis}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>ĐƠN THUỐC KÊ ĐƠN</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                      {rec.prescription.map((p, i) => (
                        <div key={i} style={{ fontSize: '0.8rem', background: 'white', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                          💊 <strong>{p.medicineName}</strong> - {p.dosage}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ background: '#ecfdf5', padding: '10px 14px', borderRadius: '10px', fontSize: '0.82rem', color: '#065f46' }}>
                  📌 <strong>Kết quả & Dặn dò:</strong> {rec.result} | {rec.notes}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
