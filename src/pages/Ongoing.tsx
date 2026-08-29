import { ongoing, locations } from "../data/content"

export function OngoingPage() {
  return (
    <div className="page-block">
      <div className="container">
        <p className="eyebrow">Ongoing</p>
        <h1 className="origin__title">Here is what we have in progress</h1>
        <div className="parcels__grid" style={{ marginTop: "3rem" }}>
          {ongoing.map((p) => (
            <article key={p.name} className="parcel-card">
              <span className="parcel-card__coord">{p.type}</span>
              <h3 className="parcel-card__title">{p.name}</h3>
              <p className="parcel-card__desc">
                {p.place} — {p.note}
              </p>
            </article>
          ))}
        </div>
        <p className="eyebrow" style={{ marginTop: "3rem" }}>
          {locations.join(" · ")}
        </p>
      </div>
    </div>
  )
}
