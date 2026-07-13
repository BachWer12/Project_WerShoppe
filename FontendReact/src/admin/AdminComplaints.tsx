export default function AdminComplaints() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Quản lý Khiếu nại</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Tổng khiếu nại", val: 914, c: "bg-blue-50 text-blue-600" },
          { label: "Đang chờ xử lý", val: 23, c: "bg-yellow-50 text-yellow-600" },
          { label: "Đang giải quyết", val: 12, c: "bg-purple-50 text-purple-600" },
          { label: "Đã hoàn tất", val: 879, c: "bg-green-50 text-green-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
            <p className="text-[#64748B] text-sm font-medium mb-2">{s.label}</p>
            <p className={`text-3xl font-bold ${s.c.split(' ')[1]}`}>{s.val}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm mb-6">
        <div className="p-4 border-b border-[#E2E8F0] flex gap-4">
          <input
            type="text"
            placeholder="Tìm mã khiếu nại, mã đơn hàng..."
            className="flex-1 px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
          />
          <select className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB]">
            <option>Trạng thái: Đang chờ</option>
            <option>Đang giải quyết</option>
            <option>Đã hoàn tất</option>
            <option>Tất cả</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] text-[#475569] text-sm border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã KN</th>
                <th className="px-6 py-4 font-semibold">Mã Đơn hàng</th>
                <th className="px-6 py-4 font-semibold">Lý do</th>
                <th className="px-6 py-4 font-semibold">Người khiếu nại</th>
                <th className="px-6 py-4 font-semibold">Ngày tạo</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {[
                { id: "CP-1029", order: "ORD-9821", reason: "Hàng lỗi, hỏng hóc", user: "Nguyễn Văn A", date: "12/06/2026", status: "Chờ xử lý", color: "text-[#D97706] bg-[#FEF3C7]" },
                { id: "CP-1030", order: "ORD-9810", reason: "Giao sai sản phẩm", user: "Lê Văn C", date: "12/06/2026", status: "Chờ xử lý", color: "text-[#D97706] bg-[#FEF3C7]" },
                { id: "CP-1025", order: "ORD-9755", reason: "Thái độ shipper kém", user: "Trần B", date: "11/06/2026", status: "Đang giải quyết", color: "text-[#7E22CE] bg-[#F3E8FF]" },
                { id: "CP-1020", order: "ORD-9632", reason: "Hàng giả/Nhái", user: "Phạm D", date: "10/06/2026", status: "Đã hoàn tất", color: "text-[#16A34A] bg-[#DCFCE7]" },
              ].map((c, i) => (
                <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 font-medium text-[#0F172A]">{c.id}</td>
                  <td className="px-6 py-4 text-[#2563EB] hover:underline cursor-pointer">{c.order}</td>
                  <td className="px-6 py-4 font-medium text-[#0F172A]">{c.reason}</td>
                  <td className="px-6 py-4">{c.user}</td>
                  <td className="px-6 py-4 text-[#64748B] text-sm">{c.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.color}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1D4ED8]">Xử lý</button>
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
