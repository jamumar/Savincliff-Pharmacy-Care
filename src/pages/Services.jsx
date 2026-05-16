import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue } from 'framer-motion';
import { ShieldCheck, Activity, Zap, ClipboardList, Package, Truck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ─── 3D Model ─────────────────────────────────────────────────────────── */
function HeroModel({ mouse }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/opt_glass_wave_duo.glb');

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Mouse-driven full 180-degree sweep (-90° to +90° yaw range)
    const targetY = mouse.current[0] * (Math.PI / 2);
    // Responsive pitch tilt
    const targetX = mouse.current[1] * (Math.PI / 4);

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.1;

    // Gentle idle float
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef} scale={1.1} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* ─── Procedural Smoke Wave Shader (21st.dev / SVZ Style) ───────────────── */
/* Architecture:                                                             */
/*  - R3F full-screen plane with custom shaderMaterial                       */
/*  - Constrained strictly to a narrow vertical area                         */
/*  - Sinuous wave trajectory modeling a fluid, rolling vapor ribbon         */
/*  - Domain-warped FBM noise providing premium internal smoke tendrils      */
/*  - Pure white/silver tones composited natively over black                 */
function PlasmaBeam() {
  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    uniforms.current.uTime.value = t;
  });

  useEffect(() => {
    const handleResize = () => {
      uniforms.current.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <mesh position={[0, 0, -1.5]} scale={[25, 15, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uResolution;

          // Pseudo-random hash
          float hash(vec2 p) {
              return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
          }

          // Smooth cubic value noise
          float noise(vec2 p) {
              vec2 i = floor(p);
              vec2 f = fract(p);
              vec2 u = f * f * (3.0 - 2.0 * f);
              return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                         mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
          }

          // Standard Fractal Brownian Motion
          float fbm(vec2 p) {
              float f = 0.0;
              float amp = 0.5;
              for (int i = 0; i < 5; i++) {
                  f += amp * noise(p);
                  p *= 2.0;
                  amp *= 0.5;
              }
              return f;
          }

          void main() {
              vec2 uv = vUv * 2.0 - 1.0;
              float aspect = uResolution.x / uResolution.y;
              uv.x *= aspect;

              // Subconscious, highly atmospheric rolling speed
              float t = uTime * 0.12;

              // Sinuous wave trajectory: forces the smoke into an elegant undulating ribbon
              float wave = sin(uv.x * 2.2 - t * 1.5) * 0.06;
              wave += cos(uv.x * 3.8 + t * 1.2) * 0.025;
              wave += sin(uv.x * 1.1 + t * 0.7) * 0.04;

              // Absolute vertical distance from the undulating wave axis
              float dist = abs(uv.y - wave);

              // Domain-warped smoke texture for internal high-fidelity fluid tendrils
              vec2 q = vec2(fbm(uv * 2.0 - vec2(0.0, t * 0.5)), fbm(uv * 2.0 + vec2(1.5, t * 0.4)));
              vec2 r = vec2(fbm(uv * 2.5 + 2.0 * q + vec2(0.8, t * 0.6)), fbm(uv * 2.5 + 2.0 * q - vec2(2.1, t * 0.7)));
              float smokeWarp = fbm(uv * 2.0 + 2.5 * r);

              // Constrain strictly to a tight, small vertical area around the wave path
              // Tight envelope cuts off expansion entirely
              float narrowEnvelope = exp(-dist * 24.0);
              
              // Internal dense wisps modulated by the warped smoke texture
              float smokeTendrils = narrowEnvelope * smoothstep(0.05, 0.85, smokeWarp) * 0.65;
              
              // Ultra-narrow core highlight defining the wave backbone softly
              float ultraNarrowCore = exp(-dist * 50.0) * 0.2;
              
              // Very gentle ambient vapor strictly near the boundary to keep edges smooth like smoke
              float softVapor = exp(-dist * 16.0) * 0.08;

              float density = smokeTendrils + ultraNarrowCore + softVapor;

              // Smooth horizontal fade dissolving cleanly at horizontal view edges
              float edgeFade = 1.0 - smoothstep(aspect * 0.15, aspect * 0.95, abs(uv.x));
              density *= edgeFade;

              // Premium pure monochrome off-white/silver coloring composited over black
              vec3 smokeColor = mix(vec3(0.55, 0.58, 0.62), vec3(1.0, 1.0, 1.0), smoothstep(0.1, 0.5, density));
              vec3 finalColor = smokeColor * density;

              // Microscopic additive core sparkle (barely perceptible)
              float star = exp(-length(uv) * 4.0) * 0.02;
              finalColor += star * vec3(1.0);

              // Cinematic dither / film grain to eliminate banding
              float grain = (hash(vUv + uTime) - 0.5) * 0.015;
              finalColor += grain;

              gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
          }
        `}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────────────── */
function ServicesHero() {
  const mouse = useRef([0, 0]);
  const heroRef = useRef(null);
  const [time, setTime] = useState('');

  // Track mouse
  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouse.current = [
        (e.clientX / w - 0.5) * 2,
        (e.clientY / h - 0.5) * 2,
      ];
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Live time
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* Deep vignette background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_rgba(20,20,20,0.6)_0%,_rgba(0,0,0,1)_100%)] z-[1]" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-[2]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#4488ff" />
          <pointLight position={[0, 2, 3]} intensity={1.5} color="#ffffff" />
          <spotLight
            position={[0, 8, 2]}
            angle={0.4}
            penumbra={0.8}
            intensity={2}
            color="#ffffff"
          />
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <PlasmaBeam />
            <HeroModel mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        {/* Headline — SAVINCLIFF only */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase tracking-[-0.04em] leading-[0.88] text-white"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9.5rem)' }}
          >
            SAVINCLIFF
          </motion.h1>
        </div>
      </div>

      {/* Bottom bar — SCROLL & EXPLORE / local time */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-30 px-8 md:px-12 flex items-end justify-between pointer-events-none select-none"
      >
        {/* Left: Scroll */}
        <div className="flex items-center gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h6m6 0h-6m0 0V6m0 6v6" />
          </svg>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black tracking-[0.35em] text-white/40 uppercase">SCROLL &amp; EXPLORE</span>
            <span className="text-[9px] font-black tracking-[0.3em] text-white/25 uppercase">THE SAVINCLIFF REALM</span>
          </div>
        </div>

        {/* Right: Location + time */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[9px] font-black tracking-[0.35em] text-white/40 uppercase">ABUJA, NIGERIA</span>
            <div className="flex gap-2 items-center">
              <span className="text-[9px] font-black tracking-[0.25em] text-white/25 uppercase">Local time:</span>
              <span className="text-[9px] font-black tracking-[0.25em] text-white/50 uppercase">{time}</span>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h6m6 0h-6m0 0V6m0 6v6" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Stacked Capabilities Section (SVZ Overlapping Sticky Rows) ────────── */

/* Inject CSS keyframes via a style tag rendered once */
const CAP_STYLES = `
  @keyframes cap-spin    { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
  @keyframes cap-spin-r  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
  @keyframes cap-float   { 0%,100%{transform:translateY(0) rotate(-12deg)} 50%{transform:translateY(-12px) rotate(-12deg)} }
  @keyframes cap-bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes cap-orbit   { from{transform:rotate(0deg) translateX(36px)} to{transform:rotate(360deg) translateX(36px)} }
  @keyframes cap-pulse   { 0%,100%{opacity:.3;transform:scale(.85)} 50%{opacity:1;transform:scale(1)} }
  @keyframes cap-morph   { 0%,100%{border-radius:30% 70% 70% 30%/30% 30% 70% 70%} 50%{border-radius:70% 30% 30% 70%/70% 70% 30% 30%} }
`;

const TEAL  = '#1B6E8C';
const TEAL2 = '#14536b';
const TEAL3 = 'rgba(27,110,140,0.2)';

const CAPABILITIES_DATA = [
  {
    id: '[01]',
    title: 'STRATEGY',
    desc: 'WE ALIGN ON THE VISION SO EVERY STEP FORWARD IS A STEP WITH PURPOSE.',
    list: ['Web Competitor Analysis', 'Persona Posters', 'User Flows', 'User Journey', 'Sitemap'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div style={{ display:'flex', flexDirection:'column', gap:12, animation:'cap-float 3s ease-in-out infinite' }}>
          <div style={{ width:88, height:26, background:TEAL, borderRadius:4 }} />
          <div style={{ width:64, height:26, background:TEAL2, borderRadius:4, animation:'cap-float 3s ease-in-out infinite .4s' }} />
        </div>
      </div>
    )
  },
  {
    id: '[02]',
    title: 'BRAND',
    desc: "WE LAY THE GROUNDWORK FOR WHO YOU ARE NOW — AND WHO YOU'RE MEANT TO BECOME.",
    list: ['Naming workshop', 'Brand Strategy & Core', 'Brand Deck', 'Logo Evolution', 'Sales & Marketing Collateral', 'Messaging & copy'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div style={{ width:80, height:80, background:`linear-gradient(135deg,${TEAL},${TEAL2})`, animation:'cap-morph 4s ease-in-out infinite' }} />
      </div>
    )
  },
  {
    id: '[03]',
    title: 'DESIGN',
    desc: 'WE CRAFT BEAUTY WITH INTENTION, WHERE FORM AND FUNCTION MEET IN PERFECT BALANCE.',
    list: ['UI/UX Design', 'Moodboard & Brainstorm', 'Design Systems & UI Kits', 'Animations & Interactions', '3D Design', 'Usability Testing'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div style={{ position:'relative', width:88, height:88 }}>
          <div style={{ position:'absolute', inset:0, border:`2px solid ${TEAL3}`, borderRadius:'50%' }} />
          <div style={{ position:'absolute', inset:10, border:`1px solid ${TEAL3}`, borderRadius:'50%' }} />
          <div style={{ position:'absolute', top:'50%', left:'50%', width:12, height:12, marginTop:-6, marginLeft:-6, background:TEAL, borderRadius:'50%', animation:'cap-orbit 2.5s linear infinite', transformOrigin:'0 0' }} />
        </div>
      </div>
    )
  },
  {
    id: '[04]',
    title: 'DEVELOPMENT',
    desc: "WE BRING DESIGN TO LIFE WITH CODE THAT'S CLEAN, FAST, AND BUILT TO SCALE.",
    list: ['Custom Development', 'Front-end Optimization', 'Accessibility', 'Web App Development', 'AI Integrations', 'Data Migration'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div style={{ position:'relative', width:72, height:72 }}>
          <div style={{ position:'absolute', inset:0, border:`3px solid ${TEAL}`, borderRadius:8, animation:'cap-spin 6s linear infinite' }} />
          <div style={{ position:'absolute', inset:14, border:`2px solid ${TEAL2}`, borderRadius:4, animation:'cap-spin-r 4s linear infinite' }} />
          <div style={{ position:'absolute', top:'50%', left:'50%', width:8, height:8, marginTop:-4, marginLeft:-4, background:TEAL, borderRadius:'50%' }} />
        </div>
      </div>
    )
  },
  {
    id: '[05]',
    title: 'PRODUCTION',
    desc: 'WE CREATE THE FOUNDATION FOR YOUR NEXT BIG IDEA.',
    list: ['Creative Identity Workshop', 'Define Vision & Creative Focus', 'Pre-Production Briefing', 'Talent & Set Scouting', 'Campaign Execution', 'Post-Production'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div style={{ animation:'cap-bounce 2s ease-in-out infinite' }}>
          <div style={{ width:0, height:0, borderLeft:'44px solid transparent', borderRight:'44px solid transparent', borderBottom:`72px solid ${TEAL}` }} />
        </div>
      </div>
    )
  },
  {
    id: '[06]',
    title: 'GROWTH',
    desc: "WE AMPLIFY WHAT'S WORKING AND OPEN THE DOORS TO WHAT'S NEXT.",
    list: ['SEO & SEM Strategy', 'Custom Dashboard Reporting', 'Process & Workflow Automation', 'AI Consulting'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div style={{ position:'relative' }}>
          <div style={{ width:64, height:64, background:`linear-gradient(45deg,${TEAL},${TEAL2})`, animation:'cap-spin 5s linear infinite' }} />
          <div style={{ position:'absolute', inset:-16, border:`1px solid ${TEAL3}`, borderRadius:'50%', animation:'cap-pulse 2s ease-in-out infinite' }} />
        </div>
      </div>
    )
  },
  {
    id: '[07]',
    title: 'AI ECOSYSTEMS',
    desc: 'WE ENGINEER SMART INFRASTRUCTURES THAT DO THE WORK — SO YOU CAN FOCUS ON VISION.',
    list: ['Prompt Engineering & Workflow Design', 'Custom LLM Agent Development', 'AI Strategy & Automation Consulting', 'Data Integration & Fine-Tuning', 'No-Code AI Tools & Prototypes', 'Voice & Chat Interface Design'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, width:80, height:80 }}>
          {[...Array(9)].map((_,i) => (
            <div key={i} style={{ background: i===4 ? TEAL : TEAL3, borderRadius:3, animation:`cap-pulse ${1.5+i*0.2}s ease-in-out infinite`, animationDelay:`${i*0.1}s` }} />
          ))}
        </div>
      </div>
    )
  }
];
function StackedCapabilities() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.capability-row');

      // Initialize row stack positions
      // Row 0 starts completely visible at the top
      // Consecutive rows start offscreen below the viewport
      const NAV_H = 72; // fixed navbar height in px — first strip must clear this

      rows.forEach((row, i) => {
        if (i === 0) {
          gsap.set(row, { y: NAV_H, zIndex: 1 });
        } else {
          gsap.set(row, { y: window.innerHeight, zIndex: i + 1 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${rows.length * 750}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each subsequent row sliding up, offset by navbar height
      rows.forEach((row, i) => {
        if (i === 0) return;
        const STRIP_H = 48; // px — height of each collapsed title strip (matches reference)
        const targetY = NAV_H + i * STRIP_H;

        tl.to(row, {
          y: targetY,
          ease: 'none',
          duration: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{CAP_STYLES}</style>
      <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden select-none">
      {CAPABILITIES_DATA.map((item, index) => (
        <div
          key={item.id}
          className="capability-row absolute left-0 top-0 w-full h-full bg-black border-t border-white/10 flex flex-col justify-start"
        >
          {/* Strip Header — always visible (48px), content below is hidden when collapsed) */}
          <div className="w-full border-b border-white/5 h-12 flex items-center px-8 md:px-14">
            <div className="flex items-center gap-3 w-full max-w-[1800px] mx-auto">
              <span className="text-[10px] font-black text-[#1B6E8C] shrink-0 mr-1">{item.id}</span>
              <h3 className="text-lg md:text-2xl font-black tracking-tight text-white uppercase leading-none">{item.title}</h3>
            </div>
          </div>

          {/* Expanded Content */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-10 max-w-[1800px] mx-auto px-8 md:px-14 pt-8 overflow-hidden" style={{ height: 'calc(100% - 48px)' }}>
            {/* Left Column: Heading + Content — ~55% */}
            <div className="w-full lg:w-[55%] flex flex-col">
              {/* Large title in expanded area */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[11px] font-black text-[#1B6E8C] shrink-0">{item.id}</span>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">{item.title}</h3>
              </div>

              {/* Content Area */}
              <div className="pr-0 lg:pr-12">
                <p className="text-[11px] md:text-[12px] font-bold tracking-[0.18em] text-white uppercase mb-10 leading-loose max-w-lg">
                  {item.desc}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {item.list.map((listItem, idx) => (
                    <li key={idx} className="text-[10px] md:text-[11px] font-semibold tracking-[0.12em] text-white/40 uppercase">
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Visual Card — ~40% width, ~65vh height matching reference */}
            <div
              className="hidden lg:block lg:w-[40%] bg-[#1e1e1e] rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl shrink-0 relative mr-2"
              style={{ height: '42vh' }}
            >
              {item.visual}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

/* ─── Shadow Overlay Background ─────────────────────────────────────────── */
function ShadowOverlay({ color = 'rgba(27,110,140,1)', scale = 55, speed = 40 }) {
  const id = React.useId().replace(/:/g, '');
  const filterId = `shadow-${id}`;
  const feColorRef = useRef(null);
  const hueVal    = useMotionValue(180);

  // Map helpers
  const mapRange = (v, fl, fh, tl, th) => tl + ((v - fl) / (fh - fl)) * (th - tl);
  const dispScale   = mapRange(scale, 1, 100, 20, 100);
  const duration    = mapRange(speed, 1, 100, 1000, 50) / 25;
  const baseFreqX   = mapRange(scale, 0, 100, 0.001, 0.0005);
  const baseFreqY   = mapRange(scale, 0, 100, 0.004, 0.002);

  useEffect(() => {
    const ctrl = animate(hueVal, 360, {
      duration,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      onUpdate: (v) => { if (feColorRef.current) feColorRef.current.setAttribute('values', String(v)); },
    });
    return () => ctrl.stop();
  }, [duration, hueVal]);

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
      <div style={{ position:'absolute', inset:-dispScale, filter:`url(#${filterId}) blur(4px)` }}>
        <svg style={{ position:'absolute', width:0, height:0 }}>
          <defs>
            <filter id={filterId}>
              <feTurbulence result="undulation" numOctaves="2"
                baseFrequency={`${baseFreqX},${baseFreqY}`} seed="0" type="turbulence" />
              <feColorMatrix ref={feColorRef} in="undulation" type="hueRotate" values="180" />
              <feColorMatrix in="dist" result="circulation" type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0" />
              <feDisplacementMap in="SourceGraphic" in2="circulation" scale={dispScale} result="dist" />
              <feDisplacementMap in="dist" in2="undulation" scale={dispScale} result="output" />
            </filter>
          </defs>
        </svg>
        <div style={{
          backgroundColor: color,
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 75%)',
          maskSize: 'cover',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          width: '100%',
          height: '100%',
          opacity: 0.55,
        }} />
      </div>
    </div>
  );
}

/* ─── Curved Text 3D Model ──────────────────────────────────────────────── */
function CurveModel3D({ mouse }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/opt_azure_embrace.glb');

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Cursor-driven 180° sweep — same pattern as hero section
    const targetY = mouse.current[0] * (Math.PI / 2);   // ±90° on Y
    const targetX = mouse.current[1] * (Math.PI / 4);   // ±45° on X
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
    // Gentle idle float
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} scale={1.8} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* ─── Curved Text Scroll Section ───────────────────────────────────────── */
const CURVE_TEXT = "CLINICAL PRECISION. PHARMACEUTICAL EXCELLENCE. SAVINCLIFF VERIFIED. ZERO COMPROMISE. PRECISION DISPENSING. EVERY PRESCRIPTION COUNTS.";

function CurvedTextScroll() {
  const sectionRef  = useRef(null);
  const sharpRef    = useRef(null);
  const glowRef     = useRef(null);
  const svgWrapRef  = useRef(null);
  const paraRef     = useRef(null);
  const mouse       = useRef([0, 0]);  // normalised [-1,1] cursor

  // Track cursor across the section — same pattern as hero
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.current = [
        ((e.clientX - rect.left) / rect.width)  * 2 - 1,
        -(((e.clientY - rect.top)  / rect.height) * 2 - 1),
      ];
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=5000',          // long enough for both phases
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 0 — text enters from off-screen RIGHT to left-visible position
      // (when scrolling back up this reverses: text exits to the right before unpin)
      tl.fromTo(
        [sharpRef.current, glowRef.current],
        { attr: { startOffset: '150%' } },
        { attr: { startOffset: '5%' }, ease: 'none', duration: 2 }
      );

      // Phase 1 — sweep text FULLY off to the LEFT
      // -400% ensures even the last character of the long string clears the viewport
      tl.to(
        [sharpRef.current, glowRef.current],
        { attr: { startOffset: '-400%' }, ease: 'none', duration: 4 }
      );

      // Only AFTER text is completely gone — fade out SVG wrapper
      tl.to(svgWrapRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });

      // Phase 2 — fade in the paragraph block
      tl.fromTo(
        paraRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Hold paragraph visible for the remaining scroll window
      tl.to(paraRef.current, { opacity: 1, duration: 1.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* ── Shadow Overlay Background (slowed to reduce repaint conflict) ── */}
      <ShadowOverlay color="rgba(27,110,140,1)" scale={55} speed={20} />

      {/* ── 3D Model: Crystal Spiral — centered background ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ animation: 'curveModelFadeIn 2s ease forwards' }}
      >
        <style>{`
          @keyframes curveModelFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          frameloop="always"
          style={{ background: 'transparent' }}
        >
          {/* Bright ambient so dark crystal materials are visible */}
          <ambientLight intensity={2.2} color="#c8e8f0" />
          {/* Strong teal key from front-top-right */}
          <pointLight position={[3, 4, 5]} intensity={12} color="#1B6E8C" />
          {/* Blue-white fill from left */}
          <pointLight position={[-4, 0, 3]} intensity={8} color="#40a8d0" />
          {/* Warm rim from behind */}
          <pointLight position={[0, -3, -3]} intensity={5} color="#ffffff" />
          {/* Top directional for overall even illumination */}
          <directionalLight position={[0, 6, 4]} intensity={3} color="#d0f0ff" />
          <Suspense fallback={null}>
            <CurveModel3D mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial glow on top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,rgba(27,110,140,0.08)_0%,transparent_70%)] pointer-events-none z-[1]" />

      {/* Section label */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10">
        <p className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30">[ CLINICAL STATEMENT ]</p>
      </div>

      {/* ── Phase 1: SVG Curved Text ── */}
      <div ref={svgWrapRef} className="absolute inset-0 flex items-center justify-center z-[5]">
        <svg
          viewBox="0 0 1200 300"
          className="w-full"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            <path
              id="curvePath"
              d="M -400,200 Q 200,50 600,160 Q 1000,270 1600,100"
              fill="none"
            />
          </defs>

          {/* Glow layer */}
          <text style={{ fontFamily: 'Gotham, Inter, sans-serif', fontWeight: 900, fontSize: 96, letterSpacing: '0.04em', fill: '#1B6E8C', filter: 'blur(16px)', opacity: 0.4 }}>
            <textPath href="#curvePath" ref={glowRef} startOffset="5%">{CURVE_TEXT}</textPath>
          </text>

          {/* Sharp layer */}
          <text style={{ fontFamily: 'Gotham, Inter, sans-serif', fontWeight: 900, fontSize: 96, letterSpacing: '0.04em', fill: 'white' }}>
            <textPath href="#curvePath" ref={sharpRef} startOffset="5%">{CURVE_TEXT}</textPath>
          </text>
        </svg>
      </div>

      {/* ── Phase 2: Stats Paragraph ── */}
      <div
        ref={paraRef}
        className="absolute inset-0 flex items-center justify-center px-8 md:px-24 opacity-0 pointer-events-none z-[5]"
      >
        <div className="max-w-3xl text-center space-y-10">
          <p className="text-[13px] md:text-[15px] font-black tracking-[0.25em] uppercase text-white leading-loose">
            SAVINCLIFF CLIENTS HAVE ACCESSED OVER{' '}
            <span className="text-brand-teal">₦500M+</span> IN CLINICAL DISPENSING
            ACROSS A <span className="text-brand-teal">₦2B+ COMBINED PORTFOLIO</span>,
            INCLUDING <span className="text-brand-teal">12+</span> INSTITUTIONAL PARTNERSHIPS
            ACROSS ABUJA, LAGOS, AND THE PAN-AFRICAN CORRIDOR.
          </p>

          <div className="w-16 h-px bg-brand-teal mx-auto" />

          <p className="text-[13px] md:text-[15px] font-black tracking-[0.25em] uppercase text-white leading-loose">
            WE'VE SERVED INSTITUTIONS BACKED BY{' '}
            <span className="text-brand-teal">FEDERAL HEALTH MANDATES</span>{' '}
            AND PARTNERED WITH{' '}
            <span className="text-brand-teal">TOP HEALTHCARE PROVIDERS</span>{' '}
            — ENSURING EVERY PRESCRIPTION IS{' '}
            <span className="text-brand-teal">VERIFIED, SECURED</span>, AND DELIVERED
            WITH ZERO COMPROMISE.
          </p>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10">
        <p className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30">SCROLL TO CONTINUE</p>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Services() {
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">

      {/* SVZ-style dark hero with 3D model */}
      <ServicesHero />

      {/* Capabilities heading */}
      <section className="px-6 md:px-12 pt-32 pb-12 bg-black text-white">
        <div className="max-w-[1800px] mx-auto border-b border-white/10 pb-10">
          <h2 className="text-[8vw] md:text-[5vw] font-black uppercase tracking-[-0.03em] leading-[0.9]">CAPABILITIES</h2>
          <p className="text-[11px] font-bold tracking-[0.4em] text-white/40 mt-3 uppercase">CLINICAL SERVICE PORTFOLIO / 2026 EDITION</p>
        </div>
      </section>

      {/* Stacked overlapping rows */}
      <StackedCapabilities />

      {/* Curved text scroll statement */}
      <CurvedTextScroll />

      {/* Precision Logistics Highlight */}
      <section className="bg-black text-white py-40 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <h2 className="sub-display-svz mb-12">PRECISION<br />LOGISTICS</h2>
          <p className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto leading-tight tracking-tight uppercase font-medium mb-16">
            Our logistics node is a project of efficiency. Temperature-controlled transit environments, real-time clinical tracking, and total audit trails for every delivery.
          </p>
          <div className="relative aspect-video max-w-5xl mx-auto overflow-hidden bg-white/5">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
              alt="Logistics Node"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-1000"
            />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-brand-teal/5 blur-[150px] rounded-full" />
      </section>

      {/* Enterprise CTA */}
      <section className="py-40 text-center px-6 md:px-12 bg-white">
        <div className="max-w-[1800px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-teal mb-8">Wholesale &amp; Institutional</p>
          <h2 className="display-svz text-black/10 hover:text-black transition-colors duration-1000 cursor-default">
            ENTERPRISE<br />HEALTH
          </h2>
          <div className="mt-20">
            <button className="bg-black text-white px-20 py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-brand-teal transition-all duration-500">
              Initiate Partnership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Preload ───────────────────────────────────────────────────────────── */
useGLTF.preload('/models/opt_glass_wave_duo.glb');
useGLTF.preload('/models/opt_azure_embrace.glb');