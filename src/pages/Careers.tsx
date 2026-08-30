import { jobs } from "../data/site"
import { waLink } from "../lib/whatsapp"

export function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Careers</p>
          <h1 className="hero__title">
            <span className="line-equal">Grow With</span>
            <span className="line-equal">Us</span>
          </h1>
          <p className="hero__sub">As Samartha Gamana Infra grows, roles will be announced here.</p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="parcels__grid">
            {jobs.map((j, i) => (
              <article key={j.title} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">{j.place}</span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{j.title}</h3>
                <p className="parcel-card__desc">{j.note}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: "2rem" }}>
            <a className="btn-magnetic" href={waLink("careers / introduce myself")} target="_blank" rel="noreferrer">
              Introduce yourself on WhatsApp →
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
