import { Link } from "react-router-dom"
import { about } from "../data/content"

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">{about.eyebrow}</p>
          <h1 className="hero__title">
            <span className="line-equal">Samartha</span>
            <span className="line-equal">Gamana</span>
          </h1>
          <p className="hero__sub">{about.title}</p>
        </div>
      </section>

      <section className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">About us</p>
            <h2 className="origin__title">{about.title}</h2>
            <p>{about.intro}</p>
            <p>{about.body}</p>
            <p>{about.focus}</p>
            <p>{about.close}</p>
            <p>
              <Link className="nav__link" to="/nara-sudharshan">
                Meet founder Nara Sudharshan →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--solid">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">Our story</p>
            <h2 className="origin__title">{about.storyTitle}</h2>
            {about.story.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Our vision</p>
            <h2>{about.visionTitle}</h2>
          </div>
          <p className="inner-copy">{about.visionIntro}</p>
          <div className="parcels__grid">
            {about.visionPoints.map((v, i) => (
              <article key={v.title} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">Vision 0{i + 1}</span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{v.title}</h3>
                <p className="parcel-card__desc">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter chapter--solid">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">Our mission</p>
            <h2 className="origin__title">{about.missionTitle}</h2>
            <p>{about.mission}</p>
            <p>{about.missionClose}</p>
          </div>
        </div>
      </section>

      <section className="chapter">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Our values</p>
            <h2>{about.valuesTitle}</h2>
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
        </div>
      </section>
    </>
  )
}
