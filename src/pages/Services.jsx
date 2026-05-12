import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
const CAPABILITIES_DATA = [
  {
    id: '[01]',
    title: 'STRATEGY',
    desc: 'WE ALIGN ON THE VISION SO EVERY STEP FORWARD IS A STEP WITH PURPOSE.',
    list: ['Web Competitor Analysis', 'Persona Posters', 'User Flows', 'User Journey', 'Sitemap'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col gap-3 transform -rotate-12">
          <div className="w-24 h-8 bg-[#FF2A2A] rounded-sm" />
          <div className="w-20 h-8 bg-[#FF2A2A] rounded-sm" />
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
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="w-28 h-14 bg-[#FF2A2A] rounded-t-full" />
      </div>
    )
  },
  {
    id: '[03]',
    title: 'DESIGN',
    desc: 'WE CRAFT BEAUTY WITH INTENTION, WHERE FORM AND FUNCTION MEET IN PERFECT BALANCE.',
    list: [
      'Analyze & absorb strategy', 'UI/uX design', 'Moodboard & Brainstorm',
      'Wireframes & Content Mapping', 'Design systems & ui kits', 'Animations & Interactions',
      'Illustrations & graphic design', 'high-fidelity website design',
      'Experiential design & Motion design', 'product design', '3D Design',
      'Usability Testing', 'AI assets generator engine'
    ],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute top-0 w-32 h-14 bg-black rounded-t-full" />
          <div className="absolute bottom-0 w-32 h-14 bg-black rounded-b-full" />
          <div className="w-10 h-10 bg-[#FF2A2A] rounded-full z-10" />
        </div>
      </div>
    )
  },
  {
    id: '[04]',
    title: 'DEVELOPMENT',
    desc: 'WE BRING DESIGN TO LIFE WITH CODE THAT’S CLEAN, FAST, AND BUILT TO SCALE.',
    list: [
      'Webflow Development', 'Custom Development', 'front-end optimization',
      'Accessibility optimization', 'web app development', 'AI Development & Integrations',
      'Data migration & mapping'
    ],
    visual: (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-4 h-4 bg-[#FF2A2A] rounded-full" />
        <div className="w-20 h-10 border-t-8 border-l-8 border-r-8 border-black rounded-t-full relative">
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white rounded-full" />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-white rounded-full" />
        </div>
      </div>
    )
  },
  {
    id: '[05]',
    title: 'PRODUCTION',
    desc: 'WE CREATE THE FOUNDATION FOR YOUR NEXT BIG IDEA.',
    list: [
      'Creative Identity Workshop', 'Define Vision & Creative Focus',
      'Pre-Production Briefing', 'Talent & Set Scouting', 'Campaign Execution',
      'Post-Production'
    ],
    visual: (
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[80px] border-b-[#c28484]" />
      </div>
    )
  },
  {
    id: '[06]',
    title: 'GROWTH',
    desc: 'WE AMPLIFY WHAT’S WORKING AND OPEN THE DOORS TO WHAT’S NEXT.',
    list: ['seo & SEM Strategy', 'custom dashboard reporting', 'process & workflow automation', 'Ai consulting'],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-[#FF2A2A] to-[#4a2020] rounded-lg transform rotate-45" />
      </div>
    )
  },
  {
    id: '[07]',
    title: 'Ai ecosystems',
    desc: 'WE ENGINEER SMART INFRASTRUCTURES THAT DO THE WORK — SO YOU CAN FOCUS ON VISION.',
    list: [
      'Prompt Engineering & Workflow Design', 'Custom LLM Agent Development',
      'AI Strategy & Automation Consulting', 'Data Integration & Fine-Tuning',
      'No-Code AI Tools & Prototypes', 'Voice & Chat Interface Design',
      'AI + Webflow Integration', 'AI-Driven Personalization Systems',
      'Model Selection & Deployment Strategy'
    ],
    visual: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 w-20 h-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`w-full h-full rounded-xs ${i === 4 ? 'bg-[#FF2A2A]' : 'bg-white/10'}`} />
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
      rows.forEach((row, i) => {
        if (i === 0) {
          gsap.set(row, { y: 0, zIndex: 1 });
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

      // Animate each subsequent row sliding up to lock underneath the previous row's header tab
      rows.forEach((row, i) => {
        if (i === 0) return;
        const targetY = i * 64; // Staggered top offset interval exposing exactly the title strip

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
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden select-none">
      {CAPABILITIES_DATA.map((item, index) => (
        <div
          key={item.id}
          className="capability-row absolute left-0 top-0 w-full h-full bg-black pt-6 border-t border-white/10 flex flex-col justify-start"
        >
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 max-w-[1800px] mx-auto px-6 md:px-12">
            {/* Left Column: Heading + Content */}
            <div className="w-full lg:w-7/12 flex flex-col">
              {/* Title Block — optimized to occupy exactly the exposed 64px header space */}
              <div className="flex items-baseline gap-3 h-[40px] mb-4">
                <span className="text-[11px] font-black text-[#FF2A2A]">{item.id}</span>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white">{item.title}</h3>
              </div>

              {/* Content Area */}
              <div className="pr-0 lg:pr-12">
                <p className="text-[11px] md:text-[13px] font-bold tracking-[0.15em] text-white uppercase mb-8 leading-relaxed max-w-xl">
                  {item.desc}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {item.list.map((listItem, idx) => (
                    <li key={idx} className="text-[10px] md:text-[11px] font-semibold tracking-[0.1em] text-white/50 uppercase">
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Visual Card Placeholder */}
            <div className="w-full lg:w-5/12 h-[280px] md:h-[360px] bg-[#262626] rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl shrink-0 relative mt-4 lg:mt-0">
              {item.visual}
            </div>
          </div>
        </div>
      ))}
    </div>
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