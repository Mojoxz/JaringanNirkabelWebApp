import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, Radio, Activity } from 'lucide-react';

const BAND_CONFIGS = {
  '2.4': {
    id: '2.4',
    label: '2.4 GHz',
    subtitle: 'Jangkauan Luas & Penetrasi Dinding',
    color: '#10b981',
    accentHex: '#34d399',
    waveSpeed: 0.42,
    waveCount: 3,
    maxRadius: 3.9,
    wavelengthCm: '12.5 cm',
    channelWidth: '20 MHz (Ch 1, 6, 11)',
    maxRate: '574 Mbps',
    rssiBase: -54,
  },
  '5': {
    id: '5',
    label: '5 GHz',
    subtitle: 'Throughput Gigabit & Spektrum Bersih',
    color: '#0ea5e9',
    accentHex: '#38bdf8',
    waveSpeed: 0.68,
    waveCount: 4,
    maxRadius: 3.4,
    wavelengthCm: '5.8 cm',
    channelWidth: '80 MHz (OFDMA)',
    maxRate: '2.4 Gbps',
    rssiBase: -61,
  },
  '6': {
    id: '6',
    label: '6 GHz (Wi-Fi 7)',
    subtitle: 'Multi-Link Operation & Latensi < 2 ms',
    color: '#f59e0b',
    accentHex: '#fbbf24',
    waveSpeed: 0.95,
    waveCount: 5,
    maxRadius: 3.0,
    wavelengthCm: '4.9 cm',
    channelWidth: '320 MHz (4096-QAM)',
    maxRate: '5.8 Gbps',
    rssiBase: -65,
  },
};

const NODES = [
  {
    id: 'hub',
    name: 'Core Enterprise AP',
    role: 'Pusat Pemancar Tri-Band',
    pos: [0, 0.25, 0],
    gain: '8 dBi Omni',
    protocol: 'IEEE 802.11be (Wi-Fi 7)',
    rssi: '-42 dBm',
    snr: '48 dB',
  },
  {
    id: 'tower',
    name: 'PTP Backhaul Dish',
    role: 'Jembatan Antar Gedung',
    pos: [-2.35, 0.85, -1.1],
    gain: '26 dBi Parabolic',
    protocol: '5.8 GHz Point-to-Point',
    rssi: '-55 dBm',
    snr: '39 dB',
  },
  {
    id: 'workstation',
    name: 'Client Laptop MLO',
    role: 'Stasiun Kerja High-Density',
    pos: [2.15, -0.1, 1.05],
    gain: '3 dBi MIMO 2x2',
    protocol: '802.11ax / 802.11be',
    rssi: '-59 dBm',
    snr: '35 dB',
  },
  {
    id: 'mesh',
    name: 'Outdoor Sector Node',
    role: 'Distribusi PTMP Kampus',
    pos: [2.05, 0.7, -1.35],
    gain: '15 dBi Sectoral 120°',
    protocol: '802.11ax TDMA',
    rssi: '-57 dBm',
    snr: '37 dB',
  },
  {
    id: 'iot',
    name: 'Sensor Telemetri IoT',
    role: 'Node Hemat Daya (TWT)',
    pos: [-1.95, -0.15, 1.35],
    gain: '2.15 dBi Dipole',
    protocol: '2.4 GHz Target Wake Time',
    rssi: '-66 dBm',
    snr: '29 dB',
  },
];

function ExpandingWaveRing({ index, total, color, speed, maxRadius, isPaused }) {
  const meshRef = useRef();
  const progressRef = useRef(index / total);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (!isPaused) {
      progressRef.current = (progressRef.current + delta * speed) % 1;
    }
    const p = progressRef.current;
    const radius = 0.35 + p * maxRadius;
    meshRef.current.scale.set(radius, radius, 1);
    meshRef.current.material.opacity = Math.max(0, (1 - p) * 0.42);
  });

  return (
    <mesh ref={meshRef} position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.96, 1.0, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}

function PacketStream({ start, end, color, speed, offset, isPaused, burstActive }) {
  const ref = useRef();
  const progress = useRef(offset);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!isPaused) {
      const mult = burstActive ? 2.6 : 1;
      progress.current = (progress.current + delta * speed * mult) % 1;
    }
    ref.current.position.lerpVectors(startVec, endVec, progress.current);
    const pulse = burstActive ? 1.45 : 1.0;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
    </mesh>
  );
}

function InteractiveNodeMesh({ node, isSelected, bandColor, onSelect, isPaused }) {
  const groupRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentScale = useRef(1);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetScale = isSelected ? 1.18 : hovered ? 1.09 : 1.0;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 9);
    groupRef.current.scale.setScalar(currentScale.current);

    if (!isPaused) {
      const floatY = Math.sin(state.clock.elapsedTime * 2 + node.pos[0]) * 0.045;
      groupRef.current.position.y = node.pos[1] + floatY;
      if (ringRef.current) {
        ringRef.current.rotation.z += delta * 1.1;
      }
    }
  });

  const activeColor = isSelected ? '#38bdf8' : bandColor;

  return (
    <group
      ref={groupRef}
      position={node.pos}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {node.id === 'hub' && (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.52, 0.56, 0.14, 32]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.25} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.32, 0.025, 12, 48]} />
            <meshStandardMaterial color={bandColor} emissive={bandColor} emissiveIntensity={1.8} />
          </mesh>
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.35, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.6} />
          </mesh>
        </group>
      )}

      {node.id === 'tower' && (
        <group>
          <mesh position={[0, -0.35, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.09, 0.9, 8]} />
            <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.7} />
          </mesh>
          <mesh position={[0.08, 0.08, 0.08]} rotation={[0.2, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.08, 0.12, 24]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.25} metalness={0.65} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color={bandColor} emissive={bandColor} emissiveIntensity={2} />
          </mesh>
        </group>
      )}

      {node.id === 'workstation' && (
        <group>
          <mesh position={[0, -0.05, 0]} castShadow>
            <boxGeometry args={[0.56, 0.04, 0.38]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.75} />
          </mesh>
          <mesh position={[0, 0.14, -0.16]} rotation={[-0.25, 0, 0]} castShadow>
            <boxGeometry args={[0.54, 0.36, 0.03]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.14, -0.142]} rotation={[-0.25, 0, 0]}>
            <planeGeometry args={[0.46, 0.28]} />
            <meshStandardMaterial color={bandColor} emissive={bandColor} emissiveIntensity={0.85} />
          </mesh>
        </group>
      )}

      {node.id === 'mesh' && (
        <group>
          <mesh castShadow>
            <boxGeometry args={[0.28, 0.62, 0.1]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.056]}>
            <boxGeometry args={[0.22, 0.52, 0.01]} />
            <meshStandardMaterial color={bandColor} emissive={bandColor} emissiveIntensity={0.9} />
          </mesh>
        </group>
      )}

      {node.id === 'iot' && (
        <group>
          <mesh castShadow>
            <boxGeometry args={[0.36, 0.18, 0.36]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0.1, 0.22, 0]}>
            <cylinderGeometry args={[0.015, 0.02, 0.32, 10]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[-0.08, 0.1, 0.08]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color={bandColor} emissive={bandColor} emissiveIntensity={2} />
          </mesh>
        </group>
      )}

      {(isSelected || hovered) && (
        <mesh ref={ringRef} position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.48, 32]} />
          <meshBasicMaterial color={activeColor} side={THREE.DoubleSide} />
        </mesh>
      )}

      <Html position={[0, node.id === 'hub' ? 0.52 : 0.48, 0]} center distanceFactor={9}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(node.id);
          }}
          className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold whitespace-nowrap transition-transform shadow-md border ${
            isSelected
              ? 'bg-sky-500 text-slate-950 border-white scale-105'
              : 'bg-slate-900/90 text-slate-100 border-slate-700 hover:border-sky-400'
          }`}
        >
          {node.name}
        </button>
      </Html>
    </group>
  );
}

function InteractiveSpectrumScene({ bandConfig, selectedNodeId, onSelectNode, isPaused, burstActive }) {
  const rootRef = useRef();

  // Pointer-reactive spring tilt so moving the cursor gently tilts the 3D assembly.
  useFrame((state, delta) => {
    if (!rootRef.current || isPaused) return;
    const targetRotX = state.pointer.y * 0.14;
    const targetRotZ = -state.pointer.x * 0.14;
    rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, targetRotX, delta * 4);
    rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, targetRotZ, delta * 4);
  });

  const hubPos = NODES[0].pos;
  const satelliteNodes = NODES.slice(1);

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <pointLight position={[0, 2, 0]} intensity={1.4} color={bandConfig.color} />

      <group ref={rootRef}>
        <mesh position={[0, -0.55, 0]} receiveShadow>
          <cylinderGeometry args={[3.7, 3.9, 0.08, 64]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
        </mesh>
        <gridHelper args={[7.2, 18, bandConfig.color, '#1e293b']} position={[0, -0.5, 0]} />

        {Array.from({ length: bandConfig.waveCount }).map((_, idx) => (
          <ExpandingWaveRing
            key={`${bandConfig.id}-ring-${idx}`}
            index={idx}
            total={bandConfig.waveCount}
            color={bandConfig.color}
            speed={bandConfig.waveSpeed}
            maxRadius={bandConfig.maxRadius}
            isPaused={isPaused}
          />
        ))}

        {satelliteNodes.map((node, i) => {
          const isTargetSelected = selectedNodeId === node.id;
          const beamColor = isTargetSelected ? '#38bdf8' : bandConfig.color;
          return (
            <group key={node.id}>
              <Line
                points={[new THREE.Vector3(...hubPos), new THREE.Vector3(...node.pos)]}
                color={beamColor}
                lineWidth={isTargetSelected ? 2.8 : 1.5}
                dashed
                dashSize={0.18}
                gapSize={0.1}
                transparent
                opacity={isTargetSelected ? 0.95 : 0.55}
              />
              <PacketStream
                start={hubPos}
                end={node.pos}
                color={beamColor}
                speed={bandConfig.waveSpeed * 0.85}
                offset={(i * 0.25) % 1}
                isPaused={isPaused}
                burstActive={burstActive}
              />
              <PacketStream
                start={node.pos}
                end={hubPos}
                color={bandConfig.accentHex}
                speed={bandConfig.waveSpeed * 0.65}
                offset={((i * 0.25) + 0.5) % 1}
                isPaused={isPaused}
                burstActive={burstActive}
              />
            </group>
          );
        })}

        {NODES.map((node) => (
          <InteractiveNodeMesh
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            bandColor={bandConfig.color}
            onSelect={onSelectNode}
            isPaused={isPaused}
          />
        ))}
      </group>

      <ContactShadows position={[0, -0.58, 0]} opacity={0.65} scale={10} blur={2} far={3} />
    </>
  );
}

export default function HeroWireless3D() {
  const [activeBand, setActiveBand] = useState('5');
  const [selectedNodeId, setSelectedNodeId] = useState('hub');
  const [isPaused, setIsPaused] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [burstActive, setBurstActive] = useState(false);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!burstActive) return;
    const timer = setTimeout(() => setBurstActive(false), 1800);
    return () => clearTimeout(timer);
  }, [burstActive]);

  const bandConfig = BAND_CONFIGS[activeBand];
  const selectedNode = NODES.find((n) => n.id === selectedNodeId) || NODES[0];

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setSelectedNodeId('hub');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Radio size={15} className="text-sky-400" aria-hidden="true" />
          <span className="font-mono text-xs font-bold text-slate-200 tracking-wide">
            [RF-SANDBOX 3D // INTERAKTIF]
          </span>
        </div>

        <div className="flex items-center gap-1.5" role="group" aria-label="Kontrol simulasi 3D">
          <button
            type="button"
            onClick={() => setBurstActive(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors min-h-[34px]"
          >
            <Zap size={13} aria-hidden="true" />
            <span>Uji Burst Paket</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? 'Putar animasi gelombang 3D' : 'Jeda animasi gelombang 3D'}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors min-h-[34px]"
          >
            {isPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            <span>{isPaused ? 'Putar' : 'Jeda'}</span>
          </button>
          <button
            type="button"
            onClick={handleResetView}
            aria-label="Reset sudut kamera 3D"
            className="inline-flex items-center justify-center min-h-[34px] min-w-[34px] px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <RotateCcw size={13} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-300">Pilih Pita Spektrum:</span>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800" role="tablist" aria-label="Pita frekuensi radio">
          {Object.values(BAND_CONFIGS).map((band) => {
            const active = band.id === activeBand;
            return (
              <button
                key={band.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveBand(band.id)}
                className={`relative px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors min-h-[34px] ${
                  active ? 'text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="hero-band-pill"
                    className="absolute inset-0 rounded-md bg-sky-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{band.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative w-full h-[360px] sm:h-[400px] bg-slate-950">
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2 p-6 text-center">
              <Activity size={24} className="text-sky-400 animate-pulse" aria-hidden="true" />
              <p className="text-sm font-semibold">Memuat Kanvas Simulasi 3D Spektrum Nirkabel...</p>
              <p className="text-xs text-slate-400">Menyiapkan geometri antena dan pancaran gelombang</p>
            </div>
          }
        >
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 3.2, 5.6], fov: 46 }}>
            <InteractiveSpectrumScene
              bandConfig={bandConfig}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
              isPaused={isPaused}
              burstActive={burstActive}
            />
            <OrbitControls
              ref={controlsRef}
              enableZoom
              enablePan={false}
              autoRotate={!isPaused}
              autoRotateSpeed={0.55}
              minPolarAngle={0.3}
              maxPolarAngle={Math.PI * 0.46}
              minDistance={3.5}
              maxDistance={9}
            />
          </Canvas>
        </Suspense>

        <div className="absolute top-3 left-3 pointer-events-none bg-slate-900/90 backdrop-blur-xs border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 max-w-[240px]">
          <p className="font-mono text-[11px] text-sky-400 font-bold">{bandConfig.label} // λ = {bandConfig.wavelengthCm}</p>
          <p className="text-slate-200 font-medium mt-0.5 text-[11px]">{bandConfig.subtitle}</p>
        </div>

        <div className="absolute bottom-3 left-3 pointer-events-none bg-slate-900/85 border border-slate-800 rounded-md px-2.5 py-1 text-[11px] font-mono text-slate-300">
          Geser untuk putar 360° · Klik node perangkat
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedNode.id}-${activeBand}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-4 bg-slate-900 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left"
        >
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[11px] font-mono text-slate-400">NODE TERPILIH</p>
            <p className="text-xs font-bold text-white mt-0.5">{selectedNode.name}</p>
            <p className="text-[11px] text-slate-300">{selectedNode.role}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400">ANTENA &amp; GAIN</p>
            <p className="text-xs font-mono font-bold text-sky-400 mt-0.5">{selectedNode.gain}</p>
            <p className="text-[11px] text-slate-300">{selectedNode.protocol}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400">KANAL &amp; LAJU DATA</p>
            <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{bandConfig.maxRate}</p>
            <p className="text-[11px] text-slate-300">{bandConfig.channelWidth}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400">SINYAL &amp; SNR</p>
            <p className="text-xs font-mono font-bold text-amber-400 mt-0.5">
              {selectedNode.rssi} / {selectedNode.snr}
            </p>
            <p className="text-[11px] text-slate-300">Link Aktif Stabil</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
