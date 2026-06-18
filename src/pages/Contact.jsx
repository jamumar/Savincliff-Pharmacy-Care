import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import useCmsPage from '@/hooks/useCmsPage';
import { DEFAULT_CONTACT_SECTIONS } from '@/lib/cmsDefaults';

const easeQuint = [0.16, 1, 0.3, 1];

export default function Contact() {
  const { sections, loading } = useCmsPage('contact', DEFAULT_CONTACT_SECTIONS);

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
                case 'contact_hero':
                  return (
                    <section className="px-5 md:px-12 pt-24 md:pt-40 mb-12 md:mb-40">
                      <div className="max-w-[1800px] mx-auto border-b border-black pb-8 md:pb-12 overflow-hidden">
                        <motion.h1 
                          initial={{ y: 100 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 1, ease: easeQuint }}
                          className="display-lg font-black uppercase tracking-tighter leading-none"
                          dangerouslySetInnerHTML={{ __html: (sec.data.title || '').replace(/\n/g, '<br />') }}
                        />
                        <p className="text-2xs md:text-xs font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/40 mt-4 md:mt-8">
                          {sec.data.subtitle}
                        </p>
                      </div>
                    </section>
                  );

                case 'contact_grid':
                  return (
                    <section className="px-5 md:px-12 pb-20 md:pb-40">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
                        
                        {/* Left: Contact Specs */}
                        <div className="lg:col-span-4 space-y-12 md:space-y-24">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 md:gap-12">
                            {(sec.data.nodes || []).map((node, i) => (
                              <div key={i} className="space-y-3 md:space-y-4">
                                <p className="text-2xs md:text-2xs font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-brand-teal">{node.label}</p>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{node.title}</h3>
                                <p className="text-base md:text-lg text-black/60 font-medium tracking-tight leading-relaxed whitespace-pre-line">
                                  {node.value}
                                </p>
                              </div>
                            ))}
                          </div>

                          {sec.data.imageUrl && (
                            <div className="aspect-square bg-white border border-black/10 svz-image-reveal hidden lg:block">
                              <img 
                                src={sec.data.imageUrl} 
                                alt="HQ Internal" 
                                className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 duration-1000"
                              />
                            </div>
                          )}
                        </div>

                        {/* Right: Inquiry Terminal */}
                        <div className="lg:col-span-8 bg-[#FAFAFA] p-6 md:p-24 space-y-10 md:space-y-20 border border-black/5">
                          <div className="space-y-4 md:space-y-8">
                            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none" dangerouslySetInnerHTML={{ __html: (sec.data.formTitle || '').replace(/\n/g, '<br />') }} />
                            <p className="text-2xs md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-black/30 max-w-xl">
                              {sec.data.formDesc}
                            </p>
                          </div>

                          <form className="space-y-8 md:space-y-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                              <div className="space-y-3 md:space-y-4 relative group">
                                <label className="text-2xs md:text-2xs font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">Patient Handle</label>
                                <input placeholder="Enter full name" className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 text-base md:text-lg font-semibold tracking-normal focus:outline-none focus:border-brand-teal transition-all" />
                              </div>
                              <div className="space-y-3 md:space-y-4 relative group">
                                <label className="text-2xs md:text-2xs font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">Digital Node</label>
                                <input placeholder="email@node.com" className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 text-base md:text-lg font-semibold tracking-normal focus:outline-none focus:border-brand-teal transition-all" />
                              </div>
                            </div>
                            
                            <div className="space-y-3 md:space-y-4 relative group">
                              <label className="text-2xs md:text-2xs font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">Clinical Protocol - Message</label>
                              <textarea rows={4} placeholder="State your requirement" className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 text-base md:text-lg font-semibold tracking-normal focus:outline-none focus:border-brand-teal transition-all resize-none" />
                            </div>

                            <button type="button" className="group flex items-center justify-between w-full bg-black text-white px-6 md:px-12 py-6 md:py-10 text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em] hover:bg-brand-teal transition-all duration-700">
                              COMMIT PROTOCOL <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-4 transition-transform" />
                            </button>
                          </form>
                        </div>
                      </div>
                    </section>
                  );

                case 'marquee':
                  return (
                    <section className="bg-black py-12 md:py-24 overflow-hidden select-none pointer-events-none">
                      <div className="animate-marquee whitespace-nowrap">
                        {Array(8).fill("").map((_, i) => (
                          <span key={i} className="display-giant font-black uppercase tracking-[-0.05em] text-white/5 mx-8 md:mx-24">
                            {sec.data.text}
                          </span>
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