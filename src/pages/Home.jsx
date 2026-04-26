import React from 'react';
import { ShoppingBag, Upload, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedHeading from '@/components/shared/AnimatedHeading';

const TRENDING_CATEGORIES = [
  { 
    name: 'Malaria & Fever Care', 
    products: 'Amatem Softgel, Lonart', 
    icon: <Activity className="text-brand-teal" size={24} />,
    description: 'Fast-acting relief from malaria and high fever.'
  },
  { 
    name: 'Reproductive Health', 
    products: 'Sayana Press, Ovulation kits', 
    icon: <Zap className="text-brand-teal" size={24} />,
    description: 'Care for family planning and prenatal health.'
  },
  { 
    name: 'Vitamins & Immunity', 
    products: 'Zinc, Vitamin C 1000mg', 
    icon: <ShieldCheck className="text-brand-teal" size={24} />,
    description: 'Boost your defenses against seasonal illnesses.'
  },
  { 
    name: 'Heart & BP Support', 
    products: 'Omron BP Monitors, Heart Aspirin', 
    icon: <Activity className="text-brand-teal" size={24} />,
    description: 'Comprehensive chronic care management.'
  }
];

export default function Home() {
  return (
    <div className="font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-brand-surgical pt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center space-x-2 bg-brand-teal/10 px-4 py-1 rounded-full text-brand-teal text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-brand-teal rounded-full animate-pulse"></span>
              <span>Your Trusted Online pharmacy in Nigeria</span>
            </div>
            <AnimatedHeading level={1} className="display-md text-brand-obsidian leading-[1.1]">
              Quality Care <br/>
              <span className="text-brand-teal italic font-serif">Delivered</span> to <br/>
              Your Door.
            </AnimatedHeading>
            <p className="text-lg text-brand-slate max-w-md leading-relaxed">
              Genuine medicines, verified by pharmacists, and delivered with speed. Bridgining the gap in Nigerian healthcare.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="bg-brand-obsidian text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center hover:bg-brand-teal transition-all group"
              >
                Shop All Products
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
              <Link 
                to="/wholesale" 
                className="border border-brand-obsidian text-brand-obsidian px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center hover:bg-brand-obsidian hover:text-white transition-all"
              >
                Upload Prescription
                <Upload className="ml-2" size={16} />
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-teal/20 blur-[120px] rounded-full group-hover:bg-brand-teal/30 transition-all duration-1000"></div>
            <img 
              src="https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?w=800&q=80" 
              alt="Pharmacist Checking Medicines" 
              className="relative z-10 rounded-3xl shadow-2xl transform group-hover:-rotate-1 transition-transform duration-700"
            />
            {/* Trust badge overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-border hidden md:block animate-bounce-slow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-slate">NAFDAC Reg</p>
                  <p className="text-sm font-bold text-brand-obsidian">100% Genuine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-teal">Most Searched & Trending</h2>
            <AnimatedHeading level={2} className="display-sm text-brand-obsidian">Health Essentials for 2026</AnimatedHeading>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRENDING_CATEGORIES.map((cat, idx) => (
              <Link 
                key={idx}
                to={`/shop?category=${cat.name.split(' ')[0].toLowerCase()}`}
                className="p-8 rounded-2xl border border-border hover:border-brand-teal hover:shadow-xl transition-all group bg-brand-surgical/30"
              >
                <div className="mb-6 p-4 bg-white rounded-xl shadow-sm inline-block group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-brand-obsidian mb-2 tracking-tight">{cat.name}</h3>
                <p className="text-xs text-brand-slate mb-4 line-clamp-1">{cat.products}</p>
                <p className="text-xs text-brand-slate leading-relaxed mb-6 italic">{cat.description}</p>
                <div className="text-brand-teal text-[10px] font-bold uppercase tracking-widest flex items-center">
                  Shop Now <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="py-24 border-y border-border bg-brand-surgical/20">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16 text-center">
          <div className="space-y-4">
             <div className="text-4xl font-serif text-brand-obsidian">01</div>
             <h3 className="font-bold text-sm uppercase tracking-[0.2em]">Verified Source</h3>
             <p className="text-sm text-brand-slate leading-relaxed px-4">All medicines are 100% genuine and sourced directly from NAFDAC-approved importers.</p>
          </div>
          <div className="space-y-4">
             <div className="text-4xl font-serif text-brand-obsidian">02</div>
             <h3 className="font-bold text-sm uppercase tracking-[0.2em]">Fast Delivery</h3>
             <p className="text-sm text-brand-slate leading-relaxed px-4">Same-day delivery in Abuja and 24-48 hour nationwide shipping for all health essentials.</p>
          </div>
          <div className="space-y-4">
             <div className="text-4xl font-serif text-brand-obsidian">03</div>
             <h3 className="font-bold text-sm uppercase tracking-[0.2em]">Expert Advice</h3>
             <p className="text-sm text-brand-slate leading-relaxed px-4">Chat with our licensed pharmacists directly via WhatsApp for clinical guidance.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-brand-obsidian rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="display-sm">Need Help with your Prescription?</h2>
            <p className="text-white/60 text-lg">
              Our clinical team is ready to verify your medication and advise on dosage. Professional care is just a click away.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/wholesale" className="bg-brand-teal text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform">
                Upload Now
              </Link>
              <a href="https://wa.me/923251206427" className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-brand-obsidian transition-all">
                Talk to a Pharmacist
              </a>
            </div>
          </div>
          {/* Background circle decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-brand-teal/10 blur-[100px] rounded-full"></div>
        </div>
      </section>
    </div>
  );
}