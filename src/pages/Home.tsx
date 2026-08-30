import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IntroLoader } from "../components/IntroLoader"
import { mountCityScene, playCityIntro } from "../lib/cityScene"
import { initHomeMotion, magnetic, tiltCard } from "../lib/motion"
import { waLink } from "../lib/whatsapp"
import { about, approach, contact, hero, projectsCopy, whyChoose } from "../data/content"

function introAlreadyDone() {
  try {
    return sessionStorage.getItem("sgi-intro") === "1"
  } catch {
    return false
  }
}

export function HomePage() {
  const [intro, setIntro] = useState(() => !introAlreadyDone())
  const closeIntro = useCallback(() => setIntro(false), [])

  useEffect(() => {
    if (intro) document.body.classList.add("loading")
    else document.body.classList.remove("loading")
    const canvas = document.getElementById("scene-canvas") as HTMLCanvasElement | null
    const handle = canvas ? mountCityScene(canvas) : null
    if (!intro) window.setTimeout(() => playCityIntro(), 120)
    return () => {
      handle?.dispose()
      document.body.classList.remove("loading")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (intro) return
    initHomeMotion()
    magnetic(document.getElementById("cta-btn"), 0.3)
    document.querySelectorAll<HTMLElement>(".parcel-card").forEach((el) => tiltCard(el, 6))
  }, [intro])

  return (
    <>
      {intro ? <IntroLoader onDone={closeIntro} /> : null}
      <canvas id="scene-canvas" />

      <section id="hero">
        <div className="hero__inner">
          <p className="eyebrow hero__eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__title">
            <span className="line-equal">{hero.titleLine1}</span>
            <span className="line-equal">{hero.titleLine2}</span>
          </h1>
          <p className="hero__sub">{hero.headline}</p>
        </div>
        <div className="hero__scroll">
          <span className="hero__scroll-line" />
          <span>Scroll to begin</span>
        </div>
      </section>

      <section id="chapter-origin" className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">Samartha Gamana Infra</p>
            <h2 className="origin__title">
              Where vision meets <em>infrastructure.</em>
            </h2>
            <p>{hero.sub}</p>
            <p>{hero.belief}</p>
            <p style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
              <Link className="btn-magnetic" to="/about">
                Explore Our Vision →
              </Link>
              <Link className="nav__cta" to="/contact">
                Get in Touch
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="chapter-parcels" className="chapter chapter--solid">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Why choose us</p>
            <h2>{whyChoose.title}</h2>
          </div>
          <div className="parcels__grid">
            {whyChoose.points.map((p, i) => (
              <article key={p.title} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">Value 0{i + 1}</span>
                  <span className="parcel-card__num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="parcel-card__title">{p.title}</h3>
                <p className="parcel-card__desc">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="chapter-process" className="chapter chapter--mid">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Our approach</p>
            <h2>From location to opportunity.</h2>
          </div>
          <div className="process__track">
            {approach.map((s) => (
              <div key={s.n} className="process__step">
                <div className="process__node" />
                <span className="process__num">{s.n}</span>
                <h3 className="process__title">{s.t}</h3>
                <p className="process__desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="chapter-developments" className="chapter">
        <div className="chapter-head container">
          <p className="eyebrow">Our projects</p>
          <h2>{projectsCopy.title}</h2>
        </div>
        <div className="container">
          <p className="inner-copy">{projectsCopy.intro}</p>
          <p className="inner-copy">{projectsCopy.portfolioBody}</p>
          <p className="inner-copy">{projectsCopy.statusBody}</p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link className="btn-magnetic" to="/projects">
              Discover Future Developments →
            </Link>
          </p>
        </div>
      </section>

      <section className="chapter chapter--solid">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Customer experience</p>
            <h2>Built on trust.</h2>
          </div>
          <p className="inner-copy">{about.close}</p>
          <p className="inner-copy">
            Every property journey begins with a conversation. Clear information, transparent communication and
            professional support — WhatsApp {contact.whatsapp}.
          </p>
        </div>
      </section>

      <section id="chapter-cta" className="chapter">
        <div className="container">
          <h2 className="cta__headline">Have a property requirement?</h2>
          <p className="cta__sub">Tell us what you are looking for and connect with Samartha Gamana Infra.</p>
          <a className="btn-magnetic" id="cta-btn" href={waLink("a property requirement")} target="_blank" rel="noreferrer">
            Start a Conversation →
          </a>
          <div className="contact-grid">
            <div className="contact-row">
              <span className="contact-row__label">Email</span>
              <span className="contact-row__value">{contact.email}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">WhatsApp</span>
              <span className="contact-row__value">{contact.whatsapp}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Office</span>
              <span className="contact-row__value">Housing Board Colony, Anantapur 515001</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
