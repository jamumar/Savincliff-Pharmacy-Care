import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/brand/Logo';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';

const NAV = [
  { label: 'ABOUT', path: '/about' },
  { label: 'EXPLORE', path: '/shop' },
  { label: 'SERVICES', path: '/services' },
  { label: 'QA / NODES', path: '/products' },
  { label: 'RX TERMINAL', path: '/wholesale' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const location = useLocation();
  const { count, setOpen: setCartOpen } = useCart();
  const { user, logout } = useAuth();

  const isDarkHeroPage = location.pathname === '/' || location.pathname === '/register' || location.pathname === '/about';
  const useDark = isLightBg || !isDarkHeroPage;

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      setIsLightBg(window.scrollY > 800);
    };
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Navbar (Header + Menu) */}
      <div className="lg:hidden">
        <header 
          className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-500 ${
            open ? 'bg-black text-white' : useDark || scrolled ? 'bg-white text-black border-b border-black/10' : 'bg-transparent text-white border-b border-transparent'
          }`}
        >
          <div className="flex justify-between items-center px-6 py-5">
            <Link to="/" onClick={() => setOpen(false)}>
              <Logo variant={open || !useDark ? 'light' : 'dark'} />
            </Link>
            <button 
              className="centered-nav__toggle w-10 h-10 flex flex-col items-center justify-center" 
              onClick={() => setOpen(!open)}
            >
              <motion.div 
                animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                className={`w-6 h-[1.5px] mb-1.5 transition-colors ${open ? 'bg-white' : useDark ? 'bg-black' : 'bg-white'}`} 
              />
              <motion.div 
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                className={`w-6 h-[1.5px] transition-colors ${open ? 'bg-white' : useDark ? 'bg-black' : 'bg-white'}`} 
              />
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[95] bg-black text-white flex flex-col pt-24"
            >
              <div className="flex-1 overflow-y-auto px-6">
                <ul className="flex flex-col text-center mt-10">
                  {NAV.map((item, idx) => (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="border-b border-white/10"
                    >
                      <Link 
                        to={item.path} 
                        className={`block py-6 text-2xl font-bold uppercase tracking-widest transition-colors ${isActive(item.path) ? 'text-[#1B6E8C]' : 'hover:text-[#1B6E8C]'}`}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + NAV.length * 0.05 }}
                    className="border-b border-white/10"
                  >
                    {user ? (
                      <button 
                        onClick={() => { logout(); setOpen(false); }} 
                        className="w-full py-6 text-sm font-bold uppercase tracking-[0.3em] text-white/50 hover:text-[#1B6E8C]"
                      >
                        EXIT SESSION ({user.username})
                      </button>
                    ) : (
                      <Link 
                        to="/register" 
                        className="block py-6 text-sm font-bold uppercase tracking-[0.3em] text-white/50 hover:text-[#1B6E8C]"
                        onClick={() => setOpen(false)}
                      >
                        PATIENT REGISTRY
                      </Link>
                    )}
                  </motion.li>
                </ul>
              </div>

              {/* Marquee Banner */}
              <div className="bg-[#1B6E8C] text-white py-4 uppercase text-[10px] font-black tracking-[0.3em] overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-8">DISCOVERY CALL &rarr;</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navbar */}
      <nav className={`hidden lg:block fixed top-0 left-0 w-full z-[90] transition-all duration-700 ${useDark ? 'text-black' : 'text-white'} ${scrolled ? 'py-6' : 'py-10'}`}>
        <div className="max-w-[1800px] mx-auto px-12 flex items-center justify-between">
          <Link to="/">
             <Logo variant={useDark ? 'dark' : 'light'} />
          </Link>

          {/* Desktop Center Links - Hidden on Scroll */}
          <AnimatePresence>
            {!scrolled && (
              <motion.div 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex justify-center gap-20 xl:gap-32"
              >
                 <div className="flex flex-col gap-4">
                   <div className="text-[14px] font-bold text-current/30 tracking-[0.2em] uppercase mb-1">
                     [ COMPANY ]
                   </div>
                   <Link to="/about" className={`text-[18px] font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-3`}>
                     <div className={`w-2 h-2 rounded-full ${isActive('/about') ? 'bg-[#1B6E8C]' : 'bg-transparent group-hover:bg-[#1B6E8C]'} border border-[#1B6E8C]/20`} /> ABOUT
                   </Link>
                   <Link to="/shop" className={`text-[18px] font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-3`}>
                     <div className={`w-2 h-2 rounded-full ${isActive('/shop') ? 'bg-[#1B6E8C]' : 'bg-transparent group-hover:bg-[#1B6E8C]'} border border-[#1B6E8C]/20`} /> EXPLORE
                   </Link>
                 </div>
                 
                 <div className="flex flex-col gap-4">
                   <div className="text-[14px] font-bold text-current/30 tracking-[0.2em] uppercase mb-1">
                     [ CLINICAL ]
                   </div>
                   <Link to="/services" className={`text-[18px] font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-3`}>
                     <div className={`w-2 h-2 rounded-full ${isActive('/services') ? 'bg-[#1B6E8C]' : 'bg-transparent group-hover:bg-[#1B6E8C]'} border border-[#1B6E8C]/20`} /> SERVICES
                   </Link>
                   <Link to="/products" className={`text-[18px] font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-3`}>
                     <div className={`w-2 h-2 rounded-full ${isActive('/products') ? 'bg-[#1B6E8C]' : 'bg-transparent group-hover:bg-[#1B6E8C]'} border border-[#1B6E8C]/20`} /> QA / NODES
                   </Link>
                 </div>

                 <div className="flex flex-col gap-4">
                   <div className="text-[14px] font-bold text-current/30 tracking-[0.2em] uppercase mb-1">
                     [ PORTAL ]
                   </div>
                   <Link to="/wholesale" className={`text-[18px] font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-3`}>
                     <div className={`w-2 h-2 rounded-full ${isActive('/wholesale') ? 'bg-[#1B6E8C]' : 'bg-transparent group-hover:bg-[#1B6E8C]'} border border-[#1B6E8C]/20`} /> RX TERMINAL
                   </Link>
                   <button onClick={() => setCartOpen(true)} className={`text-[18px] font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-3 text-left`}>
                     <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#1B6E8C] border border-[#1B6E8C]/20" /> ORDER [{count}]
                   </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Right Side Buttons - Always visible but adaptive */}
          <div className="flex items-center gap-8">
             {user ? (
               <button onClick={logout} className={`px-12 py-6 text-[16px] font-black uppercase tracking-[0.2em] border ${useDark ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'} transition-all`}>
                  EXIT SESSION
               </button>
             ) : (
               <Link to="/register" className={`px-12 py-6 text-[16px] font-black uppercase tracking-[0.2em] border ${useDark ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'} transition-all`}>
                  DISCOVERY CALL
               </Link>
             )}
          </div>
        </div>
      </nav>

    </>
  );
}