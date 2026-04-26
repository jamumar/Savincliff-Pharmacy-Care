import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-white tracking-widest uppercase">Savincliff</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Genuine medicines and wellness products delivered to your door. Your trusted digital health partner in Nigeria.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#1B6E8C] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#1B6E8C] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-[#1B6E8C] transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All Products</Link></li>
              <li><Link to="/wholesale" className="hover:text-white transition-colors">Upload Prescription</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Quality Assurance</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/compliance" className="hover:text-white transition-colors">Regulatory Compliance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Get in Touch</h3>
            <div className="space-y-4 text-sm text-white/60">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-[#1B6E8C]" />
                <span>Gwarinpa, Abuja, Nigeria</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[#1B6E8C]" />
                <span>+92 325 1206427</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[#1B6E8C]" />
                <span>info@savincliffpharmacy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              {/* Replacing with placeholder text/icons until images are available */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Regulatory Partner</span>
                <span className="font-bold text-sm tracking-tighter">PCN REGISTERED</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Approved By</span>
                <span className="font-bold text-sm tracking-tighter">NAFDAC VERIFIED</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">2026 Compliance</span>
                <span className="font-bold text-sm tracking-tighter">ROPSE EMBLEM</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 opacity-50">
              <span className="text-xs uppercase tracking-widest">Paystack</span>
              <span className="text-xs uppercase tracking-widest">Visa</span>
              <span className="text-xs uppercase tracking-widest">Mastercard</span>
              <span className="text-xs uppercase tracking-widest">Verve</span>
              <div className="h-4 w-px bg-white/20 mx-2"></div>
              <span className="text-xs uppercase tracking-widest">NDPA Compliant</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white/40 text-[10px] uppercase tracking-[0.2em]">
          &copy; {currentYear} Savincliff Pharmacy. All Rights Reserved.
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/923251206427?text=Hello%20Savincliff%2C%20I%20have%20an%20inquiry"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center space-x-2"
        title="Chat with a Pharmacist"
      >
        <span className="text-xs font-bold pl-2 hidden md:inline">Chat with a Pharmacist</span>
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M17.472 14.382c-.029.128-1.298 1.236-1.397 1.348-.383.415-.838.441-1.391.166-.339-.169-1.478-.611-2.822-1.784-1.045-.913-1.751-2.04-1.956-2.392-.204-.352-.023-.543.15-.719.156-.16.34-.373.51-.559.18-.184.243-.314.364-.524.122-.21.061-.393-.031-.571-.091-.178-.813-1.958-1.114-2.684-.293-.708-.592-.613-.813-.624-.209-.011-.448-.014-.687-.014-.239 0-.626.09-.952.448-.327.359-1.246 1.221-1.246 2.978 0 1.757 1.278 3.456 1.459 3.702.181.245 2.516 3.844 6.095 5.391.851.368 1.516.587 2.035.753.854.27 1.63.232 2.242.141.683-.101 2.095-.856 2.39-1.683.295-.827.295-1.537.207-1.683-.089-.147-.328-.236-.595-.369zM12 21C7.029 21 3 16.971 3 12S7.029 3 12 3s9 4.029 9 9-4.029 9-9 9m0-18C6.477 3 2 7.477 2 13c0 1.846.501 3.576 1.375 5.067L2.062 21.938l4.026-1.309C7.54 21.493 9.204 22 11 22c6.075 0 11-4.925 11-11S17.075 2 11 2z"/></svg>
      </a>
    </footer>
  );
}