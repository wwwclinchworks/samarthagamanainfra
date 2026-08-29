import { Html } from "@react-three/drei";
import { Link, useParams } from "react-router-dom";
import { verticals } from "../data/content";
import { RoomPage } from "../experience/Room";
import { waLink } from "../lib/whatsapp";

export function VerticalPage() {
  const { slug } = useParams();
  const item = verticals.find((v) => v.slug === slug);

  if (!item) {
    return (
      <RoomPage kicker="Offerings" title="Not listed" lead="This vertical is not on the street yet.">
        <Html position={[0, 3, 5]} center distanceFactor={12} zIndexRange={[38, 0]}>
          <Link className="html3d html3d__btn" to="/">
            Return to the street
          </Link>
        </Html>
      </RoomPage>
    );
  }

  return (
    <RoomPage kicker={item.kicker} title={item.title} lead={item.summary} variant="mixed">
      <Html position={[0, 3.1, 5.6]} center distanceFactor={13} zIndexRange={[38, 0]}>
        <div className="html3d html3d--wide">
          <span>{item.copy}</span>
          <a className="html3d__btn" href={waLink(item.title.toLowerCase())} target="_blank" rel="noreferrer">
            Enquire on WhatsApp
          </a>
        </div>
      </Html>
    </RoomPage>
  );
}
