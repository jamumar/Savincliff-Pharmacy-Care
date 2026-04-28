import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import ProductDetailModal from '@/components/shop/ProductDetailModal';
import { Plus, Check, ArrowUpRight } from 'lucide-react';

const easeQuint = [0.16, 1, 0.3, 1];

const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: 'NEUROGEN AXON', 
    brand: 'SVZ PHARMA', 
    price: 15400, 
    img: '/images/product2.png', 
    unit: '30 CAPS',
    category: 'Cognitive'
  },
  { 
    id: 2, 
    name: 'SPECTRUM DROPS', 
    brand: 'CLINICAL SPEC', 
    price: 8900, 
    img: '/images/product1.png', 
    unit: '10 ML',
    category: 'Ophthalmic'
  },
  { 
    id: 3, 
    name: 'AURUM REGEN', 
    brand: 'AURUM LABS', 
    price: 24500, 
    img: '/images/product3.png', 
    unit: '30 ML',
    category: 'Topical'
  },
  { 
    id: 4, 
    name: 'VERIFY COMPLEX', 
    brand: 'SYNTHETIC NODE', 
    price: 12000, 
    img: '/images/product2.png', 
    unit: '60 TABS',
    category: 'Audit'
  },
  { 
    id: 5, 
    name: 'DISPENSE PRIMARY', 
    brand: 'SVZ PHARMA', 
    price: 32000, 
    img: '/images/product1.png', 
    unit: '100 ML',
    category: 'Clinical'
  },
  { 
    id: 6, 
    name: 'PROTOCOL SYNC', 
    brand: 'CLINICAL SPEC', 
    price: 18500, 
    img: '/images/product3.png', 
    unit: '15 ML',
    category: 'Verfied'
  },
  { 
    id: 7, 
    name: 'VITA D3+K2', 
    brand: 'ESSENTIALS', 
    price: 9200, 
    img: '/images/vitamins.png', 
    unit: '60 CAPS',
    category: 'Supplement'
  },
  { 
    id: 8, 
    name: 'PHARMA NOIR', 
    brand: 'PHARMACOPIA', 
    price: 28000, 
    img: '/images/capsules.png', 
    unit: '90 CAPS',
    category: 'Premium'
  },
  { 
    id: 9, 
    name: 'AETERNA SERUM', 
    brand: 'AETERNA LABS', 
    price: 35000, 
    img: '/images/skincare.png', 
    unit: '50 ML',
    category: 'Dermal'
  },
];

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { add, items } = useCart();

  const isAdded = (id) => items.some(item => item.id === id);

  return (
    <div className="bg-white min-h-screen pt-40">
      
      {/* High-Impact Heading */}
      <section className="px-6 md:px-12 mb-24 lg:mb-40">
         <div className="max-w-[1800px] mx-auto border-b border-black pb-12 overflow-hidden">
            <motion.h1 
               initial={{ y: 100 }}
               animate={{ y: 0 }}
               transition={{ duration: 1, ease: easeQuint }}
               className="display-svz"
            >
               INVENTORY
            </motion.h1>
            <div className="flex justify-between items-end mt-8">
               <p className="text-[11px] font-black tracking-[0.4em] uppercase text-black/40">Clinical Manifest / Synchronized 2026</p>
               <span className="text-[11px] font-black tracking-[0.4em] uppercase text-svz-red px-4 border-l border-svz-red">Total: {MOCK_PRODUCTS.length} NODES</span>
            </div>
         </div>
      </section>

      {/* Product Grid | SVZ.io Projects Style */}
      <section className="px-6 md:px-12 pb-40">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-black/10">
              {MOCK_PRODUCTS.map((p, i) => (
                  <motion.div
                      key={p.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.8 }}
                      className="group relative border-b border-black/10 md:border-r border-black/10 even:md:border-r-0 lg:even:md:border-r lg:[&:nth-child(3n)]:border-r-0 cursor-pointer overflow-hidden flex flex-col justify-between h-[65vh]"
                      onClick={() => setSelectedProduct(p)}
                  >
                      {/* Image Layer */}
                      <div className="absolute inset-0 z-0 bg-[#FAFAFA] svz-image-reveal">
                          <img 
                              src={p.img} 
                              alt={p.name} 
                              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
                      </div>

                      {/* Content Layer */}
                      <div className="relative z-10 w-full p-12 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                             <div className="space-y-4">
                                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/20 group-hover:text-svz-red transition-all duration-500">Node 0{p.id}</p>
                                <h3 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-all duration-700">{p.name}</h3>
                             </div>
                             <span className="text-[9px] font-black tracking-[0.4em] uppercase text-black/30 opacity-0 group-hover:opacity-100 transition-all duration-700 border-b border-black">View Spec</span>
                          </div>

                          <div className="flex justify-between items-end">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/40">{p.brand}</p>
                                 <p className="text-3xl font-black tracking-tighter transition-all duration-700 group-hover:text-svz-red">₦{p.price.toLocaleString()}</p>
                              </div>
                              
                              <button 
                                 onClick={(e) => { e.stopPropagation(); add(p); }}
                                 className={`w-14 h-14 flex items-center justify-center transition-all duration-700 ${
                                    isAdded(p.id) ? 'bg-svz-red text-white' : 'bg-black text-white group-hover:bg-svz-red'
                                 }`}
                              >
                                 {isAdded(p.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                              </button>
                          </div>
                      </div>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* Footer Ticker */}
      <section className="bg-black py-24 overflow-hidden select-none pointer-events-none">
          <div className="animate-marquee whitespace-nowrap">
             {Array(8).fill("").map((_, i) => (
                <span key={i} className="text-[12vw] font-black uppercase tracking-[-0.05em] text-white/5 mx-12">
                   INVENTORY SYNC / CLINICAL SPECIFICATIONS / SAVINCLIFF PRIMARY / 
                </span>
             ))}
          </div>
      </section>

      <ProductDetailModal 
         product={selectedProduct} 
         onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}