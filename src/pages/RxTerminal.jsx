import React from 'react';
import { motion } from 'framer-motion';
import { Camera, FileUp, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import RxUploader from '@/components/wholesale/RxUploader';
import useCmsPage from '@/hooks/useCmsPage';
import { DEFAULT_RX_TERMINAL_SECTIONS } from '@/lib/cmsDefaults';

function renderStepIcon(name) {
  const cn = "w-8 h-8 text-brand-teal";
  switch (name) {
    case 'VISUAL CAPTURE':
    case 'Camera':
      return <Camera className={cn} strokeWidth={1} />;
    case 'NODE TRANSMIT':
    case 'FileUp':
      return <FileUp className={cn} strokeWidth={1} />;
    case 'CLINICAL DISPATCH':
    case 'Truck':
    default:
      return <Truck className={cn} strokeWidth={1} />;
  }
}

export default function RxTerminal() {
  const { sections, loading } = useCmsPage('rx_terminal', DEFAULT_RX_TERMINAL_SECTIONS);

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
                case 'rx_hero':
                  return (
                    <section className="px-6 md:px-12 pt-40 mb-20 lg:mb-40">
                      <div className="max-w-[1800px] mx-auto border-b border-black pb-12 text-center md:text-left">
                        <h1 className="sub-display-svz">{sec.data.title}</h1>
                        <p className="text-xs font-black tracking-[0.4em] text-black/40 mt-4 uppercase underline underline-offset-8">
                          {sec.data.subtitle}
                        </p>
                      </div>
                    </section>
                  );

                case 'rx_guide':
                  return (
                    <section className="px-6 md:px-12 pb-40">
                      <div className="max-w-[1800px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 border border-black/10">
                          {(sec.data.steps || []).map((s, i) => (
                            <motion.div 
                              key={s.id || i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1, duration: 1 }}
                              className="p-16 border-b md:border-r border-black/10 hover:bg-black hover:text-white transition-all duration-700 group flex flex-col justify-between min-h-[400px]"
                            >
                              <div>
                                <div className="mb-12">{renderStepIcon(s.name)}</div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 leading-none">{s.name}</h3>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 group-hover:text-white/40 leading-relaxed max-w-xs">{s.desc}</p>
                              </div>
                              <span className="text-4xl font-black opacity-10 group-hover:opacity-30 self-end transition-opacity select-none">{s.id}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );

                case 'rx_uploader':
                  return (
                    <section className="px-6 md:px-12 pb-40 bg-black text-white py-40 overflow-hidden relative">
                      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                        <div className="space-y-12">
                          <h2 className="sub-display-svz" dangerouslySetInnerHTML={{ __html: (sec.data.title || '').replace(/\n/g, '<br />') }} />
                          <p className="text-xs md:text-xs font-bold tracking-[0.3em] uppercase text-white/40 leading-relaxed max-w-md">
                            {sec.data.desc}
                          </p>
                          {sec.data.videoUrl && (
                            <div className="aspect-video bg-white/5 border border-white/10 overflow-hidden relative group rounded-lg shadow-inner">
                              <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                              >
                                <source src={sec.data.videoUrl} type="video/mp4" />
                              </video>
                              <div className="absolute bottom-4 left-4 text-2xs font-black tracking-[0.4em] text-white/30 uppercase">{sec.data.videoLabel}</div>
                            </div>
                          )}
                        </div>
                        <div className="bg-white text-black p-4 lg:p-20 border border-white/10 shadow-2xl">
                          <RxUploader />
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-teal/5 blur-[150px] -mr-20 -mt-20 rounded-full" />
                    </section>
                  );

                case 'rx_policy':
                  return (
                    <section className="py-40 px-6 md:px-12 bg-white">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-4">
                          <h2 className="text-4xl font-black uppercase tracking-tighter mb-12" dangerouslySetInnerHTML={{ __html: (sec.data.title || '').replace(/\n/g, '<br />') }} />
                          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-teal">{sec.data.subtitle}</p>
                        </div>
                        <div className="lg:col-span-8 flex flex-col justify-center space-y-12">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {(sec.data.audits || []).map((audit, i) => (
                              <div key={i} className="space-y-6">
                                <p className="text-xs font-black uppercase tracking-tighter">{audit.title}</p>
                                <p className="text-xs font-bold uppercase leading-relaxed tracking-widest text-black/40">
                                  {audit.text}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex items-center gap-4 text-black/40">
                              <ShieldCheck className="w-8 h-8 text-brand-teal" />
                              <p className="text-2xs font-black uppercase tracking-[0.2em]">{sec.data.shieldLabel}</p>
                            </div>
                            {sec.data.whatsappBtnText && (
                              <a href={sec.data.whatsappBtnLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 bg-black text-white px-12 py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-teal duration-500">
                                {sec.data.whatsappBtnText} <ArrowRight className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
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
