import { Link } from "react-router-dom"
import { completed, locations } from "../data/content"

export function ProjectsPage() {
  return (
    <div className="page-block">
      <div className="container">
        <p className="eyebrow">Our projects</p>
        <h1 className="origin__title">Crafted for today, with an eye for tomorrow</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "2rem 0" }}>
          {locations.map((city) => (
            <span key={city} className="parcel-card__coord" style={{ border: "1px solid var(--line)", padding: "6px 12px" }}>
              {city}
            </span>
          ))}
        </div>
        <div className="parcels__grid">
          {completed.map((p, i) => (
            <article key={p.name} className="parcel-card">
              <div className="parcel-card__top">
                <span className="parcel-card__coord">
                  {p.type} · {p.status}
                </span>
                <span className="parcel-card__num">0{i + 1}</span>
              </div>
              <h3 className="parcel-card__title">{p.name}</h3>
              <p className="parcel-card__desc">{p.place}</p>
            </article>
          ))}
        </div>
        <div style={{ marginTop: "2rem", display: "flex", gap: 24 }}>
          <Link to="/ongoing">Ongoing →</Link>
          <Link to="/upcoming">Upcoming →</Link>
        </div>
      </div>
    </div>
  )
}
