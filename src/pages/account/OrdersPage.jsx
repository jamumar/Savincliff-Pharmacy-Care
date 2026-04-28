import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import apiClient from '@/api/apiClient'; // Backend disconnected for prototype
import { X, ArrowUpRight, Package, MapPin, CreditCard, Activity } from 'lucide-react';

// Mock order data
const MOCK_ORDERS = [
  {
    id: 1,
    status: 'FULFILLED',
    total_price: '24300',
    shipping_address: 'Divib Plaza, 7th Avenue, Gwarinpa, Abuja',
    payment_method: 'BANK TRANSFER',
    created_at: '2026-04-20T10:00:00Z',
    idempotency_key: 'a3f7c912-e4b8-4d2a-9c15-7b8e3f1d2a4c',
    notes: 'Please verify dosage for elderly patient.',
    items: [
      { product_name: 'NEUROGEN AXON', quantity: 2, price_at_purchase: 7700 },
      { product_name: 'SPECTRUM DROPS', quantity: 1, price_at_purchase: 8900 },
    ]
  },
  {
    id: 2,
    status: 'PROCESSING',
    total_price: '8900',
    shipping_address: 'Store Pickup',
    payment_method: 'CARD TRANSFER',
    created_at: '2026-04-25T14:30:00Z',
    idempotency_key: 'b5d8e412-f3c7-4a1b-8d25-6c9f2e3d1b5a',
    notes: null,
    items: [
      { product_name: 'SPECTRUM DROPS', quantity: 1, price_at_purchase: 8900 },
    ]
  },
  {
    id: 3,
    status: 'PENDING',
    total_price: '52000',
    shipping_address: 'Plot 42, Wuse II, Abuja',
    payment_method: 'BANK TRANSFER',
    created_at: '2026-04-26T09:15:00Z',
    idempotency_key: 'c7a9f613-d2e4-4b3c-9e35-5d8a1f2c3e6b',
    notes: 'Urgent — patient requires medication within 24 hours.',
    items: [
      { product_name: 'AURUM REGEN', quantity: 1, price_at_purchase: 24500 },
      { product_name: 'VERIFY COMPLEX', quantity: 1, price_at_purchase: 12000 },
      { product_name: 'NEUROGEN AXON', quantity: 1, price_at_purchase: 15400 },
    ]
  },
];

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-5xl h-full lg:h-auto overflow-y-auto relative grid grid-cols-1 lg:grid-cols-12"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-20 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-svz-red transition-all duration-500"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="lg:col-span-5 bg-[#FAFAFA] p-12 lg:p-16 space-y-16 flex flex-col justify-center">
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-svz-red mb-4">Transaction Audit</p>
                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">ORDER<br />NODE 0{order.id}</h2>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/30 mt-6 flex items-center gap-2">
                   <Activity className="w-4 h-4" /> STATUS: {order.status}
                </p>
             </div>

             <div className="space-y-10">
                <div className="space-y-4">
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30 flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> FULFILLMENT NODE
                   </p>
                   <p className="text-[13px] font-bold uppercase tracking-tight leading-tight">{order.shipping_address}</p>
                </div>
                <div className="space-y-4">
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30 flex items-center gap-2">
                      <CreditCard className="w-3 h-3" /> TRANSFER PROTOCOL
                   </p>
                   <p className="text-[13px] font-bold uppercase tracking-tight">{order.payment_method}</p>
                </div>
             </div>

             <div className="pt-12 border-t border-black/10">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-2">Grand Total Audit</p>
                 <p className="text-5xl font-black tracking-tighter">₦{parseFloat(order.total_price).toLocaleString()}</p>
             </div>
          </div>

          <div className="lg:col-span-7 p-12 lg:p-20 space-y-12">
             <h4 className="text-[11px] font-black uppercase tracking-[0.3em] border-b border-black/5 pb-8 flex items-center justify-between">
                ITEMIZED SPECIFICATION <span>[{order.items?.length || 0}]</span>
             </h4>
             <div className="space-y-0">
                {order.items?.map((item, i) => (
                   <div key={i} className="py-8 border-b border-black/5 flex justify-between items-start group">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">NODE 0{i + 1}</p>
                         <h5 className="text-xl font-black uppercase tracking-tighter">{item.product_name}</h5>
                         <p className="text-[11px] font-bold text-black/40 mt-4 tracking-widest uppercase">{item.quantity} UNIT SPECIFIED</p>
                      </div>
                      <p className="text-xl font-black tracking-tighter">₦{(item.price_at_purchase * item.quantity).toLocaleString()}</p>
                   </div>
                ))}
             </div>
             
             {order.notes && (
               <div className="p-12 bg-black text-white space-y-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-svz-red">Clinical Notes</p>
                  <p className="text-[13px] font-bold uppercase tracking-widest leading-relaxed text-white/50">
                     "{order.notes}"
                  </p>
               </div>
             )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const orders = MOCK_ORDERS; // Using mock data

  return (
    <div className="space-y-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-black/5 pb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">ORDER<br />ARCHIVE</h1>
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/30">{orders.length} TOTAL NODES RECORDED</p>
      </div>

      <div className="grid gap-0 border border-black/5">
        {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedOrder(order)}
              className="p-12 border-b border-black/5 hover:bg-black hover:text-white transition-all duration-700 cursor-pointer group flex flex-col md:flex-row justify-between items-start md:items-center gap-12"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-svz-red">NODE 0{order.id}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest bg-black/5 group-hover:bg-white/10 px-3 py-1 transition-colors">{order.status}</span>
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">AUDIT REF: {order.idempotency_key?.slice(0,8)}</h3>
                <p className="text-[11px] font-bold tracking-widest uppercase opacity-40">COMMITTED {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>

              <div className="text-left md:text-right flex items-center gap-12">
                <div>
                   <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-30 group-hover:opacity-60 mb-2">Commit Value</p>
                   <p className="text-4xl font-black tracking-tighter">₦{parseFloat(order.total_price).toLocaleString()}</p>
                </div>
                <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </motion.div>
        ))}
      </div>

      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
}
