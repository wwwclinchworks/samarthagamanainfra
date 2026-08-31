import { upcoming } from "../data/content"

export function UpcomingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Upcoming</p>
          <h1 className="hero__title">
            <span className="line-small">Next</span>
            <span className="line-big">Streets</span>
          </h1>
          <p className="hero__sub">Waitlists open as drawings lock.</p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="parcels__grid">
            {upcoming.map((p, i) => (
              <article key={p.name} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">{p.type}</span>
                  <span className="parcel-card__num">0{i + 1}</span>
                </div>
                <h3 className="parcel-card__title">{p.name}</h3>
                <p className="parcel-card__desc">
                  {p.place} — {p.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
