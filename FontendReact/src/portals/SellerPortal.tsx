import { useState } from "react";
import SellerSidebar from "../seller/SellerSidebar";
import SellerDashboard from "../seller/SellerDashboard";
import SellerProducts from "../seller/SellerProducts";
import SellerOrders from "../seller/SellerOrders";
import SellerAnalytics from "../seller/SellerAnalytics";
import SellerPromotion from "../seller/SellerPromotion";
import SellerProfile from "../seller/SellerProfile";
import SellerWallet from "../seller/SellerWallet";
import SellerLoginPage from "../seller/LoginPage";
import { useAuth } from "../context/AuthContext";

export type SellerPage = "dashboard" | "products" | "orders" | "analytics" | "promotion" | "profile" | "wallet";

interface Props {
  onExit: () => void;
}

export default function SellerPortal({ onExit }: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  const [page, setPage] = useState<SellerPage>("dashboard");

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return <SellerLoginPage onLoginSuccess={() => setPage("dashboard")} onExit={onExit} />;
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <SellerDashboard />;
      case "products": return <SellerProducts />;
      case "orders": return <SellerOrders />;
      case "analytics": return <SellerAnalytics />;
      case "promotion": return <SellerPromotion />;
      case "profile": return <SellerProfile />;
      case "wallet": return <SellerWallet />;
      default: return <SellerDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SellerSidebar page={page} onNavigate={setPage} onExit={onExit} />
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
