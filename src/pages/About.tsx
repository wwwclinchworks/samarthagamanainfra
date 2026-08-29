import { about, awards, brand } from "../data/content"

export function AboutPage() {
  return (
    <div className="page-block">
      <div className="container">
        <p className="eyebrow">About us</p>
        <h1 className="origin__title">The real-estate brand built on trust</h1>
        <p className="origin__text" style={{ marginTop: "1.5rem", maxWidth: "40em" }}>
          {about.intro}
        </p>
        <blockquote className="cta__headline" style={{ textAlign: "left", margin: "2rem 0" }}>
          “{about.quote}”
        </blockquote>
        <p className="dev-panel__desc">{about.body}</p>
        <div className="chapter-head" style={{ marginTop: "4rem" }}>
          <p className="eyebrow">{brand.short} values</p>
          <h2>Held to the drawing.</h2>
        </div>
        <div className="parcels__grid">
          {about.values.map((v, i) => (
            <article key={v.title} className="parcel-card">
              <div className="parcel-card__top">
                <span className="parcel-card__coord">Value 0{i + 1}</span>
              </div>
              <h3 className="parcel-card__title">{v.title}</h3>
              <p className="parcel-card__desc">{v.text}</p>
            </article>
          ))}
        </div>
        <ul style={{ marginTop: "3rem", padding: 0, listStyle: "none" }}>
          {awards.map((a) => (
            <li key={a} className="parcel-card" style={{ marginBottom: 1 }}>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
