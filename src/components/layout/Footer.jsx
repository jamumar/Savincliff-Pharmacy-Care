import * as THREE from 'three';
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

// ─── Models list ──────────────────────────────────────────────────────────────
const MODELS = [
  { url: '/models/opt_savincliff_pill.glb',               label: 'PILL YIN YANG' },
  { url: '/models/opt_azure_embrace.glb',                 label: 'AZURE EMBRACE' },
  { url: '/models/opt_candy_ribbon.glb',                  label: 'CANDY RIBBON' },
  { url: '/models/opt_crystal_spiral.glb',                label: 'CRYSTAL SPIRAL' },
  { url: '/models/opt_emerald_duet.glb',                  label: 'EMERALD DUET' },
  { url: '/models/opt_golden_ember.glb',                  label: 'GOLDEN EMBER' },
  { url: '/models/opt_leather_wings_in_flig.glb',         label: 'LEATHER WINGS' },
  { url: '/models/opt_pill_yin_yang.glb',                 label: 'MESHY YIN YANG' },
  { url: '/models/opt_the_yin_yang_yin_yang_med.glb',     label: 'YIN YANG MED' },
];
MODELS.forEach(({ url }) => useGLTF.preload(url));

// ─── Shared mouse (window-level, always live) ─────────────────────────────────
const MOUSE = { wx: 0, wy: 0 }; // normalized [-1,1] window coords
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    MOUSE.wx = (e.clientX / window.innerWidth) * 2 - 1;
    MOUSE.wy = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });
}

// ─── 3D model inside the card ─────────────────────────────────────────────────
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

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const sectionRef = useRef(null);
  const cardRef    = useRef(null);

  // Smoothed card position (follows cursor in section-local coords)
  const target  = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Which model to show — driven by cursor X position within section
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIdx = useRef(0);

  // ── Mouse tracking on the section ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      target.current.x = x;
      target.current.y = y;

      // Divide width into MODELS.length zones → pick model
      const norm = Math.max(0, Math.min(1, x / rect.width));
      const idx  = Math.min(MODELS.length - 1, Math.floor(norm * MODELS.length));
      if (idx !== lastIdx.current) {
        lastIdx.current = idx;
        setActiveIndex(idx);
      }
    };

    section.addEventListener('mousemove', onMove, { passive: true });
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  // ── RAF loop: lerp card position ──
  useEffect(() => {
    let raf;
    const LERP = 0.1;
    const CARD_W = window.innerWidth * 0.46; // half card width in px
    const CARD_H = window.innerHeight * 0.60; // half card height in px
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      if (cardRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Clamp so card never gets cut off at edges
        const cx = Math.max(CARD_W / 2, Math.min(rect.width  - CARD_W / 2, current.current.x));
        const cy = Math.max(CARD_H / 2, Math.min(rect.height - CARD_H / 2, current.current.y));
        cardRef.current.style.transform =
          `translate(-50%, -50%) translate(${cx}px, ${cy}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const footerLinks = [
    { title: 'AGENCY',   links: [{ name: 'CAPABILITIES', path: '/services' }, { name: 'ENTERPRISE', path: '/wholesale' }] },
    { title: 'WORK',     links: [{ name: 'PROJECTS', path: '/products' }, { name: 'FAQs', path: '/contact' }] },
    { title: 'CULTURE',  links: [{ name: 'ABOUT', path: '/about' }, { name: 'SHOP', path: '/shop' }] },
    { title: 'INSIGHTS', links: [{ name: 'BLOG POSTS', path: '/compliance' }, { name: "CLIENT'S INVESTORS", path: '/wholesale' }] },
    { title: 'SOCIALS',  links: [{ name: 'IG', path: '#' }, { name: 'LINKEDIN', path: '#' }] },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center py-20 px-6 cursor-none"
      >
        {/* ── Floating 3D Card (follows cursor) ── */}
        <div
          ref={cardRef}
          className="absolute top-0 left-0 pointer-events-none z-0"
          style={{ width: '46vw', height: '60vh' }}
        >
          {/* No inner scale wrapper — was causing edge clipping */}
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
                {/* Key on url causes clean remount + fade between models */}
                <CardModel key={MODELS[activeIndex].url} url={MODELS[activeIndex].url} scale={1.2} />
                <Environment preset="warehouse" />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* ── Text Content (above card) ── */}
        <div className="relative z-10 flex flex-col items-center text-center w-full">
          <div className="opacity-50 text-[10px] md:text-[12px] font-black tracking-[0.5em] mb-12 uppercase">
            SAVINCLIFF PHARMACY — EST. 2024
          </div>

          <div className="mb-20">
            <div className="text-[3.5vw] md:text-[2vw] font-bold text-white/40 uppercase leading-none mb-4 tracking-tighter">
              humans
            </div>
            <h2 className="text-[9vw] md:text-[6vw] font-black leading-[0.8] tracking-[-0.05em] uppercase mb-4">
              Bridging The Gap
            </h2>
            <div className="text-[3.5vw] md:text-[2vw] font-bold text-white/40 uppercase leading-none mb-6 tracking-tighter">
              between
            </div>
            <h2 className="text-[8vw] md:text-[5.5vw] font-black leading-[0.8] tracking-[-0.05em] uppercase">
              Technology and Artistry
            </h2>
          </div>

          {/* Model label — shows which model is active */}
          <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white/25 mb-8">
            {MODELS[activeIndex].label}
          </p>

          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center px-16 py-7 border border-white/20 overflow-hidden transition-all duration-700 hover:border-white/40 cursor-pointer pointer-events-auto"
          >
            <span className="relative z-10 text-[13px] font-black tracking-[0.3em] uppercase group-hover:text-black transition-colors duration-700">
              DISCOVERY CALL
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
          </Link>

          {/* Link Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 mt-40 w-full max-w-7xl text-left border-t border-white/5 pt-20">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-8">
                <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/30 uppercase">{group.title}</h3>
                <div className="flex flex-col gap-6">
                  {group.links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-[12px] font-black tracking-[0.2em] uppercase hover:text-brand-teal transition-all duration-500 hover:translate-x-2 pointer-events-auto cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-40 pt-12 border-t border-white/5 w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
                © 2024 Savincliff Pharmacy. All rights reserved.
              </p>
            </div>
            <div className="flex gap-12">
              <Link to="/privacy" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase hover:text-white transition-colors pointer-events-auto cursor-pointer">Privacy Policy</Link>
              <Link to="/terms"   className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase hover:text-white transition-colors pointer-events-auto cursor-pointer">Service Protocol</Link>
            </div>
          </div>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_85%)] pointer-events-none z-[5] opacity-70" />
      </section>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/923251206427"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[90] group flex items-center gap-3"
      >
        {/* Hover Label */}
        <div className="bg-black text-white text-[10px] font-black tracking-[0.3em] uppercase py-2 px-4 border border-white/20 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 whitespace-nowrap shadow-2xl backdrop-blur-sm">
          WHATSAPP NODE
        </div>

        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden hover:bg-brand-teal transition-all duration-700 shadow-2xl relative border border-white/10 shrink-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <source src="/animations/whatsapp_1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 border-2 border-white/20 rounded-full group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
        </div>
      </a>
    </footer>
  );
}