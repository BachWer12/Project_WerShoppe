import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

const variants: Record<string, string> = {
  primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm shadow-blue-200",
  secondary: "bg-[#0F172A] text-white hover:bg-[#1E293B]",
  outline: "border border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB] bg-white",
  ghost: "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]",
  danger: "bg-[#EF4444] text-white hover:bg-[#DC2626]",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
};

export default function Button({ variant = "primary", size = "md", loading, icon, children, className = "", disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}
