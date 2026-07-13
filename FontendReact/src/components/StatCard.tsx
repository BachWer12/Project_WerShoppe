import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  label: string;
  value: string;
  change?: number;
  icon: ReactNode;
  color: string;
  bg: string;
}

export default function StatCard({ label, value, change, icon, color, bg }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: bg }}>
          <span style={{ color }}>{icon}</span>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${change >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
            {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-[#0F172A] mb-1">{value}</div>
      <div className="text-sm text-[#94A3B8]">{label}</div>
    </div>
  );
}
