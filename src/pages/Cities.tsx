import { cityCopy } from "../data/site"
import { locations } from "../data/content"
import { BrandLogo } from "../components/BrandLogo"

export function CitiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <BrandLogo className="page-logo" />
          <p className="eyebrow">Footprint</p>
          <h1 className="hero__title">
            <span className="line-small">Ten</span>
            <span className="line-big">Cities</span>
          </h1>
          <p className="hero__sub">{locations.join(" · ")}</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          <p className="inner-copy">
            Dummy map of where Samartha Gamana Infra works. 2 BHKs in Hyderabad and Nandyal, villas in Bengaluru and
            Nandyal, houses on serviced plots in Kurnool, Ballari, Gadwal and Tadipatri. Confirm a site visit on
            WhatsApp — this page is not a live inventory.
          </p>
          <div className="parcels__grid">
            {cityCopy.map((c, i) => (
              <article key={c.name} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">City {String(i + 1).padStart(2, "0")}</span>
                  <span className="parcel-card__num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="parcel-card__title">{c.name}</h3>
                <p className="parcel-card__desc">{c.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
