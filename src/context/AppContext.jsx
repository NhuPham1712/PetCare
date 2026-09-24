import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PETS, 
  INITIAL_PRODUCTS, 
  INITIAL_USER 
} from '../data/mockData';

const AppContext = createContext();

const API_BASE = 'http://localhost:5000/api';

// Predefined profiles for different roles
const STAFF_PROFILE = {
  name: 'ThS. BS. Nguyễn Văn Minh',
  email: 'bs.minh@petcare.vn',
  phone: '0909 123 456',
  roleTitle: 'Bác Sĩ Trưởng Khoa Cấp Cứu & Phẫu Thuật',
  department: 'Khoa Y Tế & Phẫu Thuật Thú Y',
  workShift: 'Ca Sáng (07:30 - 15:30) & Trực Cấp Cứu 24/7',
  assignedPets: [
    { id: 'ca-1', petName: 'Mochi (Poodle)', owner: 'Đặng Ngọc Nhuy', service: 'Phẫu thuật triệt sản', status: 'Đang theo dõi hậu phẫu', room: 'Phòng Cấp Cứu 01' },
    { id: 'ca-2', petName: 'Bơ (Corgi)', owner: 'Trần Văn Hải', service: 'Khám định kỳ & Tiêm vắc-xin 7 bệnh', status: 'Chờ tái khám', room: 'Phòng Khám 03' }
  ],
  schedule: [
    { day: 'Thứ 2', shift: 'Ca Sáng (07:30 - 15:30)', task: 'Khám định kỳ & Phẫu thuật mổ đẻ' },
    { day: 'Thứ 3', shift: 'Ca Chiều (13:00 - 21:00)', task: 'Trực cấp cứu hotline 1900 888 999' },
    { day: 'Thứ 4', shift: 'Ca Sáng (07:30 - 15:30)', task: 'Xét nghiệm X-Quang & Tiêm phòng' },
    { day: 'Thứ 5', shift: 'Ca Trực 24/7', task: 'Đưa đón ca cấp cứu xe tận nhà' },
    { day: 'Thứ 6', shift: 'Ca Sáng (07:30 - 15:30)', task: 'Hội chẩn & Quản lý đội bác sĩ trẻ' }
  ]
};

const INITIAL_STAFF = [
  {
    id: 'NV-001',
    name: 'BS. Nguyễn Văn Hoàng',
    role: 'Bác Sĩ Thú Y Trưởng Khoa',
    department: 'Bác Sĩ Thú Y',
    phone: '0988 123 456',
    email: 'hoang.nguyen@petcare.com',
    status: 'Đang làm',
    hourlyRate: '150.000 đ/giờ',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    schedule: {
      'Thứ 2': 'Sáng (08:00 - 12:00)',
      'Thứ 3': 'Chiều (13:00 - 17:00)',
      'Thứ 4': 'Nghỉ',
      'Thứ 5': 'Sáng (08:00 - 12:00)',
      'Thứ 6': 'Cả ngày (08:00 - 17:00)',
      'Thứ 7': 'Trực Tối (17:00 - 21:00)',
      'Chủ Nhật': 'Nghỉ'
    }
  },
  {
    id: 'NV-002',
    name: 'BS. Trần Thị Mai',
    role: 'Bác Sĩ Thú Y Chuyên Khoa',
    department: 'Bác Sĩ Thú Y',
    phone: '0977 234 567',
    email: 'mai.tran@petcare.com',
    status: 'Đang làm',
    hourlyRate: '140.000 đ/giờ',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a9942a033f?auto=format&fit=crop&w=400&q=80',
    schedule: {
      'Thứ 2': 'Chiều (13:00 - 17:00)',
      'Thứ 3': 'Chiều (13:00 - 17:00)',
      'Thứ 4': 'Sáng (08:00 - 12:00)',
      'Thứ 5': 'Nghỉ',
      'Thứ 6': 'Chiều (13:00 - 17:00)',
      'Thứ 7': 'Sáng (08:00 - 12:00)',
      'Chủ Nhật': 'Cả ngày (08:00 - 17:00)'
    }
  },
  {
    id: 'NV-003',
    name: 'Lê Văn Cường',
    role: 'Kỹ Thuật Viên Grooming & Spa',
    department: 'Kỹ Thuật Viên Spa',
    phone: '0966 345 678',
    email: 'cuong.le@petcare.com',
    status: 'Đang làm',
    hourlyRate: '90.000 đ/giờ',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    schedule: {
      'Thứ 2': 'Sáng (08:00 - 12:00)',
      'Thứ 3': 'Sáng (08:00 - 12:00)',
      'Thứ 4': 'Chiều (13:00 - 17:00)',
      'Thứ 5': 'Sáng (08:00 - 12:00)',
      'Thứ 6': 'Cả ngày (08:00 - 17:00)',
      'Thứ 7': 'Nghỉ',
      'Chủ Nhật': 'Nghỉ'
    }
  },
  {
    id: 'NV-004',
    name: 'Phạm Thị Hương',
    role: 'Lễ Tân & Chăm Sóc Khách Hàng',
    department: 'Lễ Tân',
    phone: '0955 456 789',
    email: 'huong.pham@petcare.com',
    status: 'Nghỉ phép',
    hourlyRate: '80.000 đ/giờ',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    schedule: {
      'Thứ 2': 'Nghỉ phép',
      'Thứ 3': 'Sáng (08:00 - 12:00)',
      'Thứ 4': 'Sáng (08:00 - 12:00)',
      'Thứ 5': 'Chiều (13:00 - 17:00)',
      'Thứ 6': 'Sáng (08:00 - 12:00)',
      'Thứ 7': 'Sáng (08:00 - 12:00)',
      'Chủ Nhật': 'Nghỉ'
    }
  },
  {
    id: 'NV-005',
    name: 'Ngô Minh Tú',
    role: 'Chuyên Viên Đưa Đón Thú Cưng',
    department: 'Vận Chuyển',
    phone: '0944 567 890',
    email: 'tu.ngo@petcare.com',
    status: 'Đang trực',
    hourlyRate: '85.000 đ/giờ',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    schedule: {
      'Thứ 2': 'Trực Tối (17:00 - 21:00)',
      'Thứ 3': 'Trực Tối (17:00 - 21:00)',
      'Thứ 4': 'Cả ngày (08:00 - 17:00)',
      'Thứ 5': 'Trực Tối (17:00 - 21:00)',
      'Thứ 6': 'Nghỉ ca',
      'Thứ 7': 'Cả ngày (08:00 - 17:00)',
      'Chủ Nhật': 'Trực Tối (17:00 - 21:00)'
    }
  }
];

const ADMIN_PROFILE = {
  name: 'Quản Trị Viên PetCare Center',
  email: 'admin.manager@petcare.vn',
  phone: '0988 777 999',
  roleTitle: 'Giám Đốc Quản Lý Hệ Thống & CSDL',
  permissions: 'Full Control (CSDL MySQL, Quản Lý Đơn Hàng, Phân Quyền Nhân Viên)',
  systemLogs: [
    { time: '10:30', action: 'Kết nối CSDL MySQL XAMPP Port 3307 thành công' },
    { time: '09:15', action: 'Duyệt đơn đặt lịch Spa BK-1001 cho khách hàng Đặng Ngọc Nhuy' },
    { time: '08:00', action: 'Thêm chó Corgi VKA vào CSDL sản phẩm bán' }
  ]
};

export const AppProvider = ({ children }) => {
  // Navigation / View state
  const [activeTab, setActiveTabState] = useState('home');

  // Database Connection Indicator
  const [dbConnected, setDbConnected] = useState(false);

  // Authentication & Role State: 'customer', 'staff', 'admin'
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('petcare_logged_in') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('petcare_role') || 'customer';
  });

  const isAdmin = isLoggedIn && userRole === 'admin';
  const isStaff = isLoggedIn && userRole === 'staff';
  const isCustomer = isLoggedIn && userRole === 'customer';

  // Current Logged In Profile
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('petcare_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Active Profile matching Role
  const currentProfile = userRole === 'staff' ? STAFF_PROFILE : userRole === 'admin' ? ADMIN_PROFILE : user;

  // Database States
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('petcare_pets');
    return saved ? JSON.parse(saved) : INITIAL_PETS;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('petcare_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('petcare_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Admin / Management global bookings & orders
  const [allBookings, setAllBookings] = useState(() => {
    const saved = localStorage.getItem('petcare_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'BK-1001',
        customerName: 'Đặng Ngọc Nhuy',
        phone: '0988 777 888',
        petName: 'Mochi (Chó Poodle)',
        serviceCategory: 'Spa & Grooming',
        serviceName: 'Tắm & Cắt tỉa lông',
        date: '2026-09-25',
        transportMode: 'Trực tiếp đưa đến cửa hàng',
        status: 'Đã xác nhận',
        createdAt: '2026-09-24'
      }
    ];
  });

  // Staff list & schedule state
  const [staffList, setStaffList] = useState(() => {
    const saved = localStorage.getItem('petcare_staff_list');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  useEffect(() => {
    localStorage.setItem('petcare_staff_list', JSON.stringify(staffList));
  }, [staffList]);

  const updateStaffSchedule = (staffId, day, newShift) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === staffId) {
        const updatedSchedule = { ...(s.schedule || {}), [day]: newShift };
        return { ...s, schedule: updatedSchedule };
      }
      return s;
    }));
    showToast(`Đã đổi ca làm ngày ${day} sang "${newShift}"!`);
  };

  const updateStaffStatus = (staffId, newStatus) => {
    setStaffList(prev => prev.map(s => s.id === staffId ? { ...s, status: newStatus } : s));
    showToast(`Đã cập nhật trạng thái làm việc -> "${newStatus}"`);
  };

  const reassignBooking = (bookingId, targetStaffName) => {
    setAllBookings(prev => prev.map(b => b.id === bookingId ? { ...b, assignedStaff: targetStaffName } : b));
    addNotification({
      title: '🔵 Lịch hẹn đã được bàn giao',
      message: `Lịch hẹn mã ${bookingId} đã được Admin chuyển giao cho ${targetStaffName} phụ trách khám & chăm sóc.`,
      type: 'appointment'
    });
    showToast(`Đã bàn giao lịch hẹn ${bookingId} sang cho ${targetStaffName}!`);
  };

  const [allOrders, setAllOrders] = useState(() => {
    const saved = localStorage.getItem('petcare_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-88291',
        customerName: 'Đặng Ngọc Nhuy',
        phone: '0988 777 888',
        address: '123 Đường Nguyễn Thị Minh Khai, P.6, Q.3, TP.HCM',
        items: [{ name: 'Thức Ăn Hạt Royal Canin Mini Adult (2kg)', quantity: 1, price: 340000 }],
        total: 340000,
        paymentMethod: 'QR Code (MBBank)',
        status: 'Hoàn thành',
        createdAt: '2026-09-22'
      }
    ];
  });

  // Medical Records State
  const [medicalRecords, setMedicalRecords] = useState(() => {
    const saved = localStorage.getItem('petcare_medical_records');
    return saved ? JSON.parse(saved) : [
      {
        id: 'MR-2026-001',
        date: '2026-09-24',
        customerName: 'Đặng Ngọc Nhuy',
        phone: '0988 777 888',
        petName: 'Mochi (Chó Poodle)',
        doctorName: 'BS. Nguyễn Văn Hoàng',
        symptoms: 'Sốt nhẹ, uể uải, bỏ ăn 1 ngày',
        diagnosis: 'Viêm đường hô hấp trên do thay đổi thời tiết',
        result: 'Thú cưng phản xạ tốt, nhịp tim 110 nhịp/phút. Cần dùng thuốc hạ sốt.',
        prescription: [
          { medicineName: 'Kháng Sinh PetCare Amox 250mg', dosage: '2 viên/ngày (Sáng / Tối)', price: 120000 },
          { medicineName: 'Siro Bổ Gan & Hạ Sốt Cho Chó', dosage: '5ml/lần (Sau ăn)', price: 85000 }
        ],
        notes: 'Tái khám sau 3 ngày nếu còn sốt.'
      }
    ];
  });

  // Customer Invoices State
  const [customerInvoices, setCustomerInvoices] = useState(() => {
    const saved = localStorage.getItem('petcare_invoices');
    return saved ? JSON.parse(saved) : [
      {
        id: 'INV-2026-001',
        date: '2026-09-24',
        customerName: 'Đặng Ngọc Nhuy',
        phone: '0988 777 888',
        petName: 'Mochi (Chó Poodle)',
        paymentMethod: 'Chuyển Khoản VietQR / MBBank',
        services: [
          { name: 'Khám sức khỏe tổng quát', price: 150000 },
          { name: 'Spa & Grooming trọn gói 8 bước', price: 250000 }
        ],
        medicines: [
          { name: 'Kháng Sinh PetCare Amox 250mg', qty: 1, price: 120000 },
          { name: 'Siro Bổ Gan & Hạ Sốt Cho Chó', qty: 1, price: 85000 }
        ],
        totalAmount: 605000,
        paymentStatus: 'Đã thanh toán'
      }
    ];
  });

  // Customer Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('petcare_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'NOTIF-101',
        title: '🔵 Lịch hẹn đã được xác nhận',
        message: 'Lịch hẹn Spa & Grooming cho bé Mochi (Mã BK-1001) đã được BS. Nguyễn Văn Hoàng xác nhận.',
        time: '10 phút trước',
        unread: true,
        type: 'appointment'
      },
      {
        id: 'NOTIF-102',
        title: '🩺 Có kết quả khám mới',
        message: 'Bác sĩ đã tạo phiếu khám mới (Mã MR-2026-001) cho bé Mochi. Bạn có thể kiểm tra trong Hồ Sơ Bệnh Án.',
        time: '1 giờ trước',
        unread: true,
        type: 'medical'
      },
      {
        id: 'NOTIF-103',
        title: '📜 Hóa đơn đã được tạo',
        message: 'Bác sĩ đã xuất Hóa đơn thanh toán (Mã INV-2026-001) tổng tiền 605,000đ. Đã lưu vào Hồ Sơ Hóa Đơn.',
        time: '2 giờ trước',
        unread: true,
        type: 'invoice'
      },
      {
        id: 'NOTIF-104',
        title: '💉 Đến lịch tiêm ngừa định kỳ',
        message: 'Đến lịch tiêm ngừa Mũi 2 Vaccine 5 bệnh cho bé Mochi. Vui lòng đặt lịch để được chăm sóc tốt nhất.',
        time: 'Hôm nay',
        unread: false,
        type: 'vaccine'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('petcare_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif) => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      time: 'Vừa xong',
      unread: true,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  useEffect(() => {
    localStorage.setItem('petcare_medical_records', JSON.stringify(medicalRecords));
  }, [medicalRecords]);

  useEffect(() => {
    localStorage.setItem('petcare_invoices', JSON.stringify(customerInvoices));
  }, [customerInvoices]);

  const createMedicalRecord = (recordData) => {
    setMedicalRecords(prev => [recordData, ...prev]);
    addNotification({
      title: '🩺 Có kết quả khám mới',
      message: `Bác sĩ đã tạo phiếu khám mới cho bé ${recordData.petName}. Đơn thuốc & kết quả đã được lưu vào Hồ Sơ Bệnh Án.`,
      type: 'medical'
    });
  };

  const createInvoice = (invoiceData) => {
    setCustomerInvoices(prev => [invoiceData, ...prev]);
    addNotification({
      title: '📜 Hóa đơn đã được tạo',
      message: `Bác sĩ đã lập Hóa đơn thanh toán (${invoiceData.id}) tổng cộng ${invoiceData.totalAmount?.toLocaleString('vi-VN')}đ cho bé ${invoiceData.petName}.`,
      type: 'invoice'
    });
  };

  // Pet Filters State
  const [petFilters, setPetFilters] = useState({
    species: 'Tất cả',
    weightCategory: 'Tất cả',
    gender: 'Tất cả',
    color: 'Tất cả',
    vaccination: 'Tất cả',
    origin: 'Tất cả',
    search: ''
  });

  // Modal Control States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('customer');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPetForDetail, setSelectedPetForDetail] = useState(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);

  // Toasts
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Role & Login Guarded Navigation
  const setActiveTab = (tabId) => {
    // 1. Guard 'user' profile page -> Requires Login
    if (tabId === 'user' && !isLoggedIn) {
      setActiveTabState('login');
      showToast('🔒 Vui lòng đăng nhập để xem thông tin hồ sơ của bạn!', 'info');
      return;
    }

    // 2. Guard admin pages -> Requires Admin role
    const adminOnlyTabs = ['admin', 'management', 'dashboard', 'staff_mgmt', 'schedule_mgmt'];
    if (adminOnlyTabs.includes(tabId) && (!isLoggedIn || userRole !== 'admin')) {
      setActiveTabState('login');
      showToast('⚠️ Vùng bảo mật! Chỉ Admin mới được truy cập Quản Lý & CSDL. Vui lòng đăng nhập tài khoản Admin.', 'info');
      return;
    }

    // 3. Guard staff pages -> Requires Staff role
    const staffOnlyTabs = ['staff_dashboard', 'staff_appointments', 'staff_medical', 'staff_billing', 'staff_reports'];
    if (staffOnlyTabs.includes(tabId) && (!isLoggedIn || userRole !== 'staff')) {
      setActiveTabState('login');
      showToast('⚠️ Vui lòng đăng nhập tài khoản Bác Sĩ / Nhân Viên Thú Y.', 'info');
      return;
    }

    setActiveTabState(tabId);
  };

  // Sync role & auth state
  useEffect(() => {
    localStorage.setItem('petcare_role', userRole);
    localStorage.setItem('petcare_logged_in', isLoggedIn ? 'true' : 'false');
  }, [userRole, isLoggedIn]);

  // Auth Functions
  const loginAsCustomer = async (profileData) => {
    setIsLoggedIn(true);
    setUserRole('customer');
    if (profileData) {
      setUser(prev => ({ ...prev, ...profileData }));
    }

    if (dbConnected && profileData) {
      try {
        await fetch(`${API_BASE}/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profileData.name || 'Khách Hàng',
            email: profileData.email || 'khachhang@gmail.com',
            phone: profileData.phone || '0988 777 888',
            address: profileData.address || '',
            role: 'customer',
            password: '123456'
          })
        });
      } catch (err) {}
    }

    showToast('👤 Đăng nhập thành công tài khoản Khách Hàng!');
  };

  const loginAsStaff = async () => {
    setIsLoggedIn(true);
    setUserRole('staff');
    setActiveTabState('staff_dashboard');

    if (dbConnected) {
      try {
        await fetch(`${API_BASE}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'bacsi', password: '123456', role: 'staff' })
        });
      } catch (err) {}
    }

    showToast('👨‍⚕️ Đăng nhập thành công với quyền Nhân Viên / Bác Sĩ Thú Y!');
  };

  const loginAsAdmin = async () => {
    setIsLoggedIn(true);
    setUserRole('admin');
    setActiveTabState('dashboard');

    if (dbConnected) {
      try {
        await fetch(`${API_BASE}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'admin', password: 'admin123', role: 'admin' })
        });
      } catch (err) {}
    }

    showToast('👑 Đăng nhập thành công với quyền Admin / Quản Trị Viên!');
  };

  const logoutRole = () => {
    setIsLoggedIn(false);
    setUserRole('customer');
    setActiveTabState('home');
    showToast('Đã đăng xuất tài khoản thành công', 'info');
  };

  // Sync with XAMPP MySQL Backend
  useEffect(() => {
    const syncWithBackend = async () => {
      try {
        const res = await fetch(`${API_BASE}/health`);
        const data = await res.json();
        if (data.connected) {
          setDbConnected(true);
          
          const petsRes = await fetch(`${API_BASE}/pets`);
          if (petsRes.ok) {
            const dbPets = await petsRes.json();
            if (dbPets.length > 0) setPets(dbPets);
          }

          const prodsRes = await fetch(`${API_BASE}/products`);
          if (prodsRes.ok) {
            const dbProds = await prodsRes.json();
            if (dbProds.length > 0) setProducts(dbProds);
          }

          const bookingsRes = await fetch(`${API_BASE}/bookings`);
          if (bookingsRes.ok) {
            const dbBookings = await bookingsRes.json();
            if (dbBookings.length > 0) setAllBookings(dbBookings);
          }

          const ordersRes = await fetch(`${API_BASE}/orders`);
          if (ordersRes.ok) {
            const dbOrders = await ordersRes.json();
            if (dbOrders.length > 0) setAllOrders(dbOrders);
          }
        } else {
          setDbConnected(false);
        }
      } catch (err) {
        setDbConnected(false);
      }
    };

    syncWithBackend();
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('petcare_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('petcare_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('petcare_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('petcare_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('petcare_bookings', JSON.stringify(allBookings));
  }, [allBookings]);

  useEffect(() => {
    localStorage.setItem('petcare_orders', JSON.stringify(allOrders));
  }, [allOrders]);

  // Cart Functions
  const addToCart = (item, type = 'product') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, type, quantity: 1 }];
    });
    showToast(`Đã thêm "${item.name}" vào giỏ hàng!`);
  };

  const updateCartQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const clearCart = () => setCart([]);

  // User Functions
  const updateUserProfile = (updatedProfile) => {
    setUser(prev => ({ ...prev, ...updatedProfile }));
    showToast('Đã cập nhật thông tin cá nhân & địa chỉ giao hàng!');
  };

  const addCustomerPet = (petData) => {
    const newPet = { ...petData, id: `mypet-${Date.now()}` };
    setUser(prev => ({ ...prev, myPets: [...prev.myPets, newPet] }));
    showToast(`Đã lưu chó/mèo "${petData.name}" vào danh sách thú cưng của bạn!`);
  };

  const deleteCustomerPet = (petId) => {
    setUser(prev => ({ ...prev, myPets: prev.myPets.filter(p => p.id !== petId) }));
    showToast('Đã xóa thú cưng khỏi tài khoản', 'info');
  };

  // Booking Service Function
  const createBooking = async (bookingData) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: user.name,
      phone: user.phone,
      status: 'Đã nhận',
      createdAt: new Date().toISOString().split('T')[0],
      ...bookingData
    };

    setAllBookings(prev => [newBooking, ...prev]);

    if (dbConnected) {
      try {
        await fetch(`${API_BASE}/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBooking)
        });
      } catch (err) {}
    }

    setUser(prev => ({
      ...prev,
      servicesHistory: [
        {
          id: newBooking.id,
          serviceType: bookingData.serviceCategory,
          detail: bookingData.serviceName,
          petName: bookingData.petName,
          date: bookingData.date,
          transport: bookingData.transportMode,
          status: 'Đã nhận'
        },
        ...prev.servicesHistory
      ]
    }));

    showToast(`Đặt lịch ${bookingData.serviceCategory} thành công! Mã đơn: ${newBooking.id}`);
  };

  // Place Order Function
  const placeOrder = async (orderInfo) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: orderInfo.name,
      phone: orderInfo.phone,
      address: orderInfo.address,
      items: cart,
      total: orderInfo.total,
      paymentMethod: orderInfo.paymentMethod,
      status: 'Đã nhận đơn',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAllOrders(prev => [newOrder, ...prev]);

    if (dbConnected) {
      try {
        await fetch(`${API_BASE}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder)
        });
      } catch (err) {}
    }

    setUser(prev => ({
      ...prev,
      ordersHistory: [
        {
          id: newOrder.id,
          date: newOrder.createdAt,
          total: newOrder.total,
          paymentMethod: newOrder.paymentMethod,
          status: newOrder.status,
          items: cart.map(c => c.name)
        },
        ...prev.ordersHistory
      ]
    }));

    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Đặt hàng thành công! Mã đơn hàng: ${newOrder.id}`);
  };

  // Admin CRUD Functions
  const addPetAdmin = async (pet) => {
    const newPet = { ...pet, id: `pet-${Date.now()}` };
    setPets(prev => [newPet, ...prev]);

    if (dbConnected) {
      try {
        await fetch(`${API_BASE}/pets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPet)
        });
      } catch (err) {}
    }

    showToast(`Admin: Đã thêm thú cưng "${pet.name}" vào CSDL!`);
  };

  const deletePetAdmin = async (id) => {
    setPets(prev => prev.filter(p => p.id !== id));

    if (dbConnected) {
      try {
        await fetch(`${API_BASE}/pets/${id}`, { method: 'DELETE' });
      } catch (err) {}
    }

    showToast('Admin: Đã xóa thú cưng khỏi CSDL', 'info');
  };

  const addProductAdmin = async (prod) => {
    const newProd = { ...prod, id: `prod-${Date.now()}`, rating: 5.0, sold: 0 };
    setProducts(prev => [newProd, ...prev]);

    if (dbConnected) {
      try {
        await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProd)
        });
      } catch (err) {}
    }

    showToast(`Admin: Đã thêm sản phẩm "${prod.name}" vào CSDL!`);
  };

  const updateBookingStatusAdmin = async (id, newStatus) => {
    setAllBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    
    // Status badge icons mapping
    let icon = '🔔';
    if (newStatus === 'Chờ xác nhận') icon = '🟡';
    else if (newStatus === 'Đã xác nhận') icon = '🔵';
    else if (newStatus === 'Đang thực hiện') icon = '🟠';
    else if (newStatus === 'Hoàn thành') icon = '🟢';
    else if (newStatus === 'Đã hủy') icon = '🔴';

    addNotification({
      title: `${icon} Lịch hẹn ${id} ${newStatus.toLowerCase()}`,
      message: `Trạng thái lịch hẹn ${id} đã được Bác sĩ/Nhân viên cập nhật sang: "${newStatus}".`,
      type: 'appointment'
    });

    if (dbConnected) {
      try {
        await fetch(`${API_BASE}/bookings/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
      } catch (err) {}
    }
    showToast(`Cập nhật trạng thái lịch hẹn ${id} -> ${newStatus}`);
  };

  const updateOrderStatusAdmin = async (id, newStatus) => {
    setAllOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    showToast(`Quản lý: Cập nhật đơn hàng ${id} -> ${newStatus}`);
  };

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      dbConnected,
      userRole, setUserRole, isAdmin, isStaff, isCustomer,
      isLoggedIn, setIsLoggedIn,
      loginAsAdmin, loginAsStaff, loginAsCustomer, logoutRole,
      currentProfile, STAFF_PROFILE, ADMIN_PROFILE,
      authMode, setAuthMode,
      pets, setPets,
      products, setProducts,
      user, setUser, updateUserProfile, addCustomerPet, deleteCustomerPet,
      cart, addToCart, updateCartQuantity, removeFromCart, clearCart,
      allBookings, setAllBookings, createBooking, updateBookingStatusAdmin,
      allOrders, placeOrder, updateOrderStatusAdmin,
      medicalRecords, createMedicalRecord,
      customerInvoices, createInvoice,
      notifications, addNotification, markAllNotificationsAsRead,
      petFilters, setPetFilters,
      isAuthModalOpen, setIsAuthModalOpen,
      isCartOpen, setIsCartOpen,
      isCheckoutOpen, setIsCheckoutOpen,
      selectedPetForDetail, setSelectedPetForDetail,
      selectedServiceForBooking, setSelectedServiceForBooking,
      staffList, setStaffList, updateStaffSchedule, updateStaffStatus, reassignBooking,
      addPetAdmin, deletePetAdmin, addProductAdmin,
      toast, showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
