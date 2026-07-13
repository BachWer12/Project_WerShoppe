import { DollarSign, Users, Store, Package, ShoppingBag, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";

const RECENT_SELLERS = [
  { name: "Tech Store VN", email: "techstore@gmail.com", products: 284, revenue: "₫45.7M", status: "active", joined: "01/2022" },
  { name: "Fashion World", email: "fashion@gmail.com", products: 156, revenue: "₫12.3M", status: "active", joined: "06/2022" },
  { name: "Beauty Plus", email: "beauty@gmail.com", products: 89, revenue: "₫8.9M", status: "pending", joined: "11/2024" },
  { name: "Sport Center", email: "sport@gmail.com", products: 203, revenue: "₫23.1M", status: "active", joined: "03/2023" },
  { name: "Home Deco", email: "homedeco@gmail.com", products: 67, revenue: "₫5.4M", status: "suspended", joined: "09/2023" },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Admin Dashboard</h1>
          <p className="text-sm text-[#94A3B8]">Tổng quan hệ thống · {new Date().toLocaleDateString("vi-VN")}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#8B5CF6] transition-colors">
            Xuất báo cáo
          </button>
          <button className="px-4 py-2 bg-[#8B5CF6] text-white font-semibold rounded-xl text-sm hover:bg-[#7C3AED] transition-colors">
            Cấu hình hệ thống
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Tổng GMV tháng này" value="₫2.84B" change={18.3} icon={<DollarSign size={22} />} color="#8B5CF6" bg="#F5F3FF" />
        <StatCard label="Người dùng hoạt động" value="248K" change={5.7} icon={<Users size={22} />} color="#2563EB" bg="#EFF6FF" />
        <StatCard label="Người bán đang hoạt động" value="12,450" change={3.2} icon={<Store size={22} />} color="#22C55E" bg="#F0FDF4" />
        <StatCard label="Tổng đơn hàng hôm nay" value="8,234" change={12.1} icon={<ShoppingBag size={22} />} color="#F59E0B" bg="#FFFBEB" />
      </div>

      {/* Platform health */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Uptime", value: "99.98%", color: "#22C55E", icon: "🟢" },
          { label: "Tổng sản phẩm", value: "12.4M", color: "#2563EB", icon: "📦" },
          { label: "Khiếu nại tồn đọng", value: "23", color: "#EF4444", icon: "⚠️" },
          { label: "Seller chờ duyệt", value: "12", color: "#F59E0B", icon: "⏳" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#E2E8F0] flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-[#94A3B8]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[#0F172A]">GMV & Revenue Platform (30 ngày)</h2>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />GMV</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#22C55E]" />Platform Fee</div>
          </div>
        </div>
        <div className="flex items-end gap-1 h-44">
          {Array.from({ length: 30 }, (_, i) => ({
            gmv: Math.floor(60 + Math.random() * 40),
            fee: Math.floor(5 + Math.random() * 10),
          })).map((d, i) => (
            <div key={i} className="flex-1 flex flex-col gap-0.5 items-center">
              <div className="w-full bg-[#8B5CF6]/20 rounded-sm hover:bg-[#8B5CF6]/40 transition-colors" style={{ height: `${d.gmv}%` }} />
              <div className="w-full bg-[#22C55E]/40 rounded-sm" style={{ height: `${d.fee}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Sellers & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
            <h2 className="font-bold text-[#0F172A]">Người bán nổi bật</h2>
            <button className="text-sm text-[#8B5CF6] font-medium">Xem tất cả</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC]">
                {["Cửa hàng", "Sản phẩm", "Doanh thu", "Tham gia", "Trạng thái"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[#94A3B8] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {RECENT_SELLERS.map(s => (
                <tr key={s.name} className="hover:bg-[#FAFBFC] transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-[#0F172A]">{s.name}</div>
                    <div className="text-xs text-[#94A3B8]">{s.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#475569]">{s.products}</td>
                  <td className="px-4 py-3 text-sm font-bold text-[#22C55E]">{s.revenue}</td>
                  <td className="px-4 py-3 text-xs text-[#94A3B8]">{s.joined}</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.status === "active" ? "success" : s.status === "pending" ? "pending" : "cancelled"}>
                      {s.status === "active" ? "Hoạt động" : s.status === "pending" ? "Chờ duyệt" : "Đình chỉ"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F1F5F9]">
            <h2 className="font-bold text-[#0F172A]">Cảnh báo hệ thống</h2>
          </div>
          <div className="divide-y divide-[#F8FAFC]">
            {[
              { type: "warning", msg: "12 seller mới chờ duyệt hồ sơ", time: "5 phút trước" },
              { type: "danger", msg: "23 khiếu nại chưa được xử lý", time: "12 phút trước" },
              { type: "info", msg: "Server load đạt 72% - theo dõi", time: "30 phút trước" },
              { type: "success", msg: "Backup hệ thống hoàn thành", time: "1 giờ trước" },
              { type: "warning", msg: "5 sản phẩm vi phạm cần xét duyệt", time: "2 giờ trước" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4">
                {a.type === "warning" ? <AlertTriangle size={16} className="text-[#F59E0B] mt-0.5" /> :
                 a.type === "danger" ? <AlertTriangle size={16} className="text-[#EF4444] mt-0.5" /> :
                 a.type === "success" ? <CheckCircle size={16} className="text-[#22C55E] mt-0.5" /> :
                 <TrendingUp size={16} className="text-[#2563EB] mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm text-[#0F172A]">{a.msg}</p>
                  <p className="text-xs text-[#94A3B8]">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
