import { completed, locations } from "../data/content"
import { Link } from "react-router-dom"

const tones = [
  "linear-gradient(135deg,#2b2f22,#5c6b3f 55%,#c9a176)",
  "linear-gradient(135deg,#1c2530,#3e5c76 55%,#6c93b8)",
  "linear-gradient(135deg,#2a221a,#8a6a3e 55%,#e0b472)",
]

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
      {completed.map((p, i) => (
        <div key={p.name} className={i % 2 ? "dev-panel dev-panel--reverse" : "dev-panel"}>
          <div className="dev-panel__media" style={{ background: tones[i % tones.length] }}>
            <span className="dev-panel__tag">
              {p.type} · {p.status}
            </span>
          </div>
          <div className="dev-panel__content">
            <span className="dev-panel__index">0{i + 1} / {p.place}</span>
            <h3 className="dev-panel__title">{p.name}</h3>
            <p className="dev-panel__desc">
              Delivered for the city of {p.place}. {p.type} held to the drawing, then handed over with keys.
            </p>
          </div>
        </div>
      ))}
      <section className="chapter">
        <div className="container" style={{ display: "flex", gap: 32 }}>
          <Link className="btn-magnetic" to="/ongoing">
            Ongoing →
          </Link>
          <Link className="nav__cta" to="/upcoming">
            Upcoming
          </Link>
        </div>
      </section>
    </>
  )
}
