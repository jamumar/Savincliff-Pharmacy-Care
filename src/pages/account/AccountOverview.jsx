import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';
import { Package, FileText, ShoppingCart, User as UserIcon, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccountOverview() {
  const { user } = useAuth();
  
  const { data: stats } = useQuery({
      queryKey: ['account-summary'],
      queryFn: async () => {
          const [orders, rx] = await Promise.all([
              apiClient.get('orders/'),
              apiClient.get('prescriptions/')
          ]);
          return {
              ordersCount: orders.data.length,
              rxCount: rx.data.length,
              recentOrders: orders.data.slice(0, 3)
          };
      }
  });

  const STAT_CARDS = [
      { label: 'Total Orders', count: stats?.ordersCount || 0, icon: Package, color: 'text-blue-600' },
      { label: 'Active Rx', count: stats?.rxCount || 0, icon: FileText, color: 'text-[#1B6E8C]' },
      { label: 'Loyalty Points', count: 0, icon: ShoppingCart, color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <p className="text-[10px] uppercase tracking-[0.3em] text-[#1B6E8C] font-bold mb-2">Patient Dashboard</p>
           <h1 className="font-serif text-5xl font-light">Welcome back, {user.username}</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-black/40 border border-black/10 px-4 py-2 bg-white">
           <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Identity Verified
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STAT_CARDS.map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white border border-black/5 p-8 shadow-sm flex items-center justify-between group hover:border-[#1B6E8C]/30 transition-all pointer-events-none"
           >
             <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">{stat.label}</p>
                <p className="text-3xl font-serif font-light">{stat.count}</p>
             </div>
             <stat.icon className={`w-8 h-8 ${stat.color} opacity-20 group-hover:opacity-40 transition-opacity`} strokeWidth={1} />
           </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Recent Orders */}
         <div className="bg-white border border-black/5 p-8 shadow-sm">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 flex items-center gap-2">
                <Package className="w-4 h-4 text-black/30" /> Recent Orders
            </h3>
            <div className="space-y-4">
                {stats?.recentOrders.length > 0 ? stats.recentOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between py-4 border-b border-black/5 last:border-0 hover:bg-black/[0.01] transition-colors">
                        <div>
                            <p className="text-sm font-medium">Order #{order.id}</p>
                            <p className="text-[10px] text-black/40 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold">₦{parseFloat(order.total_price).toLocaleString()}</p>
                            <span className="text-[8px] uppercase tracking-tighter opacity-60 underline underline-offset-2">{order.status}</span>
                        </div>
                    </div>
                )) : (
                    <p className="text-xs text-black/40 py-10 text-center uppercase tracking-widest border border-dashed border-black/10">No recent transactions</p>
                )}
            </div>
            {stats?.recentOrders.length > 0 && (
                <Link to="/account/orders" className="block text-center mt-8 text-[10px] uppercase tracking-widest font-bold text-[#1B6E8C] hover:letter-spacing-[0.25em] transition-all">View All Transactions</Link>
            )}
         </div>

         {/* Promo Box */}
         <div className="bg-[#0A0A0A] text-white p-10 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B6E8C]/20 blur-[100px] -mr-32 -mt-32 rounded-full" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#1B6E8C] font-bold mb-4">Savincliff Prime</p>
            <h2 className="font-serif text-3xl font-light leading-tight">Fast-track your clinical <br /> consultations.</h2>
            <p className="text-sm text-white/50 mt-6 leading-relaxed max-w-[300px]">Unlock priority verification and free home delivery on all Rx regulated orders. Join our elite healthcare circle today.</p>
            <button className="self-start mt-8 bg-white text-black px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-[#1B6E8C] hover:text-white transition-all transform hover:-translate-y-1">Explore Prime</button>
         </div>
      </div>
    </div>
  );
}
