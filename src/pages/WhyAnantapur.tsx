import { whyAnantapur } from "../data/content"
import { Link } from "react-router-dom"

export function WhyAnantapurPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Why Anantapur</p>
          <h1 className="hero__title">
            <span className="line-equal">A Region</span>
            <span className="line-equal">With Momentum</span>
          </h1>
          <p className="hero__sub">{whyAnantapur.intro}</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          <p className="inner-copy">{whyAnantapur.body}</p>
          <div className="parcels__grid" style={{ marginTop: "2.5rem" }}>
            {whyAnantapur.points.map((p, i) => (
              <article key={p.title} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">Factor 0{i + 1}</span>
                  <span className="parcel-card__num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="parcel-card__title">{p.title}</h3>
                <p className="parcel-card__desc">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">{whyAnantapur.opportunityTitle}</p>
            <h2 className="origin__title">Long-term development vision.</h2>
            <p>{whyAnantapur.opportunity}</p>
            <p>
              <Link className="nav__link" to="/projects">
                See projects →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
