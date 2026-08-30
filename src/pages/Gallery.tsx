import { gallery, type GalleryKind } from "../data/site"
import { waLink } from "../lib/whatsapp"
import { useMemo, useState } from "react"

const tabs: { id: "all" | GalleryKind; label: string }[] = [
  { id: "all", label: "All places" },
  { id: "2bhk", label: "City light" },
  { id: "villa", label: "District & heritage" },
  { id: "house", label: "Anantapur ground" },
]

export function GalleryPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all")
  const items = useMemo(() => (tab === "all" ? gallery : gallery.filter((g) => g.kind === tab)), [tab])

  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Gallery</p>
          <h1 className="hero__title">
            <span className="line-equal">Anantapur</span>
            <span className="line-equal">&amp; A.P.</span>
          </h1>
          <p className="hero__sub">
            Place photography from Anantapur and Andhra Pradesh — clock tower, Lepakshi, Rayalaseema. Live parcels are
            confirmed on WhatsApp +91 63025 56139.
          </p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <p className="inner-copy">
            Photographs of Anantapur city, Lepakshi and Rayalaseema country. Filter by mood. Enquire on WhatsApp with
            the place name; live floor and facing are confirmed before a visit.
          </p>
          <div className="gallery-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className={tab === t.id ? "gallery-tab is-on" : "gallery-tab"}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {items.length === 0 ? (
            <p className="gallery-empty">No units in this filter. Open All, or WhatsApp the desk.</p>
          ) : (
            <div className="gallery-grid">
              {items.map((g) => (
                <article key={g.id} className="gallery-card">
                  <img src={g.img} alt={g.title} />
                  <div className="gallery-card__body">
                    <p className="parcel-card__coord">
                      {g.kind === "2bhk" ? "2 BHK" : g.kind === "villa" ? "Villa" : "House"} · {g.place} · {g.area}
                    </p>
                    <h3 className="parcel-card__title">{g.title}</h3>
                    <p className="parcel-card__desc">{g.note}</p>
                    <a className="nav__link" href={waLink(g.title)} target="_blank" rel="noreferrer">
                      Enquire →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
