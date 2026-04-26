import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';
import { Package, Clock, Truck, CheckCircle, AlertCircle, ChevronRight, X, MapPin, CreditCard } from 'lucide-react';

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-black/5 flex items-center justify-between bg-[#FAFAFA]">
          <div>
            <h3 className="font-serif text-xl">Order Details</h3>
            <p className="text-[10px] uppercase tracking-widest text-black/40 mt-1">Ref: {order.idempotency_key?.slice(0,8)}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-black/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8">
           {/* Items */}
           <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1B6E8C]">Purchased Items</h4>
              <div className="divide-y divide-black/5">
                {order.items?.map((item, i) => (
                  <div key={i} className="py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black/5 flex items-center justify-center text-[10px] font-bold">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.product_name || 'Medical Supply'}</p>
                        <p className="text-[9px] text-black/40 uppercase tracking-widest">₦{parseFloat(item.price_at_purchase).toLocaleString()} per unit</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold">₦{(item.price_at_purchase * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Delivery Info */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-black/5">
              <div>
                 <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Delivery Address
                 </h4>
                 <p className="text-sm text-black/70 leading-relaxed">{order.shipping_address}</p>
              </div>
              <div>
                 <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 flex items-center gap-2">
                    <CreditCard className="w-3 h-3" /> Payment Status
                 </h4>
                 <p className="text-sm font-medium">{order.payment_method || 'Bank Transfer'}</p>
                 <p className="text-[10px] text-emerald-600 uppercase tracking-widest mt-1">Awaiting confirmation</p>
              </div>
           </div>

           {order.notes && (
             <div className="p-4 bg-amber-50 border border-amber-100 italic text-xs text-amber-700 leading-relaxed">
                " {order.notes} "
             </div>
           )}
        </div>

        <div className="p-8 bg-[#FAFAFA] border-t border-black/5 flex justify-between items-center">
           <p className="text-xs text-black/40 uppercase tracking-widest">Total Amount Due</p>
           <p className="font-serif text-3xl font-light">₦{parseFloat(order.total_price).toLocaleString()}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await apiClient.get('orders/');
      return res.data;
    }
  });

  if (isLoading) return <div className="animate-pulse space-y-4">
    {[1,2,3].map(i => <div key={i} className="h-40 bg-black/5" />)}
  </div>;

  if (error) return (
    <div className="bg-red-50 p-8 text-center border border-red-100">
      <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
      <h3 className="font-serif text-xl">Failed to load orders</h3>
      <p className="text-sm text-red-600/70 mt-2">There was an issue connecting to the fulfillment service.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between underline-offset-8">
        <h1 className="font-serif text-3xl font-light">My Orders</h1>
        <span className="text-[10px] tracking-widest uppercase text-black/40">{orders?.length || 0} Transactions</span>
      </div>

      <div className="grid gap-4">
        {orders?.length === 0 ? (
          <div className="bg-white border border-dashed border-black/10 py-16 text-center">
             <Package className="w-10 h-10 text-black/10 mx-auto mb-4" />
             <p className="text-black/40 tracking-wide uppercase text-[10px]">No orders placed yet</p>
          </div>
        ) : (
          orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-black/5 p-6 md:p-8 hover:shadow-md transition-shadow group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-widest uppercase bg-black/5 px-2 py-1">Order #{order.id}</span>
                    <span className={`text-[9px] tracking-widest uppercase px-2 py-1 border ${
                      order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                      order.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-black/40 text-xs">Placed on {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-[10px] tracking-widest uppercase text-black/40">Grand Total</p>
                  <p className="font-serif text-2xl font-light mt-1">₦{parseFloat(order.total_price).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex -space-x-2 overflow-hidden">
                  {/* Item icons or summary */}
                  <div className="flex items-center gap-4">
                     <p className="text-xs text-black/60 capitalize leading-relaxed">
                        Shipping to: <span className="text-black font-medium">{order.shipping_address}</span>
                     </p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center gap-2 text-[10px] items-center tracking-[0.2em] uppercase font-bold text-[#1B6E8C] group-hover:gap-4 transition-all"
                >
                  View Details <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
}
