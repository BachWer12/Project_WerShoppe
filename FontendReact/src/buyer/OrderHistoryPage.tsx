import { useState } from "react";
import { Package, ChevronRight, RotateCcw, Star } from "lucide-react";
import Badge from "../components/Badge";
import type { BuyerPage } from "../portals/BuyerPortal";

const ORDERS = [
  { id: "#WB240001", date: "12/12/2024", items: "Apple iPhone 15 Pro Max", total: 28990000, status: "shipping" as const, shop: "Apple Store VN", image: "https://images.unsplash.com/photo-1696446701796-da61339b4f32?w=100&h=100&fit=crop&auto=format", track: "Đang trên đường giao" },
  { id: "#WB240002", date: "05/12/2024", items: "Sony WH-1000XM5 × 2", total: 13980000, status: "completed" as const, shop: "Sony Store", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop&auto=format", track: "Đã giao thành công" },
  { id: "#WB240003", date: "28/11/2024", items: "Nike Air Max 270 React", total: 2890000, status: "cancelled" as const, shop: "Nike Vietnam", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop&auto=format", track: "Đơn đã bị huỷ" },
  { id: "#WB240004", date: "20/11/2024", items: "Dell XPS 15 9530 Core i9", total: 45990000, status: "completed" as const, shop: "Dell Vietnam", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=100&h=100&fit=crop&auto=format", track: "Đã giao thành công" },
];

const TABS = ["Tất cả", "Đang xử lý", "Đang giao", "Đã giao", "Đã huỷ", "Hoàn hàng"];

interface Props {
  onNavigate: (p: BuyerPage) => void;
}

export default function OrderHistoryPage({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const statusMap: Record<string, "pending" | "shipping" | "completed" | "cancelled"> = {
    "Đang xử lý": "pending",
    "Đang giao": "shipping",
    "Đã giao": "completed",
    "Đã huỷ": "cancelled",
  };

  const filtered = activeTab === "Tất cả"
    ? ORDERS
    : ORDERS.filter(o => o.status === statusMap[activeTab]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Đơn hàng của tôi</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-2xl p-1.5 border border-[#E2E8F0] mb-6 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === t ? "bg-[#2563EB] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(order => (
          <div key={order.id} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <Package size={16} className="text-[#94A3B8]" />
                <span className="text-sm font-medium text-[#0F172A]">{order.shop}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={order.status}>{order.track}</Badge>
                <span className="text-xs text-[#94A3B8]">{order.id}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex gap-4">
                <img src={order.image} alt={order.items} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#0F172A] mb-1">{order.items}</p>
                  <p className="text-xs text-[#94A3B8]">Ngày đặt: {order.date}</p>
                  <p className="text-lg font-bold text-[#2563EB] mt-2">₫{order.total.toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-1 text-sm text-[#2563EB] font-medium hover:gap-2 transition-all">
                    Chi tiết <ChevronRight size={14} />
                  </button>
                  {order.status === "completed" && (
                    <button className="flex items-center gap-1 text-sm text-[#F59E0B] font-medium">
                      <Star size={12} /> Đánh giá
                    </button>
                  )}
                  {order.status === "completed" && (
                    <button onClick={() => onNavigate("cart")} className="flex items-center gap-1 text-sm text-[#475569] font-medium">
                      Mua lại
                    </button>
                  )}
                  {order.status === "shipping" && (
                    <button className="flex items-center gap-1 text-sm text-[#475569] font-medium">
                      Theo dõi
                    </button>
                  )}
                  {(order.status === "completed" || order.status === "shipping") && (
                    <button className="flex items-center gap-1 text-sm text-[#94A3B8]">
                      <RotateCcw size={12} /> Hoàn hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 border border-[#E2E8F0] text-center">
            <p className="text-4xl mb-4">📦</p>
            <p className="text-[#475569]">Không có đơn hàng nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
