import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function ProductCard({ product, index = 0, onView }) {
  const { add } = useCart();

  const badgeColors = {
    'Rx Required': 'bg-amber-100 text-amber-700',
    'Bestseller': 'bg-[#1B6E8C]/10 text-[#1B6E8C]',
    'Popular': 'bg-[#1B6E8C]/10 text-[#1B6E8C]',
    'New': 'bg-emerald-100 text-emerald-700',
    'Essential': 'bg-purple-100 text-purple-700',
    'Recommended': 'bg-blue-100 text-blue-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 4) * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white border border-black/6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/4">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onView(product)}
            className="w-11 h-11 bg-white flex items-center justify-center hover:bg-[#1B6E8C] hover:text-white transition-colors rounded-full shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          {product.inStock && product.category !== 'rx' && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => add(product)}
              className="w-11 h-11 bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#1B6E8C] transition-colors rounded-full shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.button>
          )}
        </div>
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1.5 font-medium ${badgeColors[product.badge] || 'bg-black/10 text-black/60'}`}>
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black/50 font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#1B6E8C] mb-1">{product.brand}</p>
        <h3 className="font-serif text-lg font-light leading-tight">{product.name}</h3>
        <p className="text-[11px] text-black/40 mt-1">{product.unit}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map(t => (
            <span key={t} className="text-[9px] tracking-wide uppercase border border-black/10 px-2 py-1 text-black/45">{t}</span>
          ))}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-serif text-2xl font-light">₦{product.price.toLocaleString()}</span>
          {product.category === 'rx' ? (
            <span className="flex items-center gap-1.5 text-[10px] text-amber-600">
              <AlertCircle className="w-3.5 h-3.5" /> Rx needed
            </span>
          ) : product.inStock ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => add(product)}
              className="text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 bg-[#0A0A0A] text-white hover:bg-[#1B6E8C] transition-colors duration-500"
            >
              Add to Cart
            </motion.button>
          ) : (
            <span className="text-[10px] text-black/35 tracking-wide">Unavailable</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}