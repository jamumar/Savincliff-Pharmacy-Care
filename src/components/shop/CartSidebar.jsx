import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
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
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-serif text-xl font-light">Your Cart</span>
                {count > 0 && (
                  <span className="bg-[#1B6E8C] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <ShoppingBag className="w-14 h-14 text-black/15 mb-4" strokeWidth={1} />
                  <p className="font-serif text-2xl font-light text-black/40">Cart is empty</p>
                  <p className="text-sm text-black/30 mt-2">Add products to get started.</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 text-[11px] tracking-[0.2em] uppercase border-b border-black/25 pb-1 hover:text-[#1B6E8C] hover:border-[#1B6E8C] transition-colors"
                  >
                    Browse Shop
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 py-4 border-b border-black/6"
                    >
                      <div className="w-16 h-16 bg-black/5 overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight truncate">{item.name}</p>
                        <p className="text-[11px] text-black/40 mt-0.5">{item.brand} · {item.unit}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-black/15">
                            <button onClick={() => update(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-black/5 transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-6 text-center">{item.qty}</span>
                            <button onClick={() => update(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-black/5 transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-medium text-sm">₦{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-black/25 hover:text-red-500 transition-colors self-start mt-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-6 border-t border-black/8 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-black/50">Subtotal</span>
                  <span className="font-serif text-2xl font-light">₦{total.toLocaleString()}</span>
                </div>
                <p className="text-[11px] text-black/35">Prescription items require valid Rx upload before dispensing.</p>
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-[#0A0A0A] text-white py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1B6E8C] transition-colors duration-500"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}