import React from 'react';
import { Camera, FileUp, Truck, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedHeading from '@/components/shared/AnimatedHeading';
import RxUploader from '@/components/wholesale/RxUploader';

export default function Wholesale() {
  return (
    <div className="pt-24 min-h-screen bg-brand-surgical pb-24">
      {/* Header */}
      <section className="py-16 container mx-auto px-6 text-center max-w-4xl">
        <AnimatedHeading level={1} className="display-sm mb-6 uppercase tracking-wider">
          Upload Prescription Online
        </AnimatedHeading>
        <p className="text-brand-slate text-lg mb-8">
          To ensure your safety and comply with PCN regulations, all prescription-only medications require a valid upload before we can process your order.
        </p>
        <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-800 text-sm">
          <ShieldAlert size={18} />
          <span>Our licensed pharmacists review every prescription within 15–30 minutes.</span>
        </div>
      </section>

      {/* 3 Step Guide */}
      <section className="container mx-auto px-6 mb-24">
        <h2 className="text-center font-bold text-xs uppercase tracking-[0.4em] text-brand-slate mb-12">How to Order Prescription Medicines</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-brand-teal/10 font-bold text-6xl">01</div>
            <Camera className="text-brand-teal mb-6" size={32} />
            <h3 className="text-lg font-bold mb-4 uppercase tracking-tighter">Take a Clear Photo</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              Place your original prescription on a flat surface in a well-lit area. Ensure Hospital Name, Doctor's Name, and Dosage are clearly visible.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-brand-teal/10 font-bold text-6xl">02</div>
            <FileUp className="text-brand-teal mb-6" size={32} />
            <h3 className="text-lg font-bold mb-4 uppercase tracking-tighter">Upload & Add to Cart</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              Upload your photo (JPEG/PNG) or PDF. Our clinical team receives an instant notification to verify the document.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-brand-teal/10 font-bold text-6xl">03</div>
            <Truck className="text-brand-teal mb-6" size={32} />
            <h3 className="text-lg font-bold mb-4 uppercase tracking-tighter">Review & Delivery</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              Once verified, your medication is packed and dispatched for fast, temperature-controlled delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Uploader Section */}
      <section className="container mx-auto px-6 max-w-3xl">
         <RxUploader />
         
         {/* Fine Print */}
         <div className="mt-16 bg-white p-8 rounded-2xl border border-border space-y-8">
            <div>
              <h4 className="font-bold text-brand-obsidian uppercase tracking-widest text-xs mb-4 flex items-center">
                <CheckCircle2 size={16} className="text-brand-teal mr-2" />
                Prescription Policy (The Fine Print)
              </h4>
              <ul className="space-y-3 text-sm text-brand-slate list-disc pl-5">
                <li><strong>Original Copy:</strong> We may request to see the physical copy of the prescription upon delivery for certain controlled medications.</li>
                <li><strong>Validity:</strong> Prescriptions older than 6 months (or 3 months for certain specialized meds) may be rejected.</li>
                <li><strong>Privacy:</strong> Your medical data is encrypted and handled only by our clinical staff in accordance with the Nigeria Data Protection Act (NDPA).</li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm font-medium text-brand-obsidian mb-2">Prefer WhatsApp?</p>
              <p className="text-sm text-brand-slate mb-4">You can also send your prescription directly to our pharmacist for instant processing.</p>
              <a 
                href="https://wa.me/923251206427?text=Hello%20Savincliff%2C%20I%20have%20a%20prescription%20to%20upload."
                className="inline-flex items-center text-brand-teal font-bold uppercase tracking-widest text-xs border-b border-brand-teal pb-1 hover:text-brand-deep transition-colors"
              >
                Send via WhatsApp
              </a>
            </div>
         </div>
      </section>
    </div>
  );
}