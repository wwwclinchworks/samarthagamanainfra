import { about, awards } from "../data/content"
import { BrandLogo } from "../components/BrandLogo"

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">About us</p>
          <h1 className="hero__title">
            <span className="line-small">The house</span>
            <span className="line-big">Gamana</span>
          </h1>
          <p className="hero__sub">{about.intro}</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">Held to the drawing</p>
            <h2 className="origin__title">
              “{about.quote}”
            </h2>
            <p>{about.body}</p>
          </div>
          <div className="logo-plate">
            <BrandLogo className="logo-plate__img" />
          </div>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Values</p>
            <h2>Six lines we do not cross.</h2>
          </div>
          <div className="parcels__grid">
            {about.values.map((v, i) => (
              <article key={v.title} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">Value 0{i + 1}</span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{v.title}</h3>
                <p className="parcel-card__desc">{v.text}</p>
              </article>
            ))}
          </div>
          <p className="parcel-card__desc" style={{ marginTop: "3rem" }}>
            {awards.join(" · ")}
          </p>
        </div>
      </section>
    </>
  )
}
