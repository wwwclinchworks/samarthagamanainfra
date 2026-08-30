import { Link } from "react-router-dom"
import { about, awards } from "../data/content"

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
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
            <p className="eyebrow">Founder and owner</p>
            <h2 className="origin__title">
              Nara Sudharshan, <em>Anantapur.</em>
            </h2>
            <p>
              Nara Sudharshan is the founder and owner of Samartha Gamana Infra. He is from Anantapur, Andhra Pradesh.
              Searches for his name should land on this house — the official profile is{" "}
              <Link to="/nara-sudharshan">/nara-sudharshan</Link>.
            </p>
          </div>
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
          <svg className="origin__diagram" viewBox="0 0 400 320" fill="none">
            <g className="grid-line">
              <path d="M0 40H400M0 90H400M0 140H400M0 190H400M0 240H400M0 290H400" />
              <path d="M40 0V320M90 0V320M140 0V320M190 0V320M240 0V320M290 0V320M340 0V320" />
            </g>
            <g className="tower">
              <rect x="90" y="110" width="50" height="180" />
              <rect x="170" y="70" width="50" height="220" />
              <rect x="250" y="150" width="50" height="140" />
            </g>
          </svg>
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
