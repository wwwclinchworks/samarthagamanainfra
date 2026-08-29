import { upcoming } from "../data/content"

export function UpcomingPage() {
  return (
    <div className="page-block">
      <div className="container">
        <p className="eyebrow">Upcoming</p>
        <h1 className="origin__title">With a vision to build a better tomorrow</h1>
        <div className="parcels__grid" style={{ marginTop: "3rem" }}>
          {upcoming.map((p) => (
            <article key={p.name} className="parcel-card">
              <span className="parcel-card__coord">{p.type}</span>
              <h3 className="parcel-card__title">{p.name}</h3>
              <p className="parcel-card__desc">
                {p.place} — {p.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
