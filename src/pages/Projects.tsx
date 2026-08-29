import { Html } from "@react-three/drei";
import { completed, locations } from "../data/content";
import { RoomPage } from "../experience/Room";

export function ProjectsPage() {
  return (
    <RoomPage
      kicker="Our projects"
      title="Delivered neighbourhoods"
      lead={locations.join(" · ")}
      variant="mixed"
    >
      {completed.map((p, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <Html
            key={p.name}
            position={[(col - 1) * 7.2, 3.4, 5.2 - row * 6.5]}
            center
            distanceFactor={11}
            zIndexRange={[38, 0]}
          >
            <a className="html3d" href="/contact">
              <p className="html3d__kicker">
                {p.type} · {p.status}
              </p>
              <strong>{p.name}</strong>
              <span>{p.place}</span>
            </a>
          </Html>
        );
      })}
    </RoomPage>
  );
}
