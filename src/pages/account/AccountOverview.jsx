import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
// import apiClient from '@/api/apiClient'; // Backend disconnected for prototype
import { Package, FileText, ArrowRight, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const easeQuint = [0.16, 1, 0.3, 1];

// Mock data for prototype
const MOCK_ORDERS = [
  { id: 1, total_price: '24300', status: 'FULFILLED', created_at: '2026-04-20T10:00:00Z' },
  { id: 2, total_price: '8900', status: 'PROCESSING', created_at: '2026-04-25T14:30:00Z' },
  { id: 3, total_price: '52000', status: 'PENDING', created_at: '2026-04-26T09:15:00Z' },
];

export default function AccountOverview() {
  const { user } = useAuth();

  const STAT_CARDS = [
      { id: 'T-01', label: 'TRANSACTIONS', count: MOCK_ORDERS.length, icon: Package },
      { id: 'R-02', label: 'CLINICAL Rx', count: 2, icon: FileText },
      { id: 'V-03', label: 'IDENTITY', count: 'SYNC', icon: Zap },
  ];

  return (
    <div className="space-y-40">
      
      {/* High-Impact Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-black pb-16">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: easeQuint }}
        >
           <p className="label-svz mb-8">Patient Identity / FCT Node</p>
           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
             Welcome back,<br />{user?.username || 'NODE 01'}
           </h1>
        </motion.div>
        <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] uppercase text-black/20 group hover:text-svz-red transition-all cursor-default">
            <Activity className="w-5 h-5 transition-transform group-hover:scale-125" /> Biometric Identity Verified
        </div>
      </div>

      {/* Grid Stats / Industrial Cells */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/10">
        {STAT_CARDS.map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: i * 0.1, duration: 1 }}
             className="p-16 border-b md:border-b-0 md:border-r border-black/10 hover:bg-black hover:text-white transition-all duration-700 group flex flex-col justify-between min-h-[320px]"
           >
             <div className="flex justify-between items-start">
                <div className="space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 group-hover:text-svz-red transition-all duration-500">{stat.id} / AUDIT</p>
                   <p className="text-[11px] font-black uppercase tracking-[0.4em]">{stat.label}</p>
                </div>
                <stat.icon className="w-6 h-6 opacity-10 group-hover:opacity-100 group-hover:text-svz-red transition-all duration-700" strokeWidth={1} />
             </div>
             <p className="text-8xl font-black tracking-[-0.05em] self-end leading-none group-hover:translate-x-4 transition-transform duration-1000">{stat.count}</p>
           </motion.div>
        ))}
      </div>

      {/* Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
         {/* Recent Audits */}
         <div className="lg:col-span-7 space-y-16">
            <div className="flex items-center justify-between">
               <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-black/30">Clinical History</h3>
               <div className="flex-1 h-px bg-black/10 mx-12" />
            </div>
            
            <div className="space-y-0 border-t border-black/10">
                {MOCK_ORDERS.map(order => (
                    <Link key={order.id} to="/account/orders" className="flex items-center justify-between py-12 border-b border-black/10 hover:bg-[#FAFAFA] transition-all px-6 -mx-6 group relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-2">Ref: SN-00{order.id}</p>
                            <h4 className="text-2xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-all duration-700">Audit Sync 0{order.id}</h4>
                        </div>
                        <div className="relative z-10 text-right flex items-center gap-10">
                            <div>
                                <p className="text-2xl font-black tracking-tighter">₦{parseFloat(order.total_price).toLocaleString()}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-svz-red mt-1">{order.status}</p>
                            </div>
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-700">
                               <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="pt-8">
               <Link to="/account/orders" className="group inline-flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.4em] border-b border-black pb-4 hover:text-svz-red hover:border-svz-red transition-all duration-700">
                  Full Manifest Archive <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
         </div>

         {/* Promo Grid Cell */}
         <div className="lg:col-span-5 bg-black text-white p-12 lg:p-24 relative overflow-hidden group min-h-[600px] flex flex-col justify-center shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-svz-red/10 blur-[150px] rounded-full group-hover:bg-svz-red/20 transition-all duration-1000 origin-center scale-150" />
            
            <div className="relative z-10 space-y-16">
               <p className="label-svz">Enterprise Node</p>
               <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">ACCELERATED<br />VERIFICATION</h2>
               <p className="text-[12px] font-black uppercase leading-relaxed tracking-widest text-white/30 max-w-sm">
                   Bypass standard clinical queues and unlock industrial-grade pharmaceutical oversight. Total precision at every node.
               </p>
               <button className="bg-white text-black px-16 py-8 text-[12px] font-black uppercase tracking-[0.4em] hover:bg-svz-red hover:text-white transition-all duration-700 shadow-2xl">Enter Node</button>
            </div>
            
            <div className="absolute bottom-12 right-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/5 group-hover:text-white/10 transition-colors">
               SVZ / CLINICAL PROTOCOL 01
            </div>
         </div>
      </div>
    </div>
  );
}
