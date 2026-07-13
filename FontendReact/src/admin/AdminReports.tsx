export default function AdminReports() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Báo cáo & Phân tích</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: "Tổng doanh thu nền tảng", value: "₫12.4B", trend: "+15.2%", icon: "💰", color: "bg-blue-50 text-blue-600" },
          { label: "Tổng số giao dịch", value: "84,392", trend: "+8.4%", icon: "📈", color: "bg-green-50 text-green-600" },
          { label: "Phí hoa hồng thu được", value: "₫620M", trend: "+12.1%", icon: "💎", color: "bg-purple-50 text-purple-600" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="px-2.5 py-1 bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="text-[#64748B] text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <h2 className="text-lg font-bold text-[#0F172A] mb-6">Doanh thu theo tháng</h2>
          <div className="h-64 flex items-end gap-2">
            {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-[#2563EB] rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-xs text-[#64748B]">T{i+1}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <h2 className="text-lg font-bold text-[#0F172A] mb-6">Danh mục bán chạy</h2>
          <div className="space-y-4">
            {[
              { name: "Thiết bị điện tử", percent: 45, color: "bg-blue-500" },
              { name: "Thời trang & Phụ kiện", percent: 25, color: "bg-purple-500" },
              { name: "Mỹ phẩm & Làm đẹp", percent: 15, color: "bg-pink-500" },
              { name: "Đồ gia dụng", percent: 10, color: "bg-orange-500" },
              { name: "Khác", percent: 5, color: "bg-gray-400" },
            ].map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-[#0F172A]">{cat.name}</span>
                  <span className="text-[#64748B]">{cat.percent}%</span>
                </div>
                <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div className={`h-2 rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
