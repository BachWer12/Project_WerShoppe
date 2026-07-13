import { Search, ShoppingCart, Bell, HelpCircle, Globe, ChevronDown } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#f53d2d] bg-gradient-to-b from-[#f53d2d] to-[#ff6633] text-white">
      {/* Top Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex h-8 items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white/80 transition">Kênh Người Bán</a>
            <span className="opacity-50">|</span>
            <a href="#" className="hover:text-white/80 transition">Trở thành Người bán Shopee</a>
            <span className="opacity-50">|</span>
            <a href="#" className="hover:text-white/80 transition">Tải ứng dụng</a>
            <span className="opacity-50">|</span>
            <span className="flex items-center space-x-1 hover:text-white/80 transition cursor-pointer">
              <span>Kết nối</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center space-x-1 hover:text-white/80 transition">
              <Bell className="h-3 w-3" />
              <span>Thông báo</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-white/80 transition">
              <HelpCircle className="h-3 w-3" />
              <span>Hỗ trợ</span>
            </a>
            <div className="flex items-center space-x-1 hover:text-white/80 transition cursor-pointer">
              <Globe className="h-3 w-3" />
              <span>Tiếng Việt</span>
              <ChevronDown className="h-3 w-3" />
            </div>
            <a href="#" className="font-medium hover:text-white/80 transition">Đăng ký</a>
            <span className="opacity-50">|</span>
            <a href="#" className="font-medium hover:text-white/80 transition">Đăng nhập</a>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex h-[84px] items-center justify-between gap-8 pb-4 pt-4">
          {/* Logo */}
          <div className="flex items-center text-3xl font-bold tracking-tight cursor-pointer">
            <ShoppingCart className="mr-2 h-8 w-8" />
            Shopee
          </div>

          {/* Search */}
          <div className="flex-1 max-w-[840px]">
            <div className="relative flex w-full items-center rounded bg-white p-1">
              <Input 
                placeholder="Shopee bao ship 0Đ - Đăng ký ngay!" 
                className="h-9 border-none bg-transparent shadow-none focus-visible:ring-0 text-black px-4"
              />
              <Button size="icon" className="h-9 w-16 shrink-0 rounded-sm bg-[#fb5533] hover:bg-[#fb5533]/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {/* Search Suggestion */}
            <div className="mt-1 flex items-center space-x-3 text-xs text-white/90">
              <a href="#">Dép</a>
              <a href="#">Áo Phông</a>
              <a href="#">Áo Khoác</a>
              <a href="#">Túi Xách Nữ</a>
              <a href="#">Balo</a>
              <a href="#">Quần Ống Rộng</a>
              <a href="#">Áo Thun</a>
              <a href="#">Tai Nghe Bluetooth</a>
            </div>
          </div>

          {/* Cart */}
          <div className="flex w-24 justify-center items-center">
            <div className="relative cursor-pointer group">
              <ShoppingCart className="h-7 w-7 text-white" />
              <span className="absolute -top-2 -right-3 flex h-5 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#ee4d2d] border-2 border-[#ee4d2d]">
                3
              </span>
              {/* Mini Cart Popover mock */}
              <div className="absolute right-0 top-full hidden pt-4 group-hover:block z-50">
                <div className="w-[400px] rounded-sm bg-white shadow-[0_1px_5px_rgba(0,0,0,0.2)]">
                  <div className="p-4 text-sm text-gray-400">Sản phẩm mới thêm</div>
                  {/* Cart Item */}
                  <div className="flex items-center gap-2 p-2 hover:bg-slate-50 text-black">
                    <img src="https://picsum.photos/40/40?1" alt="Cart item" className="h-10 w-10 border object-cover" />
                    <div className="flex-1 truncate text-sm">Điện thoại iPhone 15 Pro Max 256GB VN/A</div>
                    <div className="text-[#ee4d2d] font-medium">₫29.990.000</div>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-slate-50 text-black">
                    <img src="https://picsum.photos/40/40?2" alt="Cart item" className="h-10 w-10 border object-cover" />
                    <div className="flex-1 truncate text-sm">Ốp lưng iPhone 15 Pro Max</div>
                    <div className="text-[#ee4d2d] font-medium">₫150.000</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 mt-2">
                    <span className="text-xs text-black">Thêm 1 sản phẩm vào giỏ hàng</span>
                    <Button className="bg-[#ee4d2d] hover:bg-[#ee4d2d]/90 rounded-sm">Xem Giỏ Hàng</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
