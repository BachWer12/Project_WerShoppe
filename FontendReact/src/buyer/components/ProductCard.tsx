import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

export interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  sold: number
  location: string
  isMall?: boolean
  isFavorite?: boolean
  discount?: number
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="rounded-sm overflow-hidden hover:border-[#ee4d2d] hover:-translate-y-[1px] hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all cursor-pointer border-transparent shadow-none bg-white relative">
      {/* Product Image */}
      <div className="relative pt-[100%]">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Mall or Favorite Badge */}
        {product.isMall && (
          <div className="absolute top-2 left-[-4px] bg-[#d0011b] text-white text-[10px] font-medium px-1 rounded-r-sm shadow-sm z-10">
            Mall
            <div className="absolute -bottom-1 left-0 border-t-[4px] border-l-[4px] border-t-[#8b0012] border-l-transparent"></div>
          </div>
        )}
        {!product.isMall && product.isFavorite && (
          <div className="absolute top-2 left-[-4px] bg-[#ee4d2d] text-white text-[10px] font-medium px-1 rounded-r-sm shadow-sm z-10">
            Yêu thích
            <div className="absolute -bottom-1 left-0 border-t-[4px] border-l-[4px] border-t-[#a83620] border-l-transparent"></div>
          </div>
        )}
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-0 right-0 bg-[#ffd839] bg-opacity-90 w-9 h-10 flex flex-col items-center justify-center text-[#ee4d2d] font-semibold z-10">
            <span className="text-[10px] leading-none mb-[2px]">{product.discount}%</span>
            <span className="text-[10px] leading-none text-white font-normal uppercase">Giảm</span>
            <div className="absolute -bottom-1 left-0 w-full flex">
              <div className="w-1/2 h-1 bg-[#ffd839] clip-path-triangle-left"></div>
              <div className="w-1/2 h-1 bg-[#ffd839] clip-path-triangle-right"></div>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-2 flex flex-col h-[130px] justify-between">
        {/* Product Name */}
        <div className="text-xs text-gray-800 line-clamp-2 leading-tight min-h-[32px] break-words">
          {product.name}
        </div>
        
        <div className="mt-2">
          {/* Price & Sold */}
          <div className="flex items-center justify-between mt-1">
            <div className="text-[#ee4d2d] font-medium flex items-baseline">
              <span className="text-xs">₫</span>
              <span className="text-base">{product.price.toLocaleString('vi-VN')}</span>
            </div>
            <div className="text-[10px] text-gray-500">
              Đã bán {product.sold >= 1000 ? (product.sold / 1000).toFixed(1) + 'k' : product.sold}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
