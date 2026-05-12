import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FAQ_DATABASE = {
  'default': {
    category: 'CLIENT EXPERIENCE',
    shortTitle: 'Can Savincliff work with international ...',
    question: 'Can Savincliff work with international or remote teams?',
    summary: "Yes—Savincliff works globally with async workflows, secure synchronization nodes, and real-time clinical audit trails. We deploy redundant nodes across multiple jurisdictions.",
    fullText: "Savincliff operates as a highly available, globally distributed healthcare technology framework. Our asynchronous clinical management pipeline empowers cross-border institutions to interface securely without workflow friction. Utilizing high-performance client-side cache layers alongside robust cloud replication engines, remote institutional stakeholders maintain complete visibility and cryptographically certified dispensing precision across every operational tier. Every interaction is strictly verified to guarantee uncompromising accuracy.",
    cta: {
      badge: "HIRE SAVINCLIFF",
      heading: "We only onboard select institutional nodes monthly — reserve your allocation early.",
      benefits: [
        "Work directly with Savincliff's principal pharmaceutical architects",
        "Accelerate institutional throughput with automated compliance verification",
        "Seamless end-to-end telemetry integration with zero operational overhead"
      ]
    },
    related: [
      {
        slug: 'changes-later',
        tag: 'CLINICAL ARCHITECTURE',
        q: 'WHAT HAPPENS IF I WANT TO MAKE CHANGES TO THE TERMINAL LATER?',
        a: 'YOU CAN DEPLOY MODULAR OVERLAYS OR ENGAGE SAVINCLIFF FOR EXPANSION NODES AND SCALING.'
      },
      {
        slug: 'brand-evolution',
        tag: 'REGULATORY IDENTITY',
        q: 'DO I NEED A FULL OVERHAUL OR JUST A SYSTEM EVOLUTION?',
        a: 'FULL OVERHAULS REDEFINE DISPENSING TOPOLOGY; EVOLUTIONS SEAMLESSLY UPGRADE SUB-MODULES WHILE PRESERVING AUDIT CONTINUITY.'
      }
    ]
  }
};

export default function FaqDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = FAQ_DATABASE[slug] || FAQ_DATABASE['default'];

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
              className="inline-flex items-center gap-2 bg-[#141414] hover:bg-black transition-colors px-4 py-2 rounded-full text-[11px] font-medium tracking-wide border border-white/5 text-white/70 hover:text-white"
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
            <div className="text-brand-teal text-[10px] font-black tracking-[0.25em] uppercase mb-3">
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
                HIRE<br />
                <span className="text-white">SVZ</span>
              </div>
            </div>

            {/* Right Column: Heading & Benefits list */}
            <div className="flex-1 flex flex-col justify-center z-10">
              <h3 className="font-serif text-xl md:text-3xl font-bold mb-6 leading-snug tracking-wide text-white">
                {data.cta.heading}
              </h3>
              <ul className="flex flex-col gap-3 mb-8">
                {data.cta.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="text-xs md:text-sm font-medium text-white/90 flex items-start gap-3">
                    <span className="text-black font-bold select-none mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div>
                <Link 
                  to="/contact" 
                  className="inline-block bg-black text-white hover:bg-white hover:text-black transition-all duration-500 px-8 py-4 rounded-full text-[10px] font-black tracking-[0.25em] uppercase shadow-lg"
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
              className="text-[10px] font-black tracking-[0.3em] text-white/40 hover:text-brand-teal uppercase transition-colors"
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
              <span className="absolute top-3 left-3 text-brand-teal text-[10px] select-none opacity-80">+</span>
              <span className="absolute top-3 right-3 text-brand-teal text-[10px] select-none opacity-80">+</span>
              <span className="absolute bottom-3 left-3 text-brand-teal text-[10px] select-none opacity-80">+</span>
              <span className="absolute bottom-3 right-3 text-brand-teal text-[10px] select-none opacity-80">+</span>

              <div>
                <div className="text-brand-teal text-[9px] font-black tracking-[0.2em] uppercase mb-4">
                  {item.tag}
                </div>
                <h4 className="font-serif text-base md:text-lg text-white mb-4 leading-snug tracking-wide group-hover:text-white transition-colors">
                  {item.q}
                </h4>
                <p className="text-[11px] text-white/50 tracking-wider font-bold leading-relaxed uppercase line-clamp-3">
                  {item.a}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black tracking-[0.2em] text-white uppercase group-hover:text-brand-teal transition-colors">
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
