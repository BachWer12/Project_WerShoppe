export default function SellerWallet() {
  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Ví người bán</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-12 blur-xl"></div>
          
          <div className="relative z-10">
            <div className="text-blue-100 text-sm mb-2 font-medium">Số dư khả dụng</div>
            <div className="text-5xl font-bold mb-8">₫124.560.000</div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-[#2563EB] rounded-xl text-sm font-bold shadow-md hover:bg-blue-50 transition-colors">
                Rút tiền
              </button>
              <button className="px-6 py-3 bg-blue-700/50 hover:bg-blue-700/70 rounded-xl text-sm font-bold transition-colors border border-blue-500/30">
                Thêm thẻ/tài khoản
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-center gap-4">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-sm text-[#64748B] mb-1">Đang chờ xử lý (Chưa thanh toán)</div>
            <div className="text-2xl font-bold text-[#D97706]">₫8.200.000</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-sm text-[#64748B] mb-1">Doanh thu tạm tính tháng này</div>
            <div className="text-2xl font-bold text-[#16A34A]">₫45.780.000</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#0F172A]">Lịch sử giao dịch</h2>
          <div className="flex gap-3">
            <select className="px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm font-medium focus:outline-none focus:border-[#2563EB]">
              <option>Tất cả giao dịch</option>
              <option>Rút tiền</option>
              <option>Tiền vào</option>
            </select>
            <input type="date" className="px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-[#F8FAFC] text-[#475569] text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Mã giao dịch</th>
              <th className="px-6 py-4 font-semibold">Thời gian</th>
              <th className="px-6 py-4 font-semibold">Loại</th>
              <th className="px-6 py-4 font-semibold">Số tiền</th>
              <th className="px-6 py-4 font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {[
              { id: "TXN-982145", date: "12/06/2026 14:30", type: "Rút tiền về Vietcombank", amount: "-₫50.000.000", color: "text-[#DC2626]", status: "Thành công", statusColor: "text-[#16A34A] bg-[#DCFCE7]" },
              { id: "TXN-982144", date: "12/06/2026 09:15", type: "Thanh toán đơn hàng ORD-9821", amount: "+₫2.450.000", color: "text-[#16A34A]", status: "Thành công", statusColor: "text-[#16A34A] bg-[#DCFCE7]" },
              { id: "TXN-982130", date: "11/06/2026 16:45", type: "Rút tiền về Vietcombank", amount: "-₫20.000.000", color: "text-[#DC2626]", status: "Đang xử lý", statusColor: "text-[#D97706] bg-[#FEF3C7]" },
              { id: "TXN-982110", date: "10/06/2026 11:20", type: "Thanh toán đơn hàng ORD-9755", amount: "+₫890.000", color: "text-[#16A34A]", status: "Thành công", statusColor: "text-[#16A34A] bg-[#DCFCE7]" },
              { id: "TXN-982055", date: "09/06/2026 15:00", type: "Phí dịch vụ quảng cáo", amount: "-₫500.000", color: "text-[#DC2626]", status: "Thành công", statusColor: "text-[#16A34A] bg-[#DCFCE7]" },
            ].map((txn, i) => (
              <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="px-6 py-4 font-medium text-[#0F172A]">{txn.id}</td>
                <td className="px-6 py-4 text-[#64748B] text-sm">{txn.date}</td>
                <td className="px-6 py-4">{txn.type}</td>
                <td className={`px-6 py-4 font-bold ${txn.color}`}>{txn.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${txn.statusColor}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
