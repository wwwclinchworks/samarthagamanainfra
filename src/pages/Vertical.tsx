import { Link, useParams } from "react-router-dom"
import { verticals } from "../data/content"
import { waLink } from "../lib/whatsapp"

export function VerticalPage() {
  const { slug } = useParams()
  const item = verticals.find((v) => v.slug === slug)

  if (!item) {
    return (
      <section className="page-hero">
        <div className="hero__inner">
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
      <section className={"page-hero" + (item.slug === "peb" ? " page-hero--peb" : "")}>
        <div className="hero__inner">
          <p className="eyebrow">{item.kicker}</p>
          <h1 className="hero__title">
            <span className="line-big">{item.title}</span>
          </h1>
          <p className="hero__sub">{item.summary}</p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="work-item work-item--solo">
            <p className="eyebrow">The brief</p>
            <h2 className="work-item__title">{item.copy}</h2>
            <a className="btn-magnetic" href={waLink(item.title.toLowerCase())} target="_blank" rel="noreferrer">
              Enquire on WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
