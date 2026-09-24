import React, { useState } from 'react';
import { X, Truck, CreditCard, QrCode, CheckCircle2, MapPin, Phone, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, user, placeOrder } = useApp();

  const [shippingInfo, setShippingInfo] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '',
    transportOption: 'home_delivery', // 'home_delivery' or 'store_pickup'
    paymentMethod: 'qr_code', // 'cod' or 'qr_code'
    note: ''
  });

  const [qrStepDone, setQrStepDone] = useState(false);

  if (!isCheckoutOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = shippingInfo.transportOption === 'home_delivery' ? 30000 : 0;
  const grandTotal = totalAmount + shippingFee;

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    placeOrder({
      name: shippingInfo.name,
      phone: shippingInfo.phone,
      address: shippingInfo.transportOption === 'home_delivery' ? shippingInfo.address : 'Nhận trực tiếp tại cửa hàng PetCare (123 Nguyễn Thị Minh Khai, Q.3)',
      paymentMethod: shippingInfo.paymentMethod === 'cod' ? 'Thanh toán COD' : 'QR Code VietQR (MBBank)',
      total: grandTotal
    });
  };

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
        maxWidth: '680px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -10px rgba(2, 132, 199, 0.4), 0 0 30px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        margin: 'auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
          color: 'white',
          padding: '20px 24px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: 'white', fontWeight: 800 }}>Thanh Toán Đơn Hàng</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Dịch vụ giao hàng tận nhà & Chuyển khoản QR Code nhanh chóng</p>
          </div>
          <button 
            onClick={() => setIsCheckoutOpen(false)}
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', padding: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleCompleteOrder} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section 1: Customer Info */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="#0284c7" /> 1. Thông Tin Người Nhận
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Họ tên</label>
                <input 
                  type="text" required className="input-field" 
                  value={shippingInfo.name}
                  onChange={e => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Số điện thoại</label>
                <input 
                  type="tel" required className="input-field"
                  value={shippingInfo.phone}
                  onChange={e => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Transport Method */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={18} color="#0284c7" /> 2. Dịch Vụ Vận Chuyển
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div 
                onClick={() => setShippingInfo({ ...shippingInfo, transportOption: 'home_delivery' })}
                style={{
                  border: `2px solid ${shippingInfo.transportOption === 'home_delivery' ? '#0284c7' : '#e2e8f0'}`,
                  background: shippingInfo.transportOption === 'home_delivery' ? '#eff6ff' : 'white',
                  borderRadius: '14px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>🏠 Giao Hàng Tận Nhà</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Xe đưa đón thú cưng & vận chuyển hàng tận nơi (+30.000đ)</div>
              </div>

              <div 
                onClick={() => setShippingInfo({ ...shippingInfo, transportOption: 'store_pickup' })}
                style={{
                  border: `2px solid ${shippingInfo.transportOption === 'store_pickup' ? '#0284c7' : '#e2e8f0'}`,
                  background: shippingInfo.transportOption === 'store_pickup' ? '#eff6ff' : 'white',
                  borderRadius: '14px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>🏬 Nhận Tại Cửa Hàng</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Ghé 123 Nguyễn Thị Minh Khai nhận hàng trực tiếp (Miễn phí)</div>
              </div>
            </div>

            {shippingInfo.transportOption === 'home_delivery' && (
              <div style={{ marginTop: '12px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Địa chỉ nhận hàng chi tiết</label>
                <input 
                  type="text" required className="input-field"
                  placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện"
                  value={shippingInfo.address}
                  onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Section 3: Payment Method */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="#0284c7" /> 3. Phương Thức Thanh Toán
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div 
                onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'qr_code' })}
                style={{
                  border: `2px solid ${shippingInfo.paymentMethod === 'qr_code' ? '#0284c7' : '#e2e8f0'}`,
                  background: shippingInfo.paymentMethod === 'qr_code' ? '#eff6ff' : 'white',
                  borderRadius: '14px',
                  padding: '14px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <QrCode size={18} color="#0284c7" /> Quét Mã QR Code (Ngân Hàng)
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Tự động cập nhật nội dung & số tiền</div>
              </div>

              <div 
                onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'cod' })}
                style={{
                  border: `2px solid ${shippingInfo.paymentMethod === 'cod' ? '#0284c7' : '#e2e8f0'}`,
                  background: shippingInfo.paymentMethod === 'cod' ? '#eff6ff' : 'white',
                  borderRadius: '14px',
                  padding: '14px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={18} color="#0284c7" /> Thanh Toán COD
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Trả tiền mặt khi nhận hàng</div>
              </div>
            </div>

            {/* QR Code Dynamic Preview */}
            {shippingInfo.paymentMethod === 'qr_code' && (
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #bfdbfe',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <span className="badge-blue" style={{ marginBottom: '10px', display: 'inline-block' }}>MÃ QR VIETQR TỰ ĐỘNG</span>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=STK:888999888999|NganHang:MBBank|Chuhuong:HE%20THONG%20PETCARE%20CENTER|Sotien:${grandTotal}|Noidung:PETCARE${Date.now().toString().slice(-5)}`}
                    alt="VietQR Code"
                    style={{ width: '170px', height: '170px', borderRadius: '12px', border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </div>
                <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 700 }}>Ngân hàng: MBBank (Ngân Hàng Quân Đội)</div>
                <div style={{ fontSize: '0.95rem', color: '#0284c7', fontWeight: 800 }}>Số tài khoản: 888 999 888 999</div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>Chủ tài khoản: CÔNG TY TNHH PETCARE CENTER</div>
                <div style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 700, marginTop: '4px' }}>
                  Số tiền cần chuyển: {grandTotal.toLocaleString('vi-VN')} đ
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Summary & Submit */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
              <span>Tiền hàng ({cart.length} món):</span>
              <span>{totalAmount.toLocaleString('vi-VN')} đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}>
              <span>Phí vận chuyển:</span>
              <span>{shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')} đ`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>
              <span>Tổng Tiền Đơn Hàng:</span>
              <span>{grandTotal.toLocaleString('vi-VN')} đ</span>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1.05rem' }}
            >
              <CheckCircle2 size={20} />
              <span>Xác Nhận Đặt Hàng Ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
