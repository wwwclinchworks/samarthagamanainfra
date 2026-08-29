import { Html } from "@react-three/drei";
import type { ReactNode } from "react";
import { House3D, Tower3D } from "./House3D";
import { SceneCanvas } from "./Stage";

export function RoomPage({
  kicker,
  title,
  lead,
  children,
  variant = "houses",
}: {
  kicker: string;
  title: string;
  lead: string;
  children: ReactNode;
  variant?: "houses" | "towers" | "mixed";
}) {
  return (
    <SceneCanvas orbit camera={[11, 7.5, 16]}>
      {variant === "towers" ? (
        <>
          <Tower3D position={[-6, 0, -2]} height={6.2} />
          <Tower3D position={[0, 0, 2]} height={8.4} color="#f3ece3" />
          <Tower3D position={[6.2, 0, -1]} height={5.1} color="#e8d5b5" />
        </>
      ) : variant === "mixed" ? (
        <>
          <House3D position={[-6.4, 0, 1.2]} scale={0.72} rotationY={0.2} />
          <Tower3D position={[0.4, 0, -2]} height={5.8} />
          <House3D position={[6.6, 0, 0.6]} scale={0.8} rotationY={-0.18} />
        </>
      ) : (
        <>
          <House3D position={[-6.2, 0, 1]} scale={0.85} rotationY={0.22} />
          <House3D position={[0.2, 0, -1.4]} scale={1} rotationY={-0.08} />
          <House3D position={[6.4, 0, 1.6]} scale={0.78} rotationY={-0.28} />
        </>
      )}

      <Html position={[0, 8.2, 0]} center distanceFactor={18} zIndexRange={[40, 0]}>
        <div className="html3d html3d--wide pointer-events-none">
          <p className="html3d__kicker">{kicker}</p>
          <strong className="html3d__title">{title}</strong>
          <span>{lead}</span>
        </div>
      </Html>

      {children}
    </SceneCanvas>
  );
}
