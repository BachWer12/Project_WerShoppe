export default function AdminVouchers() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">Quản lý Voucher (Mã giảm giá)</h1>
        <button className="px-5 py-2.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-colors flex items-center gap-2">
          <span>+</span> Thêm Voucher mới
        </button>
      </div>
      
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm mb-6">
        <div className="p-4 border-b border-[#E2E8F0] flex gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm mã voucher..."
            className="flex-1 px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
          />
          <select className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB]">
            <option>Tất cả trạng thái</option>
            <option>Đang diễn ra</option>
            <option>Sắp diễn ra</option>
            <option>Đã kết thúc</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] text-[#475569] text-sm border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã Voucher</th>
                <th className="px-6 py-4 font-semibold">Loại giảm giá</th>
                <th className="px-6 py-4 font-semibold">Mức giảm</th>
                <th className="px-6 py-4 font-semibold">Đã dùng / Tổng</th>
                <th className="px-6 py-4 font-semibold">Thời gian</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {[
                { code: "SUMMER2026", type: "Phần trăm", discount: "15%", usage: "450 / 1000", time: "01/06 - 30/06", status: "Đang diễn ra", color: "text-[#16A34A] bg-[#DCFCE7]" },
                { code: "FREESHIP50K", type: "Phí vận chuyển", discount: "Tối đa 50k", usage: "1284 / 2000", time: "10/06 - 15/06", status: "Đang diễn ra", color: "text-[#16A34A] bg-[#DCFCE7]" },
                { code: "NEWUSER100", type: "Số tiền", discount: "100.000₫", usage: "56 / 500", time: "15/06 - 30/06", status: "Sắp diễn ra", color: "text-[#D97706] bg-[#FEF3C7]" },
                { code: "FLASHMAY", type: "Phần trăm", discount: "20%", usage: "2000 / 2000", time: "01/05 - 05/05", status: "Đã kết thúc", color: "text-[#64748B] bg-[#F1F5F9]" },
              ].map((v, i) => (
                <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#0F172A]">{v.code}</td>
                  <td className="px-6 py-4">{v.type}</td>
                  <td className="px-6 py-4 text-[#E11D48] font-semibold">{v.discount}</td>
                  <td className="px-6 py-4 font-medium">{v.usage}</td>
                  <td className="px-6 py-4 text-[#64748B] text-sm">{v.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${v.color}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#2563EB] font-medium hover:underline mr-3">Sửa</button>
                    <button className="text-[#DC2626] font-medium hover:underline">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
