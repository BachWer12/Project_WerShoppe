import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Store, Package, ShoppingCart, Settings, LogOut, TrendingUp, Users, DollarSign } from 'lucide-react';
import Cookies from 'js-cookie';

export type SellerPage = string;

export default function SellerPortal({ onExit }: { onExit: () => void }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    onExit();
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Store className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold text-white">Seller Center</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link to="/seller" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
            <TrendingUp className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/seller/products" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link to="/seller/orders" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" /> Orders
          </Link>
          <Link to="/seller/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            <Settings className="w-5 h-5" /> Shop Settings
          </Link>
        </nav>
        
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-auto">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-slate-900 p-8">
        <Routes>
          <Route path="/" element={
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-slate-400">Welcome back to your store analytics.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-400">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-white mt-1">$12,426.00</h3>
                    </div>
                    <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                      <DollarSign className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-emerald-400 font-medium">+14.5%</span>
                    <span className="text-slate-500 ml-2">vs last month</span>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-400">Total Orders</p>
                      <h3 className="text-2xl font-bold text-white mt-1">456</h3>
                    </div>
                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-emerald-400 font-medium">+5.2%</span>
                    <span className="text-slate-500 ml-2">vs last month</span>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-400">Active Products</p>
                      <h3 className="text-2xl font-bold text-white mt-1">45</h3>
                    </div>
                    <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                      <Package className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-slate-500">2 pending review</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table Placeholder */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
                <div className="text-slate-400 text-center py-12">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No recent orders to display.</p>
                </div>
              </div>
            </div>
          } />
          {/* Other routes can be added here */}
        </Routes>
      </div>
    </div>
  );
}
