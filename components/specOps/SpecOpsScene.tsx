'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

import styles from './SpecOpsScene.module.css';

const ACCENT_COLORS = ['#ff6b00', '#5eead4', '#38bdf8', '#f97316', '#c084fc'];

type SpecOpsSceneProps = {
  activeModuleId?: string;
};

function SwarmField({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 1500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 18 * Math.random();
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={pointsRef} rotation={[0, 0.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        sizeAttenuation
        color={color}
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </points>
  );
}

function RadarSweep({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += delta * 0.45;
  });
  return (
    <mesh ref={meshRef} position={[0, 0.2, -2]}>
      <ringGeometry args={[3.5, 12, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.14} side={THREE.DoubleSide} />
    </mesh>
  );
}

function GridPlane() {
  const material = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: '#1f2746', opacity: 0.2, transparent: true });
    mat.depthWrite = false;
    return mat;
  }, []);
  const geometry = useMemo(() => {
    const size = 80;
    const divisions = 40;
    return new THREE.GridHelper(size, divisions, '#394067', '#1f2746').geometry;
  }, []);
  const grid = useMemo(() => new THREE.LineSegments(geometry, material), [geometry, material]);

  const gridRef = useRef<THREE.LineSegments>(null);
  useFrame((state, delta) => {
    if (!gridRef.current) return;
    gridRef.current.position.z += delta * 2.5;
    if (gridRef.current.position.z > 10) {
      gridRef.current.position.z = -10;
    }
  });

  return <primitive ref={gridRef} object={grid} position={[0, -6.5, 0]} rotation={[Math.PI / 2, 0, 0]} />;
}

export function SpecOpsScene({ activeModuleId }: SpecOpsSceneProps) {
  const accentIndex = useMemo(() => {
    if (!activeModuleId) return 0;
    let hash = 0;
    for (let i = 0; i < activeModuleId.length; i += 1) {
      hash = (hash + activeModuleId.charCodeAt(i) * (i + 1)) % ACCENT_COLORS.length;
    }
    return hash;
  }, [activeModuleId]);

  const accentColor = ACCENT_COLORS[accentIndex];

  return (
    <div className={styles.scene} aria-hidden>
      <Canvas camera={{ position: [0, 0, 16], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={['#03040a']} />
        <fog attach="fog" args={['#03040a', 12, 42]} />

        <ambientLight intensity={0.55} />
        <pointLight position={[6, 4, 6]} intensity={1.2} color={accentColor} />
        <pointLight position={[-10, -6, -8]} intensity={0.4} color="#1e293b" />

        <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <SwarmField color={accentColor} />
          <RadarSweep color={accentColor} />
          <GridPlane />
        </Suspense>
      </Canvas>
    </div>
  );
}
