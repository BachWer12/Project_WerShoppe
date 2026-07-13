import { useState } from "react";
import { Plus, Search, Edit3, Trash2, Eye, Package } from "lucide-react";
import Badge from "../components/Badge";

const PRODUCTS = [
  { id: 1, name: "Apple iPhone 15 Pro Max 256GB", sku: "IPH15PM-256", price: 28990000, stock: 45, sold: 234, status: "active", image: "https://images.unsplash.com/photo-1696446701796-da61339b4f32?w=80&h=80&fit=crop&auto=format" },
  { id: 2, name: "AirPods Pro 2nd Generation MagSafe", sku: "APP2-MG", price: 4990000, stock: 120, sold: 189, status: "active", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=80&h=80&fit=crop&auto=format" },
  { id: 3, name: "MacBook Air 13 M3 8GB/256GB", sku: "MBA13-M3-256", price: 27990000, stock: 18, sold: 87, status: "active", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop&auto=format" },
  { id: 4, name: "iPad Pro 13-inch M4 256GB WiFi", sku: "IPP13-M4-256", price: 31990000, stock: 0, sold: 65, status: "out_of_stock", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&h=80&fit=crop&auto=format" },
  { id: 5, name: "Apple Watch Ultra 2 Black Trail", sku: "AWU2-BLK", price: 20990000, stock: 12, sold: 52, status: "active", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=80&h=80&fit=crop&auto=format" },
  { id: 6, name: "Apple TV 4K 3rd Generation", sku: "ATV4K-3G", price: 4390000, stock: 5, sold: 43, status: "low_stock", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=80&h=80&fit=crop&auto=format" },
];

const statusVariant: Record<string, "success" | "danger" | "warning" | "new"> = {
  active: "success",
  out_of_stock: "danger",
  low_stock: "warning",
  draft: "new",
};

const statusLabel: Record<string, string> = {
  active: "Đang bán",
  out_of_stock: "Hết hàng",
  low_stock: "Sắp hết",
  draft: "Bản nháp",
};

export default function SellerProducts() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Quản lý sản phẩm</h1>
          <p className="text-sm text-[#94A3B8]">{PRODUCTS.length} sản phẩm</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white font-semibold rounded-xl hover:bg-[#16A34A] transition-colors text-sm"
        >
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl px-4">
          <Search size={16} className="text-[#94A3B8]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên, SKU..." className="flex-1 h-10 bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none" />
        </div>
        <select className="h-10 px-3 border border-[#E2E8F0] bg-white rounded-xl text-sm focus:outline-none focus:border-[#22C55E]">
          <option>Tất cả trạng thái</option>
          <option>Đang bán</option>
          <option>Hết hàng</option>
        </select>
        <select className="h-10 px-3 border border-[#E2E8F0] bg-white rounded-xl text-sm focus:outline-none focus:border-[#22C55E]">
          <option>Tất cả danh mục</option>
          <option>Điện thoại</option>
          <option>Máy tính</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Sản phẩm</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">SKU</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Giá</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Tồn kho</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Đã bán</th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Trạng thái</th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8FAFC]">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-[#FAFBFC] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl" />
                    <span className="text-sm font-medium text-[#0F172A] line-clamp-2">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs font-mono text-[#94A3B8]">{p.sku}</td>
                <td className="px-5 py-4 text-right text-sm font-bold text-[#0F172A]">₫{p.price.toLocaleString()}</td>
                <td className="px-5 py-4 text-right">
                  <span className={`text-sm font-semibold ${p.stock === 0 ? "text-[#EF4444]" : p.stock <= 10 ? "text-[#F59E0B]" : "text-[#22C55E]"}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-sm text-[#475569]">{p.sold}</td>
                <td className="px-5 py-4 text-center">
                  <Badge variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-[#94A3B8] hover:text-[#2563EB] transition-colors">
                      <Eye size={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-[#94A3B8] hover:text-[#22C55E] transition-colors">
                      <Edit3 size={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Package size={40} className="text-[#E2E8F0] mx-auto mb-3" />
            <p className="text-[#94A3B8]">Không tìm thấy sản phẩm</p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[#0F172A] mb-5">Thêm sản phẩm mới</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Tên sản phẩm</label>
                <input placeholder="Nhập tên sản phẩm..." className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Giá bán</label>
                <input placeholder="₫0" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Số lượng</label>
                <input placeholder="0" type="number" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Danh mục</label>
                <select className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E] bg-white">
                  <option>Điện thoại</option>
                  <option>Máy tính</option>
                  <option>Phụ kiện</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">SKU</label>
                <input placeholder="SKU-001" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Mô tả</label>
                <textarea rows={3} placeholder="Mô tả sản phẩm..." className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E] resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 border border-[#E2E8F0] text-[#475569] font-semibold rounded-xl hover:bg-[#F8FAFC] transition-colors text-sm">Huỷ</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 bg-[#22C55E] text-white font-semibold rounded-xl hover:bg-[#16A34A] transition-colors text-sm">Thêm sản phẩm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
