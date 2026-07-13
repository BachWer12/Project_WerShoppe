import { User, MapPin, Bell, Shield, Wallet, Package, Settings, ChevronRight, Edit3 } from "lucide-react";
import type { BuyerPage } from "../portals/BuyerPortal";

interface Props {
  onNavigate: (p: BuyerPage) => void;
}

const MENU = [
  { icon: Package, label: "Đơn hàng của tôi", desc: "2 đơn đang giao", target: "orders" as BuyerPage, color: "#2563EB" },
  { icon: Wallet, label: "Ví WerBay", desc: "₫2.450.000", target: "wallet" as BuyerPage, color: "#22C55E" },
  { icon: MapPin, label: "Địa chỉ giao hàng", desc: "3 địa chỉ đã lưu", target: null, color: "#F59E0B" },
  { icon: Bell, label: "Thông báo", desc: "5 thông báo mới", target: null, color: "#8B5CF6" },
  { icon: Shield, label: "Bảo mật tài khoản", desc: "Đổi mật khẩu, 2FA", target: null, color: "#EF4444" },
  { icon: Settings, label: "Cài đặt", desc: "Ngôn ngữ, thông báo", target: null, color: "#475569" },
];

export default function ProfilePage({ onNavigate }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Tài khoản của tôi</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] mb-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white text-2xl font-bold">
              AN
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2563EB] text-white rounded-full flex items-center justify-center hover:bg-[#1D4ED8] transition-colors">
              <Edit3 size={12} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#0F172A]">Nguyễn Văn An</h2>
            <p className="text-sm text-[#94A3B8]">nguyenvanan@gmail.com</p>
            <p className="text-sm text-[#94A3B8]">0901 234 567</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs bg-[#FEF3C7] text-[#D97706] font-bold px-2 py-0.5 rounded-full">⭐ Thành viên Vàng</span>
              <span className="text-xs text-[#94A3B8]">Tham gia: 03/2022</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-all">
            <Edit3 size={14} /> Chỉnh sửa
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Đơn hàng", value: "24", color: "#2563EB" },
          { label: "Đã giao", value: "20", color: "#22C55E" },
          { label: "Đang giao", value: "2", color: "#F59E0B" },
          { label: "Hoàn hàng", value: "2", color: "#EF4444" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#E2E8F0] text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-[#94A3B8]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        {MENU.map(({ icon: Icon, label, desc, target, color }, i) => (
          <button
            key={label}
            onClick={() => target && onNavigate(target)}
            className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8FAFC] transition-colors text-left ${i < MENU.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "15" }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#0F172A]">{label}</p>
              <p className="text-xs text-[#94A3B8]">{desc}</p>
            </div>
            <ChevronRight size={16} className="text-[#94A3B8]" />
          </button>
        ))}
      </div>

      <button className="w-full mt-4 py-3 border border-[#EF4444] text-[#EF4444] font-semibold rounded-2xl hover:bg-red-50 transition-colors text-sm">
        Đăng xuất
      </button>
    </div>
  );
}
