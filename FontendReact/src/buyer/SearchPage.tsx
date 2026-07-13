import { useState } from "react";
import { Search, SlidersHorizontal, X, Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import type { BuyerPage } from "../portals/BuyerPortal";

const RESULTS = [
  { id: 1, name: "Apple iPhone 15 Pro Max 256GB Titan Đen", price: 28990000, originalPrice: 32990000, rating: 4.9, reviews: 2847, sold: 15234, image: "https://images.unsplash.com/photo-1696446701796-da61339b4f32?w=400&h=400&fit=crop&auto=format", shop: "Apple Store VN", badge: "sale" as const, freeShip: true },
  { id: 2, name: "Samsung Galaxy S24 Ultra 512GB Chính hãng", price: 26990000, originalPrice: 29990000, rating: 4.8, reviews: 1923, sold: 8341, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&auto=format", shop: "Samsung Official", badge: "hot" as const, freeShip: true },
  { id: 3, name: "Xiaomi 14 Pro 5G 512GB Global Version", price: 18990000, originalPrice: 22000000, rating: 4.7, reviews: 654, sold: 2103, image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop&auto=format", shop: "Xiaomi VN Official", badge: "new" as const, freeShip: true },
  { id: 4, name: "OPPO Find X7 Ultra 512GB Camera Hasselblad", price: 24990000, originalPrice: 28000000, rating: 4.8, reviews: 432, sold: 1890, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format", shop: "OPPO Store VN", badge: "sale" as const },
  { id: 5, name: "Google Pixel 8 Pro 256GB Unlocked", price: 22990000, originalPrice: 25990000, rating: 4.6, reviews: 321, sold: 765, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop&auto=format", shop: "Google Store", freeShip: true },
  { id: 6, name: "OnePlus 12 5G 16GB+512GB Flowy Emerald", price: 19990000, originalPrice: 23000000, rating: 4.7, reviews: 278, sold: 1203, image: "https://images.unsplash.com/photo-1583573636333-c2a1c3a69d72?w=400&h=400&fit=crop&auto=format", shop: "OnePlus VN", badge: "hot" as const },
];

interface Props {
  onNavigate: (p: BuyerPage) => void;
}

export default function SearchPage({ onNavigate }: Props) {
  const [query, setQuery] = useState("iPhone");
  const [sortBy, setSortBy] = useState("relevant");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center bg-white border border-[#E2E8F0] rounded-2xl px-4 gap-3 focus-within:border-[#2563EB]">
          <Search size={18} className="text-[#94A3B8]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 h-12 bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
            placeholder="Tìm kiếm sản phẩm..."
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-[#94A3B8] hover:text-[#475569]">
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`flex items-center gap-2 px-4 border rounded-2xl text-sm font-medium transition-all ${showFilter ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]" : "border-[#E2E8F0] bg-white text-[#475569]"}`}
        >
          <SlidersHorizontal size={16} /> Lọc
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        {showFilter && (
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] h-fit space-y-6">
            <div>
              <h3 className="font-bold text-[#0F172A] mb-3">Danh mục</h3>
              <div className="space-y-2">
                {["Tất cả", "Điện thoại", "Máy tính bảng", "Phụ kiện"].map(c => (
                  <label key={c} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="cat" className="accent-[#2563EB]" defaultChecked={c === "Tất cả"} />
                    <span className="text-sm text-[#475569]">{c}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] mb-3">Khoảng giá</h3>
              <div className="flex gap-2">
                <input value={priceMin} onChange={e => setPriceMin(e.target.value)} placeholder="Từ" className="flex-1 h-10 px-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                <input value={priceMax} onChange={e => setPriceMax(e.target.value)} placeholder="Đến" className="flex-1 h-10 px-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] mb-3">Đánh giá</h3>
              <div className="space-y-2">
                {[5, 4, 3].map(r => (
                  <label key={r} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="accent-[#2563EB]" />
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= r ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#E2E8F0]"} />)}
                      <span className="text-sm text-[#475569] ml-1">trở lên</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] mb-3">Tùy chọn</h3>
              <div className="space-y-2">
                {["Free ship", "Hàng chính hãng", "Đang khuyến mãi"].map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="accent-[#2563EB]" />
                    <span className="text-sm text-[#475569]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className={showFilter ? "lg:col-span-3" : "lg:col-span-4"}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#475569]">Tìm thấy <strong className="text-[#0F172A]">{RESULTS.length}</strong> sản phẩm cho "<strong className="text-[#0F172A]">{query}</strong>"</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#475569]">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="h-9 px-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] bg-white"
              >
                <option value="relevant">Liên quan</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating">Đánh giá cao</option>
                <option value="sold">Bán chạy</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {RESULTS.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => onNavigate("product")} />
            ))}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[1,2,3,4,5].map(p => (
              <button key={p} className={`w-9 h-9 rounded-xl text-sm font-medium ${p === 1 ? "bg-[#2563EB] text-white" : "bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#2563EB]"}`}>
                {p}
              </button>
            ))}
            <button className="px-4 h-9 rounded-xl text-sm font-medium bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#2563EB]">
              Tiếp →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
