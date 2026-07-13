import { useState } from "react";
import AdminSidebar from "../admin/AdminSidebar";
import AdminDashboard from "../admin/AdminDashboard";
import AdminUsers from "../admin/AdminUsers";
import AdminProducts from "../admin/AdminProducts";
import AdminOrders from "../admin/AdminOrders";
import AdminSellers from "../admin/AdminSellers";
import AdminSettings from "../admin/AdminSettings";
import AdminReports from "../admin/AdminReports";
import AdminVouchers from "../admin/AdminVouchers";
import AdminComplaints from "../admin/AdminComplaints";
import AdminLoginPage from "../admin/LoginPage";
import { useAuth } from "../context/AuthContext";

export type AdminPage = "dashboard" | "users" | "sellers" | "products" | "orders" | "reports" | "settings" | "vouchers" | "complaints";

interface Props {
  onExit: () => void;
}

export default function AdminPortal({ onExit }: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  const [page, setPage] = useState<AdminPage>("dashboard");

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLoginPage onLoginSuccess={() => setPage("dashboard")} onExit={onExit} />;
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <AdminDashboard />;
      case "users": return <AdminUsers />;
      case "sellers": return <AdminSellers />;
      case "products": return <AdminProducts />;
      case "orders": return <AdminOrders />;
      case "reports": return <AdminReports />;
      case "settings": return <AdminSettings />;
      case "vouchers": return <AdminVouchers />;
      case "complaints": return <AdminComplaints />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AdminSidebar page={page} onNavigate={setPage} onExit={onExit} />
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
