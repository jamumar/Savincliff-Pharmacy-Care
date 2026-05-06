import * as THREE from 'three';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const DEBUG_3D_INTERACTION = false;

function clampPointer(value) {
  return THREE.MathUtils.clamp(value, -1, 1);
}

function debugLog(...args) {
  if (DEBUG_3D_INTERACTION) {
    console.log('[Interactive3DModelHero]', ...args);
  }
}

function ScenePointerTracker({ pointer, pointerTarget, debugRef }) {
  useFrame((_, delta) => {
    const ease = 1 - Math.exp(-delta * 24);
    pointer.current.x += (pointerTarget.current.x - pointer.current.x) * ease;
    pointer.current.y += (pointerTarget.current.y - pointer.current.y) * ease;

    debugRef.current.pointerX = pointer.current.x;
    debugRef.current.pointerY = pointer.current.y;
  });

  return null;
}

// ─── Camera Rig ───────────────────────────────────────────────────────────────
// Subtly shifts camera position so the whole scene has parallax depth.
function CameraRig({ pointer }) {
  const cameraTarget = useRef(new THREE.Vector3());

  useFrame(({ camera }, delta) => {
    const p = pointer.current;
    const ease = 1 - Math.exp(-delta * 8);

    cameraTarget.current.set(p.x * 1.35, p.y * 0.85, 5.6 + Math.abs(p.x) * 0.35);
    camera.position.lerp(cameraTarget.current, ease);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Pill Model ───────────────────────────────────────────────────────────────
// KEY FIX: clone the scene so we own a private copy.
// useGLTF caches gltf.scene — if we use it directly, the GLTF loader's matrix
// system keeps overwriting our rotation/position. A deep clone is fully ours.
function PillModel({ pointer, debugRef, url }) {
  const gltf = useGLTF(url);

  // Create a private deep clone once per mount
  const clonedScene = useRef(null);
  if (!clonedScene.current) {
    clonedScene.current = gltf.scene.clone(true);
    // Ensure every node in our clone will auto-update its matrix each frame
    clonedScene.current.traverse((node) => {
      node.matrixAutoUpdate = true;
      node.frustumCulled = false;
    });
  }

  // groupRef points directly at our cloned scene root — no wrapper needed
  const groupRef = useRef();

  // Smoothed values — all start at rest
  const s = useRef({ rx: 0, ry: 0, rz: 0, px: 0, py: 0, scale: 1.3 });

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const p = pointer.current;
    // Exponential ease — frame-rate independent
    const ease = 1 - Math.exp(-delta * 16);

    // ── Rotation: main effect — model tilts strongly with cursor ──
    s.current.rx += (p.y * -1.1 - s.current.rx) * ease;
    s.current.ry += (p.x *  1.6 - s.current.ry) * ease;
    s.current.rz += (p.x * -0.3 - s.current.rz) * ease;

    // ── Position: subtle parallax only — stays centered ──
    s.current.px += (p.x * 0.4 - s.current.px) * ease;
    s.current.py += (p.y * 0.3 - s.current.py) * ease;

    // ── Scale: tiny breath on tilt ──
    s.current.scale += (1.3 + Math.abs(p.x) * 0.05 - s.current.scale) * ease;

    // Apply to the cloned scene root
    groupRef.current.rotation.x = s.current.rx;
    groupRef.current.rotation.y = s.current.ry;
    groupRef.current.rotation.z = s.current.rz;
    groupRef.current.position.x = s.current.px;
    groupRef.current.position.y = s.current.py + Math.sin(clock.elapsedTime * 0.7) * 0.12;
    groupRef.current.scale.setScalar(s.current.scale);

    if (debugRef) {
      debugRef.current.modelX = groupRef.current.position.x;
      debugRef.current.modelY = groupRef.current.position.y;
      debugRef.current.rotationX = s.current.rx;
      debugRef.current.rotationY = s.current.ry;
      debugRef.current.rotationZ = s.current.rz;
    }
  });

  return <primitive ref={groupRef} object={clonedScene.current} dispose={null} />;
}

function PointerDebugObject({ pointer }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.x = pointer.current.x * 3;
    ref.current.position.y = pointer.current.y * 2;
    ref.current.rotation.x = clock.elapsedTime * 1.5;
    ref.current.rotation.y = clock.elapsedTime * 2.1;
  });

  return (
    <mesh ref={ref} position={[0, 0, 2.2]} renderOrder={50}>
      <boxGeometry args={[0.35, 0.35, 0.35]} />
      <meshBasicMaterial color="#22d3ee" depthTest={false} />
    </mesh>
  );
}

// ─── Cursor-driven point light ────────────────────────────────────────────────
function CursorLight({ pointer }) {
  const ref = useRef();
  const p = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = pointer.current;
    const ease = 1 - Math.exp(-delta * 7);

    p.current.x += (target.x * 4.5 - p.current.x) * ease;
    p.current.y += (target.y * 3.2 - p.current.y) * ease;
    ref.current.position.x = p.current.x;
    ref.current.position.y = p.current.y;
  });

  return <pointLight ref={ref} position={[0, 0, 4]} intensity={4} color="#1B6E8C" />;
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Interactive3DModelHero() {
  const pointer = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const debugRef = useRef({
    sectionEvents: 0,
    hitPlaneEvents: 0,
    sectionX: 0,
    sectionY: 0,
    hitPlaneX: 0,
    hitPlaneY: 0,
    pointerX: 0,
    pointerY: 0,
    modelX: 0,
    modelY: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  });
  const debugPanelRef = useRef(null);
  const lastSectionLog = useRef(0);

  const updatePointerFromClient = (clientX, clientY, source) => {
    const x = clampPointer(((clientX / window.innerWidth) * 2 - 1) * 1.75);
    const y = clampPointer((-((clientY / window.innerHeight) * 2 - 1)) * 1.75);

    pointerTarget.current.x = x;
    pointerTarget.current.y = y;
    debugRef.current.sectionEvents += 1;
    debugRef.current.sectionX = x;
    debugRef.current.sectionY = y;
    debugRef.current.hitPlaneX = x;
    debugRef.current.hitPlaneY = y;

    const now = performance.now();
    if (now - lastSectionLog.current > 300) {
      debugLog(`${source} pointer`, {
        x: Number(x.toFixed(3)),
        y: Number(y.toFixed(3)),
        eventCount: debugRef.current.sectionEvents,
      });
      lastSectionLog.current = now;
    }
  };

  useEffect(() => {
    const handlePointerMove = (event) => updatePointerFromClient(event.clientX, event.clientY, 'window');

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <section
      className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center border-t border-white/5"
      onPointerMove={(event) => updatePointerFromClient(event.clientX, event.clientY, 'section')}
      onMouseMove={(event) => updatePointerFromClient(event.clientX, event.clientY, 'section mouse')}
    >

      {/* ── 3D Canvas ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 6], fov: 45 }}
        >
          <ScenePointerTracker pointer={pointer} pointerTarget={pointerTarget} debugRef={debugRef} />
          <CameraRig pointer={pointer} />
          {DEBUG_3D_INTERACTION && <PointerDebugObject pointer={pointer} />}

          {/* Lighting */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, 5]} intensity={0.4} />
          <CursorLight pointer={pointer} />

          {/* Model */}
          <Suspense fallback={null}>
            <PillModel pointer={pointer} debugRef={debugRef} url="/models/savincliff_pill.glb" />
            <Environment preset="warehouse" />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Text Overlay ── */}
      <div className="relative z-10 w-full max-w-[1600px] px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 md:space-y-10"
        >
          <h2 className="text-white text-[10vw] md:text-[8.5vw] font-black uppercase tracking-[-0.04em] leading-[0.85]">
            BRIDGING THE GAP
          </h2>

          <div className="flex flex-col items-center gap-4">
            <span className="text-white/40 text-[12px] md:text-[16px] font-black tracking-[0.6em] uppercase">
              BETWEEN
            </span>

            <h2 className="text-white text-[10vw] md:text-[8.5vw] font-black uppercase tracking-[-0.04em] leading-[0.85]">
              TECHNOLOGY AND ARTISTRY
            </h2>
          </div>

          <div className="pt-16 pointer-events-auto">
            <Link
              to="/register"
              className="group relative inline-flex items-center gap-6 border border-white/20 px-12 md:px-20 py-6 md:py-10 hover:bg-white hover:text-black transition-all duration-700"
            >
              <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.4em]">
                Discovery Call
              </span>
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Vignette Overlay ── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />

      {DEBUG_3D_INTERACTION && (
        <DebugPanel debugRef={debugRef} panelRef={debugPanelRef} />
      )}
    </section>
  );
}

function DebugPanel({ debugRef, panelRef }) {
  useFrameDebugReadout(debugRef, panelRef);

  return (
    <pre
      ref={panelRef}
      className="pointer-events-none absolute bottom-4 left-4 z-30 max-w-[calc(100%-2rem)] whitespace-pre-wrap rounded border border-white/15 bg-black/75 p-3 font-mono text-[10px] leading-relaxed text-brand-teal"
    />
  );
}

function useFrameDebugReadout(debugRef, panelRef) {
  const frame = useRef(0);

  React.useEffect(() => {
    let rafId;

    const tick = () => {
      frame.current += 1;
      if (panelRef.current && frame.current % 10 === 0) {
        const d = debugRef.current;
        panelRef.current.textContent = [
          '3D DEBUG',
          `section events: ${d.sectionEvents}`,
          `hit plane events: ${d.hitPlaneEvents}`,
          `section: ${d.sectionX.toFixed(3)}, ${d.sectionY.toFixed(3)}`,
          `target: ${d.hitPlaneX.toFixed(3)}, ${d.hitPlaneY.toFixed(3)}`,
          `pointer: ${d.pointerX.toFixed(3)}, ${d.pointerY.toFixed(3)}`,
          `model pos: ${d.modelX.toFixed(3)}, ${d.modelY.toFixed(3)}`,
          `model rot: ${d.rotationX.toFixed(3)}, ${d.rotationY.toFixed(3)}, ${d.rotationZ.toFixed(3)}`,
        ].join('\n');
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [debugRef, panelRef]);
}

useGLTF.preload('/models/savincliff_pill.glb');
