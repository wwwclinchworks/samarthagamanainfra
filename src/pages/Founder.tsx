import { Link } from "react-router-dom"
import { founder, publicDesk } from "../data/public"
import { waLink } from "../lib/whatsapp"

export function FounderPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Founder · Owner</p>
          <h1 className="hero__title">
            <span className="line-small">Nara</span>
            <span className="line-big">Sudharshan</span>
          </h1>
          <p className="hero__sub">{founder.short}</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">Anantapur, Andhra Pradesh</p>
            <h2 className="origin__title">
              The name behind <em>Samartha Gamana Infra.</em>
            </h2>
            {founder.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>
              <Link className="nav__link" to="/about">
                About the house →
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
                Founder and owner · Samartha Gamana Infra
                <br />
                From Anantapur, Andhra Pradesh, India
                <br />
                {publicDesk.email}
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
            <p className="eyebrow">Also searched as</p>
            <h2>Nara Sudharshan, Anantapur.</h2>
          </div>
          <p className="inner-copy">
            If you looked up Nara Sudharshan, Nara Sudharshan Anantapur, Sudharshan Nara, Anatapur (common spelling of
            Anantapur), or Samartha Gamana Infra founder, this is the official page. The company he owns builds
            townships, 2 BHK homes, villas, houses, roads and land development. Inventory on Gallery is sample stock;
            live units are confirmed on WhatsApp.
          </p>
        </div>
      </section>
    </>
  )
}
