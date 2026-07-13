import { Store, MapPin, Phone, Globe, Edit3, Camera } from "lucide-react";

export default function SellerProfile() {
  return (
    <div className="p-6 max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-[#0F172A]">Hồ sơ cửa hàng</h1>

      {/* Cover + avatar */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-[#22C55E] to-[#059669] relative">
          <button className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/30 text-white text-xs font-medium rounded-lg hover:bg-black/50 transition-colors">
            <Camera size={12} /> Thay ảnh bìa
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center bg-[#22C55E] text-white text-2xl font-bold">
                T
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#22C55E] text-white rounded-full flex items-center justify-center">
                <Camera size={12} />
              </button>
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-[#0F172A]">Tech Store VN</h2>
                <span className="text-xs bg-green-50 text-[#22C55E] font-bold px-2 py-0.5 rounded-full">✓ Đã xác minh</span>
              </div>
              <p className="text-sm text-[#94A3B8]">⭐ 4.9 · 284 sản phẩm · Tham gia từ 01/2022</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#22C55E] hover:text-[#22C55E] transition-all">
              <Edit3 size={14} /> Chỉnh sửa
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-[#475569]">
              <MapPin size={14} className="text-[#94A3B8]" />
              Quận 1, TP. Hồ Chí Minh
            </div>
            <div className="flex items-center gap-2 text-sm text-[#475569]">
              <Phone size={14} className="text-[#94A3B8]" />
              0901 234 567
            </div>
            <div className="flex items-center gap-2 text-sm text-[#475569] col-span-2">
              <Globe size={14} className="text-[#94A3B8]" />
              techstorevn.werbay.vn
            </div>
          </div>
          <div className="mt-4 p-3 bg-[#F8FAFC] rounded-xl">
            <p className="text-sm text-[#475569]">
              Chuyên cung cấp thiết bị Apple chính hãng. Bảo hành theo Apple, đổi trả trong 7 ngày. Giao hàng toàn quốc. Giá tốt nhất thị trường.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Lượt theo dõi", value: "12.4K" },
          { label: "Đánh giá", value: "3,421" },
          { label: "Sản phẩm", value: "284" },
          { label: "Phản hồi trong", value: "< 2h" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#E2E8F0] text-center">
            <div className="text-2xl font-bold text-[#22C55E] mb-1">{s.value}</div>
            <div className="text-xs text-[#94A3B8]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F1F5F9]">
          <h3 className="font-bold text-[#0F172A] flex items-center gap-2"><Store size={16} /> Cài đặt cửa hàng</h3>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: "Trạng thái cửa hàng", value: "Đang hoạt động", editable: true },
            { label: "Chính sách đổi trả", value: "7 ngày đổi trả miễn phí", editable: true },
            { label: "Thời gian chuẩn bị hàng", value: "1 - 2 ngày làm việc", editable: true },
            { label: "Phương thức vận chuyển", value: "GHN Express, GHTK, Viettel Post", editable: true },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between py-3 border-b border-[#F8FAFC] last:border-0">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{s.label}</p>
                <p className="text-xs text-[#94A3B8]">{s.value}</p>
              </div>
              <button className="text-sm text-[#22C55E] font-medium hover:underline">Sửa</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
