import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Expanding Wave Ring ───────────────────────────────────────
function WaveRing({ delay = 0, color = '#3b82f6', maxRadius = 4, speed = 0.6 }) {
  const ref = useRef();
  const progress = useRef(delay);

  useFrame((_, delta) => {
    if (ref.current) {
      progress.current = (progress.current + delta * speed) % 1;
      const r = progress.current * maxRadius;
      ref.current.scale.set(r, r, r);
      ref.current.material.opacity = (1 - progress.current) * 0.55;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1, 0.022, 8, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

// ─── Central Transmitter ───────────────────────────────────────
function Transmitter({ color = '#3b82f6' }) {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.015;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.3, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          roughness={0.1}
          metalness={0.85}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.52, 0.025, 8, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// ─── Receiver Node ─────────────────────────────────────────────
function ReceiverNode({ position, color, signalStrength = 1, label }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const initPos = useMemo(() => [...position], [position]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.008;
      const bob = Math.sin(state.clock.elapsedTime * 1.5 + initPos[0]) * 0.05;
      ref.current.position.set(initPos[0], initPos[1] + bob, initPos[2]);
    }
  });

  const size = 0.12 + signalStrength * 0.08;

  return (
    <group>
      <mesh
        ref={ref}
        position={position}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.5 * signalStrength}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[position[0] + (i - 1) * 0.07, position[1] - size - 0.07 - i * 0.06, position[2]]}>
          <boxGeometry args={[0.04, 0.04 + i * 0.04, 0.04]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={i / 3 <= signalStrength ? 0.9 : 0.1}
            transparent
            opacity={i / 3 <= signalStrength ? 0.9 : 0.3}
          />
        </mesh>
      ))}
      <Html position={[position[0], position[1] + size + 0.28, position[2]]} center distanceFactor={7} occlude sprite>
        <div
          className="pointer-events-none whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm border"
          style={{ background: 'rgba(15,23,42,0.7)', color, borderColor: color }}
        >
          {label ? `${label} · ` : ''}{Math.round(signalStrength * 100)}%
        </div>
      </Html>
    </group>
  );
}

// ─── Obstacle Block ────────────────────────────────────────────
function Obstacle({ position, color = '#64748b', size = [0.15, 0.8, 0.6] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} transparent opacity={0.75} />
    </mesh>
  );
}

// ─── Signal Beam ───────────────────────────────────────────────
function SignalBeam({ from, to, color, opacity = 0.3 }) {
  const points = useMemo(() => [new THREE.Vector3(...from), new THREE.Vector3(...to)], [from, to]);
  return <Line points={points} color={color} lineWidth={0.8} transparent opacity={opacity} />;
}

// ─── Mode Scene ────────────────────────────────────────────────
function PropagationScene({ mode }) {
  const configs = {
    freespace: {
      color: '#3b82f6',
      rings: 5,
      receivers: [
        { pos: [2.0, 0, 0], strength: 0.95, color: '#10b981', label: 'Dekat' },
        { pos: [3.2, 0, 0.5], strength: 0.7, color: '#f59e0b', label: 'Sedang' },
        { pos: [4.0, 0, -0.8], strength: 0.4, color: '#ef4444', label: 'Jauh' },
      ],
      obstacles: [],
    },
    multipath: {
      color: '#8b5cf6',
      rings: 4,
      receivers: [
        { pos: [2.5, 0.3, 1.0], strength: 0.8, color: '#10b981', label: 'Pantulan 1' },
        { pos: [3.5, -0.4, -1.2], strength: 0.55, color: '#f59e0b', label: 'Pantulan 2' },
      ],
      obstacles: [
        { pos: [1.5, 0, 0.5], color: '#334155', size: [0.15, 1.2, 0.8] },
        { pos: [2.8, 0.2, -0.5], color: '#334155', size: [0.15, 0.9, 0.6] },
      ],
    },
    shadowing: {
      color: '#f59e0b',
      rings: 4,
      receivers: [
        { pos: [2.2, 0, -0.5], strength: 0.9, color: '#10b981', label: 'Ada Halangan' },
        { pos: [3.5, 0, 0.8], strength: 0.2, color: '#ef4444', label: 'Terhalang Penuh' },
      ],
      obstacles: [
        { pos: [2.2, 0, 0.4], color: '#1e293b', size: [0.3, 1.5, 1.5] },
      ],
    },
  };

  const cfg = configs[mode] || configs.freespace;

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 3]} intensity={1} color="#ffffff" castShadow />
      <pointLight position={[0, 5, 5]} intensity={1.5} color="#a5b4fc" />
      <pointLight position={[0, -3, -3]} intensity={0.9} color={cfg.color} />
      <Environment preset="night" environmentIntensity={0.6} />
      <Stars radius={25} depth={8} count={200} factor={2} saturation={0} fade speed={0.4} />
      <gridHelper args={[10, 24, '#1e293b', '#1e293b']} position={[0, -1.2, 0]} />
      <ContactShadows position={[0, -1.19, 0]} opacity={0.5} scale={12} blur={2.4} far={2} color="#000000" />

      {Array.from({ length: cfg.rings }).map((_, i) => (
        <WaveRing key={i} delay={i / cfg.rings} color={cfg.color} maxRadius={5} speed={0.5} />
      ))}

      <Transmitter color={cfg.color} />

      {cfg.obstacles.map((obs, i) => (
        <Obstacle key={i} position={obs.pos} color={obs.color} size={obs.size} />
      ))}

      {cfg.receivers.map((r, i) => (
        <SignalBeam key={i} from={[0, 0, 0]} to={r.pos} color={r.color} opacity={r.strength * 0.45} />
      ))}

      {cfg.receivers.map((r, i) => (
        <ReceiverNode key={i} position={r.pos} color={r.color} signalStrength={r.strength} label={r.label} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.25}
      />
    </>
  );
}

// ─── Public Export ─────────────────────────────────────────────
export default function WaveSignal3D({ height = '340px' }) {
  const [mode, setMode] = useState('freespace');

  const modes = [
    { id: 'freespace', label: 'Free Space', desc: 'Propagasi ideal tanpa halangan', color: 'blue' },
    { id: 'multipath', label: 'Multipath', desc: 'Pantulan dari dinding & objek', color: 'violet' },
    { id: 'shadowing', label: 'Shadowing', desc: 'Penghalang melemahkan sinyal', color: 'amber' },
  ];

  const colorMap = {
    blue: 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30',
    violet: 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/30',
    amber: 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-400/30',
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-full font-semibold text-sm border-2 transition-all ${
              mode === m.id
                ? colorMap[m.color]
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
            }`}
          >
            {m.label}
            <span className="ml-1.5 text-xs font-normal opacity-75 hidden sm:inline">— {m.desc}</span>
          </button>
        ))}
      </div>

      <div
        className="w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl relative"
        style={{ height }}
      >
        <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 3, 5], fov: 52 }} gl={{ antialias: true }}>
          <PropagationScene mode={mode} />
        </Canvas>

        <div className="absolute top-3 left-4 text-white pointer-events-none">
          <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Signal Propagation 3D</div>
          <div className="text-sm font-bold">
            {mode === 'freespace' && 'Free Space Path Loss'}
            {mode === 'multipath' && 'Multipath Fading'}
            {mode === 'shadowing' && 'Shadowing / Obstacle Loss'}
          </div>
        </div>

        <div className="absolute bottom-3 right-4 flex flex-col gap-1 pointer-events-none">
          {[
            { color: '#10b981', label: 'Sinyal Kuat' },
            { color: '#f59e0b', label: 'Sinyal Sedang' },
            { color: '#ef4444', label: 'Sinyal Lemah' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.color }} />
              <span className="text-[10px] text-slate-400 font-mono">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 font-mono">
        Drag untuk rotasi · Pilih mode untuk melihat fenomena propagasi berbeda
      </div>
    </div>
  );
}