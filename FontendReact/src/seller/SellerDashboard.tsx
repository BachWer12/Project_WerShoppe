import { DollarSign, ShoppingBag, Package, Star, TrendingUp, Bell, Eye } from "lucide-react";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";

const RECENT_ORDERS = [
  { id: "#WB240089", buyer: "Nguyễn Văn A", product: "iPhone 15 Pro Max", amount: 28990000, status: "shipping" as const, date: "12/12/2024" },
  { id: "#WB240088", buyer: "Trần Thị B", product: "AirPods Pro 2nd Gen", amount: 4990000, status: "pending" as const, date: "12/12/2024" },
  { id: "#WB240087", buyer: "Lê Minh C", product: "MacBook Air M3", amount: 32990000, status: "completed" as const, date: "11/12/2024" },
  { id: "#WB240086", buyer: "Phạm Quốc D", product: "iPad Pro 13 M4", amount: 31990000, status: "completed" as const, date: "10/12/2024" },
  { id: "#WB240085", buyer: "Hoàng Thị E", product: "Apple Watch Ultra 2", amount: 20990000, status: "cancelled" as const, date: "09/12/2024" },
];

export default function SellerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Tổng quan</h1>
          <p className="text-sm text-[#94A3B8]">Tháng 12, 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 text-[#22C55E] px-3 py-1.5 rounded-xl text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            Shop đang hoạt động
          </div>
          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Doanh thu tháng này" value="₫45.78M" change={12.4} icon={<DollarSign size={22} />} color="#22C55E" bg="#F0FDF4" />
        <StatCard label="Đơn hàng mới" value="127" change={8.2} icon={<ShoppingBag size={22} />} color="#2563EB" bg="#EFF6FF" />
        <StatCard label="Sản phẩm đang bán" value="284" change={3.1} icon={<Package size={22} />} color="#F59E0B" bg="#FFFBEB" />
        <StatCard label="Điểm đánh giá TB" value="4.87 ⭐" change={0.8} icon={<Star size={22} />} color="#8B5CF6" bg="#F5F3FF" />
      </div>

      {/* Revenue chart placeholder */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[#0F172A]">Doanh thu 30 ngày qua</h2>
          <div className="flex gap-2">
            {["7 ngày", "30 ngày", "3 tháng"].map(p => (
              <button key={p} className={`px-3 py-1 rounded-lg text-xs font-medium ${p === "30 ngày" ? "bg-[#2563EB] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-40">
          {[35, 52, 28, 67, 45, 80, 62, 48, 91, 55, 73, 38, 84, 61, 49, 76, 42, 95, 68, 53, 87, 72, 44, 81, 59, 65, 78, 90, 56, 71].map((v, i) => (
            <div
              key={i}
              className="flex-1 bg-[#2563EB] rounded-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ height: `${v}%` }}
              title={`₫${(v * 500000).toLocaleString()}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#94A3B8] mt-2">
          <span>1/12</span>
          <span>15/12</span>
          <span>30/12</span>
        </div>
      </div>

      {/* Recent orders + Top products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
            <h2 className="font-bold text-[#0F172A]">Đơn hàng gần đây</h2>
            <button className="text-sm text-[#2563EB] font-medium">Xem tất cả</button>
          </div>
          <div className="divide-y divide-[#F8FAFC]">
            {RECENT_ORDERS.map(order => (
              <div key={order.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-[#0F172A]">{order.id}</span>
                    <Badge variant={order.status}>{order.status === "shipping" ? "Đang giao" : order.status === "pending" ? "Chờ xử lý" : order.status === "completed" ? "Hoàn thành" : "Đã huỷ"}</Badge>
                  </div>
                  <p className="text-xs text-[#94A3B8]">{order.buyer} · {order.product}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#0F172A]">₫{order.amount.toLocaleString()}</div>
                  <div className="text-xs text-[#94A3B8]">{order.date}</div>
                </div>
                <button className="text-[#94A3B8] hover:text-[#2563EB] transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
            <h2 className="font-bold text-[#0F172A]">Sản phẩm bán chạy</h2>
            <TrendingUp size={16} className="text-[#22C55E]" />
          </div>
          <div className="divide-y divide-[#F8FAFC]">
            {[
              { name: "iPhone 15 Pro Max", sold: 234, revenue: "₫6.7B", image: "https://images.unsplash.com/photo-1696446701796-da61339b4f32?w=60&h=60&fit=crop&auto=format" },
              { name: "AirPods Pro 2nd Gen", sold: 189, revenue: "₫943M", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=60&h=60&fit=crop&auto=format" },
              { name: "MacBook Air M3", sold: 87, revenue: "₫2.8B", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&h=60&fit=crop&auto=format" },
              { name: "iPad Pro 13 M4", sold: 65, revenue: "₫2.1B", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=60&h=60&fit=crop&auto=format" },
              { name: "Apple Watch Ultra 2", sold: 52, revenue: "₫1.1B", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=60&h=60&fit=crop&auto=format" },
            ].map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 px-5 py-3">
                <span className="text-xs font-bold text-[#94A3B8] w-4">#{i + 1}</span>
                <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#0F172A] line-clamp-1">{p.name}</p>
                  <p className="text-[10px] text-[#94A3B8]">{p.sold} đã bán</p>
                </div>
                <span className="text-xs font-bold text-[#22C55E]">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
