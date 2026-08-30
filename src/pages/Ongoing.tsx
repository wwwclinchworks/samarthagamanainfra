import { locations, ongoing } from "../data/content"
import { BrandLogo } from "../components/BrandLogo"

export function OngoingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">Ongoing</p>
          <h1 className="hero__title">
            <span className="line-small">On site</span>
            <span className="line-big">Now</span>
          </h1>
          <p className="hero__sub">{locations.join(" · ")}</p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="parcels__grid">
            {ongoing.map((p, i) => (
              <article key={p.name} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">{p.type}</span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{p.name}</h3>
                <p className="parcel-card__desc">
                  {p.place} — {p.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
