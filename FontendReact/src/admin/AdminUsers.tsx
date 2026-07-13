import { useState } from "react";
import { Search, UserCheck, UserX, Eye, Filter } from "lucide-react";
import Badge from "../components/Badge";

const USERS = [
  { id: 1, name: "Nguyễn Văn An", email: "nvaan@gmail.com", phone: "0901 234 567", role: "buyer", orders: 24, spent: "₫42.7M", joined: "03/2022", status: "active", avatar: "NA" },
  { id: 2, name: "Trần Thị Bình", email: "ttbinh@gmail.com", phone: "0912 345 678", role: "buyer", orders: 8, spent: "₫12.3M", joined: "07/2023", status: "active", avatar: "TB" },
  { id: 3, name: "Lê Minh Cường", email: "lmcuong@gmail.com", phone: "0923 456 789", role: "seller", orders: 0, spent: "₫0", joined: "01/2022", status: "active", avatar: "LC" },
  { id: 4, name: "Phạm Thị Dung", email: "ptdung@gmail.com", phone: "0934 567 890", role: "buyer", orders: 3, spent: "₫2.1M", joined: "11/2024", status: "inactive", avatar: "PD" },
  { id: 5, name: "Hoàng Minh Tuấn", email: "hmtuan@gmail.com", phone: "0945 678 901", role: "buyer", orders: 45, spent: "₫89.2M", joined: "02/2021", status: "active", avatar: "HT" },
  { id: 6, name: "Vũ Thị Oanh", email: "vtoanh@gmail.com", phone: "0956 789 012", role: "seller", orders: 0, spent: "₫0", joined: "05/2023", status: "suspended", avatar: "VO" },
];

const COLORS: Record<string, string> = {
  buyer: "#2563EB",
  seller: "#22C55E",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Quản lý người dùng</h1>
          <p className="text-sm text-[#94A3B8]">Tổng: 248,392 người dùng</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-4 h-10">
            <Search size={16} className="text-[#94A3B8]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên, email..." className="bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none w-52" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="h-10 px-3 border border-[#E2E8F0] bg-white rounded-xl text-sm focus:outline-none focus:border-[#8B5CF6]">
            <option value="all">Tất cả vai trò</option>
            <option value="buyer">Người mua</option>
            <option value="seller">Người bán</option>
          </select>
          <button className="flex items-center gap-2 h-10 px-4 border border-[#E2E8F0] bg-white rounded-xl text-sm text-[#475569]">
            <Filter size={14} /> Lọc
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {["Người dùng", "Liên hệ", "Vai trò", "Đơn hàng", "Chi tiêu", "Tham gia", "Trạng thái", ""].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8FAFC]">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-[#FAFBFC] transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: COLORS[u.role] || "#94A3B8" }}>
                      {u.avatar}
                    </div>
                    <span className="text-sm font-medium text-[#0F172A]">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-xs text-[#475569]">{u.email}</div>
                  <div className="text-xs text-[#94A3B8]">{u.phone}</div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: COLORS[u.role] + "20", color: COLORS[u.role] }}>
                    {u.role === "buyer" ? "Người mua" : "Người bán"}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-[#475569]">{u.orders}</td>
                <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">{u.spent}</td>
                <td className="px-4 py-4 text-xs text-[#94A3B8]">{u.joined}</td>
                <td className="px-4 py-4">
                  <Badge variant={u.status === "active" ? "success" : u.status === "inactive" ? "cancelled" : "sale"}>
                    {u.status === "active" ? "Hoạt động" : u.status === "inactive" ? "Không hoạt động" : "Đình chỉ"}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-[#94A3B8] hover:text-[#2563EB] transition-colors"><Eye size={14} /></button>
                    {u.status === "active" ? (
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors"><UserX size={14} /></button>
                    ) : (
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-[#94A3B8] hover:text-[#22C55E] transition-colors"><UserCheck size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#94A3B8]">Hiển thị 1-6 / 248,392 người dùng</span>
        <div className="flex gap-2">
          {[1, 2, 3, "...", 100].map((p, i) => (
            <button key={i} className={`w-9 h-9 rounded-xl text-sm font-medium ${p === 1 ? "bg-[#8B5CF6] text-white" : "bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#8B5CF6]"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
