"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

/* ── Simplified continent coordinate data (lon, lat polygons) ── */
/* Each continent is an array of [lon, lat] points forming rough outlines */

const NORTH_AMERICA: [number, number][][] = [
  // Main landmass
  [[-130,55],[-125,60],[-120,62],[-110,65],[-100,68],[-95,70],[-85,72],[-75,73],[-65,70],[-60,65],[-55,55],[-60,48],[-65,45],[-70,43],[-75,40],[-80,35],[-82,30],[-85,28],[-90,28],[-95,27],[-100,28],[-105,30],[-110,32],[-115,33],[-120,35],[-122,38],[-124,42],[-125,45],[-128,50],[-130,55]],
  // Mexico/Central America
  [[-115,33],[-110,32],[-105,30],[-100,28],[-95,27],[-90,28],[-88,20],[-90,16],[-92,15],[-95,16],[-100,18],[-105,20],[-110,24],[-115,28],[-115,33]],
];

const SOUTH_AMERICA: [number, number][][] = [
  [[-80,10],[-75,12],[-70,12],[-65,10],[-60,5],[-52,3],[-48,0],[-45,-3],[-40,-8],[-38,-12],[-35,-15],[-38,-20],[-42,-22],[-45,-23],[-48,-26],[-50,-28],[-52,-32],[-55,-35],[-58,-38],[-62,-40],[-65,-42],[-68,-46],[-72,-48],[-75,-50],[-73,-45],[-72,-40],[-70,-35],[-70,-30],[-70,-25],[-72,-20],[-75,-15],[-78,-5],[-80,0],[-78,5],[-80,10]],
];

const EUROPE: [number, number][][] = [
  [[-10,36],[-8,38],[-10,42],[-8,44],[-2,44],[0,46],[2,48],[5,48],[8,48],[10,50],[12,52],[14,54],[10,56],[12,58],[10,60],[5,62],[8,64],[12,66],[15,68],[20,70],[25,70],[30,68],[32,65],[30,62],[28,58],[28,55],[24,52],[20,48],[18,46],[15,44],[14,42],[16,40],[22,38],[26,40],[28,42],[30,42],[32,40],[28,36],[24,36],[20,36],[14,38],[10,38],[5,38],[2,38],[0,36],[-5,36],[-10,36]],
];

const AFRICA: [number, number][][] = [
  [[-18,16],[-16,20],[-18,24],[-15,28],[-5,36],[0,36],[10,38],[14,38],[20,36],[25,32],[30,32],[32,30],[35,28],[38,22],[42,12],[45,10],[48,8],[50,4],[50,0],[45,-5],[42,-10],[40,-15],[38,-20],[35,-25],[32,-28],[28,-32],[26,-34],[20,-34],[18,-32],[16,-28],[14,-24],[12,-18],[10,-12],[8,-5],[6,0],[5,5],[2,5],[-2,5],[-8,5],[-12,8],[-16,12],[-18,16]],
];

const ASIA: [number, number][][] = [
  // Main Asia landmass
  [[30,42],[32,40],[35,38],[38,36],[40,35],[42,32],[45,28],[48,30],[50,28],[55,25],[58,24],[60,25],[62,28],[65,30],[68,28],[72,22],[75,18],[78,10],[80,8],[82,10],[85,15],[88,22],[90,24],[92,22],[95,18],[98,16],[100,15],[102,12],[105,10],[108,14],[110,18],[112,22],[115,24],[118,28],[120,30],[122,32],[124,35],[126,38],[128,40],[130,42],[135,45],[140,42],[142,44],[145,48],[142,50],[138,52],[135,55],[130,58],[125,60],[120,62],[115,60],[110,58],[100,62],[95,65],[90,68],[85,70],[80,72],[75,72],[70,70],[65,68],[60,68],[55,65],[50,55],[45,52],[42,48],[40,45],[35,42],[30,42]],
];

const INDIA: [number, number][][] = [
  [[68,28],[72,22],[75,18],[78,10],[80,8],[82,10],[85,15],[88,22],[90,24],[88,26],[85,28],[82,28],[78,30],[75,32],[72,30],[68,28]],
];

const USA_MAINLAND: [number, number][][] = [
  [[-125,48],[-122,48],[-120,46],[-118,42],[-122,38],[-124,42],[-125,45],[-125,48]],
  [[-120,46],[-115,46],[-110,45],[-105,45],[-100,48],[-95,48],[-90,48],[-85,46],[-82,44],[-78,42],[-75,40],[-72,42],[-70,42],[-68,44],[-70,45],[-72,44],[-75,42],[-78,40],[-80,38],[-82,35],[-80,32],[-82,30],[-85,28],[-90,28],[-95,27],[-98,28],[-100,30],[-105,32],[-110,32],[-115,33],[-120,35],[-122,38],[-118,42],[-120,46]],
];

const AUSTRALIA: [number, number][][] = [
  [[115,-35],[118,-35],[120,-33],[124,-32],[128,-30],[130,-28],[132,-25],[135,-22],[138,-18],[140,-16],[142,-14],[144,-16],[148,-18],[150,-22],[152,-25],[154,-28],[152,-32],[150,-35],[148,-38],[145,-38],[140,-38],[135,-38],[130,-38],[125,-36],[120,-35],[115,-35]],
];

function createGlobeTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Ocean
  ctx.fillStyle = "#E8E4DC";
  ctx.fillRect(0, 0, 2048, 1024);

  // Grid lines
  ctx.strokeStyle = "rgba(200, 195, 185, 0.4)";
  ctx.lineWidth = 0.5;
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * 2048;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let lat = -90; lat <= 90; lat += 30) {
    const y = ((90 - lat) / 180) * 1024;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();
  }

  function lonLatToCanvas(lon: number, lat: number): [number, number] {
    const x = ((lon + 180) / 360) * 2048;
    const y = ((90 - lat) / 180) * 1024;
    return [x, y];
  }

  function drawRegion(polygons: [number, number][][], fillColor: string, strokeColor: string) {
    polygons.forEach((polygon) => {
      ctx.beginPath();
      polygon.forEach(([lon, lat], i) => {
        const [x, y] = lonLatToCanvas(lon, lat);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  // Draw continents with neutral color first
  const landColor = "#C5C0B5";
  const landStroke = "#A09A8E";

  drawRegion(NORTH_AMERICA, landColor, landStroke);
  drawRegion(SOUTH_AMERICA, landColor, landStroke);
  drawRegion(AFRICA, landColor, landStroke);
  drawRegion(ASIA, landColor, landStroke);
  drawRegion(AUSTRALIA, landColor, landStroke);
  drawRegion(EUROPE, landColor, landStroke);

  // Overlay jurisdiction-specific colors
  // USA — navy blue
  drawRegion(USA_MAINLAND, "rgba(27, 42, 74, 0.6)", "#1B2A4A");

  // India — saffron/orange
  drawRegion(INDIA, "rgba(196, 91, 40, 0.6)", "#C45B28");

  // Europe — royal blue
  drawRegion(EUROPE, "rgba(0, 51, 153, 0.5)", "#003399");

  return canvas;
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = createGlobeTexture();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  if (!texture) return null;

  return (
    <group rotation={[0.2, 0, 0]}>
      {/* Main globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#C5A44E"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer glow ring */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#8B7355"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function JurisdictionMarker({ lat, lon, color, label }: { lat: number; lon: number; color: string; label: string }) {
  const ref = useRef<THREE.Mesh>(null);

  const pos = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -2.02 * Math.sin(phi) * Math.cos(theta),
      2.02 * Math.cos(phi),
      2.02 * Math.sin(phi) * Math.sin(theta)
    );
  }, [lat, lon]);

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Pulsing marker dot */}
      <mesh ref={ref} position={pos}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Static base dot */}
      <mesh position={pos}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Beam line going outward */}
      <BeamLine from={pos} color={color} />
    </group>
  );
}

function BeamLine({ from, color }: { from: THREE.Vector3; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const direction = from.clone().normalize();
  const endPos = from.clone().add(direction.clone().multiplyScalar(0.8));
  const midPos = from.clone().add(direction.clone().multiplyScalar(0.4));

  useFrame((state) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.2 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });

  // Calculate rotation to align cylinder with direction
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    return q;
  }, [direction]);

  return (
    <mesh
      ref={ref}
      position={midPos}
      quaternion={quaternion}
    >
      <cylinderGeometry args={[0.004, 0.004, 0.8, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

function ConnectionArcs() {
  const ref = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const jurisdictions = [
      { lat: 38.9, lon: -77.05 },  // USA
      { lat: 28.6, lon: 77.2 },    // India
      { lat: 48.14, lon: 11.58 },  // Europe
    ];

    const arcGeometries: { points: THREE.Vector3[]; color: string }[] = [];
    const colors = ["#C5A44E", "#C5A44E", "#C5A44E"];

    for (let i = 0; i < jurisdictions.length; i++) {
      for (let j = i + 1; j < jurisdictions.length; j++) {
        const start = latLonToVec3(jurisdictions[i].lat, jurisdictions[i].lon, 2.02);
        const end = latLonToVec3(jurisdictions[j].lat, jurisdictions[j].lon, 2.02);
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.8);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(50);
        arcGeometries.push({ points, color: colors[i] });
      }
    }

    return arcGeometries;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const line = child as THREE.Line;
        (line.material as THREE.LineBasicMaterial).opacity =
          0.15 + Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={ref}>
      {arcs.map((arc, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(arc.points.flatMap((p) => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={arc.color} transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
}

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame(() => {
    if (ref.current) {
      const posArr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] += 0.001;
        if (posArr[i * 3 + 1] > 4) posArr[i * 3 + 1] = -3;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C5A44E" size={0.012} transparent opacity={0.35} />
    </points>
  );
}

function ConvergencePoint() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={ref as React.RefObject<THREE.Mesh>} position={[0, 3.2, 0]}>
        <icosahedronGeometry args={[0.15, 0]} />
        <meshPhysicalMaterial
          color="#C5A44E"
          metalness={0.4}
          roughness={0.1}
          emissive="#C5A44E"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.6} color="#FFF8F0" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFFFFF" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#C5A44E" distance={5} />

      <Globe />

      <JurisdictionMarker lat={38.9} lon={-77.05} color="#1B2A4A" label="USPTO" />
      <JurisdictionMarker lat={28.6} lon={77.2} color="#C45B28" label="IPO" />
      <JurisdictionMarker lat={48.14} lon={11.58} color="#003399" label="EPO" />

      <ConnectionArcs />
      <ConvergencePoint />
      <AmbientParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        dampingFactor={0.05}
        enableDamping
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </>
  );
}

function GlobeLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border border-gold/30 rounded-full animate-spin border-t-gold" />
    </div>
  );
}

export default function PatentGlobe() {
  return (
    <div className="w-full h-full three-canvas-container" style={{ background: "radial-gradient(circle at center, #FDFBF7 0%, #F0EDE6 100%)" }}>
      <Suspense fallback={<GlobeLoading />}>
        <Canvas
          camera={{ position: [0, 1, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <GlobeScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
