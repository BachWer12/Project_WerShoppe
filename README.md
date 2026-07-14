WerShop (chạy thử nghiệm tại demo: http://werbe.werchat.io.vn/)

Tổng quan dự án WerShop
WerShop là một nền tảng thương mại điện tử đa người bán (Multi-vendor E-commerce Marketplace) gồm 2 phần chính:

Backend (Java Spring Boot):

Chịu trách nhiệm quản lý cơ sở dữ liệu, nghiệp vụ bán hàng.
Xử lý xác thực người dùng bảo mật (JWT, OTP qua email/SMS).
Cung cấp các RESTful API cho ứng dụng frontend.
Frontend (React, TypeScript & Vite):

Giao diện hiện đại sử dụng Tailwind CSS, Zustand (quản lý state) và các component của Radix UI.
Hỗ trợ thiết kế responsive trên mọi thiết bị.
Các phân hệ giao diện chính (Portals)
Trang chủ cửa hàng (Storefront): Giao diện công khai giúp khách hàng tìm kiếm, xem danh mục và chi tiết sản phẩm.
Cổng thông tin Người mua (Buyer Portal): Quản lý giỏ hàng, thông tin cá nhân và lịch sử mua hàng.
Cổng thông tin Người bán (Seller Portal): Dành cho các shop đăng tải sản phẩm, quản lý kho hàng và đơn hàng của khách.
Cổng quản trị hệ thống (Admin Portal): Quản lý danh mục sản phẩm, người dùng (người mua/người bán) và toàn bộ hệ thống.