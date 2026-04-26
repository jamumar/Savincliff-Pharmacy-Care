import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, ShieldCheck } from 'lucide-react';
import AnimatedHeading from '@/components/shared/AnimatedHeading';

export default function Contact() {
  return (
    <div className="pt-24 min-h-screen bg-brand-surgical pb-20">
      <section className="py-20 container mx-auto px-6 text-center">
        <AnimatedHeading level={1} className="display-sm mb-6 uppercase tracking-wider">
          Contact Savincliff Pharmacy
        </AnimatedHeading>
        <p className="text-brand-slate text-lg max-w-2xl mx-auto">
          Need health advice or have an inquiry about your order? Our clinical team is ready to assist you.
        </p>
      </section>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <MapPin className="text-brand-teal mb-4" />
              <h3 className="font-bold text-brand-obsidian uppercase tracking-widest text-xs mb-2">Abuja Hub</h3>
              <p className="text-sm text-brand-slate leading-relaxed">
                Gwarinpa Estate,<br />
                Abuja, Nigeria
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <Clock className="text-brand-teal mb-4" />
              <h3 className="font-bold text-brand-obsidian uppercase tracking-widest text-xs mb-2">Opening Hours</h3>
              <p className="text-sm text-brand-slate leading-relaxed">
                Mon - Sat: 8am - 9pm<br />
                Sunday: 10am - 6pm
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl border border-border">
              <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-brand-slate tracking-widest">Call or WhatsApp</p>
                <p className="text-xl font-serif text-brand-obsidian">+92 325 1206427</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl border border-border">
              <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-brand-slate tracking-widest">Email Support</p>
                <p className="text-xl font-serif text-brand-obsidian underline text-xs">info@savincliffpharmacy.com</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-brand-obsidian text-white rounded-2xl relative overflow-hidden">
             <div className="relative z-10">
                <ShieldCheck className="text-brand-teal mb-4" size={32} />
                <h3 className="text-xl font-medium mb-4">Chat with a Pharmacist</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Get professional medical advice and order medications directly via WhatsApp.
                </p>
                <a 
                  href="https://wa.me/923251206427?text=Hello%20Savincliff%2C%20I%20have%20an%20inquiry"
                  className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                >
                  Start Chat
                </a>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-teal/20 blur-[100px] rounded-full"></div>
          </div>
        </div>

        {/* Form or Map Placeholder */}
        <div className="bg-white p-10 rounded-2xl border border-border shadow-xl">
          <h3 className="text-2xl font-serif text-brand-obsidian mb-8">Send Us a Message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-brand-slate tracking-widest pl-1">Full Name</label>
                <input type="text" className="w-full bg-brand-surgical border border-border px-4 py-3 rounded-lg outline-none focus:border-brand-teal transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-brand-slate tracking-widest pl-1">Phone Number</label>
                <input type="tel" className="w-full bg-brand-surgical border border-border px-4 py-3 rounded-lg outline-none focus:border-brand-teal transition-colors" placeholder="+234..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-brand-slate tracking-widest pl-1">Email Address</label>
              <input type="email" className="w-full bg-brand-surgical border border-border px-4 py-3 rounded-lg outline-none focus:border-brand-teal transition-colors" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-brand-slate tracking-widest pl-1">How can we help?</label>
              <select className="w-full bg-brand-surgical border border-border px-4 py-3 rounded-lg outline-none focus:border-brand-teal transition-colors">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Product Question</option>
                <option>Prescription Help</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-brand-slate tracking-widest pl-1">Message</label>
              <textarea className="w-full bg-brand-surgical border border-border px-4 py-4 rounded-lg outline-none focus:border-brand-teal transition-colors h-32" placeholder="Tell us more about your needs..."></textarea>
            </div>
            <button className="w-full bg-brand-teal text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-brand-deep transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}