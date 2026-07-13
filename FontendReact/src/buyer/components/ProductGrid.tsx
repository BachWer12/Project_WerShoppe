import ProductCard, { Product } from "./ProductCard"
import { Button } from "../../components/ui/button"

export default function ProductGrid() {
  // Generate mock products
  const products: Product[] = Array.from({ length: 30 }).map((_, i) => ({
    id: `prod-${i}`,
    name: `Sản phẩm mẫu demo siêu cấp vip pro chất lượng cao dành cho người dùng Shopee - Phiên bản ${i + 1}`,
    image: `https://picsum.photos/400/400?random=${100 + i}`,
    price: Math.floor(Math.random() * 500000) + 50000,
    sold: Math.floor(Math.random() * 5000),
    location: "Hà Nội",
    isMall: i % 7 === 0,
    isFavorite: i % 3 === 0 && i % 7 !== 0,
    discount: i % 4 === 0 ? Math.floor(Math.random() * 50) + 5 : undefined,
  }))

  return (
    <div className="container mx-auto px-4 mt-8 pb-16">
      {/* Sticky Tabs */}
      <div className="sticky top-[120px] z-40 bg-white border-b-2 border-[#ee4d2d] mb-4">
        <div className="h-14 flex items-center justify-center text-[#ee4d2d] font-medium uppercase text-base">
          Gợi Ý Hôm Nay
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[10px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          className="w-[390px] h-10 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-sm bg-white"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  )
}
