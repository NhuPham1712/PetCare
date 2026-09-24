import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PetDetailModal } from './components/PetDetailModal';
import { ServiceBookingModal } from './components/ServiceBookingModal';

import { HomeView } from './views/HomeView';
import { PetShopView } from './views/PetShopView';
import { SupplyShopView } from './views/SupplyShopView';
import { ServicesView } from './views/ServicesView';
import { AboutView } from './views/AboutView';
import { UserProfileView } from './views/UserProfileView';
import { AdminView } from './views/AdminView';
import { ManagementView } from './views/ManagementView';
import { AuthView } from './views/AuthView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { StaffManagementView } from './views/StaffManagementView';
import { AdminScheduleView } from './views/AdminScheduleView';

import { StaffDashboardView } from './views/StaffDashboardView';
import { StaffAppointmentsView } from './views/StaffAppointmentsView';
import { StaffMedicalView } from './views/StaffMedicalView';
import { StaffBillingView } from './views/StaffBillingView';
import { StaffReportsView } from './views/StaffReportsView';

const MainContent = () => {
  const { activeTab, isAdmin, isStaff, setActiveTab } = useApp();

  const renderView = () => {
    // Admin Guard
    const adminTabs = ['dashboard', 'admin', 'management', 'staff_mgmt', 'schedule_mgmt'];
    if (adminTabs.includes(activeTab) && !isAdmin) {
      return (
        <div style={{ maxWidth: '600px', margin: '80px auto', padding: '40px 24px', textAlign: 'center', background: 'white', borderRadius: '24px', border: '1px solid #cbd5e1', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ffe4e6', color: '#be123c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>🔒</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Yêu Cầu Quyền Admin</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>Vùng này dành riêng cho Admin hệ thống. Vui lòng đăng nhập tài khoản Admin.</p>
          <button onClick={() => setActiveTab('login')} className="btn-primary" style={{ padding: '12px 24px', margin: '0 auto' }}>Đến Trang Đăng Nhập</button>
        </div>
      );
    }

    // Staff Guard
    const staffTabs = ['staff_dashboard', 'staff_appointments', 'staff_medical', 'staff_billing', 'staff_reports'];
    if (staffTabs.includes(activeTab) && !isStaff) {
      return (
        <div style={{ maxWidth: '600px', margin: '80px auto', padding: '40px 24px', textAlign: 'center', background: 'white', borderRadius: '24px', border: '1px solid #cbd5e1', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#d1fae5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>🔒</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Yêu Cầu Tài Khoản Bác Sĩ / Nhân Viên</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>Vùng này dành riêng cho Bác sĩ & Kỹ thuật viên thú y. Vui lòng đăng nhập tài khoản Nhân viên.</p>
          <button onClick={() => setActiveTab('login')} className="btn-primary" style={{ padding: '12px 24px', margin: '0 auto' }}>Đến Trang Đăng Nhập</button>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'petshop':
        return <PetShopView />;
      case 'supplies':
        return <SupplyShopView />;
      case 'services':
        return <ServicesView />;
      case 'about':
        return <AboutView />;
      case 'login':
        return <AuthView />;
      case 'user':
        return <UserProfileView />;

      // Admin Views
      case 'dashboard':
        return <AdminDashboardView />;
      case 'schedule_mgmt':
        return <AdminScheduleView />;
      case 'admin':
        return <AdminView />;
      case 'management':
        return <ManagementView />;
      case 'staff_mgmt':
        return <StaffManagementView />;

      // Staff / Doctor Views
      case 'staff_dashboard':
        return <StaffDashboardView />;
      case 'staff_appointments':
        return <StaffAppointmentsView />;
      case 'staff_medical':
        return <StaffMedicalView />;
      case 'staff_billing':
        return <StaffBillingView />;
      case 'staff_reports':
        return <StaffReportsView />;

      default:
        return isAdmin ? <AdminDashboardView /> : isStaff ? <StaffDashboardView /> : <HomeView />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {renderView()}
      </main>
      <Footer />
      
      {/* Global Overlays & Modals */}
      <Toast />
      <AuthModal />
      <CartDrawer />
      <CheckoutModal />
      <PetDetailModal />
      <ServiceBookingModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
