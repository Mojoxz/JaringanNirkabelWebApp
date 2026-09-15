import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Html, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ─── Omni Directional Pattern (Toroid) ────────────────────────
function OmniPattern({ visible, color }) {
  const ref = useRef();
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.004; });

  const geometry = useMemo(() => {
    const geo = new THREE.TorusGeometry(1.4, 0.6, 32, 64);
    return geo;
  }, []);

  if (!visible) return null;
  return (
    <mesh ref={ref} geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.45}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}

// ─── Directional / Cone Pattern ────────────────────────────────
function DirectionalPattern({ visible, color, angle = Math.PI / 6 }) {
  const ref = useRef();
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.005; });

  const geometry = useMemo(() => {
    return new THREE.ConeGeometry(Math.tan(angle) * 2.2, 2.2, 48, 1, true);
  }, [angle]);

  if (!visible) return null;
  return (
    <group ref={ref}>
      <mesh geometry={geometry} position={[0, 1.1, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Back small lobe */}
      <mesh position={[0, -0.4, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.18, 0.5, 16, 1, true]} />
        <meshStandardMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ─── Parabolic (Very narrow beam) ─────────────────────────────
function ParabolicPattern({ visible, color }) {
  const ref = useRef();
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.005; });

  const geometry = useMemo(() => {
    return new THREE.ConeGeometry(0.12, 3.5, 16, 1, true);
  }, []);

  if (!visible) return null;
  return (
    <group ref={ref}>
      <mesh geometry={geometry} position={[0, 1.75, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── Antenna Body ──────────────────────────────────────────────
function AntennaBody({ type }) {
  const bodyRef = useRef();
  useFrame(() => { if (bodyRef.current) bodyRef.current.rotation.y += 0.006; });

  const antennaMat = <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.85} envMapIntensity={1.3} />;

  if (type === 'omni') {
    return (
      <group>
        {/* Pole */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.08, 1.8, 12]} />
          {antennaMat}
        </mesh>
        {/* Cap */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          {antennaMat}
        </mesh>
      </group>
    );
  }

  if (type === 'panel') {
    return (
      <group ref={bodyRef}>
        <mesh>
          <boxGeometry args={[0.8, 1.4, 0.12]} />
          {antennaMat}
        </mesh>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[0.9, 1.5, 0.06]} />
          <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.6} />
        </mesh>
      </group>
    );
  }

  if (type === 'parabolic') {
    return (
      <group ref={bodyRef}>
        {/* Grid dish */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.04, 8, 32]} />
          {antennaMat}
        </mesh>
        {/* Spoke wires */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} rotation={[Math.PI / 2, 0, angle]}>
              <cylinderGeometry args={[0.015, 0.015, 1.4, 4]} />
              {antennaMat}
            </mesh>
          );
        })}
        {/* Feed arm */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
          {antennaMat}
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.5} />
        </mesh>
      </group>
    );
  }

  return null;
}

// ─── Main Scene ─────────────────────────────────────────────────
function AntennaScene({ antennaType }) {
  const patternColors = {
    omni: '#3b82f6',
    panel: '#10b981',
    parabolic: '#f59e0b',
  };
  const typeNames = {
    omni: 'Antena Omni Directional',
    panel: 'Antena Panel / Sectoral',
    parabolic: 'Antena Parabolic Grid',
  };
  const color = patternColors[antennaType] || '#3b82f6';

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 3]} intensity={1.1} color="#ffffff" castShadow />
      <pointLight position={[4, 4, 4]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-3, -3, 3]} intensity={0.9} color={color} />
      <Environment preset="city" environmentIntensity={0.65} />

      {/* Grid floor + grounded shadow */}
      <gridHelper args={[8, 20, '#1e293b', '#1e293b']} position={[0, -1.8, 0]} />
      <ContactShadows position={[0, -1.79, 0]} opacity={0.5} scale={10} blur={2.2} far={2} color="#000000" />

      {/* Antenna body */}
      <group position={[0, -0.5, 0]}>
        <AntennaBody type={antennaType} />
      </group>

      {/* Always-on label identifying which antenna type is shown */}
      <Html position={[0, 1.6, 0]} center distanceFactor={9} occlude sprite>
        <div
          className="pointer-events-none whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm border"
          style={{ background: 'rgba(15,23,42,0.7)', color, borderColor: color }}
        >
          {typeNames[antennaType]}
        </div>
      </Html>

      {/* Radiation patterns */}
      <OmniPattern visible={antennaType === 'omni'} color={color} />
      <DirectionalPattern visible={antennaType === 'panel'} color={color} angle={Math.PI / 5} />
      <ParabolicPattern visible={antennaType === 'parabolic'} color={color} />

      <OrbitControls enableZoom autoRotate autoRotateSpeed={0.8} minPolarAngle={0.2} maxPolarAngle={Math.PI - 0.2} />
    </>
  );
}

// ─── Public Export ──────────────────────────────────────────────
export default function AntennaPattern3D({ defaultType = 'omni' }) {
  const [antennaType, setAntennaType] = useState(defaultType);

  const options = [
    { id: 'omni', label: 'Omni Directional', color: 'blue', desc: '360° ke segala arah' },
    { id: 'panel', label: 'Panel / Directional', color: 'emerald', desc: 'Beam ~60° terarah' },
    { id: 'parabolic', label: 'Parabolic Grid', color: 'amber', desc: 'Beam sangat sempit (<5°)' },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setAntennaType(opt.id)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all ${
              antennaType === opt.id
                ? opt.color === 'blue' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : opt.color === 'emerald' ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-400/30'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
            }`}
          >
            {opt.label}
            <span className="ml-2 text-xs font-normal opacity-75">({opt.desc})</span>
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div className="w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl" style={{ height: '380px' }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 4.5], fov: 55 }} gl={{ antialias: true }}>
          <AntennaScene antennaType={antennaType} />
        </Canvas>
      </div>

      {/* Caption */}
      <div className="text-center text-sm text-slate-500 font-mono">
        Drag untuk rotasi · Scroll untuk zoom · Pilih antena untuk melihat pola pancaran berbeda
      </div>
    </div>
  );
}