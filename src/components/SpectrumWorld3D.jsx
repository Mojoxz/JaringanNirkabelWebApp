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
    padTop: '#0f172a',
    metal: '#94a3b8',
    darkMetal: '#334155',
    chassis: '#1e293b',
    radome: '#f1f5f9',
    body: '#cbd5e1',
    brass: '#d97706',
    idle: '#475569',
    active: '#38bdf8',
    done: '#10b981',
  },
  light: {
    bg: '#f8fafc',
    ground: '#e9eef4',
    pad: '#cbd5e1',
    padTop: '#e2e8f0',
    metal: '#64748b',
    darkMetal: '#334155',
    chassis: '#1e293b',
    radome: '#ffffff',
    body: '#334155',
    brass: '#b45309',
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
    const pos = s.clone().addScaledVector(out, 6.2 * dist).add(new THREE.Vector3(0, 3.1 * dist, 0));
    const target = s.clone().add(new THREE.Vector3(0, 0.85, 0));
    if (narrow) {
      target.y -= 0.45;
    } else {
      target.addScaledVector(right, -2.3);
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
  const start = useMemo(() => new THREE.Vector3(0, 1.15, 0), []);
  const stop = useMemo(() => end.clone().add(new THREE.Vector3(0, 1.0, 0)), [end]);

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

// Reusable parabolic dish reflector (y = k * r^2) with feedhorn and 3 struts.
function ParabolicDish({ radius = 0.42, depth = 0.18, pal, accent, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const dishGeo = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 18; i += 1) {
      const t = i / 18;
      const r = t * radius;
      const y = t * t * depth;
      pts.push(new THREE.Vector2(r, y));
    }
    return new THREE.LatheGeometry(pts, 32);
  }, [radius, depth]);

  const strutAngles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];

  return (
    <group position={position} rotation={rotation}>
      {/* Rear mounting bracket */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[radius * 0.28, radius * 0.34, 0.12, 16]} />
        <meshStandardMaterial color={pal.darkMetal} roughness={0.45} metalness={0.7} />
      </mesh>
      {/* Curved parabolic aluminum reflector */}
      <mesh geometry={dishGeo} castShadow receiveShadow>
        <meshStandardMaterial color={pal.radome} roughness={0.28} metalness={0.45} side={THREE.DoubleSide} />
      </mesh>
      {/* Rim lip */}
      <mesh position={[0, depth, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.018, 10, 36]} />
        <meshStandardMaterial color={pal.metal} roughness={0.35} metalness={0.7} />
      </mesh>
      {/* Three feedhorn support struts */}
      {strutAngles.map((a) => (
        <mesh
          key={a}
          position={[Math.cos(a) * radius * 0.45, depth * 0.95, Math.sin(a) * radius * 0.45]}
          rotation={[Math.sin(a) * 0.48, 0, -Math.cos(a) * 0.48]}
        >
          <cylinderGeometry args={[0.009, 0.009, radius * 1.05, 8]} />
          <meshStandardMaterial color={pal.metal} roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {/* Sub-reflector / waveguide feedhorn */}
      <mesh position={[0, depth * 1.65, 0]}>
        <cylinderGeometry args={[0.048, 0.032, 0.12, 16]} />
        <meshStandardMaterial color={pal.darkMetal} roughness={0.35} metalness={0.75} />
      </mesh>
      <mesh position={[0, depth * 1.32, 0]}>
        <sphereGeometry args={[0.032, 12, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Reusable miniature laptop client with open screen, keyboard deck, and trackpad.
function MiniLaptop({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, pal, accent }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base deck */}
      <mesh position={[0, 0.018, 0.04]} castShadow>
        <boxGeometry args={[0.42, 0.026, 0.3]} />
        <meshStandardMaterial color={pal.metal} roughness={0.28} metalness={0.75} />
      </mesh>
      {/* Recessed keyboard well */}
      <mesh position={[0, 0.033, 0.02]}>
        <boxGeometry args={[0.36, 0.004, 0.18]} />
        <meshStandardMaterial color={pal.chassis} roughness={0.65} metalness={0.2} />
      </mesh>
      {/* Lid + illuminated display */}
      <group position={[0, 0.03, -0.1]} rotation={[-0.32, 0, 0]}>
        <mesh position={[0, 0.14, 0]} castShadow>
          <boxGeometry args={[0.42, 0.28, 0.018]} />
          <meshStandardMaterial color={pal.metal} roughness={0.28} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0.14, 0.011]}>
          <boxGeometry args={[0.37, 0.23, 0.004]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Central hub: Realistic Enterprise Tri-Band Ceiling/Mast Access Point on a flanged pedestal.
function AccessPoint({ pal }) {
  const domeGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0, 0.14),
      new THREE.Vector2(0.28, 0.135),
      new THREE.Vector2(0.55, 0.11),
      new THREE.Vector2(0.72, 0.065),
      new THREE.Vector2(0.76, 0.02),
      new THREE.Vector2(0.72, -0.02),
      new THREE.Vector2(0, -0.03),
    ];
    return new THREE.LatheGeometry(pts, 48);
  }, []);

  return (
    <group>
      {/* Heavy flanged steel base plate with 4 anchor bolts */}
      <mesh position-y={0.04} receiveShadow>
        <cylinderGeometry args={[0.55, 0.62, 0.08, 32]} />
        <meshStandardMaterial color={pal.darkMetal} roughness={0.5} metalness={0.7} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((a) => (
        <mesh key={a} position={[Math.cos(a) * 0.44, 0.09, Math.sin(a) * 0.44]}>
          <cylinderGeometry args={[0.035, 0.035, 0.04, 8]} />
          <meshStandardMaterial color={pal.metal} roughness={0.3} metalness={0.85} />
        </mesh>
      ))}

      {/* Telescoping brushed aluminum mast */}
      <mesh position-y={0.48} castShadow>
        <cylinderGeometry args={[0.11, 0.14, 0.82, 24]} />
        <meshStandardMaterial color={pal.metal} roughness={0.32} metalness={0.78} />
      </mesh>
      <mesh position-y={0.92} castShadow>
        <cylinderGeometry args={[0.075, 0.09, 0.35, 24]} />
        <meshStandardMaterial color={pal.darkMetal} roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Die-cast aluminum heatsink backplate */}
      <mesh position-y={1.06} castShadow>
        <cylinderGeometry args={[0.62, 0.54, 0.07, 36]} />
        <meshStandardMaterial color={pal.darkMetal} roughness={0.45} metalness={0.75} />
      </mesh>

      {/* Curved matte polycarbonate enterprise AP enclosure */}
      <mesh geometry={domeGeo} position-y={1.1} castShadow receiveShadow>
        <meshStandardMaterial color={pal.radome} roughness={0.32} metalness={0.12} />
      </mesh>

      {/* Recessed status LED ring */}
      <mesh position-y={1.235} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.32, 0.024, 16, 64]} />
        <meshStandardMaterial color={pal.active} emissive={pal.active} emissiveIntensity={1.1} roughness={0.2} />
      </mesh>

      {/* Center metallic RF emblem cap */}
      <mesh position-y={1.242}>
        <cylinderGeometry args={[0.11, 0.11, 0.012, 24]} />
        <meshStandardMaterial color={pal.metal} roughness={0.25} metalness={0.85} />
      </mesh>
    </group>
  );
}

// Each station models the physical wireless equipment taught in that chapter.
function StationShape({ index, pal, accent }) {
  switch (index) {
    case 0: {
      // Bab 01 — Sejarah: 1887 Hertz Spark-Gap Dipole -> 1999 802.11b AP -> Modern Wi-Fi 7 Tri-Band Router
      return (
        <group>
          {/* Left: 1887 Hertzian Brass Spark-Gap Resonator on wooden/slate plinth */}
          <group position={[-0.62, 0, 0.1]}>
            <mesh position={[0, 0.1, 0]} castShadow>
              <boxGeometry args={[0.42, 0.08, 0.28]} />
              <meshStandardMaterial color={pal.darkMetal} roughness={0.6} metalness={0.3} />
            </mesh>
            {/* Induction coil cylinder */}
            <mesh position={[0, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.07, 0.07, 0.26, 16]} />
              <meshStandardMaterial color={pal.brass} roughness={0.35} metalness={0.8} />
            </mesh>
            {/* Brass dipole rods + spark gap spheres */}
            {[-1, 1].map((dir) => (
              <group key={dir}>
                <mesh position={[dir * 0.12, 0.42, 0]} castShadow>
                  <cylinderGeometry args={[0.012, 0.012, 0.34, 8]} />
                  <meshStandardMaterial color={pal.brass} roughness={0.25} metalness={0.88} />
                </mesh>
                <mesh position={[dir * 0.11, 0.58, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.16, 8]} />
                  <meshStandardMaterial color={pal.brass} roughness={0.25} metalness={0.88} />
                </mesh>
                <mesh position={[dir * 0.032, 0.58, 0]}>
                  <sphereGeometry args={[0.026, 12, 12]} />
                  <meshStandardMaterial color={pal.brass} roughness={0.18} metalness={0.92} />
                </mesh>
              </group>
            ))}
            {/* Spark arc */}
            <mesh position={[0, 0.58, 0]}>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshBasicMaterial color={accent} />
            </mesh>
          </group>

          {/* Center: Classic 1999 IEEE 802.11b Two-Tone Desktop Access Point */}
          <group position={[0, 0, -0.08]}>
            <mesh position={[0, 0.14, 0]} castShadow>
              <boxGeometry args={[0.46, 0.14, 0.36]} />
              <meshStandardMaterial color={pal.chassis} roughness={0.45} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0.14, 0.16]}>
              <boxGeometry args={[0.44, 0.11, 0.05]} />
              <meshStandardMaterial color={pal.metal} roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Single rubber-duck dipole antenna */}
            <mesh position={[0.16, 0.42, -0.14]} castShadow>
              <cylinderGeometry args={[0.016, 0.022, 0.48, 10]} />
              <meshStandardMaterial color={pal.darkMetal} roughness={0.5} metalness={0.4} />
            </mesh>
          </group>

          {/* Right: Modern IEEE 802.11be (Wi-Fi 7) Multi-Antenna High-Throughput Router */}
          <group position={[0.6, 0, 0.12]}>
            <mesh position={[0, 0.16, 0]} castShadow>
              <boxGeometry args={[0.52, 0.14, 0.38]} />
              <meshStandardMaterial color={pal.chassis} roughness={0.3} metalness={0.65} />
            </mesh>
            {/* Front LED telemetry bar */}
            <mesh position={[0, 0.17, 0.192]}>
              <boxGeometry args={[0.38, 0.022, 0.01]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} />
            </mesh>
            {/* 4 External High-Gain Blade Antennas */}
            {[-0.22, -0.08, 0.08, 0.22].map((x, k) => (
              <mesh
                key={x}
                position={[x, 0.48, -0.17]}
                rotation={[-0.1, 0, (k - 1.5) * -0.08]}
                castShadow
              >
                <boxGeometry args={[0.036, 0.56, 0.016]} />
                <meshStandardMaterial color={k === 3 ? accent : pal.body} roughness={0.3} metalness={0.6} />
              </mesh>
            ))}
          </group>
        </group>
      );
    }

    case 1: {
      // Bab 02 — Jenis-Jenis Antena: Fiberglass Collinear Omni + Yagi-Uda Boom + Sectoral Panel
      return (
        <group>
          {/* Central galvanized mast */}
          <mesh position={[-0.22, 0.85, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 1.7, 16]} />
            <meshStandardMaterial color={pal.metal} roughness={0.35} metalness={0.8} />
          </mesh>

          {/* Top: Fiberglass Collinear Omnidirectional Whip + brass N-connector + 3D doughnut pattern */}
          <mesh position={[-0.22, 1.72, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.14, 16]} />
            <meshStandardMaterial color={pal.brass} roughness={0.25} metalness={0.88} />
          </mesh>
          <mesh position={[-0.22, 2.15, 0]} castShadow>
            <cylinderGeometry args={[0.028, 0.038, 0.78, 16]} />
            <meshStandardMaterial color={pal.radome} roughness={0.25} metalness={0.15} />
          </mesh>
          <mesh position={[-0.22, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.18, 16, 48]} />
            <meshStandardMaterial color={accent} transparent opacity={0.28} depthWrite={false} />
          </mesh>

          {/* Right Branch: Realistic Yagi-Uda Directional Antenna (boom + reflector + driven dipole + 5 directors) */}
          <group position={[0.18, 1.18, 0]} rotation={[0, 0.25, 0]}>
            {/* Mounting clamp & feed box */}
            <mesh position={[-0.36, -0.05, 0]}>
              <boxGeometry args={[0.12, 0.1, 0.1]} />
              <meshStandardMaterial color={pal.darkMetal} roughness={0.4} metalness={0.7} />
            </mesh>
            {/* Horizontal boom */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.018, 0.018, 1.05, 12]} />
              <meshStandardMaterial color={pal.metal} roughness={0.3} metalness={0.85} />
            </mesh>
            {/* Parasitic & driven elements along boom */}
            {[
              { x: -0.44, len: 0.58 }, // Reflector
              { x: -0.26, len: 0.5, driven: true }, // Driven element
              { x: -0.08, len: 0.43 },
              { x: 0.1, len: 0.4 },
              { x: 0.26, len: 0.37 },
              { x: 0.42, len: 0.34 },
            ].map((el) => (
              <mesh key={el.x} position={[el.x, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.011, 0.011, el.len, 8]} />
                <meshStandardMaterial
                  color={el.driven ? accent : pal.body}
                  emissive={el.driven ? accent : '#000000'}
                  emissiveIntensity={el.driven ? 0.5 : 0}
                  roughness={0.28}
                  metalness={0.8}
                />
              </mesh>
            ))}
          </group>
        </group>
      );
    }

    case 2: {
      // Bab 03 — Topologi PTP & PTMP: Menara BTS Sektoral 3-Panel memancar ke 3 CPE Dish Klien
      return (
        <group position={[0, 0, -0.15]}>
          {/* Tapered BTS Tower Mast with cross-bracing */}
          <mesh position={[0, 0.9, -0.25]} castShadow>
            <cylinderGeometry args={[0.06, 0.14, 1.8, 6]} />
            <meshStandardMaterial color={pal.metal} roughness={0.38} metalness={0.78} />
          </mesh>
          {[0.35, 0.75, 1.15].map((y) => (
            <mesh key={y} position={[0, y, -0.25]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.11 - y * 0.03, 0.012, 6, 6]} />
              <meshStandardMaterial color={pal.darkMetal} roughness={0.5} metalness={0.7} />
            </mesh>
          ))}

          {/* 3 Sectoral Panel Antennas (120° array) at top of BTS tower */}
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle) => (
            <group
              key={angle}
              position={[Math.sin(angle) * 0.14, 1.55, -0.25 + Math.cos(angle) * 0.14]}
              rotation={[0.08, angle, 0]}
            >
              <mesh castShadow>
                <boxGeometry args={[0.14, 0.44, 0.05]} />
                <meshStandardMaterial color={pal.radome} roughness={0.3} metalness={0.2} />
              </mesh>
              <mesh position={[0, 0, -0.032]}>
                <boxGeometry args={[0.08, 0.38, 0.02]} />
                <meshStandardMaterial color={pal.darkMetal} roughness={0.5} metalness={0.7} />
              </mesh>
            </group>
          ))}

          {/* 3 Outdoor Client CPE Dishes receiving PTMP beams */}
          {[-0.72, 0, 0.72].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.38, 0.68]} castShadow>
                <cylinderGeometry args={[0.025, 0.035, 0.76, 12]} />
                <meshStandardMaterial color={pal.metal} roughness={0.4} metalness={0.75} />
              </mesh>
              <ParabolicDish
                radius={0.19}
                depth={0.08}
                pal={pal}
                accent={accent}
                position={[x, 0.72, 0.65]}
                rotation={[-1.1, -x * 0.55, 0]}
              />
              <Line
                points={[
                  [0, 1.55, -0.22],
                  [x, 0.72, 0.65],
                ]}
                color={accent}
                lineWidth={1.8}
              />
            </group>
          ))}
        </group>
      );
    }

    case 3: {
      // Bab 04 — Faktor Keberhasilan: Link Point-to-Point 2 Antena Parabola + Zona Fresnel 3D
      return (
        <group>
          {/* Left & Right Telecom Masts with Parabolic Dishes facing each other */}
          {[-0.88, 0.88].map((x) => {
            const dir = x < 0 ? 1 : -1;
            return (
              <group key={x} position={[x, 0, 0]}>
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.16, 0.2, 0.1, 16]} />
                  <meshStandardMaterial color={pal.darkMetal} roughness={0.5} metalness={0.7} />
                </mesh>
                <mesh position={[0, 0.68, 0]} castShadow>
                  <cylinderGeometry args={[0.04, 0.055, 1.32, 16]} />
                  <meshStandardMaterial color={pal.metal} roughness={0.35} metalness={0.8} />
                </mesh>
                {/* Outdoor radio transceiver box behind dish */}
                <mesh position={[-dir * 0.08, 1.22, 0]} castShadow>
                  <boxGeometry args={[0.1, 0.22, 0.14]} />
                  <meshStandardMaterial color={pal.radome} roughness={0.35} metalness={0.3} />
                </mesh>
                <ParabolicDish
                  radius={0.34}
                  depth={0.14}
                  pal={pal}
                  accent={accent}
                  position={[dir * 0.04, 1.22, 0]}
                  rotation={[0, 0, -dir * (Math.PI / 2)]}
                />
              </group>
            );
          })}

          {/* Outer First Fresnel Zone (F1) prolate ellipsoid */}
          <mesh position={[0, 1.22, 0]} scale={[0.78, 0.29, 0.29]}>
            <sphereGeometry args={[1, 32, 16]} />
            <meshStandardMaterial color={accent} transparent opacity={0.22} depthWrite={false} />
          </mesh>
          {/* Inner 60% Fresnel clearance zone */}
          <mesh position={[0, 1.22, 0]} scale={[0.78, 0.17, 0.17]}>
            <sphereGeometry args={[1, 20, 12]} />
            <meshBasicMaterial color={accent} wireframe transparent opacity={0.45} />
          </mesh>
          {/* Direct Line-of-Sight (LoS) beam between feedhorns */}
          <Line
            points={[
              [-0.65, 1.22, 0],
              [0.65, 1.22, 0],
            ]}
            color={accent}
            lineWidth={2.2}
          />
        </group>
      );
    }

    case 4: {
      // Bab 05 — Perangkat Keras: Wireless Router 4-Antena + Managed Switch PoE 8-Port + Kabel Patch
      return (
        <group>
          {/* Bottom: 1U 8-Port Managed PoE+ Switch */}
          <group position={[0, 0.14, 0.18]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.08, 0.16, 0.56]} />
              <meshStandardMaterial color={pal.darkMetal} roughness={0.4} metalness={0.72} />
            </mesh>
            {/* Front bezel */}
            <mesh position={[0, 0, 0.282]}>
              <boxGeometry args={[1.04, 0.13, 0.012]} />
              <meshStandardMaterial color={pal.chassis} roughness={0.5} metalness={0.4} />
            </mesh>
            {/* 8 RJ45 PoE+ Ports with active link LEDs */}
            {Array.from({ length: 8 }).map((_, p) => {
              const px = -0.34 + p * 0.095;
              return (
                <group key={p} position={[px, -0.01, 0.29]}>
                  <mesh>
                    <boxGeometry args={[0.065, 0.052, 0.01]} />
                    <meshStandardMaterial color="#090d16" roughness={0.8} />
                  </mesh>
                  <mesh position={[0, 0.038, 0.002]}>
                    <boxGeometry args={[0.045, 0.012, 0.006]} />
                    <meshStandardMaterial
                      color={p < 4 ? accent : pal.brass}
                      emissive={p < 4 ? accent : pal.brass}
                      emissiveIntensity={0.9}
                    />
                  </mesh>
                </group>
              );
            })}
          </group>

          {/* Top-Back: Dual-Band / Tri-Band Enterprise Wireless Router with 4 Articulated Dipole Blades */}
          <group position={[0, 0.36, -0.14]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.88, 0.16, 0.52]} />
              <meshStandardMaterial color={pal.chassis} roughness={0.35} metalness={0.55} />
            </mesh>
            {/* Top ventilation heatsink slats */}
            {[-0.26, -0.13, 0, 0.13, 0.26].map((vx) => (
              <mesh key={vx} position={[vx, 0.083, 0]}>
                <boxGeometry args={[0.07, 0.008, 0.38]} />
                <meshStandardMaterial color={pal.darkMetal} roughness={0.6} metalness={0.5} />
              </mesh>
            ))}
            {/* Front LED telemetry strip */}
            <mesh position={[0, 0.02, 0.262]}>
              <boxGeometry args={[0.62, 0.028, 0.01]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.95} />
            </mesh>
            {/* 4 External Articulated Blade Antennas with SMA knuckles */}
            {[-0.36, -0.12, 0.12, 0.36].map((ax, i) => (
              <group key={ax} position={[ax, 0.04, -0.28]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.028, 0.028, 0.07, 12]} />
                  <meshStandardMaterial color={pal.brass} roughness={0.25} metalness={0.85} />
                </mesh>
                <mesh
                  position={[0, 0.38, -0.02]}
                  rotation={[-0.08, 0, (i - 1.5) * -0.1]}
                  castShadow
                >
                  <boxGeometry args={[0.045, 0.68, 0.02]} />
                  <meshStandardMaterial color={pal.body} roughness={0.35} metalness={0.6} />
                </mesh>
              </group>
            ))}
          </group>

          {/* PoE Cat6 Patch Cable linking Switch Port 1 to Router WAN/PoE input */}
          <Line
            points={[
              [-0.34, 0.14, 0.48],
              [-0.48, 0.24, 0.56],
              [-0.48, 0.36, 0.12],
              [-0.25, 0.36, -0.1],
            ]}
            color={accent}
            lineWidth={2.5}
          />
        </group>
      );
    }

    case 5: {
      // Bab 06 — Keamanan WPA3: Hardware Security Appliance + Gembok Kriptografi 3D & Kubah Proteksi
      return (
        <group>
          {/* Base: Hardware Firewall / WIDS Sensor Unit */}
          <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.92, 0.16, 0.62]} />
            <meshStandardMaterial color={pal.chassis} roughness={0.4} metalness={0.6} />
          </mesh>
          {[-0.38, 0.38].map((x) => (
            <mesh key={x} position={[x, 0.42, -0.24]} castShadow>
              <cylinderGeometry args={[0.018, 0.024, 0.48, 12]} />
              <meshStandardMaterial color={pal.metal} roughness={0.35} metalness={0.75} />
            </mesh>
          ))}

          {/* Center: 3D Metallic WPA3 Padlock */}
          <group position={[0, 0.68, 0]}>
            {/* Padlock body */}
            <mesh position={[0, -0.08, 0]} castShadow>
              <boxGeometry args={[0.46, 0.42, 0.2]} />
              <meshStandardMaterial color={pal.body} roughness={0.28} metalness={0.78} />
            </mesh>
            {/* Glowing keyhole emblem */}
            <mesh position={[0, -0.05, 0.105]}>
              <cylinderGeometry args={[0.055, 0.055, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1} />
            </mesh>
            <mesh position={[0, -0.14, 0.105]}>
              <boxGeometry args={[0.045, 0.12, 0.02]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1} />
            </mesh>
            {/* Hardened steel U-shackle */}
            <mesh position={[0, 0.14, 0]}>
              <torusGeometry args={[0.14, 0.038, 16, 32, Math.PI]} />
              <meshStandardMaterial color={pal.metal} roughness={0.2} metalness={0.9} />
            </mesh>
          </group>

          {/* Geodesic encryption shield dome */}
          <mesh position={[0, 0.72, 0]}>
            <icosahedronGeometry args={[0.78, 1]} />
            <meshBasicMaterial color={accent} wireframe transparent opacity={0.55} />
          </mesh>
        </group>
      );
    }

    case 6: {
      // Bab 07 — Perbandingan Teknologi: 4 Cincin Jangkauan + Perangkat Nyata (NFC, Sensor Zigbee, AP Wi-Fi, Gateway LoRaWAN)
      return (
        <group>
          {/* 4 Concentric Range Rings (NFC -> BLE/Zigbee -> Wi-Fi -> LoRaWAN) */}
          {[0.28, 0.54, 0.8, 1.06].map((r, idx) => (
            <mesh key={r} position-y={0.08} rotation-x={Math.PI / 2}>
              <torusGeometry args={[r, 0.022, 10, 64]} />
              <meshBasicMaterial color={idx === 3 ? accent : pal.body} />
            </mesh>
          ))}

          {/* 1. Inner Ring (NFC): Contactless Smart Card + Smartphone Reader */}
          <group position={[-0.22, 0.16, 0.18]} rotation={[0, 0.4, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.025, 0.14]} />
              <meshStandardMaterial color={pal.chassis} roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0.04, 0.06, -0.02]} rotation={[0.15, 0, -0.1]} castShadow>
              <boxGeometry args={[0.18, 0.012, 0.11]} />
              <meshStandardMaterial color={accent} roughness={0.25} metalness={0.4} />
            </mesh>
          </group>

          {/* 2. Second Ring (BLE / Zigbee): Compact Smart IoT Sensor Node */}
          <group position={[0.46, 0.16, 0.24]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.13, 0.14, 0.12, 20]} />
              <meshStandardMaterial color={pal.radome} roughness={0.35} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0.065, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
            </mesh>
          </group>

          {/* 3. Third Ring (Wi-Fi): Dual-Antenna Indoor Access Point */}
          <group position={[-0.58, 0.16, -0.45]} rotation={[0, 0.5, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.34, 0.09, 0.24]} />
              <meshStandardMaterial color={pal.body} roughness={0.35} metalness={0.5} />
            </mesh>
            {[-0.12, 0.12].map((ax) => (
              <mesh key={ax} position={[ax, 0.18, -0.1]} castShadow>
                <cylinderGeometry args={[0.014, 0.018, 0.28, 8]} />
                <meshStandardMaterial color={pal.darkMetal} roughness={0.4} metalness={0.7} />
              </mesh>
            ))}
          </group>

          {/* 4. Outer Ring (LoRaWAN): Tall Outdoor Sub-GHz Gateway Tower & Fiberglass Antenna */}
          <group position={[0.25, 0, -0.68]}>
            <mesh position={[0, 0.65, 0]} castShadow>
              <cylinderGeometry args={[0.035, 0.05, 1.3, 16]} />
              <meshStandardMaterial color={pal.metal} roughness={0.35} metalness={0.8} />
            </mesh>
            {/* Weatherproof IP67 LoRa concentrator enclosure */}
            <mesh position={[0, 0.72, 0.09]} castShadow>
              <boxGeometry args={[0.28, 0.38, 0.14]} />
              <meshStandardMaterial color={pal.radome} roughness={0.35} metalness={0.25} />
            </mesh>
            {/* High-gain 915 MHz fiberglass whip */}
            <mesh position={[0, 1.55, 0]} castShadow>
              <cylinderGeometry args={[0.022, 0.03, 0.65, 12]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} roughness={0.25} />
            </mesh>
          </group>
        </group>
      );
    }

    default: {
      // Bab 08 — Tantangan Desain & High-Density WLAN: Overhead Multi-Radio AP Serving Laptops & Smartphones
      return (
        <group>
          {/* Central suspension column + Enterprise High-Density Stadium AP */}
          <mesh position={[0, 0.78, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.05, 1.5, 16]} />
            <meshStandardMaterial color={pal.metal} roughness={0.35} metalness={0.8} />
          </mesh>
          <mesh position={[0, 1.55, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.42, 0.12, 32]} />
            <meshStandardMaterial color={pal.radome} roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh position={[0, 1.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.24, 0.022, 12, 40]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1} />
          </mesh>

          {/* 6 Miniature Laptops + 6 Smartphones arranged in high-density client rings */}
          {Array.from({ length: 6 }).map((_, k) => {
            const angle = (k / 6) * Math.PI * 2;
            const lx = Math.cos(angle) * 0.76;
            const lz = Math.sin(angle) * 0.76;
            const px = Math.cos(angle + Math.PI / 6) * 0.44;
            const pz = Math.sin(angle + Math.PI / 6) * 0.44;
            return (
              <group key={k}>
                <MiniLaptop
                  position={[lx, 0.07, lz]}
                  rotation={[0, -angle + Math.PI / 2, 0]}
                  scale={0.62}
                  pal={pal}
                  accent={accent}
                />
                {/* Smartphone client */}
                <mesh
                  position={[px, 0.09, pz]}
                  rotation={[-Math.PI / 2 + 0.25, 0, -angle]}
                  castShadow
                >
                  <boxGeometry args={[0.11, 0.2, 0.02]} />
                  <meshStandardMaterial color={pal.chassis} roughness={0.3} metalness={0.7} />
                </mesh>
              </group>
            );
          })}
        </group>
      );
    }
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
      {/* Beveled metallic turntable plinth */}
      <mesh position-y={0.035} receiveShadow>
        <cylinderGeometry args={[1.26, 1.34, 0.07, 48]} />
        <meshStandardMaterial color={pal.pad} roughness={0.55} metalness={0.45} />
      </mesh>
      <mesh position-y={0.072} receiveShadow>
        <cylinderGeometry args={[1.18, 1.22, 0.02, 48]} />
        <meshStandardMaterial color={pal.padTop} roughness={0.75} metalness={0.2} />
      </mesh>
      <mesh position-y={0.084} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.17, 1.25, 64]} />
        <meshBasicMaterial color={accent} side={THREE.DoubleSide} />
      </mesh>

      <StationShape index={index} pal={pal} accent={accent} />

      {!isActive && (
        <Html position={[0, 2.55, 0]} center distanceFactor={11} zIndexRange={[2, 0]} pointerEvents="none">
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
      <hemisphereLight args={['#e0f2fe', '#0f172a', 0.65]} />
      <directionalLight
        position={[9, 16, 11]}
        intensity={1.55}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={42}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-10, 8, -8]} intensity={0.55} color="#38bdf8" />
      <pointLight position={[0, 4.5, 0]} intensity={0.9} distance={18} color={pal.active} />

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial color={pal.ground} roughness={0.92} metalness={0.05} />
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
      <Canvas shadows dpr={[1, 1.75]} camera={initialCamera} style={{ touchAction: 'pan-y' }}>
        <color attach="background" args={[pal.bg]} />
        <fog attach="fog" args={[pal.bg, 18, 46]} />
        <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} paused={paused} />
        <World pal={pal} activeStation={activeStation} completed={completed} paused={paused} onSelect={onSelect} />
      </Canvas>
    </WebGLBoundary>
  );
}
