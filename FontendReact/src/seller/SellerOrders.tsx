import { useState } from "react";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import Badge from "../components/Badge";

const ORDERS = [
  { id: "#WB240089", buyer: "Nguyễn Văn An", product: "iPhone 15 Pro Max 256GB", amount: 28990000, status: "pending" as const, date: "12/12/2024 09:32", address: "Q1, TP.HCM" },
  { id: "#WB240088", buyer: "Trần Thị Bình", product: "AirPods Pro 2nd Gen", amount: 4990000, status: "shipping" as const, date: "12/12/2024 08:15", address: "Q3, TP.HCM" },
  { id: "#WB240087", buyer: "Lê Minh Cường", product: "MacBook Air M3 8GB", amount: 27990000, status: "completed" as const, date: "11/12/2024 16:44", address: "Q7, TP.HCM" },
  { id: "#WB240086", buyer: "Phạm Quốc Dũng", product: "iPad Pro 13-inch M4", amount: 31990000, status: "completed" as const, date: "10/12/2024 11:22", address: "Bình Thạnh, TP.HCM" },
  { id: "#WB240085", buyer: "Hoàng Thị Oanh", product: "Apple Watch Ultra 2", amount: 20990000, status: "cancelled" as const, date: "09/12/2024 14:55", address: "Thủ Đức, TP.HCM" },
  { id: "#WB240084", buyer: "Vũ Thanh Phong", product: "Apple TV 4K 3rd Gen", amount: 4390000, status: "shipping" as const, date: "08/12/2024 10:08", address: "Gò Vấp, TP.HCM" },
];

const TABS = ["Tất cả", "Chờ xử lý", "Đang giao", "Hoàn thành", "Đã huỷ"];

export default function SellerOrders() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const filtered = ORDERS.filter(o => {
    const matchSearch = o.id.includes(search) || o.buyer.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "Tất cả" || (
      activeTab === "Chờ xử lý" ? o.status === "pending" :
      activeTab === "Đang giao" ? o.status === "shipping" :
      activeTab === "Hoàn thành" ? o.status === "completed" : o.status === "cancelled"
    );
    return matchSearch && matchTab;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Quản lý đơn hàng</h1>
          <p className="text-sm text-[#94A3B8]">{ORDERS.length} đơn hàng</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-4 h-10">
            <Search size={16} className="text-[#94A3B8]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm mã đơn, khách hàng..." className="bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none w-52" />
          </div>
          <button className="h-10 px-4 border border-[#E2E8F0] bg-white rounded-xl text-sm text-[#475569] hover:border-[#22C55E] transition-colors">
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#E2E8F0]">
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t ? "bg-[#22C55E] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"}`}
          >
            {t}
            {t === "Chờ xử lý" && <span className="ml-1.5 bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">8</span>}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {["Mã đơn", "Khách hàng", "Sản phẩm", "Địa chỉ", "Số tiền", "Ngày đặt", "Trạng thái", "Thao tác"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8FAFC]">
            {filtered.map(order => (
              <tr key={order.id} className="hover:bg-[#FAFBFC] transition-colors">
                <td className="px-4 py-4 text-sm font-bold text-[#2563EB]">{order.id}</td>
                <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">{order.buyer}</td>
                <td className="px-4 py-4 text-sm text-[#475569] max-w-48">
                  <span className="line-clamp-1">{order.product}</span>
                </td>
                <td className="px-4 py-4 text-xs text-[#94A3B8]">{order.address}</td>
                <td className="px-4 py-4 text-sm font-bold text-[#0F172A]">₫{order.amount.toLocaleString()}</td>
                <td className="px-4 py-4 text-xs text-[#94A3B8]">{order.date}</td>
                <td className="px-4 py-4">
                  <Badge variant={order.status}>{order.status === "pending" ? "Chờ xử lý" : order.status === "shipping" ? "Đang giao" : order.status === "completed" ? "Hoàn thành" : "Đã huỷ"}</Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-[#94A3B8] hover:text-[#2563EB] transition-colors">
                      <Eye size={14} />
                    </button>
                    {order.status === "pending" && (
                      <>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-[#94A3B8] hover:text-[#22C55E] transition-colors">
                          <CheckCircle size={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors">
                          <XCircle size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-[#94A3B8]">Không có đơn hàng nào</div>
        )}
      </div>
    </div>
  );
}
