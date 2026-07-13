import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export default function Input({ label, error, prefix, suffix, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#0F172A]">{label}</label>}
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-[#94A3B8]">{prefix}</span>}
        <input
          {...props}
          className={`w-full h-11 border border-[#E2E8F0] rounded-xl bg-white text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all ${prefix ? "pl-10" : "pl-4"} ${suffix ? "pr-10" : "pr-4"} ${error ? "border-[#EF4444] focus:ring-red-100 focus:border-[#EF4444]" : ""} ${className}`}
        />
        {suffix && <span className="absolute right-3 text-[#94A3B8]">{suffix}</span>}
      </div>
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
}
