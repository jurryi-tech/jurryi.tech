"use client";
import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

const IPC_CODES = [
  "H04L", "G06F", "A61K", "B60W", "G06N", "H01L", "C07D", "G16H",
  "H04W", "G06Q", "A61B", "F16H", "B25J", "G01N", "H04N", "C12N",
  "G05B", "H02J", "A01G", "B29C", "G06T", "H04B", "C08G", "F24F",
];

const JURISDICTION_ZONES = {
  usa: { lat: 38.9, lon: -77.05, color: "#1B2A4A", beamColor: "#C5A44E", label: "USPTO | 650,000+ applications/year | Art Units: 3,600+" },
  india: { lat: 28.6, lon: 77.2, color: "#C45B28", beamColor: "#1A7A6D", label: "IPO | 66,000+ applications/year | 4 Patent Offices" },
  europe: { lat: 48.14, lon: 11.58, color: "#003399", beamColor: "#B8C4D4", label: "EPO | 190,000+ applications/year | 38 Member States" },
};

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeWireframe() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
    }
  });

  const wireframeGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 5);
    return geo;
  }, []);

  return (
    <group ref={ref} rotation={[0.41, 0, 0]}>
      <mesh geometry={wireframeGeo}>
        <meshBasicMaterial wireframe color="#C5A44E" opacity={0.12} transparent />
      </mesh>
      <mesh geometry={wireframeGeo}>
        <meshBasicMaterial wireframe color="#1B2A4A" opacity={0.08} transparent />
      </mesh>
      {/* Continent outlines approximation with denser wireframe */}
      <mesh>
        <sphereGeometry args={[1.98, 48, 48]} />
        <meshBasicMaterial wireframe color="#8B7355" opacity={0.06} transparent />
      </mesh>
    </group>
  );
}

function JurisdictionBeam({ lat, lon, color, beamColor }: { lat: number; lon: number; color: string; beamColor: string }) {
  const pos = latLonToVec3(lat, lon, 2);
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group>
      {/* Point on globe */}
      <mesh position={pos}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Beam going up */}
      <mesh ref={ref as React.RefObject<THREE.Mesh>} position={[pos.x * 1.5, pos.y * 1.5 + 1, pos.z * 1.5]}>
        <cylinderGeometry args={[0.005, 0.005, 2.5, 4]} />
        <meshBasicMaterial color={beamColor} transparent opacity={0.4} />
      </mesh>
      {/* Orbiting particles */}
      <ParticleOrbit center={pos} color={color} />
    </group>
  );
}

function ParticleOrbit({ center, color }: { center: THREE.Vector3; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 20;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.15;
      pos[i * 3] = center.x + Math.cos(angle) * r;
      pos[i * 3 + 1] = center.y + Math.sin(angle) * r;
      pos[i * 3 + 2] = center.z;
    }
    return pos;
  }, [center, count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.02} transparent opacity={0.6} />
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
      <mesh ref={ref as React.RefObject<THREE.Mesh>} position={[0, 3.5, 0]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshPhysicalMaterial
          color="#C5A44E"
          metalness={0.3}
          roughness={0.1}
          transmission={0.6}
          thickness={0.5}
          emissive="#C5A44E"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const jurisdictionColors = [
      new THREE.Color("#1B2A4A"),
      new THREE.Color("#C45B28"),
      new THREE.Color("#003399"),
    ];

    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const c = jurisdictionColors[i % 3];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const posArr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] += 0.002;
        if (posArr[i * 3 + 1] > 4) {
          posArr[i * 3 + 1] = -2;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} vertexColors transparent opacity={0.5} />
    </points>
  );
}

function RadarRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const scale = 1 + ((state.clock.elapsedTime * 0.2 + i * 0.3) % 2);
        mesh.scale.set(scale, scale, scale);
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0.03 * (2 - ((state.clock.elapsedTime * 0.2 + i * 0.3) % 2));
      });
    }
  });

  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i}>
          <ringGeometry args={[1.8 + i * 0.5, 1.82 + i * 0.5, 64]} />
          <meshBasicMaterial color="#8B7355" transparent opacity={0.03} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.5} color="#FFF8F0" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFFFFF" />
      <pointLight position={[0, 3.5, 0]} intensity={1} color="#C5A44E" distance={5} />

      <GlobeWireframe />

      <JurisdictionBeam {...JURISDICTION_ZONES.usa} />
      <JurisdictionBeam {...JURISDICTION_ZONES.india} />
      <JurisdictionBeam {...JURISDICTION_ZONES.europe} />

      <ConvergencePoint />
      <AmbientParticles />
      <RadarRings />

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
