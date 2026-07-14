export interface ProductVariant {
  id: string;
  name: string; // e.g., "Màu sắc", "Kích cỡ"
  options: string[]; // e.g., ["Đỏ", "Xanh", "Vàng"], ["S", "M", "L"]
}

export interface ProductVariantCombinations {
  id: string;
  options: string[]; // e.g., ["Đỏ", "M"]
  price: number;
  stock: number;
  sku: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  thumbnail: string;
  rating: number;
  soldCount: number;
  reviewCount: number;
  category: string;
  shop: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    responseTime: string;
    isMall: boolean;
  };
  variants?: ProductVariant[];
  variantCombinations?: ProductVariantCombinations[];
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedVariants: string[]; // ["Đỏ", "M"]
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  items: CartItem[];
  totalAmount: number;
  shippingFee: number;
  discountAmount: number;
  finalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  shop: {
    id: string;
    name: string;
  }
}

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Áo Thun Nam Cổ Tròn Basic Cotton Compact Siêu Mát Mẻ Thấm Hút Mồ Hôi Tốt',
    description: 'Áo thun nam dáng basic, dễ phối đồ. Chất liệu cotton compact 100% mềm mịn, thoáng mát.',
    price: 99000,
    originalPrice: 150000,
    discountPercent: 34,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    soldCount: 15400,
    reviewCount: 3200,
    category: 'Thời trang nam',
    shop: {
      id: 's1',
      name: 'CoolMate Official',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80',
      rating: 4.9,
      responseTime: '99%',
      isMall: true,
    },
    variants: [
      { id: 'v1', name: 'Màu sắc', options: ['Đen', 'Trắng', 'Xanh Navy'] },
      { id: 'v2', name: 'Size', options: ['M', 'L', 'XL'] }
    ],
    variantCombinations: [
      { id: 'vc1', options: ['Đen', 'M'], price: 99000, stock: 50, sku: 'CM-BLK-M' },
      { id: 'vc2', options: ['Đen', 'L'], price: 99000, stock: 45, sku: 'CM-BLK-L' },
      { id: 'vc3', options: ['Trắng', 'M'], price: 99000, stock: 30, sku: 'CM-WHT-M' }
    ],
    stock: 500,
  },
  {
    id: 'p2',
    name: 'Tai Nghe Bluetooth Không Dây Hổ Vằn Pro Hỗ Trợ Chống Ồn Chủ Động ANC',
    description: 'Tai nghe chất lượng cao, âm bass sâu, pin 5h liên tục.',
    price: 350000,
    originalPrice: 650000,
    discountPercent: 46,
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aecb4d27bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1606220588913-b3aecb4d27bf?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    soldCount: 8200,
    reviewCount: 1500,
    category: 'Điện tử',
    shop: {
      id: 's2',
      name: 'Phụ Kiện Số Giá Rẻ',
      avatar: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=150&q=80',
      rating: 4.7,
      responseTime: '95%',
      isMall: false,
    },
    stock: 120,
  },
  {
    id: 'p3',
    name: 'Giày Thể Thao Nam Nữ Sneaker Thời Trang Êm Chân Đế Cao 4cm Tôn Dáng',
    description: 'Giày đi chơi, đi học rất phù hợp. Đế cao su nguyên khối.',
    price: 185000,
    originalPrice: 350000,
    discountPercent: 47,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    soldCount: 12500,
    reviewCount: 4200,
    category: 'Giày dép',
    shop: {
      id: 's3',
      name: 'Shoe World',
      avatar: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80',
      rating: 4.6,
      responseTime: '90%',
      isMall: false,
    },
    variants: [
      { id: 'v1', name: 'Màu', options: ['Đỏ', 'Trắng'] },
      { id: 'v2', name: 'Size', options: ['38', '39', '40', '41', '42'] }
    ],
    stock: 350,
  },
  {
    id: 'p4',
    name: 'Sạc Dự Phòng 10000mAh Sạc Nhanh 22.5W Có Màn Hình Hiển Thị % Pin',
    description: 'Sạc dự phòng dung lượng thật, nhỏ gọn tiện lợi mang theo.',
    price: 215000,
    originalPrice: 400000,
    discountPercent: 46,
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    soldCount: 3400,
    reviewCount: 950,
    category: 'Điện thoại & Phụ kiện',
    shop: {
      id: 's4',
      name: 'Baseus Official Store',
      avatar: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&w=150&q=80',
      rating: 4.9,
      responseTime: '98%',
      isMall: true,
    },
    stock: 800,
  }
];

export const mockCategories = [
  { id: 'c1', name: 'Thời Trang Nam', icon: 'https://cdn-icons-png.flaticon.com/128/2916/2916315.png' },
  { id: 'c2', name: 'Điện Thoại', icon: 'https://cdn-icons-png.flaticon.com/128/0/191.png' },
  { id: 'c3', name: 'Thiết Bị Điện Tử', icon: 'https://cdn-icons-png.flaticon.com/128/3659/3659899.png' },
  { id: 'c4', name: 'Máy Tính & Laptop', icon: 'https://cdn-icons-png.flaticon.com/128/3067/3067258.png' },
  { id: 'c5', name: 'Máy Ảnh', icon: 'https://cdn-icons-png.flaticon.com/128/3004/3004613.png' },
  { id: 'c6', name: 'Đồng Hồ', icon: 'https://cdn-icons-png.flaticon.com/128/2928/2928865.png' },
  { id: 'c7', name: 'Giày Dép Nam', icon: 'https://cdn-icons-png.flaticon.com/128/3345/3345800.png' },
  { id: 'c8', name: 'Thiết Bị Gia Dụng', icon: 'https://cdn-icons-png.flaticon.com/128/3659/3659902.png' },
  { id: 'c9', name: 'Thể Thao', icon: 'https://cdn-icons-png.flaticon.com/128/2964/2964514.png' },
  { id: 'c10', name: 'Ô Tô & Xe Máy', icon: 'https://cdn-icons-png.flaticon.com/128/3204/3204061.png' },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-123456789',
    status: 'delivered',
    items: [
      {
        id: 'ci1',
        productId: 'p1',
        product: mockProducts[0],
        selectedVariants: ['Đen', 'M'],
        quantity: 2,
        price: 99000,
      }
    ],
    totalAmount: 198000,
    shippingFee: 25000,
    discountAmount: 15000,
    finalAmount: 208000,
    shippingAddress: '123 Đường Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội',
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
    createdAt: '2026-07-10T10:00:00Z',
    shop: {
      id: 's1',
      name: 'CoolMate Official'
    }
  }
];
