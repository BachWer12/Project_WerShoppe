import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Bell, ChevronRight, Zap, ArrowRight, ShieldCheck, Truck, HeadphonesIcon, TrendingUp, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthModal from '../components/AuthModal';
import { mockProducts as fallbackProducts, mockCategories as fallbackCategories } from '../mock/data';
import api from '../lib/api';
import { useCartStore } from '../store';
import { useAuth } from '../context/AuthContext';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function Storefront() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());
  const { user, upgradeToSeller } = useAuth();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 2000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [shopName, setShopName] = useState("");
  const [upgradeError, setUpgradeError] = useState("");

  const fetchData = async (pageNum: number, catId: number | null, reset = false) => {
    try {
      const url = catId !== null ? `/products/public?page=${pageNum}&size=20&categoryId=${catId}` : `/products/public?page=${pageNum}&size=20`;
      const prodRes = await api.get(url);
      
      const newProducts = prodRes.data.data.content || prodRes.data.data;
      if (Array.isArray(newProducts)) {
        if (reset) {
          setProducts(newProducts);
        } else {
          setProducts(prev => [...prev, ...newProducts]);
        }
        setHasMore(!prodRes.data.data.last);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      if (reset) setProducts(fallbackProducts);
      setHasMore(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catRes = await api.get('/categories');
        setCategories(catRes.data.data);
      } catch (err) {
        setCategories(fallbackCategories);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchData(page, selectedCategoryId, page === 0);
  }, [page, selectedCategoryId]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      navigate('/buyer/cart');
    }
  };

  const handleSellerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    if (user?.role === 'ROLE_BUYER') {
      setIsUpgradeModalOpen(true);
    } else {
      navigate('/seller');
    }
  };

  const submitUpgrade = async () => {
    try {
      setUpgradeError("");
      await upgradeToSeller(shopName);
      alert("Đăng ký người bán thành công! Vui lòng đăng nhập lại để vào trang quản lý.");
      setIsUpgradeModalOpen(false);
      window.location.href = '/';
    } catch (err: any) {
      setUpgradeError(err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans selection:bg-[#ee4d2d] selection:text-white pb-20">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4">Đăng Ký Trở Thành Người Bán</h2>
            {upgradeError && <div className="bg-red-50 text-red-600 p-2 text-sm rounded mb-4">{upgradeError}</div>}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tên Shop của bạn</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded outline-none focus:border-[#ee4d2d]" 
                placeholder="Nhập tên shop..."
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsUpgradeModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Hủy</button>
              <button onClick={submitUpgrade} className="px-4 py-2 bg-[#ee4d2d] text-white rounded hover:bg-[#d73211]">Đăng Ký Ngay</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header (Shopee style small header) */}
      <div className="bg-[#f53d2d] text-white text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <a href="#" onClick={handleSellerClick} className="hover:text-white/80 transition">Kênh Người Bán</a>
            <a href="#" className="hover:text-white/80 transition border-l border-white/30 pl-4">Trở thành Người bán Shopee</a>
            <a href="#" className="hover:text-white/80 transition border-l border-white/30 pl-4">Tải ứng dụng</a>
            <span className="border-l border-white/30 pl-4">Kết nối</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#" className="flex items-center gap-1 hover:text-white/80 transition"><Bell size={14} /> Thông báo</a>
            <a href="#" className="flex items-center gap-1 hover:text-white/80 transition border-l border-white/30 pl-4">Hỗ trợ</a>
            <a href="#" className="hover:text-white/80 transition border-l border-white/30 pl-4">Tiếng Việt</a>
            {!isLoggedIn ? (
              <>
                <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-white/80 transition border-l border-white/30 pl-4 font-bold">Đăng Ký</button>
                <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-white/80 transition border-l border-white/30 pl-4 font-bold">Đăng Nhập</button>
              </>
            ) : (
              <button onClick={() => navigate('/buyer/profile')} className="flex items-center gap-2 hover:text-white/80 transition border-l border-white/30 pl-4">
                <User size={14} />
                <span className="font-bold">Tài khoản của tôi</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-gradient-to-b from-[#f53d2d] to-[#ff6633] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/')}>
              <div className="text-white">
                <svg viewBox="0 0 100 100" className="w-12 h-12 fill-current">
                  <path d="M50 0C22.4 0 0 22.4 0 50c0 27.6 22.4 50 50 50 27.6 0 50-22.4 50-50C100 22.4 77.6 0 50 0zm0 85c-19.3 0-35-15.7-35-35S30.7 15 50 15s35 15.7 35 35-15.7 35-35 35z"/>
                  <path d="M40 70h20v-5H40v5zM50 30c-5.5 0-10 4.5-10 10v15h20V40c0-5.5-4.5-10-10-10z"/>
                </svg>
              </div>
              <span className="text-3xl font-bold text-white tracking-tight hidden md:block">
                Shopee
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-4xl relative">
              <div className="flex bg-white rounded-sm overflow-hidden p-1 shadow-inner">
                <input 
                  type="text" 
                  placeholder="Shopee bao ship 0Đ - Đăng ký ngay!" 
                  className="w-full px-4 py-2 text-sm outline-none text-slate-700 placeholder:text-slate-500"
                />
                <button className="bg-[#ee4d2d] hover:bg-[#d73211] text-white px-6 py-2 rounded-sm transition-colors flex items-center justify-center">
                  <Search size={18} />
                </button>
              </div>
              {/* Popular Searches */}
              <div className="hidden md:flex gap-3 text-white/90 text-xs mt-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                {['Áo Kiểu Nữ', 'Quần Bò Ống Rộng', 'Ốp Lưng Đẹp', 'Đồ Ngủ Ở Nhà', 'Áo Khoác', 'Dép Nữ', 'Túi Xách Nữ'].map(tag => (
                  <a key={tag} href="#" className="hover:text-white transition">{tag}</a>
                ))}
              </div>
            </div>

            {/* Cart Icon */}
            <div className="shrink-0 flex items-center justify-end w-20">
              <button 
                onClick={() => navigate('/buyer/cart')}
                className="relative p-2 text-white hover:text-white/80 transition-colors group"
              >
                <ShoppingCart className="w-8 h-8" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-white text-[#ee4d2d] text-[11px] font-bold px-1.5 min-w-[20px] h-5 rounded-full flex items-center justify-center border-2 border-[#ff6633]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row gap-2.5 mb-6 items-stretch">
          {/* Main Banner Carousel */}
          <div className="w-full md:w-[67%] bg-white rounded-lg shadow-sm overflow-hidden relative group">
            <div className="overflow-hidden w-full h-full" ref={emblaRef}>
              <div className="flex w-full h-full items-center">
                {['/Banner/Banner1/image.png', '/Banner/Banner1/image copy.png', '/Banner/Banner1/image copy 2.png'].map((src, idx) => (
                  <div className="relative flex-[0_0_100%] min-w-0 h-full" key={idx}>
                    <img src={src} alt={`Banner ${idx + 1}`} className="w-full h-full object-fill block" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <button onClick={() => emblaApi?.scrollPrev()} className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md text-slate-800 flex items-center justify-center hover:bg-white hover:scale-110 pointer-events-auto shadow-lg transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <ChevronRight className="rotate-180" size={20}/>
              </button>
              <button onClick={() => emblaApi?.scrollNext()} className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md text-slate-800 flex items-center justify-center hover:bg-white hover:scale-110 pointer-events-auto shadow-lg transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <ChevronRight size={20}/>
              </button>
            </div>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 shadow-sm ${idx === selectedIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </div>

          {/* Side Banners */}
          <div className="w-full md:w-[33%] flex flex-col gap-2.5">
            <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer relative">
               <img src="/Banner/Side Banner1/image.png" alt="Side Banner 1" className="w-full h-full object-fill block transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer relative">
               <img src="/Banner/Side Banner2/image.png" alt="Side Banner 2" className="w-full h-full object-fill block transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          </div>
        </div>

        {/* Quick Links Menu (Round icons) */}
        <div className="bg-white p-4 rounded-sm shadow-sm mb-6 flex items-center justify-between overflow-x-auto hide-scrollbar gap-4">
          {[
            { icon: "https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi", label: "Khung Giờ Săn Sale" },
            { icon: "https://cf.shopee.vn/file/vn-50009109-c7a2e1ae72c0d6810dce021f1d7d08f3_xhdpi", label: "Miễn Phí Ship - Có Shopee" },
            { icon: "https://cf.shopee.vn/file/vn-50009109-8a387d78a7af954208e5ea8a7102ee81_xhdpi", label: "Voucher Giảm Đến 500.000Đ" },
            { icon: "https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi", label: "Hàng Hiệu Giá Tốt" },
            { icon: "https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi", label: "Shopee Siêu Rẻ" },
            { icon: "https://cf.shopee.vn/file/c7a2e1ae72c0d6810dce021f1d7d08f3_xhdpi", label: "Hàng Quốc Tế" },
            { icon: "https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi", label: "Nạp Thẻ, Dịch Vụ & Data" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 min-w-[80px] group cursor-pointer hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:shadow-md transition-shadow">
                <img src={item.icon} alt={item.label} className="w-10 h-10 object-contain" />
              </div>
              <span className="text-[11px] text-center text-slate-700 leading-tight group-hover:text-[#ee4d2d] transition-colors">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-sm shadow-sm mb-6">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-gray-500 font-medium uppercase text-sm">Danh Mục</h2>
            {selectedCategoryId !== null && (
              <button onClick={() => { setSelectedCategoryId(null); setPage(0); }} className="text-[#ee4d2d] text-xs font-bold">Bỏ Lọc</button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10">
            {categories.slice(0, 10).map((category) => (
              <div 
                key={category.id} 
                onClick={() => { setSelectedCategoryId(category.id); setPage(0); }}
                className={`border-r border-b border-gray-100 p-4 flex flex-col items-center gap-3 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:z-10 transition-all ${selectedCategoryId === category.id ? 'bg-orange-50' : 'bg-white'}`}
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                  <img src={category.imageUrl || category.icon || "https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn"} alt={category.name} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-xs text-center text-slate-700 line-clamp-1">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sale Section */}
        <div className="bg-white rounded-sm shadow-sm mb-6 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Flame className="text-[#ee4d2d] fill-[#ee4d2d]" size={24} />
                <h2 className="text-[#ee4d2d] font-bold text-xl uppercase italic">Flash Sale</h2>
              </div>
              <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                <span className="bg-slate-800 px-2 py-1 rounded-sm">02</span>
                <span className="text-slate-800">:</span>
                <span className="bg-slate-800 px-2 py-1 rounded-sm">45</span>
                <span className="text-slate-800">:</span>
                <span className="bg-slate-800 px-2 py-1 rounded-sm">12</span>
              </div>
            </div>
            <button className="text-[#ee4d2d] text-sm flex items-center hover:opacity-80">Xem Tất Cả <ChevronRight size={16} /></button>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar p-4 gap-4">
            {products.slice(0, 4).map(product => {
              let img = product.thumbnail || product.image || "https://via.placeholder.com/180";
              if (product.images && typeof product.images === 'string') {
                try {
                  const parsed = JSON.parse(product.images);
                  if (parsed && parsed.length > 0) img = parsed[0];
                } catch (e) {}
              }
              const salePrice = product.salePrice || product.price;
              const discount = product.price > salePrice ? Math.round((product.price - salePrice) / product.price * 100) : product.discountPercent || 0;
              return (
              <div key={product.id} className="min-w-[180px] w-[180px] cursor-pointer group" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="relative aspect-square mb-3">
                  <img src={img} alt={product.name} className="w-full h-full object-cover rounded-sm group-hover:opacity-90" />
                  {discount > 0 && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-[#ee4d2d] font-bold text-[10px] px-1 py-0.5 flex flex-col items-center">
                    <span>{discount}%</span>
                    <span className="text-white bg-[#ee4d2d] px-1 -mx-1 text-[9px] uppercase">Giảm</span>
                  </div>
                  )}
                </div>
                <div className="text-[#ee4d2d] text-lg font-bold text-center mb-1">
                  ₫{salePrice.toLocaleString('vi-VN')}
                </div>
                <div className="w-full bg-red-200 rounded-full h-3.5 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-red-500 to-[#ee4d2d] w-[75%]"></div>
                  <span className="text-white text-[10px] font-bold relative z-10 drop-shadow-md">ĐÃ BÁN {Math.floor((product.soldCount || 10) * 0.75)}</span>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Daily Discover (Gợi ý hôm nay) */}
        <div className="sticky top-20 z-30 bg-white border-b-4 border-[#ee4d2d] mb-4">
          <div className="flex">
            <div className="flex-1 py-4 text-center cursor-pointer text-[#ee4d2d] font-bold uppercase">
              Gợi Ý Hôm Nay
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-10">
          {products.map((product) => {
              let img = product.thumbnail || product.image || "https://via.placeholder.com/180";
              if (product.images && typeof product.images === 'string') {
                try {
                  const parsed = JSON.parse(product.images);
                  if (parsed && parsed.length > 0) img = parsed[0];
                } catch (e) {}
              }
              const salePrice = product.salePrice || product.price;
              const discount = product.price > salePrice ? Math.round((product.price - salePrice) / product.price * 100) : product.discountPercent || 0;
            return (
            <div 
              key={product.id} 
              className="bg-white rounded-sm border border-transparent hover:border-[#ee4d2d] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all cursor-pointer relative group flex flex-col h-full"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative w-full aspect-square">
                <img src={img} alt={product.name} className="w-full h-full object-cover" />
                {product.shop?.isMall && (
                  <div className="absolute top-1 left-[-4px] z-10">
                    <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/label_mall_120_64.png" className="h-4" alt="Mall" />
                  </div>
                )}
                {discount > 0 && (
                <div className="absolute top-0 right-0 bg-yellow-400/90 text-[#ee4d2d] font-bold text-[11px] px-1.5 py-1 flex flex-col items-center">
                  <span>{discount}%</span>
                  <span className="text-white bg-[#ee4d2d] px-1.5 -mx-1.5 text-[9px] uppercase mt-0.5 font-semibold">Giảm</span>
                </div>
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                </div>
              </div>
              <div className="p-2.5 flex flex-col flex-1">
                <h3 className="text-sm text-slate-800 line-clamp-2 leading-tight min-h-[36px] mb-1">{product.name}</h3>
                <div className="flex gap-1 mb-2 mt-auto">
                  <span className="text-[10px] text-[#ee4d2d] border border-[#ee4d2d] px-1 rounded-sm bg-red-50">Voucher 15k</span>
                  <span className="text-[10px] text-[#ee4d2d] border border-[#ee4d2d] px-1 rounded-sm bg-red-50">Freeship</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-[#ee4d2d] font-semibold text-base flex items-baseline">
                    <span className="text-xs mr-0.5">₫</span>
                    {salePrice.toLocaleString('vi-VN')}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Đã bán {(product.soldCount || 10) > 1000 ? `${((product.soldCount || 10)/1000).toFixed(1)}k` : (product.soldCount || 10)}
                  </div>
                </div>
              </div>
              <div className="absolute top-[100%] left-[-1px] right-[-1px] bg-[#ee4d2d] text-white text-center py-1.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none rounded-b-sm border-x border-b border-[#ee4d2d]">
                Tìm sản phẩm tương tự
              </div>
            </div>
          )})}
        </div>

        {hasMore && (
        <div className="flex justify-center mb-10">
          <button onClick={() => setPage(p => p + 1)} className="bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 px-16 py-3 rounded-sm font-medium transition-colors shadow-sm w-full sm:w-auto">
            Xem Thêm
          </button>
        </div>
        )}

      </div>

      {/* Shopee Footer Info Blocks */}
      <div className="bg-white border-t-4 border-[#ee4d2d] py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase">Chăm sóc khách hàng</h3>
            <ul className="text-xs text-gray-500 space-y-3">
              <li><a href="#" className="hover:text-[#ee4d2d]">Trung Tâm Trợ Giúp</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Shopee Blog</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Shopee Mall</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Hướng Dẫn Mua Hàng</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Hướng Dẫn Bán Hàng</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Thanh Toán</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Shopee Xu</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Vận Chuyển</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Trả Hàng & Hoàn Tiền</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase">Về Shopee</h3>
            <ul className="text-xs text-gray-500 space-y-3">
              <li><a href="#" className="hover:text-[#ee4d2d]">Giới Thiệu Về Shopee Việt Nam</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Tuyển Dụng</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Điều Khoản Shopee</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Chính Sách Bảo Mật</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Chính Hãng</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Kênh Người Bán</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Flash Sales</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d]">Chương Trình Tiếp Thị Liên Kết Shopee</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase">Thanh toán</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center p-1"><img src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8" alt="Visa" className="h-full object-contain" /></div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center p-1"><img src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16" alt="Mastercard" className="h-full object-contain" /></div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center p-1"><img src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08" alt="JCB" className="h-full object-contain" /></div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center p-1"><img src="https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492" alt="ShopeePay" className="h-full object-contain" /></div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center p-1"><img src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281" alt="SPayLater" className="h-full object-contain" /></div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center p-1"><img src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637fd23e1aded062be5" alt="COD" className="h-full object-contain" /></div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase">Theo dõi chúng tôi trên</h3>
            <ul className="text-xs text-gray-500 space-y-3">
              <li><a href="#" className="hover:text-[#ee4d2d] flex items-center gap-2"><div className="w-4 h-4 bg-gray-600 rounded-full"></div> Facebook</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] flex items-center gap-2"><div className="w-4 h-4 bg-gray-600 rounded-full"></div> Instagram</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] flex items-center gap-2"><div className="w-4 h-4 bg-gray-600 rounded-full"></div> LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase">Tải ứng dụng Shopee ngay thôi</h3>
            <div className="flex gap-2">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-sm p-1">
                <img src="https://down-vn.img.susercontent.com/file/a5e589445f64e48a32040654117b1bf4" alt="QR Code" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <div className="h-6 w-16 bg-white border border-gray-200 rounded-sm p-1"><img src="https://down-vn.img.susercontent.com/file/ad01a89053750f0037a4c7e4ffc20251" alt="App Store" className="w-full h-full object-contain" /></div>
                <div className="h-6 w-16 bg-white border border-gray-200 rounded-sm p-1"><img src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def" alt="Google Play" className="w-full h-full object-contain" /></div>
                <div className="h-6 w-16 bg-white border border-gray-200 rounded-sm p-1"><img src="https://down-vn.img.susercontent.com/file/35352374f39facfc25cc80fa49c334fa" alt="AppGallery" className="w-full h-full object-contain" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-[11px] gap-4 text-center md:text-left">
          <div>© 2024 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div>Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil | México | Colombia | Chile | Đài Loan</div>
        </div>
      </div>
    </div>
  );
}
