import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import ProductCard from '@/components/shop/ProductCard';
import ProductDetailModal from '@/components/shop/ProductDetailModal';
import { PRODUCTS } from '@/lib/shopData';

const featured = PRODUCTS.filter(p => p.badge === 'Bestseller' || p.badge === 'Popular' || p.badge === 'Recommended').slice(0, 4);

export default function FeaturedProducts() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="bg-[#FAFAFA] py-32 md:py-40">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel number="04" label="Featured Products" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif display-md mt-6 font-light"
            >
              Community <em className="not-italic text-[#1B6E8C]">favourites</em>.
            </motion.h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-black/25 pb-2 hover:border-[#1B6E8C] hover:text-[#1B6E8C] transition-colors self-start md:self-auto"
          >
            Browse Full Shop <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onView={setSelected} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-14 text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-10 py-5 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1B6E8C] transition-colors duration-500"
          >
            Shop All Products <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProductDetailModal product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}