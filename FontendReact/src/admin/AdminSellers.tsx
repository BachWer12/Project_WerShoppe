import { useState } from "react";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import Badge from "../components/Badge";

const SELLERS = [
  { id: 1, name: "Tech Store VN", email: "techstore@gmail.com", products: 284, revenue: "₫45.7M", rating: 4.9, joined: "01/2022", status: "active", docs: "verified" },
  { id: 2, name: "Fashion World", email: "fashion@gmail.com", products: 156, revenue: "₫12.3M", rating: 4.7, joined: "06/2022", status: "active", docs: "verified" },
  { id: 3, name: "Beauty Plus", email: "beauty@gmail.com", products: 0, revenue: "₫0", rating: 0, joined: "11/2024", status: "pending", docs: "submitted" },
  { id: 4, name: "Green Garden", email: "garden@gmail.com", products: 0, revenue: "₫0", rating: 0, joined: "12/2024", status: "pending", docs: "submitted" },
  { id: 5, name: "Sport Center", email: "sport@gmail.com", products: 203, revenue: "₫23.1M", rating: 4.8, joined: "03/2023", status: "active", docs: "verified" },
  { id: 6, name: "Home Deco", email: "homedeco@gmail.com", products: 67, revenue: "₫5.4M", rating: 4.2, joined: "09/2023", status: "suspended", docs: "verified" },
];

export default function AdminSellers() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = SELLERS.filter(s => {
    const match = s.name.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return match;
    if (tab === "pending") return match && s.status === "pending";
    if (tab === "active") return match && s.status === "active";
    return match && s.status === "suspended";
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Quản lý người bán</h1>
          <p className="text-sm text-[#94A3B8]">12,450 người bán đang hoạt động · 12 chờ duyệt</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-4 h-10">
            <Search size={16} className="text-[#94A3B8]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm cửa hàng..." className="bg-transparent text-sm w-48 focus:outline-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#E2E8F0] w-fit">
        {[["all", "Tất cả"], ["pending", "Chờ duyệt"], ["active", "Hoạt động"], ["suspended", "Đình chỉ"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === id ? "bg-[#8B5CF6] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"}`}>
            {label}
            {id === "pending" && <span className="ml-1.5 bg-[#F59E0B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">12</span>}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {["Cửa hàng", "Sản phẩm", "Doanh thu", "Đánh giá", "Tham gia", "Hồ sơ", "Trạng thái", "Thao tác"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8FAFC]">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-[#FAFBFC] transition-colors">
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-[#0F172A]">{s.name}</div>
                  <div className="text-xs text-[#94A3B8]">{s.email}</div>
                </td>
                <td className="px-4 py-4 text-sm text-[#475569]">{s.products}</td>
                <td className="px-4 py-4 text-sm font-bold text-[#22C55E]">{s.revenue}</td>
                <td className="px-4 py-4 text-sm text-[#F59E0B]">{s.rating > 0 ? `⭐ ${s.rating}` : "—"}</td>
                <td className="px-4 py-4 text-xs text-[#94A3B8]">{s.joined}</td>
                <td className="px-4 py-4">
                  <Badge variant={s.docs === "verified" ? "success" : "pending"}>{s.docs === "verified" ? "Đã xác minh" : "Chờ xem xét"}</Badge>
                </td>
                <td className="px-4 py-4">
                  <Badge variant={s.status === "active" ? "success" : s.status === "pending" ? "pending" : "cancelled"}>
                    {s.status === "active" ? "Hoạt động" : s.status === "pending" ? "Chờ duyệt" : "Đình chỉ"}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-[#94A3B8] hover:text-[#2563EB] transition-colors"><Eye size={14} /></button>
                    {s.status === "pending" && (
                      <>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-[#94A3B8] hover:text-[#22C55E] transition-colors"><CheckCircle size={14} /></button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors"><XCircle size={14} /></button>
                      </>
                    )}
                    {s.status === "active" && (
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors"><XCircle size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
