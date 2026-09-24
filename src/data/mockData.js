// Seed Data for PetCare Application

export const INITIAL_PETS = [
  {
    id: 'pet-01',
    name: 'Corgi Pembroke Chân Ngắn',
    species: 'Chó',
    breed: 'Corgi Pembroke',
    weight: '3.5 kg',
    weightCategory: '2-5kg',
    gender: 'Đực',
    color: 'Vàng Trắng',
    vaccination: '3 Mũi (Full + Dại)',
    origin: 'Thuần chủng VKA',
    age: '3 tháng',
    price: 14500000,
    image: 'https://images.unsplash.com/photo-1612536057832-2ff7ead7819c?auto=format&fit=crop&w=800&q=80',
    description: 'Bé Corgi đực mông trái tim siêu xinh, thần thái vui tươi, ăn uống rất khỏe, đã chích ngừa đầy đủ và kèm phả VKA.',
    status: 'Còn hàng'
  },
  {
    id: 'pet-02',
    name: 'Mèo Anh Lông Ngắn Silver Shaded',
    species: 'Mèo',
    breed: 'British Shorthair',
    weight: '2.1 kg',
    weightCategory: '2-5kg',
    gender: 'Cái',
    color: 'Trắng Silver (NS11)',
    vaccination: '2 Mũi',
    origin: 'Nhập Khẩu Thái Lan',
    age: '2.5 tháng',
    price: 12000000,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
    description: 'Mèo Aln màu Silver cực quý phái, mắt xanh ngọc bảo, cực quấn người và thích được nũng nịu.',
    status: 'Còn hàng'
  },
  {
    id: 'pet-03',
    name: 'Poodle Teacup Nâu Đỏ',
    species: 'Chó',
    breed: 'Poodle',
    weight: '1.4 kg',
    weightCategory: '<2kg',
    gender: 'Cái',
    color: 'Nâu Đỏ',
    vaccination: '2 Mũi',
    origin: 'Nhân Giống Tại Trại',
    age: '2 tháng',
    price: 8500000,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    description: 'Bé Poodle dòng Teacup siêu nhỏ gọn, lông xoăn tít không rụng lông, rất phù hợp nuôi căn hộ.',
    status: 'Còn hàng'
  },
  {
    id: 'pet-04',
    name: 'Mèo Ragdoll Mắt Xanh Dương',
    species: 'Mèo',
    breed: 'Ragdoll',
    weight: '4.2 kg',
    weightCategory: '2-5kg',
    gender: 'Đực',
    color: 'Trắng Tam Thể / Bi-color',
    vaccination: '3 Mũi (Full + Dại)',
    origin: 'Nhập Khẩu Châu Âu (WCF)',
    age: '4 tháng',
    price: 26000000,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    description: 'Hoàng tử Ragdoll mắt biển xanh thăm thẫm, bộ lông mượt như lụa, phả hệ WCF quốc tế cực đẹp.',
    status: 'Còn hàng'
  },
  {
    id: 'pet-05',
    name: 'Golden Retriever Thuần Chủng',
    species: 'Chó',
    breed: 'Golden Retriever',
    weight: '6.8 kg',
    weightCategory: '5-10kg',
    gender: 'Đực',
    color: 'Vàng Kim',
    vaccination: '2 Mũi',
    origin: 'Thuần chủng VKA',
    age: '3.5 tháng',
    price: 11500000,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    description: 'Bé Golden đực cực thông minh, khung xương to chuẩn đét, hiền lành và yêu trẻ em.',
    status: 'Còn hàng'
  },
  {
    id: 'pet-06',
    name: 'Mèo Phấn Mỹ American Shorthair',
    species: 'Mèo',
    breed: 'American Shorthair',
    weight: '3.0 kg',
    weightCategory: '2-5kg',
    gender: 'Cái',
    color: 'Xám Mèo Vân Hổ',
    vaccination: '1 Mũi',
    origin: 'Nhân Giống Tại Trại',
    age: '2 tháng',
    price: 7800000,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80',
    description: 'Bé mèo Mỹ lông ngắn sọc vân hổ cực cá tính, nhanh nhẹn, bắt chuột giỏi và ngoan ngoãn.',
    status: 'Còn hàng'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-01',
    name: 'Thức Ăn Hạt Royal Canin Mini Adult (2kg)',
    category: 'Thức Ăn',
    price: 340000,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    sold: 420,
    description: 'Hạt cao cấp dành riêng cho chó cỡ nhỏ, giàu dinh dưỡng, bảo vệ tim mạch và nâng cao chất lượng lông.'
  },
  {
    id: 'prod-02',
    name: 'Pate Cấp Nước Chăm Sóc Thận Mèo Ciao Churu (Túi 10 thanh)',
    category: 'Thức Ăn',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    sold: 1250,
    description: 'Thưởng số 1 cho mèo từ Nhật Bản, bổ sung hàm lượng nước giúp hỗ trợ tiết niệu và ngừa sỏi thận.'
  },
  {
    id: 'prod-03',
    name: 'Sữa Tắm Dưỡng Lông Trị Ve Rể SOS (500ml)',
    category: 'Đồ Dùng',
    price: 165000,
    image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    sold: 890,
    description: 'Sữa tắm chuyên dụng khử mùi hôi, làm mềm lông, phòng chống ve rận hiệu quả đến 14 ngày.'
  },
  {
    id: 'prod-04',
    name: 'Khay Vệ Sinh Mèo Tự Động Thông Minh PetKit',
    category: 'Đồ Dùng',
    price: 4900000,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    sold: 156,
    description: 'Máy dọn vệ sinh tự động kèm cảm biến an toàn, khử mùi ozone, điều khiển qua app di động.'
  },
  {
    id: 'prod-05',
    name: 'Cát Mèo Đậu Nành Cát Hữu Cơ Tofu Cat Litter 6L',
    category: 'Đồ Dùng',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    sold: 3100,
    description: 'Cát đậu nành vón cục tức thì, không bụi 99.9%, an toàn khi mèo lỡ nuốt, xả trực tiếp bồn cầu.'
  },
  {
    id: 'prod-06',
    name: 'Chuồng Sơn Tĩnh Điện Cao Cấp Kèm Khay Hứng (Cỡ L)',
    category: 'Đồ Dùng',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    sold: 320,
    description: 'Chuồng chó mèo khung thép chắc chắn, sơn tĩnh điện chống rỉ, thiết kế xếp gọn tiện mang đi xa.'
  }
];

export const SERVICES_CATALOG = {
  spa: {
    title: 'Dịch Vụ Spa & Chăm Sóc Lông Tóc',
    icon: 'Sparkles',
    items: [
      { name: 'Cắt, tỉa tạo kiểu lông nghệ thuật', duration: '60 phút', price: '250.000đ - 450.000đ' },
      { name: 'Nhuộm lông thời trang an toàn', duration: '90 phút', price: '300.000đ - 600.000đ' },
      { name: 'Vệ sinh răng miệng & lấy cao răng nhẹ', duration: '30 phút', price: '150.000đ' },
      { name: 'Vệ sinh tai & nhổ lông tai chuyên sâu', duration: '20 phút', price: '100.000đ' },
      { name: 'Cắt & dũa móng mượt không sước', duration: '20 phút', price: '80.000đ' },
      { name: 'Gỡ rối lông & tắm sấy xả siêu mượt', duration: '45 phút', price: '200.000đ' },
      { name: 'Tắm dưỡng sinh & sấy hấp dầu lông', duration: '60 phút', price: '300.000đ' }
    ]
  },
  healthcare: {
    title: 'Dịch Vụ Y Tế & Khám Chữa Bệnh Thú Y',
    icon: 'Stethoscope',
    emergencyHotlines: ['1900 888 999', '0988 777 666'],
    items: [
      { name: 'Khám sức khỏe định kỳ & Tư vấn dinh dưỡng', price: '150.000đ' },
      { name: 'Tiêm phòng Vắc-xin 5/7 bệnh chó mèo', price: '220.000đ/mũi' },
      { name: 'Phòng chống ve, rận, giun sán tận gốc', price: '120.000đ' },
      { name: 'Điều trị bệnh nội khoa, tiêu hóa, da liễu', price: 'Tùy tình trạng' },
      { name: 'Phẫu thuật triệt sản, mổ đẻ, phẫu thuật chỉnh hình', price: 'Từ 800.000đ' },
      { name: 'Xét nghiệm siêu âm, X-quang, chẩn đoán hình ảnh', price: 'Từ 250.000đ' },
      { name: 'Dịch vụ hộ sinh chó mèo chuyên nghiệp', price: 'Tư vấn hotline' },
      { name: 'Tái khám & Theo dõi sức khỏe định kỳ', price: 'Miễn phí tái khám' }
    ],
    transportModes: ['Vận chuyển tại nhà (Xe đưa đón)', 'Trực tiếp đưa đến cửa hàng']
  },
  boarding: {
    title: 'Dịch Vụ Khách Sạn & Lưu Trú Thú Cưng',
    icon: 'Hotel',
    items: [
      { name: 'Phòng Lưu Chuồng Standard (Đủ máy lạnh, camera 24/7)', price: '150.000đ/ngày' },
      { name: 'Phòng VIP Penthouse (View sân chơi, bữa ăn riêng)', price: '300.000đ/ngày' },
      { name: 'Dịch vụ Vận chuyển thú cưng trong nước (Toàn quốc)', price: 'Liên hệ báo giá' },
      { name: 'Dịch vụ Xuất nhập cảnh (Passport, Visa, Kiểm dịch)', price: 'Tư vấn hồ sơ trọn gói' }
    ],
    transportModes: ['Vận chuyển đưa đón tận nhà', 'Trực tiếp mang tới cửa hàng']
  }
};

export const REVIEWS = [
  {
    id: 1,
    name: 'Nguyễn Thị Hồng Hạnh',
    petName: 'Bé Mèo Bún (Aln)',
    rating: 5,
    comment: 'Bác sĩ và các bạn nhân viên ở PetCare siêu có tâm luôn! Lần trước bé nhà mình bị sốt đêm gọi hotline 1900 888 999 là bác sĩ qua hỗ trợ vận chuyển cấp cứu ngay. Rất cảm ơn trung tâm!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Trần Anh Khoa',
    petName: 'Chó Corgi Bơ',
    rating: 5,
    comment: 'Dịch vụ Spa cắt tỉa lông đẹp xuất sắc. Bé Bơ nhà mình đi Spa về vừa thơm tho vừa được tỉa mông trái tim cưng muốn xỉu. Giá lại rất phải dẻ!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Lê Minh Phương',
    petName: 'Bé Poodle Kem',
    rating: 5,
    comment: 'Khách sạn gửi chó mèo rất sạch sẽ, có camera xem bé chơi liên tục. Nhân viên chụp ảnh báo cáo bữa ăn hàng ngày nên gia đình đi du lịch cực kỳ yên tâm.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];

export const DOCTORS = [
  {
    name: 'ThS. BS. Nguyễn Văn Minh',
    role: 'Bác sĩ Trưởng Khoa Cấp Cứu & Phẫu Thuật',
    exp: '12 năm kinh nghiệm thú y',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    cert: 'Chuyên gia Chẩn đoán Hình ảnh & Phẫu thuật Ngoại khoa'
  },
  {
    name: 'BS. Lê Thiện Nhân',
    role: 'Bác sĩ Nội Khoa & Tiêm Chủng',
    exp: '8 năm kinh nghiệm',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    cert: 'Chứng chỉ Dinh dưỡng & Đợi sống Thú cưng Châu Âu'
  },
  {
    name: 'Trần Mỹ Duyên',
    role: 'Chuyên Gia Stylist Spa & Grooming',
    exp: '6 năm kinh nghiệm',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    cert: 'Giải Nhất Master Grooming Contest 2023'
  }
];

export const BLOG_ARTICLES = [
  {
    id: 1,
    title: 'Cẩm Nang Tiêm Phòng Cho Chó Mèo: Lịch Tiêm & Những Lưu Ý Sống Còn',
    category: 'Cẩm Nang Thú Y',
    date: '20/09/2026',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=600&q=80',
    summary: 'Tổng hợp chi tiết lịch tiêm vắc-xin 5 bệnh, 7 bệnh ở chó và vắc-xin 4 bệnh ở mèo. Cách chăm sóc bé sau tiêm ngừa.'
  },
  {
    id: 2,
    title: 'Bí Quyết Chăm Sóc Bộ Lông Chó Poodle Và Corgi Luôn Mượt Ma, Không Rối',
    category: 'Chăm Sóc & Spa',
    date: '18/09/2026',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
    summary: 'Hướng dẫn lựa chọn dòng sữa tắm dưỡng ẩm, lược chải lông chuyên dụng và cách chải gỡ rối hàng ngày tại nhà.'
  },
  {
    id: 3,
    title: 'Thủ Tục Xuất Nhập Cảnh Thú Cưng Đi Nước Ngoài Chuẩn Quốc Tế',
    category: 'Xuất Nhập Cảnh',
    date: '15/09/2026',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80',
    summary: 'Các bước làm Passport thú cưng, xét nghiệm huyết thanh kháng thể dại Rabies Titre Test để mang chó mèo lên máy bay.'
  }
];

export const STORE_HISTORY = [
  { year: '2018', event: 'Thành lập phòng khám PetCare đầu tiên tại TP.HCM với 3 bác sĩ trẻ tâm huyết.' },
  { year: '2020', event: 'Mở rộng trung tâm Spa Grooming & Khách sạn thú cưng tiêu chuẩn 5 sao.' },
  { year: '2023', event: 'Đạt mốc chăm sóc hơn 50.000 lượt chó mèo và cung cấp dịch vụ Cấp cứu 24/7 toàn thành phố.' },
  { year: '2026', event: 'Nâng cấp hệ thống quản trị dữ liệu khách hàng & Dịch vụ Vận chuyển xuất nhập cảnh thú cưng.' }
];

export const INITIAL_USER = {
  name: 'Đặng Ngọc Nhuy',
  email: 'nhuy.petcare@gmail.com',
  phone: '0988 777 888',
  address: '123 Đường Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. Hồ Chí Minh',
  myPets: [
    {
      id: 'mypet-1',
      name: 'Mochi',
      species: 'Chó',
      breed: 'Poodle',
      age: '2 tuổi',
      weight: '3.2 kg',
      gender: 'Cái',
      notes: 'Dị ứng hạt gà, thích ăn pate cá hồi.'
    }
  ],
  ordersHistory: [
    {
      id: 'ORD-88291',
      date: '22/09/2026',
      total: 450000,
      paymentMethod: 'QR Code (MBBank)',
      status: 'Đã hoàn thành',
      items: ['Thức Ăn Hạt Royal Canin Mini Adult (2kg)']
    }
  ],
  servicesHistory: [
    {
      id: 'SER-1092',
      serviceType: 'Spa & Grooming',
      detail: 'Tắm dưỡng sinh + Cắt tỉa lông mông trái tim',
      petName: 'Mochi',
      date: '15/09/2026',
      transport: 'Trực tiếp đưa đến cửa hàng',
      status: 'Hoàn thành'
    }
  ],
  boardingHistory: [
    {
      id: 'BRD-4012',
      roomType: 'Phòng VIP Penthouse',
      petName: 'Mochi',
      days: 3,
      startDate: '01/09/2026',
      endDate: '04/09/2026',
      transport: 'Vận chuyển đưa đón tận nhà',
      status: 'Hoàn thành'
    }
  ]
};
