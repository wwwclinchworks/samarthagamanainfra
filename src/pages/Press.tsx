import { press } from "../data/site"
import { BrandLogo } from "../components/BrandLogo"

export function PressPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">Press</p>
          <h1 className="hero__title">
            <span className="line-small">Desk</span>
            <span className="line-big">Mentions</span>
          </h1>
          <p className="hero__sub">Dummy awards and notes for the drawing board. Not a live press kit.</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          <p className="inner-copy">
            Citations below are placeholders so the site can ship with a press page. Replace with real clippings when
            the house publishes them. Until then, treat every line as dummy.
          </p>
          {press.map((p, i) => (
            <article key={p.title} className="press-item">
              <p className="eyebrow">
                {p.year} · {p.outlet}
              </p>
              <h3>
                {String(i + 1).padStart(2, "0")} — {p.title}
              </h3>
              <p className="parcel-card__desc">{p.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
