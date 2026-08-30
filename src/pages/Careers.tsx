import { jobs } from "../data/site"
import { waLink } from "../lib/whatsapp"
import { BrandLogo } from "../components/BrandLogo"

export function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">Careers</p>
          <h1 className="hero__title">
            <span className="line-small">Open</span>
            <span className="line-big">Roles</span>
          </h1>
          <p className="hero__sub">Dummy openings for the website. Apply on WhatsApp with the role title.</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          <p className="inner-copy">
            We hire people who can hold a drawing. Dummy process: message the desk, send a one-page CV, visit a site
            if the role is on the ground. No portal, no form that dies in a folder.
          </p>
          <div className="parcels__grid">
            {jobs.map((j, i) => (
              <article key={j.title} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">{j.place}</span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{j.title}</h3>
                <p className="parcel-card__desc">{j.note}</p>
                <a className="nav__link" href={waLink("a job: " + j.title)} target="_blank" rel="noreferrer">
                  Apply →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
