import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

export function SceneLights() {
  return (
    <>
      <color attach="background" args={["#ead9b8"]} />
      <fog attach="fog" args={["#ead9b8", 22, 95]} />
      <hemisphereLight args={["#fff6e8", "#8a9a6e", 0.95]} />
      <directionalLight position={[18, 28, 10]} intensity={1.55} color="#fff4dc" />
      <directionalLight position={[-12, 10, -8]} intensity={0.28} color="#c4b08a" />
    </>
  );
}

export function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -8]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color="#d7c4a4" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -6]}>
        <planeGeometry args={[40, 90]} />
        <meshStandardMaterial color="#c9b48e" roughness={1} />
      </mesh>
      {[-18, -6, 6, 18].map((x) => (
        <mesh key={x} position={[x, 0.03, -8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.15, 88]} />
          <meshStandardMaterial color="#b89a6a" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

export function SceneCanvas({
  children,
  camera = [0, 8, 18],
  orbit = false,
}: {
  children: ReactNode;
  camera?: [number, number, number];
  orbit?: boolean;
}) {
  return (
    <div className="scene-root">
      <Canvas
        className="h-full w-full"
        camera={{ position: camera, fov: 42, near: 0.1, far: 200 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Ground />
          {orbit ? (
            <OrbitControls
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.28}
              maxPolarAngle={Math.PI / 2.12}
              minDistance={9}
              maxDistance={34}
              target={[0, 1.6, 0]}
            />
          ) : null}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
