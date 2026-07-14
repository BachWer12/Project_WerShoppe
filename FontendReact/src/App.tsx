import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Storefront from "./pages/Storefront";
import ProductDetail from "./pages/ProductDetail";
import VerifyOtp from "./pages/VerifyOtp";
import BuyerPortal from "./portals/BuyerPortal";
import SellerPortal from "./portals/SellerPortal";
import AdminPortal from "./portals/AdminPortal";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const token = Cookies.get('accessToken');
  if (!token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Storefront />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/register" element={<Navigate to="/" />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      
      {/* Protected Routes */}
      <Route path="/buyer/*" element={
        <ProtectedRoute>
          <BuyerPortal onExit={() => window.location.href = '/'} />
        </ProtectedRoute>
      } />
      <Route path="/seller/*" element={
        <ProtectedRoute>
          <SellerPortal onExit={() => window.location.href = '/'} />
        </ProtectedRoute>
      } />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminPortal onExit={() => window.location.href = '/'} />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={<Navigate to="/buyer" />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
