import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Pill, Stethoscope, Activity, Heart, Leaf, Baby, ArrowUpRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';

const services = [
  { icon: Pill,        title: 'Prescription Dispensing',      desc: 'Licensed pharmacists, PCN-verified medications.' },
  { icon: Stethoscope, title: 'Over-the-Counter Medications',  desc: 'Trusted OTC solutions for everyday care.' },
  { icon: Activity,    title: 'Blood Pressure Monitoring',     desc: 'On-site checks and health tracking.' },
  { icon: Heart,       title: 'Diabetes Support',              desc: 'Long-term chronic disease management.' },
  { icon: Leaf,        title: 'Wellness & Supplements',        desc: 'Premium immunity and nutrition products.' },
  { icon: Baby,        title: 'Family & Baby Care',            desc: 'Gentle, pediatric-approved essentials.' },
];

export default function ServicesSnapshot() {
  return (
    <section className="bg-[#0A0A0A] text-white py-32 md:py-40">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <SectionLabel number="02" label="Services Snapshot" variant="light" />
            <h2 className="font-serif display-md mt-6 font-light max-w-2xl">
              Full-spectrum pharmaceutical care,{' '}
              <em className="not-italic text-[#1B6E8C]">curated precisely</em>.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-white/25 pb-2 hover:border-[#1B6E8C] hover:text-[#1B6E8C] transition-colors self-start md:self-auto"
          >
            All Services <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.7 }}
                className="group relative border-b border-r border-white/8 p-10 hover:bg-white/[0.03] transition-colors cursor-default"
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">0{i + 1}</span>
                  <Icon className="w-5 h-5 text-[#1B6E8C] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.25} />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-light leading-tight mb-3">{s.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{s.desc}</p>
                <ArrowUpRight className="absolute bottom-6 right-6 w-4 h-4 text-white/15 group-hover:text-[#1B6E8C] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}