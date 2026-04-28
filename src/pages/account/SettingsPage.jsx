import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
// import apiClient from '@/api/apiClient'; // Backend disconnected for prototype
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    address: user?.address || ''
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock update — save to local state
    setTimeout(() => {
      const updatedUser = {
        ...user,
        username: form.username,
        phone_number: form.phone_number,
        address: form.address
      };
      login(updatedUser, localStorage.getItem('token'), localStorage.getItem('refresh'));
      
      toast({
        title: "SYNC COMPLETE",
        description: "Patient identity parameters successfully committed to the clinical node.",
      });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-20">
      
      {/* High-Impact Heading */}
      <div className="border-b border-black/5 pb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">IDENTITY<br />SPECIFICATION</h1>
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/30 mt-4 underline underline-offset-8">Audit and modify biometric contact parameters / Ref: {user?.id || '0000'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Form Area */}
          <div className="lg:col-span-8">
            <form onSubmit={handleUpdateProfile} className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black tracking-[0.4em] uppercase text-black">Legal Identifier</label>
                        <input 
                          type="text" 
                          value={form.username}
                          onChange={(e) => setForm({...form, username: e.target.value})}
                          placeholder="FULL NAME SPEC" 
                          className="w-full bg-transparent border-b border-black/10 py-4 text-[13px] font-bold tracking-widest focus:outline-none focus:border-black uppercase transition-colors" 
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black tracking-[0.4em] uppercase text-black/30">Primary Email [Static]</label>
                        <input 
                          type="email" 
                          value={form.email}
                          disabled 
                          className="w-full bg-transparent border-b border-black/5 py-4 text-[13px] font-bold tracking-widest text-black/20 uppercase cursor-not-allowed" 
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black tracking-[0.4em] uppercase text-black">Communication Node</label>
                    <input 
                      type="tel" 
                      value={form.phone_number}
                      onChange={(e) => setForm({...form, phone_number: e.target.value})}
                      placeholder="+234 XXX XXX XXXX" 
                      className="w-full bg-transparent border-b border-black/10 py-4 text-[13px] font-bold tracking-widest focus:outline-none focus:border-black uppercase transition-colors" 
                    />
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black tracking-[0.4em] uppercase text-black">Fulfillment Address</label>
                    <textarea 
                      value={form.address}
                      onChange={(e) => setForm({...form, address: e.target.value})}
                      placeholder="ENTER FULL DELIVERY SPECIFICATION..." 
                      rows={4} 
                      className="w-full bg-transparent border-b border-black/10 py-4 text-[13px] font-bold tracking-widest focus:outline-none focus:border-black uppercase transition-colors resize-none" 
                    />
                </div>

                <div className="pt-8">
                    <button 
                       disabled={loading}
                       className="flex items-center gap-8 bg-black text-white px-20 py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-svz-red transition-all duration-700 disabled:opacity-50"
                    >
                       {loading ? 'Committing Changes...' : 'Commit Specification'} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </form>
          </div>

          {/* Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-12">
             <div className="p-12 bg-[#FAFAFA] border border-black/5 space-y-8">
                <div className="flex items-center gap-4 text-svz-red">
                   <Activity className="w-6 h-6" />
                   <p className="text-[11px] font-black uppercase tracking-widest">Health Sync Active</p>
                </div>
                <p className="text-[11px] font-bold uppercase leading-relaxed tracking-widest text-black/40">
                    Your identity profile is synchronized across all Savincliff clinical nodes. Any modifications may affect fulfillment speed and prescription verification audits.
                </p>
             </div>

             <div className="p-12 border border-black/5 space-y-8">
                <div className="flex items-center gap-4 text-black">
                   <ShieldCheck className="w-6 h-6" />
                   <p className="text-[11px] font-black uppercase tracking-widest">Security Protocol</p>
                </div>
                <p className="text-[11px] font-bold uppercase leading-relaxed tracking-widest text-black/40">
                    Authentication is managed via a zero-trust model. For password reset or biometric adjustments, please initiate a ticket via clinical support.
                </p>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-svz-red hover:border-svz-red transition-all">Audit Security Log</button>
             </div>
          </div>

      </div>
    </div>
  );
}
