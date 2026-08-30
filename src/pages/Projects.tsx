import { Link } from "react-router-dom"
import { projectsCopy } from "../data/content"
import { waLink } from "../lib/whatsapp"

export function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Our projects</p>
          <h1 className="hero__title">
            <span className="line-equal">Developments</span>
            <span className="line-equal">With Purpose</span>
          </h1>
          <p className="hero__sub">{projectsCopy.intro}</p>
        </div>
      </section>

      <section className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">{projectsCopy.portfolioTitle}</p>
            <h2 className="origin__title">Coming soon.</h2>
            <p>{projectsCopy.portfolioBody}</p>
            <p>{projectsCopy.publishNote}</p>
            <p>{projectsCopy.infoNote}</p>
            <p>
              <a className="btn-magnetic" href={waLink("project information")} target="_blank" rel="noreferrer">
                Request Project Information →
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--solid">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Portfolio categories</p>
            <h2>How we organise future work.</h2>
          </div>
          <div className="parcels__grid">
            {projectsCopy.categories.map((c, i) => (
              <article key={c.title} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">Category 0{i + 1}</span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{c.title}</h3>
                <p className="parcel-card__desc">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Project status</p>
            <h2>{projectsCopy.statusTitle}</h2>
          </div>
          <p className="inner-copy">{projectsCopy.statusBody}</p>
          <p className="inner-copy">{projectsCopy.futureBody}</p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
            <a className="btn-magnetic" href={waLink("stay connected / projects")} target="_blank" rel="noreferrer">
              Stay Connected →
            </a>
            <Link className="nav__cta" to="/contact">
              Contact
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
