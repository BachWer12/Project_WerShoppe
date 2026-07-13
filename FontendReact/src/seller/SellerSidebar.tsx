import { LayoutDashboard, Package, ShoppingBag, BarChart3, Tag, User, Wallet, ArrowLeft, Bell, Store, MessageSquare, Settings } from "lucide-react";
import type { SellerPage } from "../portals/SellerPortal";

interface Props {
  page: SellerPage;
  onNavigate: (p: SellerPage) => void;
  onExit: () => void;
}

const NAV = [
  { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { id: "products", label: "Sản phẩm", icon: Package },
  { id: "orders", label: "Đơn hàng", icon: ShoppingBag },
  { id: "analytics", label: "Phân tích", icon: BarChart3 },
  { id: "promotion", label: "Khuyến mãi", icon: Tag },
  { id: "wallet", label: "Ví tiền", icon: Wallet },
  { id: "profile", label: "Cửa hàng", icon: Store },
] as const;

export default function SellerSidebar({ page, onNavigate, onExit }: Props) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0F172A] flex flex-col z-40">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <button onClick={onExit} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-4">
          <ArrowLeft size={16} /> WerBay
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center text-white font-bold">
            T
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Tech Store VN</p>
            <p className="text-slate-400 text-xs">Seller · ⭐ 4.9</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              page === id
                ? "bg-[#22C55E] text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={18} />
            {label}
            {id === "orders" && (
              <span className="ml-auto bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">8</span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10 space-y-1">
        {[
          { icon: MessageSquare, label: "Chat khách hàng" },
          { icon: Bell, label: "Thông báo" },
          { icon: Settings, label: "Cài đặt" },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all">
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}
