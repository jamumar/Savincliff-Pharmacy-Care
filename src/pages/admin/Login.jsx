import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { ShieldCheck, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-4 border-white/10 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError(err.message.includes('auth/invalid-credential') 
        ? 'Invalid email or password credentials.' 
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6 selection:bg-brand-teal selection:text-white font-sans relative overflow-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] bg-brand-teal/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-brand-teal/5 blur-[180px] rounded-full pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 backdrop-blur-xl p-10 md:p-14 rounded-sm shadow-2xl relative z-10 flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="w-16 h-16 bg-brand-teal/10 border border-brand-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-brand-teal animate-pulse" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">CMS TERMINAL</h1>
          <p className="text-2xs font-black tracking-[0.3em] uppercase text-white/30">Secure Administration Portal</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold py-4 px-6 mb-8 uppercase tracking-widest text-left">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-8 text-left">
          
          {/* Email field */}
          <div className="space-y-3 relative group">
            <label className="text-3xs font-black tracking-[0.3em] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">
              Access Node (Email)
            </label>
            <div className="relative">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@savincliff.com"
                className="w-full bg-transparent border-b border-white/10 py-4 pl-8 pr-4 text-sm font-semibold tracking-normal focus:outline-none focus:border-brand-teal transition-all"
              />
              <Mail className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity text-brand-teal" />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-3 relative group">
            <label className="text-3xs font-black tracking-[0.3em] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">
              Verification Code (Password)
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/10 py-4 pl-8 pr-12 text-sm font-semibold tracking-normal focus:outline-none focus:border-brand-teal transition-all"
              />
              <Lock className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity text-brand-teal" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-brand-teal transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4 opacity-40" /> : <Eye className="w-4 h-4 opacity-40" />}
              </button>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 space-y-4">
            <button
              disabled={loading}
              type="submit"
              className="group flex items-center justify-between w-full bg-white text-black px-8 py-5 text-xs font-black uppercase tracking-[0.35em] hover:bg-brand-teal hover:text-white transition-all duration-700 disabled:opacity-50"
            >
              {loading ? 'SYNCHRONIZING...' : 'ESTABLISH SYNC'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button
              disabled={loading}
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full border border-white/10 px-8 py-5 text-xs font-black uppercase tracking-[0.35em] hover:bg-white/5 transition-all duration-500 disabled:opacity-50"
            >
              {/* Simple Google SVG Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Auth Node
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
