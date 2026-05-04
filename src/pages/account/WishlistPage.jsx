import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  return (
    <div className="space-y-20">
      
      {/* High-Impact Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-black/5 pb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">FAVORITE<br />SPECIFICATIONS</h1>
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/30 underline underline-offset-8">Stored Medical Profiles</p>
      </div>

      <div className="py-40 text-center border-2 border-dashed border-black/5 bg-[#FAFAFA]">
          <div className="w-20 h-20 bg-black/5 flex items-center justify-center mx-auto mb-12">
             <Heart className="w-10 h-10 text-black/10" strokeWidth={1} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter opacity-10">Historical Null</h2>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mt-4 max-w-sm mx-auto">
             You have not yet committed any clinical profiles to your primary repository.
          </p>
          <div className="mt-12">
              <Link to="/shop" className="inline-flex items-center gap-6 bg-black text-white px-12 py-6 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-brand-teal transition-all duration-700">
                  Access Inventory <ArrowUpRight className="w-4 h-4" />
              </Link>
          </div>
      </div>

      {/* Suggested Action Node */}
      <div className="bg-black text-white p-12 lg:p-20 relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
               <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Fast-Track Fulfillment</h2>
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">Secure priority access to your essential medical supply</p>
            </div>
            <div className="w-16 h-16 bg-white text-black flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all duration-700">
               <ShoppingBag className="w-6 h-6" />
            </div>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-teal/10 blur-[100px] rounded-full group-hover:bg-brand-teal/20 transition-all duration-1000" />
      </div>

    </div>
  );
}
