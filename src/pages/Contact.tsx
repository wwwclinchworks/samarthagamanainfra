import { contactIntents, waLink } from "../lib/whatsapp"
import { IconHome, IconBuildings, IconPlot, IconPhone } from "../components/Icons"
import { brand, contact, customerExperience, legal } from "../data/content"

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
            <span className="line-equal">Let's Build</span>
            <span className="line-equal">the Future</span>
          </h1>
          <p className="hero__sub">Have a question about Samartha Gamana Infra? Interested in a future development? Connect with our team.</p>
        </div>
      </section>

      <section className="chapter">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Customer experience</p>
            <h2>{customerExperience.title}</h2>
          </div>
          <p className="inner-copy">{customerExperience.intro}</p>
          <p className="inner-copy">{customerExperience.body}</p>
          <p className="inner-copy">{customerExperience.close}</p>
        </div>
      </section>

      <section id="chapter-cta" className="chapter chapter--solid">
        <div className="container">
          <h2 className="cta__headline">One message from this desk.</h2>
          <p className="cta__sub">Every card opens WhatsApp to {contact.whatsapp}.</p>
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
              <span className="contact-row__label">Legal name</span>
              <span className="contact-row__value">{brand.legal}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">CIN</span>
              <span className="contact-row__value">
                {legal.cin} · ROC {legal.roc}
              </span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Registered office</span>
              <span className="contact-row__value">{contact.addressOneLine}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">WhatsApp</span>
              <span className="contact-row__value">{contact.whatsapp}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Email</span>
              <span className="contact-row__value">
                {contact.email} · {contact.founderEmail}
              </span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Website</span>
              <span className="contact-row__value">{contact.website}</span>
            </div>
          </div>
          <p style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
            <a className="btn-magnetic" href={waLink("general enquiry")} target="_blank" rel="noreferrer">
              Chat on WhatsApp →
            </a>
            <a className="nav__cta" href={`mailto:${contact.email}`}>
              Send an Enquiry →
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
