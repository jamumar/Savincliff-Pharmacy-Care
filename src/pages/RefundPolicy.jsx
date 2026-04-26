import React from 'react';
import { ShieldCheck, Info, FileText } from 'lucide-react';
import AnimatedHeading from '@/components/shared/AnimatedHeading';

export default function RefundPolicy() {
  return (
    <div className="pt-24 min-h-screen font-sans bg-brand-surgical pb-24">
      <section className="py-20 container mx-auto px-6 text-center max-w-4xl">
        <AnimatedHeading level={1} className="display-sm mb-6 uppercase tracking-wider">
          Prescription Refund Policy
        </AnimatedHeading>
        <div className="h-1 w-20 bg-brand-teal mx-auto mb-8"></div>
        <p className="text-brand-slate leading-relaxed mb-6">
          In accordance with the Pharmacy Council of Nigeria (PCN) guidelines, we maintain a strict policy regarding the return of medications to ensure clinical safety and integrity.
        </p>
      </section>

      <section className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white p-10 rounded-2xl border border-border space-y-10 shadow-sm leading-relaxed">
          
          <div className="space-y-4">
            <h2 className="flex items-center text-lg font-bold uppercase tracking-tighter text-brand-obsidian">
              <ShieldCheck className="text-brand-teal mr-3" />
              1. Non-Returnable Medications
            </h2>
            <p className="text-sm text-brand-slate">
              To protect public health, medications cannot be returned once they have left the pharmacy premises. Storage conditions (temperature, humidity, etc.) for medications can no longer be guaranteed once they are out of our custodial chain, making them unsafe for redistribution.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="flex items-center text-lg font-bold uppercase tracking-tighter text-brand-obsidian">
              <Info className="text-brand-teal mr-3" />
              2. Dispensing Errors & Damages
            </h2>
            <p className="text-sm text-brand-slate">
              If we accidentally dispense the wrong medication, dosage, or if the product arrives damaged (e.g., broken seal), we will provide a full refund or replacement. In such cases, customers must notify us within 24 hours of delivery.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="flex items-center text-lg font-bold uppercase tracking-tighter text-brand-obsidian">
              <FileText className="text-brand-teal mr-3" />
              3. Cancellation Policy
            </h2>
            <p className="text-sm text-brand-slate">
              Orders for prescription medicines cannot be cancelled once a licensed pharmacist has verified and dispensed the order. This is because materials and professional time involved in manual dispensing are non-recoverable.
            </p>
          </div>

          <div className="p-6 bg-brand-teal/5 rounded-xl border border-brand-teal/10 mt-12">
            <p className="text-xs font-medium text-brand-deep italic">
              "Your safety is our priority. By adhering to these policies, we guarantee that every medicine reaching a customer is in its original, safe, and effective state." 
              <br />— Superintendent Pharmacist, Savincliff.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
            <p className="text-[10px] uppercase font-bold text-brand-slate tracking-[0.2em] mb-4">Regulatory Compliance</p>
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full border border-border text-xs font-bold gap-4 opacity-70">
              <span>PCN COMPLIANT</span>
              <div className="h-4 w-px bg-border"></div>
              <span>NDPA PROTECTED</span>
            </div>
        </div>
      </section>
    </div>
  );
}
