import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Badge from "./Badge";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  image: string;
  shop: string;
  badge?: "new" | "sale" | "hot";
  freeShip?: boolean;
}

interface Props {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: Props) {
  const [liked, setLiked] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-lg hover:border-[#CBD5E1] transition-all cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart size={14} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={product.badge}>{product.badge === "new" ? "MỚI" : product.badge === "sale" ? "-" + discount + "%" : "HOT"}</Badge>
          </div>
        )}
        {product.freeShip && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-[#22C55E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Free Ship</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-[#94A3B8] mb-1">{product.shop}</p>
        <h3 className="text-sm font-medium text-[#0F172A] line-clamp-2 mb-2 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="fill-[#F59E0B] text-[#F59E0B]" />
          <span className="text-xs font-medium text-[#0F172A]">{product.rating}</span>
          <span className="text-xs text-[#94A3B8]">({product.reviews})</span>
          <span className="text-xs text-[#94A3B8] ml-1">· {product.sold.toLocaleString()} đã bán</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-lg font-bold text-[#2563EB]">
              ₫{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-[#94A3B8] line-through">
                ₫{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 bg-[#EFF6FF] rounded-xl flex items-center justify-center hover:bg-[#2563EB] hover:text-white text-[#2563EB] transition-all"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
