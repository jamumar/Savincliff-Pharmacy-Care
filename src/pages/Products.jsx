import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Thermometer, Clipboard, PackageSearch, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import ProductCategoryCarousel from '@/components/products/ProductCategoryCarousel';
import BrandsMarquee from '@/components/products/BrandsMarquee';

const assurances = [
  { icon: ShieldCheck,    title: 'Genuine Medications',   text: 'Sourced from verified, licensed suppliers only.' },
  { icon: Thermometer,    title: 'Cold-Chain Storage',    text: 'Temperature-controlled for potency and safety.' },
  { icon: Clipboard,      title: 'Verified Suppliers',    text: 'Audit trails on every pharmaceutical partner.' },
  { icon: PackageSearch,  title: 'Expiry Monitoring',     text: 'Continuous batch-level tracking and rotation.' },
];

export default function Products() {
  return (
    <>
      <PageHero
        number="03"
        label="Products & Brands"
        title="A pharmacy stocked with intention."
        subtitle="Pharmaceutical and healthcare essentials sourced from trusted manufacturers and licensed distributors."
      />

      {/* Intro */}
      <section className="bg-[#FAFAFA] py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <SectionLabel number="01" label="Our Pharmacy" />
            <h2 className="font-serif display-md mt-6 font-light">
              Comprehensive.<br /><em className="not-italic text-[#1B6E8C]">Carefully curated.</em>
            </h2>
          </div>
          <div className="md:col-span-7 flex items-end">
            <p className="text-lg md:text-xl text-[#0A0A0A]/55 leading-relaxed">
              From prescription-only essentials to daily wellness companions — all sourced through verified channels and dispensed with clinical precision.
            </p>
          </div>
        </div>
      </section>

      <ProductCategoryCarousel />
      <BrandsMarquee />

      {/* Quality Assurance */}
      <section className="bg-[#FAFAFA] py-32 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <SectionLabel number="02" label="Quality Assurance" />
          <h2 className="font-serif display-md mt-6 mb-16 font-light max-w-3xl">
            Every product passes through{' '}
            <em className="not-italic text-[#1B6E8C]">four layers of scrutiny</em>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-[#0A0A0A]/10">
            {assurances.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group p-10 border-r border-b border-[#0A0A0A]/10 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-12">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/35 group-hover:text-[#1B6E8C]">0{i + 1}</span>
                    <Icon className="w-5 h-5 group-hover:text-[#1B6E8C] transition-colors" strokeWidth={1.25} />
                  </div>
                  <h3 className="font-serif text-2xl font-light">{a.title}</h3>
                  <p className="text-sm text-[#0A0A0A]/55 group-hover:text-white/65 mt-3 leading-relaxed">{a.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Orders */}
      <section className="bg-[#0A0A0A] text-white py-32 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <SectionLabel number="03" label="Special Orders" variant="light" />
            <h2 className="font-serif display-md mt-6 font-light">
              Can't find what you need?<br />
              <em className="not-italic text-[#1B6E8C]">We'll source it.</em>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-white/55 leading-relaxed">
              Leverage our extensive supplier network to source specialist medications. Request an order and we'll contact you swiftly.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 text-[11px] tracking-[0.2em] uppercase border-b border-white/25 pb-2 hover:border-[#1B6E8C] hover:text-[#1B6E8C] transition-colors"
            >
              Request a Special Order <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}