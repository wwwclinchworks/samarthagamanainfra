import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export function House3D({
  position = [0, 0, 0],
  scale = 1,
  rotationY = 0,
  wall = "#f3ece3",
  roof = "#c9a176",
}: {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
  wall?: string;
  roof?: string;
}) {
  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.4, 4.2, 5.2]} />
        <meshStandardMaterial color={wall} roughness={0.68} metalness={0.06} />
      </mesh>
      <mesh position={[0, 5.35, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[4.9, 2.4, 4]} />
        <meshStandardMaterial color={roof} roughness={0.5} />
      </mesh>
      <mesh position={[1.55, 5.7, -0.55]} castShadow>
        <boxGeometry args={[0.55, 1.45, 0.55]} />
        <meshStandardMaterial color="#c4a07a" />
      </mesh>
      <mesh position={[0, 1.05, 2.66]}>
        <boxGeometry args={[1.15, 2.1, 0.12]} />
        <meshStandardMaterial color="#6b4a32" />
      </mesh>
      {[
        [-1.7, 2.5, 2.62],
        [1.7, 2.5, 2.62],
        [3.22, 2.4, 0.85],
        [3.22, 2.4, -0.85],
      ].map((p) => (
        <mesh key={p.join(",")} position={p as [number, number, number]}>
          <boxGeometry args={[1.05, 1.12, 0.08]} />
          <meshStandardMaterial color="#f3e6c4" emissive="#ffc978" emissiveIntensity={0.55} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0.1, 3.15]} receiveShadow>
        <boxGeometry args={[2.5, 0.18, 1.35]} />
        <meshStandardMaterial color="#e8d7c0" />
      </mesh>
      <mesh position={[-3.6, 0.55, 1.4]}>
        <cylinderGeometry args={[0.35, 0.45, 1.1, 8]} />
        <meshStandardMaterial color="#6f8a52" />
      </mesh>
      <mesh position={[-3.6, 1.45, 1.4]}>
        <sphereGeometry args={[0.95, 10, 8]} />
        <meshStandardMaterial color="#7d9a58" />
      </mesh>
    </group>
  );
}

export function Tower3D({
  position = [0, 0, 0],
  height,
  color = "#efe4d2",
  children,
}: {
  position?: [number, number, number];
  height: number;
  color?: string;
  children?: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.08;
  });
  return (
    <group position={position}>
      <group ref={ref}>
        <mesh position={[0, height / 2, 0]} castShadow>
          <boxGeometry args={[3.2, height, 3.2]} />
          <meshStandardMaterial color={color} roughness={0.62} metalness={0.08} />
        </mesh>
        {Array.from({ length: Math.max(2, Math.floor(height / 1.4)) }).map((_, i) => (
          <mesh key={i} position={[1.62, 1.1 + i * 1.35, 0.7]}>
            <boxGeometry args={[0.08, 0.55, 0.55]} />
            <meshStandardMaterial color="#d5e4ee" emissive="#c9a176" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
      {children}
    </group>
  );
}

export function Label3D({
  position,
  title,
  body,
  href,
}: {
  position: [number, number, number];
  title: string;
  body: string;
  href?: string;
}) {
  return (
    <Html position={position} center distanceFactor={14} occlude={false} zIndexRange={[40, 0]}>
      {href ? (
        <a className="html3d" href={href}>
          <strong>{title}</strong>
          <span>{body}</span>
        </a>
      ) : (
        <div className="html3d">
          <strong>{title}</strong>
          <span>{body}</span>
        </div>
      )}
    </Html>
  );
}
