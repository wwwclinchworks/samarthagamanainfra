import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { CityBackdrop } from "../components/experience/CityBackdrop"
import { IntroLoader } from "../components/experience/IntroLoader"
import { initPageMotion, revealHero } from "../components/experience/motion"
import { verticals } from "../data/content"

const INTRO_KEY = "sgi-city-intro"

export function HomePage() {
  const playCity = useRef<(() => void) | null>(null)
  const [intro, setIntro] = useState(() => sessionStorage.getItem(INTRO_KEY) !== "1")

  const finishIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, "1")
    setIntro(false)
    document.body.classList.remove("loading")
    requestAnimationFrame(() => {
      revealHero()
      playCity.current?.()
      initPageMotion()
    })
  }, [])

  useEffect(() => {
    if (intro) document.body.classList.add("loading")
    else {
      document.body.classList.remove("loading")
      const t = window.setTimeout(() => {
        revealHero()
        playCity.current?.()
        initPageMotion()
      }, 80)
      return () => window.clearTimeout(t)
    }
    return () => document.body.classList.remove("loading")
  }, [intro])

  return (
    <>
      {intro ? <IntroLoader onDone={finishIntro} /> : null}
      <CityBackdrop playRef={playCity} />

      <section id="hero">
        <div className="hero__inner">
          <p className="eyebrow hero__eyebrow">Samartha Gamana · Infra Developers</p>
          <h1 className="hero__title">
            <span className="name-primary">Samartha</span>
            <span className="name-secondary">Gamana</span>
          </h1>
          <p className="hero__sub">the journey from land to landmark.</p>
        </div>
        <div className="hero__scroll">
          <span className="hero__scroll-line" />
          <span>Scroll to begin</span>
        </div>
      </section>

      <section id="chapter-origin" className="chapter">
        <div className="container origin__grid">
          <div className="origin__text">
            <p className="eyebrow">Parcel 00 — Origin</p>
            <h2 className="origin__title">
              Every skyline starts as a <em>straight line.</em>
            </h2>
            <p>
              Before a beam is set, a plot is measured, surveyed, and drawn to scale. That
              discipline — precision before ambition — is what Samartha Gamana brings to every
              township, tower, and road it builds. We plan movement: how people will arrive, live,
              work, and return, long after the drawings are filed away.
            </p>
          </div>
          <svg className="origin__diagram" viewBox="0 0 400 320" fill="none">
            <g className="grid-line">
              <path d="M0 40H400M0 90H400M0 140H400M0 190H400M0 240H400M0 290H400" />
              <path d="M40 0V320M90 0V320M140 0V320M190 0V320M240 0V320M290 0V320M340 0V320" />
            </g>
            <g className="tower">
              <rect x="70" y="130" width="60" height="160" />
              <rect x="160" y="80" width="60" height="210" />
              <rect x="250" y="160" width="60" height="130" />
              <path d="M70 130 100 100 130 130M160 80 190 50 220 80" />
            </g>
          </svg>
        </div>
      </section>

      <section id="chapter-parcels" className="chapter chapter--solid">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">Six disciplines, one journey</p>
            <h2>Where Gamana operates.</h2>
          </div>
          <div className="parcels__grid">
            {verticals.map((v, i) => (
              <Link key={v.slug} className="parcel-card" to={`/what-we-do/${v.slug}`}>
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">
                    Parcel 0{i + 1} / {v.kicker}
                  </span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{v.title}</h3>
                <p className="parcel-card__desc">{v.summary}</p>
              </Link>
            ))}
            <div className="parcel-card">
              <div className="parcel-card__top">
                <span className="parcel-card__coord">Parcel 06 / Construction</span>
                <span className="parcel-card__num">06</span>
              </div>
              <h3 className="parcel-card__title">Construction</h3>
              <p className="parcel-card__desc">
                Execution held to the same tolerance as the drawing — what is specified on paper is
                what gets poured on site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="chapter-scale" className="chapter chapter--light">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">The journey so far</p>
            <h2>Measured in more than square feet.</h2>
          </div>
          <div className="stats__grid">
            <div className="stat">
              <span className="stat__num" data-count="12" data-suffix="M+">
                0
              </span>
              <span className="stat__label">Sq. ft. under development</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="40" data-suffix="km+">
                0
              </span>
              <span className="stat__label">Of road laid</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="6" data-suffix="">
                0
              </span>
              <span className="stat__label">Cities</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="18" data-suffix="">
                0
              </span>
              <span className="stat__label">Years on site</span>
            </div>
          </div>
          <svg className="stats__line" viewBox="0 0 1000 120" preserveAspectRatio="none">
            <path
              id="stats-path"
              d="M0 100 C 120 100, 160 40, 260 60 S 420 20, 520 40 S 700 90, 820 30 S 950 10, 1000 15"
            />
          </svg>
        </div>
      </section>

      <section id="chapter-developments" className="chapter">
        <div className="chapter-head container">
          <p className="eyebrow">Selected developments</p>
          <h2>Three ways the journey has landed.</h2>
        </div>
        <div className="dev-panel">
          <div
            className="dev-panel__media"
            style={{ background: "linear-gradient(135deg,#2b2f22,#5c6b3f 55%,#c9a176)" }}
          >
            <span className="dev-panel__tag">Concept render — for illustration</span>
          </div>
          <div className="dev-panel__content">
            <span className="dev-panel__index">01 / Township</span>
            <h3 className="dev-panel__title">Gamana Township</h3>
            <p className="dev-panel__desc">
              A self-contained community planned for thousands of households — schools, transit,
              and a green corridor included by design, not as an afterthought.
            </p>
          </div>
        </div>
        <div className="dev-panel dev-panel--reverse">
          <div
            className="dev-panel__media"
            style={{ background: "linear-gradient(135deg,#1c2530,#3e5c76 55%,#6c93b8)" }}
          >
            <span className="dev-panel__tag">Concept render — for illustration</span>
          </div>
          <div className="dev-panel__content">
            <span className="dev-panel__index">02 / Commercial</span>
            <h3 className="dev-panel__title">Samartha Business Quarter</h3>
            <p className="dev-panel__desc">
              A commercial district built around a central transit spine, so the address works for
              the business inside it and the city around it.
            </p>
          </div>
        </div>
        <div className="dev-panel">
          <div
            className="dev-panel__media"
            style={{ background: "linear-gradient(135deg,#2a221a,#8a6a3e 55%,#e0b472)" }}
          >
            <span className="dev-panel__tag">Concept render — for illustration</span>
          </div>
          <div className="dev-panel__content">
            <span className="dev-panel__index">03 / Residential</span>
            <h3 className="dev-panel__title">The Ridge Residences</h3>
            <p className="dev-panel__desc">
              Low-rise homes stepped along a natural contour, so no unit blocks another’s view —
              and no hillside is levelled to build them.
            </p>
          </div>
        </div>
      </section>

      <section id="chapter-process" className="chapter chapter--mid">
        <div className="container">
          <div className="chapter-head">
            <p className="eyebrow">How the journey moves</p>
            <h2>Four stages. One straight line.</h2>
          </div>
          <div className="process__track">
            {[
              ["01", "Land", "Survey, title, and soil — the ground truth before any design begins."],
              ["02", "Design", "Master plan, structural drawings, and approvals, drawn to the same scale as what gets built."],
              ["03", "Build", "Construction sequenced against the drawing, not around convenience."],
              ["04", "Deliver", "Handover and documentation, ending with an actual key in an actual lock."],
            ].map(([n, t, d]) => (
              <div key={n} className="process__step">
                <div className="process__node" />
                <span className="process__num">{n}</span>
                <h3 className="process__title">{t}</h3>
                <p className="process__desc">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="chapter-cta" className="chapter">
        <div className="container">
          <h2 className="cta__headline">Let’s put your next parcel in motion.</h2>
          <p className="cta__sub">Tell us where the land is. We’ll tell you what it can become.</p>
          <Link className="btn-magnetic" id="cta-btn" to="/contact">
            Start a conversation →
          </Link>
          <div className="contact-grid">
            <div className="contact-row">
              <span className="contact-row__label">Email</span>
              <span className="contact-row__value">connect@samarthagamana.in</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Phone</span>
              <span className="contact-row__value">+91 00000 00000</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Office</span>
              <span className="contact-row__value">Bengaluru, Karnataka</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
