import { team } from "../data/site"
import { BrandLogo } from "../components/BrandLogo"

export function TeamPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">People</p>
          <h1 className="hero__title">
            <span className="line-small">The</span>
            <span className="line-big">Desk</span>
          </h1>
          <p className="hero__sub">Dummy names for a house that still answers the phone.</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">Held to the drawing</p>
            <h2 className="origin__title">
              Six chairs. One <em>straight line.</em>
            </h2>
            <p>
              Dummy bios only. Land, design, projects, the customer number, infrastructure, and legal. The homepage
              does not change because a name is listed here — the brass line is still the brass line.
            </p>
          </div>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="parcels__grid">
            {team.map((p, i) => (
              <article key={p.name} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">{p.role}</span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{p.name}</h3>
                <p className="parcel-card__desc">{p.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
