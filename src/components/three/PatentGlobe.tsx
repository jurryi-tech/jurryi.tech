"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

/* ── European country ISO codes ── */
const EUROPE_CODES = new Set([
  "040","056","100","191","203","208","233","246","250","276","300",
  "348","352","372","380","428","440","442","528","578","616","620",
  "642","703","705","724","752","756","826","008","070","499","688",
  "807","112","804",
]);
const USA_CODE = "840";
const INDIA_CODE = "356";

/* ── Colors ── */
const OCEAN_COLOR = "#D4E4ED";
const LAND_COLOR = "#C8C3B8";
const LAND_STROKE = "#A09A8E";
const USA_COLOR = "rgba(27, 42, 74, 0.7)";
const USA_STROKE = "#1B2A4A";
const INDIA_COLOR = "rgba(196, 91, 40, 0.65)";
const INDIA_STROKE = "#C45B28";
const EUROPE_COLOR = "rgba(0, 51, 153, 0.55)";
const EUROPE_STROKE = "#003399";

function useGlobeTexture() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function buildTexture() {
      try {
        // Dynamic imports for world-atlas and topojson
        const [worldData, topojsonClient, d3Geo] = await Promise.all([
          import("world-atlas/countries-110m.json"),
          import("topojson-client"),
          import("d3-geo"),
        ]);

        if (cancelled) return;

        const topology = worldData.default || worldData;
        const countriesGeo = topojsonClient.feature(
          topology as any,
          (topology as any).objects.countries
        ) as any;

        // Create high-res canvas
        const canvas = document.createElement("canvas");
        canvas.width = 4096;
        canvas.height = 2048;
        const ctx = canvas.getContext("2d")!;

        // Ocean background
        ctx.fillStyle = OCEAN_COLOR;
        ctx.fillRect(0, 0, 4096, 2048);

        // Subtle grid
        ctx.strokeStyle = "rgba(180, 200, 220, 0.3)";
        ctx.lineWidth = 0.5;
        for (let lon = -180; lon <= 180; lon += 30) {
          const x = ((lon + 180) / 360) * 4096;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 2048);
          ctx.stroke();
        }
        for (let lat = -90; lat <= 90; lat += 30) {
          const y = ((90 - lat) / 180) * 2048;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(4096, y);
          ctx.stroke();
        }

        // Create equirectangular projection for the canvas
        const projection = d3Geo.geoEquirectangular()
          .fitSize([4096, 2048], { type: "Sphere" } as any);

        const pathGen = d3Geo.geoPath(projection, ctx);

        // Draw all countries (base land color)
        for (const feature of countriesGeo.features) {
          ctx.beginPath();
          pathGen(feature);
          ctx.fillStyle = LAND_COLOR;
          ctx.fill();
          ctx.strokeStyle = LAND_STROKE;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Overlay jurisdiction-specific colors
        for (const feature of countriesGeo.features) {
          const id = feature.id || feature.properties?.id;
          let fillColor = "";
          let strokeColor = "";

          if (id === USA_CODE) {
            fillColor = USA_COLOR;
            strokeColor = USA_STROKE;
          } else if (id === INDIA_CODE) {
            fillColor = INDIA_COLOR;
            strokeColor = INDIA_STROKE;
          } else if (EUROPE_CODES.has(id)) {
            fillColor = EUROPE_COLOR;
            strokeColor = EUROPE_STROKE;
          }

          if (fillColor) {
            ctx.beginPath();
            pathGen(feature);
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        if (!cancelled) setTexture(tex);
      } catch (err) {
        console.warn("Globe texture build failed:", err);
      }
    }

    buildTexture();
    return () => { cancelled = true; };
  }, []);

  return texture;
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useGlobeTexture();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group rotation={[0.15, 0, 0]}>
      {/* Main globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            roughness={0.7}
            metalness={0.05}
          />
        ) : (
          <meshStandardMaterial color="#C8C3B8" roughness={0.8} />
        )}
      </mesh>
      {/* Atmosphere glow */}
      <mesh scale={[1.03, 1.03, 1.03]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#87CEEB"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#C5A44E"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function JurisdictionMarker({ lat, lon, color }: { lat: number; lon: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(lat, lon, 2.02), [lat, lon]);

  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.4;
      ref.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={ref} position={pos}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={pos}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function ConnectionArcs() {
  const ref = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const jurisdictions = [
      { lat: 38.9, lon: -77.05 },
      { lat: 28.6, lon: 77.2 },
      { lat: 48.14, lon: 11.58 },
    ];
    const result: THREE.Vector3[][] = [];
    for (let i = 0; i < jurisdictions.length; i++) {
      for (let j = i + 1; j < jurisdictions.length; j++) {
        const start = latLonToVec3(jurisdictions[i].lat, jurisdictions[i].lon, 2.02);
        const end = latLonToVec3(jurisdictions[j].lat, jurisdictions[j].lon, 2.02);
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.8);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        result.push(curve.getPoints(50));
      }
    }
    return result;
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
      {arcs.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#C5A44E" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
}

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 150;
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
      <pointsMaterial color="#C5A44E" size={0.01} transparent opacity={0.3} />
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

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.7} color="#FFF8F0" />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#FFFFFF" />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#C5A44E" distance={5} />

      <Globe />

      <JurisdictionMarker lat={38.9} lon={-77.05} color="#1B2A4A" />
      <JurisdictionMarker lat={28.6} lon={77.2} color="#C45B28" />
      <JurisdictionMarker lat={48.14} lon={11.58} color="#003399" />

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
      <div className="w-12 h-12 border border-[#C5A44E]/30 rounded-full animate-spin border-t-[#C5A44E]" />
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
