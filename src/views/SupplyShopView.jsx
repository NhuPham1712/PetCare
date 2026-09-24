import React, { useState } from 'react';
import { ShoppingBag, Search, Star, Truck, QrCode, CreditCard, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SupplyShopView = () => {
  const { products, addToCart, setIsCartOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(prod => {
    if (selectedCategory !== 'Tất cả' && prod.category !== selectedCategory) return false;
    if (searchQuery && !prod.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
        color: 'white',
        borderRadius: '24px',
        padding: '36px 32px',
        marginBottom: '40px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 10px 30px rgba(2, 132, 199, 0.2)'
      }}>
        <div>
          <span className="badge-blue" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: '8px' }}>
            HÀNG CHÍNH HÃNG 100%
          </span>
          <h1 style={{ fontSize: '2.2rem', color: 'white', fontWeight: 800 }}>Thức Ăn & Phụ Kiện Thú Cưng</h1>
          <p style={{ color: '#e0f2fe', marginTop: '6px', fontSize: '0.95rem' }}>
            Giao hàng siêu tốc tận nhà • Giỏ hàng linh hoạt • Thanh toán COD hoặc VietQR Bank Transfer
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px 18px', borderRadius: '14px', textAlign: 'center' }}>
            <Truck size={20} color="#38bdf8" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Giao hàng tận nhà</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px 18px', borderRadius: '14px', textAlign: 'center' }}>
            <QrCode size={20} color="#38bdf8" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Thanh toán COD & QR</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Tất cả', 'Thức Ăn', 'Đồ Dùng'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: selectedCategory === cat ? 700 : 500,
                fontSize: '0.92rem',
                background: selectedCategory === cat ? '#0284c7' : 'white',
                color: selectedCategory === cat ? 'white' : '#334155',
                border: '1.5px solid #e2e8f0',
                transition: 'all 0.2s'
              }}
            >
              {cat === 'Tất cả' ? 'Tất Cả Sản Phẩm' : cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
          <input 
            type="text" 
            className="input-field"
            style={{ paddingLeft: '42px' }}
            placeholder="Tìm thức ăn, pate, khay vệ sinh..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredProducts.map(prod => (
          <div key={prod.id} style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.06)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ position: 'relative', height: '200px' }}>
                <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge-blue" style={{ position: 'absolute', top: '12px', left: '12px' }}>{prod.category}</span>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#f59e0b', marginBottom: '6px' }}>
                  <Star size={14} fill="#f59e0b" />
                  <span style={{ fontWeight: 700 }}>{prod.rating}</span>
                  <span style={{ color: '#94a3b8' }}>• Đã bán {prod.sold}</span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '8px' }}>
                  {prod.name}
                </h3>

                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                  {prod.description}
                </p>
              </div>
            </div>

            <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>
                {prod.price.toLocaleString('vi-VN')} đ
              </div>
              <button 
                onClick={() => addToCart(prod, 'product')}
                className="btn-primary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                <ShoppingCart size={16} />
                <span>Thêm Giỏ</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
