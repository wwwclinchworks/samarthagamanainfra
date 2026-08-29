import { Html } from "@react-three/drei";
import { contactIntents, waLink } from "../lib/whatsapp";
import { RoomPage } from "../experience/Room";

export function ContactPage() {
  return (
    <RoomPage
      kicker="Contact"
      title="One message from this room"
      lead="Every card opens WhatsApp to +91 78158 72759."
      variant="houses"
    >
      {contactIntents.map((item, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <Html
            key={item.id}
            position={[(col - 1) * 7, 3.2, 5.4 - row * 6]}
            center
            distanceFactor={11}
            zIndexRange={[38, 0]}
          >
            <a className="html3d" href={waLink(item.topic)} target="_blank" rel="noreferrer">
              <p className="html3d__kicker">WhatsApp</p>
              <strong>{item.label}</strong>
              <span>Write the desk now</span>
            </a>
          </Html>
        );
      })}
    </RoomPage>
  );
}
