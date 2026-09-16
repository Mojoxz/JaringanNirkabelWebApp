import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Line, Sky } from '@react-three/drei';
import * as THREE from 'three';

// ── Environment Models ───────────────────────────────────────────
function TreeModel({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.05, 0.08, 0.4, 5]} /><meshStandardMaterial color="#4a3018" roughness={0.9} /></mesh>
      <mesh position={[0, 0.6, 0]} castShadow><coneGeometry args={[0.3, 0.8, 5]} /><meshStandardMaterial color="#2d5a27" roughness={0.8} flatShading /></mesh>
      <mesh position={[0, 0.9, 0]} castShadow><coneGeometry args={[0.25, 0.6, 5]} /><meshStandardMaterial color="#3a7033" roughness={0.8} flatShading /></mesh>
    </group>
  );
}

function MountainModel({ position, scale = 1, color = "#1a361a", label }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <coneGeometry args={[2, 3, 5]} />
        <meshStandardMaterial color={color} roughness={0.9} flatShading />
      </mesh>
      {label && (
        <Html position={[0, 1.8, 0]} center distanceFactor={7}>
          <div className="pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold bg-slate-800/80 text-white border border-slate-600/40 backdrop-blur-sm shadow-md">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function BuildingModel({ position, scale = 1, size = [0.4, 1.2, 0.4], color = "#e2e8f0", label }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Windows */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[0, -size[1]/2 + 0.3 + i*0.4, size[2]/2 + 0.01]}>
          <boxGeometry args={[size[0] * 0.7, 0.2, 0.02]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      {label && (
        <Html position={[0, size[1] / 2 + 0.2, 0]} center distanceFactor={7}>
          <div className="pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold bg-slate-800/80 text-white border border-slate-600/40 backdrop-blur-sm shadow-md">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Realistic Access Point Transmitter ────────────────────────────
function APTransmitter({ color }) {
  const ref = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y += 0.006;
    if (ringRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.04;
      ringRef.current.scale.set(pulse, pulse, pulse);
      ringRef.current.rotation.z += 0.008;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Tower pole */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} />
      </mesh>
      
      <group ref={ref}>
        <mesh castShadow><boxGeometry args={[0.55, 0.07, 0.42]} /><meshStandardMaterial color="#d8e0e8" roughness={0.28} metalness={0.6} /></mesh>
        <mesh position={[0, 0.038, 0.16]}><boxGeometry args={[0.18, 0.006, 0.008]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
        {[-0.2, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.04, 0]}><boxGeometry args={[0.018, 0.014, 0.4]} /><meshStandardMaterial color="#c0c8d0" roughness={0.4} metalness={0.5} /></mesh>
        ))}
      </group>

      {[0.5, 0.7, 0.9].map((r, i) => (
        <mesh key={i} ref={i === 0 ? ringRef : undefined} rotation={[Math.PI / 2, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.012, 8, 40]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.35 - i * 0.08} />
        </mesh>
      ))}

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

// ── Receiver device ────────────────────────────────────────────────
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
      <mesh castShadow><boxGeometry args={[0.24, 0.08, 0.18]} /><meshStandardMaterial color="#c8d0d8" roughness={0.28} metalness={0.65} transparent opacity={alpha} /></mesh>
      <mesh position={[0, 0.12, 0]}><cylinderGeometry args={[0.014, 0.018, 0.2, 10]} /><meshStandardMaterial color="#94a3b8" roughness={0.35} metalness={0.6} transparent opacity={alpha} /></mesh>
      <mesh ref={glowRef} position={[0, 0.044, 0.075]}><boxGeometry args={[0.06, 0.01, 0.006]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} /></mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.07, -0.065 - i * 0.025, 0]}>
          <boxGeometry args={[0.038, 0.02 + i * 0.03, 0.038]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={i / 2 <= signalStrength ? 0.9 : 0.1} transparent opacity={i / 2 <= signalStrength ? 0.9 : 0.25} />
        </mesh>
      ))}
      <Html position={[0, 0.35, 0]} center distanceFactor={7}>
        <div className="pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm border shadow-md"
          style={{ background: 'rgba(255,255,255,0.9)', color, borderColor: color }}>
          {label} · {Math.round(signalStrength * 100)}%
        </div>
      </Html>
    </group>
  );
}

// ── Beam line ─────────────────────────────────────────────────────
function SignalBeam({ from, to, color, opacity = 0.32 }) {
  const pts = useMemo(() => [new THREE.Vector3(...from), new THREE.Vector3(...to)], [from, to]);
  return <Line points={pts} color={color} lineWidth={1.5} dashed dashSize={0.2} gapSize={0.1} transparent opacity={opacity} />;
}

// ── Mode scenes ────────────────────────────────────────────────────
function PropagationScene({ mode }) {
  const isFreeSpace = mode === 'freespace';
  const isMultipath = mode === 'multipath';
  const isShadowing = mode === 'shadowing';

  const cfg = {
    color: isFreeSpace ? '#3b82f6' : isMultipath ? '#8b5cf6' : '#f59e0b',
    rings: isFreeSpace ? 5 : 4,
    ringTilt: isMultipath ? 0.15 : 0,
  };

  return (
    <>
      <Sky sunPosition={[5, 8, 5]} turbidity={0.6} rayleigh={0.8} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 7, 4]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      
      {/* Dynamic Terrain based on mode */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={isFreeSpace ? "#4ade80" : "#94a3b8"} roughness={1} />
      </mesh>

      {/* Decorative environment */}
      {isFreeSpace && (
        <>
          <TreeModel position={[-2, -1.2, -2]} scale={1.2} />
          <TreeModel position={[3, -1.2, -3]} scale={1.5} />
          <TreeModel position={[-3, -1.2, 2]} scale={0.9} />
        </>
      )}

      {isMultipath && (
        <>
          {/* City buildings causing multipath */}
          <BuildingModel position={[1.6, -0.5, 0.5]} size={[0.4, 1.4, 1.5]} label="Gedung A" />
          <BuildingModel position={[3.2, -0.6, -1]} size={[0.6, 1.2, 0.8]} color="#cbd5e1" label="Gedung B" />
          <BuildingModel position={[-2, -0.2, -2]} size={[1.2, 2, 1.2]} color="#94a3b8" />
          <TreeModel position={[1.6, -1.2, 1.5]} scale={0.8} />
          
          {/* Signal paths bouncing */}
          <SignalBeam from={[0,0,0]} to={[1.4, 0, 0.5]} color={cfg.color} opacity={0.6} />
          <SignalBeam from={[1.4, 0, 0.5]} to={[2.8, 0, 1.2]} color={cfg.color} opacity={0.4} />
          
          <SignalBeam from={[0,0,0]} to={[3.0, 0, -0.8]} color={cfg.color} opacity={0.6} />
          <SignalBeam from={[3.0, 0, -0.8]} to={[3.6, 0, -1.4]} color={cfg.color} opacity={0.4} />
        </>
      )}

      {isShadowing && (
        <>
          {/* Large building blocking signal */}
          <BuildingModel position={[2.6, -0.6, 0.3]} size={[0.8, 1.8, 1.2]} color="#475569" label="Gedung Tinggi (Penghalang)" />
          <TreeModel position={[1, -1.2, 1]} scale={1} />
          <TreeModel position={[3.5, -1.2, -1]} scale={1.2} />
          
          {/* Beams */}
          <SignalBeam from={[0,0,0]} to={[2.2, 0, -0.6]} color={cfg.color} opacity={0.8} />
          <SignalBeam from={[0,0,0]} to={[2.6, 0, 0.3]} color={cfg.color} opacity={0.3} />
        </>
      )}

      {/* Expanding wave rings */}
      {Array.from({ length: cfg.rings }).map((_, i) => (
        <WaveRing key={i} delay={i / cfg.rings} color={cfg.color} maxRadius={5.5} speed={0.52} tilt={cfg.ringTilt} />
      ))}

      {/* Transmitter AP */}
      <APTransmitter color={cfg.color} />

      {/* Receivers */}
      {isFreeSpace && (
        <>
          <ReceiverDevice position={[2.2, -0.8, 0]} signalStrength={0.96} color="#22c55e" label="Dekat" />
          <ReceiverDevice position={[3.4, -0.8, 0.4]} signalStrength={0.65} color="#f59e0b" label="Sedang" />
          <ReceiverDevice position={[4.6, -0.8, -0.5]} signalStrength={0.28} color="#ef4444" label="Jauh" />
        </>
      )}

      {isMultipath && (
        <>
          <ReceiverDevice position={[2.8, -0.8, 1.2]} signalStrength={0.75} color="#22c55e" label="Pantulan 1" />
          <ReceiverDevice position={[3.6, -0.8, -1.4]} signalStrength={0.48} color="#f59e0b" label="Pantulan 2" />
        </>
      )}

      {isShadowing && (
        <>
          <ReceiverDevice position={[2.2, -0.8, -1.2]} signalStrength={0.88} color="#22c55e" label="LOS (Aman)" />
          <ReceiverDevice position={[3.8, -0.8, 0.7]} signalStrength={0.14} color="#ef4444" label="Shadow Area" />
        </>
      )}
    </>
  );
}

// ── Main UI ────────────────────────────────────────────────────────
export default function WaveSignal3D({ height = '380px' }) {
  const [mode, setMode] = useState('freespace');

  const modes = [
    { id: 'freespace', label: 'Free Space', color: 'blue', desc: 'Sinyal melemah secara alami seiring jarak di ruang terbuka tanpa halangan.' },
    { id: 'multipath', label: 'Multipath', color: 'violet', desc: 'Sinyal memantul pada gedung/benda padat, menciptakan jalur ganda ke penerima.' },
    { id: 'shadowing', label: 'Shadowing', color: 'amber', desc: 'Gedung pencakar langit memblokir jalur sinyal, menciptakan "area bayangan".' },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-5 md:p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white">Simulasi Propagasi Lingkungan</h3>
        <p className="text-slate-400 text-sm mt-1">Lihat bagaimana kondisi alam & kota memengaruhi gelombang nirkabel</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {modes.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-full font-semibold text-sm border transition-all ${
              mode === m.id
                ? m.color === 'blue'   ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                : m.color === 'violet' ? 'bg-violet-500 border-violet-400 text-white shadow-lg shadow-violet-500/30'
                :                        'bg-amber-500 border-amber-400 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
            }`}>
            {m.label}
            <span className="ml-1.5 text-[10px] font-normal opacity-80 hidden md:inline">— {m.desc}</span>
          </button>
        ))}
      </div>

      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 border border-slate-200 shadow-inner" style={{ height }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 4, 8], fov: 50 }} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <PropagationScene mode={mode} />
            <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2 - 0.05} minDistance={2} maxDistance={15} />
          </Suspense>
        </Canvas>

        <div className="absolute top-3 left-4 pointer-events-none">
          <div className="text-[10px] text-slate-700 font-mono uppercase tracking-widest bg-white/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/40 mb-1 inline-block">Propagasi Sinyal 3D</div>
          <div className="text-sm font-bold text-slate-800 drop-shadow-sm">
            {mode === 'freespace' && 'Ruang Terbuka (Free Space Path Loss)'}
            {mode === 'multipath' && 'Perkotaan (Multipath Fading)'}
            {mode === 'shadowing' && 'Area Gedung Tinggi (Shadowing)'}
          </div>
        </div>

        <div className="absolute bottom-3 right-4 flex flex-col gap-1 pointer-events-none bg-white/60 p-2 rounded backdrop-blur-sm border border-white/50">
          {[
            { color: '#22c55e', label: 'Sinyal Kuat' },
            { color: '#f59e0b', label: 'Sinyal Sedang' },
            { color: '#ef4444', label: 'Sinyal Lemah' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
              <span className="text-[10px] text-slate-800 font-bold">{l.label}</span>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-3 left-4 text-slate-600 bg-white/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/50 text-[10px] font-mono pointer-events-none">
          Drag rotasi · Scroll zoom
        </div>
      </div>
    </div>
  );
}