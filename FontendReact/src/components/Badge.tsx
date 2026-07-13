interface BadgeProps {
  variant?: "new" | "sale" | "hot" | "pending" | "success" | "completed" | "cancelled" | "shipping" | "refund" | "info";
  children: React.ReactNode;
  size?: "sm" | "md";
}

const variants: Record<string, string> = {
  new: "bg-blue-50 text-blue-600 border border-blue-100",
  sale: "bg-red-50 text-red-600 border border-red-100",
  hot: "bg-orange-50 text-orange-600 border border-orange-100",
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-100",
  success: "bg-green-50 text-green-600 border border-green-100",
  completed: "bg-green-50 text-green-700 border border-green-100",
  cancelled: "bg-gray-50 text-gray-500 border border-gray-200",
  shipping: "bg-purple-50 text-purple-600 border border-purple-100",
  refund: "bg-pink-50 text-pink-600 border border-pink-100",
  info: "bg-blue-50 text-blue-700 border border-blue-100",
};

export default function Badge({ variant = "info", children, size = "sm" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"} ${variants[variant]}`}>
      {children}
    </span>
  );
}
