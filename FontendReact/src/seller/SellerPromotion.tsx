import { useState } from "react";
import { Plus, Tag, Zap, Trash2 } from "lucide-react";
import Badge from "../components/Badge";

const VOUCHERS = [
  { code: "SALE200K", type: "fixed", value: 200000, minOrder: 500000, used: 45, limit: 100, expire: "31/12/2024", status: "active" },
  { code: "FREESHIP", type: "ship", value: 0, minOrder: 200000, used: 123, limit: 200, expire: "31/12/2024", status: "active" },
  { code: "TECHSALE30", type: "percent", value: 30, minOrder: 2000000, used: 67, limit: 50, expire: "20/12/2024", status: "ended" },
];

const FLASH_SALES = [
  { name: "Flash Sale Cuối Tuần", start: "14/12 00:00", end: "14/12 23:59", products: 8, status: "upcoming" },
  { name: "Super Sale 12.12", start: "12/12 00:00", end: "12/12 23:59", products: 15, status: "ended" },
];

export default function SellerPromotion() {
  const [tab, setTab] = useState<"voucher" | "flash">("voucher");
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Khuyến mãi</h1>
          <p className="text-sm text-[#94A3B8]">Quản lý voucher và flash sale</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white font-semibold rounded-xl hover:bg-[#16A34A] transition-colors text-sm">
          <Plus size={16} /> Tạo khuyến mãi
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#E2E8F0] w-fit">
        {([["voucher", "Voucher", Tag], ["flash", "Flash Sale", Zap]] as const).map(([id, label, Icon]) => (
          <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === id ? "bg-[#22C55E] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"}`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {tab === "voucher" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOUCHERS.map(v => (
            <div key={v.code} className={`bg-white rounded-2xl border overflow-hidden ${v.status === "ended" ? "border-[#E2E8F0] opacity-70" : "border-[#22C55E]/30"}`}>
              <div className="bg-gradient-to-r from-[#22C55E] to-[#059669] p-4">
                <div className="text-xl font-bold font-mono text-white">{v.code}</div>
                <div className="text-sm text-green-100">
                  {v.type === "fixed" ? `Giảm ₫${v.value.toLocaleString()}` : v.type === "ship" ? "Miễn phí vận chuyển" : `Giảm ${v.value}%`}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">Đơn tối thiểu</span>
                  <span className="font-medium text-[#0F172A]">₫{v.minOrder.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">Đã dùng</span>
                  <span className="font-medium text-[#0F172A]">{v.used}/{v.limit}</span>
                </div>
                <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${(v.used / v.limit) * 100}%` }} />
                </div>
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-[#94A3B8]">HSD: {v.expire}</span>
                  <Badge variant={v.status === "active" ? "success" : "cancelled"}>{v.status === "active" ? "Hoạt động" : "Đã kết thúc"}</Badge>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button className="w-full flex items-center justify-center gap-2 py-2 border border-[#EF4444] text-[#EF4444] text-sm font-medium rounded-xl hover:bg-red-50 transition-colors">
                  <Trash2 size={14} /> Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {FLASH_SALES.map(fs => (
            <div key={fs.name} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Zap size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">{fs.name}</h3>
                    <p className="text-sm text-[#94A3B8]">{fs.start} → {fs.end}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#475569]">{fs.products} sản phẩm</span>
                  <Badge variant={fs.status === "upcoming" ? "new" : "cancelled"}>{fs.status === "upcoming" ? "Sắp diễn ra" : "Đã kết thúc"}</Badge>
                  {fs.status !== "ended" && (
                    <button className="text-sm text-[#2563EB] font-medium hover:underline">Sửa</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[#0F172A] mb-5">Tạo Voucher mới</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Mã voucher</label>
                <input placeholder="VD: SALE200K" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm font-mono focus:outline-none focus:border-[#22C55E] uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Loại giảm</label>
                  <select className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm bg-white focus:outline-none focus:border-[#22C55E]">
                    <option>Giảm tiền cố định</option>
                    <option>Giảm phần trăm</option>
                    <option>Miễn phí ship</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Giá trị</label>
                  <input placeholder="200000" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Đơn tối thiểu</label>
                  <input placeholder="500000" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Giới hạn sử dụng</label>
                  <input placeholder="100" type="number" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Ngày hết hạn</label>
                <input type="date" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#22C55E]" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowCreate(false)} className="flex-1 py-3 border border-[#E2E8F0] text-[#475569] font-semibold rounded-xl text-sm">Huỷ</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 py-3 bg-[#22C55E] text-white font-semibold rounded-xl text-sm hover:bg-[#16A34A] transition-colors">Tạo voucher</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
