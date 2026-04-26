import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { 
  Package, FileText, User as UserIcon, Settings, 
  Heart, CreditCard, ChevronRight, LogOut, LayoutGrid
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const SIDEBAR_NAV = [
    { label: 'Dashboard', path: '/account', icon: LayoutGrid },
    { label: 'My Orders', path: '/account/orders', icon: Package },
    { label: 'Prescriptions', path: '/account/prescriptions', icon: FileText },
    { label: 'Wishlist', path: '/account/wishlist', icon: Heart },
    { label: 'Profile Settings', path: '/account/settings', icon: Settings },
];

export default function AccountLayout() {
  const { user, logout, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/register" />;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white border border-black/5 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#1B6E8C] text-white flex items-center justify-center text-xl font-serif">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#1B6E8C]">Member</p>
                  <h2 className="font-serif text-lg font-bold truncate max-w-[180px]">{user.username}</h2>
                </div>
              </div>

              <nav className="space-y-1">
                {SIDEBAR_NAV.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between group px-4 py-3.5 transition-all duration-300 ${
                        active ? 'bg-[#0A0A0A] text-white' : 'text-black/50 hover:bg-black/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${active ? 'text-white' : 'text-black/30 group-hover:text-black'}`} strokeWidth={1.5} />
                        <span className="text-[11px] uppercase tracking-widest">{item.label}</span>
                      </div>
                      <ChevronRight className={`w-3 h-3 transition-transform ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                    </Link>
                  );
                })}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-4 mt-6 border-t border-black/5 text-[11px] uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
            
            <div className="mt-8 p-6 bg-[#1B6E8C]/5 border border-[#1B6E8C]/10">
                <p className="text-[10px] uppercase tracking-widest text-[#1B6E8C] font-bold">Need Help?</p>
                <p className="text-xs text-black/50 mt-2 leading-relaxed">Our clinical support team is available 24/7 for prescription assistance.</p>
                <Link to="/contact" className="inline-block mt-4 text-[10px] font-bold uppercase tracking-widest border-b border-[#1B6E8C] pb-0.5 text-[#1B6E8C]">Contact Support</Link>
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
}
