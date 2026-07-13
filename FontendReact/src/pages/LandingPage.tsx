import { ShoppingBag, Store, Shield, ArrowRight, Star, Zap, Package, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";

type Portal = "landing" | "buyer" | "seller" | "admin";

interface Props {
  onNavigate: (p: Portal) => void;
}

export default function LandingPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-500 selection:text-white">
      {/* Nav with Glassmorphism */}
      <nav className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate("landing")}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <ShoppingBag size={22} className="text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 tracking-tight">
              WerBay
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate("buyer")}
              className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
            >
              Mua sắm
            </button>
            <button
              onClick={() => onNavigate("seller")}
              className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
            >
              Bán hàng
            </button>
            <Button
              onClick={() => onNavigate("admin")}
              variant="default"
              className="rounded-full px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Admin
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full mb-8 shadow-sm animate-fade-in-up">
            <Zap size={16} className="text-orange-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-500 font-bold">Multi-Vendor Marketplace Platform</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Nền tảng thương mại <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
              điện tử toàn diện
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            WerBay kết nối người mua và người bán trong một hệ sinh thái marketplace hiện đại, an toàn và mang lại hiệu quả vượt trội.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => onNavigate("buyer")}
              size="lg"
              className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_10px_25px_rgba(239,68,68,0.4)] transition-all group flex items-center gap-2"
            >
              <ShoppingBag size={20} />
              Vào cửa hàng
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => onNavigate("seller")}
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg rounded-full border-2 border-gray-200 bg-white hover:bg-gray-50 text-slate-700 font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2 hover:border-orange-200"
            >
              <Store size={20} className="text-orange-500" />
              Bắt đầu bán hàng
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 -mt-4 mb-20">
        <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-wrap justify-between items-center gap-8">
          {[
            { label: "Người mua", value: "2.4M+", color: "from-blue-500 to-cyan-400" },
            { label: "Người bán", value: "180K+", color: "from-green-500 to-emerald-400" },
            { label: "Sản phẩm", value: "12M+", color: "from-orange-500 to-yellow-400" },
            { label: "Đơn hàng/ngày", value: "85K+", color: "from-purple-500 to-pink-400" },
          ].map((s) => (
            <div key={s.label} className="text-center flex-1 min-w-[150px]">
              <div className={`text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br ${s.color}`}>
                {s.value}
              </div>
              <div className="text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Chọn vai trò của bạn</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Trải nghiệm các tính năng được thiết kế riêng biệt để tối ưu hóa hiệu quả cho từng vai trò trong hệ sinh thái của chúng tôi.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Buyer */}
          <div
            onClick={() => onNavigate("buyer")}
            className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(239,68,68,0.1)] hover:-translate-y-2 cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-200">
              <ShoppingBag size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Người Mua</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">Khám phá hàng triệu sản phẩm, mua sắm dễ dàng, an toàn và theo dõi đơn hàng của bạn mọi lúc mọi nơi.</p>
            <ul className="space-y-4 mb-8">
              {["Tìm kiếm & khám phá sản phẩm", "Giỏ hàng & thanh toán thông minh", "Theo dõi đơn hàng real-time", "Đánh giá & nhận xét chân thực"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">✓</div>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-orange-600 font-bold group-hover:gap-4 transition-all">
              Vào mua sắm <ArrowRight size={20} />
            </div>
          </div>

          {/* Seller */}
          <div
            onClick={() => onNavigate("seller")}
            className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(34,197,94,0.1)] hover:-translate-y-2 cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-200">
              <Store size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Người Bán</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">Quản lý cửa hàng chuyên nghiệp, theo dõi sản phẩm, đơn hàng và phân tích doanh thu chi tiết để tăng trưởng.</p>
            <ul className="space-y-4 mb-8">
              {["Quản lý sản phẩm & kho hàng", "Xử lý đơn hàng nhanh chóng", "Báo cáo doanh thu & Analytics", "Công cụ Marketing & khuyến mãi"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-green-600 font-bold group-hover:gap-4 transition-all">
              Vào quản lý <ArrowRight size={20} />
            </div>
          </div>

          {/* Admin */}
          <div
            onClick={() => onNavigate("admin")}
            className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:-translate-y-2 cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
              <Shield size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Quản Trị</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">Kiểm soát toàn bộ hệ thống, quản lý người dùng, duyệt sản phẩm và thiết lập cấu hình nền tảng tổng thể.</p>
            <ul className="space-y-4 mb-8">
              {["Quản lý người dùng & seller", "Duyệt sản phẩm & đơn hàng", "Cấu hình hệ thống linh hoạt", "Báo cáo & phân tích toàn cảnh"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">✓</div>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
              Vào quản trị <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden mt-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">Tính năng nổi bật</h2>
            <p className="text-xl text-slate-400">Được thiết kế cho trải nghiệm mua sắm và bán hàng hoàn hảo nhất</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Flash Sale", desc: "Ưu đãi thời gian thực, cập nhật liên tục với độ trễ bằng 0.", color: "text-orange-500" },
              { icon: Package, title: "Đa dạng sản phẩm", desc: "Hàng triệu sản phẩm phong phú từ mọi danh mục, ngành hàng.", color: "text-blue-500" },
              { icon: TrendingUp, title: "Analytics", desc: "Bảng điều khiển phân tích dữ liệu chuyên sâu theo thời gian thực.", color: "text-green-500" },
              { icon: Star, title: "Đánh giá tin cậy", desc: "Hệ thống đánh giá minh bạch, kiểm duyệt chặt chẽ, chống gian lận.", color: "text-yellow-400" },
            ].map(({ icon: Icon, title, desc, color }, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:bg-slate-800 transition-colors group">
                <div className={`w-14 h-14 rounded-xl bg-slate-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl text-white font-bold mb-3">{title}</h3>
                <p className="text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900">WerBay</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-orange-600 transition-colors">Về chúng tôi</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Chính sách</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Liên hệ</a>
          </div>
          <p className="text-sm text-slate-400 font-medium">© 2024 WerBay. Multi-Vendor Marketplace Platform.</p>
        </div>
      </footer>
    </div>
  );
}
