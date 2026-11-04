import { Component, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// Eight chapter stations sit on a ring around one access point, so scrolling
// from chapter to chapter reads as walking around the AP's coverage area.
export const STATION_COUNT = 8;
const RADIUS = 7;
const UP = new THREE.Vector3(0, 1, 0);

const PALETTES = {
  dark: {
    bg: '#020617',
    ground: '#0b1222',
    pad: '#1e293b',
    metal: '#94a3b8',
    body: '#cbd5e1',
    idle: '#475569',
    active: '#38bdf8',
    done: '#10b981',
  },
  light: {
    bg: '#f8fafc',
    ground: '#e9eef4',
    pad: '#cbd5e1',
    metal: '#475569',
    body: '#334155',
    idle: '#94a3b8',
    active: '#0369a1',
    done: '#047857',
  },
};

function stationPosition(i) {
  const angle = Math.PI / 2 + (i / STATION_COUNT) * Math.PI * 2;
  return new THREE.Vector3(Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS);
}

// One camera keyframe per page section: intro, eight chapters, closing overview.
function buildKeyframes(width, height) {
  const narrow = width < 768 || width / height < 0.9;
  const dist = narrow ? 1.35 : 1;
  const frames = [
    {
      pos: new THREE.Vector3(0, 12 * dist, 17 * dist),
      target: narrow ? new THREE.Vector3(0, 4, 0) : new THREE.Vector3(-5.5, 0, 0),
    },
  ];

  for (let i = 0; i < STATION_COUNT; i += 1) {
    const s = stationPosition(i);
    const out = s.clone().normalize();
    const right = new THREE.Vector3().crossVectors(out.clone().negate(), UP).normalize();
    const pos = s.clone().addScaledVector(out, 6.6 * dist).add(new THREE.Vector3(0, 3.3 * dist, 0));
    const target = s.clone().add(new THREE.Vector3(0, 0.8, 0));
    if (narrow) {
      target.y -= 0.5;
    } else {
      target.addScaledVector(right, -2.4);
    }
    frames.push({ pos, target });
  }

  frames.push({
    pos: new THREE.Vector3(0, 21 * dist, 7 * dist),
    target: new THREE.Vector3(0, 0, 0),
  });
  return frames;
}

function CameraRig({ progressRef, reducedMotion, paused }) {
  const { camera, size } = useThree();
  const frames = useMemo(() => buildKeyframes(size.width, size.height), [size.width, size.height]);
  const desiredPos = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const currentTarget = useRef(null);

  useFrame((state, delta) => {
    const f = THREE.MathUtils.clamp(progressRef.current, 0, frames.length - 1);
    const i = Math.min(Math.floor(f), frames.length - 2);
    const raw = f - i;
    const t = raw * raw * (3 - 2 * raw);

    desiredPos.current.lerpVectors(frames[i].pos, frames[i + 1].pos, t);
    desiredTarget.current.lerpVectors(frames[i].target, frames[i + 1].target, t);

    if (!paused && !reducedMotion) {
      desiredPos.current.x += state.pointer.x * 0.5;
      desiredPos.current.y += state.pointer.y * 0.3;
    }

    if (!currentTarget.current) {
      currentTarget.current = desiredTarget.current.clone();
      camera.position.copy(desiredPos.current);
    }

    const k = reducedMotion ? 1 : 1 - Math.exp(-delta * 4);
    camera.position.lerp(desiredPos.current, k);
    currentTarget.current.lerp(desiredTarget.current, k);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

function Wave({ index, total, color, paused }) {
  const ref = useRef();
  const progress = useRef(index / total);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!paused) progress.current = (progress.current + delta * 0.11) % 1;
    const p = progress.current;
    const r = 0.9 + p * RADIUS * 1.3;
    ref.current.scale.set(r, r, 1);
    ref.current.material.opacity = (1 - p) * 0.55;
  });

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} position-y={0.03}>
      <ringGeometry args={[0.985, 1, 128]} />
      <meshBasicMaterial color={color} transparent depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Packet({ end, color, paused }) {
  const ref = useRef();
  const progress = useRef(0);
  const start = useMemo(() => new THREE.Vector3(0, 0.9, 0), []);
  const stop = useMemo(() => end.clone().add(new THREE.Vector3(0, 0.9, 0)), [end]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!paused) progress.current = (progress.current + delta * 0.45) % 1;
    ref.current.position.lerpVectors(start, stop, progress.current);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function AccessPoint({ pal }) {
  return (
    <group>
      <mesh position-y={0.45}>
        <cylinderGeometry args={[0.09, 0.14, 0.9, 16]} />
        <meshStandardMaterial color={pal.metal} roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position-y={0.95}>
        <cylinderGeometry args={[0.6, 0.66, 0.16, 40]} />
        <meshStandardMaterial color={pal.body} roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position-y={1.04} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.38, 0.03, 12, 48]} />
        <meshBasicMaterial color={pal.active} />
      </mesh>
    </group>
  );
}

function Mast({ height = 1.6, pal, x = 0, z = 0 }) {
  return (
    <mesh position={[x, height / 2, z]}>
      <cylinderGeometry args={[0.035, 0.06, height, 10]} />
      <meshStandardMaterial color={pal.metal} roughness={0.45} metalness={0.6} />
    </mesh>
  );
}

// Each station's shape points at what its chapter teaches.
function StationShape({ index, pal, accent }) {
  switch (index) {
    case 0: // Sejarah: bars rising like a timeline
      return (
        <group>
          {[0.35, 0.6, 0.9, 1.25, 1.7].map((h, k) => (
            <mesh key={h} position={[-0.6 + k * 0.3, h / 2, 0]}>
              <boxGeometry args={[0.18, h, 0.18]} />
              <meshStandardMaterial color={k === 4 ? accent : pal.body} roughness={0.5} />
            </mesh>
          ))}
        </group>
      );
    case 1: // Antena: dipole with its doughnut radiation pattern
      return (
        <group>
          <Mast height={1.2} pal={pal} />
          <mesh position-y={1.45}>
            <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
            <meshStandardMaterial color={pal.body} />
          </mesh>
          <mesh position-y={1.45} rotation-x={Math.PI / 2}>
            <torusGeometry args={[0.5, 0.28, 16, 48]} />
            <meshStandardMaterial color={accent} transparent opacity={0.35} depthWrite={false} />
          </mesh>
        </group>
      );
    case 2: // Topologi: one sector mast feeding three clients (PTMP)
      return (
        <group>
          <Mast height={1.7} pal={pal} />
          {[-0.75, 0, 0.75].map((x) => (
            <group key={x}>
              <Mast height={0.7} pal={pal} x={x} z={0.75} />
              <Line
                points={[
                  [0, 1.6, 0],
                  [x, 0.7, 0.75],
                ]}
                color={accent}
                lineWidth={1.5}
              />
            </group>
          ))}
        </group>
      );
    case 3: // Faktor keberhasilan: two dishes with the Fresnel ellipsoid between
      return (
        <group>
          <Mast height={1.2} pal={pal} x={-0.85} />
          <Mast height={1.2} pal={pal} x={0.85} />
          <mesh position-y={1.2} scale={[0.85, 0.28, 0.28]}>
            <sphereGeometry args={[1, 32, 16]} />
            <meshStandardMaterial color={accent} transparent opacity={0.3} depthWrite={false} />
          </mesh>
          <Line
            points={[
              [-0.85, 1.2, 0],
              [0.85, 1.2, 0],
            ]}
            color={accent}
            lineWidth={1.5}
          />
        </group>
      );
    case 4: // Perangkat keras: an AP box with antennas and a PoE cable
      return (
        <group>
          <mesh position-y={0.25}>
            <boxGeometry args={[1, 0.22, 0.7]} />
            <meshStandardMaterial color={pal.body} roughness={0.4} />
          </mesh>
          {[-0.35, 0.35].map((x) => (
            <mesh key={x} position={[x, 0.65, -0.25]} rotation-z={x * 0.4}>
              <cylinderGeometry args={[0.03, 0.04, 0.65, 8]} />
              <meshStandardMaterial color={pal.metal} />
            </mesh>
          ))}
          <mesh position={[0, 0.27, 0.36]}>
            <boxGeometry args={[0.6, 0.04, 0.03]} />
            <meshBasicMaterial color={accent} />
          </mesh>
        </group>
      );
    case 5: // Keamanan: data block inside an encryption shell
      return (
        <group position-y={0.9}>
          <mesh>
            <boxGeometry args={[0.45, 0.45, 0.45]} />
            <meshStandardMaterial color={pal.body} roughness={0.4} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.8, 1]} />
            <meshBasicMaterial color={accent} wireframe />
          </mesh>
        </group>
      );
    case 6: // Perbandingan teknologi: nested range rings, NFC to LoRa
      return (
        <group>
          {[0.2, 0.45, 0.7, 0.98].map((r) => (
            <mesh key={r} position-y={0.12} rotation-x={Math.PI / 2}>
              <torusGeometry args={[r, 0.03, 8, 64]} />
              <meshBasicMaterial color={r === 0.98 ? accent : pal.body} />
            </mesh>
          ))}
          <Mast height={0.9} pal={pal} />
        </group>
      );
    default: // Tantangan desain: one AP crowded by many clients
      return (
        <group>
          <Mast height={1.4} pal={pal} />
          <mesh position-y={1.45}>
            <cylinderGeometry args={[0.3, 0.32, 0.1, 24]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          {Array.from({ length: 12 }).map((_, k) => {
            const a = (k / 12) * Math.PI * 2;
            const r = 0.55 + (k % 3) * 0.17;
            return (
              <mesh key={k} position={[Math.cos(a) * r, 0.12, Math.sin(a) * r]}>
                <boxGeometry args={[0.13, 0.13, 0.13]} />
                <meshStandardMaterial color={pal.body} />
              </mesh>
            );
          })}
        </group>
      );
  }
}

function Station({ index, pal, isActive, isDone, onSelect }) {
  const position = useMemo(() => stationPosition(index), [index]);
  const facing = useMemo(() => Math.atan2(position.x, position.z), [position]);
  const accent = isActive ? pal.active : isDone ? pal.done : pal.idle;

  return (
    <group
      position={position}
      rotation-y={facing}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = '';
      }}
    >
      <mesh position-y={0.03}>
        <cylinderGeometry args={[1.25, 1.3, 0.06, 48]} />
        <meshStandardMaterial color={pal.pad} roughness={0.8} />
      </mesh>
      <mesh position-y={0.065} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.2, 1.28, 64]} />
        <meshBasicMaterial color={accent} side={THREE.DoubleSide} />
      </mesh>
      <StationShape index={index} pal={pal} accent={accent} />
      {!isActive && (
        <Html position={[0, 2.5, 0]} center distanceFactor={11} zIndexRange={[2, 0]} pointerEvents="none">
          <span aria-hidden="true" className="font-mono text-sm font-bold select-none text-slate-600 dark:text-slate-400">
            {String(index + 1).padStart(2, '0')}
          </span>
        </Html>
      )}
    </group>
  );
}

function World({ pal, activeStation, completed, paused, onSelect }) {
  const positions = useMemo(() => Array.from({ length: STATION_COUNT }, (_, i) => stationPosition(i)), []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 10, 8]} intensity={1.3} />

      <mesh rotation-x={-Math.PI / 2}>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial color={pal.ground} roughness={1} />
      </mesh>

      <AccessPoint pal={pal} />
      {[0, 1, 2, 3].map((k) => (
        <Wave key={k} index={k} total={4} color={pal.active} paused={paused} />
      ))}

      {positions.map((p, i) => {
        const active = i === activeStation;
        return (
          <Line
            key={i}
            points={[
              [0, 0.06, 0],
              [p.x, 0.06, p.z],
            ]}
            color={active ? pal.active : pal.idle}
            lineWidth={active ? 2.2 : 1}
            dashed={!active}
            dashSize={0.25}
            gapSize={0.2}
            transparent
            opacity={active ? 1 : 0.6}
          />
        );
      })}

      {activeStation >= 0 && activeStation < STATION_COUNT && (
        <Packet key={activeStation} end={positions[activeStation]} color={pal.active} paused={paused} />
      )}

      {positions.map((_, i) => (
        <Station
          key={i}
          index={i}
          pal={pal}
          isActive={i === activeStation}
          isDone={completed.includes(String(i + 1).padStart(2, '0'))}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

class WebGLBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="absolute bottom-4 left-4 text-xs text-slate-600 dark:text-slate-400">
          Peta 3D tidak bisa ditampilkan di browser ini (WebGL tidak aktif). Semua bab tetap bisa dibuka dari daftar.
        </p>
      );
    }
    return this.props.children;
  }
}

export default function SpectrumWorld3D({ progressRef, activeStation, completed, theme, paused, reducedMotion, onSelect }) {
  const pal = PALETTES[theme === 'dark' ? 'dark' : 'light'];
  const [initialCamera] = useState(() => ({ fov: 45, near: 0.1, far: 140, position: [0, 12, 17] }));

  return (
    <WebGLBoundary>
      <Canvas dpr={[1, 1.75]} camera={initialCamera} style={{ touchAction: 'pan-y' }}>
        <color attach="background" args={[pal.bg]} />
        <fog attach="fog" args={[pal.bg, 18, 46]} />
        <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} paused={paused} />
        <World pal={pal} activeStation={activeStation} completed={completed} paused={paused} onSelect={onSelect} />
      </Canvas>
    </WebGLBoundary>
  );
}
