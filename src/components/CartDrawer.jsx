import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    setIsCheckoutOpen 
  } = useApp();

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 2500,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div className="animate-fade-in" style={{
        background: 'white',
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.15)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          background: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#0284c7" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>Giỏ Hàng Của Bạn</h3>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ background: '#e2e8f0', padding: '6px', borderRadius: '50%', color: '#475569' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
              <ShoppingBag size={56} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontWeight: 600, fontSize: '1.05rem', color: '#475569' }}>Giỏ hàng của bạn đang trống</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Hãy chọn chó mèo cảnh hoặc phụ kiện thức ăn để thêm vào giỏ nhé!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                      {item.name}
                    </div>
                    <div style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.95rem' }}>
                      {item.price.toLocaleString('vi-VN')} đ
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', borderRadius: '8px', border: '1px solid #cbd5e1', padding: '2px 8px' }}>
                        <button onClick={() => updateCartQuantity(item.id, -1)} style={{ background: 'transparent' }}>
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)} style={{ background: 'transparent' }}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444', background: 'transparent' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transport Notice & Summary */}
        {cart.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <div style={{
              background: '#e0f2fe',
              padding: '10px 14px',
              borderRadius: '10px',
              color: '#0369a1',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <Truck size={18} />
              <span>Dịch vụ vận chuyển tận nhà siêu tốc bằng xe chuyên dụng</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#64748b' }}>
              <span>Tạm tính ({cart.length} sản phẩm):</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{totalAmount.toLocaleString('vi-VN')} đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>
              <span>Tổng Tiền Thanh Toán:</span>
              <span>{totalAmount.toLocaleString('vi-VN')} đ</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
            >
              <CreditCard size={18} />
              <span>Tiến Hành Thanh Toán</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
