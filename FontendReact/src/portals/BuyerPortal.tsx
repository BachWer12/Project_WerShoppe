import { useState } from "react";
import Header from "../buyer/components/Header";
import Footer from "../buyer/components/Footer";
import HomePage from "../buyer/HomePage";
import ProductDetailPage from "../buyer/ProductDetailPage";
import CartPage from "../buyer/CartPage";
import CheckoutPage from "../buyer/CheckoutPage";
import OrderHistoryPage from "../buyer/OrderHistoryPage";
import ProfilePage from "../buyer/ProfilePage";
import SearchPage from "../buyer/SearchPage";
import LoginPage from "../buyer/LoginPage";
import WalletPage from "../buyer/WalletPage";
import PaymentSuccessPage from "../buyer/PaymentSuccessPage";

export type BuyerPage = "home" | "product" | "cart" | "checkout" | "orders" | "profile" | "search" | "login" | "wallet" | "payment-success";

interface Props {
  onExit: () => void;
}

export default function BuyerPortal({ onExit }: Props) {
  const [page, setPage] = useState<BuyerPage>("home");
  const [cartCount, setCartCount] = useState(3);

  const nav = (p: BuyerPage) => setPage(p);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={nav} />;
      case "product": return <ProductDetailPage onNavigate={nav} onAddToCart={() => setCartCount(c => c + 1)} />;
      case "cart": return <CartPage onNavigate={nav} />;
      case "checkout": return <CheckoutPage onNavigate={nav} />;
      case "orders": return <OrderHistoryPage onNavigate={nav} />;
      case "profile": return <ProfilePage onNavigate={nav} />;
      case "search": return <SearchPage onNavigate={nav} />;
      case "login": return <LoginPage onNavigate={nav} />;
      case "wallet": return <WalletPage />;
      case "payment-success": return <PaymentSuccessPage onNavigate={nav} />;
      default: return <HomePage onNavigate={nav} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">
      <Header />
      <div className="pt-0">{renderPage()}</div>
      <Footer />
    </div>
  );
}
