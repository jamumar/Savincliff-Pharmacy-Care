import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle,
  User, Phone, Mail, MapPin, FileText, Truck, Store, ArrowRight
} from 'lucide-react';
import { useCart } from '@/lib/CartContext';
// import apiClient from '@/api/apiClient'; // Backend disconnected for prototype
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/AuthContext';

const DELIVERY_OPTIONS = [
  { id: 'pickup', label: 'CLINICAL PICKUP', desc: 'DIVIB PLAZA, 7TH AVE, GWARINPA / FREE', icon: Store },
  { id: 'delivery', label: 'PATIENT DISPATCH', desc: 'ABUJA METRO AREA / ₦1,500', icon: Truck },
];

const STEPS = ['AUDIT', 'IDENTITY', 'CONFIRM'];

export default function Checkout() {
  const { items, total, remove, update, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState('pickup');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', notes: '' });
  const [placed, setPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: user.username || f.name,
        phone: user.phone_number || f.phone,
        email: user.email || f.email,
        address: user.address || f.address
      }));
      if (user.address) setDelivery('delivery');
    }
  }, [user]);

  const deliveryFee = delivery === 'delivery' ? 1500 : 0;
  const grandTotal = total + deliveryFee;

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const placeOrder = async () => {
    setIsSubmitting(true);
    // Mock order placement
    setTimeout(() => {
      setPlaced(true);
      clear();
      toast({ title: "ORDER COMMITTED", description: "Audit node finalized. Pharmacist contact sequence initiated." });
      setIsSubmitting(false);
    }, 1200);
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl w-full text-center space-y-12">
          <div className="w-24 h-24 bg-svz-red text-white flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12" strokeWidth={1} />
          </div>
          <div className="space-y-4">
             <h1 className="text-5xl font-black uppercase tracking-tighter">ORDER COMMITTED</h1>
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/40 leading-relaxed max-w-sm mx-auto">
                Fulfillment protocol initiated. A licensed pharmacist will contact your node <b>{form.phone}</b> for final clinical verification.
             </p>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-center gap-6">
             <Link to="/shop" className="bg-black text-white px-12 py-6 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-svz-red duration-700">Continue Inventory</Link>
             <Link to="/account/orders" className="border border-black text-black px-12 py-6 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white duration-700">Audit Status</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-40 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <div className="border-b border-black pb-12 mb-20 flex flex-col md:flex-row justify-between items-end gap-12">
           <h1 className="display-svz">FULFILLMENT</h1>
           <Link to="/shop" className="text-[10px] font-black tracking-[0.4em] uppercase text-black/40 hover:text-black transition-colors flex items-center gap-4">
              <ArrowLeft className="w-4 h-4" /> Exit to Inventory
           </Link>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-4 mb-24 overflow-x-auto pb-4">
           {STEPS.map((s, i) => (
               <div key={s} className="flex-1 min-w-[120px] relative">
                   <div className={`h-1 w-full transition-all duration-1000 ${i <= step ? 'bg-svz-red' : 'bg-black/10'}`} />
                   <p className={`mt-4 text-[10px] font-black tracking-[0.4em] transition-colors ${i === step ? 'text-black' : 'text-black/20'}`}>
                      {i + 1} / {s}
                   </p>
               </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            
            {/* Form Panel */}
            <div className="lg:col-span-7">
               <AnimatePresence mode="wait">
                  {step === 0 && (
                      <motion.div key="st0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                         <h2 className="text-3xl font-black uppercase tracking-tighter">BASKET AUDIT</h2>
                         <div className="border border-black/10">
                            {items.map(item => (
                                <div key={item.id} className="p-8 border-b border-black/10 flex gap-8 items-center group">
                                    <div className="w-20 h-20 bg-[#FAFAFA] border border-black/5 flex-shrink-0 overflow-hidden">
                                       <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                       <h4 className="text-lg font-black uppercase tracking-tighter">{item.name}</h4>
                                       <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase mt-1">{item.brand} / UNIT: {item.unit}</p>
                                    </div>
                                    <div className="text-right">
                                       <p className="text-xl font-black tracking-tighter">₦{(item.price * item.qty).toLocaleString()}</p>
                                       <p className="text-[9px] font-bold text-black/30 mt-1 uppercase">QTY: {item.qty}</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                         <button onClick={() => setStep(1)} className="w-full bg-black text-white py-8 text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-8 hover:bg-svz-red transition-all duration-700">
                             Next Sequence / IDENTITY <ArrowRight className="w-5 h-5" />
                         </button>
                      </motion.div>
                  )}

                  {step === 1 && (
                      <motion.div key="st1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                         <h2 className="text-3xl font-black uppercase tracking-tighter">IDENTITY SPEC</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {DELIVERY_OPTIONS.map(opt => (
                                <button key={opt.id} onClick={() => setDelivery(opt.id)} className={`p-10 border text-left flex flex-col justify-between min-h-[160px] transition-all duration-500 ${delivery === opt.id ? 'bg-black text-white border-black' : 'border-black/10 hover:border-black'}`}>
                                   <opt.icon className={`w-8 h-8 ${delivery === opt.id ? 'text-svz-red' : 'text-black/20'}`} />
                                   <div>
                                      <p className="text-[12px] font-black uppercase tracking-[0.2em]">{opt.label}</p>
                                      <p className={`text-[9px] font-bold mt-2 uppercase tracking-widest ${delivery === opt.id ? 'text-white/40' : 'text-black/30'}`}>{opt.desc}</p>
                                   </div>
                                </button>
                            ))}
                         </div>

                         <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                               <div className="space-y-4">
                                  <label className="text-[10px] font-black tracking-[0.4em] uppercase">Patient Handle</label>
                                  <input value={form.name} onChange={e => setField('name', e.target.value)} className="w-full bg-transparent border-b border-black/10 py-4 text-[12px] font-bold tracking-widest focus:outline-none focus:border-black uppercase" />
                               </div>
                               <div className="space-y-4">
                                  <label className="text-[10px] font-black tracking-[0.4em] uppercase">Phone Node</label>
                                  <input value={form.phone} onChange={e => setField('phone', e.target.value)} className="w-full bg-transparent border-b border-black/10 py-4 text-[12px] font-bold tracking-widest focus:outline-none focus:border-black uppercase" />
                               </div>
                            </div>
                            {delivery === 'delivery' && (
                               <div className="space-y-4">
                                  <label className="text-[10px] font-black tracking-[0.4em] uppercase">Dispatch Address</label>
                                  <textarea rows={2} value={form.address} onChange={e => setField('address', e.target.value)} className="w-full bg-transparent border-b border-black/10 py-4 text-[12px] font-bold tracking-widest focus:outline-none focus:border-black uppercase resize-none" />
                               </div>
                            )}
                         </div>

                         <div className="flex gap-8">
                            <button onClick={() => setStep(0)} className="w-32 border border-black text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all">Back</button>
                            <button onClick={() => setStep(2)} disabled={!form.name || !form.phone || (delivery === 'delivery' && !form.address)} className="flex-1 bg-black text-white py-8 text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-8 hover:bg-svz-red transition-all duration-700 disabled:opacity-20">
                               Final Confirmation <ArrowRight className="w-5 h-5" />
                            </button>
                         </div>
                      </motion.div>
                  )}

                  {step === 2 && (
                      <motion.div key="st2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                         <h2 className="text-3xl font-black uppercase tracking-tighter">FINAL COMMIT</h2>
                         <div className="space-y-12">
                            <div className="p-12 bg-[#FAFAFA] border border-black/5 space-y-8">
                               <p className="text-[10px] font-black tracking-[0.4em] uppercase text-svz-red">Protocol Acknowledgement</p>
                               <p className="text-[12px] font-black uppercase leading-relaxed tracking-widest text-black/40">
                                  By committing this order, you acknowledge that a licensed pharmacist must verify all clinical specifications before fulfillment node activation.
                               </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                               <div className="space-y-2">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Target Node</p>
                                  <p className="text-[13px] font-black uppercase tracking-tighter">{form.name}</p>
                               </div>
                               <div className="space-y-2">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Dispatch Spec</p>
                                  <p className="text-[13px] font-black uppercase tracking-tighter">{delivery === 'pickup' ? 'PICKUP @ GWARINPA' : form.address}</p>
                               </div>
                            </div>
                         </div>

                         <div className="flex gap-8">
                            <button onClick={() => setStep(1)} className="w-32 border border-black text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all">Back</button>
                            <button onClick={placeOrder} disabled={isSubmitting} className="flex-1 bg-black text-white py-8 text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-8 hover:bg-svz-red transition-all duration-1000">
                               {isSubmitting ? 'COMMITTING...' : 'COMMIT ORDER'} <CheckCircle className="w-5 h-5" />
                            </button>
                         </div>
                      </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5">
               <div className="bg-black text-white p-12 lg:p-16 sticky top-40 shadow-2xl">
                  <p className="text-[10px] font-black tracking-[0.4em] uppercase text-svz-red mb-12">Audit Summary</p>
                  <div className="space-y-8 mb-12">
                     <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">Basket Subtotal</span>
                        <span className="text-xl font-black tracking-tighter">₦{total.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">Dispatch Fee</span>
                        <span className="text-xl font-black tracking-tighter">{deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : '0.00'}</span>
                     </div>
                     <div className="h-px bg-white/10" />
                     <div className="flex justify-between items-end">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-svz-red">Total Audit</span>
                        <span className="text-4xl font-black tracking-tighter">₦{grandTotal.toLocaleString()}</span>
                     </div>
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/20 leading-relaxed">
                     Order Ref: SYN-NODE-{uuidv4().substring(0,8).toUpperCase()}<br />
                     Clinical verification cycle: 15-30m
                  </p>
                  <div className="mt-12 pt-12 border-t border-white/5 flex items-center gap-6 opacity-30">
                      <ShieldCheckIcon className="w-8 h-8" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] leading-tight">Patient data handled<br />via zero-trust encryption</p>
                  </div>
               </div>
            </div>

        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
  )
}