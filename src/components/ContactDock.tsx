import { waLink, contactIntents } from "../lib/whatsapp"
import { IconHome, IconBuildings, IconPlot, IconPhone, IconWhatsApp } from "./Icons"
import { useState } from "react"

const icons = {
  house: IconHome,
  apartment: IconBuildings,
  plot: IconPlot,
  commercial: IconBuildings,
  call: IconPhone,
}

export function ContactDock() {
  const [open, setOpen] = useState(false)

  return (
    <div className={open ? "wa-dock open" : "wa-dock"}>
      {open ? (
        <div className="wa-panel">
          <p className="wa-panel__label">WhatsApp the desk</p>
          {contactIntents.map((item) => {
            const Ico = icons[item.id]
            return (
              <a key={item.id} className="wa-item" href={waLink(item.topic)} target="_blank" rel="noreferrer">
                <Ico className="wa-item__ico" />
                {item.label}
              </a>
            )
          })}
        </div>
      ) : null}
      <button type="button" className="wa-fab" aria-label="WhatsApp" onClick={() => setOpen((v) => !v)}>
        <IconWhatsApp className="wa-fab__ico" />
      </button>
    </div>
  )
}
