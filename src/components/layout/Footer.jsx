import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';
import Logo from '@/components/brand/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-[10vh] md:pt-[20vh] pb-8 md:pb-12 border-t border-[#1A1A1A]">
      <div className="grid-container">
        
        {/* Massive Primary CTA */}
        <div className="mb-16 md:mb-40 group">
            <h2 className="text-[12vw] md:text-[12vw] font-black leading-[0.8] tracking-[-0.05em] uppercase opacity-5 group-hover:opacity-100 transition-all duration-1000 cursor-default">
                STAY<br />
                C<i className="not-italic">O</i>NNECTED
            </h2>
            <div className="h-0.5 w-full bg-white/5 mt-6 md:mt-12 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-1000" />
        </div>

        {/* Grid Structure */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20 lg:gap-24 mb-16 md:mb-32">
          
          {/* Node 01: Identification */}
          <div className="space-y-6 md:space-y-12 col-span-2 sm:col-span-1">
            <Logo variant="light" />
            <p className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-white/30 leading-relaxed max-w-[280px]">
              Savincliff Pharmacy. Architectural precision in clinical fulfillment. Primary source pharmaceutical nodes.
            </p>
            <div className="flex gap-6 md:gap-8">
              <a href="#" className="text-white/30 hover:text-svz-red transition-all duration-500"><Instagram size={16} /></a>
              <a href="#" className="text-white/30 hover:text-svz-red transition-all duration-500"><Twitter size={16} /></a>
              <a href="#" className="text-white/30 hover:text-svz-red transition-all duration-500"><Linkedin size={16} /></a>
            </div>
          </div>

          {/* Node 02: Inventory Access */}
          <div className="space-y-6 md:space-y-10">
            <h3 className="text-[10px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase text-svz-red">INVENTORY</h3>
            <ul className="space-y-3 md:space-y-5">
              {['Inventory Node', 'Rx Terminal', 'Clinical Spec', 'Bulk Audit'].map(item => (
                <li key={item}>
                    <Link 
                       to="/shop" 
                       className="text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/40 hover:text-white transition-all duration-500 flex items-center justify-between group/link"
                    >
                        {item} <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-2 transition-all" />
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Node 03: Protocol Documentation */}
          <div className="space-y-6 md:space-y-10">
            <h3 className="text-[10px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase text-svz-red">PROTOCOL</h3>
            <ul className="space-y-3 md:space-y-5">
              {['Identity Hub', 'Care Terms', 'Registry', 'Audit Log'].map(item => (
                <li key={item}>
                    <Link to="/about" className="text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/40 hover:text-white transition-all duration-500">
                        {item}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Node 04: Location */}
          <div className="space-y-6 md:space-y-10 col-span-2 sm:col-span-1">
            <h3 className="text-[10px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase text-svz-red">LOCATION</h3>
            <div className="space-y-4 md:space-y-8">
              <div className="flex gap-4 md:gap-6">
                <MapPin size={16} className="text-white/10 shrink-0 mt-0.5" />
                <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-white/40 leading-relaxed">
                   Divib Plaza, 7th Avenue,<br />Gwarinpa, Abuja / FCT
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <Phone size={16} className="text-white/10 shrink-0" />
                <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-white/40">+234 (0) 923 251 2064</span>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <Mail size={16} className="text-white/10 shrink-0" />
                <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-white/40">node@savincliff.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Strip */}
        <div className="border-t border-[#1A1A1A] pt-8 md:pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-12">
           <div className="flex gap-8 md:gap-16 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 grayscale opacity-20 hover:opacity-100 transition-opacity duration-1000">
              <div className="flex flex-col min-w-max">
                 <span className="text-[9px] md:text-[10px] font-black tracking-widest text-white/50 mb-1">REGISTRY</span>
                 <span className="text-[11px] md:text-[12px] font-black tracking-tighter uppercase">PCN LICENSED</span>
              </div>
              <div className="flex flex-col min-w-max">
                 <span className="text-[9px] md:text-[10px] font-black tracking-widest text-white/50 mb-1">SPECIFICATION</span>
                 <span className="text-[11px] md:text-[12px] font-black tracking-tighter uppercase">NAFDAC VERIFIED</span>
              </div>
              <div className="flex flex-col min-w-max">
                 <span className="text-[9px] md:text-[10px] font-black tracking-widest text-white/50 mb-1">SECURITY</span>
                 <span className="text-[11px] md:text-[12px] font-black tracking-tighter uppercase">SSL ENCRYPTED</span>
              </div>
           </div>

           <div className="text-left md:text-right space-y-1 md:space-y-2">
              <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-white/10">
                 PHARMACEUTICAL ARCHIVE © {currentYear} SAVINCLIFF CLINICAL
              </p>
              <p className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase text-white/5">
                 Synchronized at Node 04 / 23:59:59
              </p>
           </div>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/923251206427"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[90] flex items-center gap-4 md:gap-8 group"
      >
        <div className="hidden md:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-12 group-hover:translate-x-0">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] bg-svz-red text-white p-2 mb-2">Clinical Support Node</span>
            <span className="text-[11px] font-bold text-white uppercase tracking-[0.3em]">Syn Now</span>
        </div>
        <div className="w-14 h-14 md:w-20 md:h-20 bg-white text-black flex items-center justify-center hover:bg-svz-red hover:text-white transition-all duration-700 shadow-2xl relative">
           <Phone className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-125 transition-transform" />
           <div className="absolute inset-0 border border-white/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
        </div>
      </a>
    </footer>
  );
}