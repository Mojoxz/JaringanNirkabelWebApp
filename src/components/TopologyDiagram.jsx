import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// ── Tower Model ──────────────────────────────────────────────────
function TowerModel({ position, height = 2.5, color = '#94a3b8', isBase = false, label, description, isActive, onClick }) {
  const meshRef = useRef();
  const poleRadius = 0.06;
  const platformSize = isBase ? 0.5 : 0.35;

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.015;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={position} ref={meshRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Base platform */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[platformSize * 1.6, 0.08, platformSize * 1.6]} />
        <meshStandardMaterial color="#475569" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Main pole */}
      <mesh position={[0, height / 2 + 0.08, 0]} castShadow>
        <cylinderGeometry args={[poleRadius, poleRadius * 1.3, height, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Cross supports */}
      {[height * 0.3, height * 0.55, height * 0.8].map((y, i) => (
        <group key={i} position={[0, y + 0.08, 0]}>
          <mesh rotation={[0, 0, 0]}>
            <boxGeometry args={[platformSize * 0.8, 0.025, 0.025]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.4} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[platformSize * 0.8, 0.025, 0.025]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Antenna dish / panel at top */}
      {isBase ? (
        // Sectoral antenna panels (for PTMP base)
        <>
          {[0, Math.PI / 3, -Math.PI / 3].map((rot, i) => (
            <mesh key={i} position={[Math.sin(rot) * 0.15, height + 0.08, Math.cos(rot) * 0.15]} rotation={[0, rot, 0]} castShadow>
              <boxGeometry args={[0.18, 0.3, 0.04]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.5} />
            </mesh>
          ))}
          {/* Beacon light */}
          <mesh position={[0, height + 0.35, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
          </mesh>
        </>
      ) : (
        // Simple dish antenna (for PTP or client)
        <group position={[0, height + 0.08, 0]}>
          <mesh rotation={[0, 0, Math.PI / 12]} castShadow>
            <cylinderGeometry args={[0.2, 0.05, 0.08, 16]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.5} />
          </mesh>
        </group>
      )}

      {/* Status LED */}
      <mesh position={[0, height * 0.9, poleRadius + 0.02]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>

      {/* Label */}
      <Html position={[0, -0.25, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className="text-center whitespace-nowrap">
          <div className="text-[11px] font-semibold text-slate-300 drop-shadow-sm">{label}</div>
        </div>
      </Html>

      {/* Info popover */}
      {isActive && (
        <Html position={[0, height + 0.8, 0]} center distanceFactor={8}>
          <div className="bg-white text-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-200 max-w-[180px] text-center pointer-events-none">
            <p className="text-xs font-semibold mb-0.5">{label}</p>
            <p className="text-[10px] text-slate-500 leading-snug">{description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Signal Beam ──────────────────────────────────────────────────
function SignalBeam({ start, end, color = '#3b82f6' }) {
  const ref = useRef();
  const dashOffset = useRef(0);

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end]);

  useFrame((_, delta) => {
    dashOffset.current -= delta * 2;
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
      dashSize={0.3}
      gapSize={0.15}
      transparent
      opacity={0.75}
    />
  );
}

// ── Signal Pulse particles ───────────────────────────────────────
function SignalPulse({ start, end, color = '#3b82f6', speed = 0.8 }) {
  const ref = useRef();
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame((state) => {
    if (ref.current) {
      const t = ((state.clock.elapsedTime * speed) % 1);
      ref.current.position.lerpVectors(startVec, endVec, t);
      const scale = 0.8 + Math.sin(t * Math.PI) * 0.4;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
    </mesh>
  );
}

// ── Ground Plane with Grid ───────────────────────────────────────
function GroundPlane() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1f2e" roughness={0.9} />
      </mesh>
      {/* Grid */}
      <gridHelper args={[20, 20, '#334155', '#1e293b']} position={[0, 0.005, 0]} />
    </group>
  );
}

// ── PTP Scene ────────────────────────────────────────────────────
function PTPScene({ activeNode, onNodeClick }) {
  const towerA = { pos: [-3, 0, 0], height: 2.5, label: 'Site A (HQ)', desc: 'Kantor Pusat dengan koneksi internet utama dan antena dish directional.', color: '#3b82f6' };
  const towerB = { pos: [3, 0, 0], height: 2.5, label: 'Site B (Branch)', desc: 'Kantor Cabang menerima koneksi via antena dish PTP. Jarak 5-30 km.', color: '#22c55e' };

  const beamStartY = towerA.height + 0.08;
  const beamEndY = towerB.height + 0.08;

  return (
    <>
      <GroundPlane />

      <TowerModel
        position={towerA.pos} height={towerA.height} color={towerA.color}
        label={towerA.label} description={towerA.desc}
        isActive={activeNode === 'a'} onClick={() => onNodeClick('a')}
      />
      <TowerModel
        position={towerB.pos} height={towerB.height} color={towerB.color}
        label={towerB.label} description={towerB.desc}
        isActive={activeNode === 'b'} onClick={() => onNodeClick('b')}
      />

      {/* Signal beams */}
      <SignalBeam start={[-3, beamStartY, 0]} end={[3, beamEndY, 0]} color="#60a5fa" />
      <SignalPulse start={[-3, beamStartY, 0]} end={[3, beamEndY, 0]} color="#3b82f6" speed={0.5} />
      <SignalPulse start={[3, beamEndY, 0]} end={[-3, beamStartY, 0]} color="#22c55e" speed={0.4} />

      {/* Distance label */}
      <Html position={[0, 0.3, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">← 10 km →</div>
      </Html>
    </>
  );
}

// ── PTMP Scene ───────────────────────────────────────────────────
function PTMPScene({ activeNode, onNodeClick }) {
  const base = { pos: [-3, 0, 0], height: 3.2, label: 'Base Station (AP)', desc: 'Access Point dengan antena Sectoral — memancar 120° ke arah klien.', color: '#3b82f6' };
  const clients = [
    { id: 'c1', pos: [3, 0, -2.5], height: 1.8, label: 'Client 1', desc: 'Rumah pelanggan 1 menggunakan antena CPE directional.', color: '#22c55e' },
    { id: 'c2', pos: [3.5, 0, 0], height: 1.8, label: 'Client 2', desc: 'Rumah pelanggan 2 dengan CPE panel.', color: '#22c55e' },
    { id: 'c3', pos: [3, 0, 2.5], height: 1.8, label: 'Client 3', desc: 'Kantor kecil pelanggan 3.', color: '#22c55e' },
  ];

  const baseTopY = base.height + 0.08;

  return (
    <>
      <GroundPlane />

      <TowerModel
        position={base.pos} height={base.height} color={base.color} isBase
        label={base.label} description={base.desc}
        isActive={activeNode === 'base'} onClick={() => onNodeClick('base')}
      />

      {clients.map((c, i) => (
        <group key={c.id}>
          <TowerModel
            position={c.pos} height={c.height} color={c.color}
            label={c.label} description={c.desc}
            isActive={activeNode === c.id} onClick={() => onNodeClick(c.id)}
          />
          <SignalBeam start={[-3, baseTopY, 0]} end={[c.pos[0], c.height + 0.08, c.pos[2]]} color="#60a5fa" />
          <SignalPulse start={[-3, baseTopY, 0]} end={[c.pos[0], c.height + 0.08, c.pos[2]]} color="#3b82f6" speed={0.35 + i * 0.1} />
        </group>
      ))}
    </>
  );
}

// ── Main Scene ───────────────────────────────────────────────────
function TopoScene({ type, activeNode, onNodeClick }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-3, 4, -4]} intensity={0.3} />

      {type === 'ptp' ? (
        <PTPScene activeNode={activeNode} onNodeClick={onNodeClick} />
      ) : (
        <PTMPScene activeNode={activeNode} onNodeClick={onNodeClick} />
      )}

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.15}
        minDistance={4}
        maxDistance={14}
        zoomSpeed={0.8}
      />
    </>
  );
}

// ── Public export ────────────────────────────────────────────────
export default function TopologyDiagram({ type }) {
  const [activeNode, setActiveNode] = useState(null);
  const toggleNode = (id) => setActiveNode(prev => prev === id ? null : id);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800" style={{ height: '380px' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 4, 8], fov: 50 }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <TopoScene type={type} activeNode={activeNode} onNodeClick={toggleNode} />
        </Suspense>
      </Canvas>

      {/* Header overlay */}
      <div className="absolute top-3 left-4 pointer-events-none">
        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
          {type === 'ptp' ? 'Point-to-Point' : 'Point-to-Multipoint'}
        </div>
        <div className="text-sm font-bold text-white">Topologi 3D Interaktif</div>
      </div>

      <div className="absolute bottom-3 left-4 text-slate-500 text-[10px] font-mono pointer-events-none">
        Drag rotasi · Scroll zoom · Klik tower untuk info
      </div>
    </div>
  );
}
