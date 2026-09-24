import React from 'react';
import { Filter, Search, RotateCcw, ShoppingCart, Info, Award, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PetShopView = () => {
  const { pets, petFilters, setPetFilters, setSelectedPetForDetail, addToCart } = useApp();

  // Extract unique colors & origins for dynamic dropdown options
  const allColors = Array.from(new Set(pets.map(p => p.color)));
  const allOrigins = Array.from(new Set(pets.map(p => p.origin)));

  // Filter Logic matching Requirement 5
  const filteredPets = pets.filter(pet => {
    // 1. Search Query
    if (petFilters.search && !pet.name.toLowerCase().includes(petFilters.search.toLowerCase()) && !pet.breed.toLowerCase().includes(petFilters.search.toLowerCase())) {
      return false;
    }
    // 2. Species (Loài: Chó/Mèo)
    if (petFilters.species !== 'Tất cả' && pet.species !== petFilters.species) {
      return false;
    }
    // 3. Weight Category (Cân nặng)
    if (petFilters.weightCategory !== 'Tất cả' && pet.weightCategory !== petFilters.weightCategory) {
      return false;
    }
    // 4. Gender (Giới tính: Đực/Cái)
    if (petFilters.gender !== 'Tất cả' && pet.gender !== petFilters.gender) {
      return false;
    }
    // 5. Color (Màu sắc)
    if (petFilters.color !== 'Tất cả' && pet.color !== petFilters.color) {
      return false;
    }
    // 6. Vaccination (Tiêm chủng)
    if (petFilters.vaccination !== 'Tất cả' && !pet.vaccination.includes(petFilters.vaccination)) {
      return false;
    }
    // 7. Origin (Nguồn gốc)
    if (petFilters.origin !== 'Tất cả' && pet.origin !== petFilters.origin) {
      return false;
    }
    return true;
  });

  const resetFilters = () => {
    setPetFilters({
      species: 'Tất cả',
      weightCategory: 'Tất cả',
      gender: 'Tất cả',
      color: 'Tất cả',
      vaccination: 'Tất cả',
      origin: 'Tất cả',
      search: ''
    });
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '32px' }}>
        <span className="badge-blue">PETCARE SHOP THÚ CƯNG</span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
          Bán Chó Mèo Cảnh Thuần Chủng
        </h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>
          Đầy đủ bộ lọc thông minh 6 tiêu chí: Loài, Cân nặng, Giới tính, Màu sắc, Tiêm chủng & Nguồn gốc
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }}>
        
        {/* Sidebar Filters (Requirement 5) */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid #cbd5e1',
          height: 'fit-content',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} color="#0284c7" /> Bộ Lọc Thú Cưng
            </h3>
            <button 
              onClick={resetFilters} 
              style={{ fontSize: '0.8rem', color: '#0284c7', background: 'transparent', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <RotateCcw size={14} /> Xóa lọc
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Filter 1: Loài (Chó, Mèo) */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                1. Loài Thú Cưng
              </label>
              <select 
                className="input-field"
                value={petFilters.species}
                onChange={e => setPetFilters({ ...petFilters, species: e.target.value })}
              >
                <option value="Tất cả">Tất cả (Chó & Mèo)</option>
                <option value="Chó">Chó Cảnh 🐶</option>
                <option value="Mèo">Mèo Cảnh 🐱</option>
              </select>
            </div>

            {/* Filter 2: Cân nặng */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                2. Cân Nặng (Tầm Vóc)
              </label>
              <select 
                className="input-field"
                value={petFilters.weightCategory}
                onChange={e => setPetFilters({ ...petFilters, weightCategory: e.target.value })}
              >
                <option value="Tất cả">Tất cả cân nặng</option>
                <option value="<2kg">Nhỏ gọn (&lt; 2kg)</option>
                <option value="2-5kg">Vừa (2 - 5kg)</option>
                <option value="5-10kg">Lớn (5 - 10kg)</option>
                <option value=">10kg">Rất lớn (&gt; 10kg)</option>
              </select>
            </div>

            {/* Filter 3: Giới tính */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                3. Giới Tính
              </label>
              <select 
                className="input-field"
                value={petFilters.gender}
                onChange={e => setPetFilters({ ...petFilters, gender: e.target.value })}
              >
                <option value="Tất cả">Tất cả (Đực & Cái)</option>
                <option value="Đực">Đực ♂</option>
                <option value="Cái">Cái ♀</option>
              </select>
            </div>

            {/* Filter 4: Màu sắc */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                4. Màu Sắc Bộ Lông
              </label>
              <select 
                className="input-field"
                value={petFilters.color}
                onChange={e => setPetFilters({ ...petFilters, color: e.target.value })}
              >
                <option value="Tất cả">Tất cả màu sắc</option>
                {allColors.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Filter 5: Tiêm chủng */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                5. Tình Trạng Tiêm Chủng
              </label>
              <select 
                className="input-field"
                value={petFilters.vaccination}
                onChange={e => setPetFilters({ ...petFilters, vaccination: e.target.value })}
              >
                <option value="Tất cả">Tất cả số mũi tiêm</option>
                <option value="1 Mũi">Đã tiêm 1 mũi vắc-xin</option>
                <option value="2 Mũi">Đã tiêm 2 mũi vắc-xin</option>
                <option value="3 Mũi">Đã tiêm 3 mũi + Dại (Full)</option>
              </select>
            </div>

            {/* Filter 6: Nguồn gốc */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                6. Nguồn Gốc & Phả Hệ
              </label>
              <select 
                className="input-field"
                value={petFilters.origin}
                onChange={e => setPetFilters({ ...petFilters, origin: e.target.value })}
              >
                <option value="Tất cả">Tất cả nguồn gốc</option>
                {allOrigins.map((o, i) => (
                  <option key={i} value={o}>{o}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Pet Grid Content */}
        <div>
          {/* Top Search Bar */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
              <input 
                type="text" 
                className="input-field"
                style={{ paddingLeft: '42px' }}
                placeholder="Tìm kiếm chó mèo theo tên hoặc giống..."
                value={petFilters.search}
                onChange={e => setPetFilters({ ...petFilters, search: e.target.value })}
              />
            </div>

            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Tìm thấy <strong style={{ color: '#0284c7' }}>{filteredPets.length}</strong> kết quả
            </div>
          </div>

          {/* Grid list */}
          {filteredPets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
              <Info size={48} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ color: '#0f172a', fontWeight: 700 }}>Không tìm thấy thú cưng phù hợp</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>Hãy thử điều chỉnh hoặc xóa bớt tiêu chí lọc nhé!</p>
              <button onClick={resetFilters} className="btn-secondary" style={{ marginTop: '16px' }}>
                Xóa Bộ Lọc
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {filteredPets.map(pet => (
                <div key={pet.id} style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.08)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s'
                }}>
                  <div style={{ position: 'relative', height: '220px' }}>
                    <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="badge-blue" style={{ position: 'absolute', top: '12px', left: '12px' }}>{pet.species} • {pet.gender}</span>
                    <span className="badge-emerald" style={{ position: 'absolute', top: '12px', right: '12px' }}>{pet.vaccination}</span>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>{pet.name}</h3>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '14px' }}>
                        <span>⚖ Cân nặng: <strong>{pet.weight}</strong></span>
                        <span>🎨 Lông: <strong>{pet.color}</strong></span>
                        <span>📜 Nguồn gốc: <strong>{pet.origin}</strong></span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0284c7', marginBottom: '14px' }}>
                        {pet.price.toLocaleString('vi-VN')} đ
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => setSelectedPetForDetail(pet)}
                          className="btn-secondary"
                          style={{ flex: 1, padding: '10px', fontSize: '0.88rem', justifyContent: 'center' }}
                        >
                          Xem Chi Tiết
                        </button>
                        <button 
                          onClick={() => addToCart(pet, 'pet')}
                          className="btn-primary"
                          style={{ padding: '10px 14px', fontSize: '0.88rem' }}
                        >
                          <ShoppingCart size={16} />
                          <span>Đặt Mua</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
