import { Link } from "react-router-dom"
import { team } from "../data/site"
import { founderCopy } from "../data/content"

export function TeamPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">People</p>
          <h1 className="hero__title">
            <span className="line-equal">Our</span>
            <span className="line-equal">Founder</span>
          </h1>
          <p className="hero__sub">Led by {founderCopy.role.toLowerCase()} Nara Sudharshan of Anantapur.</p>
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
                <h3 className="parcel-card__title">
                  <Link to="/nara-sudharshan">{p.name}</Link>
                </h3>
                <p className="parcel-card__desc">{p.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
