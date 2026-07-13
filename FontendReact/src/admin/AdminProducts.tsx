import { useState } from "react";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import Badge from "../components/Badge";

const PRODUCTS = [
  { id: 1, name: "Apple iPhone 15 Pro Max 256GB", seller: "Tech Store VN", category: "Điện thoại", price: 28990000, status: "approved", reported: false, image: "https://images.unsplash.com/photo-1696446701796-da61339b4f32?w=60&h=60&fit=crop&auto=format" },
  { id: 2, name: "Giày Nike Air Max 270 Rep", seller: "Fashion World", category: "Thời trang", price: 290000, status: "pending", reported: true, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop&auto=format" },
  { id: 3, name: "Sony WH-1000XM5 Chính Hãng", seller: "Tech Store VN", category: "Điện tử", price: 6990000, status: "approved", reported: false, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=60&h=60&fit=crop&auto=format" },
  { id: 4, name: "Kem dưỡng da Hàn Quốc INNISFREE", seller: "Beauty Plus", category: "Mỹ phẩm", price: 450000, status: "pending", reported: false, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=60&h=60&fit=crop&auto=format" },
  { id: 5, name: "MacBook Air M3 13 inch 256GB", seller: "Tech Store VN", category: "Máy tính", price: 27990000, status: "approved", reported: false, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&h=60&fit=crop&auto=format" },
  { id: 6, name: "Hàng nhái túi Gucci", seller: "Home Deco", category: "Thời trang", price: 500000, status: "rejected", reported: true, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=60&h=60&fit=crop&auto=format" },
];

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = PRODUCTS.filter(p => {
    const match = p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase());
    return match && (statusFilter === "all" || p.status === statusFilter);
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Quản lý sản phẩm</h1>
          <p className="text-sm text-[#94A3B8]">12,456,789 sản phẩm · 234 chờ duyệt · 5 bị báo cáo</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-4 h-10">
            <Search size={16} className="text-[#94A3B8]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm sản phẩm, seller..." className="bg-transparent text-sm w-48 focus:outline-none" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-3 border border-[#E2E8F0] bg-white rounded-xl text-sm focus:outline-none">
            <option value="all">Tất cả</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {["Sản phẩm", "Người bán", "Danh mục", "Giá", "Báo cáo", "Trạng thái", "Thao tác"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8FAFC]">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-[#FAFBFC] transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl" />
                    <span className="text-sm font-medium text-[#0F172A] line-clamp-2 max-w-48">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[#475569]">{p.seller}</td>
                <td className="px-4 py-4 text-xs text-[#94A3B8]">{p.category}</td>
                <td className="px-4 py-4 text-sm font-bold text-[#0F172A]">₫{p.price.toLocaleString()}</td>
                <td className="px-4 py-4">
                  {p.reported ? <span className="text-xs text-[#EF4444] font-semibold">⚠️ Vi phạm</span> : <span className="text-xs text-[#94A3B8]">—</span>}
                </td>
                <td className="px-4 py-4">
                  <Badge variant={p.status === "approved" ? "success" : p.status === "pending" ? "pending" : "cancelled"}>
                    {p.status === "approved" ? "Đã duyệt" : p.status === "pending" ? "Chờ duyệt" : "Từ chối"}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-[#94A3B8] hover:text-[#2563EB] transition-colors"><Eye size={14} /></button>
                    {p.status === "pending" && (
                      <>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-[#94A3B8] hover:text-[#22C55E] transition-colors"><CheckCircle size={14} /></button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors"><XCircle size={14} /></button>
                      </>
                    )}
                    {p.reported && p.status === "approved" && (
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#EF4444] transition-colors"><XCircle size={14} /></button>
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
