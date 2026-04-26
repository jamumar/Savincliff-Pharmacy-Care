import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, ArrowLeft, CheckCircle, AlertCircle,
  User, Phone, Mail, MapPin, FileText, Truck, Store, ChevronRight
} from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import apiClient from '@/api/apiClient';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

const DELIVERY_OPTIONS = [
  { id: 'pickup', label: 'Pick Up In-Store', desc: 'Divib Plaza, 7th Avenue, Gwarinpa · Free', icon: Store },
  { id: 'delivery', label: 'Home Delivery', desc: 'Abuja metro area · ₦1,500', icon: Truck },
];

const STEPS = ['Cart Review', 'Your Details', 'Confirm Order'];

export default function Checkout() {
  const { items, total, remove, update, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState('pickup');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', notes: '' });
  const [placed, setPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = delivery === 'delivery' ? 1500 : 0;
  const grandTotal = total + deliveryFee;
  const hasRx = items.some(i => i.category === 'rx');

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const placeOrder = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        items: items.map(item => ({
             product: item.id,
             quantity: item.qty
        })),
        shipping_address: delivery === 'pickup' ? 'Store Pickup' : form.address,
        payment_method: 'TRANSFER',
        notes: form.notes,
        idempotency_key: uuidv4()
      };

      await apiClient.post('orders/', orderData);
      
      setPlaced(true);
      clear();
      toast({
        title: "Order Placed Successfully",
        description: "Our pharmacist will contact you shortly.",
      });
    } catch (error) {
      console.error('Order placement failed:', error);
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: error.response?.data?.error || "We couldn't process your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="max-w-lg w-full text-center bg-white p-12 shadow-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </motion.div>
          <h1 className="font-serif text-4xl font-light">Order Placed!</h1>
          <p className="text-black/50 mt-4 leading-relaxed">
            Thank you for your order. Our pharmacist will review it and contact you shortly on{' '}
            <span className="text-black font-medium">{form.phone || 'the number provided'}</span> to confirm.
          </p>
          {hasRx && (
            <div className="mt-6 bg-amber-50 border border-amber-200 px-5 py-4 flex items-start gap-3 text-left">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">Your order contains prescription items. Please bring or upload your valid prescription before collection/delivery.</p>
            </div>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1B6E8C] transition-colors duration-500"
            >
              Continue Shopping
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-black/15 px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:border-black/40 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <ShoppingBag className="w-16 h-16 text-black/15 mx-auto mb-4" strokeWidth={1} />
          <h2 className="font-serif text-3xl font-light text-black/40">Your cart is empty</h2>
          <Link to="/shop" className="inline-block mt-6 text-[11px] tracking-[0.2em] uppercase border-b border-black/25 pb-1 hover:text-[#1B6E8C] hover:border-[#1B6E8C] transition-colors">
            Browse Shop
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Back */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-black/40 hover:text-[#1B6E8C] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <motion.div
                animate={{ opacity: i <= step ? 1 : 0.35 }}
                className="flex items-center gap-2"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-500 ${
                  i < step ? 'bg-emerald-600 text-white' : i === step ? 'bg-[#0A0A0A] text-white' : 'bg-black/10 text-black/40'
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[11px] tracking-[0.15em] uppercase hidden sm:block ${i === step ? 'text-[#0A0A0A]' : 'text-black/35'}`}>{s}</span>
              </motion.div>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-black/10 mx-3" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Main panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">

              {/* Step 0: Cart Review */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }}>
                  <h2 className="font-serif text-3xl font-light mb-8">Review Your Cart</h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <motion.div key={item.id} layout className="flex gap-4 bg-white p-4 border border-black/6">
                        <img src={item.img} alt={item.name} className="w-16 h-16 object-cover bg-black/5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm leading-tight">{item.name}</p>
                          <p className="text-[11px] text-black/40 mt-0.5">{item.brand} · {item.unit}</p>
                          {item.category === 'rx' && (
                            <span className="inline-flex items-center gap-1 text-[9px] tracking-wide uppercase text-amber-600 mt-1">
                              <AlertCircle className="w-3 h-3" /> Rx Required
                            </span>
                          )}
                          <div className="flex items-center gap-2 mt-2 border border-black/12 w-fit">
                            <button onClick={() => update(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-black/5 text-lg leading-none">−</button>
                            <span className="w-6 text-center text-sm">{item.qty}</span>
                            <button onClick={() => update(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-black/5 text-lg leading-none">+</button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button onClick={() => remove(item.id)} className="text-black/20 hover:text-red-500 transition-colors text-xs">✕</button>
                          <span className="font-serif text-xl font-light">₦{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep(1)}
                    className="mt-8 w-full flex items-center justify-center gap-3 bg-[#0A0A0A] text-white py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1B6E8C] transition-colors duration-500"
                  >
                    Continue to Details <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}

              {/* Step 1: Details */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }}>
                  <h2 className="font-serif text-3xl font-light mb-8">Your Details</h2>

                  {/* Delivery toggle */}
                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-3">Delivery Method</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DELIVERY_OPTIONS.map(opt => {
                        const Icon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setDelivery(opt.id)}
                            className={`flex items-start gap-4 p-4 border text-left transition-all duration-300 ${
                              delivery === opt.id ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white' : 'border-black/12 bg-white hover:border-black/30'
                            }`}
                          >
                            <Icon className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div>
                              <p className="text-sm font-medium">{opt.label}</p>
                              <p className={`text-[11px] mt-0.5 ${delivery === opt.id ? 'text-white/60' : 'text-black/40'}`}>{opt.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-5 bg-white p-6 border border-black/6">
                    {[
                      { key: 'name', label: 'Full Name', icon: User, required: true, placeholder: 'Your full name' },
                      { key: 'phone', label: 'Phone Number', icon: Phone, required: true, placeholder: '080 XXXX XXXX' },
                      { key: 'email', label: 'Email Address', icon: Mail, required: false, placeholder: 'your@email.com' },
                    ].map(field => {
                      const Icon = field.icon;
                      return (
                        <div key={field.key}>
                          <label className="text-[10px] tracking-[0.3em] uppercase text-black/40 block mb-2">
                            {field.label} {field.required && <span className="text-[#1B6E8C]">*</span>}
                          </label>
                          <div className="relative">
                            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/25" />
                            <input
                              value={form[field.key]}
                              onChange={e => setField(field.key, e.target.value)}
                              placeholder={field.placeholder}
                              className="w-full pl-11 pr-4 py-3 border border-black/12 bg-[#FAFAFA] text-sm focus:outline-none focus:border-[#1B6E8C] transition-colors"
                            />
                          </div>
                        </div>
                      );
                    })}

                    {delivery === 'delivery' && (
                      <div>
                        <label className="text-[10px] tracking-[0.3em] uppercase text-black/40 block mb-2">
                          Delivery Address <span className="text-[#1B6E8C]">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-black/25" />
                          <textarea
                            rows={2}
                            value={form.address}
                            onChange={e => setField('address', e.target.value)}
                            placeholder="Full delivery address, Abuja"
                            className="w-full pl-11 pr-4 py-3 border border-black/12 bg-[#FAFAFA] text-sm focus:outline-none focus:border-[#1B6E8C] transition-colors resize-none"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] tracking-[0.3em] uppercase text-black/40 block mb-2">Additional Notes</label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-3.5 w-4 h-4 text-black/25" />
                        <textarea
                          rows={2}
                          value={form.notes}
                          onChange={e => setField('notes', e.target.value)}
                          placeholder="Any special instructions for the pharmacist?"
                          className="w-full pl-11 pr-4 py-3 border border-black/12 bg-[#FAFAFA] text-sm focus:outline-none focus:border-[#1B6E8C] transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(0)} className="px-6 py-4 border border-black/15 text-[11px] tracking-[0.2em] uppercase hover:border-black/40 transition-colors">
                      Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setStep(2)}
                      disabled={!form.name || !form.phone || (delivery === 'delivery' && !form.address)}
                      className="flex-1 flex items-center justify-center gap-3 bg-[#0A0A0A] text-white py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1B6E8C] transition-colors duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Review Order <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Confirm */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }}>
                  <h2 className="font-serif text-3xl font-light mb-8">Confirm Your Order</h2>

                  {/* Summary */}
                  <div className="bg-white border border-black/6 p-6 space-y-4 mb-6">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-black/40">Order Summary</p>
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-black/70">{item.name} <span className="text-black/35">×{item.qty}</span></span>
                        <span>₦{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-black/8 flex justify-between text-sm">
                      <span className="text-black/50">Delivery</span>
                      <span>{deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : 'Free'}</span>
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="bg-white border border-black/6 p-6 space-y-3 mb-6">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-2">Your Details</p>
                    {[
                      { label: 'Name', value: form.name },
                      { label: 'Phone', value: form.phone },
                      { label: 'Email', value: form.email || '—' },
                      { label: 'Delivery', value: delivery === 'pickup' ? 'Pick Up In-Store' : form.address },
                    ].map(d => (
                      <div key={d.label} className="flex gap-4 text-sm">
                        <span className="text-black/35 w-20 shrink-0">{d.label}</span>
                        <span className="font-medium">{d.value}</span>
                      </div>
                    ))}
                  </div>

                  {hasRx && (
                    <div className="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 mb-6">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700">Prescription items in your order require a valid Rx before dispensing. You can upload it on the Wholesale & Rx page.</p>
                    </div>
                  )}

                  <p className="text-xs text-black/35 mb-5 leading-relaxed">
                    By placing this order you agree that a Savincliff pharmacist will contact you to confirm and arrange payment before dispensing any medication.
                  </p>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-4 border border-black/15 text-[11px] tracking-[0.2em] uppercase hover:border-black/40 transition-colors">
                      Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={placeOrder}
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-3 bg-[#1B6E8C] text-white py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#0A0A0A] transition-colors duration-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><CheckCircle className="w-4 h-4" /> Place Order</>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A0A0A] text-white p-8 sticky top-28">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">Order Summary</p>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-[11px] text-white/40">×{item.qty}</p>
                    </div>
                    <span className="text-sm font-medium">₦{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-5 space-y-2">
                <div className="flex justify-between text-sm text-white/50">
                  <span>Subtotal</span><span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-white/50">
                  <span>Delivery</span><span>{deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : 'Free'}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-white/40">Total</span>
                  <span className="font-serif text-3xl font-light text-[#1B6E8C]">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <p className="mt-6 text-[10px] text-white/25 leading-relaxed">
                Payment is arranged offline with our pharmacist after order confirmation. No online payment required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}