import { locations } from "../data/content"
import { ongoingProjects } from "../data/ongoingProjects"

export function OngoingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Ongoing</p>
          <h1 className="hero__title">
            <span className="line-small">On site</span>
            <span className="line-big">Now</span>
          </h1>
          <p className="hero__sub">{locations.join(" · ")}</p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="parcels__grid">
            {ongoingProjects.map((p, i) => {
              const images = "images" in p ? p.images : []

              return (
                <article key={p.name} className="parcel-card">
                  {images.length > 0 ? (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: images.length > 1 ? "repeat(3, 1fr)" : "1fr",
                        gap: "0.45rem",
                        width: "100%",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {images.map((image, imageIndex) => (
                        <div
                          key={image}
                          style={{
                            width: "100%",
                            aspectRatio: "16 / 9",
                            overflow: "hidden",
                            borderRadius: "0.35rem",
                            background: "var(--basalt-soft-2)",
                          }}
                        >
                          <img
                            src={image}
                            alt={`${p.name} — view ${imageIndex + 1}`}
                            loading="lazy"
                            decoding="async"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="parcel-card__top">
                    <span className="parcel-card__coord">{p.type}</span>
                    <span className="parcel-card__num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="parcel-card__title">{p.name}</h3>
                  <p className="parcel-card__desc">
                    {p.place} — {p.note}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
