import { Html } from "@react-three/drei";
import { locations, ongoing } from "../data/content";
import { RoomPage } from "../experience/Room";

export function OngoingPage() {
  return (
    <RoomPage
      kicker="Ongoing"
      title="Work on the ground"
      lead={locations.join(" · ")}
      variant="towers"
    >
      {ongoing.map((p, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <Html
            key={p.name}
            position={[(col - 1) * 7.4, 3.6, 5.5 - row * 6.8]}
            center
            distanceFactor={11}
            zIndexRange={[38, 0]}
          >
            <div className="html3d">
              <p className="html3d__kicker">{p.type}</p>
              <strong>{p.name}</strong>
              <span>
                {p.place} — {p.note}
              </span>
            </div>
          </Html>
        );
      })}
    </RoomPage>
  );
}
