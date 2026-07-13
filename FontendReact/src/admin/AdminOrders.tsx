export default function AdminOrders() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Quản lý Đơn hàng</h1>
      
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm mb-6">
        <div className="p-4 border-b border-[#E2E8F0] flex gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm mã đơn hàng, tên khách hàng..."
            className="flex-1 px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
          />
          <select className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB]">
            <option>Tất cả trạng thái</option>
            <option>Chờ xác nhận</option>
            <option>Đang giao</option>
            <option>Đã giao</option>
            <option>Đã hủy</option>
          </select>
          <input type="date" className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB]" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] text-[#475569] text-sm border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã đơn</th>
                <th className="px-6 py-4 font-semibold">Khách hàng</th>
                <th className="px-6 py-4 font-semibold">Cửa hàng</th>
                <th className="px-6 py-4 font-semibold">Tổng tiền</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold">Ngày đặt</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {[
                { id: "ORD-9821", buyer: "Nguyễn Văn A", store: "TechStore VN", total: "2.450.000₫", status: "Đã giao", color: "text-[#16A34A] bg-[#DCFCE7]", date: "10/06/2026" },
                { id: "ORD-9822", buyer: "Trần Thị B", store: "Beauty Box", total: "450.000₫", status: "Đang giao", color: "text-[#2563EB] bg-[#DBEAFE]", date: "11/06/2026" },
                { id: "ORD-9823", buyer: "Lê Văn C", store: "TechStore VN", total: "1.200.000₫", status: "Chờ xác nhận", color: "text-[#D97706] bg-[#FEF3C7]", date: "11/06/2026" },
                { id: "ORD-9824", buyer: "Phạm D", store: "Home Decor", total: "890.000₫", status: "Đã hủy", color: "text-[#DC2626] bg-[#FEE2E2]", date: "12/06/2026" },
              ].map((order) => (
                <tr key={order.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 font-medium text-[#0F172A]">{order.id}</td>
                  <td className="px-6 py-4">{order.buyer}</td>
                  <td className="px-6 py-4 text-[#2563EB]">{order.store}</td>
                  <td className="px-6 py-4 font-semibold">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#64748B] text-sm">{order.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#2563EB] font-medium hover:underline">Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#E2E8F0] flex justify-between items-center text-sm text-[#64748B]">
          <span>Hiển thị 1 - 10 của 1,284 đơn hàng</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#E2E8F0] rounded hover:bg-[#F1F5F9]">Trước</button>
            <button className="px-3 py-1 border border-[#E2E8F0] rounded hover:bg-[#F1F5F9]">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
}
