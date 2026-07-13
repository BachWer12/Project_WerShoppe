export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-[#ee4d2d] pt-12 pb-8 mt-16 text-gray-500 text-xs">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-xs uppercase">Chăm Sóc Khách Hàng</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Trung Tâm Trợ Giúp</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Shopee Blog</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Shopee Mall</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Hướng Dẫn Mua Hàng</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Hướng Dẫn Bán Hàng</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Thanh Toán</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Shopee Xu</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Vận Chuyển</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Trả Hàng & Hoàn Tiền</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-xs uppercase">Về Shopee</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Giới Thiệu Về Shopee Việt Nam</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Tuyển Dụng</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Điều Khoản Shopee</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Chính Sách Bảo Mật</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Chính Hãng</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Kênh Người Bán</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Flash Sales</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-xs uppercase">Thanh Toán</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">Visa</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">JCB</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">Amex</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">COD</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">Pay</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">SPay</div>
            </div>
            <h3 className="font-bold text-gray-800 mb-4 text-xs uppercase">Đơn Vị Vận Chuyển</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">SPX</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">GHN</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">Viettel</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">VNPost</div>
              <div className="h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center p-1">J&T</div>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-xs uppercase">Theo Dõi Chúng Tôi Trên</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[#ee4d2d] transition flex items-center gap-2"><span>Facebook</span></a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition flex items-center gap-2"><span>Instagram</span></a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition flex items-center gap-2"><span>LinkedIn</span></a></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-xs uppercase">Tải Ứng Dụng Shopee Ngay Thôi</h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center">
                QR
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <div className="h-6 w-20 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center text-[10px]">App Store</div>
                <div className="h-6 w-20 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center text-[10px]">Google Play</div>
                <div className="h-6 w-20 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center text-[10px]">AppGallery</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex justify-between items-center text-sm">
          <p>© 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
          <div className="flex gap-2 text-xs text-gray-500">
            <span>Quốc gia & Khu vực:</span>
            <a href="#" className="hover:text-[#ee4d2d] transition">Singapore</a> |
            <a href="#" className="hover:text-[#ee4d2d] transition">Indonesia</a> |
            <a href="#" className="hover:text-[#ee4d2d] transition">Đài Loan</a> |
            <a href="#" className="hover:text-[#ee4d2d] transition">Thái Lan</a> |
            <a href="#" className="hover:text-[#ee4d2d] transition">Malaysia</a> |
            <a href="#" className="hover:text-[#ee4d2d] transition">Việt Nam</a> |
            <a href="#" className="hover:text-[#ee4d2d] transition">Philippines</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
