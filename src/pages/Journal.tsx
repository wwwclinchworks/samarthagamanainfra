import { journal } from "../data/site"
import { BrandLogo } from "../components/BrandLogo"

const tones = [
  "linear-gradient(135deg,#2b2f22,#5c6b3f 55%,#c9a176)",
  "linear-gradient(135deg,#1c2530,#3e5c76 55%,#6c93b8)",
  "linear-gradient(135deg,#2a221a,#8a6a3e 55%,#e0b472)",
]

export function JournalPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">Journal</p>
          <h1 className="hero__title">
            <span className="line-small">Field</span>
            <span className="line-big">Notes</span>
          </h1>
          <p className="hero__sub">Dummy articles in the same voice as the homepage — roads, 2 BHKs, villas, houses.</p>
        </div>
      </section>
      {journal.map((j, i) => (
        <div key={j.title} className={i % 2 ? "dev-panel dev-panel--reverse" : "dev-panel"}>
          <div className="dev-panel__media" style={{ background: tones[i % tones.length] }}>
            <span className="dev-panel__tag">
              {j.kicker} · {j.date}
            </span>
          </div>
          <div className="dev-panel__content">
            <span className="dev-panel__index">
              {String(i + 1).padStart(2, "0")} / Note
            </span>
            <h3 className="dev-panel__title">{j.title}</h3>
            <p className="dev-panel__desc">{j.body}</p>
          </div>
        </div>
      ))}
    </>
  )
}
