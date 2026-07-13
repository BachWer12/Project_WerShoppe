export default function AdminSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Cài đặt hệ thống</h1>
      
      <div className="max-w-4xl space-y-6">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#0F172A]">Cấu hình chung</h2>
            <p className="text-[#64748B] text-sm mt-1">Quản lý các thông tin cơ bản của nền tảng.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">Tên nền tảng</label>
                <input type="text" defaultValue="MarketPlace VN" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#2563EB]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">Email liên hệ</label>
                <input type="email" defaultValue="support@marketplace.vn" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#2563EB]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#0F172A]">Cấu hình tài chính</h2>
            <p className="text-[#64748B] text-sm mt-1">Cài đặt các loại phí và hoa hồng trên nền tảng.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">Phí hoa hồng mặc định (%)</label>
                <input type="number" defaultValue="5" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#2563EB]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">Phí rút tiền cố định (VNĐ)</label>
                <input type="number" defaultValue="11000" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#2563EB]" />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <input type="checkbox" id="auto-payout" defaultChecked className="w-5 h-5 text-[#2563EB] rounded focus:ring-[#2563EB]" />
              <label htmlFor="auto-payout" className="text-sm font-medium text-[#0F172A]">Tự động duyệt rút tiền (Dưới 10,000,000₫)</label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#0F172A]">Cấu hình vận chuyển</h2>
            <p className="text-[#64748B] text-sm mt-1">Quản lý các đối tác vận chuyển được phép.</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {['Giao Hàng Nhanh (GHN)', 'Giao Hàng Tiết Kiệm (GHTK)', 'Viettel Post', 'Ninja Van'].map((partner, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-xl">
                  <span className="font-medium text-[#0F172A]">{partner}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-2.5 bg-[#F1F5F9] text-[#475569] font-semibold rounded-xl hover:bg-[#E2E8F0] transition-colors">
            Hủy thay đổi
          </button>
          <button className="px-6 py-2.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-colors">
            Lưu cấu hình
          </button>
        </div>
      </div>
    </div>
  );
}
