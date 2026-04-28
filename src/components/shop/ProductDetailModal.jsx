import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { toast } from '@/components/ui/use-toast';

const easeQuint = [0.16, 1, 0.3, 1];

export default function ProductDetailModal({ product, onClose }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    toast({
       title: "NODE COMMITTED",
       description: `Identity hash sync: ${product.name} locked into fulfillment queue.`
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center sm:p-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 100 }}
          transition={{ duration: 0.8, ease: easeQuint }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full h-full max-w-[100%] lg:max-w-none overflow-y-auto relative grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Close Button / SVZ Style */}
          <button
            onClick={onClose}
            className="absolute top-12 right-12 z-50 w-16 h-16 bg-black text-white flex items-center justify-center hover:bg-svz-red transition-all duration-700 group shadow-2xl"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>

          {/* Left Panel: High Res Project Image (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAFAFA] relative overflow-hidden h-[60vh] lg:h-full">
             <motion.img 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: easeQuint }}
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0" 
             />
             <div className="absolute bottom-20 left-[5vw]">
                <p className="text-[12px] font-black tracking-[0.4em] uppercase text-black/10">Protocol Ref: SYN/00{product.id}X</p>
             </div>
          </div>

          {/* Right Panel: Clinical Spec (5 cols) */}
          <div className="lg:col-span-5 px-[5vw] py-20 lg:py-0 flex flex-col justify-center bg-white">
             <div className="space-y-16">
                <div>
                   <motion.p 
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3, duration: 0.8 }}
                     className="text-[11px] font-black tracking-[0.4em] uppercase text-svz-red mb-6"
                   >
                     {product.brand} / Clinical Node
                   </motion.p>
                   <motion.h2 
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4, duration: 1, ease: easeQuint }}
                     className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12"
                   >
                      {product.name}
                   </motion.h2>
                   <div className="flex flex-wrap items-center gap-6">
                      <span className="text-[11px] font-black tracking-widest uppercase bg-black text-white px-5 py-2">{product.category}</span>
                      <span className="text-[11px] font-black tracking-widest uppercase border border-black/10 px-5 py-2">Audit Verified</span>
                   </div>
                </div>

                <div className="space-y-8 max-w-lg">
                   <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/20">Audit specification</p>
                   <p className="text-xl md:text-2xl text-black/60 font-medium leading-tight tracking-tight uppercase">
                      {product.description || "Primary medical formulation verified through the Savincliff Clinical Node. Total source integrity."}
                   </p>
                </div>

                <div className="pt-16 border-t border-black/10">
                   <div className="flex items-end justify-between mb-16">
                      <div>
                         <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/20 mb-4">Node Price / Unit</p>
                         <p className="text-5xl font-black tracking-tighter">₦{product.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center border border-black/10 px-2">
                         <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-16 h-16 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                           <Minus className="w-5 h-5" />
                         </button>
                         <span className="w-16 text-center text-[16px] font-black">{qty}</span>
                         <button onClick={() => setQty(q => q + 1)} className="w-16 h-16 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                           <Plus className="w-5 h-5" />
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black">
                       <button 
                          onClick={handleAdd}
                          disabled={added}
                          className="flex items-center justify-center gap-8 py-10 text-[12px] font-black uppercase tracking-[0.3em] bg-black text-white hover:bg-svz-red transition-all duration-700 disabled:bg-svz-red"
                       >
                          <ShoppingBag className="w-5 h-5" /> {added ? 'SNC ACTIVE' : 'Initiate Node'}
                       </button>
                       <button className="flex items-center justify-center gap-8 py-10 text-[12px] font-black uppercase tracking-[0.3em] bg-white text-black hover:bg-black hover:text-white transition-all duration-700 border-l border-black">
                          Clinical Doc <ArrowUpRight className="w-5 h-5" />
                       </button>
                   </div>
                </div>
                
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/10">
                   Synchronized Archive / 102.33.1.04
                </p>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}