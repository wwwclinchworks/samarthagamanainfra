import { faqs } from "../data/site"
import { waLink } from "../lib/whatsapp"
import { contact } from "../data/content"

export function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">FAQ</p>
          <h1 className="hero__title">
            <span className="line-equal">Frequently</span>
            <span className="line-equal">Asked</span>
          </h1>
          <p className="hero__sub">Clear answers about Samartha Gamana Infra, Anantapur.</p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="parcels__grid">
            {faqs.map((f, i) => (
              <article key={f.q} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">Q {String(i + 1).padStart(2, "0")}</span>
                  <span className="parcel-card__num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="parcel-card__title">{f.q}</h3>
                <p className="parcel-card__desc">{f.a}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: "2rem" }}>
            <a className="btn-magnetic" href={waLink("a question from FAQ")} target="_blank" rel="noreferrer">
              Ask on WhatsApp →
            </a>
            <span className="inner-copy" style={{ display: "block", marginTop: "1rem" }}>
              Or email {contact.founderEmail} / {contact.email}
            </span>
          </p>
        </div>
      </section>
    </>
  )
}
