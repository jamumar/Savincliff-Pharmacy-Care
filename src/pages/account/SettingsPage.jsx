import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import apiClient from '@/api/apiClient';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Shield, Save, Key, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, we'd have a PATCH /auth/me/ endpoint
      await apiClient.patch('auth/me/', {
        username: form.username,
        email: form.email
      });
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.response?.data?.detail || "Could not update profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="underline-offset-8">
        <h1 className="font-serif text-3xl font-light">Account Settings</h1>
        <p className="text-black/40 text-xs mt-2 uppercase tracking-widest">Manage your profile and security preferences</p>
      </div>

      <div className="grid gap-10">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-black/5 p-8 md:p-10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
             <User className="w-5 h-5 text-[#1B6E8C]" />
             <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Personal Information</h3>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-black/40">Full Name</label>
                <input 
                  type="text" 
                  value={form.username}
                  onChange={(e) => setForm({...form, username: e.target.value})}
                  className="w-full bg-black/[0.02] border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-[#1B6E8C] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-black/40">Email Address</label>
                <input 
                  type="email" 
                  value={form.email}
                  disabled
                  className="w-full bg-black/[0.04] border border-black/5 px-4 py-3 text-sm text-black/30 cursor-not-allowed"
                />
                <p className="text-[9px] text-amber-600 font-medium">Contact support to change your verified email.</p>
              </div>
            </div>

            <button 
              disabled={loading}
              className="bg-[#0A0A0A] text-white px-8 py-3.5 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-[#1B6E8C] transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </motion.div>

        {/* Security Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-black/5 p-8 md:p-10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
             <Shield className="w-5 h-5 text-[#1B6E8C]" />
             <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Security & Password</h3>
          </div>

          <div className="space-y-6 max-w-md">
             <p className="text-xs text-black/50 leading-relaxed">Ensure your medical account remains secure by using a strong, unique password.</p>
             
             <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-black/5 hover:bg-black/5 transition-colors group">
                    <div className="flex items-center gap-3">
                        <Key className="w-4 h-4 text-black/30" />
                        <span className="text-[11px] uppercase tracking-widest">Update Password</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </button>
                <button className="w-full flex items-center justify-between p-4 border border-black/5 hover:bg-black/5 transition-colors group">
                    <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-black/30" />
                        <span className="text-[11px] uppercase tracking-widest">Two-Factor Authentication</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest bg-amber-50 text-amber-700 px-2 py-1">Recommended</span>
                </button>
             </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <div className="pt-10 flex items-center justify-between border-t border-black/5">
            <div>
                <h4 className="text-sm font-bold text-red-600">Deactivate Account</h4>
                <p className="text-xs text-black/40 mt-1">This will permanently remove your medical history and orders.</p>
            </div>
            <button className="text-[10px] uppercase font-bold tracking-widest text-red-600 border border-red-100 px-6 py-3 hover:bg-red-50 transition-colors">Request Deletion</button>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    )
}
