import * as THREE from 'three';
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import useInView from '@/hooks/useInView';
import useCmsSettings from '@/hooks/useCmsSettings';
import { DEFAULT_FOOTER_SETTINGS } from '@/lib/cmsDefaults';

// Preload the default first model to keep network calls optimized
useGLTF.preload(DEFAULT_FOOTER_SETTINGS.models[0].url);

// Shared mouse coordinate reference
const MOUSE = { wx: 0, wy: 0 };

// 3D model container component
function CardModel({ url }) {
  const gltf = useGLTF(url);
  const clone = useRef(null);
  
  if (!clone.current) {
    clone.current = gltf.scene.clone(true);
    clone.current.traverse((n) => { n.matrixAutoUpdate = true; n.frustumCulled = false; });
  }

  const ref = useRef();
  const s = useRef({ rx: 0, ry: 0 });

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const ease = 1 - Math.exp(-delta * 14);
    s.current.rx += (MOUSE.wy * -0.8 - s.current.rx) * ease;
    s.current.ry += (MOUSE.wx *  1.2 - s.current.ry) * ease;
    ref.current.rotation.x = s.current.rx;
    ref.current.rotation.y = s.current.ry;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.08;
  });

  return <primitive ref={ref} object={clone.current} dispose={null} scale={1.2} />;
}

export default function Footer() {
  const location = useLocation();
  const [footerRef, isInView] = useInView({ threshold: 0.01 });
  const sectionRef = useRef(null);
  const cardRef    = useRef(null);

  const { settings, loading } = useCmsSettings('footer', DEFAULT_FOOTER_SETTINGS);

  const modelsList = settings.models || DEFAULT_FOOTER_SETTINGS.models;
  const whatsappLink = settings.whatsappLink || DEFAULT_FOOTER_SETTINGS.whatsappLink;
  const whatsappVideo = settings.whatsappVideo || DEFAULT_FOOTER_SETTINGS.whatsappVideo;
  const copyright = settings.copyright || DEFAULT_FOOTER_SETTINGS.copyright;
  const compliance = settings.compliance || DEFAULT_FOOTER_SETTINGS.compliance;
  const giantWatermark = settings.giantWatermark || DEFAULT_FOOTER_SETTINGS.giantWatermark;
  const footerLinks = settings.footerLinks || DEFAULT_FOOTER_SETTINGS.footerLinks;
  const pageFooters = settings.pageFooters || DEFAULT_FOOTER_SETTINGS.pageFooters;

  const getFooterContent = () => {
    const path = location.pathname;
    return pageFooters[path] || pageFooters['default'] || pageFooters['/'];
  };

  const { topText, line1, middleText, line2, ctaText, ctaPath } = getFooterContent();

  const target  = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [renderedIndex, setRenderedIndex] = useState(0);
  const lastIdx = useRef(0);

  // Debounce the 3D model swaps to keep canvas performance buttery-smooth
  useEffect(() => {
    const handler = setTimeout(() => {
      setRenderedIndex(hoveredIndex);
    }, 150);
    return () => clearTimeout(handler);
  }, [hoveredIndex]);

  // Window-level mouse tracking
  useEffect(() => {
    if (!isInView) return;
    const handleMouseMove = (e) => {
      MOUSE.wx = (e.clientX / window.innerWidth) * 2 - 1;
      MOUSE.wy = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInView]);

  // Section card follow coordinate tracking
  useEffect(() => {
    if (!isInView) return;
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      target.current.x = x;
      target.current.y = y;

      const norm = Math.max(0, Math.min(1, x / rect.width));
      const idx  = Math.min(modelsList.length - 1, Math.floor(norm * modelsList.length));
      if (idx !== lastIdx.current) {
        lastIdx.current = idx;
        setHoveredIndex(idx);
      }
    };

    section.addEventListener('mousemove', onMove, { passive: true });
    return () => section.removeEventListener('mousemove', onMove);
  }, [isInView, modelsList]);

  // Translate transform card loop
  useEffect(() => {
    if (!isInView) return;
    let raf;
    const LERP = 0.1;
    const CARD_W = window.innerWidth * 0.46;
    const CARD_H = window.innerHeight * 0.60;
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      if (cardRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const cx = Math.max(CARD_W / 2, Math.min(rect.width  - CARD_W / 2, current.current.x));
        const cy = Math.max(CARD_H / 2, Math.min(rect.height - CARD_H / 2, current.current.y));
        cardRef.current.style.transform =
          `translate(-50%, -50%) translate(${cx}px, ${cy}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isInView]);

  return (
    <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center py-20 px-6 cursor-none"
      >
        {/* Floating 3D Card */}
        {isInView && modelsList && modelsList[renderedIndex] && (
          <div
            ref={cardRef}
            className="absolute top-0 left-0 pointer-events-none z-0"
            style={{ width: '46vw', height: '60vh' }}
          >
            <div className="w-full h-full">
              <Canvas
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                camera={{ position: [0, 0, 3.2], fov: 42 }}
              >
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, -3, 5]} intensity={0.4} />
                <pointLight position={[0, 0, 3]} intensity={3} color="#1B6E8C" />
                <Suspense fallback={null}>
                  <CardModel key={modelsList[renderedIndex].url} url={modelsList[renderedIndex].url} scale={1.2} />
                  <Environment preset="warehouse" />
                </Suspense>
              </Canvas>
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center text-center w-full">
          <div className="opacity-50 text-2xs md:text-sm font-black tracking-[0.5em] mb-12 uppercase">
            SAVINCLIFF PHARMACY — 2026
          </div>

          <div className="mb-20">
            {topText && (
              <div className="display-sm font-bold text-white/40 uppercase leading-none mb-4 tracking-tighter">
                {topText}
              </div>
            )}
            <h2 className="text-[7vw] md:text-[6vw] font-black leading-[0.8] tracking-[-0.05em] uppercase mb-4">
              {line1}
            </h2>
            {middleText && (
              <div className="display-sm font-bold text-white/40 uppercase leading-none mb-6 tracking-tighter">
                {middleText}
              </div>
            )}
            {line2 && (
              <h2 className="text-[7vw] md:text-[6vw] font-black leading-[0.8] tracking-[-0.05em] uppercase">
                {line2}
              </h2>
            )}
          </div>

          {/* Model label details */}
          {modelsList && modelsList[hoveredIndex] && (
            <p className="text-2xs md:text-sm font-black tracking-[0.5em] uppercase text-white/25 mb-8">
              {modelsList[hoveredIndex].label}
            </p>
          )}

          <Link
            to={ctaPath || '/contact'}
            className="group relative inline-flex items-center justify-center px-16 py-7 border border-white/20 overflow-hidden transition-all duration-700 hover:border-white/40 cursor-pointer pointer-events-auto"
          >
            <span className="relative z-10 text-2xs md:text-sm font-black tracking-[0.3em] uppercase group-hover:text-black transition-colors duration-700">
              {ctaText}
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
          </Link>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 mt-40 w-full max-w-7xl text-left border-t border-white/5 pt-20">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-8">
                <h3 className="text-2xs md:text-sm font-black tracking-[0.4em] text-white/30 uppercase">{group.title}</h3>
                <div className="flex flex-col gap-6">
                  {group.links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-2xs md:text-sm font-black tracking-[0.2em] uppercase hover:text-brand-teal transition-all duration-500 hover:translate-x-2 pointer-events-auto cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-40 pt-12 border-t border-white/5 w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 pb-[10vw] md:pb-[13vw] relative z-10">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-xs md:text-sm font-normal tracking-[0.05em] text-white/40">
                {copyright}
              </p>
            </div>
            <div className="text-xs md:text-sm font-normal tracking-[0.15em] text-white/40 uppercase text-center md:text-right">
              {compliance}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_85%)] pointer-events-none z-[5] opacity-70" />
      </section>

      {/* giant faint watermark overlay */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 select-none pointer-events-none z-[6] w-full text-center">
        <span className="text-[9vw] md:text-[11vw] font-serif font-light text-white/[0.06] lowercase tracking-tight leading-none whitespace-nowrap">
          {giantWatermark}
        </span>
      </div>

      {/* WhatsApp floating button node */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[90] group flex items-center gap-3"
      >
        <div className="bg-black text-white text-2xs md:text-sm font-black tracking-[0.3em] uppercase py-2 px-4 border border-white/20 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 whitespace-nowrap shadow-2xl backdrop-blur-sm">
          WHATSAPP NODE
        </div>

        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden hover:bg-brand-teal transition-all duration-700 shadow-2xl relative border border-white/10 shrink-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <source src={whatsappVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 border-2 border-white/20 rounded-full group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
        </div>
      </a>
    </footer>
  );
}