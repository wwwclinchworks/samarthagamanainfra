import { press } from "../data/site"
import { legal } from "../data/content"

export function PressPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Press &amp; corporate</p>
          <h1 className="hero__title">
            <span className="line-equal">Company</span>
            <span className="line-equal">Facts</span>
          </h1>
          <p className="hero__sub">
            {legal.legalName} · CIN {legal.cin} · ROC {legal.roc}
          </p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="parcels__grid">
            {press.map((p, i) => (
              <article key={p.title} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">
                    {p.outlet} · {p.year}
                  </span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{p.title}</h3>
                <p className="parcel-card__desc">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
