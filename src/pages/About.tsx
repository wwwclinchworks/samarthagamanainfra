import { Html } from "@react-three/drei";
import { about, awards } from "../data/content";
import { RoomPage } from "../experience/Room";

export function AboutPage() {
  return (
    <RoomPage kicker="About us" title="Built on trust" lead={about.intro} variant="houses">
      {about.values.slice(0, 4).map((v, i) => (
        <Html
          key={v.title}
          position={[((i % 2) * 2 - 1) * 7.5, 3.2 + Math.floor(i / 2) * 0.4, 3.8 - Math.floor(i / 2) * 4]}
          center
          distanceFactor={12}
          zIndexRange={[38, 0]}
        >
          <div className="html3d">
            <p className="html3d__kicker">Value 0{i + 1}</p>
            <strong>{v.title}</strong>
            <span>{v.text}</span>
          </div>
        </Html>
      ))}
      <Html position={[0, 2.2, 7.4]} center distanceFactor={14} zIndexRange={[36, 0]}>
        <div className="html3d html3d--wide">
          <p className="html3d__kicker">Awards</p>
          <span>{awards.join(" · ")}</span>
        </div>
      </Html>
    </RoomPage>
  );
}
