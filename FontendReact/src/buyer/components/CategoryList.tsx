export default function CategoryList() {
  const categories = [
    { id: 1, name: "Thời Trang Nam", image: "https://picsum.photos/100/100?c=1" },
    { id: 2, name: "Điện Thoại & Phụ Kiện", image: "https://picsum.photos/100/100?c=2" },
    { id: 3, name: "Thiết Bị Điện Tử", image: "https://picsum.photos/100/100?c=3" },
    { id: 4, name: "Máy Tính & Laptop", image: "https://picsum.photos/100/100?c=4" },
    { id: 5, name: "Máy Ảnh & Máy Quay Phim", image: "https://picsum.photos/100/100?c=5" },
    { id: 6, name: "Đồng Hồ", image: "https://picsum.photos/100/100?c=6" },
    { id: 7, name: "Giày Dép Nam", image: "https://picsum.photos/100/100?c=7" },
    { id: 8, name: "Thiết Bị Điện Gia Dụng", image: "https://picsum.photos/100/100?c=8" },
    { id: 9, name: "Thể Thao & Du Lịch", image: "https://picsum.photos/100/100?c=9" },
    { id: 10, name: "Ô Tô & Xe Máy & Xe Đạp", image: "https://picsum.photos/100/100?c=10" },
    { id: 11, name: "Thời Trang Nữ", image: "https://picsum.photos/100/100?c=11" },
    { id: 12, name: "Mẹ & Bé", image: "https://picsum.photos/100/100?c=12" },
    { id: 13, name: "Nhà Cửa & Đời Sống", image: "https://picsum.photos/100/100?c=13" },
    { id: 14, name: "Sắc Đẹp", image: "https://picsum.photos/100/100?c=14" },
    { id: 15, name: "Sức Khỏe", image: "https://picsum.photos/100/100?c=15" },
    { id: 16, name: "Giày Dép Nữ", image: "https://picsum.photos/100/100?c=16" },
    { id: 17, name: "Túi Ví Nữ", image: "https://picsum.photos/100/100?c=17" },
    { id: 18, name: "Phụ Kiện & Trang Sức Nữ", image: "https://picsum.photos/100/100?c=18" },
    { id: 19, name: "Bách Hóa Online", image: "https://picsum.photos/100/100?c=19" },
    { id: 20, name: "Nhà Sách Online", image: "https://picsum.photos/100/100?c=20" },
  ]

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="bg-white rounded-sm shadow-sm">
        <div className="h-[60px] flex items-center px-5 border-b border-gray-100">
          <h2 className="text-gray-500 uppercase font-medium">Danh Mục</h2>
        </div>
        
        {/* Category Grid */}
        <div className="grid grid-cols-10 border-l border-t border-gray-100">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 hover:shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:z-10 bg-white transition-all cursor-pointer h-[150px]"
            >
              <div className="w-[80px] h-[80px] mb-2 relative">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-contain rounded-full bg-gray-50 p-2"
                />
              </div>
              <span className="text-[14px] text-center text-gray-700 leading-tight line-clamp-2 px-1">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
