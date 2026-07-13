import { useState } from "react";
import { ShoppingBag, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import type { BuyerPage } from "../portals/BuyerPortal";
import { useAuth } from "../context/AuthContext";

interface Props {
  onNavigate: (p: BuyerPage) => void;
}

export default function LoginPage({ onNavigate }: Props) {
  const { login, registerCustomer } = useAuth();
  
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register form state
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await login({ email, password });
      onNavigate("home");
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
      await registerCustomer({ email, password, fullName });
      // Switch back to login mode after successful registration
      setMode("login");
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F0FDF4] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md border border-[#E2E8F0] shadow-xl shadow-blue-50">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#ee4d2d] rounded-xl flex items-center justify-center">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-[#ee4d2d]">WerBay</span>
        </div>

        <div className="flex gap-1 bg-[#F8FAFC] rounded-xl p-1 mb-6">
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === m ? "bg-white text-[#0F172A] shadow-sm" : "text-[#94A3B8]"}`}
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

        {mode === "forgot" ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#0F172A] text-center">Quên mật khẩu?</h2>
            <p className="text-sm text-[#475569] text-center">Nhập email của bạn để nhận link đặt lại mật khẩu</p>
            <Input label="Email" type="email" placeholder="your@email.com" prefix={<Mail size={16} />} />
            <Button className="w-full bg-[#ee4d2d] hover:bg-[#ee4d2d]/90" size="lg" loading={loading}>Gửi email đặt lại</Button>
            <button onClick={() => setMode("login")} className="w-full text-sm text-[#ee4d2d] font-medium">← Quay lại đăng nhập</button>
          </div>
        ) : mode === "login" ? (
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
              <button onClick={() => setMode("forgot")} className="text-xs text-[#ee4d2d] mt-1.5 float-right">Quên mật khẩu?</button>
            </div>
            <div className="clear-both" />
            <Button className="w-full bg-[#ee4d2d] hover:bg-[#ee4d2d]/90" size="lg" loading={loading} onClick={handleLogin}>Đăng nhập</Button>
            <div className="relative text-center">
              <div className="absolute inset-y-1/2 left-0 right-0 border-t border-[#E2E8F0]" />
              <span className="relative bg-white px-4 text-xs text-[#94A3B8]">hoặc</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="h-11 flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#CBD5E1] transition-colors">
                <span>🇬</span> Google
              </button>
              <button className="h-11 flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#CBD5E1] transition-colors">
                <span>📱</span> Zalo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Input 
              label="Họ và Tên" 
              placeholder="Nguyễn Văn An" 
              prefix={<User size={16} />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              <input type="checkbox" className="mt-0.5 accent-[#ee4d2d]" />
              <span className="text-xs text-[#475569]">Tôi đồng ý với <span className="text-[#ee4d2d]">Điều khoản dịch vụ</span> và <span className="text-[#ee4d2d]">Chính sách bảo mật</span></span>
            </label>
            <Button className="w-full bg-[#ee4d2d] hover:bg-[#ee4d2d]/90" size="lg" loading={loading} onClick={handleRegister}>Tạo tài khoản</Button>
          </div>
        )}
      </div>
    </div>
  );
}
