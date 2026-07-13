import { useState } from "react";
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronRight, Minus, Plus } from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import type { BuyerPage } from "../portals/BuyerPortal";

interface Props {
  onNavigate: (p: BuyerPage) => void;
  onAddToCart: () => void;
}

const REVIEWS = [
  { user: "Nguyễn Văn A", rating: 5, date: "12/12/2024", comment: "Sản phẩm tuyệt vời, đóng gói cẩn thận, giao hàng nhanh. Rất hài lòng!", avatar: "NA" },
  { user: "Trần Thị B", rating: 4, date: "08/12/2024", comment: "Chất lượng tốt, dùng được rồi. Tuy nhiên hộp bị móp một chút.", avatar: "TB" },
  { user: "Lê Minh C", rating: 5, date: "05/12/2024", comment: "Mua lần 2, vẫn tin tưởng shop này. Hàng chính hãng, giá tốt.", avatar: "LC" },
];

export default function ProductDetailPage({ onNavigate, onAddToCart }: Props) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState<"desc" | "reviews">("desc");

  const images = [
    "https://images.unsplash.com/photo-1696446701796-da61339b4f32?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&auto=format",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#94A3B8] mb-6">
        <button onClick={() => onNavigate("home")} className="hover:text-[#2563EB]">Trang chủ</button>
        <ChevronRight size={14} />
        <span className="hover:text-[#2563EB] cursor-pointer">Điện thoại</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-medium">iPhone 15 Pro Max</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden aspect-square">
            <img src={images[activeImg]} alt="Product" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? "border-[#2563EB]" : "border-[#E2E8F0]"}`}
              >
                <img src={img} alt="" className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="sale">-12%</Badge>
              <Badge variant="new">Chính hãng</Badge>
              <Badge variant="hot">Bán chạy</Badge>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Apple iPhone 15 Pro Max 256GB Titan Đen</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />)}
                <span className="text-sm font-medium text-[#0F172A] ml-1">4.9</span>
              </div>
              <span className="text-sm text-[#94A3B8]">2,847 đánh giá</span>
              <span className="text-sm text-[#94A3B8]">15,234 đã bán</span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-5">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-[#2563EB]">₫28.990.000</span>
              <span className="text-lg text-[#94A3B8] line-through mb-0.5">₫32.990.000</span>
            </div>
            <p className="text-sm text-[#22C55E] mt-1">🎁 Tiết kiệm ₫4.000.000</p>
          </div>

          {/* Variants */}
          <div>
            <p className="text-sm font-medium text-[#0F172A] mb-3">Dung lượng</p>
            <div className="flex gap-3">
              {["256GB", "512GB", "1TB"].map(v => (
                <button key={v} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${v === "256GB" ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]" : "border-[#E2E8F0] text-[#475569] hover:border-[#2563EB]"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[#0F172A] mb-3">Màu sắc</p>
            <div className="flex gap-3">
              {[
                { name: "Titan Đen", color: "#404040" },
                { name: "Titan Trắng", color: "#F5F5F0" },
                { name: "Titan Xanh", color: "#3B5998" },
                { name: "Titan Tự nhiên", color: "#B8A898" },
              ].map(c => (
                <button key={c.name} title={c.name} className="w-8 h-8 rounded-full border-2 border-[#E2E8F0] hover:scale-110 transition-transform" style={{ backgroundColor: c.color }} />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium text-[#0F172A] mb-3">Số lượng</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#E2E8F0] rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-[#F8FAFC] text-[#475569]">
                  <Minus size={16} />
                </button>
                <span className="w-14 text-center text-sm font-semibold text-[#0F172A]">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-[#F8FAFC] text-[#475569]">
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm text-[#94A3B8]">Còn 128 sản phẩm</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              icon={<ShoppingCart size={18} />}
              onClick={() => { onAddToCart(); onNavigate("cart"); }}
            >
              Thêm vào giỏ
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => onNavigate("checkout")}
            >
              Mua ngay
            </Button>
            <button
              onClick={() => setLiked(!liked)}
              className="w-14 h-14 border border-[#E2E8F0] rounded-xl flex items-center justify-center hover:border-red-300 transition-all"
            >
              <Heart size={20} className={liked ? "fill-red-500 text-red-500" : "text-[#94A3B8]"} />
            </button>
            <button className="w-14 h-14 border border-[#E2E8F0] rounded-xl flex items-center justify-center hover:border-[#2563EB] text-[#94A3B8] hover:text-[#2563EB] transition-all">
              <Share2 size={20} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Shield, label: "Bảo hành 12 tháng", color: "#2563EB" },
              { icon: Truck, label: "Giao hàng nhanh 2h", color: "#22C55E" },
              { icon: RotateCcw, label: "Đổi trả 7 ngày", color: "#F59E0B" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-3 bg-[#F8FAFC] rounded-xl text-center">
                <Icon size={20} style={{ color }} />
                <span className="text-xs text-[#475569]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-1 border-b border-[#E2E8F0] mb-6">
          {(["desc", "reviews"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-semibold transition-all ${tab === t ? "text-[#2563EB] border-b-2 border-[#2563EB] -mb-px" : "text-[#475569] hover:text-[#0F172A]"}`}
            >
              {t === "desc" ? "Mô tả sản phẩm" : `Đánh giá (2,847)`}
            </button>
          ))}
        </div>

        {tab === "desc" ? (
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
            <h3 className="font-bold text-[#0F172A] mb-4">Thông số kỹ thuật</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Màn hình", "6.7 inch Super Retina XDR OLED"],
                ["Chip", "Apple A17 Pro (3nm)"],
                ["RAM", "8GB"],
                ["Bộ nhớ", "256GB NVMe"],
                ["Camera sau", "48MP + 12MP + 12MP"],
                ["Camera trước", "12MP TrueDepth"],
                ["Pin", "4422 mAh"],
                ["Sạc", "27W MagSafe"],
                ["Hệ điều hành", "iOS 17"],
                ["Kết nối", "5G, Wi-Fi 6E, Bluetooth 5.3"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 p-3 bg-[#F8FAFC] rounded-xl">
                  <span className="text-sm text-[#94A3B8] w-32 shrink-0">{k}</span>
                  <span className="text-sm font-medium text-[#0F172A]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EFF6FF] rounded-full flex items-center justify-center text-sm font-bold text-[#2563EB] shrink-0">
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#0F172A] text-sm">{r.user}</span>
                      <span className="text-xs text-[#94A3B8]">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= r.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#E2E8F0]"} />)}
                    </div>
                    <p className="text-sm text-[#475569]">{r.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
