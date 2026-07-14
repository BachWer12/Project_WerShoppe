import { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, Eye, Package, Loader2 } from "lucide-react";
import Badge from "../components/Badge";
import api from "../lib/api";

const statusVariant: Record<string, "success" | "danger" | "warning" | "new" | "pending" | "cancelled"> = {
  ACTIVE: "success",
  OUT_OF_STOCK: "danger",
  LOW_STOCK: "warning",
  DRAFT: "new",
  PENDING_APPROVAL: "pending",
  REJECTED: "cancelled"
};

const statusLabel: Record<string, string> = {
  ACTIVE: "Đang bán",
  OUT_OF_STOCK: "Hết hàng",
  LOW_STOCK: "Sắp hết",
  DRAFT: "Bản nháp",
  PENDING_APPROVAL: "Chờ duyệt",
  REJECTED: "Từ chối"
};

export default function SellerProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
    salePrice: "",
    stock: "",
    brand: "",
    weight: "",
    images: ""
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/seller");
      setProducts(res.data.data.content || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        categoryId: Number(formData.categoryId),
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        stock: Number(formData.stock),
        weight: formData.weight ? Number(formData.weight) : null,
        images: formData.images ? formData.images.split(',').map(url => url.trim()).filter(Boolean) : []
      };
      await api.post("/products", payload);
      setShowAdd(false);
      fetchProducts();
    } catch (err) {
      console.error("Failed to create product", err);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Quản lý sản phẩm</h1>
          <p className="text-sm text-[#94A3B8]">{products.length} sản phẩm</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white font-semibold rounded-xl hover:bg-[#16A34A] transition-colors text-sm"
        >
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl px-4">
          <Search size={16} className="text-[#94A3B8]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên..." className="flex-1 h-10 bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-[#94A3B8]" /></div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Sản phẩm</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Danh mục</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Giá</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Tồn kho</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Trạng thái</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {filtered.map(p => {
                let img = "https://via.placeholder.com/60";
                if (p.images) {
                  try {
                    const parsed = JSON.parse(p.images);
                    if (parsed && parsed.length > 0) img = parsed[0];
                  } catch (e) {}
                }
                return (
                <tr key={p.id} className="hover:bg-[#FAFBFC] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={img} alt={p.name} className="w-12 h-12 object-cover rounded-xl" />
                      <span className="text-sm font-medium text-[#0F172A] line-clamp-2">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-[#94A3B8]">{p.category?.name}</td>
                  <td className="px-5 py-4 text-right text-sm font-bold text-[#0F172A]">₫{p.price.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right">
                    <span className={`text-sm font-semibold ${p.stock === 0 ? "text-[#EF4444]" : p.stock <= 10 ? "text-[#F59E0B]" : "text-[#22C55E]"}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Badge variant={statusVariant[p.status] || "new"}>{statusLabel[p.status] || p.status}</Badge>
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
              )})}
            </tbody>
          </table>
        )}
        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center">
            <Package size={40} className="text-[#E2E8F0] mx-auto mb-3" />
            <p className="text-[#94A3B8]">Không tìm thấy sản phẩm</p>
          </div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold text-[#0F172A] mb-5">Thêm sản phẩm mới</h2>
            <form onSubmit={handleCreate}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Tên sản phẩm</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nhập tên sản phẩm..." className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Danh mục</label>
                  <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E] bg-white">
                    <option value="">Chọn danh mục...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Thương hiệu</label>
                  <input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="Thương hiệu..." className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Giá bán (₫)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="₫0" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Giá khuyến mãi (₫)</label>
                  <input type="number" value={formData.salePrice} onChange={e => setFormData({...formData, salePrice: e.target.value})} placeholder="₫0" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Số lượng</label>
                  <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} placeholder="0" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Trọng lượng (kg)</label>
                  <input type="number" step="0.1" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder="0.5" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Hình ảnh (URLs, cách nhau bởi dấu phẩy)</label>
                  <input value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} placeholder="https://img1.jpg, https://img2.jpg..." className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Mô tả</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} placeholder="Mô tả sản phẩm..." className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E] resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-3 border border-[#E2E8F0] text-[#475569] font-semibold rounded-xl hover:bg-[#F8FAFC] transition-colors text-sm">Huỷ</button>
                <button type="submit" disabled={submitting} className="flex-1 flex justify-center py-3 bg-[#22C55E] text-white font-semibold rounded-xl hover:bg-[#16A34A] transition-colors text-sm disabled:opacity-70">
                  {submitting ? <Loader2 className="animate-spin" size={20} /> : "Thêm sản phẩm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
