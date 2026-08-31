import { faqs } from "../data/site"
import { waLink } from "../lib/whatsapp"

export function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">FAQ</p>
          <h1 className="hero__title">
            <span className="line-small">Straight</span>
            <span className="line-big">Answers</span>
          </h1>
          <p className="hero__sub">Dummy questions a family actually asks before a site visit.</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          <p className="inner-copy">
            Inventory on Gallery is dummy. Live stock is confirmed on WhatsApp. If your question is not here, send it
            to the desk — the number on the green dock.
          </p>
          {faqs.map((f) => (
            <div key={f.q} className="faq-item">
              <h3>{f.q}</h3>
              <p className="parcel-card__desc">{f.a}</p>
            </div>
          ))}
          <p style={{ marginTop: "2.5rem" }}>
            <a className="btn-magnetic" href={waLink("a question from the FAQ page")} target="_blank" rel="noreferrer">
              Ask on WhatsApp →
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
