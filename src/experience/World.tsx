import { Html, Scroll, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, MathUtils, Vector3 } from "three";
import { completed, ongoing, stats, verticals } from "../data/content";
import { waLink } from "../lib/whatsapp";
import { Ground, SceneLights } from "./Stage";
import { House3D, Tower3D } from "./House3D";

const cam = new Vector3();
const look = new Vector3();

function CameraPath() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    const t = scroll.offset;
    cam.set(Math.sin(t * Math.PI * 1.65) * (18 - t * 6), 7 + t * 5.5, 22 - t * 31);
    look.set(Math.sin(t * 2.2) * 2.2, 1.4 + t * 0.6, -t * 18);
    camera.position.lerp(cam, 0.085);
    camera.lookAt(look);
  });
  return null;
}

export function World() {
  const cluster = useRef<Group>(null);
  const scroll = useScroll();

  const houses = useMemo(
    () =>
      [
        [-6.2, 3.2, 0.92, Math.PI * 0.08],
        [-2.1, 1.6, 1.05, -0.12],
        [2.4, 2.4, 0.88, 0.2],
        [6.4, 4.1, 1.12, -0.18],
        [-4.8, -2.2, 0.78, 0.35],
        [4.9, -1.4, 0.7, -0.28],
        [0.2, 6.2, 0.62, 0.05],
        [-7.4, 7.8, 0.55, 0.4],
        [7.6, 8.4, 0.58, -0.32],
      ] as const,
    [],
  );

  useFrame((_, dt) => {
    if (!cluster.current) return;
    cluster.current.rotation.y = MathUtils.damp(
      cluster.current.rotation.y,
      Math.sin(scroll.offset * Math.PI) * 0.08,
      2.2,
      dt,
    );
  });

  return (
    <>
      <SceneLights />
      <CameraPath />
      <Ground />

      <group ref={cluster}>
        {houses.map(([x, z, s, r], i) => (
          <House3D key={i} position={[x, 0, z]} scale={s} rotationY={r} />
        ))}
      </group>

      <Html position={[0, 6.4, 4.2]} center transform occlude={false} distanceFactor={18} zIndexRange={[40, 0]}>
        <div className="pointer-events-none w-[min(92vw,920px)] text-center">
          <p className="font-display text-[10px] tracking-[0.55em] text-[#6b4e1f] uppercase">Samartha Gamana Infra</p>
          <h1 className="mt-2 font-hero text-[clamp(3.4rem,16vw,9.5rem)] font-black leading-[0.82] tracking-[-0.06em] text-[#f4ead8]">
            SAMARTHA
          </h1>
          <h2 className="font-hero text-[clamp(2.4rem,11vw,6.4rem)] font-black leading-[0.82] tracking-[-0.05em] text-[#c9a227]">
            GAMANA
          </h2>
          <p className="mt-4 font-serif text-[clamp(1.05rem,2.6vw,1.85rem)] italic text-[#5c4a32]">
            Where every plot becomes a promised home.
          </p>
        </div>
      </Html>

      <Html position={[0, 4.8, -6]} center transform distanceFactor={16} zIndexRange={[38, 0]}>
        <div className="html3d html3d--wide">
          <p className="html3d__kicker">The land</p>
          <p className="html3d__lead">Open-plot communities across Hyderabad — walk this street in 3D, then claim a parcel.</p>
        </div>
      </Html>

      {verticals.map((p, i) => {
        const x = (i - (verticals.length - 1) / 2) * 7.4;
        return (
          <group key={p.slug} position={[x, 0, -16]}>
            <Tower3D height={2.4 + i * 0.28} />
            <Html position={[0, 5.4, 0]} center distanceFactor={12} zIndexRange={[36, 0]}>
              <a className="html3d" href={`/what-we-do/${p.slug}`}>
                <p className="html3d__kicker">{p.kicker}</p>
                <strong>{p.title}</strong>
                <span>{p.summary}</span>
              </a>
            </Html>
          </group>
        );
      })}

      {stats.map((s, i) => (
        <Html key={s.label} position={[(i - 1) * 10, 3.2, -26]} center distanceFactor={14} zIndexRange={[34, 0]}>
          <div className="html3d html3d--stat">
            <p className="html3d__num">
              {s.value}
              {s.suffix}
            </p>
            <span>{s.label}</span>
          </div>
        </Html>
      ))}

      {ongoing.slice(0, 3).map((d, i) => (
        <Html key={d.name} position={[(i - 1) * 9, 2.6, -36]} center distanceFactor={13} zIndexRange={[32, 0]}>
          <a className="html3d" href="/ongoing">
            <p className="html3d__kicker">{d.type}</p>
            <strong>{d.name}</strong>
            <span>
              {d.place} — {d.note}
            </span>
          </a>
        </Html>
      ))}

      {completed.slice(0, 3).map((d, i) => (
        <House3D key={d.name} position={[(i - 1) * 8.5, 0, -42]} scale={0.72} rotationY={i * 0.12} />
      ))}

      <Html position={[0, 3.4, -48]} center distanceFactor={16} zIndexRange={[30, 0]}>
        <div className="html3d html3d--dark">
          <p className="html3d__kicker">Walk in</p>
          <strong>Reserve a plot from this street.</strong>
          <a className="html3d__btn" href={waLink("a plot on the 3D street")} target="_blank" rel="noreferrer">
            Open WhatsApp
          </a>
        </div>
      </Html>

      <Scroll html>
        <div className="h-[700vh] w-full pointer-events-none" />
      </Scroll>
    </>
  );
}
