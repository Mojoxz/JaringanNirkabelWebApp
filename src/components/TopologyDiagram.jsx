import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line, Sky } from '@react-three/drei';
import * as THREE from 'three';

// ── Environment Models ───────────────────────────────────────────
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

function HouseModel({ position, scale = 1, color = "#e2e8f0" }) {
  return (
    <group position={position} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.5, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.4, 4]} />
        <meshStandardMaterial color="#991b1b" roughness={0.8} flatShading />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.15, 0.255]}>
        <boxGeometry args={[0.15, 0.3, 0.02]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
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

function HillModel({ position, scale = 1, color = "#224022" }) {
  return (
    <mesh position={position} scale={scale} receiveShadow>
      <sphereGeometry args={[1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} roughness={1} flatShading />
    </mesh>
  );
}

function CloudModel({ position, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.position.x += 0.002 * scale;
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
        <>
          {[0, Math.PI / 3, -Math.PI / 3].map((rot, i) => (
            <mesh key={i} position={[Math.sin(rot) * 0.15, height + 0.08, Math.cos(rot) * 0.15]} rotation={[0, rot, 0]} castShadow>
              <boxGeometry args={[0.18, 0.3, 0.04]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.5} />
            </mesh>
          ))}
          <mesh position={[0, height + 0.35, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
          </mesh>
        </>
      ) : (
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
        <div className="text-[11px] font-semibold text-white drop-shadow-md">{label}</div>
      </Html>

      {/* Info popover */}
      {isActive && (
        <Html position={[0, height + 1.2, 0]} center distanceFactor={8}>
          <div className="bg-white text-slate-800 px-3 py-2 rounded-lg shadow-xl border border-slate-200 max-w-[180px] text-center pointer-events-none relative">
            <p className="text-xs font-bold mb-0.5">{label}</p>
            <p className="text-[10px] text-slate-500 leading-snug">{description}</p>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-slate-200" />
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Signals ──────────────────────────────────────────────────────
function SignalBeam({ start, end, color = '#3b82f6' }) {
  const ref = useRef();
  const dashOffset = useRef(0);
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);

  useFrame((_, delta) => {
    dashOffset.current -= delta * 2;
    if (ref.current) ref.current.material.dashOffset = dashOffset.current;
  });

  return (
    <Line
      ref={ref} points={points} color={color} lineWidth={2.5}
      dashed dashSize={0.3} gapSize={0.15} transparent opacity={0.75}
    />
  );
}

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

// ── PTP Scene (Mountains & Distance) ─────────────────────────────
function PTPScene({ activeNode, onNodeClick }) {
  const towerA = { pos: [-3.5, 0.8, 0], height: 2.5, label: 'Site A (HQ)', desc: 'Pusat di pegunungan.', color: '#3b82f6' };
  const towerB = { pos: [3.5, 0.5, 0], height: 2.5, label: 'Site B (Branch)', desc: 'Cabang di bukit seberang.', color: '#22c55e' };

  const beamStartY = towerA.pos[1] + towerA.height + 0.08;
  const beamEndY = towerB.pos[1] + towerB.height + 0.08;

  return (
    <>
      <Sky sunPosition={[10, 10, 10]} turbidity={0.5} rayleigh={0.8} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#224a22" roughness={0.9} />
      </mesh>

      {/* Terrain features */}
      <HillModel position={[-3.5, 0, 0]} scale={[2, 0.8, 2]} color="#2a522a" />
      <HillModel position={[3.5, 0, 0]} scale={[1.5, 0.5, 1.5]} color="#2a522a" />
      
      {/* Background mountains */}
      <MountainModel position={[-6, 1, -5]} scale={[2, 2.5, 2]} />
      <MountainModel position={[0, 0, -8]} scale={[3, 3.5, 3]} color="#1f3b1f" />
      <MountainModel position={[6, 0.5, -6]} scale={[2.5, 2.8, 2.5]} />

      {/* Trees */}
      <TreeModel position={[-2, 0, -2]} scale={1.2} />
      <TreeModel position={[-4.5, 0.5, -1]} scale={0.9} />
      <TreeModel position={[4, 0.2, 1.5]} scale={1.1} />
      <TreeModel position={[2, 0, -3]} scale={1.5} />
      
      <CloudModel position={[-4, 5, -3]} scale={1.5} />
      <CloudModel position={[2, 6, -5]} scale={2} />

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

      <SignalBeam start={[-3.5, beamStartY, 0]} end={[3.5, beamEndY, 0]} color="#60a5fa" />
      <SignalPulse start={[-3.5, beamStartY, 0]} end={[3.5, beamEndY, 0]} color="#3b82f6" speed={0.4} />
      <SignalPulse start={[3.5, beamEndY, 0]} end={[-3.5, beamStartY, 0]} color="#22c55e" speed={0.3} />

      <Html position={[0, 0.5, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className="text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded shadow-lg backdrop-blur-sm border border-slate-700/50">
          ← Jarak Jauh (10+ km) →
        </div>
      </Html>
    </>
  );
}

// ── PTMP Scene (Suburban / City) ─────────────────────────────────
function PTMPScene({ activeNode, onNodeClick }) {
  const base = { pos: [-2, 0.5, 0], height: 3.2, label: 'Base Station (AP)', desc: 'Access Point ISP.', color: '#3b82f6' };
  const clients = [
    { id: 'c1', pos: [3, 0, -2.5], housePos: [3.8, 0, -2.5], height: 1.8, label: 'Client 1', desc: 'Rumah pelanggan 1.', color: '#22c55e', houseColor: '#e2e8f0' },
    { id: 'c2', pos: [3.5, 0, 0.5], housePos: [4.3, 0, 0.5], height: 1.8, label: 'Client 2', desc: 'Rumah pelanggan 2.', color: '#22c55e', houseColor: '#fef08a' },
    { id: 'c3', pos: [2, 0, 3], housePos: [2.8, 0, 3], height: 1.8, label: 'Client 3', desc: 'Kantor pelanggan 3.', color: '#22c55e', houseColor: '#bae6fd' },
  ];

  const baseTopY = base.pos[1] + base.height + 0.08;

  return (
    <>
      <Sky sunPosition={[5, 8, -5]} turbidity={1} rayleigh={1.2} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />

      {/* Ground - suburban grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#4ade80" roughness={1} />
      </mesh>
      
      {/* Small hill for Base Station */}
      <HillModel position={[-2, 0, 0]} scale={[1.5, 0.5, 1.5]} color="#22c55e" />

      {/* Roads / Paths */}
      <mesh position={[2.5, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 1.5]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} />
      </mesh>
      <mesh position={[3.2, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.2, 8]} />
        <meshStandardMaterial color="#cbd5e1" roughness={1} />
      </mesh>

      {/* Trees in town */}
      <TreeModel position={[-1, 0, 2]} scale={0.8} />
      <TreeModel position={[1, 0, -1]} scale={1.2} />
      <TreeModel position={[2, 0, -4]} scale={1} />
      
      <CloudModel position={[-3, 4, -4]} scale={1.2} />
      <CloudModel position={[3, 5, 2]} scale={1.5} />

      <TowerModel
        position={base.pos} height={base.height} color={base.color} isBase
        label={base.label} description={base.desc}
        isActive={activeNode === 'base'} onClick={() => onNodeClick('base')}
      />

      {clients.map((c, i) => (
        <group key={c.id}>
          <HouseModel position={c.housePos} color={c.houseColor} />
          <TowerModel
            position={c.pos} height={c.height} color={c.color}
            label={c.label} description={c.desc}
            isActive={activeNode === c.id} onClick={() => onNodeClick(c.id)}
          />
          <SignalBeam start={[-2, baseTopY, 0]} end={[c.pos[0], c.height + 0.08, c.pos[2]]} color="#60a5fa" />
          <SignalPulse start={[-2, baseTopY, 0]} end={[c.pos[0], c.height + 0.08, c.pos[2]]} color="#3b82f6" speed={0.35 + i * 0.1} />
        </group>
      ))}
    </>
  );
}

// ── Main Scene ───────────────────────────────────────────────────
function TopoScene({ type, activeNode, onNodeClick }) {
  return (
    <>
      {type === 'ptp' ? (
        <PTPScene activeNode={activeNode} onNodeClick={onNodeClick} />
      ) : (
        <PTMPScene activeNode={activeNode} onNodeClick={onNodeClick} />
      )}
      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.48} // Prevents looking under the ground
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
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 border border-slate-200 shadow-inner" style={{ height: '400px' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 4, 9], fov: 50 }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <TopoScene type={type} activeNode={activeNode} onNodeClick={toggleNode} />
        </Suspense>
      </Canvas>

      {/* Header overlay */}
      <div className="absolute top-3 left-4 pointer-events-none">
        <div className="text-[10px] text-slate-700 font-mono uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/40 mb-1 inline-block">
          {type === 'ptp' ? 'Point-to-Point' : 'Point-to-Multipoint'}
        </div>
        <div className="text-sm font-bold text-slate-800 drop-shadow-sm">Topologi Lingkungan 3D</div>
      </div>

      <div className="absolute bottom-3 left-4 text-slate-600 text-[10px] font-mono pointer-events-none bg-white/50 px-2 py-1 rounded backdrop-blur-sm border border-white/40">
        Drag rotasi · Scroll zoom · Klik tower untuk info
      </div>
    </div>
  );
}
