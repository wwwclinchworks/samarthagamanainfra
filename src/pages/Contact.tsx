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
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Contact</p>
          <h1 className="hero__title">
            <span className="line-small">The next</span>
            <span className="line-big">Parcel</span>
          </h1>
          <p className="hero__sub">
            WhatsApp the desk founded by Nara Sudharshan of Anantapur. Tell us where the land is. We'll tell you what it
            can become.
          </p>
        </div>
      </section>
      <section id="chapter-cta" className="chapter">
        <div className="container">
          <h2 className="cta__headline">One message from this desk.</h2>
          <p className="cta__sub">Every card opens WhatsApp to +91 63025 56139.</p>
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
              <span className="contact-row__value">+91 63025 56139</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">CIN</span>
              <span className="contact-row__value">U43300AP2026PTC124637 · Private Limited</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Registered office</span>
              <span className="contact-row__value">
                No. 28-5-154, 1st Floor, Housing Board Colony, Anantapur 515001
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
