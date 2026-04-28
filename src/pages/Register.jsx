import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { useAuth } from '@/lib/AuthContext';
// import apiClient from '@/api/apiClient'; // Backend disconnected for prototype
import { toast } from '@/components/ui/use-toast';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Register() {
  const [mode, setMode] = useState('signin');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogle = () => {
    // Mock Google login
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        id: 1,
        username: 'Clinical User',
        email: 'patient@savincliff.com',
        phone_number: '+234 923 251 2064',
        address: 'Divib Plaza, 7th Avenue, Gwarinpa, Abuja'
      };
      login(mockUser, 'mock-access-token', 'mock-refresh-token');
      setDone(true);
      toast({ title: "NODE ACCESSED", description: "Mock clinical session initialized." });
      setTimeout(() => navigate('/'), 1500);
      setLoading(false);
    }, 800);
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock submit — simulate API delay
    setTimeout(() => {
      const mockUser = {
        id: 1,
        username: form.name || form.email.split('@')[0],
        email: form.email,
        phone_number: '',
        address: ''
      };
      login(mockUser, 'mock-access-token', 'mock-refresh-token');
      setDone(true);
      toast({ title: "NODE ACCESSED", description: `Welcome, ${mockUser.username}. Session established.` });
      setTimeout(() => navigate('/'), 1500);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Left panel — High Impact Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex md:w-1/2 flex-col justify-between p-20 relative bg-black border-r border-white/5"
      >
        <Logo variant="light" />
        
        <div className="relative z-10">
           <p className="text-[10px] font-black tracking-[0.4em] uppercase text-svz-red mb-12">Portal Authentication / Node 04</p>
           <h1 className="display-svz">
             THE<br />
             ACCESS
           </h1>
           <div className="mt-20 max-w-sm">
             <p className="text-[11px] font-bold uppercase leading-relaxed tracking-widest text-white/40">
               Initialize your clinical session. Total verification. High-fidelity medical synchronization begins here.
             </p>
           </div>
        </div>

        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
           Savincliff Clinical © 2026
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-svz-red/5 blur-[150px] rounded-full" />
      </motion.div>

      {/* Right panel — Minimalist Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="flex-1 flex flex-col justify-center px-6 md:px-24 bg-black min-h-screen py-24 md:py-0"
      >
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors mb-10 md:mb-20">
             <ArrowLeft className="w-4 h-4" /> Exit to Root
          </Link>

          <AnimatePresence mode="wait">
             {done ? (
                <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
                   <div className="w-20 h-20 bg-svz-red text-white flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10" strokeWidth={1} />
                   </div>
                   <h2 className="text-4xl font-black uppercase tracking-tighter">NODE ACCESSED</h2>
                   <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Redirecting to clinical terminal...</p>
                </motion.div>
             ) : (
                <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                   <div className="flex gap-12 mb-16 border-b border-white/10">
                      {['signin', 'signup'].map(m => (
                         <button 
                            key={m} 
                            onClick={() => setMode(m)}
                            className={`pb-4 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative ${mode === m ? 'text-white' : 'text-white/20'}`}
                         >
                            {m === 'signin' ? 'Session' : 'Registry'}
                            {mode === m && <motion.div layoutId="auth-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-svz-red" />}
                         </button>
                      ))}
                   </div>

                   <button 
                      onClick={handleGoogle}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-6 border border-white/10 py-6 text-[11px] font-black uppercase tracking-[0.2em] group hover:bg-white hover:text-black transition-all duration-700 mb-12"
                   >
                      <GoogleIcon /> Continue with Google Node
                   </button>

                   <div className="flex items-center gap-8 mb-12">
                      <div className="h-px bg-white/10 flex-1" />
                      <span className="text-[9px] font-black tracking-[0.4em] text-white/20">OR</span>
                      <div className="h-px bg-white/10 flex-1" />
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-12">
                      {mode === 'signup' && (
                         <div className="space-y-4">
                            <label className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40">Patient Handle</label>
                            <input 
                               type="text" 
                               value={form.name} 
                               onChange={e => set('name', e.target.value)}
                               placeholder="ENTER FULL SPEC"
                               className="w-full bg-transparent border-b border-white/10 py-4 text-[12px] font-bold tracking-widest text-white focus:outline-none focus:border-svz-red uppercase transition-colors" 
                            />
                         </div>
                      )}
                      
                      <div className="space-y-4">
                         <label className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40">Email Protocol</label>
                         <input 
                            type="email" 
                            value={form.email} 
                            onChange={e => set('email', e.target.value)}
                            placeholder="IDENTITY@NODE.COM"
                            className="w-full bg-transparent border-b border-white/10 py-4 text-[12px] font-bold tracking-widest text-white focus:outline-none focus:border-svz-red uppercase transition-colors" 
                         />
                      </div>

                      <div className="space-y-4">
                         <label className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40">Access Key</label>
                         <input 
                            type="password" 
                            value={form.password} 
                            onChange={e => set('password', e.target.value)}
                            placeholder="SECRET KEY"
                            className="w-full bg-transparent border-b border-white/10 py-4 text-[12px] font-bold tracking-widest text-white focus:outline-none focus:border-svz-red uppercase transition-colors" 
                         />
                      </div>

                      <button 
                         type="submit" 
                         disabled={loading}
                         className="w-full bg-white text-black py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-svz-red hover:text-white transition-all duration-700 flex items-center justify-center gap-6"
                      >
                         {loading ? 'Processing Node...' : mode === 'signin' ? 'Initiate Session' : 'Registry Entry'} <ArrowRight className="w-4 h-4" />
                      </button>
                   </form>
                </motion.div>
             )}
          </AnimatePresence>
        </div>
      </motion.div>

    </div>
  );
}