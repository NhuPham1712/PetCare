import React from 'react';
import { 
  Heart, 
  BookOpen, 
  Award, 
  History, 
  MessageSquare, 
  UserCheck, 
  Star, 
  CheckCircle2 
} from 'lucide-react';
import { REVIEWS, DOCTORS, BLOG_ARTICLES, STORE_HISTORY } from '../data/mockData';

export const AboutView = () => {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <span className="badge-blue">GIỚI THIỆU PETCARE CENTER</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
          Hệ Thống Chăm Sóc Thú Cưng Đáng Tin Cậy
        </h1>
        <p style={{ color: '#64748b', marginTop: '8px', fontSize: '1rem', lineHeight: 1.6 }}>
          Hành trình phát triển từ 2018 cùng đội ngũ Thạc sĩ Bác sĩ Thú y & Stylist chuyên nghiệp. Dưới đây là thông tin giới thiệu, đánh giá khách hàng, đội ngũ nhân sự và cẩm nang nuôi dưỡng chó mèo.
        </p>
      </div>

      {/* 1. Lịch sử cửa hàng (Store History Timeline) */}
      <section style={{ background: 'white', padding: '36px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <History size={24} color="#0284c7" />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Lịch Sử Thành Lập & Phát Triển</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {STORE_HISTORY.map((item, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', borderLeft: '4px solid #0284c7' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7', marginBottom: '6px' }}>{item.year}</div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Đội ngũ bác sĩ & Đội ngũ nhân viên (Doctors & Staff Profiles) */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <span className="badge-blue">NHÂN SỰ CHUYÊN CỐ</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Đội Ngũ Bác Sĩ & Nhân Viên Tận Tâm
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {DOCTORS.map((doc, idx) => (
            <div key={idx} style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.06)' }}>
              <img src={doc.image} alt={doc.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <span className="badge-blue" style={{ marginBottom: '6px', display: 'inline-block' }}>{doc.exp}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{doc.name}</h3>
                <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600, marginBottom: '8px' }}>{doc.role}</div>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>📜 {doc.cert}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Feedback khách hàng (Customer Testimonials) */}
      <section style={{ background: '#eff6ff', padding: '36px', borderRadius: '24px', border: '1px solid #bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <MessageSquare size={24} color="#0284c7" />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Feedback & Đánh Giá Từ Khách Hàng</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {REVIEWS.map(rev => (
            <div key={rev.id} style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img src={rev.avatar} alt={rev.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>{rev.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>Thú cưng: {rev.petName}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>"{rev.comment}"</p>
              <div style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '10px' }}>{'★'.repeat(rev.rating)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Cẩm nang chó mèo (Pet Care Guides & Blog) */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <BookOpen size={24} color="#0284c7" />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Cẩm Nang Nuôi & Chăm Sóc Chó Mèo</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {BLOG_ARTICLES.map(art => (
            <div key={art.id} style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <img src={art.image} alt={art.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge-blue">{art.category}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{art.date}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '8px' }}>{art.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{art.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
