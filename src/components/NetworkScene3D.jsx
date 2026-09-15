import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Float, MeshDistortMaterial, Stars, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Floating Node (Device) ────────────────────────────────────
function NetworkNode({ position, color = '#3b82f6', size = 0.18, label, onClick, isActive }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      ref.current.rotation.y += 0.008;
      const scale = isActive ? 1.3 : hovered ? 1.15 : 1;
      ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={onClick}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        castShadow
      >
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color={isActive ? '#7c3aed' : hovered ? '#60a5fa' : color}
          emissive={isActive ? '#4c1d95' : hovered ? '#1e3a8a' : '#0f172a'}
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.5, size * 0.06, 8, 32]} />
        <meshStandardMaterial
          color={isActive ? '#a855f7' : color}
          emissive={isActive ? '#7c3aed' : color}
          emissiveIntensity={0.8}
          transparent
          opacity={hovered || isActive ? 0.9 : 0.35}
        />
      </mesh>
      {/* Always-on floating label so each device is identifiable without clicking */}
      <Html position={[0, size + 0.22, 0]} center distanceFactor={8} occlude sprite>
        <div
          className="pointer-events-none whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm border transition-opacity"
          style={{
            background: isActive || hovered ? 'rgba(255,255,255,0.95)' : 'rgba(15,23,42,0.65)',
            color: isActive || hovered ? '#1e293b' : '#e2e8f0',
            borderColor: isActive || hovered ? color : 'rgba(148,163,184,0.3)',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

// ─── Animated Signal Particle along a line ─────────────────────
function SignalParticle({ start, end, color, speed = 1, delay = 0 }) {
  const ref = useRef();
  const progress = useRef(delay % 1);

  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (ref.current) {
      progress.current = (progress.current + delta * speed * 0.4) % 1;
      tempVec.lerpVectors(startVec, endVec, progress.current);
      ref.current.position.copy(tempVec);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
}

// ─── Connection Line ────────────────────────────────────────────
function ConnectionLine({ start, end, color = '#3b82f6', opacity = 0.35 }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  return (
    <Line points={points} color={color} lineWidth={1.2} transparent opacity={opacity} />
  );
}

// ─── Central Hub (Access Point) ────────────────────────────────
function CentralHub() {
  const ref = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.006;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Core sphere */}
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.32, 2]} />
        <meshStandardMaterial color="#1d4ed8" emissive="#1e40af" emissiveIntensity={0.6} roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Orbiting rings */}
      {[0, Math.PI / 3, (2 * Math.PI) / 3].map((rot, i) => (
        <mesh key={i} ref={i === 0 ? ringRef : undefined} rotation={[Math.PI / 2 + rot * 0.3, rot, 0]}>
          <torusGeometry args={[0.55 + i * 0.12, 0.018, 8, 48]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.9} transparent opacity={0.7} />
        </mesh>
      ))}
      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <Html position={[0, -0.55, 0]} center distanceFactor={8} occlude sprite>
        <div className="pointer-events-none whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold bg-blue-500/90 text-white border border-blue-300/50 backdrop-blur-sm">
          Access Point
        </div>
      </Html>
    </group>
  );
}

// ─── Main 3D Scene ──────────────────────────────────────────────
function Scene({ activeNode, onNodeClick }) {
  const nodes = useMemo(() => [
    { id: 'router', pos: [-2.8, 0.8, 0.4], color: '#10b981', label: 'Router' },
    { id: 'laptop', pos: [2.6, 1.0, -0.5], color: '#f59e0b', label: 'Laptop' },
    { id: 'phone', pos: [1.2, -1.6, 1.2], color: '#ec4899', label: 'Phone' },
    { id: 'tower', pos: [-1.5, 1.8, -1.4], color: '#8b5cf6', label: 'Tower' },
    { id: 'iot', pos: [2.2, -0.8, -1.6], color: '#14b8a6', label: 'IoT' },
    { id: 'server', pos: [-2.2, -1.2, -0.8], color: '#f97316', label: 'Server' },
  ], []);

  const edges = useMemo(() => [
    { from: [0, 0, 0], to: [-2.8, 0.8, 0.4], color: '#10b981', speed: 0.7, delay: 0 },
    { from: [0, 0, 0], to: [2.6, 1.0, -0.5], color: '#f59e0b', speed: 0.9, delay: 0.3 },
    { from: [0, 0, 0], to: [1.2, -1.6, 1.2], color: '#ec4899', speed: 0.6, delay: 0.6 },
    { from: [0, 0, 0], to: [-1.5, 1.8, -1.4], color: '#8b5cf6', speed: 1.1, delay: 0.1 },
    { from: [0, 0, 0], to: [2.2, -0.8, -1.6], color: '#14b8a6', speed: 0.8, delay: 0.5 },
    { from: [0, 0, 0], to: [-2.2, -1.2, -0.8], color: '#f97316', speed: 0.75, delay: 0.8 },
    { from: [-2.8, 0.8, 0.4], to: [-2.2, -1.2, -0.8], color: '#6366f1', speed: 0.5, delay: 0.2 },
    { from: [2.6, 1.0, -0.5], to: [2.2, -0.8, -1.6], color: '#06b6d4', speed: 0.65, delay: 0.4 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" castShadow />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[-5, -5, 3]} intensity={1} color="#a78bfa" />
      <pointLight position={[0, 8, -5]} intensity={0.7} color="#34d399" />
      <Environment preset="city" environmentIntensity={0.7} />
      <Stars radius={30} depth={10} count={300} factor={2} saturation={0} fade speed={0.5} />
      <ContactShadows position={[0, -2.4, 0]} opacity={0.45} scale={12} blur={2.6} far={3} color="#000000" />

      {/* Connection lines */}
      {edges.map((e, i) => (
        <ConnectionLine key={i} start={e.from} end={e.to} color={e.color} />
      ))}

      {/* Animated particles */}
      {edges.map((e, i) => (
        <SignalParticle key={i} start={e.from} end={e.to} color={e.color} speed={e.speed} delay={e.delay} />
      ))}
      {edges.map((e, i) => (
        <SignalParticle key={`r-${i}`} start={e.to} end={e.from} color={e.color} speed={e.speed * 0.7} delay={e.delay + 0.5} />
      ))}

      {/* Central Hub */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <CentralHub />
      </Float>

      {/* Network Nodes */}
      {nodes.map((node) => (
        <Float key={node.id} speed={1 + Math.random()} rotationIntensity={0.1} floatIntensity={0.4}>
          <NetworkNode
            position={node.pos}
            color={node.color}
            label={node.label}
            isActive={activeNode === node.id}
            onClick={() => onNodeClick(node.id)}
          />
        </Float>
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </>
  );
}

// ─── Public Export ──────────────────────────────────────────────
export default function NetworkScene3D({ height = '480px' }) {
  const [activeNode, setActiveNode] = useState(null);

  const nodeLabels = {
    router: { name: 'Wireless Router', desc: 'Pusat distribusi sinyal ke seluruh perangkat dalam jaringan lokal.' },
    laptop: { name: 'Laptop / PC', desc: 'Perangkat end-user yang menerima sinyal Wi-Fi untuk akses internet.' },
    phone: { name: 'Smartphone', desc: 'Perangkat mobile yang terhubung via Wi-Fi atau seluler.' },
    tower: { name: 'Tower BTS / AP Outdoor', desc: 'Menara yang memancarkan sinyal untuk jangkauan lebih luas.' },
    iot: { name: 'Perangkat IoT', desc: 'Sensor, kamera, smart home device yang terhubung ke jaringan.' },
    server: { name: 'Server / Gateway', desc: 'Mengelola dan memproses data dari seluruh jaringan.' },
  };

  const handleNodeClick = (id) => setActiveNode(prev => prev === id ? null : id);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl" style={{ height }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 55 }} gl={{ antialias: true }}>
        <Scene activeNode={activeNode} onNodeClick={handleNodeClick} />
      </Canvas>

      {/* Label overlay */}
      <div className="absolute top-4 left-4 text-white">
        <div className="text-xs text-slate-400 font-mono uppercase tracking-widest mb-1">Wireless Network</div>
        <div className="text-lg font-bold">Topologi Interaktif</div>
      </div>
      <div className="absolute bottom-4 left-4 text-slate-500 text-xs font-mono">Drag untuk rotasi · Klik node untuk info</div>

      {/* Node Info Panel */}
      {activeNode && nodeLabels[activeNode] && (
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-[200px] border border-white/10">
          <div className="text-white font-bold text-sm mb-1">{nodeLabels[activeNode].name}</div>
          <div className="text-slate-300 text-xs leading-relaxed">{nodeLabels[activeNode].desc}</div>
        </div>
      )}
    </div>
  );
}