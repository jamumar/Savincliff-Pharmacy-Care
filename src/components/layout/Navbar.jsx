import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/brand/Logo';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';

const NAV = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'INVENTORY', path: '/shop' },
  { label: 'WELLNESS', path: '/products' },
  { label: 'SERVICES', path: '/services' },
  { label: 'PROTOCOLS', path: '/protocols' },
  { label: 'INQUIRIES', path: '/faqs' },
  { label: 'RX TERMINAL', path: '/rx-terminal' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const location = useLocation();
  const { count, setOpen: setCartOpen } = useCart();
  const { user, logout } = useAuth();

  const isDarkHeroPage = ['/', '/register', '/about', '/services', '/shop'].includes(location.pathname) || location.pathname.startsWith('/faqs');
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
              <Logo variant={open || !useDark ? 'light' : 'dark'} scrolled={scrolled} />
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
              <div className="bg-[#1B6E8C] text-white py-4 uppercase text-2xs font-black tracking-[0.3em] overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-8">UPLOAD RX &rarr;</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navbar */}
      <nav className={`hidden lg:block fixed top-0 left-0 w-full z-[90] transition-all duration-700 ${useDark ? 'text-black' : 'text-white'} ${scrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link to="/">
             <Logo variant={useDark ? 'dark' : 'light'} scrolled={scrolled} />
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
                  <div className="flex flex-col gap-3">
                    <div className="text-2xs md:text-sm font-black text-current/30 tracking-[0.2em] uppercase mb-1">
                      [ COMPANY ]
                    </div>
                    <Link to="/" className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2`}>
                      <span className={`transition-colors duration-500 ${isActive('/') ? 'text-[#1B6E8C]' : 'text-current/30'}`}>-</span> HOME
                    </Link>
                    <Link to="/about" className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2`}>
                      <span className={`transition-colors duration-500 ${isActive('/about') ? 'text-[#1B6E8C]' : 'text-current/30'}`}>-</span> ABOUT
                    </Link>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="text-2xs md:text-sm font-black text-current/30 tracking-[0.2em] uppercase mb-1">
                      [ MARKET ]
                    </div>
                    <Link to="/shop" className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2`}>
                      <span className={`transition-colors duration-500 ${isActive('/shop') ? 'text-[#1B6E8C]' : 'text-current/30'}`}>-</span> INVENTORY
                    </Link>
                    <Link to="/products" className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2`}>
                      <span className={`transition-colors duration-500 ${isActive('/products') ? 'text-[#1B6E8C]' : 'text-current/30'}`}>-</span> WELLNESS
                    </Link>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="text-2xs md:text-sm font-black text-current/30 tracking-[0.2em] uppercase mb-1">
                      [ CLINICAL ]
                    </div>
                    <Link to="/services" className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2`}>
                      <span className={`transition-colors duration-500 ${isActive('/services') ? 'text-[#1B6E8C]' : 'text-current/30'}`}>-</span> SERVICES
                    </Link>
                    <Link to="/protocols" className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2`}>
                      <span className={`transition-colors duration-500 ${isActive('/protocols') ? 'text-[#1B6E8C]' : 'text-current/30'}`}>-</span> PROTOCOLS
                    </Link>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="text-2xs md:text-sm font-black text-current/30 tracking-[0.2em] uppercase mb-1">
                      [ ACCESS ]
                    </div>
                    <Link to="/faqs" className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2`}>
                      <span className={`transition-colors duration-500 ${isActive('/faqs') ? 'text-[#1B6E8C]' : 'text-current/30'}`}>-</span> INQUIRIES
                    </Link>
                    <Link to="/rx-terminal" className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2`}>
                      <span className={`transition-colors duration-500 ${isActive('/rx-terminal') ? 'text-[#1B6E8C]' : 'text-current/30'}`}>-</span> RX TERMINAL
                    </Link>
                    <button onClick={() => setCartOpen(true)} className={`text-2xs md:text-sm font-black tracking-[0.2em] uppercase transition-colors hover:text-[#1B6E8C] flex items-center gap-2 text-left`}>
                      <span className="text-current/30">-</span> ORDER [{count}]
                    </button>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Right Side Buttons - Always visible but adaptive */}
          <div className="flex items-center gap-8">
             {user && (
               <button 
                 onClick={logout} 
                 className={`text-2xs md:text-sm font-black uppercase tracking-[0.2em] ${useDark ? 'text-black/50 hover:text-black' : 'text-white/50 hover:text-white'} transition-colors`}
               >
                  EXIT SESSION
               </button>
             )}
             <Link 
               to="/rx-terminal" 
               className={`px-8 py-3 text-2xs md:text-sm font-black uppercase tracking-[0.2em] border ${useDark ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'} transition-all`}
             >
                UPLOAD RX
             </Link>
          </div>
        </div>
      </nav>

    </>
  );
}