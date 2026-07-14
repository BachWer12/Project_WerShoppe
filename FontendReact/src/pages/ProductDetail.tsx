import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useCartStore } from '../store';
import { ChevronRight, Store, Star, ArrowLeft, Loader2, Minus, Plus, ShoppingCart } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/public/${id}`);
        const p = res.data.data;
        setProduct(p);
        
        let imgs = ["https://down-vn.img.susercontent.com/file/sg-11134201-7rd5p-m1tz622pxtunec"]; // fallback
        if (p.images) {
          try {
            const parsed = JSON.parse(p.images);
            if (Array.isArray(parsed) && parsed.length > 0) imgs = parsed;
          } catch (e) {}
        }
        setImages(imgs);
        setSelectedImage(imgs[0]);

      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center"><Loader2 className="animate-spin text-[#ee4d2d]" size={40} /></div>;
  if (!product) return <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center text-xl">Không tìm thấy sản phẩm</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: selectedImage
    });
    alert("Sản phẩm đã được thêm vào giỏ hàng");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-20 font-sans selection:bg-[#ee4d2d] selection:text-white">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#ee4d2d] p-2 hover:bg-orange-50 rounded-full transition"><ArrowLeft size={24} /></button>
          <div className="font-medium text-lg text-gray-800 line-clamp-1 flex-1">{product.name}</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="hover:text-[#ee4d2d] cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <ChevronRight size={14} />
          <span className="hover:text-[#ee4d2d] cursor-pointer">{product.category?.name}</span>
          <ChevronRight size={14} />
          <span className="line-clamp-1">{product.name}</span>
        </div>

        <div className="bg-white rounded-sm shadow-sm flex flex-col md:flex-row p-4 gap-8">
          {/* Images Section */}
          <div className="w-full md:w-[450px] shrink-0">
            <div className="w-full aspect-square border border-gray-100 rounded-sm mb-4 bg-gray-50 flex items-center justify-center overflow-hidden">
              <img src={selectedImage} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onMouseEnter={() => setSelectedImage(img)}
                  className={`w-[82px] h-[82px] shrink-0 border-2 rounded-sm overflow-hidden transition-all ${selectedImage === img ? 'border-[#ee4d2d]' : 'border-transparent hover:border-[#ee4d2d]/50'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <h1 className="text-xl font-medium text-gray-800 mb-3 leading-7">{product.name}</h1>
            
            <div className="flex items-center gap-6 mb-4 text-sm">
              <div className="flex items-center text-[#ee4d2d] border-b border-[#ee4d2d] pb-0.5">
                <span className="mr-1">5.0</span>
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <div className="border-l h-4 border-gray-300"></div>
              <div><span className="font-semibold text-gray-800 border-b border-gray-800 pb-0.5">1.2k</span> <span className="text-gray-500">Đánh giá</span></div>
              <div className="border-l h-4 border-gray-300"></div>
              <div><span className="font-semibold text-gray-800">4.5k</span> <span className="text-gray-500">Đã bán</span></div>
            </div>

            <div className="bg-gray-50 px-5 py-4 rounded-sm flex items-center gap-3 mb-6">
              <span className="text-3xl font-medium text-[#ee4d2d]">₫{product.price.toLocaleString()}</span>
              {product.salePrice && <span className="text-sm text-gray-400 line-through">₫{product.salePrice.toLocaleString()}</span>}
            </div>

            <div className="flex items-center gap-6 mb-6">
              <span className="text-gray-500 w-24">Vận chuyển</span>
              <div className="text-sm text-gray-700">Miễn phí vận chuyển</div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-gray-500 w-24">Số lượng</span>
              <div className="flex items-center border border-gray-300 rounded-sm bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition border-r border-gray-300">
                  <Minus size={16} className="text-gray-600" />
                </button>
                <input 
                  type="text" 
                  value={quantity} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0 && val <= product.stock) setQuantity(val);
                  }}
                  className="w-14 h-8 text-center text-sm font-medium outline-none"
                />
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition border-l border-gray-300">
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
              <span className="text-sm text-gray-500">{product.stock} sản phẩm có sẵn</span>
            </div>

            <div className="flex gap-4">
              <button onClick={handleAddToCart} className="h-12 px-6 flex items-center justify-center gap-2 bg-[#ee4d2d]/10 text-[#ee4d2d] border border-[#ee4d2d] rounded-sm font-medium hover:bg-[#ee4d2d]/20 transition">
                <ShoppingCart size={20} />
                Thêm Vào Giỏ Hàng
              </button>
              <button className="h-12 px-12 bg-[#ee4d2d] text-white rounded-sm font-medium hover:bg-[#d73211] transition shadow-sm">
                Mua Ngay
              </button>
            </div>
          </div>
        </div>

        {/* Shop Info */}
        <div className="bg-white rounded-sm shadow-sm p-6 mt-4 flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
            <Store size={32} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg text-gray-800">{product.shop?.name || 'Shopee Mall'}</h3>
            <div className="text-sm text-gray-500 mt-1 flex gap-4">
              <span>Online 5 phút trước</span>
            </div>
            <div className="flex gap-3 mt-3">
              <button className="px-3 py-1 border border-[#ee4d2d] text-[#ee4d2d] bg-[#ee4d2d]/10 rounded-sm text-xs font-medium">Chat Ngay</button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-sm text-xs font-medium">Xem Shop</button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-sm shadow-sm mt-4 p-6">
          <div className="bg-gray-50 p-3 mb-4 rounded-sm">
            <h2 className="text-lg font-medium text-gray-800 uppercase">Chi Tiết Sản Phẩm</h2>
          </div>
          <div className="grid grid-cols-[150px_1fr] gap-4 text-sm mb-8">
            <div className="text-gray-400">Danh Mục</div>
            <div className="text-gray-800">{product.category?.name}</div>
            <div className="text-gray-400">Thương hiệu</div>
            <div className="text-gray-800">{product.brand || 'No Brand'}</div>
            <div className="text-gray-400">Kho hàng</div>
            <div className="text-gray-800">{product.stock}</div>
            <div className="text-gray-400">Gửi từ</div>
            <div className="text-gray-800">Hà Nội</div>
          </div>
          
          <div className="bg-gray-50 p-3 mb-4 rounded-sm mt-8">
            <h2 className="text-lg font-medium text-gray-800 uppercase">Mô Tả Sản Phẩm</h2>
          </div>
          <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed px-2">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
}
