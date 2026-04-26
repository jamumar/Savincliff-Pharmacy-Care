import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { useAuth } from '@/lib/AuthContext';
import apiClient from '@/api/apiClient';
import { toast } from '@/components/ui/use-toast';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const inputClass = "w-full bg-white/[0.04] border border-white/10 text-white placeholder-white/25 px-4 py-3.5 pl-11 text-sm focus:outline-none focus:border-[#1B6E8C] transition-colors duration-300";

export default function Register() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [showPass, setShowPass] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const GOOGLE_CLIENT_ID = "610756205130-ds7tdsbijuuo07m5gldkbbmf00mt406d.apps.googleusercontent.com";

  React.useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });
    }
  }, []);

  async function handleGoogleResponse(response) {
    setLoading(true);
    try {
      const res = await apiClient.post('auth/google/', {
        id_token: response.credential
      });
      login(res.data.user, res.data.access, res.data.refresh);
      setDone(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Login Failed",
        description: "Could not authenticate with Google. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleGoogle = () => {
    if (window.google) {
      google.accounts.id.prompt(); 
    }
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        if (mode === 'signup') {
            const response = await apiClient.post('auth/register/', {
                username: form.email, // using email as username
                email: form.email,
                password: form.password,
                phone_number: '', // placeholder
            });
            login(response.data.user, response.data.access, response.data.refresh);
        } else {
            const response = await apiClient.post('auth/login/', {
                email: form.email,
                password: form.password
            });
            // After successful login, fetch the user profile
            const profileRes = await apiClient.get('auth/me/', {
                headers: { Authorization: `Bearer ${response.data.access}` }
            });
            login(profileRes.data, response.data.access, response.data.refresh);
        }
        
        setDone(true);
        setTimeout(() => navigate('/'), 1500);
    } catch (error) {
        console.error('Auth error:', error);
        toast({
            variant: "destructive",
            title: mode === 'signin' ? "Login Failed" : "Signup Failed",
            description: error.response?.data?.detail || error.response?.data?.error || "Invalid credentials. Please try again.",
        });
    } finally {
        setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col lg:flex-row overflow-hidden">

      {/* Left panel — brand */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 overflow-hidden"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E4F73]/60 via-[#0A0A0A] to-[#0A0A0A]" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#1B6E8C]/20 blur-3xl"
        />

        <div className="relative z-10">
          <Link to="/"><Logo variant="light" /></Link>
        </div>

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-serif text-4xl xl:text-5xl font-light leading-snug mb-6"
          >
            Your health journey<br />
            <em className="not-italic text-[#1B6E8C]">starts here.</em>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/40 text-base leading-relaxed max-w-sm"
          >
            Join thousands of patients who trust Savincliff Pharmacy for genuine medications and expert care in Abuja.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-col gap-3"
          >
            {['PCN Licensed Pharmacists', 'NAFDAC Verified Products', 'Secure Health Records'].map((item, i) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-[#1B6E8C] shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-white/50">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 text-[10px] tracking-[0.3em] uppercase text-white/20">
          © {new Date().getFullYear()} Savincliff Pharmacy
        </div>
      </motion.div>

      {/* Right panel — form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 min-h-screen lg:min-h-0"
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link to="/"><Logo variant="light" /></Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-[#1B6E8C] transition-colors mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30"
                >
                  <CheckCircle className="w-7 h-7 text-emerald-400" />
                </motion.div>
                <h2 className="font-serif text-3xl font-light">Welcome!</h2>
                <p className="text-white/40 mt-3 text-sm">Redirecting you to the homepage…</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Tab toggle */}
                <div className="flex border border-white/10 mb-8 p-1 relative">
                  <motion.div
                    className="absolute top-1 bottom-1 bg-white/10 transition-all duration-300"
                    animate={{ left: mode === 'signin' ? '4px' : '50%', right: mode === 'signin' ? '50%' : '4px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                  {['signin', 'signup'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`relative z-10 flex-1 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors ${mode === m ? 'text-white' : 'text-white/30'}`}
                    >
                      {m === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h1 className="font-serif text-3xl font-light mb-1">
                      {mode === 'signin' ? 'Welcome back' : 'Create your account'}
                    </h1>
                    <p className="text-white/35 text-sm mb-8">
                      {mode === 'signin' ? 'Sign in to manage your orders and prescriptions.' : 'Join Savincliff for seamless pharmacy access.'}
                    </p>

                    {/* Google button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                      onClick={handleGoogle}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 border border-white/15 py-3.5 text-sm text-white/80 hover:border-white/30 transition-all duration-300 mb-6"
                    >
                      <GoogleIcon />
                      Continue with Google
                    </motion.button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-white/25">or</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {mode === 'signup' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="relative"
                        >
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                          <input
                            required
                            placeholder="Full Name"
                            value={form.name}
                            onChange={e => set('name', e.target.value)}
                            className={inputClass}
                          />
                        </motion.div>
                      )}

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                        <input
                          required
                          type="email"
                          placeholder="Email address"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                        <input
                          required
                          type={showPass ? 'text' : 'password'}
                          placeholder="Password"
                          value={form.password}
                          onChange={e => set('password', e.target.value)}
                          className={`${inputClass} pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(s => !s)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                        >
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {mode === 'signin' && (
                        <div className="text-right">
                          <button type="button" className="text-[11px] text-white/30 hover:text-[#1B6E8C] transition-colors tracking-wide">
                            Forgot password?
                          </button>
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-3 bg-[#1B6E8C] text-white py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#0E4F73] transition-colors duration-500 mt-2 disabled:opacity-60"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            {mode === 'signin' ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </form>

                    <p className="text-center mt-6 text-[12px] text-white/30">
                      {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                      <button
                        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                        className="text-[#1B6E8C] hover:underline"
                      >
                        {mode === 'signin' ? 'Create one' : 'Sign in'}
                      </button>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}