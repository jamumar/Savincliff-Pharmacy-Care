import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { items, remove, update, total, count, open, setOpen } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-xl bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-10 py-8 border-b border-black/10">
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-black uppercase tracking-[0.4em]">BASKET / {count} ITEM</span>
              </div>
              <button onClick={() => setOpen(false)} className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-700 group">
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-10 py-12 space-y-0">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                  <ShoppingBag className="w-16 h-16 text-black/10" strokeWidth={1} />
                  <div className="space-y-4">
                     <h3 className="text-4xl font-black uppercase tracking-tighter opacity-10">Historical Null</h3>
                     <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">Your clinical queue is currently empty.</p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="px-12 py-6 border border-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-700"
                  >
                    Enter Inventory
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-8 py-10 border-b border-black/10 group animate-reveal"
                    >
                      <div className="w-24 h-24 bg-[#FAFAFA] border border-black/5 overflow-hidden flex-shrink-0 relative">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" />
                        <div className="absolute inset-0 border border-white/10 group-hover:border-transparent transition-all" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-svz-red mb-1">{item.brand}</p>
                           <h4 className="text-xl font-black uppercase tracking-tighter truncate">{item.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-0 border border-black/10">
                            <button onClick={() => update(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-[12px] font-black w-10 text-center">{item.qty}</span>
                            <button onClick={() => update(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xl font-black tracking-tighter">₦{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-black/20 hover:text-svz-red transition-all self-start pt-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-10 py-12 border-t border-black/10 space-y-12 bg-[#FAFAFA]">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-2">Total Audit</p>
                      <p className="text-5xl font-black tracking-tighter">₦{total.toLocaleString()}</p>
                   </div>
                   <div className="text-right hidden md:block">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-svz-red">Clinical Requirement</p>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-black/40">Audit Pending Rx Verification</p>
                   </div>
                </div>
                
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-8 w-full bg-black text-white py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-svz-red transition-all duration-700 group shadow-2xl"
                >
                  Initiate Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}