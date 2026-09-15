import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ── Realistic Omni Antenna (rubber duck / pole style) ─────────────
function OmniAntennaModel({ color }) {
  const mat = <meshStandardMaterial color="#c0c8d0" roughness={0.18} metalness={0.82} />;
  const darkMat = <meshStandardMaterial color="#2d3748" roughness={0.55} metalness={0.4} />;
  return (
    <group>
      {/* Base mount */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.18, 24]} />
        {darkMat}
      </mesh>
      {/* Lower housing */}
      <mesh position={[0, -0.88, 0]}>
        <cylinderGeometry args={[0.14, 0.22, 0.22, 24]} />
        {darkMat}
      </mesh>
      {/* Main pole body */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.055, 0.07, 1.5, 20]} />
        {mat}
      </mesh>
      {/* Radome cover middle */}
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.2, 20]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Top tip */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.02, 0.055, 0.22, 12]} />
        {mat}
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.025, 10, 10]} />
        {mat}
      </mesh>
      {/* Connector threads at bottom */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[0, -1.12 + i * 0.025, 0]}>
          <torusGeometry args={[0.135, 0.012, 8, 24]} />
          <meshStandardMaterial color="#a0aec0" roughness={0.4} metalness={0.7} />
        </mesh>
      ))}
      {/* Radiation pattern */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.55, 24, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ── Realistic Panel / Sector Antenna ──────────────────────────────
function PanelAntennaModel({ color }) {
  return (
    <group>
      {/* Main panel body */}
      <mesh>
        <boxGeometry args={[0.52, 1.55, 0.1]} />
        <meshStandardMaterial color="#c8d0d8" roughness={0.22} metalness={0.75} />
      </mesh>
      {/* Front radome face */}
      <mesh position={[0, 0, 0.058]}>
        <boxGeometry args={[0.50, 1.53, 0.015]} />
        <meshStandardMaterial color="#e8edf2" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Back ridge / spine */}
      <mesh position={[0, 0, -0.075]}>
        <boxGeometry args={[0.12, 1.52, 0.06]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Side rails */}
      {[-0.245, 0.245].map((x, i) => (
        <mesh key={i} position={[x, 0, -0.01]}>
          <boxGeometry args={[0.02, 1.56, 0.13]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
      {/* Top / bottom caps */}
      {[-0.79, 0.79].map((y, i) => (
        <mesh key={i} position={[0, y, -0.01]}>
          <boxGeometry args={[0.54, 0.045, 0.13]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.7} />
        </mesh>
      ))}
      {/* Mounting bracket */}
      <mesh position={[0, -0.6, -0.21]}>
        <boxGeometry args={[0.18, 0.34, 0.18]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.6, -0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.36, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.35} metalness={0.7} />
      </mesh>
      {/* RF connector port */}
      <mesh position={[0, -0.83, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.1, 12]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Beam cone - sectoral ~60° */}
      <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.72, 2.4, 32, 1, true]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.20} side={THREE.DoubleSide} />
      </mesh>
      {/* Back small lobe */}
      <mesh position={[0, 0, -0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.1, 0.5, 12, 1, true]} />
        <meshStandardMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ── Realistic Parabolic Grid Antenna ─────────────────────────────
function ParabolicAntennaModel({ color }) {
  const dishMat = <meshStandardMaterial color="#b0bec5" roughness={0.25} metalness={0.7} wireframe={false} side={THREE.DoubleSide} />;
  const metalMat = <meshStandardMaterial color="#90a4ae" roughness={0.3} metalness={0.75} />;
  const darkMat = <meshStandardMaterial color="#37474f" roughness={0.4} metalness={0.6} />;

  // Generate parabolic dish geometry from parametric curve
  const dishGeo = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 22; i++) {
      const t = i / 22;
      const r = t * 1.1;
      const y = -(r * r) * 0.55; // parabolic y = -r²·k
      pts.push(new THREE.Vector2(r, y));
    }
    return new THREE.LatheGeometry(pts, 40);
  }, []);

  // Grid lines
  const gridLines = useMemo(() => {
    const lines = [];
    for (let i = 1; i <= 5; i++) {
      lines.push(i * 0.18);
    }
    return lines;
  }, []);

  return (
    <group>
      {/* Parabolic dish surface */}
      <mesh geometry={dishGeo} rotation={[0, 0, 0]}>
        {dishMat}
      </mesh>
      {/* Grid rings on dish */}
      {gridLines.map((r, i) => {
        const y = -(r * r) * 0.55;
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.008, 6, 36]} />
            <meshStandardMaterial color="#78909c" roughness={0.3} metalness={0.8} />
          </mesh>
        );
      })}
      {/* Radial spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} rotation={[0, angle, -Math.PI / 2 + 0.3]} position={[Math.cos(angle) * 0.55, -0.35, Math.sin(angle) * 0.55]}>
            <cylinderGeometry args={[0.007, 0.007, 1.12, 6]} />
            <meshStandardMaterial color="#78909c" roughness={0.25} metalness={0.8} />
          </mesh>
        );
      })}
      {/* Feed arm */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 1.25, 10]} />
        {metalMat}
      </mesh>
      {/* Feed horn */}
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.06, 0.03, 0.18, 14]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.09, 0.06, 0.1, 14]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Mounting arm */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 10]} />
        {metalMat}
      </mesh>
      <mesh position={[0, -1.35, 0]}>
        <boxGeometry args={[0.22, 0.22, 0.18]} />
        {darkMat}
      </mesh>
      {/* U-bolt mount */}
      <mesh position={[0, -1.52, 0]}>
        <cylinderGeometry args={[0.04, 0.055, 0.3, 12]} />
        {darkMat}
      </mesh>
      {/* Narrow beam pattern */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.09, 3.2, 20, 1, true]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ── Auto-rotating group wrapper ───────────────────────────────────
function AutoRotate({ children, speed = 0.004 }) {
  const ref = useRef();
  useFrame(() => { if (ref.current) ref.current.rotation.y += speed; });
  return <group ref={ref}>{children}</group>;
}

// ── Main scene ────────────────────────────────────────────────────
function AntennaScene({ antennaType }) {
  const palettes = {
    omni:      { color: '#3b82f6', light: '#60a5fa' },
    panel:     { color: '#10b981', light: '#34d399' },
    parabolic: { color: '#f59e0b', light: '#fbbf24' },
  };
  const p = palettes[antennaType] || palettes.omni;
  const typeNames = {
    omni: 'Antena Omni Directional',
    panel: 'Antena Panel / Sectoral',
    parabolic: 'Antena Parabolic Grid',
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 7, 4]} intensity={1.4} color="#fff" castShadow />
      <pointLight position={[-4, 3, 4]} intensity={1.2} color={p.light} />
      <pointLight position={[4, -3, -3]} intensity={0.7} color="#ffffff" />
      <Environment preset="studio" environmentIntensity={0.9} />
      <gridHelper args={[8, 20, '#1e293b', '#1e293b']} position={[0, -1.95, 0]} />
      <ContactShadows position={[0, -1.94, 0]} opacity={0.65} scale={10} blur={2.5} far={2.5} />

      {/* Html label */}
      <Html position={[0, 2.1, 0]} center distanceFactor={10}>
        <div className="pointer-events-none whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm border"
          style={{ background: 'rgba(15,23,42,0.75)', color: p.color, borderColor: p.color }}>
          {typeNames[antennaType]}
        </div>
      </Html>

      <Suspense fallback={null}>
        <AutoRotate speed={0.005}>
          <group position={[0, -0.3, 0]}>
            {antennaType === 'omni' && <OmniAntennaModel color={p.color} />}
            {antennaType === 'panel' && <PanelAntennaModel color={p.color} />}
            {antennaType === 'parabolic' && <ParabolicAntennaModel color={p.color} />}
          </group>
        </AutoRotate>
      </Suspense>

      <OrbitControls enableZoom autoRotate={false} minPolarAngle={0.2} maxPolarAngle={Math.PI - 0.3} />
    </>
  );
}

export default function AntennaPattern3D({ defaultType = 'omni' }) {
  const [antennaType, setAntennaType] = useState(defaultType);

  const options = [
    { id: 'omni',      label: 'Omni Directional', color: 'blue',    desc: '360° ke segala arah' },
    { id: 'panel',     label: 'Panel / Sectoral',  color: 'emerald', desc: 'Beam ~60° terarah' },
    { id: 'parabolic', label: 'Parabolic Grid',    color: 'amber',   desc: 'Beam sangat sempit (<5°)' },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {options.map(opt => (
          <button key={opt.id} onClick={() => setAntennaType(opt.id)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all ${
              antennaType === opt.id
                ? opt.color === 'blue'    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                : opt.color === 'emerald' ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                :                          'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-400/30'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
            }`}>
            {opt.label}
            <span className="ml-2 text-xs font-normal opacity-75">({opt.desc})</span>
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl" style={{ height: '420px' }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 5], fov: 52 }} gl={{ antialias: true }}>
          <AntennaScene antennaType={antennaType} />
        </Canvas>
      </div>

      <div className="text-center text-xs text-slate-500">
        Drag untuk rotasi · Scroll untuk zoom · Pilih jenis antena di atas
      </div>
    </div>
  );
}