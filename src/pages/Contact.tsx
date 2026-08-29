import { contactIntents, waLink } from "../lib/whatsapp"
import { IconHome, IconBuildings, IconPlot, IconPhone } from "../components/Icons"

const map = {
  house: IconHome,
  apartment: IconBuildings,
  plot: IconPlot,
  commercial: IconBuildings,
  call: IconPhone,
}

export function ContactPage() {
  return (
    <div className="page-block">
      <div className="container">
        <p className="eyebrow">Contact</p>
        <h1 className="cta__headline" style={{ textAlign: "left" }}>
          House, apartment, or a call — one message.
        </h1>
        <p className="cta__sub" style={{ marginLeft: 0, textAlign: "left" }}>
          Every enquiry opens WhatsApp to +91 78158 72759. Choose what you are looking for.
        </p>
        <div className="intent-grid">
          {contactIntents.map((item) => {
            const Ico = map[item.id]
            return (
              <a key={item.id} className="intent-card" href={waLink(item.topic)} target="_blank" rel="noreferrer">
                <Ico className="parcel-card__icon" />
                <strong>{item.label}</strong>
                <span className="parcel-card__desc">WhatsApp the desk</span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
