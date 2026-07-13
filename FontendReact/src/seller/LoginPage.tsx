import { useState } from "react";
import { Store, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

interface Props {
  onLoginSuccess: () => void;
  onExit: () => void;
}

export default function SellerLoginPage({ onLoginSuccess, onExit }: Props) {
  const { login, registerSeller } = useAuth();
  
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register form state
  const [fullName, setFullName] = useState("");
  const [shopName, setShopName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await login({ email, password });
      onLoginSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await registerSeller({ email, password, fullName, shopName });
      setMode("login");
      alert("Đăng ký Kênh Người Bán thành công! Vui lòng đăng nhập.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-[#EFF6FF] flex flex-col items-center justify-center px-4">
      <div className="absolute top-6 left-6">
        <button onClick={onExit} className="text-gray-500 hover:text-gray-900 font-medium">← Quay lại trang chủ</button>
      </div>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md border border-[#E2E8F0] shadow-xl shadow-green-50">
        <div className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
          <div className="w-12 h-12 bg-[#22C55E] rounded-xl flex items-center justify-center mb-2">
            <Store size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-[#0F172A]">WerBay Seller</span>
          <p className="text-sm text-gray-500">Kênh quản lý dành cho Người Bán</p>
        </div>

        <div className="flex gap-1 bg-[#F8FAFC] rounded-xl p-1 mb-6">
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === m ? "bg-white text-[#0F172A] shadow-sm border border-gray-100" : "text-[#94A3B8]"}`}
            >
              {m === "login" ? "Đăng nhập" : "Đăng ký"}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {mode === "login" ? (
          <div className="space-y-4">
            <Input 
              label="Email" 
              placeholder="email@example.com" 
              prefix={<Mail size={16} />} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <Input
                label="Mật khẩu"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                prefix={<Lock size={16} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suffix={
                  <button onClick={() => setShowPw(!showPw)}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
            </div>
            <Button className="w-full bg-[#22C55E] hover:bg-[#16a34a]" size="lg" loading={loading} onClick={handleLogin}>Đăng nhập Kênh Người Bán</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input 
              label="Họ và Tên chủ shop" 
              placeholder="Nguyễn Văn A" 
              prefix={<User size={16} />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input 
              label="Tên Shop (Cửa hàng)" 
              placeholder="WerBay Official Store" 
              prefix={<Store size={16} />}
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <Input 
              label="Email" 
              type="email" 
              placeholder="email@example.com" 
              prefix={<Mail size={16} />} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              label="Mật khẩu" 
              type="password" 
              placeholder="••••••••" 
              prefix={<Lock size={16} />} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input 
              label="Xác nhận mật khẩu" 
              type="password" 
              placeholder="••••••••" 
              prefix={<Lock size={16} />} 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-0.5 accent-[#22C55E]" />
              <span className="text-xs text-[#475569]">Tôi đồng ý với <span className="text-[#22C55E]">Điều khoản bán hàng</span> của WerBay</span>
            </label>
            <Button className="w-full bg-[#22C55E] hover:bg-[#16a34a]" size="lg" loading={loading} onClick={handleRegister}>Đăng ký Trở thành Người Bán</Button>
          </div>
        )}
      </div>
    </div>
  );
}
