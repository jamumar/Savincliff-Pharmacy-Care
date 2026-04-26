import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ShoppingBag, User, LogOut, Package, FileText, Settings, Heart, ChevronDown } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Shop', path: '/shop' },
  { label: 'Services', path: '/services' },
  { label: 'Wholesale & Rx', path: '/wholesale' },
  { label: 'Compliance', path: '/compliance' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { count, setOpen: setCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm' : 'bg-[#0A0A0A]'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/"><Logo variant={scrolled ? 'dark' : 'light'} /></Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-[13px] tracking-wide transition-colors ${
                    scrolled
                      ? active ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
                      : active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute left-4 right-4 -bottom-px h-px bg-[#1B6E8C]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Auth Button */}
            {user ? (
                <div className="relative">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-3 px-3 py-2 border transition-all duration-300 ${
                      scrolled 
                        ? 'border-black/10 text-[#0A0A0A] hover:bg-black/5' 
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="w-6 h-6 bg-[#1B6E8C] text-white flex items-center justify-center text-[10px] font-bold">
                      {user.email?.[0].toUpperCase() || 'U'}
                    </div>
                    <span className="hidden md:block text-[11px] tracking-[0.1em] uppercase font-medium">
                      {(user.email?.split('@')[0]) || 'Account'}
                    </span>
                    <ChevronDown className={`w-3 h-3 opacity-40 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-0" onClick={() => setProfileOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-56 bg-white shadow-2xl border border-black/5 z-10 py-2"
                        >
                          <div className="px-4 py-3 border-b border-black/5 mb-2">
                            <p className="text-[10px] uppercase tracking-widest text-black/40">Signed in as</p>
                            <p className="text-xs font-bold text-black truncate">{user.email}</p>
                          </div>
                          
                          <Link to="/account/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-black/70 hover:bg-black/5 transition-colors">
                            <Package className="w-4 h-4 opacity-40" /> Order Status
                          </Link>
                          <Link to="/account/prescriptions" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-black/70 hover:bg-black/5 transition-colors">
                            <FileText className="w-4 h-4 opacity-40" /> My Prescriptions
                          </Link>
                          <Link to="/account/wishlist" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-black/70 hover:bg-black/5 transition-colors">
                            <Heart className="w-4 h-4 opacity-40" /> Favorites
                          </Link>
                          <Link to="/account/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-black/70 hover:bg-black/5 transition-colors">
                            <Settings className="w-4 h-4 opacity-40" /> Settings
                          </Link>
                          
                          <div className="mt-2 pt-2 border-t border-black/5">
                            <button 
                              onClick={() => { logout(); setProfileOpen(false); }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
            ) : (
              <Link
                to="/register"
                className={`hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase px-4 py-2.5 border transition-colors duration-500 ${
                  scrolled
                    ? 'border-black/15 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
                    : 'border-white/25 text-white/80 hover:bg-white/10'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Sign In
              </Link>
            )}
            {/* Cart button */}
            <motion.button
              onClick={() => setCartOpen(true)}
              whileTap={{ scale: 0.92 }}
              className={`relative flex items-center gap-2 px-4 py-2.5 border transition-colors duration-500 ${
                scrolled
                  ? 'border-black/15 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A]'
                  : 'border-white/30 text-white hover:bg-white hover:text-[#0A0A0A]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:block text-[11px] tracking-[0.15em] uppercase">Cart</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#1B6E8C] text-white text-[9px] rounded-full w-4.5 h-4.5 w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <Link
              to="/wholesale"
              className={`hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase px-5 py-3 transition-colors duration-500 ${
                scrolled ? 'bg-[#0A0A0A] text-white hover:bg-[#1B6E8C]' : 'bg-white text-[#0A0A0A] hover:bg-[#1B6E8C] hover:text-white'
              }`}
            >
              Upload Rx <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center ${scrolled ? 'text-[#0A0A0A]' : 'text-white'}`}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] text-white lg:hidden flex flex-col justify-center px-8"
          >
            <Logo variant="light" className="absolute top-6 left-6" />
            {NAV.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              >
                <Link
                  to={item.path}
                  className="block font-serif text-4xl py-4 border-b border-white/10 hover:text-[#1B6E8C] transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 + NAV.length * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            >
              <Link
                to="/register"
                className="block font-serif text-4xl py-4 border-b border-white/10 hover:text-[#1B6E8C] transition-colors"
              >
                Sign In
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-10 text-sm text-white/50"
            >
              <p>+92 325 1206427</p>
              <p>info@savincliffpharmacy.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}