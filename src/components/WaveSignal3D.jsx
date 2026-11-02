import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause } from 'lucide-react';

function TreeModel({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.4, 5]} />
        <meshStandardMaterial color="#4a3018" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <coneGeometry args={[0.3, 0.8, 5]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <coneGeometry args={[0.25, 0.6, 5]} />
        <meshStandardMaterial color="#3a7033" roughness={0.8} flatShading />
      </mesh>
    </group>
  );
}

function BuildingModel({ position, scale = 1, size = [0.4, 1.2, 0.4], color = '#e2e8f0', label }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[0, -size[1] / 2 + 0.3 + i * 0.4, size[2] / 2 + 0.01]}>
          <boxGeometry args={[size[0] * 0.7, 0.2, 0.02]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      {label && (
        <Html position={[0, size[1] / 2 + 0.2, 0]} center distanceFactor={7}>
          <div className="pointer-events-none whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-bold bg-slate-900/90 text-white border border-slate-600 shadow-md">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function APTransmitter({ color, isPaused }) {
  const ref = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (isPaused) return;
    if (ref.current) ref.current.rotation.y += 0.006;
    if (ringRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.04;
      ringRef.current.scale.set(pulse, pulse, pulse);
      ringRef.current.rotation.z += 0.008;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} />
      </mesh>

      <group ref={ref}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.07, 0.42]} />
          <meshStandardMaterial color="#d8e0e8" roughness={0.28} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.038, 0.16]}>
          <boxGeometry args={[0.18, 0.006, 0.008]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      </group>

      {[0.5, 0.7, 0.9].map((r, i) => (
        <mesh key={i} ref={i === 0 ? ringRef : undefined} rotation={[Math.PI / 2, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.012, 8, 40]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.35 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function WaveRing({ delay = 0, color = '#0ea5e9', maxRadius = 4.5, speed = 0.55, tilt = 0, isPaused }) {
  const ref = useRef();
  const progress = useRef(delay);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!isPaused) {
      progress.current = (progress.current + delta * speed) % 1;
    }
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

function ReceiverDevice({ position, color, signalStrength = 1, label, isPaused }) {
  const ref = useRef();
  const initPos = useMemo(() => [...position], [position]);

  useFrame((state) => {
    if (!ref.current || isPaused) return;
    const bob = Math.sin(state.clock.elapsedTime * 1.4 + initPos[0]) * 0.04;
    ref.current.position.y = initPos[1] + bob;
  });

  const alpha = 0.4 + signalStrength * 0.6;

  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.24, 0.08, 0.18]} />
        <meshStandardMaterial color="#c8d0d8" roughness={0.28} metalness={0.65} transparent opacity={alpha} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.014, 0.018, 0.2, 10]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.35} metalness={0.6} transparent opacity={alpha} />
      </mesh>
      <Html position={[0, 0.35, 0]} center distanceFactor={7}>
        <div
          className="pointer-events-none whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-mono font-bold border shadow-md"
          style={{ background: '#0f172a', color: '#f8fafc', borderColor: color }}
        >
          {label} ({Math.round(signalStrength * 100)}%)
        </div>
      </Html>
    </group>
  );
}

function SignalBeam({ from, to, color, opacity = 0.32 }) {
  const pts = useMemo(() => [new THREE.Vector3(...from), new THREE.Vector3(...to)], [from, to]);
  return (
    <Line points={pts} color={color} lineWidth={1.5} dashed dashSize={0.2} gapSize={0.1} transparent opacity={opacity} />
  );
}

function PropagationScene({ mode, isPaused }) {
  const isFreeSpace = mode === 'freespace';
  const isMultipath = mode === 'multipath';
  const isShadowing = mode === 'shadowing';

  const cfg = {
    color: isFreeSpace ? '#0ea5e9' : isMultipath ? '#10b981' : '#f59e0b',
    rings: isFreeSpace ? 5 : 4,
    ringTilt: isMultipath ? 0.15 : 0,
  };

  return (
    <>
      <Sky sunPosition={[5, 8, 5]} turbidity={0.6} rayleigh={0.8} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 7, 4]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={isFreeSpace ? '#4ade80' : '#94a3b8'} roughness={1} />
      </mesh>

      {isFreeSpace && (
        <>
          <TreeModel position={[-2, -1.2, -2]} scale={1.2} />
          <TreeModel position={[3, -1.2, -3]} scale={1.5} />
          <TreeModel position={[-3, -1.2, 2]} scale={0.9} />
        </>
      )}

      {isMultipath && (
        <>
          <BuildingModel position={[1.6, -0.5, 0.5]} size={[0.4, 1.4, 1.5]} label="Gedung A" />
          <BuildingModel position={[3.2, -0.6, -1]} size={[0.6, 1.2, 0.8]} color="#cbd5e1" label="Gedung B" />
          <BuildingModel position={[-2, -0.2, -2]} size={[1.2, 2, 1.2]} color="#94a3b8" />
          <TreeModel position={[1.6, -1.2, 1.5]} scale={0.8} />

          <SignalBeam from={[0, 0, 0]} to={[1.4, 0, 0.5]} color={cfg.color} opacity={0.6} />
          <SignalBeam from={[1.4, 0, 0.5]} to={[2.8, 0, 1.2]} color={cfg.color} opacity={0.4} />
          <SignalBeam from={[0, 0, 0]} to={[3.0, 0, -0.8]} color={cfg.color} opacity={0.6} />
          <SignalBeam from={[3.0, 0, -0.8]} to={[3.6, 0, -1.4]} color={cfg.color} opacity={0.4} />
        </>
      )}

      {isShadowing && (
        <>
          <BuildingModel
            position={[2.6, -0.6, 0.3]}
            size={[0.8, 1.8, 1.2]}
            color="#475569"
            label="Gedung Tinggi (Penghalang)"
          />
          <TreeModel position={[1, -1.2, 1]} scale={1} />
          <TreeModel position={[3.5, -1.2, -1]} scale={1.2} />
          <SignalBeam from={[0, 0, 0]} to={[2.2, 0, -0.6]} color={cfg.color} opacity={0.8} />
          <SignalBeam from={[0, 0, 0]} to={[2.6, 0, 0.3]} color={cfg.color} opacity={0.3} />
        </>
      )}

      {Array.from({ length: cfg.rings }).map((_, i) => (
        <WaveRing
          key={i}
          delay={i / cfg.rings}
          color={cfg.color}
          maxRadius={5.5}
          speed={0.52}
          tilt={cfg.ringTilt}
          isPaused={isPaused}
        />
      ))}

      <APTransmitter color={cfg.color} isPaused={isPaused} />

      {isFreeSpace && (
        <>
          <ReceiverDevice position={[2.2, -0.8, 0]} signalStrength={0.96} color="#22c55e" label="Dekat" isPaused={isPaused} />
          <ReceiverDevice position={[3.4, -0.8, 0.4]} signalStrength={0.65} color="#f59e0b" label="Sedang" isPaused={isPaused} />
          <ReceiverDevice position={[4.6, -0.8, -0.5]} signalStrength={0.28} color="#ef4444" label="Jauh" isPaused={isPaused} />
        </>
      )}

      {isMultipath && (
        <>
          <ReceiverDevice position={[2.8, -0.8, 1.2]} signalStrength={0.75} color="#22c55e" label="Pantulan 1" isPaused={isPaused} />
          <ReceiverDevice position={[3.6, -0.8, -1.4]} signalStrength={0.48} color="#f59e0b" label="Pantulan 2" isPaused={isPaused} />
        </>
      )}

      {isShadowing && (
        <>
          <ReceiverDevice position={[2.2, -0.8, -1.2]} signalStrength={0.88} color="#22c55e" label="LoS Aman" isPaused={isPaused} />
          <ReceiverDevice position={[3.8, -0.8, 0.7]} signalStrength={0.14} color="#ef4444" label="Area Bayangan" isPaused={isPaused} />
        </>
      )}
    </>
  );
}

export default function WaveSignal3D({ height = '380px' }) {
  const [mode, setMode] = useState('freespace');
  const [isPaused, setIsPaused] = useState(false);

  const modes = [
    { id: 'freespace', label: 'Free Space', desc: 'Redaman alami seiring jarak di ruang terbuka' },
    { id: 'multipath', label: 'Multipath', desc: 'Pantulan gedung menciptakan jalur ganda' },
    { id: 'shadowing', label: 'Shadowing', desc: 'Gedung tinggi menghalangi garis pandang' },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih skenario propagasi gelombang">
          {modes.map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(m.id)}
                className={`px-3.5 py-2 rounded-lg font-semibold text-xs border transition-colors min-h-[38px] ${
                  active
                    ? 'bg-sky-500 border-sky-400 text-slate-950 font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {m.label}
                <span className="ml-1.5 text-[11px] font-normal opacity-85 hidden md:inline">: {m.desc}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? 'Putar animasi propagasi' : 'Jeda animasi propagasi'}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 min-h-[38px]"
        >
          {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          <span>{isPaused ? 'Putar' : 'Jeda'}</span>
        </button>
      </div>

      <div
        className="relative w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-700"
        style={{ height }}
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm font-mono">
              Memuat simulasi propagasi 3D...
            </div>
          }
        >
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 4, 8], fov: 50 }} gl={{ antialias: true }}>
            <PropagationScene mode={mode} isPaused={isPaused} />
            <OrbitControls
              enableZoom
              enablePan={false}
              maxPolarAngle={Math.PI / 2 - 0.05}
              minDistance={2}
              maxDistance={15}
            />
          </Canvas>
        </Suspense>

        <div className="absolute bottom-3 left-3 text-slate-100 bg-slate-900/85 px-2.5 py-1 rounded border border-slate-700 text-[11px] font-mono pointer-events-none">
          Geser rotasi · Scroll zoom
        </div>
      </div>
    </div>
  );
}
