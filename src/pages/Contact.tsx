import { contactIntents, waLink } from "../lib/whatsapp"
import { IconHome, IconBuildings, IconPlot, IconPhone } from "../components/Icons"
import { BrandLogo } from "../components/BrandLogo"

const map = {
  house: IconHome,
  apartment: IconBuildings,
  plot: IconPlot,
  commercial: IconBuildings,
  call: IconPhone,
}

export function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">Contact</p>
          <h1 className="hero__title">
            <span className="line-small">The next</span>
            <span className="line-big">Parcel</span>
          </h1>
          <p className="hero__sub">Tell us where the land is. We'll tell you what it can become.</p>
        </div>
      </section>
      <section id="chapter-cta" className="chapter">
        <div className="container">
          <h2 className="cta__headline">One message from this desk.</h2>
          <p className="cta__sub">Every card opens WhatsApp to +91 78158 72759.</p>
          <div className="intent-grid">
            {contactIntents.map((item) => {
              const Ico = map[item.id]
              return (
                <a key={item.id} className="intent-card" href={waLink(item.topic)} target="_blank" rel="noreferrer">
                  <Ico className="parcel-card__icon" />
                  <h3 className="parcel-card__title">{item.label}</h3>
                  <p className="parcel-card__desc">WhatsApp the desk</p>
                </a>
              )
            })}
          </div>
          <div className="contact-grid">
            <div className="contact-row">
              <span className="contact-row__label">Email</span>
              <span className="contact-row__value">connect@samarthagamana.in</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">WhatsApp</span>
              <span className="contact-row__value">+91 78158 72759</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Office</span>
              <span className="contact-row__value">Bengaluru, Karnataka</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
