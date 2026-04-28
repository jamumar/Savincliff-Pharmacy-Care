import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { 
  Package, FileText, User as UserIcon, Settings, 
  Heart, ChevronRight, LogOut, LayoutGrid, ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const SIDEBAR_NAV = [
    { label: 'Overview', path: '/account', icon: LayoutGrid },
    { label: 'Orders', path: '/account/orders', icon: Package },
    { label: 'Prescriptions', path: '/account/prescriptions', icon: FileText },
    { label: 'Favorites', path: '/account/wishlist', icon: Heart },
    { label: 'Profile', path: '/account/settings', icon: Settings },
];

export default function AccountLayout() {
  const { user, logout, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-black uppercase tracking-[0.4em]">Node Loading...</div>;
  if (!user) return <Navigate to="/register" />;

  return (
    <div className="min-h-screen bg-white pt-40 pb-40">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        
        {/* Account Header */}
        <div className="border-b border-black pb-12 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
               <h1 className="sub-display-svz uppercase">Dashboard</h1>
               <p className="text-[11px] font-bold tracking-[0.4em] text-black/40 mt-4 uppercase">Clinical Terminal / Identity Ref: {user.id || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right hidden md:block">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-black">{user.username || 'Patient'}</p>
                    <p className="text-[10px] tracking-widest uppercase text-black/30">{user.email}</p>
                </div>
                <div className="w-16 h-16 bg-black flex items-center justify-center text-white overflow-hidden border border-black/10">
                   {user.avatar_url ? (
                     <img src={user.avatar_url} alt="" className="w-full h-full object-cover grayscale" />
                   ) : (
                     <span className="font-black text-xl">{user.username?.[0]?.toUpperCase() || 'U'}</span>
                   )}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-12"
          >
            <nav className="border border-black/10">
                {SIDEBAR_NAV.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-8 py-6 transition-all duration-700 border-b border-black/10 last:border-0 ${
                        active ? 'bg-black text-white' : 'text-black/40 hover:bg-black/5 hover:text-black'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className="w-4 h-4" strokeWidth={active ? 2 : 1} />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                      </div>
                      <ArrowUpRight className={`w-4 h-4 transition-transform ${active ? 'opacity-100' : 'opacity-0'}`} />
                    </Link>
                  );
                })}
            </nav>

            <div className="bg-svz-red/5 p-12 space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-svz-red">Clinical Support</p>
                <p className="text-[11px] font-bold text-black/60 uppercase leading-tight tracking-widest">
                    Emergency prescription assistance node active 24/7.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] border-b border-black pb-2 hover:text-svz-red hover:border-svz-red transition-all">
                    Initiate Contact <ChevronRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            <button
               onClick={logout}
               className="w-full py-8 border border-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-700"
            >
               Close Session
            </button>
          </motion.div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
}
