import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Zap, ClipboardList, Package, Truck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    { 
        id: '01', 
        name: 'Clinical Dispensing', 
        desc: 'Precision handling of all pharmaceutical requirements. Every dose is verified through primary clinical audits before fulfillment.',
        icon: <Package className="w-12 h-12 text-svz-red" strokeWidth={1} />
    },
    { 
        id: '02', 
        name: 'Rx Verification', 
        desc: 'Advanced regulatory portal for prescription authentication. We link patients directly to our licensed clinical oversight team.',
        icon: <ClipboardList className="w-12 h-12 text-svz-red" strokeWidth={1} />
    },
    { 
        id: '03', 
        name: 'Chronic Care Node', 
        desc: 'Integrated management plans for hypertension, diabetes, and respiratory conditions. Long-term health, redefined.',
        icon: <Activity className="w-12 h-12 text-svz-red" strokeWidth={1} />
    },
    { 
        id: '04', 
        name: 'Wholesale Ops', 
        desc: 'Industrial-grade pharmaceutical supply chain for hospitals and clinics. Total compliance, total transparency.',
        icon: <ShieldCheck className="w-12 h-12 text-svz-red" strokeWidth={1} />
    },
    { 
        id: '05', 
        name: 'Rapid Logistics', 
        desc: 'Temperature-controlled fulfillment network delivering medical essentials within 4 hours in Abuja and 48 hours nationwide.',
        icon: <Truck className="w-12 h-12 text-svz-red" strokeWidth={1} />
    },
    { 
        id: '06', 
        name: 'Clinical Advisory', 
        desc: 'Direct consultation node allowing patients to interact with licensed pharmacists for medication synergy and dosage guidance.',
        icon: <Zap className="w-12 h-12 text-svz-red" strokeWidth={1} />
    }
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".media");

      // Initial stack (only first visible)
      gsap.set(cards, {
        y: 100,
        z: -200,
        scale: 0.9,
        opacity: 0,
        rotate: (i) => gsap.utils.random(-10, 10),
        transformOrigin: "center center",
      });

      // First card visible
      gsap.set(cards[0], {
        y: 0,
        z: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 800}`, // 👈 each card gets scroll space
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        const prev = cards[i - 1];

        // Bring current card in
        tl.to(card, {
          y: 0,
          z: 0,
          scale: 1,
          opacity: 1,
          rotate: 0,
          ease: "power3.out",
          duration: 0.6,
        });

        // Push previous card back
        tl.to(prev, {
          y: -80,
          z: -150,
          scale: 0.85,
          opacity: 0.3,
          ease: "power2.out",
          duration: 0.6,
        }, "<");

        // 👇 HOLD (this is what makes it readable)
        tl.to({}, { duration: 0.5 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white min-h-screen pt-40 overflow-x-hidden">
      
      {/* High-Impact Heading */}
      <section className="px-6 md:px-12 mb-20 lg:mb-40">
         <div className="max-w-[1800px] mx-auto border-b border-black pb-12">
            <h1 className="display-svz uppercase">CAPABILITIES</h1>
            <p className="text-[11px] font-bold tracking-[0.4em] text-black/40 mt-4 uppercase">CLINICAL SERVICE PORTFOLIO / 2026 EDITION</p>
         </div>
      </section>

      {/* Animated Services Section */}
      <section ref={sectionRef} className="relative h-screen flex items-center justify-center bg-black overflow-hidden" style={{ perspective: "1000px" }}>
        <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
            {SERVICES.map((s, i) => (
                <div 
                    key={s.id}
                    className="media absolute w-full max-w-lg md:max-w-2xl bg-white text-black p-8 md:p-16 border border-black/10 shadow-2xl flex flex-col justify-between min-h-[450px]"
                >
                    <div>
                        <div className="mb-12">{s.icon}</div>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">{s.name}</h3>
                        <p className="text-[11px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-black/60 leading-relaxed max-w-md">{s.desc}</p>
                    </div>
                    <div className="mt-12 flex justify-between items-end">
                        <span className="text-4xl md:text-6xl font-black opacity-10 select-none tracking-tighter">{s.id}</span>
                        <div className="w-2 h-2 bg-svz-red rounded-full" />
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Highlight Section */}
      <section className="bg-black text-white py-40 px-6 md:px-12 overflow-hidden relative">
         <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <h2 className="sub-display-svz mb-12">PRECISION<br />LOGISTICS</h2>
            <p className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto leading-tight tracking-tight uppercase font-medium mb-16">
                Our logistics node is a project of efficiency. Temperature-controlled transit environments, real-time clinical tracking, and total audit trails for every delivery.
            </p>
            <div className="relative aspect-video max-w-5xl mx-auto overflow-hidden bg-white/5">
                <img 
                   src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80" 
                   alt="Logistics Node" 
                   className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-1000"
                />
            </div>
         </div>
         {/* Decoration */}
         <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-svz-red/5 blur-[150px] rounded-full" />
      </section>

      {/* Corporate Inquiries */}
      <section className="py-40 text-center px-6 md:px-12 bg-white">
         <div className="max-w-[1800px] mx-auto">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-svz-red mb-8">Wholesale & Institutional</p>
            <h2 className="display-svz text-black/10 group hover:text-black transition-colors duration-1000 cursor-default">
               ENTERPRISE<br />HEALTH
            </h2>
            <div className="mt-20">
                <button className="bg-black text-white px-20 py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-svz-red transition-all duration-500">
                    Initiate Partnership
                </button>
            </div>
         </div>
      </section>

    </div>
  );
}