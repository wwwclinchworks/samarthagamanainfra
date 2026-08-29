import { Html } from "@react-three/drei";
import { upcoming } from "../data/content";
import { RoomPage } from "../experience/Room";

export function UpcomingPage() {
  return (
    <RoomPage kicker="Upcoming" title="The next streets" lead="Waitlists open as drawings lock." variant="mixed">
      {upcoming.map((p, i) => (
        <Html key={p.name} position={[(i - 1.5) * 6.6, 3.4, 4.2]} center distanceFactor={11} zIndexRange={[38, 0]}>
          <a className="html3d" href="/contact">
            <p className="html3d__kicker">{p.type}</p>
            <strong>{p.name}</strong>
            <span>
              {p.place} — {p.note}
            </span>
          </a>
        </Html>
      ))}
    </RoomPage>
  );
}
