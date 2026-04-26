import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';

const badges = [
  {
    icon: ShieldCheck,
    title: 'PCN Registration',
    body: 'Savincliff Pharmacy is duly registered with the Pharmacists Council of Nigeria (PCN) — the statutory body responsible for regulating the practice of pharmacy in Nigeria. All our pharmacists hold valid PCN practising licenses.',
  },
  {
    icon: Award,
    title: 'NAFDAC Compliance',
    body: 'All pharmaceutical products stocked and dispensed comply with NAFDAC (National Agency for Food and Drug Administration and Control) regulations. We source only NAFDAC-registered products from licensed distributors.',
  },
  {
    icon: FileText,
    title: 'Good Pharmacy Practice',
    body: 'We adhere to the WHO and PCN Good Pharmacy Practice (GPP) guidelines, covering medication quality, safe dispensing, patient counseling, and professional conduct standards.',
  },
  {
    icon: CheckCircle,
    title: 'Supply Chain Integrity',
    body: 'Our supply chain is fully traceable. Products are sourced exclusively from licensed manufacturers and authorized distributors with documented audit trails and batch verification.',
  },
  {
    icon: AlertCircle,
    title: 'Adverse Event Reporting',
    body: 'We maintain protocols for the identification, reporting, and management of adverse drug reactions and medication errors in compliance with NAFDAC pharmacovigilance requirements.',
  },
];

const commitments = [
  'All pharmacists are PCN-registered and license-current',
  'Only NAFDAC-approved products are dispensed',
  'Cold-chain storage conditions are continuously monitored',
  'Prescription records are maintained and secured',
  'Drug expiry tracking and batch recall protocols enforced',
  'Patient data handled per applicable privacy standards',
  'Mandatory continuing education for all pharmacy staff',
  'Counterfeit detection training and supplier verification',
];

export default function Compliance() {
  return (
    <>
      <PageHero
        number="06"
        label="Licensing & Compliance"
        title="Regulated, certified, and fully compliant."
        subtitle="Savincliff Pharmacy operates under Nigeria's highest pharmaceutical regulatory standards — because your safety is non-negotiable."
      />

      {/* Intro strip */}
      <section className="bg-[#FAFAFA] py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionLabel number="01" label="Regulatory Framework" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-8"
          >
            <p className="font-serif text-2xl md:text-4xl font-light leading-snug text-[#0A0A0A]/85">
              We operate within Nigeria's full pharmaceutical regulatory framework — PCN, NAFDAC, and international Good Pharmacy Practice standards.
            </p>
            <p className="mt-8 text-base md:text-lg text-[#0A0A0A]/55 max-w-2xl leading-relaxed">
              Compliance is not a checkbox at Savincliff — it is the foundation of every decision we make, from supplier selection to patient counseling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Badges */}
      <section className="bg-[#0A0A0A] text-white py-32 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <SectionLabel number="02" label="Certifications & Frameworks" variant="light" />
          <h2 className="font-serif display-md mt-6 mb-16 font-light max-w-3xl">
            Anchored in <em className="not-italic text-[#1B6E8C]">every regulation</em> that protects you.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-white/8">
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group p-8 border-r border-b border-white/8 hover:bg-white/[0.03] transition-colors"
                >
                  <Icon className="w-5 h-5 mb-10 transition-colors group-hover:text-[#1B6E8C]" style={{ color: '#1B6E8C' }} strokeWidth={1.25} />
                  <h3 className="font-serif text-xl font-light leading-snug mb-3">{b.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{b.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-[#FAFAFA] py-32 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <SectionLabel number="03" label="Our Commitments" />
          <h2 className="font-serif display-md mt-6 mb-16 font-light max-w-3xl">
            Eight pillars of <em className="not-italic text-[#1B6E8C]">pharmaceutical integrity</em>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#0A0A0A]/10">
            {commitments.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-start gap-5 p-8 border-r border-b border-[#0A0A0A]/10 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-500"
              >
                <span className="text-xs tracking-[0.3em] shrink-0 mt-1 group-hover:text-[#1B6E8C] transition-colors" style={{ color: '#1B6E8C' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base md:text-lg text-[#0A0A0A]/80 group-hover:text-white/85 leading-relaxed">{c}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer badge strip */}
      <section className="bg-[#0A0A0A] text-white py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-8">Regulatory Affiliations</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {['PCN', 'NAFDAC', 'WHO GPP', 'ISO Aligned', 'NMA Partner'].map((t) => (
              <span
                key={t}
                className="font-serif text-2xl md:text-4xl text-white/20 hover:text-[#1B6E8C] transition-colors duration-500 cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}