import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Line, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── Realistic Access Point model ──────────────────────────────────
function AccessPointModel({ isHub = false }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.018;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  const bodyMat = <meshStandardMaterial color="#e8ecf0" roughness={0.28} metalness={0.55} />;
  const darkMat = <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.35} />;
  const ledMat  = <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.8} />;

  return (
    <group ref={ref}>
      {/* Main flat body */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.1, 0.75]} />
        {bodyMat}
      </mesh>
      {/* Slight dome top */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.44, 0.45, 0.02, 32]} />
        {bodyMat}
      </mesh>
      {/* Bottom darker base */}
      <mesh position={[0, -0.065, 0]}>
        <boxGeometry args={[0.88, 0.02, 0.73]} />
        {darkMat}
      </mesh>
      {/* LED strip row */}
      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.062, 0.3]}>
          <boxGeometry args={[0.04, 0.008, 0.012]} />
          <meshStandardMaterial
            color={i === 0 ? '#3b82f6' : '#22c55e'}
            emissive={i === 0 ? '#3b82f6' : '#22c55e'}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
      {/* Two internal antennas visible as ridges on top */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.075, 0]}>
          <boxGeometry args={[0.025, 0.025, 0.72]} />
          <meshStandardMaterial color="#c8d0da" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
      {/* Port row on back */}
      {[-0.25, -0.08, 0.08, 0.25].map((x, i) => (
        <mesh key={i} position={[x, -0.04, -0.38]}>
          <boxGeometry args={[0.07, 0.045, 0.018]} />
          <meshStandardMaterial color="#1a202c" roughness={0.7} metalness={0.3} />
        </mesh>
      ))}
      {/* Cisco logo ridge placeholder */}
      <mesh position={[0, 0.058, 0.05]}>
        <boxGeometry args={[0.22, 0.003, 0.06]} />
        <meshStandardMaterial color="#c8d0da" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Mounting plate underneath */}
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 20]} />
        {darkMat}
      </mesh>
    </group>
  );
}

// ── Realistic Router model ─────────────────────────────────────────
function RouterModel() {
  const bodyMat = <meshStandardMaterial color="#1a1c2e" roughness={0.45} metalness={0.3} />;
  const plasticMat = <meshStandardMaterial color="#14162a" roughness={0.6} metalness={0.15} />;

  return (
    <group>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[0.72, 0.14, 0.42]} />
        {bodyMat}
      </mesh>
      {/* Ventilation grille on top */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-0.24 + i * 0.12, 0.072, 0]}>
          <boxGeometry args={[0.06, 0.005, 0.38]} />
          <meshStandardMaterial color="#0f1020" roughness={0.8} />
        </mesh>
      ))}
      {/* Front LED row */}
      {[-0.22, -0.1, 0.02, 0.14, 0.26].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.212]}>
          <boxGeometry args={[0.025, 0.025, 0.01]} />
          <meshStandardMaterial
            color={i < 2 ? '#22c55e' : '#3b82f6'}
            emissive={i < 2 ? '#22c55e' : '#3b82f6'}
            emissiveIntensity={1.6}
          />
        </mesh>
      ))}
      {/* 3 external antennas */}
      {[-0.28, 0, 0.28].map((x, i) => (
        <group key={i} position={[x, 0, -0.24]}>
          {/* Hinge */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.06, 12]} />
            <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Antenna rod */}
          <mesh position={[0, 0.32, 0]}>
            <cylinderGeometry args={[0.015, 0.018, 0.6, 10]} />
            <meshStandardMaterial color="#1f2937" roughness={0.5} metalness={0.45} />
          </mesh>
          {/* Tip */}
          <mesh position={[0, 0.64, 0]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.5} />
          </mesh>
        </group>
      ))}
      {/* Port area back */}
      <mesh position={[0, -0.01, -0.22]}>
        <boxGeometry args={[0.58, 0.09, 0.01]} />
        {plasticMat}
      </mesh>
      {/* Ethernet ports */}
      {[-0.18, -0.06, 0.06, 0.18].map((x, i) => (
        <mesh key={i} position={[x, -0.01, -0.218]}>
          <boxGeometry args={[0.06, 0.045, 0.01]} />
          <meshStandardMaterial color="#0d0f1a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ── Realistic Tower/BTS model ─────────────────────────────────────
function TowerModel() {
  const metalMat = <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />;
  const darkMat  = <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.65} />;

  return (
    <group>
      {/* Main triangular lattice tower - simplified as tapered box */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.12, 1.6, 4]} />
        {darkMat}
      </mesh>
      {/* Cross braces */}
      {[-0.55, -0.15, 0.25, 0.65].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, i * 0.4, 0]}>
          <boxGeometry args={[0.18 - i * 0.02, 0.014, 0.014]} />
          {metalMat}
        </mesh>
      ))}
      {/* Platform */}
      <mesh position={[0, 0.84, 0]}>
        <boxGeometry args={[0.26, 0.025, 0.26]} />
        {metalMat}
      </mesh>
      {/* Panel antennas at top (3 sector) */}
      {[0, Math.PI * 2 / 3, (Math.PI * 4) / 3].map((angle, i) => (
        <group key={i} position={[Math.sin(angle) * 0.14, 1.08, Math.cos(angle) * 0.14]} rotation={[0, angle, 0]}>
          <mesh>
            <boxGeometry args={[0.07, 0.38, 0.035]} />
            <meshStandardMaterial color="#c8d0d8" roughness={0.22} metalness={0.75} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <boxGeometry args={[0.065, 0.375, 0.005]} />
            <meshStandardMaterial color="#e8edf2" roughness={0.5} metalness={0.05} />
          </mesh>
        </group>
      ))}
      {/* Mast above */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.015, 0.02, 0.22, 8]} />
        {metalMat}
      </mesh>
      {/* Red aviation light */}
      <mesh position={[0, 1.52, 0]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.8} />
      </mesh>
      {/* Base mount */}
      <mesh position={[0, -0.86, 0]}>
        <boxGeometry args={[0.28, 0.06, 0.28]} />
        {darkMat}
      </mesh>
    </group>
  );
}

// ── Realistic Laptop model ─────────────────────────────────────────
function LaptopModel() {
  const bodyMat  = <meshStandardMaterial color="#b0b8c0" roughness={0.2} metalness={0.82} />;
  const screenMat = <meshStandardMaterial color="#0a0f1e" roughness={0.6} metalness={0.1} />;
  const keyMat   = <meshStandardMaterial color="#9ca3af" roughness={0.5} metalness={0.3} />;

  return (
    <group>
      {/* Base */}
      <mesh position={[0, 0, 0.08]} castShadow>
        <boxGeometry args={[0.72, 0.04, 0.5]} />
        {bodyMat}
      </mesh>
      {/* Keyboard area */}
      <mesh position={[0, 0.025, 0.08]}>
        <boxGeometry args={[0.62, 0.005, 0.38]} />
        {keyMat}
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.026, 0.28]}>
        <boxGeometry args={[0.18, 0.003, 0.13]} />
        <meshStandardMaterial color="#8b929a" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Screen lid */}
      <group position={[0, 0.02, -0.17]} rotation={[-Math.PI / 2 + 0.35, 0, 0]}>
        {/* Lid outer */}
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.72, 0.5, 0.025]} />
          {bodyMat}
        </mesh>
        {/* Screen bezel */}
        <mesh position={[0, 0.26, 0.014]}>
          <boxGeometry args={[0.66, 0.44, 0.005]} />
          {screenMat}
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0.26, 0.016]}>
          <boxGeometry args={[0.60, 0.38, 0.002]} />
          <meshStandardMaterial color="#1e40af" emissive="#1e40af" emissiveIntensity={0.6} transparent opacity={0.85} />
        </mesh>
        {/* Camera dot */}
        <mesh position={[0, 0.49, 0.015]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial color="#374151" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// ── Smartphone model ───────────────────────────────────────────────
function SmartphoneModel() {
  const bodyMat   = <meshStandardMaterial color="#1c1c1e" roughness={0.18} metalness={0.85} />;
  const screenMat = <meshStandardMaterial color="#0a0f1e" roughness={0.1} metalness={0.05} />;

  return (
    <group>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.24, 0.5, 0.034]} />
        {bodyMat}
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.019]}>
        <boxGeometry args={[0.21, 0.46, 0.003]} />
        {screenMat}
      </mesh>
      {/* Screen blue glow */}
      <mesh position={[0, 0.01, 0.021]}>
        <boxGeometry args={[0.19, 0.38, 0.001]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.55} transparent opacity={0.8} />
      </mesh>
      {/* Notch / island */}
      <mesh position={[0, 0.2, 0.022]}>
        <boxGeometry args={[0.06, 0.018, 0.002]} />
        <meshStandardMaterial color="#0a0f1e" roughness={0.8} />
      </mesh>
      {/* Side button */}
      <mesh position={[0.123, 0.06, 0]}>
        <boxGeometry args={[0.006, 0.07, 0.022]} />
        {bodyMat}
      </mesh>
      {/* Volume buttons */}
      {[-0.02, 0.04].map((y, i) => (
        <mesh key={i} position={[-0.123, y, 0]}>
          <boxGeometry args={[0.006, 0.055, 0.022]} />
          {bodyMat}
        </mesh>
      ))}
      {/* Camera bump */}
      <mesh position={[-0.05, 0.16, -0.022]}>
        <boxGeometry args={[0.11, 0.11, 0.01]} />
        <meshStandardMaterial color="#131316" roughness={0.25} metalness={0.7} />
      </mesh>
      <mesh position={[-0.06, 0.18, -0.029]}>
        <cylinderGeometry args={[0.024, 0.024, 0.01, 20]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.1} metalness={0.6} />
      </mesh>
    </group>
  );
}

// ── IoT sensor / smart device ─────────────────────────────────────
function IoTModel() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.material.emissiveIntensity = 0.8 + Math.sin(s.clock.elapsedTime * 3) * 0.6;
  });

  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.28, 0.18, 0.28]} />
        <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.4} />
      </mesh>
      {/* Top face */}
      <mesh position={[0, 0.095, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 0.01, 20]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Status LED */}
      <mesh ref={ref} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.022, 10, 10]} />
        <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={1} />
      </mesh>
      {/* Antenna stub */}
      <mesh position={[0.1, 0.22, 0]}>
        <cylinderGeometry args={[0.008, 0.01, 0.2, 8]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Port */}
      <mesh position={[0, -0.062, 0.14]}>
        <boxGeometry args={[0.08, 0.04, 0.01]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ── Server model ──────────────────────────────────────────────────
function ServerModel() {
  return (
    <group>
      {[0, 0.15, 0.3].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* 1U chassis */}
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.09, 0.38]} />
            <meshStandardMaterial color={i === 0 ? '#1e293b' : '#0f172a'} roughness={0.45} metalness={0.55} />
          </mesh>
          {/* Front panel */}
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.58, 0.07, 0.01]} />
            <meshStandardMaterial color="#0a0f1e" roughness={0.6} />
          </mesh>
          {/* LED strip */}
          {[-0.22, -0.14, -0.06, 0.02].map((x, j) => (
            <mesh key={j} position={[x, 0.01, 0.206]}>
              <boxGeometry args={[0.02, 0.015, 0.003]} />
              <meshStandardMaterial
                color={j % 2 === 0 ? '#22c55e' : '#3b82f6'}
                emissive={j % 2 === 0 ? '#22c55e' : '#3b82f6'}
                emissiveIntensity={1.5}
              />
            </mesh>
          ))}
          {/* Drive bays */}
          {[-0.12, 0, 0.12].map((x, k) => (
            <mesh key={k} position={[x + 0.18, 0, 0.198]}>
              <boxGeometry args={[0.08, 0.055, 0.005]} />
              <meshStandardMaterial color="#1a2030" roughness={0.7} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Rack frame */}
      {[-0.32, 0.32].map((x, i) => (
        <mesh key={i} position={[x, 0.2, 0]}>
          <boxGeometry args={[0.025, 0.56, 0.4]} />
          <meshStandardMaterial color="#334155" roughness={0.35} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ── Signal Particle ────────────────────────────────────────────────
function SignalParticle({ start, end, color, speed = 1, delay = 0 }) {
  const ref = useRef();
  const progress = useRef(delay % 1);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec   = useMemo(() => new THREE.Vector3(...end), [end]);
  const tmp       = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (ref.current) {
      progress.current = (progress.current + delta * speed * 0.38) % 1;
      tmp.lerpVectors(startVec, endVec, progress.current);
      ref.current.position.copy(tmp);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

// ── Connection beam ────────────────────────────────────────────────
function ConnectionBeam({ start, end, color }) {
  const pts = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  return <Line points={pts} color={color} lineWidth={1.0} transparent opacity={0.3} />;
}

// ── Main network scene ─────────────────────────────────────────────
function Scene({ activeNode, onNodeClick }) {
  const nodes = [
    { id: 'tower',  pos: [-3.2, 0.8, -0.5], color: '#8b5cf6', label: 'Tower BTS',  model: 'tower',      scale: 0.55 },
    { id: 'router', pos: [2.0, 0.0, -1.2],  color: '#10b981', label: 'Router',     model: 'router',     scale: 0.7 },
    { id: 'laptop', pos: [1.2, 0.0, 1.0],   color: '#f59e0b', label: 'Laptop',     model: 'laptop',     scale: 0.7 },
    { id: 'phone',  pos: [2.8, 0.0, 1.2],   color: '#ec4899', label: 'Smartphone', model: 'phone',      scale: 0.85 },
    { id: 'iot',    pos: [3.2, 0.0, -0.5],  color: '#14b8a6', label: 'IoT Device', model: 'iot',        scale: 0.85 },
    { id: 'server', pos: [-0.5, 0.4, -1.5], color: '#f97316', label: 'Server',     model: 'server',     scale: 0.55 },
  ];

  const edges = [
    { from: [0, 0.2, 0], to: [-3.2, 0.8, -0.5], color: '#8b5cf6', speed: 0.8, delay: 0.0 }, // AP to Tower
    { from: [0, 0.2, 0], to: [2.0, 0.0, -1.2],  color: '#10b981', speed: 1.0, delay: 0.3 }, // AP to Router
    { from: [0, 0.2, 0], to: [1.2, 0.0, 1.0],   color: '#f59e0b', speed: 0.7, delay: 0.5 }, // AP to Laptop
    { from: [0, 0.2, 0], to: [2.8, 0.0, 1.2],   color: '#ec4899', speed: 0.9, delay: 0.2 }, // AP to Phone
    { from: [0, 0.2, 0], to: [3.2, 0.0, -0.5],  color: '#14b8a6', speed: 0.75, delay: 0.7 }, // AP to IoT
    { from: [0, 0.2, 0], to: [-0.5, 0.4, -1.5], color: '#f97316', speed: 0.65, delay: 0.9 }, // AP to Server
    { from: [2.0, 0.0, -1.2], to: [3.2, 0.0, -0.5], color: '#6ee7b7', speed: 0.5, delay: 0.1 }, // Router to IoT
    { from: [-3.2, 0.8, -0.5], to: [-0.5, 0.4, -1.5], color: '#c4b5fd', speed: 0.55, delay: 0.4 }, // Tower to Server
  ];

  const renderModel = (model, scale) => {
    switch (model) {
      case 'tower':  return <group scale={scale}><TowerModel /></group>;
      case 'router': return <group scale={scale}><RouterModel /></group>;
      case 'laptop': return <group scale={scale}><LaptopModel /></group>;
      case 'phone':  return <group scale={scale}><SmartphoneModel /></group>;
      case 'iot':    return <group scale={scale}><IoTModel /></group>;
      case 'server': return <group scale={scale}><ServerModel /></group>;
      default: return null;
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[6, 5, 6]} intensity={1.1} color="#60a5fa" />
      <pointLight position={[-5, -5, 4]} intensity={0.8} color="#a78bfa" />
      <Environment preset="city" environmentIntensity={0.85} />
      
      {/* Unified Transparent Floor Plan */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[9, 0.1, 6]} />
        <meshPhysicalMaterial color="#0f172a" transparent opacity={0.75} roughness={0.1} metalness={0.8} clearcoat={1} />
      </mesh>
      <gridHelper args={[9, 18, '#3b82f6', '#1e293b']} position={[0, -0.14, 0]} />

      {/* Room Dividers (Glass Walls) */}
      {/* Divider between Server Room and AP/Office */}
      <mesh position={[-1.6, 0.6, -1]} receiveShadow>
        <boxGeometry args={[0.05, 1.5, 4]} />
        <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.2} roughness={0.1} transmission={0.9} />
      </mesh>
      {/* Divider for Outdoor (Tower) */}
      <mesh position={[-2.4, 0.6, 1]} rotation={[0, Math.PI/2, 0]} receiveShadow>
        <boxGeometry args={[0.05, 1.5, 2]} />
        <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.2} roughness={0.1} transmission={0.9} />
      </mesh>

      {/* Office Desk */}
      <mesh position={[2.0, 0.1, -1.2]} receiveShadow castShadow>
        <boxGeometry args={[2.5, 0.6, 1.0]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>

      <ContactShadows position={[0, -0.3, 0]} opacity={0.8} scale={18} blur={2.5} far={3} />

      {/* Connection lines */}
      {edges.map((e, i) => <ConnectionBeam key={i} start={e.from} end={e.to} color={e.color} />)}

      {/* Signal particles */}
      {edges.map((e, i) => <SignalParticle key={i} start={e.from} end={e.to} color={e.color} speed={e.speed} delay={e.delay} />)}
      {edges.map((e, i) => <SignalParticle key={`r-${i}`} start={e.to} end={e.from} color={e.color} speed={e.speed * 0.65} delay={e.delay + 0.5} />)}

      {/* Central AP hub */}
      <Float speed={1.2} floatIntensity={0.2} rotationIntensity={0.05}>
        <group position={[0, 0.2, 0]}>
          <AccessPointModel isHub />
          <Html position={[0, -0.25, 0]} center distanceFactor={9}>
            <div className="pointer-events-none whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold bg-blue-600/90 text-white border border-blue-400/40 backdrop-blur-sm">
              Access Point
            </div>
          </Html>
        </group>
      </Float>

      {/* Device nodes */}
      {nodes.map(node => (
        <group key={node.id} position={node.pos}>
          {/* Subtle hover animation instead of drifting Float */}
          <Float speed={2} floatIntensity={0.05} rotationIntensity={0.02}>
            <group
              onClick={(e) => { e.stopPropagation(); onNodeClick(node.id); }}
              onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
              onPointerOut={() => { document.body.style.cursor = 'auto'; }}
            >
              {renderModel(node.model, node.scale)}
              {/* Click-to-activate glow ring */}
              {activeNode === node.id && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.38, 0.03, 8, 32]} />
                  <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={1.5} transparent opacity={0.7} />
                </mesh>
              )}
              <Html position={[0, 0.5, 0]} center distanceFactor={9}>
                <div className="pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm border"
                  style={{ background: activeNode === node.id ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.65)', color: activeNode === node.id ? '#1e293b' : node.color, borderColor: node.color }}>
                  {node.label}
                </div>
              </Html>
            </group>
          </Float>
        </group>
      ))}

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.72}
        minPolarAngle={Math.PI * 0.22}
        minDistance={3}
        maxDistance={16}
        zoomSpeed={0.8}
      />
    </>
  );
}

// ── Public export ──────────────────────────────────────────────────
export default function NetworkScene3D({ height = '480px' }) {
  const [activeNode, setActiveNode] = useState(null);

  const nodeInfo = {
    tower:  { name: 'Tower BTS / AP Outdoor', desc: 'Menara yang memancarkan sinyal untuk jangkauan lebih luas. Dilengkapi 3 antena sectoral untuk PTMP.' },
    router: { name: 'Wireless Router',        desc: 'Router dengan 3 antena eksternal untuk distribusi sinyal Wi-Fi ke seluruh jaringan lokal.' },
    laptop: { name: 'Laptop',                 desc: 'Perangkat end-user yang terhubung via Wi-Fi untuk akses internet dan kerja.' },
    phone:  { name: 'Smartphone',             desc: 'Perangkat mobile yang terhubung via Wi-Fi atau jaringan seluler LTE/5G.' },
    iot:    { name: 'IoT Device',             desc: 'Sensor dan perangkat smart home yang selalu terhubung dengan daya sangat rendah.' },
    server: { name: 'Server / Rack',          desc: '3U rack server yang memproses dan menyimpan data seluruh jaringan.' },
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl" style={{ height }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 9], fov: 52 }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene activeNode={activeNode} onNodeClick={(id) => setActiveNode(p => p === id ? null : id)} />
        </Suspense>
      </Canvas>

      {/* Header overlay */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Wireless Network</div>
        <div className="text-base font-bold text-white">Topologi Interaktif</div>
      </div>
      <div className="absolute bottom-4 left-4 text-slate-500 text-[10px] font-mono pointer-events-none">
        Drag rotasi · Scroll zoom · Klik perangkat untuk info
      </div>

      {/* Node info panel */}
      {activeNode && nodeInfo[activeNode] && (
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-[200px] border border-white/15">
          <div className="text-white font-bold text-sm mb-1">{nodeInfo[activeNode].name}</div>
          <div className="text-slate-300 text-xs leading-relaxed">{nodeInfo[activeNode].desc}</div>
        </div>
      )}
    </div>
  );
}