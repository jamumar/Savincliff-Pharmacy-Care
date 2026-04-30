import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Phone } from 'lucide-react';

const MEDIA_ITEMS = [
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef850a62a31513d92321de_image%2035.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef958c378e00c0014110d5_image%2036.png",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef958c7b7ec20bd88c8645_image%2037.png",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a628bb_image%2034.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a628b2_image%2033.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a628ac_image%2032.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a628a6_image%2031.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a62882_image%2023.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a6287c_image%2026.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a62863_image%2022.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a6285d_image%2024.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a62857_image%2020.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a628a0_image%20(5).avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a6289a_image%20(3).avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a62894_image%20(2).avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a6288e_image%2029.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a62888_image%2027.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a6284b_image%2021.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a62851_image%2025.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a62876_image%2018.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a62870_image%2019.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef84427f795f4095a6286a_image%2028.avif",
  "https://cdn.prod.website-files.com/67f19f0a1b1647af446c1b4f_image%201927.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef781e69ec119c5f8d5e6f_image%2021.png",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef781eac27cc874d7fc949_image%2029.png",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef9203a9f072797de1f6d3_image%2030.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef9203a9f072797de1f6d0_image%2033.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef924284274f8f2fed36f6_image%20(7).avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ef9242d764533fe40057df_image%20(6).avif",
  "https://cdn.prod.website-files.com/67f1887f9d7d740e4b844ac1_honeyreal.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67f0c6471a5aa0111ee9fab9_gum.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67f04ff0a776916481ca3bf3_pizz.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67f19f0a222cbff5699a013a_image%201928.avif",
  "https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67f19f0a2c16f4095e902831_image%201929.avif"
];

export default function Footer() {
  const triggerRef = useRef(null);
  const cardRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPercent = clientX / window.innerWidth;
      const yPercent = clientY / window.innerHeight;

      // Parallax movement for the card
      const xMove = (xPercent - 0.5) * 150;
      const yMove = (yPercent - 0.5) * 150;

      gsap.to(cardRef.current, {
        x: xMove,
        y: yMove,
        rotateY: (xPercent - 0.5) * 40,
        rotateX: -(yPercent - 0.5) * 40,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Change image based on mouse X for the 3D rotation effect
      const index = Math.floor(xPercent * (MEDIA_ITEMS.length - 1));
      setActiveImageIndex(index);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for Nav Opacity
    const homeNavBottom = document.querySelector('.home_navigation-bottom');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (homeNavBottom) {
          homeNavBottom.style.opacity = entry.isIntersecting ? '0' : '1';
        }
      });
    }, { threshold: 0.1 });

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const footerLinks = [
    { 
      title: 'AGENCY', 
      links: [
        { name: 'CAPABILITIES', path: '/services' },
        { name: 'ENTERPRISE', path: '/wholesale' }
      ] 
    },
    { 
      title: 'WORK', 
      links: [
        { name: 'PROJECTS', path: '/products' },
        { name: 'FAQs', path: '/contact' }
      ] 
    },
    { 
      title: 'CULTURE', 
      links: [
        { name: 'ABOUT', path: '/about' },
        { name: 'SHOP', path: '/shop' }
      ] 
    },
    { 
      title: 'INSIGHTS', 
      links: [
        { name: 'BLOG POSTS', path: '/compliance' },
        { name: 'CLIENT\'S INVESTORS', path: '/wholesale' }
      ] 
    },
    { 
      title: 'SOCIALS', 
      links: [
        { name: 'IG', path: '#' },
        { name: 'LINKEDIN', path: '#' }
      ] 
    }
  ];

  return (
    <footer ref={triggerRef} className="footer_ix-trigger bg-black text-white relative overflow-hidden">
      
      {/* 3D Visual Section */}
      <section className="mwg_effect002 min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden">
        
        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="opacity-50 text-[10px] md:text-[12px] font-black tracking-[0.5em] mb-12 uppercase">SVZ AGENCY - EST. MMXIII</div>
            
            <div className="mb-20">
                <div className="text-[5vw] md:text-[2.5vw] font-bold text-white/40 uppercase leading-none mb-4 tracking-tighter">humans</div>
                <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-[-0.05em] uppercase mb-4">Bridging The Gap</h1>
                <div className="text-[5vw] md:text-[2.5vw] font-bold text-white/40 uppercase leading-none mb-6 tracking-tighter">between</div>
                <h1 className="text-[10vw] md:text-[7vw] font-black leading-[0.8] tracking-[-0.05em] uppercase">Technology and Artistry</h1>
            </div>

            <Link 
                to="/contact" 
                className="group relative inline-flex items-center justify-center px-16 py-7 border border-white/20 overflow-hidden transition-all duration-700 hover:border-white/40"
            >
                <span className="relative z-10 text-[13px] font-black tracking-[0.3em] uppercase group-hover:text-black transition-colors duration-700">DISCOVERY CALL</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
            </Link>

            {/* Link Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 mt-40 w-full max-w-7xl text-left border-t border-white/5 pt-20">
                {footerLinks.map((group) => (
                    <div key={group.title} className="space-y-8">
                        <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/30 uppercase">{group.title}</h3>
                        <div className="flex flex-col gap-6">
                            {group.links.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    className="text-[12px] font-black tracking-[0.2em] uppercase hover:text-svz-red transition-all duration-500 hover:translate-x-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-40 pt-12 border-t border-white/5 w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">© 2012-2025 SVZ. All rights reserved.</p>
                    <p className="text-[8px] font-bold tracking-[0.2em] text-white/5 uppercase">SYNCHRONIZED AT NODE 04 / 23:59:59</p>
                </div>
                <div className="flex gap-12">
                    <Link to="/privacy" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase hover:text-white transition-colors">Service Protocol</Link>
                </div>
            </div>
        </div>

        {/* 3D Card Model (Background Layer) */}
        <div 
            ref={cardRef} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            style={{ perspective: '1500px' }}
        >
            <div className="relative w-[60vw] md:w-[45vw] aspect-[0.75] flex items-center justify-center">
                {MEDIA_ITEMS.map((src, i) => (
                    <img 
                        key={`${src}-${i}`}
                        src={src}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${i === activeImageIndex ? 'opacity-20 md:opacity-30' : 'opacity-0'}`}
                    />
                ))}
            </div>
        </div>

        {/* Dynamic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-[5]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-[5]" />
      </section>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/923251206427"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[90] flex items-center gap-4 group"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 bg-white text-black flex items-center justify-center hover:bg-svz-red hover:text-white transition-all duration-700 shadow-2xl relative">
           <Phone className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-125 transition-transform" />
           <div className="absolute inset-0 border border-white/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
        </div>
      </a>
    </footer>
  );
}