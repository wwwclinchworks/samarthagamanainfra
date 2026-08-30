import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IntroLoader } from "../components/IntroLoader"
import { BrandLogo } from "../components/BrandLogo"
import { mountCityScene, playCityIntro } from "../lib/cityScene"
import { initHomeMotion, magnetic, tiltCard } from "../lib/motion"
import { waLink } from "../lib/whatsapp"

const parcels = [
  {
    coord: "Parcel 01 / Sector TWN",
    num: "01",
    title: "Townships",
    desc: "Planned communities, laid out before the first road is cut — schools, parks, and homes sequenced to grow together, not around each other.",
    icon: "M4 40h40M8 40V22l6-6 6 6v18M22 40V16l6-8 6 8v24M36 40V26l4-4 4 4v14",
  },
  {
    coord: "Parcel 02 / Sector RES",
    num: "02",
    title: "Residential",
    desc: "Homes drawn around how people actually live — light, ventilation, and privacy considered at the level of a single window.",
    icon: "M6 24 24 8l18 16M10 22v18h28V22M20 40v-10h8v10",
  },
  {
    coord: "Parcel 03 / Sector COM",
    num: "03",
    title: "Commercial",
    desc: "Towers built for the decades a business will spend inside them, not just the year it moves in.",
    icon: "M14 6h20v36H14zM19 14h2M27 14h2M19 21h2M27 21h2M19 28h2M27 28h2M19 35h2M27 35h2M6 42h36",
  },
  {
    coord: "Parcel 04 / Sector RD",
    num: "04",
    title: "Road Infrastructure",
    desc: "The lines that connect every other line — arterial roads, service lanes, and drainage, engineered before anything is built around them.",
    icon: "M18 6 6 42M30 6l12 36M24 10v4M24 18v4M24 26v4M24 34v4",
  },
  {
    coord: "Parcel 05 / Sector CON",
    num: "05",
    title: "Construction",
    desc: "Execution held to the same tolerance as the drawing — what's specified on paper is what gets poured on site.",
    icon: "M10 42V10M10 10l24 6M10 14l18 5M34 16l6 20M10 42h30M28 20l2 6",
  },
  {
    coord: "Parcel 06 / Sector LD",
    num: "06",
    title: "Land Development",
    desc: "Raw acreage — surveyed, graded, and serviced — made ready to hold a future that hasn't been designed yet.",
    icon: "M8 12h6M8 12v6M40 12h-6M40 12v6M8 36h6M8 36v-6M40 36h-6M40 36v-6M8 12h32v24H8z",
  },
]

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
    // City mounts once; intro overlay is independent.
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
          <BrandLogo className="hero__logo" />
          <p className="eyebrow hero__eyebrow">Samartha Gamana · Infra Developers</p>
          <h1 className="hero__title">
            <span className="line-small">Samartha</span>
            <span className="line-big">Gamana</span>
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
              Before a beam is set, a plot is measured, surveyed, and drawn to scale. That discipline — precision before
              ambition — is what Samartha Gamana brings to every township, tower, and road it builds. We don't chase
              height for its own sake. We plan movement: how people will arrive, live, work, and return, long after the
              drawings are filed away.
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
            {parcels.map((p) => (
              <article key={p.num} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">{p.coord}</span>
                  <span className="parcel-card__num">{p.num}</span>
                </div>
                <svg
                  className="parcel-card__icon"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={p.icon} />
                </svg>
                <h3 className="parcel-card__title">{p.title}</h3>
                <p className="parcel-card__desc">{p.desc}</p>
              </article>
            ))}
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
            <path id="stats-path" d="M0 100 C 120 100, 160 40, 260 60 S 420 20, 520 40 S 700 90, 820 30 S 950 10, 1000 15" />
          </svg>
        </div>
      </section>

      <section id="chapter-developments" className="chapter">
        <div className="chapter-head container">
          <p className="eyebrow">Selected developments</p>
          <h2>Three ways the journey has landed.</h2>
        </div>
        <div className="dev-panel">
          <div className="dev-panel__media" style={{ background: "linear-gradient(135deg,#2b2f22,#5c6b3f 55%,#c9a176)" }}>
            <span className="dev-panel__tag">Concept render — for illustration</span>
          </div>
          <div className="dev-panel__content">
            <span className="dev-panel__index">01 / Township</span>
            <h3 className="dev-panel__title">Gamana Township</h3>
            <p className="dev-panel__desc">
              A self-contained community planned for thousands of households — schools, transit, and a green corridor
              included by design, not as an afterthought.
            </p>
          </div>
        </div>
        <div className="dev-panel dev-panel--reverse">
          <div className="dev-panel__media" style={{ background: "linear-gradient(135deg,#1c2530,#3e5c76 55%,#6c93b8)" }}>
            <span className="dev-panel__tag">Concept render — for illustration</span>
          </div>
          <div className="dev-panel__content">
            <span className="dev-panel__index">02 / Commercial</span>
            <h3 className="dev-panel__title">Samartha Business Quarter</h3>
            <p className="dev-panel__desc">
              A commercial district built around a central transit spine, so the address works for the business inside it
              and the city around it.
            </p>
          </div>
        </div>
        <div className="dev-panel">
          <div className="dev-panel__media" style={{ background: "linear-gradient(135deg,#2a221a,#8a6a3e 55%,#e0b472)" }}>
            <span className="dev-panel__tag">Concept render — for illustration</span>
          </div>
          <div className="dev-panel__content">
            <span className="dev-panel__index">03 / Residential</span>
            <h3 className="dev-panel__title">The Ridge Residences</h3>
            <p className="dev-panel__desc">
              Low-rise homes stepped along a natural contour, so no unit blocks another's view — and no hillside is
              levelled to build them.
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
            <div className="process__step">
              <div className="process__node" />
              <span className="process__num">01</span>
              <h3 className="process__title">Land</h3>
              <p className="process__desc">Survey, title, and soil — the ground truth before any design begins.</p>
            </div>
            <div className="process__step">
              <div className="process__node" />
              <span className="process__num">02</span>
              <h3 className="process__title">Design</h3>
              <p className="process__desc">Master plan, structural drawings, and approvals, drawn to the same scale as what gets built.</p>
            </div>
            <div className="process__step">
              <div className="process__node" />
              <span className="process__num">03</span>
              <h3 className="process__title">Build</h3>
              <p className="process__desc">Construction sequenced against the drawing, not around convenience.</p>
            </div>
            <div className="process__step">
              <div className="process__node" />
              <span className="process__num">04</span>
              <h3 className="process__title">Deliver</h3>
              <p className="process__desc">Handover and documentation, ending with an actual key in an actual lock.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="chapter-cta" className="chapter">
        <div className="container">
          <h2 className="cta__headline">Let's put your next parcel in motion.</h2>
          <p className="cta__sub">Tell us where the land is. We'll tell you what it can become.</p>
          <a className="btn-magnetic" id="cta-btn" href={waLink("a new parcel")} target="_blank" rel="noreferrer">
            Start a conversation →
          </a>
          <div className="contact-grid">
            <div className="contact-row">
              <span className="contact-row__label">Email</span>
              <span className="contact-row__value">connect@samarthagamana.in</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">WhatsApp</span>
              <span className="contact-row__value">+91 78158 72759</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Office</span>
              <span className="contact-row__value">Bengaluru, Karnataka</span>
            </div>
          </div>
          <p style={{ marginTop: "2.5rem" }}>
            <Link to="/projects" className="nav__link">
              See developments →
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
