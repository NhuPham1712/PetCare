import React, { useState } from 'react';
import { Database, Plus, Trash2, Edit3, ShieldAlert, Check, Dog, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminView = () => {
  const { pets, products, addPetAdmin, deletePetAdmin, addProductAdmin } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('pets_db'); // 'pets_db', 'products_db'
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showAddProdModal, setShowAddProdModal] = useState(false);

  // New Pet Form State
  const [newPet, setNewPet] = useState({
    name: '',
    species: 'Chó',
    breed: '',
    weight: '3.0 kg',
    weightCategory: '2-5kg',
    gender: 'Đực',
    color: 'Vàng Trắng',
    vaccination: '2 Mũi',
    origin: 'Thuần chủng VKA',
    price: 10000000,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    description: 'Thú cưng thuần chủng có sổ tiêm chủng và phả hệ VKA đầy đủ.'
  });

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Thức Ăn',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80',
    description: 'Thức ăn phụ kiện chính hãng chất lượng cao.'
  });

  const handleAddPetSubmit = (e) => {
    e.preventDefault();
    addPetAdmin(newPet);
    setShowAddPetModal(false);
  };

  const handleAddProdSubmit = (e) => {
    e.preventDefault();
    addProductAdmin(newProd);
    setShowAddProdModal(false);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge-rose" style={{ background: '#ffe4e6', color: '#be123c' }}>HỆ THỐNG QUẢN TRỊ ADMIN</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Trang Admin - Cơ Sở Dữ Liệu (CSDL)
          </h1>
          <p style={{ color: '#64748b' }}>
            Quản lý và thêm mới chó, mèo, sản phẩm đồ dùng, dịch vụ vào hệ thống CSDL
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setShowAddPetModal(true)}
            className="btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.9rem' }}
          >
            <Plus size={18} />
            <span>Thêm Chó/Mèo Mới Vào CSDL</span>
          </button>
          
          <button 
            onClick={() => setShowAddProdModal(true)}
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.9rem' }}
          >
            <Plus size={18} />
            <span>Thêm Sản Phẩm Mới</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
        <button
          onClick={() => setActiveSubTab('pets_db')}
          style={{
            padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem',
            background: activeSubTab === 'pets_db' ? '#0284c7' : 'white',
            color: activeSubTab === 'pets_db' ? 'white' : '#475569',
            border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <Dog size={18} />
          <span>CSDL Thú Cưng ({pets.length} bé)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('products_db')}
          style={{
            padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem',
            background: activeSubTab === 'products_db' ? '#0284c7' : 'white',
            color: activeSubTab === 'products_db' ? 'white' : '#475569',
            border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <ShoppingBag size={18} />
          <span>CSDL Sản Phẩm & Đồ Dùng ({products.length} món)</span>
        </button>
      </div>

      {/* Database Table 1: Pets */}
      {activeSubTab === 'pets_db' && (
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                  <th style={{ padding: '14px 16px' }}>Hình ảnh</th>
                  <th style={{ padding: '14px 16px' }}>Tên & Giống</th>
                  <th style={{ padding: '14px 16px' }}>Loài</th>
                  <th style={{ padding: '14px 16px' }}>Cân nặng</th>
                  <th style={{ padding: '14px 16px' }}>Giới tính</th>
                  <th style={{ padding: '14px 16px' }}>Màu sắc</th>
                  <th style={{ padding: '14px 16px' }}>Tiêm chủng</th>
                  <th style={{ padding: '14px 16px' }}>Nguồn gốc</th>
                  <th style={{ padding: '14px 16px' }}>Giá bán</th>
                  <th style={{ padding: '14px 16px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {pets.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <img src={p.image} alt={p.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                      {p.name}
                      <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{p.breed}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}><span className="badge-blue">{p.species}</span></td>
                    <td style={{ padding: '12px 16px' }}>{p.weight}</td>
                    <td style={{ padding: '12px 16px' }}>{p.gender}</td>
                    <td style={{ padding: '12px 16px' }}>{p.color}</td>
                    <td style={{ padding: '12px 16px' }}><span className="badge-emerald">{p.vaccination}</span></td>
                    <td style={{ padding: '12px 16px' }}>{p.origin}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 800, color: '#0284c7' }}>
                      {p.price.toLocaleString('vi-VN')} đ
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button 
                        onClick={() => deletePetAdmin(p.id)}
                        style={{ background: '#ffe4e6', color: '#ef4444', padding: '6px 10px', borderRadius: '8px', fontWeight: 600, fontSize: '0.8rem' }}
                      >
                        Xóa CSDL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal 1: Thêm Chó Mèo Vô CSDL (Requirement 1) */}
      {showAddPetModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>Thêm Chó/Mèo Mới Vào CSDL</h3>
              <button onClick={() => setShowAddPetModal(false)} style={{ background: 'transparent', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleAddPetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Tên hiển thị</label>
                  <input type="text" required className="input-field" value={newPet.name} onChange={e => setNewPet({ ...newPet, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Loài</label>
                  <select className="input-field" value={newPet.species} onChange={e => setNewPet({ ...newPet, species: e.target.value })}>
                    <option value="Chó">Chó 🐶</option>
                    <option value="Mèo">Mèo 🐱</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Giống chó/mèo</label>
                  <input type="text" required className="input-field" value={newPet.breed} onChange={e => setNewPet({ ...newPet, breed: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Cân nặng (kg)</label>
                  <input type="text" required className="input-field" value={newPet.weight} onChange={e => setNewPet({ ...newPet, weight: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Phân loại cân nặng</label>
                  <select className="input-field" value={newPet.weightCategory} onChange={e => setNewPet({ ...newPet, weightCategory: e.target.value })}>
                    <option value="<2kg">&lt; 2kg</option>
                    <option value="2-5kg">2-5kg</option>
                    <option value="5-10kg">5-10kg</option>
                    <option value=">10kg">&gt; 10kg</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Giới tính</label>
                  <select className="input-field" value={newPet.gender} onChange={e => setNewPet({ ...newPet, gender: e.target.value })}>
                    <option value="Đực">Đực ♂</option>
                    <option value="Cái">Cái ♀</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Màu sắc bộ lông</label>
                  <input type="text" required className="input-field" value={newPet.color} onChange={e => setNewPet({ ...newPet, color: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Tiêm chủng</label>
                  <select className="input-field" value={newPet.vaccination} onChange={e => setNewPet({ ...newPet, vaccination: e.target.value })}>
                    <option value="1 Mũi">1 Mũi</option>
                    <option value="2 Mũi">2 Mũi</option>
                    <option value="3 Mũi (Full + Dại)">3 Mũi (Full + Dại)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Nguồn gốc</label>
                  <select className="input-field" value={newPet.origin} onChange={e => setNewPet({ ...newPet, origin: e.target.value })}>
                    <option value="Thuần chủng VKA">Thuần chủng VKA</option>
                    <option value="Nhập Khẩu Thái Lan">Nhập Khẩu Thái Lan</option>
                    <option value="Nhập Khẩu Châu Âu">Nhập Khẩu Châu Âu</option>
                    <option value="Nhân Giống Tại Trại">Nhân Giống Tại Trại</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Giá bán (VNĐ)</label>
                  <input type="number" required className="input-field" value={newPet.price} onChange={e => setNewPet({ ...newPet, price: Number(e.target.value) })} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>URL Hình ảnh thú cưng</label>
                <input type="url" required className="input-field" value={newPet.image} onChange={e => setNewPet({ ...newPet, image: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Mô tả chi tiết</label>
                <textarea rows={2} className="input-field" value={newPet.description} onChange={e => setNewPet({ ...newPet, description: e.target.value })} />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '12px', marginTop: '10px' }}>
                Xác Nhận Thêm Vào CSDL
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Thêm Sản Phẩm Mới */}
      {showAddProdModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>Thêm Sản Phẩm Thức Ăn / Đồ Dùng</h3>
              <button onClick={() => setShowAddProdModal(false)} style={{ background: 'transparent', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleAddProdSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Tên sản phẩm</label>
                <input type="text" required className="input-field" value={newProd.name} onChange={e => setNewProd({ ...newProd, name: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Danh mục</label>
                <select className="input-field" value={newProd.category} onChange={e => setNewProd({ ...newProd, category: e.target.value })}>
                  <option value="Thức Ăn">Thức Ăn (Hạt, Pate, Bánh thưởng)</option>
                  <option value="Đồ Dùng">Đồ Dùng (Chuồng, Khay vệ sinh, Sữa tắm)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Giá bán (VNĐ)</label>
                <input type="number" required className="input-field" value={newProd.price} onChange={e => setNewProd({ ...newProd, price: Number(e.target.value) })} />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>URL Hình ảnh</label>
                <input type="url" required className="input-field" value={newProd.image} onChange={e => setNewProd({ ...newProd, image: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Mô tả sản phẩm</label>
                <textarea rows={2} className="input-field" value={newProd.description} onChange={e => setNewProd({ ...newProd, description: e.target.value })} />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '12px', marginTop: '10px' }}>
                Xác Nhận Thêm Sản Phẩm
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
