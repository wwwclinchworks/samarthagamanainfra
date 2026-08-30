import { processCopy } from "../data/site"

export function ProcessPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Method</p>
          <h1 className="hero__title">
            <span className="line-small">Four stages</span>
            <span className="line-big">Line</span>
          </h1>
          <p className="hero__sub">How the journey moves when it is held to paper — dummy method for the desk.</p>
        </div>
      </section>
      <section className="chapter chapter--mid">
        <div className="container">
          <p className="inner-copy">
            Same four stages as the homepage. Land before design, design before pour, pour before keys. Dummy copy
            expanded so a family can read the sequence without opening a brochure.
          </p>
          <div className="process__track">
            {processCopy.map((s) => (
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
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="parcels__grid">
            {processCopy.map((s) => (
              <article key={s.t} className="parcel-card">
                <div className="parcel-card__top">
                  <span className="parcel-card__coord">Stage {s.n}</span>
                  <span className="parcel-card__num">{s.n}</span>
                </div>
                <h3 className="parcel-card__title">{s.t}</h3>
                <p className="parcel-card__desc">{s.long}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
