import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'Prescription Services',
    sub: 'Licensed dispensing & counseling',
    bullets: ['Accurate dispensing to licensed prescriptions', 'Dosage & usage counseling', 'Drug interaction verification', 'Refill management & reminders'],
  },
  {
    num: '02',
    title: 'Over-the-Counter Medications',
    sub: 'Trusted OTC for everyday care',
    bullets: ['Pain relief & analgesics', 'Cold & flu remedies', 'Digestive health solutions', 'Allergy management'],
  },
  {
    num: '03',
    title: 'Patient Counseling',
    sub: 'Professional guidance, empathetically delivered',
    bullets: ['Medication usage best practices', 'Drug interactions & safety', 'Side effects guidance', 'Chronic disease management advice'],
  },
  {
    num: '04',
    title: 'Health Monitoring',
    sub: 'In-store diagnostics & tracking',
    bullets: ['Blood pressure checks', 'Basic health screenings', 'Medication adherence support', 'Referrals to specialists when needed'],
  },
  {
    num: '05',
    title: 'Wellness Support',
    sub: 'Proactive health, not reactive',
    bullets: ['Premium nutritional supplements', 'Immunity boosters', 'Fitness & recovery products', 'General well-being programs'],
  },
];

export default function ServiceAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-[#0A0A0A]/10">
      {services.map((s, i) => (
        <div key={s.num} className="border-b border-[#0A0A0A]/10">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full grid grid-cols-12 items-center gap-4 py-8 md:py-10 text-left group"
          >
            <span className="col-span-2 md:col-span-1 text-[11px] tracking-[0.3em] text-[#0A0A0A]/35 group-hover:text-[#1B6E8C] transition-colors">{s.num}</span>
            <h3 className="col-span-8 md:col-span-7 font-serif text-2xl md:text-4xl lg:text-5xl font-light tracking-tight">{s.title}</h3>
            <span className="hidden md:block col-span-3 text-sm text-[#0A0A0A]/45">{s.sub}</span>
            <span className="col-span-2 md:col-span-1 justify-self-end">
              {open === i
                ? <Minus className="w-5 h-5 text-[#1B6E8C]" />
                : <Plus className="w-5 h-5 text-[#0A0A0A]/40" />}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-12 gap-4 pb-10 md:pb-14">
                  <div className="col-start-3 md:col-start-2 col-span-10 md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                    {s.bullets.map((b, k) => (
                      <motion.div
                        key={k}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: k * 0.07 }}
                        className="flex items-start gap-3 text-base md:text-lg text-[#0A0A0A]/75 border-l-2 pl-4 py-1.5"
                        style={{ borderColor: '#1B6E8C' }}
                      >
                        {b}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}