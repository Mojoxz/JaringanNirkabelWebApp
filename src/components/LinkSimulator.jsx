import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence, motion as framerMotion } from 'framer-motion';
import { CheckCircle2, XCircle, SlidersHorizontal, TowerControl } from 'lucide-react';

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

function MountainModel({ position, scale = 1, color = "#1a361a" }) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <coneGeometry args={[2, 3, 5]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </mesh>
  );
}

function CloudModel({ position, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.position.x += 0.001 * scale;
    if (ref.current && ref.current.position.x > 15) ref.current.position.x = -15;
  });
  return (
    <group position={position} scale={scale} ref={ref}>
      <mesh position={[0, 0, 0]} castShadow><sphereGeometry args={[0.5, 6, 6]} /><meshStandardMaterial color="#ffffff" roughness={1} flatShading /></mesh>
      <mesh position={[0.4, 0.1, 0]} castShadow><sphereGeometry args={[0.4, 6, 6]} /><meshStandardMaterial color="#ffffff" roughness={1} flatShading /></mesh>
      <mesh position={[-0.4, -0.1, 0]} castShadow><sphereGeometry args={[0.4, 6, 6]} /><meshStandardMaterial color="#ffffff" roughness={1} flatShading /></mesh>
      <mesh position={[0.2, 0.2, 0.3]} castShadow><sphereGeometry args={[0.3, 6, 6]} /><meshStandardMaterial color="#ffffff" roughness={1} flatShading /></mesh>
    </group>
  );
}

function InterferenceObstacle({ active, height }) {
  const ref = useRef();
  const targetScale = active ? 1 : 0;
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.scale.y += (targetScale - ref.current.scale.y) * delta * 4;
      ref.current.scale.x = ref.current.scale.y;
      ref.current.scale.z = ref.current.scale.y;
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Obstacle Building that blocks the signal */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, height, 1.2]} />
        <meshStandardMaterial color="#475569" roughness={0.7} />
      </mesh>
      {/* Windows on the building */}
      {Array.from({ length: Math.floor(height / 0.8) }).map((_, i) => (
        <mesh key={i} position={[0, height - 0.6 - i * 0.8, 0.61]}>
          <boxGeometry args={[0.8, 0.3, 0.02]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      <Html position={[0, height + 0.4, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className="text-[10px] font-bold text-orange-300 bg-orange-950/80 px-2 py-0.5 rounded shadow-lg backdrop-blur-sm border border-orange-500/50 whitespace-nowrap opacity-90 transition-opacity">
          Gedung (Penghalang)
        </div>
      </Html>
    </group>
  );
}

// ── 3D Tower ─────────────────────────────────────────────────────
function Tower3D({ position, height, color, label }) {
  const poleRadius = 0.05;
  return (
    <group position={position}>
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#475569" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, height / 2 + 0.06, 0]} castShadow>
        <cylinderGeometry args={[poleRadius, poleRadius * 1.2, height, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.5} />
      </mesh>
      {Array.from({ length: Math.max(2, Math.floor(height / 0.8)) }, (_, i) => {
        const y = 0.4 + i * 0.8;
        if (y > height) return null;
        return (
          <group key={i} position={[0, y + 0.06, 0]}>
            <mesh><boxGeometry args={[0.25, 0.018, 0.018]} /><meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.4} /></mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[0.25, 0.018, 0.018]} /><meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.4} /></mesh>
          </group>
        );
      })}
      <group position={[0, height + 0.06, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.04, 0.06, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>
      <mesh position={[0, height * 0.8, poleRadius + 0.02]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      <Html position={[0, -0.2, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className="text-[10px] font-bold text-white drop-shadow-md whitespace-nowrap">{label}</div>
      </Html>
    </group>
  );
}

// ── Fresnel Zone ─────────────────────────────────────────────────
function FresnelZone({ start, end, color, opacity = 0.08 }) {
  const midPoint = useMemo(() => [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2], [start, end]);
  const distance = useMemo(() => Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2) + Math.pow(end[2] - start[2], 2)), [start, end]);
  const rotation = useMemo(() => {
    const dir = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]).normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    const euler = new THREE.Euler().setFromQuaternion(quat);
    return [euler.x, euler.y, euler.z];
  }, [start, end]);

  const fresnelRadius = Math.min(0.6, distance * 0.08);

  return (
    <mesh position={midPoint} rotation={rotation}>
      <cylinderGeometry args={[fresnelRadius, fresnelRadius, distance, 16, 1, true]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

// ── Signal Beam & Pulse ──────────────────────────────────────────
function SignalBeam3D({ start, end, color }) {
  const ref = useRef();
  const dashOffset = useRef(0);
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);

  useFrame((_, delta) => {
    dashOffset.current -= delta * 2.5;
    if (ref.current) ref.current.material.dashOffset = dashOffset.current;
  });

  return (
    <Line ref={ref} points={points} color={color} lineWidth={2.5} dashed dashSize={0.25} gapSize={0.12} transparent opacity={0.8} />
  );
}

function Pulse3D({ start, end, color, speed = 0.6 }) {
  const ref = useRef();
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame((state) => {
    if (ref.current) {
      const t = ((state.clock.elapsedTime * speed) % 1);
      ref.current.position.lerpVectors(startVec, endVec, t);
      const s = 0.7 + Math.sin(t * Math.PI) * 0.5;
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} transparent opacity={0.9} />
    </mesh>
  );
}

// ── Link Scene ───────────────────────────────────────────────────
function LinkScene({ distance, height, score, isGood, isOk, interference }) {
  const spacing = 1 + (distance / 50) * 8; // Wider spacing for dramatic effect
  const towerH = 0.5 + (height / 50) * 3; 

  const beamColor = isGood ? '#22c55e' : isOk ? '#f97316' : '#ef4444';
  const fresnelColor = isGood ? '#22c55e' : isOk ? '#f59e0b' : '#ef4444';

  const startPos = [-spacing / 2, towerH + 0.06, 0];
  const endPos = [spacing / 2, towerH + 0.06, 0];

  return (
    <>
      <Sky sunPosition={[10, 8, 5]} turbidity={0.3} rayleigh={0.5} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#4ade80" roughness={1} />
      </mesh>

      {/* Background Mountains */}
      <MountainModel position={[-8, 1, -8]} scale={[3, 4, 3]} />
      <MountainModel position={[0, 0.5, -10]} scale={[4, 3.5, 4]} color="#142b14" />
      <MountainModel position={[8, 0, -7]} scale={[2.5, 2.5, 2.5]} />

      {/* Decorative Trees */}
      <TreeModel position={[-spacing/2 - 1.5, 0, 1]} scale={1.2} />
      <TreeModel position={[-spacing/2 - 1, 0, -2]} scale={0.9} />
      <TreeModel position={[spacing/2 + 2, 0, -1]} scale={1.3} />
      <TreeModel position={[spacing/2 + 1, 0, 2]} scale={0.8} />

      <CloudModel position={[-6, 5, -4]} scale={1.5} />
      <CloudModel position={[4, 6, -6]} scale={2} />

      {/* Towers */}
      <Tower3D position={[-spacing / 2, 0, 0]} height={towerH} color="#3b82f6" label="Site A" />
      <Tower3D position={[spacing / 2, 0, 0]} height={towerH} color="#3b82f6" label="Site B" />

      {/* Signal */}
      <SignalBeam3D start={startPos} end={endPos} color={beamColor} />
      <Pulse3D start={startPos} end={endPos} color={beamColor} speed={0.5} />
      <Pulse3D start={endPos} end={startPos} color={beamColor} speed={0.4} />

      {/* Fresnel zone */}
      <FresnelZone start={startPos} end={endPos} color={fresnelColor} opacity={isGood ? 0.08 : isOk ? 0.12 : 0.2} />

      {/* High Interference Obstacle (Hill blocks LOS) */}
      <InterferenceObstacle active={interference >= 4 && height < 30} height={towerH} />

      {/* UI Overlays */}
      <Html position={[0, 0.25, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className="text-[10px] font-mono text-slate-700 bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm border border-white/50 shadow-sm">
          ← {distance} km →
        </div>
      </Html>

      <Html position={[-spacing / 2 + 0.4, towerH / 2, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className="text-[9px] font-mono text-white bg-slate-900/60 px-1 rounded backdrop-blur-sm">{height}m</div>
      </Html>

      <Html position={[0, towerH + 1.2, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className={`text-xs font-bold px-2 py-0.5 rounded shadow-lg backdrop-blur-sm ${isGood ? 'text-green-900 bg-green-100/90 border border-green-300' : isOk ? 'text-orange-900 bg-orange-100/90 border border-orange-300' : 'text-red-900 bg-red-100/90 border border-red-300'}`}>
          Score: {score}/100
        </div>
      </Html>

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI * 0.48}
        minPolarAngle={Math.PI * 0.1}
        minDistance={4}
        maxDistance={16}
        zoomSpeed={0.8}
      />
    </>
  );
}

// ── Public export ────────────────────────────────────────────────
export default function LinkSimulator() {
  const [distance, setDistance] = useState(5);
  const [height, setHeight] = useState(20);
  const [frequency, setFrequency] = useState(5);
  const [interference, setInterference] = useState(2);

  const calcScore = () => {
    let score = 100;
    score -= (distance / 50) * 30;
    score += (height / 50) * 20;
    if (frequency === 2) score -= interference * 5;
    else score -= interference * 2;
    if (distance > 10 && height < 15) score -= 25;
    if (distance > 20 && height < 25) score -= 20;
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const score = calcScore();
  const isGood = score >= 65;
  const isOk = score >= 40 && score < 65;

  const feedback = isGood
    ? { label: "Link Berhasil (Good Link)", icon: CheckCircle2, msg: "Parameter Anda sudah cukup baik. Jarak, ketinggian, dan frekuensi membentuk kondisi link yang dapat diandalkan." }
    : isOk
      ? { label: "Link Marginal (Unstable)", icon: SlidersHorizontal, msg: "Link mungkin berfungsi namun tidak stabil. Coba tingkatkan ketinggian antena atau kurangi interferensi." }
      : { label: "Link Gagal (Poor Link)", icon: XCircle, msg: "Koneksi kemungkinan tidak akan berfungsi baik. Jaraknya terlalu jauh, antena terlalu rendah, atau interferensi (rintangan) terlalu tinggi." };

  const FeedbackIcon = feedback.icon;

  return (
    <div className="bg-slate-900 text-white rounded-xl p-5 md:p-6 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary-500 rounded-full" />
        <div>
          <h3 className="text-sm font-bold">Simulasi Link Lingkungan Terbuka</h3>
          <p className="text-slate-400 text-xs">Atur parameter dan lihat bagaimana kondisi alam memengaruhi link</p>
        </div>
      </div>

      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-400 to-sky-200 border border-slate-700 shadow-inner" style={{ height: '350px' }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 4, 9], fov: 48 }} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <LinkScene distance={distance} height={height} score={score} isGood={isGood} isOk={isOk} interference={interference} />
          </Suspense>
        </Canvas>

        <div className="absolute top-3 right-3 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-white/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/50">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: isGood ? '#22c55e' : isOk ? '#f59e0b' : '#ef4444' }} />
            <span className="text-[10px] text-slate-800 font-bold">Zona Fresnel</span>
          </div>
        </div>
        <div className="absolute bottom-2 left-3 text-slate-700 bg-white/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/50 text-[10px] font-mono pointer-events-none">
          Drag rotasi · Scroll zoom
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: "Jarak Antar Tower", value: distance, setter: setDistance, min: 1, max: 50, unit: "km" },
          { label: "Ketinggian Antena", value: height, setter: setHeight, min: 5, max: 50, unit: "m" },
          { label: "Interferensi / Rintangan Fisik", value: interference, setter: setInterference, min: 1, max: 5, unit: "" },
        ].map((s) => (
          <div key={s.label} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 text-xs">{s.label}</span>
              <span className="font-bold text-white bg-slate-700 px-2 py-0.5 rounded text-xs font-mono">{s.value}{s.unit}</span>
            </div>
            <input
              type="range"
              min={s.min} max={s.max} value={s.value} onChange={(e) => s.setter(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-slate-700 cursor-pointer accent-primary-500"
            />
          </div>
        ))}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300 text-xs">Frekuensi (Pita Jaringan)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[{ label: "2.4 GHz", val: 2 }, { label: "5 GHz", val: 5 }].map((f) => (
              <button
                key={f.val} onClick={() => setFrequency(f.val)}
                className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                  frequency === f.val ? 'bg-primary-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <framerMotion.div
          key={`${isGood}-${isOk}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-start gap-3 p-4 rounded-xl ${
            isGood ? 'bg-green-900/30 border border-green-700/40' : isOk ? 'bg-orange-900/30 border border-orange-700/40' : 'bg-red-900/30 border border-red-700/40'
          }`}
        >
          <FeedbackIcon size={24} className={`shrink-0 ${isGood ? 'text-green-400' : isOk ? 'text-orange-400' : 'text-red-400'}`} />
          <div>
            <div className={`font-bold text-sm ${isGood ? 'text-green-300' : isOk ? 'text-orange-300' : 'text-red-300'}`}>
              {feedback.label} — Score: {score}/100
            </div>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">{feedback.msg}</p>
          </div>
        </framerMotion.div>
      </AnimatePresence>
    </div>
  );
}
