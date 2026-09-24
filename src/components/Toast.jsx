import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';

  return (
    <div className="animate-fade-in" style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      borderRadius: '14px',
      background: isSuccess ? '#0f172a' : '#1e293b',
      color: 'white',
      boxShadow: '0 10px 30px rgba(2, 132, 199, 0.35)',
      border: '1px solid rgba(56, 189, 248, 0.4)',
      maxWidth: '420px'
    }}>
      {isSuccess && <CheckCircle2 size={22} color="#38bdf8" />}
      {isInfo && <Info size={22} color="#fbbf24" />}
      {!isSuccess && !isInfo && <AlertCircle size={22} color="#f87171" />}
      
      <span style={{ fontSize: '0.92rem', fontWeight: 500 }}>{toast.message}</span>
    </div>
  );
};
