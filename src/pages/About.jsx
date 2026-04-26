import React from 'react';
import { ShieldCheck, Award, Zap, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedHeading from '@/components/shared/AnimatedHeading';

export default function About() {
  return (
    <div className="pt-24 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-brand-surgical py-20 border-b border-border">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <AnimatedHeading level={1} className="display-md mb-6">
            Your Health, Our Heart. Quality Care Delivered to Your Door.
          </AnimatedHeading>
          <div className="h-1 w-20 bg-brand-teal mx-auto mb-8"></div>
          <p className="text-xl text-brand-slate leading-relaxed">
            At Savincliff Pharmacy, we believe that every Nigerian deserves access to genuine, affordable, and high-quality healthcare.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="display-sm mb-6 text-brand-obsidian uppercase tracking-wider">Our Story</h2>
          <p className="text-brand-slate leading-relaxed mb-6">
            What started as a vision to bridge the gap between local health needs and modern pharmaceutical innovation has grown into a trusted digital health partner for families across the nation.
          </p>
          <p className="text-brand-slate leading-relaxed">
            We are more than just a store; we are a dedicated healthcare provider committed to the well-being of every patient we serve, from our physical hub in Gwarinpa, Abuja, to our nationwide digital reach.
          </p>
        </div>
        <div className="bg-brand-teal/5 p-12 rounded-2xl border border-brand-teal/10">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif text-brand-teal mb-2">100%</div>
              <div className="text-xs uppercase tracking-widest text-brand-slate">Genuine Medicines</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-brand-teal mb-2">PCN</div>
              <div className="text-xs uppercase tracking-widest text-brand-slate">Licensed Site</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Savincliff */}
      <section className="bg-brand-obsidian text-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="display-sm mb-16 text-center text-white tracking-widest uppercase">Why Trust Savincliff?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-medium">100% Genuine Medicines</h3>
              <p className="text-white/60 leading-relaxed">
                We source directly from licensed manufacturers and authorized importers to ensure that every pill, syrup, and supplement we sell is authentic.
              </p>
            </div>
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-8">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-medium">Expert Oversight</h3>
              <p className="text-white/60 leading-relaxed">
                Our operations are guided by a licensed Superintendent Pharmacist, ensuring every prescription is verified and medically sound.
              </p>
            </div>
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-8">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-medium">Healthcare at Your Speed</h3>
              <p className="text-white/60 leading-relaxed">
                Logistics system optimized for fast, temperature-controlled delivery right to your doorstep. Because time is everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="display-sm mb-6 text-brand-obsidian uppercase tracking-wider">Our Mission</h2>
            <p className="text-xl text-brand-slate leading-relaxed">
              To empower Nigerians to live healthier lives by providing a seamless, transparent, and digital-first pharmacy experience that never compromises on ethical standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-border rounded-xl">
              <h3 className="font-bold text-brand-teal mb-4 uppercase tracking-widest">Integrity</h3>
              <p className="text-sm text-brand-slate">We are open about our sources and pricing. What you see is what you get.</p>
            </div>
            <div className="p-8 border border-border rounded-xl">
              <h3 className="font-bold text-brand-teal mb-4 uppercase tracking-widest">Excellence</h3>
              <p className="text-sm text-brand-slate">We uphold the highest standards set by the Pharmacy Council of Nigeria (PCN).</p>
            </div>
            <div className="p-8 border border-border rounded-xl">
              <h3 className="font-bold text-brand-teal mb-4 uppercase tracking-widest">Compassion</h3>
              <p className="text-sm text-brand-slate">We treat every customer not just as a patient, but as family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Badge */}
      <section className="py-16 bg-brand-teal/5 border-t border-border text-center">
        <div className="container mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-slate mb-6">Registered Online Pharmacy - 2026</p>
          <div className="flex justify-center items-center gap-12 grayscale opacity-60">
             <div className="font-bold text-2xl tracking-tighter">ROPSE EMBLEM</div>
             <div className="font-bold text-2xl tracking-tighter">PCN LOGO</div>
          </div>
        </div>
      </section>
    </div>
  );
}