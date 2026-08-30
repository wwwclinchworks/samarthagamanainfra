import { Link, useParams } from "react-router-dom"
import { verticals } from "../data/content"
import { waLink } from "../lib/whatsapp"
import { BrandLogo } from "../components/BrandLogo"

export function VerticalPage() {
  const { slug } = useParams()
  const item = verticals.find((v) => v.slug === slug)

  if (!item) {
    return (
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">Offerings</p>
          <h1 className="hero__title">
            <span className="line-big">Unlisted</span>
          </h1>
          <p className="hero__sub">This parcel is not on the drawing yet.</p>
          <Link to="/" className="btn-magnetic" style={{ marginTop: "2rem" }}>
            Return home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">{item.kicker}</p>
          <h1 className="hero__title">
            <span className="line-big">{item.title}</span>
          </h1>
          <p className="hero__sub">{item.summary}</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">The brief</p>
            <h2 className="origin__title">{item.copy}</h2>
            <a className="btn-magnetic" href={waLink(item.title.toLowerCase())} target="_blank" rel="noreferrer">
              Enquire on WhatsApp →
            </a>
          </div>
          <div
            className="dev-panel__media"
            style={{ minHeight: 320, background: "linear-gradient(135deg,#1c2530,#3e5c76 55%,#c9a176)" }}
          />
        </div>
      </section>
    </>
  )
}
