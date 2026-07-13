import { useState } from "react";
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard, TrendingUp } from "lucide-react";
import Badge from "../components/Badge";

const TRANSACTIONS = [
  { id: 1, type: "in", label: "Hoàn tiền đơn #WB230045", amount: 280000, date: "12/12/2024", status: "success" as const },
  { id: 2, type: "out", label: "Thanh toán đơn #WB240001", amount: -28990000, date: "10/12/2024", status: "success" as const },
  { id: 3, type: "in", label: "Nạp tiền từ thẻ Visa *4242", amount: 5000000, date: "08/12/2024", status: "success" as const },
  { id: 4, type: "out", label: "Thanh toán đơn #WB230099", amount: -1890000, date: "05/12/2024", status: "success" as const },
  { id: 5, type: "in", label: "Hoàn tiền voucher SALE50K", amount: 50000, date: "03/12/2024", status: "success" as const },
];

export default function WalletPage() {
  const [tab, setTab] = useState<"topup" | "withdraw" | null>(null);
  const [amount, setAmount] = useState("");

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Ví WerBay</h1>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-3xl p-7 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <span className="font-medium opacity-80">Số dư khả dụng</span>
          </div>
          <div className="text-4xl font-bold mb-1">₫2.450.000</div>
          <p className="text-blue-200 text-sm">Điểm thưởng: 1,240 pts</p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setTab("topup")}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors"
            >
              <Plus size={16} /> Nạp tiền
            </button>
            <button
              onClick={() => setTab("withdraw")}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors"
            >
              <ArrowUpRight size={16} /> Rút tiền
            </button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Tổng nạp tháng này", value: "₫5.000.000", icon: ArrowDownLeft, color: "#22C55E" },
          { label: "Tổng chi tháng này", value: "₫30.880.000", icon: ArrowUpRight, color: "#EF4444" },
          { label: "Tổng giao dịch", value: "24 giao dịch", icon: TrendingUp, color: "#2563EB" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={16} style={{ color: s.color }} />
              <span className="text-xs text-[#94A3B8]">{s.label}</span>
            </div>
            <div className="text-lg font-bold text-[#0F172A]">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Top up / Withdraw form */}
      {tab && (
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] mb-6">
          <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            {tab === "topup" ? <><Plus size={16} className="text-[#22C55E]" /> Nạp tiền</> : <><ArrowUpRight size={16} className="text-[#2563EB]" /> Rút tiền</>}
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {["100.000", "200.000", "500.000", "1.000.000", "2.000.000", "5.000.000"].map(v => (
              <button key={v} onClick={() => setAmount(v)} className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${amount === v ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]" : "border-[#E2E8F0] text-[#475569] hover:border-[#2563EB]"}`}>
                ₫{v}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Hoặc nhập số tiền khác" className="flex-1 h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
            <button className="px-6 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-colors text-sm">
              {tab === "topup" ? "Nạp ngay" : "Rút ngay"}
            </button>
          </div>
          {tab === "topup" && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[{ label: "Thẻ ngân hàng", icon: CreditCard }, { label: "Momo", icon: () => <span>💜</span> }, { label: "ZaloPay", icon: () => <span>💙</span> }].map(m => (
                <button key={m.label} className="flex items-center gap-2 p-3 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#2563EB] transition-colors">
                  <m.icon size={16} /> {m.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F1F5F9]">
          <h3 className="font-bold text-[#0F172A]">Lịch sử giao dịch</h3>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {TRANSACTIONS.map(tx => (
            <div key={tx.id} className="flex items-center gap-4 px-5 py-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === "in" ? "bg-green-50" : "bg-red-50"}`}>
                {tx.type === "in" ? <ArrowDownLeft size={18} className="text-[#22C55E]" /> : <ArrowUpRight size={18} className="text-[#EF4444]" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#0F172A]">{tx.label}</p>
                <p className="text-xs text-[#94A3B8]">{tx.date}</p>
              </div>
              <div className="text-right">
                <div className={`font-bold ${tx.amount > 0 ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                  {tx.amount > 0 ? "+" : ""}₫{Math.abs(tx.amount).toLocaleString()}
                </div>
                <Badge variant={tx.status} size="sm">Thành công</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
