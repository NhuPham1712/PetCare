import React, { useState } from 'react';
import { Filter, Search, RotateCcw, ShoppingCart, Info, Award, ShieldCheck, Sparkles, UserPlus, LogIn, HeartHandshake, ChevronDown, ChevronUp, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PetShopView = () => {
  const { 
    pets, 
    petFilters, 
    setPetFilters, 
    setSelectedPetForDetail, 
    addToCart,
    isLoggedIn,
    isAdmin,
    isStaff,
    user,
    currentProfile,
    setActiveTab,
    cart,
    setIsCartOpen,
    showToast
  } = useApp();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const getUserDisplayName = () => {
    if (isAdmin) return currentProfile?.name || 'Quản Trị Viên';
    if (isStaff) return currentProfile?.name || 'BS. Nguyễn Văn Hoàng';
    return user?.name || currentProfile?.name || 'Nguyễn Văn A';
  };

  const handleAddToCart = (pet) => {
    addToCart(pet, 'pet');
    if (!isLoggedIn) {
      showToast(`🔒 Đã thêm bé ${pet.name} vào giỏ! Đăng nhập ngay để nhận Hợp đồng bảo hành 365 ngày & giao hàng tận nhà.`, 'info');
    } else {
      showToast(`🎉 ${getUserDisplayName()}, đã thêm bé ${pet.name} vào giỏ hàng thành công!`);
    }
  };

  // Extract unique colors & origins for dynamic dropdown options
  const allColors = Array.from(new Set(pets.map(p => p.color)));
  const allOrigins = Array.from(new Set(pets.map(p => p.origin)));

  // Filter Logic matching Requirement 5
  const filteredPets = pets.filter(pet => {
    if (petFilters.search && !pet.name.toLowerCase().includes(petFilters.search.toLowerCase()) && !pet.breed.toLowerCase().includes(petFilters.search.toLowerCase())) {
      return false;
    }
    if (petFilters.species !== 'Tất cả' && pet.species !== petFilters.species) {
      return false;
    }
    if (petFilters.weightCategory !== 'Tất cả' && pet.weightCategory !== petFilters.weightCategory) {
      return false;
    }
    if (petFilters.gender !== 'Tất cả' && pet.gender !== petFilters.gender) {
      return false;
    }
    if (petFilters.color !== 'Tất cả' && pet.color !== petFilters.color) {
      return false;
    }
    if (petFilters.vaccination !== 'Tất cả' && !pet.vaccination.includes(petFilters.vaccination)) {
      return false;
    }
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

  const activeFilterCount = Object.entries(petFilters).reduce((count, [key, val]) => {
    if (key === 'search') return val.trim() !== '' ? count + 1 : count;
    return val !== 'Tất cả' ? count + 1 : count;
  }, 0);

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="pet-shop-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* 1. STATE-DEPENDENT DYNAMIC HERO BANNER */}
      {!isLoggedIn ? (
        /* Unregistered / Guest Customer Banner */
        <div className="pet-shop-banner animate-fade-in" style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0284c7 100%)',
          color: 'white',
          borderRadius: '20px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 25px rgba(2, 132, 199, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ background: '#f59e0b', color: '#0f172a', fontWeight: 800, fontSize: '0.72rem', padding: '3px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={13} />
                ƯU ĐÃI THÀNH VIÊN MỚI
              </span>
              <span style={{ fontSize: '0.8rem', color: '#93c5fd' }}>Dành cho khách hàng chưa đăng ký</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', lineHeight: 1.3 }}>
              Đăng Ký Tài Khoản Để Nhận Ưu Đãi 10% & Bảo Hành 365 Ngày!
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.4 }}>
              ✓ Đã kiểm định thuần chủng • ✓ Tặng Microchip định vị • ✓ Vận chuyển ô tô điều hòa tận nhà
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: '280px' }} className="pet-shop-banner-btn">
            <button 
              onClick={() => setActiveTab('login')}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                color: 'white',
                fontWeight: 800,
                padding: '12px 18px',
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <LogIn size={18} />
              <span>Đăng Nhập / Đăng Ký Ngay</span>
            </button>
          </div>
        </div>
      ) : (
        /* Logged-In Customer Banner */
        <div className="pet-shop-banner animate-fade-in" style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
          color: 'white',
          borderRadius: '20px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 25px rgba(2, 132, 199, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ background: '#22c55e', color: 'white', fontWeight: 800, fontSize: '0.72rem', padding: '3px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <HeartHandshake size={14} />
                TÀI KHOẢN THÀNH VIÊN
              </span>
              <span style={{ fontSize: '0.8rem', color: '#e0f2fe' }}>Đã đăng nhập hệ thống PetCare</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', lineHeight: 1.3 }}>
              👋 Xin chào, {getUserDisplayName()}!
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#e0f2fe', marginTop: '4px', lineHeight: 1.4 }}>
              Chúc bạn chọn được bé cưng thuần chủng ưng ý nhất. Đơn hàng đặt mua sẽ được tự động lưu vào Hồ Sơ Cá Nhân!
            </p>
          </div>

          <div className="pet-shop-banner-btn" style={{ width: '100%', maxWidth: '240px' }}>
            <button 
              onClick={() => setIsCartOpen(true)}
              style={{
                width: '100%',
                justifyContent: 'center',
                background: 'white',
                color: '#0284c7',
                border: 'none',
                fontWeight: 800,
                padding: '12px 18px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              <ShoppingCart size={18} color="#0284c7" />
              <span>Xem Giỏ Hàng ({totalCartCount})</span>
            </button>
          </div>
        </div>
      )}

      {/* Page Title */}
      <div style={{ marginBottom: '20px' }}>
        <span className="badge-blue">PETCARE SHOP THÚ CƯNG</span>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
          Bán Chó Mèo Cảnh Thuần Chủng
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '2px' }}>
          Bộ lọc thông minh 6 tiêu chí: Loài, Cân nặng, Giới tính, Màu sắc, Tiêm chủng & Nguồn gốc
        </p>
      </div>

      {/* Quick Species Filter Chips (Mobile & Desktop) */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        WebkitOverflowScrolling: 'touch'
      }} className="no-scrollbar">
        {[
          { label: 'Tất cả (Chó & Mèo)', value: 'Tất cả', icon: '🐾' },
          { label: 'Chó Cảnh', value: 'Chó', icon: '🐶' },
          { label: 'Mèo Cảnh', value: 'Mèo', icon: '🐱' },
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setPetFilters({ ...petFilters, species: tab.value })}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              border: petFilters.species === tab.value ? '2px solid #0284c7' : '1px solid #cbd5e1',
              background: petFilters.species === tab.value ? '#e0f2fe' : 'white',
              color: petFilters.species === tab.value ? '#0369a1' : '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            style={{
              padding: '8px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: '#fee2e2',
              color: '#ef4444',
              border: '1px solid #fca5a5',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} /> Xóa Lọc ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Search Bar & Mobile Filter Trigger */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="input-field"
            style={{ paddingLeft: '38px', paddingRight: petFilters.search ? '36px' : '12px', fontSize: '0.88rem' }}
            placeholder="Tìm kiếm chó mèo theo tên hoặc giống..."
            value={petFilters.search}
            onChange={e => setPetFilters({ ...petFilters, search: e.target.value })}
          />
          {petFilters.search && (
            <button
              onClick={() => setPetFilters({ ...petFilters, search: '' })}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                color: '#94a3b8',
                padding: '4px'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Mobile Filter Expand/Collapse Button */}
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="mobile-filter-toggle-btn"
          style={{
            background: activeFilterCount > 0 ? '#0284c7' : 'white',
            color: activeFilterCount > 0 ? 'white' : '#0f172a',
            border: '1.5px solid #cbd5e1',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <Filter size={16} color={activeFilterCount > 0 ? 'white' : '#0284c7'} />
          <span>Bộ Lọc</span>
          {activeFilterCount > 0 && (
            <span style={{
              background: 'white',
              color: '#0284c7',
              borderRadius: '9999px',
              padding: '1px 7px',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              {activeFilterCount}
            </span>
          )}
          {isMobileFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Main Container Layout */}
      <div className="pet-shop-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
        
        {/* Sidebar Filters (Always visible on Desktop, Expandable on Mobile) */}
        <div 
          className={`pet-shop-filter-sidebar ${isMobileFilterOpen ? 'mobile-filter-open' : 'mobile-filter-closed'}`}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            height: 'fit-content',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} color="#0284c7" /> Bộ Lọc 6 Tiêu Chí
            </h3>
            <button 
              onClick={resetFilters} 
              style={{ fontSize: '0.78rem', color: '#0284c7', background: 'transparent', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              <RotateCcw size={13} /> Xóa lọc
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Filter 1: Loài (Chó, Mèo) */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                1. Loài Thú Cưng
              </label>
              <select 
                className="input-field"
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
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
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                2. Cân Nặng (Tầm Vóc)
              </label>
              <select 
                className="input-field"
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
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
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                3. Giới Tính
              </label>
              <select 
                className="input-field"
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
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
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                4. Màu Sắc Bộ Lông
              </label>
              <select 
                className="input-field"
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
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
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                5. Tình Trạng Tiêm Chủng
              </label>
              <select 
                className="input-field"
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
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
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                6. Nguồn Gốc & Phả Hệ
              </label>
              <select 
                className="input-field"
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
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
          {/* Result Counter Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
              Hiển thị <strong style={{ color: '#0284c7' }}>{filteredPets.length}</strong> thú cưng phù hợp
            </div>
          </div>

          {/* Grid list */}
          {filteredPets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
              <Info size={40} color="#94a3b8" style={{ margin: '0 auto 10px' }} />
              <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1rem' }}>Không tìm thấy thú cưng phù hợp</h3>
              <p style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '4px' }}>Hãy thử điều chỉnh hoặc xóa bớt tiêu chí lọc nhé!</p>
              <button onClick={resetFilters} className="btn-secondary" style={{ marginTop: '14px', fontSize: '0.85rem' }}>
                Xóa Bộ Lọc
              </button>
            </div>
          ) : (
            <div className="pet-shop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {filteredPets.map(pet => (
                <div key={pet.id} style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.08)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}>
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="badge-blue" style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.7rem' }}>
                      {pet.species} • {pet.gender}
                    </span>
                    <span className="badge-emerald" style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.7rem' }}>
                      {pet.vaccination}
                    </span>
                  </div>

                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>{pet.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '12px' }}>
                        <span>⚖ Cân nặng: <strong>{pet.weight}</strong></span>
                        <span>🎨 Lông: <strong>{pet.color}</strong></span>
                        <span>📜 Nguồn gốc: <strong>{pet.origin}</strong></span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7', marginBottom: '12px' }}>
                        {pet.price.toLocaleString('vi-VN')} đ
                      </div>

                      <div className="pet-card-actions" style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => setSelectedPetForDetail(pet)}
                          className="btn-secondary"
                          style={{ flex: 1, padding: '8px 10px', fontSize: '0.82rem', justifyContent: 'center' }}
                        >
                          Chi Tiết
                        </button>
                        <button 
                          onClick={() => handleAddToCart(pet)}
                          className="btn-primary"
                          style={{ flex: 1, padding: '8px 10px', fontSize: '0.82rem', justifyContent: 'center' }}
                        >
                          <ShoppingCart size={15} />
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
