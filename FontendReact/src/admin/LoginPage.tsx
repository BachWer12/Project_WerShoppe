import { useState } from "react";
import { Shield, Eye, EyeOff, Mail, Lock } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

interface Props {
  onLoginSuccess: () => void;
  onExit: () => void;
}

export default function AdminLoginPage({ onLoginSuccess, onExit }: Props) {
  const { login } = useAuth();
  
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#F8FAFC] to-[#EFF6FF] flex flex-col items-center justify-center px-4">
      <div className="absolute top-6 left-6">
        <button onClick={onExit} className="text-gray-500 hover:text-gray-900 font-medium">← Quay lại trang chủ</button>
      </div>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md border border-[#E2E8F0] shadow-xl shadow-purple-50">
        <div className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
          <div className="w-12 h-12 bg-[#8B5CF6] rounded-xl flex items-center justify-center mb-2 shadow-md shadow-purple-200">
            <Shield size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-[#0F172A]">WerBay Admin</span>
          <p className="text-sm text-gray-500">Đăng nhập tài khoản Quản Trị Viên</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input 
            label="Email" 
            placeholder="admin@werbay.com" 
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
          <Button className="w-full bg-[#8B5CF6] hover:bg-[#7c3aed] mt-4" size="lg" loading={loading} onClick={handleLogin}>
            Đăng nhập hệ thống
          </Button>
        </div>
      </div>
    </div>
  );
}
