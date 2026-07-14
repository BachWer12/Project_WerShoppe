import { useState, useEffect } from "react";
import { Search, CheckCircle, XCircle, Eye, Plus, Loader2 } from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Input from "../components/Input";
import api from "../lib/api";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");
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

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/admin/products/${id}/status`, { status });
      fetchProducts();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

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
      await api.post("/admin/products", payload);
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Failed to create product", err);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = products.filter(p => {
    const match = p.name.toLowerCase().includes(search.toLowerCase());
    return match && (statusFilter === "all" || p.status === statusFilter || p.status.toLowerCase() === statusFilter);
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Quản lý sản phẩm</h1>
          <p className="text-sm text-[#94A3B8]">Danh sách toàn bộ sản phẩm trên hệ thống</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus size={16} /> Tạo sản phẩm
          </Button>
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-4 h-10">
            <Search size={16} className="text-[#94A3B8]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm sản phẩm..." className="bg-transparent text-sm w-48 focus:outline-none" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-3 border border-[#E2E8F0] bg-white rounded-xl text-sm focus:outline-none">
            <option value="all">Tất cả</option>
            <option value="PENDING_APPROVAL">Chờ duyệt</option>
            <option value="ACTIVE">Đã duyệt</option>
            <option value="REJECTED">Từ chối</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-[#94A3B8]" /></div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {["Sản phẩm", "Shop", "Danh mục", "Giá", "Tồn kho", "Trạng thái", "Thao tác"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase">{h}</th>
                ))}
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
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={img} alt={p.name} className="w-12 h-12 object-cover rounded-xl" />
                      <span className="text-sm font-medium text-[#0F172A] line-clamp-2 max-w-48">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#475569]">{p.shop ? p.shop.shopName : "Admin"}</td>
                  <td className="px-4 py-4 text-xs text-[#94A3B8]">{p.category?.name}</td>
                  <td className="px-4 py-4 text-sm font-bold text-[#0F172A]">₫{p.price.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-[#475569]">{p.stock}</td>
                  <td className="px-4 py-4">
                    <Badge variant={p.status === "ACTIVE" ? "success" : p.status === "PENDING_APPROVAL" ? "pending" : "cancelled"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      {p.status === "PENDING_APPROVAL" && (
                        <>
                          <button onClick={() => updateStatus(p.id, "ACTIVE")} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-[#94A3B8] hover:text-[#22C55E] transition-colors"><CheckCircle size={14} /></button>
                          <button onClick={() => updateStatus(p.id, "REJECTED")} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors"><XCircle size={14} /></button>
                        </>
                      )}
                      {p.status === "ACTIVE" && (
                        <button onClick={() => updateStatus(p.id, "REJECTED")} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors"><XCircle size={14} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Tạo sản phẩm mới</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Tên sản phẩm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                <div>
                  <label className="block text-sm font-medium mb-1">Danh mục</label>
                  <select className="w-full h-10 px-3 border rounded-xl bg-slate-50" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} required>
                    <option value="">Chọn danh mục...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input type="number" label="Giá bán (₫)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                <Input type="number" label="Giá khuyến mãi (₫)" value={formData.salePrice} onChange={e => setFormData({...formData, salePrice: e.target.value})} />
                <Input type="number" label="Tồn kho" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Thương hiệu" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
                <Input type="number" label="Trọng lượng (kg)" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
              </div>
              <Input label="Hình ảnh (URLs, cách nhau bởi dấu phẩy)" value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} placeholder="https://img1.jpg, https://img2.jpg..." />
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea className="w-full p-3 border rounded-xl bg-slate-50 min-h-[100px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? <Loader2 className="animate-spin" /> : "Lưu sản phẩm"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
