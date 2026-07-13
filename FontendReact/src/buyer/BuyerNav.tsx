import { ShoppingBag, Search, ShoppingCart, User, Home, Package, Wallet, LogIn, ArrowLeft } from "lucide-react";
import type { BuyerPage } from "../portals/BuyerPortal";

interface Props {
  page: BuyerPage;
  onNavigate: (p: BuyerPage) => void;
  cartCount: number;
  onExit: () => void;
}

export default function BuyerNav({ page, onNavigate, cartCount, onExit }: Props) {
  const links = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "search", label: "Tìm kiếm", icon: Search },
    { id: "orders", label: "Đơn hàng", icon: Package },
    { id: "wallet", label: "Ví tiền", icon: Wallet },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="text-[#94A3B8] hover:text-[#0F172A] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[#0F172A]">WerBay</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id as BuyerPage)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                page === id ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#475569] hover:bg-[#F8FAFC]"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("cart")}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] transition-all"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate("profile")}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
              page === "profile" ? "bg-[#EFF6FF] text-[#2563EB]" : "hover:bg-[#F8FAFC] text-[#475569]"
            }`}
          >
            <User size={20} />
          </button>
          <button
            onClick={() => onNavigate("login")}
            className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1D4ED8] transition-colors"
          >
            <LogIn size={14} />
            Đăng nhập
          </button>
        </div>
      </div>
    </nav>
  );
}
