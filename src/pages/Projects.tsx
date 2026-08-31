import { completed, locations } from "../data/content"
import { Link } from "react-router-dom"

export function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Developments</p>
          <h1 className="hero__title">
            <span className="line-small">Selected</span>
            <span className="line-big">Work</span>
          </h1>
          <p className="hero__sub">{locations.join(" · ")}</p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="work-list">
            {completed.map((p, i) => (
              <article key={p.name} className="work-item">
                <span className="work-item__index">
                  {String(i + 1).padStart(2, "0")} / {p.place}
                </span>
                <p className="work-item__meta">
                  {p.type} · {p.status}
                </p>
                <h3 className="work-item__title">{p.name}</h3>
                <p className="work-item__desc">{p.desc}</p>
              </article>
            ))}
          </div>
          <div className="work-actions">
            <Link className="btn-magnetic" to="/ongoing">
              Ongoing →
            </Link>
            <Link className="nav__cta" to="/upcoming">
              Upcoming
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
