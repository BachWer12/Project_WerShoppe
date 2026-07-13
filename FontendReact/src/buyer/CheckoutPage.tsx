import { useState } from "react";
import { MapPin, CreditCard, Wallet, Building2, ChevronRight } from "lucide-react";
import Button from "../components/Button";
import type { BuyerPage } from "../portals/BuyerPortal";

interface Props {
  onNavigate: (p: BuyerPage) => void;
}

export default function CheckoutPage({ onNavigate }: Props) {
  const [payMethod, setPayMethod] = useState<"card" | "wallet" | "cod" | "bank">("card");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onNavigate("payment-success"); }, 1500);
  };

  const PAY_METHODS = [
    { id: "card", label: "Thẻ tín dụng / Ghi nợ", icon: CreditCard, desc: "Visa, Mastercard, JCB" },
    { id: "wallet", label: "Ví WerBay", icon: Wallet, desc: "Số dư: ₫2.450.000" },
    { id: "bank", label: "Chuyển khoản ngân hàng", icon: Building2, desc: "VCB, TCB, MB, TP Bank..." },
    { id: "cod", label: "Thanh toán khi nhận hàng", icon: () => <span className="text-lg">💵</span>, desc: "COD - Cash on delivery" },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Thanh toán</h1>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {["Giỏ hàng", "Thanh toán", "Xác nhận"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= 1 ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"}`}>
              {i + 1}
            </div>
            <span className={`text-sm font-medium ${i <= 1 ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>{s}</span>
            {i < 2 && <ChevronRight size={16} className="text-[#94A3B8]" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Address */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0F172A] flex items-center gap-2">
                <MapPin size={16} className="text-[#2563EB]" /> Địa chỉ giao hàng
              </h3>
              <button className="text-sm text-[#2563EB] font-medium">Thay đổi</button>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#0F172A]">Nguyễn Văn An</span>
                <span className="text-[#94A3B8]">|</span>
                <span className="text-[#475569] text-sm">0901 234 567</span>
                <span className="ml-1 text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full">Mặc định</span>
              </div>
              <p className="text-sm text-[#475569]">123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
            <h3 className="font-bold text-[#0F172A] mb-4">Sản phẩm đặt hàng</h3>
            <div className="space-y-4">
              {[
                { name: "Apple iPhone 15 Pro Max 256GB", price: 28990000, qty: 1, image: "https://images.unsplash.com/photo-1696446701796-da61339b4f32?w=100&h=100&fit=crop&auto=format" },
                { name: "Sony WH-1000XM5 Tai nghe", price: 6990000, qty: 2, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop&auto=format" },
              ].map(item => (
                <div key={item.name} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0F172A]">{item.name}</p>
                    <p className="text-xs text-[#94A3B8]">Số lượng: {item.qty}</p>
                  </div>
                  <span className="font-bold text-[#2563EB]">₫{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-[#475569]">Phương thức vận chuyển:</span>
                <div className="flex gap-2">
                  {["Giao hàng nhanh (30K)", "Giao hàng tiết kiệm (Free)"].map(s => (
                    <button key={s} className={`px-3 py-1 rounded-lg border text-xs font-medium ${s.includes("tiết kiệm") ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]" : "border-[#E2E8F0] text-[#475569]"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
            <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <CreditCard size={16} className="text-[#2563EB]" /> Phương thức thanh toán
            </h3>
            <div className="space-y-3">
              {PAY_METHODS.map(({ id, label, icon: Icon, desc }) => (
                <label
                  key={id}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${payMethod === id ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`}
                >
                  <input type="radio" name="pay" value={id} checked={payMethod === id} onChange={() => setPayMethod(id)} className="accent-[#2563EB]" />
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Icon size={18} className="text-[#475569]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{label}</p>
                    <p className="text-xs text-[#94A3B8]">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
            {payMethod === "card" && (
              <div className="mt-4 space-y-3">
                <input placeholder="Số thẻ" className="w-full h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM/YY" className="h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                  <input placeholder="CVV" className="h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] sticky top-20">
            <h3 className="font-bold text-[#0F172A] mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-3 mb-5">
              {[
                ["Tạm tính", "₫42.970.000"],
                ["Phí vận chuyển", "Miễn phí"],
                ["Voucher", "-₫200.000"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-[#475569]">{k}</span>
                  <span className={v.startsWith("-") ? "text-[#EF4444] font-medium" : v === "Miễn phí" ? "text-[#22C55E] font-medium" : "font-medium"}>{v}</span>
                </div>
              ))}
              <div className="h-px bg-[#E2E8F0]" />
              <div className="flex justify-between">
                <span className="font-bold">Tổng thanh toán</span>
                <span className="text-xl font-bold text-[#2563EB]">₫42.770.000</span>
              </div>
            </div>
            <Button className="w-full" size="lg" loading={loading} onClick={handlePay}>
              Đặt hàng ngay
            </Button>
            <p className="text-xs text-[#94A3B8] text-center mt-3">
              Bằng cách đặt hàng, bạn đồng ý với <span className="text-[#2563EB]">Điều khoản dịch vụ</span> của WerBay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
