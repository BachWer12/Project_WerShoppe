import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, LogOut, Package, Star } from 'lucide-react';
import Cookies from 'js-cookie';

export type BuyerPage = string;

export default function BuyerPortal({ onExit }: { onExit: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    onExit();
  };

  // Mock Products
  const products = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', shop: 'AudioTech' },
    { id: 2, name: 'Mechanical Keyboard Pro', price: 159.00, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80', shop: 'KeyMasters' },
    { id: 3, name: '4K Action Camera', price: 349.50, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', shop: 'CamWorld' },
    { id: 4, name: 'Smart Watch Series X', price: 499.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', shop: 'Wearables Inc' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <Package className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">WerMarket</span>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products, brands and categories..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-600">
            <button className="hover:text-indigo-600 transition-colors relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <User className="w-6 h-6 group-hover:text-indigo-600 transition-colors" />
              <div className="hidden group-hover:block absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border py-2">
                <Link to="/buyer/profile" className="block px-4 py-2 hover:bg-gray-50 text-sm">My Profile</Link>
                <Link to="/buyer/orders" className="block px-4 py-2 hover:bg-gray-50 text-sm">My Orders</Link>
                <div className="h-px bg-gray-100 my-2"></div>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={
            <div>
              {/* Banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-12 text-white shadow-xl flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Summer Tech Sale</h2>
                  <p className="text-indigo-100 mb-6">Up to 40% off on premium electronics</p>
                  <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
                    Shop Now
                  </button>
                </div>
                <div className="hidden md:block">
                  <Star className="w-32 h-32 text-white/20 animate-pulse" />
                </div>
              </div>

              {/* Product Grid */}
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Featured Products</h3>
                <a href="#" className="text-indigo-600 font-medium hover:underline">View all</a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-xl transition-all group cursor-pointer">
                    <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-indigo-600 mb-1">{product.shop}</p>
                    <h4 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h4>
                    <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}
