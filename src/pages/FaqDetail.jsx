import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCmsSettings from '@/hooks/useCmsSettings';
import { DEFAULT_FAQ_DETAILS } from '@/lib/cmsDefaults';

export default function FaqDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const { settings, loading } = useCmsSettings('faq_details', DEFAULT_FAQ_DETAILS);
  const faqDb = settings || DEFAULT_FAQ_DETAILS;
  const data = faqDb[slug] || faqDb['default'] || DEFAULT_FAQ_DETAILS['default'];

  // Safe checks for nested properties to prevent crashes
  const cta = data.cta || {
    badge: data.ctaBadge || "CLINICAL HELP",
    heading: data.ctaHeading || "Our clinical support desk is available to assist you with prescriptions or orders.",
    benefits: data.ctaBenefits || [
      "Consult directly with licensed, board-certified clinical pharmacists",
      "Perform comprehensive drug-interaction reviews before compound preparation",
      "Set up secure, automated refill schedules tailored to your therapy"
    ]
  };

  const related = data.related || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="bg-black text-white min-h-screen pb-48 pt-32 select-none overflow-x-hidden">
      {/* Top Stylized Eyebrow Headline */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-widest uppercase">
          W<span className="font-serif italic text-brand-teal mx-0.5">E</span> ANSW
          <span className="font-serif italic text-white/90 mx-0.5">E</span>R
        </h1>
      </div>

      {/* Main Content Wrapper Card */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#262626] rounded-2xl md:rounded-3xl p-8 md:p-16 relative overflow-hidden border border-white/5 shadow-2xl"
        >
          {/* SVZ Signature Internal Corner Crossmarks (+) */}
          <span className="absolute top-4 left-4 text-brand-teal text-xs select-none opacity-80">+</span>
          <span className="absolute top-4 right-4 text-brand-teal text-xs select-none opacity-80">+</span>
          <span className="absolute bottom-4 left-4 text-brand-teal text-xs select-none opacity-80">+</span>
          <span className="absolute bottom-4 right-4 text-brand-teal text-xs select-none opacity-80">+</span>

          {/* Breadcrumb / Navigation Badge */}
          <div className="mb-10">
            <Link 
              to="/faqs" 
              className="inline-flex items-center gap-2 bg-[#141414] hover:bg-black transition-colors px-4 py-2 rounded-full text-xs font-medium tracking-wide border border-white/5 text-white/70 hover:text-white"
            >
              <span className="font-bold text-white">FAQs</span>
              <span className="text-white/30">/</span>
              <span className="truncate max-w-[200px] md:max-w-none">{data.shortTitle}</span>
            </Link>
          </div>

          {/* Core Question Title */}
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-12 leading-tight tracking-wide max-w-4xl">
            {data.question}
          </h2>

          {/* Highlight Summary Box */}
          <div className="bg-[#141414] rounded-xl p-6 md:p-8 border border-white/5 mb-10">
            <div className="text-brand-teal text-2xs font-black tracking-[0.25em] uppercase mb-3">
              [SUMMARY]
            </div>
            <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed">
              {data.summary}
            </p>
          </div>

          {/* Full Expanded Paragraph Layout */}
          <div className="mb-16">
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-normal">
              {data.fullText}
            </p>
          </div>

          {/* Custom Teal Dynamic CTA Banner Card */}
          <div className="bg-brand-teal rounded-xl md:rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Ambient inner glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />

            {/* Left Box: Striking solid black block with custom overlapping brand lettering */}
            <div className="bg-black text-brand-teal rounded-lg p-8 md:p-10 flex items-center justify-center shrink-0 border border-white/10 shadow-inner w-full lg:w-auto text-center">
              <div className="font-serif font-black text-4xl md:text-5xl tracking-tighter uppercase leading-none select-none">
                CLINICAL<br />
                <span className="text-white">CARE</span>
              </div>
            </div>

            {/* Right Column: Heading & Benefits list */}
            <div className="flex-1 flex flex-col justify-center z-10">
              <h3 className="font-serif text-xl md:text-3xl font-bold mb-6 leading-snug tracking-wide text-white">
                {cta.heading}
              </h3>
              <ul className="flex flex-col gap-3 mb-8">
                {cta.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="text-xs md:text-sm font-medium text-white/90 flex items-start gap-3">
                    <span className="text-black font-bold select-none mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div>
                <Link 
                  to="/contact" 
                  className="inline-block bg-black text-white hover:bg-white hover:text-black transition-all duration-500 px-8 py-4 rounded-full text-2xs font-black tracking-[0.25em] uppercase shadow-lg"
                >
                  INITIATE PARTNERSHIP
                </Link>
              </div>
            </div>
          </div>

          {/* Return CTA Footnote */}
          <div className="mt-12 pt-6 border-t border-white/5 text-center">
            <button 
              onClick={() => navigate(-1)} 
              className="text-2xs font-black tracking-[0.3em] text-white/40 hover:text-brand-teal uppercase transition-colors"
            >
              &larr; Return to Question Directory
            </button>
          </div>
        </motion.div>
      </div>

      {/* Related Questions Section */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mt-32">
        {/* Section Headline */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-black tracking-widest uppercase">
            R<span className="font-serif italic text-brand-teal mx-0.5">E</span>LATED Q
            <span className="font-serif italic text-white/90 mx-0.5">U</span>ESTI
            <span className="font-serif italic text-brand-teal mx-0.5">O</span>NS
          </h3>
        </div>

        {/* Side-by-Side Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.related.map((item, rIdx) => (
            <Link
              key={rIdx}
              to={`/faqs/${item.slug}`}
              className="bg-[#262626] rounded-xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[260px] border border-white/5 shadow-xl group hover:border-brand-teal/30 transition-all duration-500 block"
            >
              {/* Inner Corner Crossmarks */}
              <span className="absolute top-3 left-3 text-brand-teal text-2xs select-none opacity-80">+</span>
              <span className="absolute top-3 right-3 text-brand-teal text-2xs select-none opacity-80">+</span>
              <span className="absolute bottom-3 left-3 text-brand-teal text-2xs select-none opacity-80">+</span>
              <span className="absolute bottom-3 right-3 text-brand-teal text-2xs select-none opacity-80">+</span>

              <div>
                <div className="text-brand-teal text-2xs font-black tracking-[0.2em] uppercase mb-4">
                  {item.tag}
                </div>
                <h4 className="font-serif text-base md:text-lg text-white mb-4 leading-snug tracking-wide group-hover:text-white transition-colors">
                  {item.q}
                </h4>
                <p className="text-xs md:text-sm text-white/60 tracking-normal font-normal leading-relaxed line-clamp-3">
                  {item.a}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-2xs font-black tracking-[0.2em] text-white uppercase group-hover:text-brand-teal transition-colors">
                <span>READ MORE</span>
                <span className="text-brand-teal text-xs transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
