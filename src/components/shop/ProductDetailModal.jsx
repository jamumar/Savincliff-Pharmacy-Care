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
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-end md:items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: easeQuint }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full h-[92vh] md:h-[90vh] lg:h-auto lg:max-h-[90vh] overflow-y-auto relative grid grid-cols-1 lg:grid-cols-12 rounded-t-2xl md:rounded-none"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-12 md:right-12 z-50 w-10 h-10 md:w-16 md:h-16 bg-black text-white flex items-center justify-center hover:bg-brand-teal transition-all duration-700 group shadow-2xl"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform" />
          </button>

          {/* Left Panel: Image */}
          <div className="lg:col-span-7 bg-[#FAFAFA] relative overflow-hidden h-[35vh] md:h-[50vh] lg:h-full">
             <motion.img 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: easeQuint }}
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0" 
             />
             <div className="absolute bottom-4 left-4 md:bottom-20 md:left-[5vw]">
                <p className="text-[10px] md:text-[12px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/10">Protocol Ref: SYN/00{product.id}X</p>
             </div>
          </div>

          {/* Right Panel: Clinical Spec */}
          <div className="lg:col-span-5 px-5 md:px-[5vw] py-8 md:py-20 lg:py-0 flex flex-col justify-center bg-white">
             <div className="space-y-8 md:space-y-16">
                <div>
                   <motion.p 
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3, duration: 0.8 }}
                     className="text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-brand-teal mb-3 md:mb-6"
                   >
                     {product.brand} / Clinical Node
                   </motion.p>
                   <motion.h2 
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4, duration: 1, ease: easeQuint }}
                     className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6 md:mb-12"
                   >
                      {product.name}
                   </motion.h2>
                   <div className="flex flex-wrap items-center gap-3 md:gap-6">
                      <span className="text-[10px] md:text-[11px] font-black tracking-widest uppercase bg-black text-white px-3 py-1.5 md:px-5 md:py-2">{product.category}</span>
                      <span className="text-[10px] md:text-[11px] font-black tracking-widest uppercase border border-black/10 px-3 py-1.5 md:px-5 md:py-2">Audit Verified</span>
                   </div>
                </div>

                <div className="space-y-4 md:space-y-8 max-w-lg">
                   <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/20">Audit specification</p>
                   <p className="text-base md:text-2xl text-black/60 font-medium leading-tight tracking-tight uppercase">
                      {product.description || "Primary medical formulation verified through the Savincliff Clinical Node. Total source integrity."}
                   </p>
                </div>

                <div className="pt-6 md:pt-16 border-t border-black/10">
                   <div className="flex items-end justify-between mb-8 md:mb-16">
                      <div>
                         <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/20 mb-2 md:mb-4">Node Price / Unit</p>
                         <p className="text-3xl md:text-5xl font-black tracking-tighter">₦{product.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center border border-black/10 px-1 md:px-2">
                         <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                           <Minus className="w-4 h-4 md:w-5 md:h-5" />
                         </button>
                         <span className="w-10 md:w-16 text-center text-sm md:text-[16px] font-black">{qty}</span>
                         <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                           <Plus className="w-4 h-4 md:w-5 md:h-5" />
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-0 border border-black">
                       <button 
                          onClick={handleAdd}
                          disabled={added}
                          className="flex items-center justify-center gap-3 md:gap-8 py-5 md:py-10 text-[10px] md:text-[12px] font-black uppercase tracking-[0.15em] md:tracking-[0.3em] bg-black text-white hover:bg-brand-teal transition-all duration-700 disabled:bg-brand-teal"
                       >
                          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" /> {added ? 'ACTIVE' : 'Add Node'}
                       </button>
                       <button className="flex items-center justify-center gap-3 md:gap-8 py-5 md:py-10 text-[10px] md:text-[12px] font-black uppercase tracking-[0.15em] md:tracking-[0.3em] bg-white text-black hover:bg-black hover:text-white transition-all duration-700 border-l border-black">
                          Clinical Doc <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                       </button>
                   </div>
                </div>
                
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-black/10">
                   Synchronized Archive / 102.33.1.04
                </p>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}