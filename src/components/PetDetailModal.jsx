import React from 'react';
import { X, ShieldCheck, Check, Heart, ShoppingCart, Award, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PetDetailModal = () => {
  const { selectedPetForDetail, setSelectedPetForDetail, addToCart } = useApp();

  if (!selectedPetForDetail) return null;

  const pet = selectedPetForDetail;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div className="animate-fade-in" style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -10px rgba(2, 132, 199, 0.4), 0 0 30px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        margin: 'auto',
        overflow: 'hidden'
      }}>
        {/* Top Header */}
        <div style={{
          position: 'relative',
          height: '280px',
          background: '#0f172a'
        }}>
          <img 
            src={pet.image} 
            alt={pet.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
          />
          <button 
            onClick={() => setSelectedPetForDetail(null)}
            style={{
              position: 'absolute',
              top: '16px', right: '16px',
              background: 'rgba(15, 23, 42, 0.6)',
              color: 'white',
              borderRadius: '50%',
              padding: '8px',
              border: '1px solid rgba(255,255,255,0.3)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
          <div style={{
            position: 'absolute',
            bottom: '16px', left: '20px', right: '20px',
            color: 'white',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'flex-end',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
          }}>
            <div>
              <span className="badge-blue" style={{ marginBottom: '6px', display: 'inline-block' }}>{pet.species} Thuần Chủng</span>
              <h2 style={{ fontSize: '1.6rem', color: 'white', fontWeight: 800 }}>{pet.name}</h2>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8' }}>
              {pet.price.toLocaleString('vi-VN')} đ
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#0284c7" /> Thông Số Kiểm Định & Hồ Sơ Thú Cưng
          </h4>

          {/* Grid of 6 Filters Specs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Loài Thú Cưng:</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0284c7' }}>{pet.species} ({pet.breed})</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Cân Nặng Thật:</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{pet.weight} (Phân loại: {pet.weightCategory})</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Giới Tính:</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{pet.gender}</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Màu Sắc Bộ Lông:</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{pet.color}</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Tình Trạng Tiêm Chủng:</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#16a34a' }}>{pet.vaccination}</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Nguồn Gốc & Phả Hệ:</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0284c7' }}>{pet.origin}</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Mô Tả Bé:</h5>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, background: '#eff6ff', padding: '14px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              {pet.description}
            </p>
          </div>

          {/* Guarantees */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div style={{ fontSize: '0.8rem', color: '#047857', background: '#d1fae5', padding: '6px 12px', borderRadius: '8px', fontWeight: 600 }}>
              ✓ Bảo hành sức khỏe 365 ngày
            </div>
            <div style={{ fontSize: '0.8rem', color: '#0369a1', background: '#e0f2fe', padding: '6px 12px', borderRadius: '8px', fontWeight: 600 }}>
              ✓ Tặng kèm microchip định vị & sổ tiêm
            </div>
            <div style={{ fontSize: '0.8rem', color: '#b45309', background: '#fef3c7', padding: '6px 12px', borderRadius: '8px', fontWeight: 600 }}>
              ✓ Vận chuyển xe điều hòa tận nhà
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                addToCart(pet, 'pet');
                setSelectedPetForDetail(null);
              }}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
            >
              <ShoppingCart size={18} />
              <span>Đặt Mua Bé {pet.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
