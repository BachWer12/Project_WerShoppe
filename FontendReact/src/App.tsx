import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import BuyerPortal from "./portals/BuyerPortal";
import SellerPortal from "./portals/SellerPortal";
import AdminPortal from "./portals/AdminPortal";
import LandingPage from "./pages/LandingPage";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const token = Cookies.get('accessToken');
  // Add proper role checking logic based on decoded JWT or AuthContext in real app
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onNavigate={(path: string) => {}} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        
        {/* Dashboard router based on role could be added here */}
        <Route path="/dashboard" element={<Navigate to="/buyer" />} />
      </Routes>
    </Router>
  );
}
