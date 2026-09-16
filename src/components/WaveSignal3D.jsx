import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// ── Realistic Access Point Transmitter ────────────────────────────
function APTransmitter({ color }) {
  const ref = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.006;
    }
    if (ringRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.04;
      ringRef.current.scale.set(pulse, pulse, pulse);
      ringRef.current.rotation.z += 0.008;
    }
  });

  return (
    <group>
      {/* AP body */}
      <group ref={ref}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.07, 0.42]} />
          <meshStandardMaterial color="#d8e0e8" roughness={0.28} metalness={0.6} />
        </mesh>
        {/* LED */}
        <mesh position={[0, 0.038, 0.16]}>
          <boxGeometry args={[0.18, 0.006, 0.008]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
        {/* Internal antenna ridges */}
        {[-0.2, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.04, 0]}>
            <boxGeometry args={[0.018, 0.014, 0.4]} />
            <meshStandardMaterial color="#c0c8d0" roughness={0.4} metalness={0.5} />
          </mesh>
        ))}
        {/* Mount */}
        <mesh position={[0, -0.062, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.028, 18]} />
          <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>

      {/* Orbital signal rings */}
      {[0.5, 0.7, 0.9].map((r, i) => (
        <mesh key={i} ref={i === 0 ? ringRef : undefined} rotation={[Math.PI / 2, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.012, 8, 40]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.35 - i * 0.08} />
        </mesh>
      ))}

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// ── Signal Wave Ring (expanding) ───────────────────────────────────
function WaveRing({ delay = 0, color = '#3b82f6', maxRadius = 4.5, speed = 0.55, tilt = 0 }) {
  const ref = useRef();
  const progress = useRef(delay);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current = (progress.current + delta * speed) % 1;
    const r = progress.current * maxRadius;
    ref.current.scale.set(r, r, r);
    ref.current.material.opacity = Math.max(0, (1 - progress.current) * 0.5);
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[1, 0.018, 8, 72]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} transparent opacity={0.45} />
    </mesh>
  );
}

// ── Obstacle (realistic wall/building slab) ────────────────────────
function ObstacleWall({ position, size = [0.12, 1.2, 0.8], label }) {
  return (
    <group position={position}>
      {/* Wall body */}
      <mesh castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#475569" roughness={0.7} metalness={0.2} transparent opacity={0.82} />
      </mesh>
      {/* Brick texture lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[0, -size[1] / 2 + (i + 1) * size[1] / 5, 0]}>
          <boxGeometry args={[size[0] + 0.005, 0.008, size[2] + 0.005]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
      ))}
      {/* Mortar vertical lines */}
      {[-size[2] / 4, size[2] / 4].map((z, i) => (
        <mesh key={i} position={[0, 0, z]}>
          <boxGeometry args={[size[0] + 0.005, size[1], 0.008]} />
          <meshStandardMaterial color="#334155" roughness={0.8} transparent opacity={0.5} />
        </mesh>
      ))}
      {label && (
        <Html position={[0, size[1] / 2 + 0.18, 0]} center distanceFactor={7}>
          <div className="pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-600/40 backdrop-blur-sm">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Receiver device (small AP/CPE) ────────────────────────────────
function ReceiverDevice({ position, color, signalStrength = 1, label }) {
  const ref = useRef();
  const glowRef = useRef();
  const initPos = useMemo(() => [...position], [position]);

  useFrame((state) => {
    if (ref.current) {
      const bob = Math.sin(state.clock.elapsedTime * 1.4 + initPos[0]) * 0.04;
      ref.current.position.y = initPos[1] + bob;
    }
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 0.7 + Math.sin(state.clock.elapsedTime * 2.5) * 0.4 * signalStrength;
    }
  });

  const alpha = 0.4 + signalStrength * 0.6;

  return (
    <group ref={ref} position={position}>
      {/* CPE/AP body */}
      <mesh castShadow>
        <boxGeometry args={[0.24, 0.08, 0.18]} />
        <meshStandardMaterial color="#c8d0d8" roughness={0.28} metalness={0.65} transparent opacity={alpha} />
      </mesh>
      {/* Antenna stub */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.014, 0.018, 0.2, 10]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.35} metalness={0.6} transparent opacity={alpha} />
      </mesh>
      {/* Signal LED */}
      <mesh ref={glowRef} position={[0, 0.044, 0.075]}>
        <boxGeometry args={[0.06, 0.01, 0.006]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      {/* Signal bars under device */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.07, -0.065 - i * 0.025, 0]}>
          <boxGeometry args={[0.038, 0.02 + i * 0.03, 0.038]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={i / 2 <= signalStrength ? 0.9 : 0.1}
            transparent
            opacity={i / 2 <= signalStrength ? 0.9 : 0.25}
          />
        </mesh>
      ))}
      {/* Label */}
      <Html position={[0, 0.28, 0]} center distanceFactor={7}>
        <div className="pointer-events-none whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm border"
          style={{ background: 'rgba(15,23,42,0.72)', color, borderColor: color }}>
          {label} · {Math.round(signalStrength * 100)}%
        </div>
      </Html>
    </group>
  );
}

// ── Beam line ─────────────────────────────────────────────────────
function SignalBeam({ from, to, color, opacity = 0.32 }) {
  const pts = useMemo(() => [new THREE.Vector3(...from), new THREE.Vector3(...to)], [from, to]);
  return <Line points={pts} color={color} lineWidth={0.9} transparent opacity={opacity} />;
}

// ── Mode scenes ────────────────────────────────────────────────────
function PropagationScene({ mode }) {
  const configs = {
    freespace: {
      color: '#3b82f6',
      rings: 5,
      ringTilt: 0,
      receivers: [
        { pos: [2.2, 0.1, 0],    strength: 0.96, color: '#22c55e', label: 'Dekat (−35 dB)' },
        { pos: [3.4, 0.1, 0.4],  strength: 0.65, color: '#f59e0b', label: 'Sedang (−56 dB)' },
        { pos: [4.6, 0.1, -0.5], strength: 0.28, color: '#ef4444', label: 'Jauh (−76 dB)' },
      ],
      obstacles: [],
    },
    multipath: {
      color: '#8b5cf6',
      rings: 4,
      ringTilt: 0.15,
      receivers: [
        { pos: [2.8, 0.3, 1.2],  strength: 0.75, color: '#22c55e', label: 'Pantulan 1' },
        { pos: [3.6, -0.3, -1.4], strength: 0.48, color: '#f59e0b', label: 'Pantulan 2' },
      ],
      obstacles: [
        { pos: [1.6, 0.1, 0.5], size: [0.12, 1.4, 0.85], label: 'Tembok A' },
        { pos: [2.9, 0.2, -0.5], size: [0.12, 1.1, 0.7], label: 'Tembok B' },
      ],
    },
    shadowing: {
      color: '#f59e0b',
      rings: 4,
      ringTilt: 0,
      receivers: [
        { pos: [2.2, 0.1, -0.6], strength: 0.88, color: '#22c55e', label: 'Tidak Terhalang' },
        { pos: [3.8, 0.1, 0.7],  strength: 0.14, color: '#ef4444', label: 'Terhalang Penuh' },
      ],
      obstacles: [
        { pos: [2.6, 0.2, 0.3], size: [0.28, 1.6, 1.6], label: 'Gedung' },
      ],
    },
  };

  const cfg = configs[mode] || configs.freespace;

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 7, 4]} intensity={1.3} castShadow />
      <pointLight position={[0, 5, 5]} intensity={1.3} color="#a5b4fc" />
      <pointLight position={[0, -3, -3]} intensity={0.8} color={cfg.color} />
      <Environment preset="night" environmentIntensity={0.55} />
      <gridHelper args={[12, 26, '#1e293b', '#1e293b']} position={[0, -1.25, 0]} />
      <ContactShadows position={[0, -1.24, 0]} opacity={0.55} scale={14} blur={2.6} far={2.2} />

      {/* Expanding wave rings */}
      {Array.from({ length: cfg.rings }).map((_, i) => (
        <WaveRing key={i} delay={i / cfg.rings} color={cfg.color} maxRadius={5.5} speed={0.52} tilt={cfg.ringTilt} />
      ))}

      {/* Transmitter AP */}
      <APTransmitter color={cfg.color} />

      {/* Obstacles */}
      {cfg.obstacles.map((obs, i) => (
        <ObstacleWall key={i} position={obs.pos} size={obs.size} label={obs.label} />
      ))}

      {/* Signal beams */}
      {cfg.receivers.map((r, i) => (
        <SignalBeam key={i} from={[0, 0.1, 0]} to={r.pos} color={r.color} opacity={r.strength * 0.4} />
      ))}

      {/* Receiver devices */}
      {cfg.receivers.map((r, i) => (
        <ReceiverDevice key={i} position={r.pos} color={r.color} signalStrength={r.strength} label={r.label} />
      ))}

      <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.72} minPolarAngle={Math.PI * 0.24}
        minDistance={3} maxDistance={14} zoomSpeed={0.8} />
    </>
  );
}

// ── Public export ──────────────────────────────────────────────────
export default function WaveSignal3D({ height = '360px' }) {
  const [mode, setMode] = useState('freespace');

  const modes = [
    { id: 'freespace', label: 'Free Space',  desc: 'Propagasi ideal', color: 'blue' },
    { id: 'multipath', label: 'Multipath',   desc: 'Pantulan dinding', color: 'violet' },
    { id: 'shadowing', label: 'Shadowing',   desc: 'Efek penghalang', color: 'amber' },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {modes.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-full font-semibold text-sm border-2 transition-all ${
              mode === m.id
                ? m.color === 'blue'   ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                : m.color === 'violet' ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/30'
                :                        'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-400/30'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
            }`}>
            {m.label}
            <span className="ml-1.5 text-xs font-normal opacity-70 hidden sm:inline">— {m.desc}</span>
          </button>
        ))}
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl" style={{ height }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 3, 6], fov: 50 }} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <PropagationScene mode={mode} />
          </Suspense>
        </Canvas>

        <div className="absolute top-3 left-4 pointer-events-none">
          <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Signal Propagation 3D</div>
          <div className="text-sm font-bold text-white">
            {mode === 'freespace' && 'Free Space Path Loss'}
            {mode === 'multipath' && 'Multipath Fading'}
            {mode === 'shadowing' && 'Shadowing / Obstacle Loss'}
          </div>
        </div>

        <div className="absolute bottom-3 right-4 flex flex-col gap-1 pointer-events-none">
          {[
            { color: '#22c55e', label: 'Sinyal Kuat' },
            { color: '#f59e0b', label: 'Sinyal Sedang' },
            { color: '#ef4444', label: 'Sinyal Lemah' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
              <span className="text-[10px] text-slate-400 font-mono">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        Drag untuk rotasi · Scroll untuk zoom · Pilih mode untuk melihat fenomena propagasi sinyal nirkabel
      </div>
    </div>
  );
}