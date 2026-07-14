import React, { useState } from 'react';
import { Mail, Lock, User, Store, ArrowRight, Loader2, X, UserCircle, ShoppingBag } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [role, setRole] = useState<'customer' | 'seller'>('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    shopName: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const res: any = await axiosClient.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });
        if (res.data) {
          const role = res.data.role;
          Cookies.set('accessToken', res.data.accessToken);
          Cookies.set('refreshToken', res.data.refreshToken);
          onClose();
          
          if (role === 'ROLE_ADMIN') {
            window.location.href = '/admin';
          } else if (role === 'ROLE_SELLER') {
            window.location.href = '/seller';
          } else {
            window.location.href = '/buyer';
          }
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const endpoint = role === 'customer' ? '/auth/signup/customer' : '/auth/signup/seller';
        await axiosClient.post(endpoint, formData);
        onClose();
        navigate('/verify-otp', { state: { email: formData.email } });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
      if (mode === 'login' && err.response?.data?.message?.includes('verify OTP')) {
        onClose();
        navigate('/verify-otp', { state: { email: formData.email } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl" />
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white/80 rounded-full text-slate-500 hover:text-slate-900 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="relative p-8 pt-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4 text-white">
              {mode === 'login' ? <Lock size={28} /> : <User size={28} />}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500">
              {mode === 'login' ? 'Enter your details to access your account' : 'Join WerMarket and start shopping'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm animate-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
                  <button
                    type="button"
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${role === 'customer' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setRole('customer')}
                  >
                    <UserCircle size={16} /> Buyer
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${role === 'seller' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setRole('seller')}
                  >
                    <Store size={16} /> Seller
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  
                  {role === 'seller' && (
                    <div className="relative group animate-in zoom-in-95">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                      <input
                        type="text"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
                        placeholder="Shop Name"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
                placeholder="Password"
                required
              />
            </div>

            {mode === 'register' && (
              <div className="relative group animate-in slide-in-from-right-4 duration-300">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end pt-1">
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-2 rounded-xl font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none
                ${mode === 'login' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/30' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-500/30'
                }`}
            >
              {loading ? <Loader2 className="animate-spin h-6 w-6" /> : (
                <>
                  {mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
