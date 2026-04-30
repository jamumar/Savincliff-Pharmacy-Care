import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
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
  const location = useLocation();
  const { count, setOpen: setCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  // Pages with dark hero backgrounds where white text is needed initially
  const isDarkHero = location.pathname === '/' || location.pathname === '/register';
  // Use dark text when scrolled OR when the page has a light background
  const useDark = scrolled || !isDarkHero;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-700 ${
          scrolled 
            ? 'bg-white border-b border-black/10 py-5' 
            : isDarkHero 
              ? 'bg-transparent border-b border-transparent py-10'
              : 'bg-white/80 backdrop-blur-md border-b border-black/5 py-5'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/">
             <Logo variant={useDark ? 'dark' : 'light'} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-12">
            {NAV.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 hover-red-line pb-1 ${
                    useDark
                      ? active ? 'text-svz-red' : 'text-black hover:text-svz-red'
                      : active ? 'text-svz-red' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5 md:gap-10">
            {/* Account Node */}
            {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-2 md:gap-4 shrink-0 text-[9px] font-black tracking-[0.3em] uppercase transition-all duration-500 ${
                       useDark ? 'text-black' : 'text-white'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 bg-svz-red" />
                    <span className="hidden sm:inline-block">{user.username || 'NODE 01'}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-700 ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 mt-8 w-60 bg-black text-white p-0 shadow-2xl border border-white/5 overflow-hidden"
                      >
                         <Link to="/account" className="block px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-svz-red transition-all duration-500">Terminal</Link>
                         <Link to="/account/orders" className="block px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-svz-red transition-all duration-500 border-t border-white/5">Audit history</Link>
                         <button onClick={logout} className="w-full text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-svz-red hover:bg-white hover:text-black transition-all duration-500 border-t border-white/5">Exit Session</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            ) : (
                <Link
                    to="/register"
                    className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 ${
                       useDark ? 'text-black hover:text-svz-red' : 'text-white hover:text-svz-red'
                    }`}
                >
                    Registry
                </Link>
            )}

            {/* Cart node */}
            <button
               onClick={() => setCartOpen(true)}
               className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 group flex items-center gap-2 ${
                  useDark ? 'text-black hover:text-svz-red' : 'text-white hover:text-svz-red'
               }`}
            >
               Order <span className="text-svz-red group-hover:text-black">[{count}]</span>
            </button>

            {/* CTA Node */}
            <Link
              to="/wholesale"
              className={`hidden md:flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase px-8 py-4 transition-all duration-700 ${
                useDark 
                    ? 'bg-black text-white hover:bg-svz-red' 
                    : 'bg-white text-black hover:bg-svz-red hover:text-white'
              }`}
            >
              Rx TERMINAL <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden shrink-0 transition-colors ${useDark || open ? 'text-black' : 'text-white'}`}
            >
              {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[75] bg-white text-black flex flex-col justify-between p-6 md:p-24"
          >
            <div className="mt-24 md:mt-32 space-y-8 md:space-y-12">
               <p className="label-svz text-black/20">Clinical Navigation</p>
               <div className="flex flex-col gap-4 md:gap-8">
                  {NAV.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-[10vw] md:text-8xl font-black uppercase tracking-tighter hover:text-svz-red transition-all duration-700 leading-none"
                    >
                      {item.label.split(' / ')[0]}
                    </Link>
                  ))}
               </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 border-t border-black/10 pt-6 md:pt-12">
               <div>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-black/30 mb-2">Registry Access</p>
                  <Link to="/register" className="text-xl md:text-3xl font-black uppercase tracking-tighter hover:text-svz-red transition-all">Patient Session</Link>
               </div>
               <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-black/10">Savincliff Pharmacy © 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowRight(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
}