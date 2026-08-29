import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { World } from "../experience/World";

export function HomePage() {
  return (
    <div className="scene-root">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 7.2, 22], fov: 42, near: 0.1, far: 200 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={7} damping={0.18} maxSpeed={0.45}>
            <World />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
