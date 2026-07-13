interface Props {
  onNavigate: (page: any) => void;
}

export default function PaymentSuccessPage({ onNavigate }: Props) {
  return (
    <div className="min-h-[80vh] bg-[#F8FAFC] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl p-10 shadow-lg border border-[#E2E8F0] max-w-lg w-full text-center relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#22C55E] to-[#10B981]"></div>
        
        <div className="w-24 h-24 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <svg className="w-12 h-12 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-extrabold text-[#0F172A] mb-4">Thanh toán thành công!</h2>
        <p className="text-[#64748B] mb-8 text-lg">
          Cảm ơn bạn đã mua sắm. Đơn hàng <span className="font-bold text-[#0F172A]">#ORD-88294</span> của bạn đã được xác nhận và đang chờ giao hàng.
        </p>

        <div className="bg-[#F8FAFC] rounded-2xl p-6 mb-8 text-left border border-[#E2E8F0]">
          <h3 className="font-bold text-[#0F172A] mb-4 border-b border-[#E2E8F0] pb-2">Tóm tắt đơn hàng</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Phương thức thanh toán</span>
              <span className="font-medium text-[#0F172A]">Thẻ tín dụng (**** 4242)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Thời gian đặt hàng</span>
              <span className="font-medium text-[#0F172A]">12/06/2026 15:45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Dự kiến giao hàng</span>
              <span className="font-medium text-[#16A34A]">14/06 - 16/06</span>
            </div>
            <div className="pt-3 border-t border-[#E2E8F0] flex justify-between items-center">
              <span className="font-bold text-[#0F172A]">Tổng cộng</span>
              <span className="font-bold text-xl text-[#E11D48]">1.250.000₫</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate("home")} 
            className="flex-1 py-3.5 bg-[#F1F5F9] text-[#475569] font-bold rounded-xl hover:bg-[#E2E8F0] transition-colors"
          >
            Tiếp tục mua sắm
          </button>
          <button 
            onClick={() => onNavigate("orders")} 
            className="flex-1 py-3.5 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-[#1D4ED8] transition-colors shadow-md shadow-blue-500/20"
          >
            Xem đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
