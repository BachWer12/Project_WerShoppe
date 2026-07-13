import { useState } from "react";
import { Trash2, Plus, Minus, Tag, ChevronRight } from "lucide-react";
import Button from "../components/Button";
import type { BuyerPage } from "../portals/BuyerPortal";

const INITIAL_ITEMS = [
  { id: 1, name: "Apple iPhone 15 Pro Max 256GB Titan Đen", price: 28990000, qty: 1, shop: "Apple Store VN", image: "https://images.unsplash.com/photo-1696446701796-da61339b4f32?w=200&h=200&fit=crop&auto=format" },
  { id: 2, name: "Sony WH-1000XM5 Tai nghe Chống ồn Cao cấp", price: 6990000, qty: 2, shop: "Sony Store", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop&auto=format" },
  { id: 3, name: "Nike Air Max 270 React Sneaker Nam", price: 2890000, qty: 1, shop: "Nike Vietnam", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format" },
];

interface Props {
  onNavigate: (p: BuyerPage) => void;
}

export default function CartPage({ onNavigate }: Props) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selected, setSelected] = useState<number[]>([1, 2, 3]);
  const [voucher, setVoucher] = useState("");

  const toggle = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const updateQty = (id: number, delta: number) =>
    setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const remove = (id: number) => setItems(items.filter(i => i.id !== id));

  const subtotal = items.filter(i => selected.includes(i.id)).reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 0;
  const discount = voucher ? 200000 : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Giỏ hàng ({items.length})</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
              <div className="flex gap-4">
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggle(item.id)}
                  className="mt-1 accent-[#2563EB]"
                />
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#94A3B8] mb-1">{item.shop}</p>
                  <h3 className="text-sm font-medium text-[#0F172A] line-clamp-2 mb-3">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[#E2E8F0] rounded-xl overflow-hidden">
                      <button onClick={() => updateQty(item.id, -1)} className="w-9 h-9 flex items-center justify-center hover:bg-[#F8FAFC] text-[#475569]">
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-9 h-9 flex items-center justify-center hover:bg-[#F8FAFC] text-[#475569]">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#2563EB]">₫{(item.price * item.qty).toLocaleString()}</div>
                      <div className="text-xs text-[#94A3B8]">₫{item.price.toLocaleString()} × {item.qty}</div>
                    </div>
                  </div>
                </div>
                <button onClick={() => remove(item.id)} className="text-[#94A3B8] hover:text-[#EF4444] transition-colors self-start">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="bg-white rounded-2xl p-12 border border-[#E2E8F0] text-center">
              <p className="text-4xl mb-4">🛒</p>
              <p className="text-[#475569]">Giỏ hàng trống</p>
              <button onClick={() => onNavigate("home")} className="mt-4 text-[#2563EB] font-medium text-sm">Tiếp tục mua sắm</button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
            <h3 className="font-bold text-[#0F172A] mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">Tạm tính ({selected.length} sản phẩm)</span>
                <span className="font-medium">₫{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">Phí vận chuyển</span>
                <span className="text-[#22C55E] font-medium">Miễn phí</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#475569]">Giảm giá voucher</span>
                  <span className="text-[#EF4444] font-medium">-₫{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="h-px bg-[#E2E8F0]" />
              <div className="flex justify-between">
                <span className="font-bold text-[#0F172A]">Tổng cộng</span>
                <span className="text-xl font-bold text-[#2563EB]">₫{total.toLocaleString()}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={() => onNavigate("checkout")}>
              Tiến hành đặt hàng <ChevronRight size={16} />
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
            <h3 className="font-bold text-[#0F172A] mb-3 flex items-center gap-2">
              <Tag size={16} className="text-[#2563EB]" /> Voucher
            </h3>
            <div className="flex gap-2">
              <input
                value={voucher}
                onChange={e => setVoucher(e.target.value)}
                placeholder="Nhập mã giảm giá"
                className="flex-1 h-10 px-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
              />
              <button className="px-4 bg-[#EFF6FF] text-[#2563EB] font-semibold text-sm rounded-xl hover:bg-[#2563EB] hover:text-white transition-colors">
                Áp dụng
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {["WERBAY200", "FREESHIP100", "SALE50K"].map(code => (
                <button
                  key={code}
                  onClick={() => setVoucher(code)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-[#F8FAFC] rounded-xl border border-dashed border-[#E2E8F0] hover:border-[#2563EB] transition-colors text-sm"
                >
                  <span className="font-mono font-bold text-[#2563EB]">{code}</span>
                  <span className="text-[#94A3B8] text-xs">Áp dụng</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
