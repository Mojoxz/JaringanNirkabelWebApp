import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause } from 'lucide-react';

function OmniAntennaModel({ color }) {
  const mat = <meshStandardMaterial color="#c0c8d0" roughness={0.18} metalness={0.82} />;
  const darkMat = <meshStandardMaterial color="#2d3748" roughness={0.55} metalness={0.4} />;
  return (
    <group>
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.18, 24]} />
        {darkMat}
      </mesh>
      <mesh position={[0, -0.88, 0]}>
        <cylinderGeometry args={[0.14, 0.22, 0.22, 24]} />
        {darkMat}
      </mesh>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.055, 0.07, 1.5, 20]} />
        {mat}
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.2, 20]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.02, 0.055, 0.22, 12]} />
        {mat}
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.025, 10, 10]} />
        {mat}
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -1.12 + i * 0.025, 0]}>
          <torusGeometry args={[0.135, 0.012, 8, 24]} />
          <meshStandardMaterial color="#a0aec0" roughness={0.4} metalness={0.7} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.55, 24, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function PanelAntennaModel({ color }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.52, 1.55, 0.1]} />
        <meshStandardMaterial color="#c8d0d8" roughness={0.22} metalness={0.75} />
      </mesh>
      <mesh position={[0, 0, 0.058]}>
        <boxGeometry args={[0.5, 1.53, 0.015]} />
        <meshStandardMaterial color="#e8edf2" roughness={0.5} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0, -0.075]}>
        <boxGeometry args={[0.12, 1.52, 0.06]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.6} />
      </mesh>
      {[-0.245, 0.245].map((x, i) => (
        <mesh key={i} position={[x, 0, -0.01]}>
          <boxGeometry args={[0.02, 1.56, 0.13]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
      {[-0.79, 0.79].map((y, i) => (
        <mesh key={i} position={[0, y, -0.01]}>
          <boxGeometry args={[0.54, 0.045, 0.13]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, -0.6, -0.21]}>
        <boxGeometry args={[0.18, 0.34, 0.18]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.6, -0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.36, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[0, -0.83, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.1, 12]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.72, 2.4, 32, 1, true]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, -0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.1, 0.5, 12, 1, true]} />
        <meshStandardMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ParabolicAntennaModel({ color }) {
  const dishMat = (
    <meshStandardMaterial color="#b0bec5" roughness={0.25} metalness={0.7} side={THREE.DoubleSide} />
  );
  const metalMat = <meshStandardMaterial color="#90a4ae" roughness={0.3} metalness={0.75} />;
  const darkMat = <meshStandardMaterial color="#37474f" roughness={0.4} metalness={0.6} />;

  // Build parabolic dish profile using y = -k * r^2
  const dishGeo = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 22; i++) {
      const t = i / 22;
      const r = t * 1.1;
      const y = -(r * r) * 0.55;
      pts.push(new THREE.Vector2(r, y));
    }
    return new THREE.LatheGeometry(pts, 40);
  }, []);

  const gridLines = useMemo(() => [0.18, 0.36, 0.54, 0.72, 0.9], []);

  return (
    <group>
      <mesh geometry={dishGeo}>{dishMat}</mesh>
      {gridLines.map((r, i) => {
        const y = -(r * r) * 0.55;
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.008, 6, 36]} />
            <meshStandardMaterial color="#78909c" roughness={0.3} metalness={0.8} />
          </mesh>
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            rotation={[0, angle, -Math.PI / 2 + 0.3]}
            position={[Math.cos(angle) * 0.55, -0.35, Math.sin(angle) * 0.55]}
          >
            <cylinderGeometry args={[0.007, 0.007, 1.12, 6]} />
            <meshStandardMaterial color="#78909c" roughness={0.25} metalness={0.8} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 1.25, 10]} />
        {metalMat}
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.06, 0.03, 0.18, 14]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.09, 0.06, 0.1, 14]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 10]} />
        {metalMat}
      </mesh>
      <mesh position={[0, -1.35, 0]}>
        <boxGeometry args={[0.22, 0.22, 0.18]} />
        {darkMat}
      </mesh>
      <mesh position={[0, -1.52, 0]}>
        <cylinderGeometry args={[0.04, 0.055, 0.3, 12]} />
        {darkMat}
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.09, 3.2, 20, 1, true]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function AutoRotate({ children, speed = 0.004, isPaused }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current && !isPaused) ref.current.rotation.y += speed;
  });
  return <group ref={ref}>{children}</group>;
}

function AntennaScene({ antennaType, isPaused }) {
  const palettes = {
    omni: { color: '#0ea5e9', light: '#38bdf8' },
    panel: { color: '#10b981', light: '#34d399' },
    parabolic: { color: '#f59e0b', light: '#fbbf24' },
  };
  const p = palettes[antennaType] || palettes.omni;
  const typeNames = {
    omni: 'Antena Omni Directional (360°)',
    panel: 'Antena Panel / Sectoral (~60°)',
    parabolic: 'Antena Parabolic Grid (<5°)',
  };

  return (
    <>
      <Sky sunPosition={[10, 2, -5]} turbidity={1} rayleigh={2} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 7, 4]} intensity={1.5} color="#fff" castShadow />
      <pointLight position={[-4, 3, 4]} intensity={1.2} color={p.light} />
      <pointLight position={[4, -3, -3]} intensity={0.7} color="#ffffff" />
      <Environment preset="sunset" environmentIntensity={0.9} />

      <mesh position={[0, -2.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.8, 0.4, 32]} />
        <meshStandardMaterial color="#224a22" roughness={1} />
      </mesh>

      <mesh position={[0, -1.1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2, 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} metalness={0.5} />
      </mesh>

      <ContactShadows position={[0, -1.9, 0]} opacity={0.75} scale={6} blur={2} far={2.5} />

      <Html position={[0, 2.5, 0]} center distanceFactor={10}>
        <div
          className="pointer-events-none whitespace-nowrap rounded-md px-3 py-1 text-xs font-mono font-bold border shadow-lg"
          style={{ background: '#0f172a', color: '#f8fafc', borderColor: p.color }}
        >
          {typeNames[antennaType]}
        </div>
      </Html>

      <AutoRotate speed={0.006} isPaused={isPaused}>
        <group position={[0, 0, 0]}>
          {antennaType === 'omni' && <OmniAntennaModel color={p.color} />}
          {antennaType === 'panel' && <PanelAntennaModel color={p.color} />}
          {antennaType === 'parabolic' && <ParabolicAntennaModel color={p.color} />}
        </group>
      </AutoRotate>

      <OrbitControls enableZoom autoRotate={false} minPolarAngle={0.2} maxPolarAngle={Math.PI - 0.3} />
    </>
  );
}

export default function AntennaPattern3D({ defaultType = 'omni' }) {
  const [antennaType, setAntennaType] = useState(defaultType);
  const [isPaused, setIsPaused] = useState(false);

  const options = [
    { id: 'omni', label: 'Omni Directional', desc: '360° segala arah' },
    { id: 'panel', label: 'Panel / Sectoral', desc: 'Beam ~60° terarah' },
    { id: 'parabolic', label: 'Parabolic Grid', desc: 'Beam sempit (<5°)' },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih model antena 3D">
          {options.map((opt) => {
            const active = antennaType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setAntennaType(opt.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm border transition-colors min-h-[40px] ${
                  active
                    ? 'bg-sky-500 border-sky-400 text-slate-950 font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500'
                }`}
              >
                {opt.label}
                <span className="ml-1.5 text-xs font-normal opacity-85">({opt.desc})</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? 'Putar rotasi antena 3D' : 'Jeda rotasi antena 3D'}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 min-h-[40px]"
        >
          {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          <span>{isPaused ? 'Putar Rotasi' : 'Jeda Rotasi'}</span>
        </button>
      </div>

      <div
        className="w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800"
        style={{ height: '400px' }}
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm font-mono">
              Memuat model antena 3D...
            </div>
          }
        >
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 5], fov: 52 }} gl={{ antialias: true }}>
            <AntennaScene antennaType={antennaType} isPaused={isPaused} />
          </Canvas>
        </Suspense>
      </div>

      <p className="text-center text-xs font-mono text-slate-300">
        Geser untuk rotasi manual · Scroll untuk zoom · Pilih jenis antena di atas
      </p>
    </div>
  );
}
