import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

// Shared mouse target — updated by window listener, read every frame
const FM = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    FM.x = (e.clientX / window.innerWidth) * 2 - 1;
    FM.y = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });
}

function FooterModel({ url }) {
  const gltf = useGLTF(url);

  // Deep-clone so we own this object's matrix — not the GLTF cache
  const clonedScene = useRef(null);
  if (!clonedScene.current) {
    clonedScene.current = gltf.scene.clone(true);
    clonedScene.current.traverse((n) => {
      n.matrixAutoUpdate = true;
      n.frustumCulled = false;
    });
  }

  const meshRef = useRef();
  const s = useRef({ rx: 0, ry: 0, px: 0, py: 0 });

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const ease = 1 - Math.exp(-delta * 14);

    // Strong tilt — matches the hero feel
    s.current.rx += (FM.y * -1.0 - s.current.rx) * ease;
    s.current.ry += (FM.x *  1.4 - s.current.ry) * ease;

    // Subtle position drift
    s.current.px += (FM.x * 0.35 - s.current.px) * ease;
    s.current.py += (FM.y * 0.25 - s.current.py) * ease;

    meshRef.current.rotation.x = s.current.rx;
    meshRef.current.rotation.y = s.current.ry;
    meshRef.current.position.x = s.current.px;
    meshRef.current.position.y = s.current.py + Math.sin(clock.elapsedTime * 0.6) * 0.1;
  });

  return <primitive ref={meshRef} object={clonedScene.current} dispose={null} scale={0.8} />;
}

export default function Footer() {
  const triggerRef = useRef(null);
  const footerLinks = [
    { 
      title: 'AGENCY', 
      links: [
        { name: 'CAPABILITIES', path: '/services' },
        { name: 'ENTERPRISE', path: '/wholesale' }
      ] 
    },
    { 
      title: 'WORK', 
      links: [
        { name: 'PROJECTS', path: '/products' },
        { name: 'FAQs', path: '/contact' }
      ] 
    },
    { 
      title: 'CULTURE', 
      links: [
        { name: 'ABOUT', path: '/about' },
        { name: 'SHOP', path: '/shop' }
      ] 
    },
    { 
      title: 'INSIGHTS', 
      links: [
        { name: 'BLOG POSTS', path: '/compliance' },
        { name: 'CLIENT\'S INVESTORS', path: '/wholesale' }
      ] 
    },
    { 
      title: 'SOCIALS', 
      links: [
        { name: 'IG', path: '#' },
        { name: 'LINKEDIN', path: '#' }
      ] 
    }
  ];

  return (
    <footer ref={triggerRef} className="footer_ix-trigger bg-black text-white relative overflow-hidden">
      
      {/* 3D Visual Section */}
      <section className="mwg_effect002 min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden">
        
        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="opacity-50 text-[10px] md:text-[12px] font-black tracking-[0.5em] mb-12 uppercase">SVZ AGENCY - EST. MMXIII</div>
            
            <div className="mb-20">
                <div className="text-[5vw] md:text-[2.5vw] font-bold text-white/40 uppercase leading-none mb-4 tracking-tighter">humans</div>
                <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-[-0.05em] uppercase mb-4">Bridging The Gap</h1>
                <div className="text-[5vw] md:text-[2.5vw] font-bold text-white/40 uppercase leading-none mb-6 tracking-tighter">between</div>
                <h1 className="text-[10vw] md:text-[7vw] font-black leading-[0.8] tracking-[-0.05em] uppercase">Technology and Artistry</h1>
            </div>

            <Link 
                to="/contact" 
                className="group relative inline-flex items-center justify-center px-16 py-7 border border-white/20 overflow-hidden transition-all duration-700 hover:border-white/40"
            >
                <span className="relative z-10 text-[13px] font-black tracking-[0.3em] uppercase group-hover:text-black transition-colors duration-700">DISCOVERY CALL</span>
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
                                    className="text-[12px] font-black tracking-[0.2em] uppercase hover:text-brand-teal transition-all duration-500 hover:translate-x-2"
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
                    <p className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">© 2012-2025 SVZ. All rights reserved.</p>
                    <p className="text-[8px] font-bold tracking-[0.2em] text-white/5 uppercase">SYNCHRONIZED AT NODE 04 / 23:59:59</p>
                </div>
                <div className="flex gap-12">
                    <Link to="/privacy" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase hover:text-white transition-colors">Service Protocol</Link>
                </div>
            </div>
        </div>

        {/* 3D Model Layer (Background) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas 
            shadows 
            dpr={[1, 1.2]} 
            performance={{ min: 0.5 }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                        <Suspense fallback={null}>
                <FooterModel url="/models/savincliff_pill.glb" />
                <Environment preset="warehouse" />
              </Suspense>
          </Canvas>
        </div>

        {/* Dynamic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] pointer-events-none z-[5] opacity-60" />
      </section>

      {/* WhatsApp FAB with Dribbble Animation */}
      <a 
        href="https://wa.me/923251206427"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[90] flex items-center gap-4 group"
      >
        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center overflow-hidden hover:bg-brand-teal transition-all duration-700 shadow-2xl relative border border-white/10">
           <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
           >
              <source src="/animations/whatsapp_1.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="absolute inset-0 border-2 border-white/20 rounded-full group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
        </div>
      </a>
    </footer>
  );
}