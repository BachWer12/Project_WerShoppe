import { LayoutDashboard, Users, Store, Package, ShoppingBag, BarChart3, Tag, AlertTriangle, Settings, ArrowLeft, Bell, Shield } from "lucide-react";
import type { AdminPage } from "../portals/AdminPortal";

interface Props {
  page: AdminPage;
  onNavigate: (p: AdminPage) => void;
  onExit: () => void;
}

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Người dùng", icon: Users },
  { id: "sellers", label: "Người bán", icon: Store },
  { id: "products", label: "Sản phẩm", icon: Package },
  { id: "orders", label: "Đơn hàng", icon: ShoppingBag },
  { id: "vouchers", label: "Voucher", icon: Tag },
  { id: "complaints", label: "Khiếu nại", icon: AlertTriangle },
  { id: "reports", label: "Báo cáo", icon: BarChart3 },
  { id: "settings", label: "Cài đặt", icon: Settings },
] as const;

export default function AdminSidebar({ page, onNavigate, onExit }: Props) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0F172A] flex flex-col z-40">
      <div className="p-5 border-b border-white/10">
        <button onClick={onExit} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-4">
          <ArrowLeft size={16} /> WerBay
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B5CF6] rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Admin Panel</p>
            <p className="text-slate-400 text-xs">Super Administrator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              page === id ? "bg-[#8B5CF6] text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={18} />
            {label}
            {id === "complaints" && (
              <span className="ml-auto bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">23</span>
            )}
            {id === "sellers" && (
              <span className="ml-auto bg-[#F59E0B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">12</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all">
          <Bell size={18} /> Thông báo hệ thống
        </button>
      </div>
    </aside>
  );
}
