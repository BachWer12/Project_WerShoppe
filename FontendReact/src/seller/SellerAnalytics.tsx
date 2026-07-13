import { TrendingUp, Users, ShoppingBag, Star } from "lucide-react";

const MONTHLY = [
  { month: "T7", revenue: 38, orders: 89 },
  { month: "T8", revenue: 45, orders: 110 },
  { month: "T9", revenue: 52, orders: 127 },
  { month: "T10", revenue: 41, orders: 98 },
  { month: "T11", revenue: 68, orders: 165 },
  { month: "T12", revenue: 82, orders: 203 },
];

export default function SellerAnalytics() {
  const maxRevenue = Math.max(...MONTHLY.map(m => m.revenue));
  const maxOrders = Math.max(...MONTHLY.map(m => m.orders));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Phân tích & Báo cáo</h1>
        <p className="text-sm text-[#94A3B8]">Dữ liệu 6 tháng gần đây</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Tỷ lệ chuyển đổi", value: "3.24%", change: +0.8, icon: TrendingUp, color: "#22C55E", bg: "#F0FDF4" },
          { label: "Khách hàng mới", value: "1,284", change: +15.2, icon: Users, color: "#2563EB", bg: "#EFF6FF" },
          { label: "Đơn hoàn trả", value: "2.1%", change: -0.3, icon: ShoppingBag, color: "#F59E0B", bg: "#FFFBEB" },
          { label: "Điểm hài lòng", value: "4.87 ⭐", change: +0.12, icon: Star, color: "#8B5CF6", bg: "#F5F3FF" },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.bg }}>
                <k.icon size={18} style={{ color: k.color }} />
              </div>
              <span className={`text-xs font-semibold ${k.change >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                {k.change >= 0 ? "+" : ""}{k.change}%
              </span>
            </div>
            <div className="text-2xl font-bold text-[#0F172A]">{k.value}</div>
            <div className="text-xs text-[#94A3B8] mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Charts side by side */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
          <h3 className="font-bold text-[#0F172A] mb-5">Doanh thu theo tháng (triệu ₫)</h3>
          <div className="flex items-end gap-4 h-40">
            {MONTHLY.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-[#94A3B8]">{m.revenue}M</span>
                <div
                  className="w-full bg-[#2563EB] rounded-t-lg hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                  style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-xs text-[#94A3B8]">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
          <h3 className="font-bold text-[#0F172A] mb-5">Số đơn hàng theo tháng</h3>
          <div className="flex items-end gap-4 h-40">
            {MONTHLY.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-[#94A3B8]">{m.orders}</span>
                <div
                  className="w-full bg-[#22C55E] rounded-t-lg hover:bg-[#16A34A] transition-colors cursor-pointer"
                  style={{ height: `${(m.orders / maxOrders) * 100}%` }}
                />
                <span className="text-xs text-[#94A3B8]">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
        <h3 className="font-bold text-[#0F172A] mb-5">Doanh thu theo danh mục</h3>
        <div className="space-y-4">
          {[
            { cat: "iPhone & iOS Devices", pct: 68, revenue: "₫31.1M", color: "#2563EB" },
            { cat: "Mac & MacBook", pct: 18, revenue: "₫8.2M", color: "#22C55E" },
            { cat: "iPad & Accessories", pct: 8, revenue: "₫3.7M", color: "#F59E0B" },
            { cat: "Audio & Wearables", pct: 6, revenue: "₫2.8M", color: "#8B5CF6" },
          ].map(c => (
            <div key={c.cat}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium text-[#0F172A]">{c.cat}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#94A3B8]">{c.pct}%</span>
                  <span className="font-bold text-[#0F172A]">{c.revenue}</span>
                </div>
              </div>
              <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buyer demographics */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
          <h3 className="font-bold text-[#0F172A] mb-4">Phân bổ khách hàng</h3>
          <div className="space-y-3">
            {[
              { label: "TP. Hồ Chí Minh", pct: 45, count: "578 khách" },
              { label: "Hà Nội", pct: 28, count: "360 khách" },
              { label: "Đà Nẵng", pct: 12, count: "154 khách" },
              { label: "Khác", pct: 15, count: "193 khách" },
            ].map(d => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-sm text-[#475569] w-36">{d.label}</span>
                <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="text-xs text-[#94A3B8] w-20 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
          <h3 className="font-bold text-[#0F172A] mb-4">Hiệu suất đánh giá</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-[#475569] w-16 text-right">{stars} ★</span>
                <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${[82, 12, 4, 1, 1][5 - stars]}%` }} />
                </div>
                <span className="text-xs text-[#94A3B8] w-10">{[82, 12, 4, 1, 1][5 - stars]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
