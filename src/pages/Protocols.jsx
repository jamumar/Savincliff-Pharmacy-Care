import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileText, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import useCmsPage from '@/hooks/useCmsPage';
import { DEFAULT_PROTOCOLS_SECTIONS } from '@/lib/cmsDefaults';

export default function Protocols() {
  const { sections, loading } = useCmsPage('protocols', DEFAULT_PROTOCOLS_SECTIONS);

  const getCustomStyles = (data) => {
    const styles = {};
    if (data?.customTextColor) styles.color = data.customTextColor;
    if (data?.customFontFamily) styles.fontFamily = data.customFontFamily;
    if (data?.customFontWeight) styles.fontWeight = data.customFontWeight;
    if (data?.customFontSize) styles.fontSize = data.customFontSize;
    return styles;
  };

  return (
    <div className="bg-white min-h-screen">
      {sections.map((sec) => {
        const customStyles = getCustomStyles(sec.data);

        return (
          <div key={sec.id} style={customStyles}>
            {(() => {
              switch (sec.type) {
                case 'protocols_hero':
                  return (
                    <section className="px-6 md:px-12 pt-40 mb-20 lg:mb-40">
                      <div className="max-w-[1800px] mx-auto border-b border-black pb-12">
                        <h1 className="sub-display-svz uppercase">{sec.data.title}</h1>
                        <p className="text-xs font-black tracking-[0.4em] text-black/40 mt-4 uppercase">{sec.data.subtitle}</p>
                      </div>
                    </section>
                  );

                case 'protocols_intro':
                  return (
                    <section className="px-6 md:px-12 pb-40">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                        <div className="lg:col-span-8">
                          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12" dangerouslySetInnerHTML={{ __html: (sec.data.title || '').replace(/\n/g, '<br />') }} />
                          <p className="text-lg md:text-xl text-black font-medium leading-relaxed tracking-normal max-w-3xl">
                            {sec.data.desc}
                          </p>
                        </div>
                        <div className="lg:col-span-4 self-end">
                          <p className="text-xs md:text-sm font-semibold tracking-normal text-black/60 leading-relaxed">
                            {sec.data.sideText}
                          </p>
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_certifications':
                  return (
                    <section className="bg-black text-white py-40 px-6 md:px-12">
                      <div className="max-w-[1800px] mx-auto">
                        <p className="text-2xs font-black tracking-[0.4em] uppercase text-brand-teal mb-12">{sec.data.label}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border border-white/10">
                          {(sec.data.badges || []).map((b, i) => (
                            <motion.div
                              key={b.id || i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1, duration: 0.8 }}
                              className="p-12 border-b md:border-r border-white/10 hover:bg-white/5 transition-all duration-700 min-h-[350px] flex flex-col justify-between"
                            >
                              <div>
                                <p className="text-2xs font-black uppercase tracking-[0.4em] text-brand-teal mb-8">{b.id} - NODE</p>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">{b.title}</h3>
                                <p className="text-xs md:text-sm font-medium tracking-normal text-white/50 leading-relaxed">{b.body}</p>
                              </div>
                              <CheckCircle className="w-6 h-6 text-white/10" strokeWidth={1} />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_pillars':
                  return (
                    <section className="py-40 px-6 md:px-12 bg-white">
                      <div className="max-w-[1800px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                          <div className="lg:col-span-4">
                            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-12" dangerouslySetInnerHTML={{ __html: (sec.data.title || '').replace(/\n/g, '<br />') }} />
                            <p className="text-xs md:text-sm font-semibold tracking-normal text-black/60 leading-relaxed max-w-xs">
                              {sec.data.subtitle}
                            </p>
                          </div>
                          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/10">
                            {(sec.data.commitments || []).map((c, i) => (
                              <div key={i} className="p-10 border-b border-r border-black/10 hover:bg-black hover:text-white transition-all duration-700 flex items-center justify-between group">
                                <span className="text-xs font-black uppercase tracking-widest group-hover:text-brand-teal transition-colors">0{i + 1} - {c}</span>
                                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_footer_strip':
                  return (
                    <section className="bg-black text-white py-32 px-6 md:px-12 text-center pointer-events-none select-none overflow-hidden">
                      <div className="max-w-[1800px] mx-auto opacity-10 flex flex-wrap justify-center gap-12 md:gap-24">
                        {(sec.data.nodes || []).map((node, i) => (
                          <span key={i} className="display-svz text-white">{node}</span>
                        ))}
                      </div>
                    </section>
                  );

                default:
                  return null;
              }
            })()}
          </div>
        );
      })}
    </div>
  );
}
