import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, SlidersHorizontal, TowerControl } from 'lucide-react';

// ── 3D Tower ─────────────────────────────────────────────────────
function Tower3D({ position, height, color, label }) {
  const poleRadius = 0.05;
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#475569" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Pole */}
      <mesh position={[0, height / 2 + 0.06, 0]} castShadow>
        <cylinderGeometry args={[poleRadius, poleRadius * 1.2, height, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Cross supports */}
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

      {/* Antenna dish at top */}
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

      {/* Status LED */}
      <mesh position={[0, height * 0.8, poleRadius + 0.02]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Label */}
      <Html position={[0, -0.2, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className="text-[10px] font-mono text-slate-400 whitespace-nowrap">{label}</div>
      </Html>
    </group>
  );
}

// ── Fresnel Zone (ellipsoid) ─────────────────────────────────────
function FresnelZone({ start, end, color, opacity = 0.08 }) {
  const midPoint = useMemo(() => {
    return [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2];
  }, [start, end]);

  const distance = useMemo(() => {
    return Math.sqrt(
      Math.pow(end[0] - start[0], 2) +
      Math.pow(end[1] - start[1], 2) +
      Math.pow(end[2] - start[2], 2)
    );
  }, [start, end]);

  const rotation = useMemo(() => {
    const dir = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]).normalize();
    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
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

// ── Signal Beam ──────────────────────────────────────────────────
function SignalBeam3D({ start, end, color }) {
  const ref = useRef();
  const dashOffset = useRef(0);

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end]);

  useFrame((_, delta) => {
    dashOffset.current -= delta * 2.5;
    if (ref.current) {
      ref.current.material.dashOffset = dashOffset.current;
    }
  });

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      lineWidth={2.5}
      dashed
      dashSize={0.25}
      gapSize={0.12}
      transparent
      opacity={0.8}
    />
  );
}

// ── Signal Pulse ─────────────────────────────────────────────────
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
function LinkScene({ distance, height, score, isGood, isOk }) {
  // Map slider values to 3D positions
  const spacing = 1 + (distance / 50) * 6; // 1 to 7 units apart
  const towerH = 0.5 + (height / 50) * 3;  // 0.5 to 3.5 units tall

  const beamColor = isGood ? '#22c55e' : isOk ? '#f97316' : '#ef4444';
  const fresnelColor = isGood ? '#22c55e' : isOk ? '#f59e0b' : '#ef4444';

  const startPos = [-spacing / 2, towerH + 0.06, 0];
  const endPos = [spacing / 2, towerH + 0.06, 0];

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow />
      <directionalLight position={[-3, 3, -3]} intensity={0.25} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#1a1f2e" roughness={0.9} />
      </mesh>
      <gridHelper args={[16, 16, '#334155', '#1e293b']} position={[0, 0.003, 0]} />

      {/* Towers */}
      <Tower3D position={[-spacing / 2, 0, 0]} height={towerH} color="#3b82f6" label="Site A" />
      <Tower3D position={[spacing / 2, 0, 0]} height={towerH} color="#22c55e" label="Site B" />

      {/* Signal beam */}
      <SignalBeam3D start={startPos} end={endPos} color={beamColor} />
      <Pulse3D start={startPos} end={endPos} color={beamColor} speed={0.5} />
      <Pulse3D start={endPos} end={startPos} color={beamColor} speed={0.4} />

      {/* Fresnel zone */}
      <FresnelZone start={startPos} end={endPos} color={fresnelColor} opacity={isGood ? 0.06 : isOk ? 0.08 : 0.1} />

      {/* Distance label */}
      <Html position={[0, 0.25, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
          ← {distance} km →
        </div>
      </Html>

      {/* Height label on tower A */}
      <Html position={[-spacing / 2 + 0.4, towerH / 2, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className="text-[9px] font-mono text-blue-400/70">{height}m</div>
      </Html>

      {/* Score indicator floating above */}
      <Html position={[0, towerH + 0.8, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className={`text-xs font-bold px-2 py-0.5 rounded ${isGood ? 'text-green-400' : isOk ? 'text-orange-400' : 'text-red-400'}`}>
          {score}/100
        </div>
      </Html>

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.12}
        minDistance={3}
        maxDistance={14}
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

  // Simple scoring model for educational purposes
  const calcScore = () => {
    let score = 100;
    // Distance penalty
    score -= (distance / 50) * 30;
    // Height bonus
    score += (height / 50) * 20;
    // Frequency penalty at 2.4 GHz in dense areas (interference)
    if (frequency === 2) score -= interference * 5;
    else score -= interference * 2;
    // Distance too far for height
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
      : { label: "Link Gagal (Poor Link)", icon: XCircle, msg: "Koneksi kemungkinan tidak akan berfungsi baik. Jaraknya terlalu jauh, antena terlalu rendah, atau interferensi terlalu tinggi." };

  const FeedbackIcon = feedback.icon;

  return (
    <div className="bg-slate-900 text-white rounded-xl p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary-500 rounded-full" />
        <div>
          <h3 className="text-sm font-bold">Simulasi Link Wireless 3D</h3>
          <p className="text-slate-400 text-xs">Atur parameter dan lihat apakah koneksi berhasil</p>
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700" style={{ height: '300px' }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 3, 7], fov: 48 }} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <LinkScene distance={distance} height={height} score={score} isGood={isGood} isOk={isOk} />
          </Suspense>
        </Canvas>

        {/* Fresnel zone label */}
        <div className="absolute top-3 right-3 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: isGood ? '#22c55e' : isOk ? '#f59e0b' : '#ef4444', opacity: 0.5 }} />
            <span className="text-[10px] text-slate-400 font-mono">Zona Fresnel</span>
          </div>
        </div>

        <div className="absolute bottom-2 left-3 text-slate-500 text-[10px] font-mono pointer-events-none">
          Drag rotasi · Scroll zoom
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: "Jarak (km)", value: distance, setter: setDistance, min: 1, max: 50, unit: "km" },
          { label: "Ketinggian Antena (m)", value: height, setter: setHeight, min: 5, max: 50, unit: "m" },
          { label: "Interferensi (1=rendah, 5=tinggi)", value: interference, setter: setInterference, min: 1, max: 5, unit: "" },
        ].map((s) => (
          <div key={s.label} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 text-xs">{s.label}</span>
              <span className="font-bold text-white bg-slate-700 px-2 py-0.5 rounded text-xs font-mono">{s.value}{s.unit}</span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              value={s.value}
              onChange={(e) => s.setter(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-slate-700 cursor-pointer accent-primary-500"
            />
          </div>
        ))}

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300 text-xs">Frekuensi</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[{ label: "2.4 GHz", val: 2 }, { label: "5 GHz", val: 5 }].map((f) => (
              <button
                key={f.val}
                onClick={() => setFrequency(f.val)}
                className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                  frequency === f.val
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${isGood}-${isOk}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-start gap-3 p-4 rounded-xl ${
            isGood ? 'bg-green-900/30 border border-green-700/40'
            : isOk ? 'bg-orange-900/30 border border-orange-700/40'
            : 'bg-red-900/30 border border-red-700/40'
          }`}
        >
          <FeedbackIcon size={24} className={`shrink-0 ${isGood ? 'text-green-400' : isOk ? 'text-orange-400' : 'text-red-400'}`} />
          <div>
            <div className={`font-bold text-sm ${isGood ? 'text-green-300' : isOk ? 'text-orange-300' : 'text-red-300'}`}>
              {feedback.label} — Score: {score}/100
            </div>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">{feedback.msg}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
