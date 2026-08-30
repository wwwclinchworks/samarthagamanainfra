import { Link } from "react-router-dom"
import { founderCopy, contact } from "../data/content"
import { founder, publicDesk } from "../data/public"
import { waLink } from "../lib/whatsapp"

export function FounderPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Our founder</p>
          <h1 className="hero__title">
            <span className="line-equal">Nara</span>
            <span className="line-equal">Sudharshan</span>
          </h1>
          <p className="hero__sub">{founderCopy.role}</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">Anantapur, Andhra Pradesh</p>
            <h2 className="origin__title">
              Founder &amp; owner of <em>Samartha Gamana Infra.</em>
            </h2>
            <p>{founderCopy.intro}</p>
            {founderCopy.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <p>
              <Link className="nav__link" to="/about">
                About Samartha Gamana Infra →
              </Link>
            </p>
          </div>
          <div>
            <article className="parcel-card">
              <div className="parcel-card__top">
                <span className="parcel-card__coord">Public record</span>
                <span className="parcel-card__num">NS</span>
              </div>
              <h3 className="parcel-card__title">Nara Sudharshan</h3>
              <p className="parcel-card__desc">
                {founderCopy.role} · Samartha Gamana Infra Private Limited
                <br />
                From Anantapur, Andhra Pradesh, India
                <br />
                {publicDesk.email}
                <br />
                {contact.founderEmail}
                <br />
                WhatsApp {publicDesk.whatsapp}
              </p>
              <a className="nav__link" href={waLink("Nara Sudharshan / the founder")} target="_blank" rel="noreferrer">
                Message the founder’s desk →
              </a>
            </article>
          </div>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">{founderCopy.visionLabel}</p>
            <h2>“{founderCopy.visionQuote}”</h2>
          </div>
          <p className="inner-copy">{founder.short}</p>
        </div>
      </section>
    </>
  )
}
