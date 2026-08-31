import { journal } from "../data/site"

export function JournalPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Journal</p>
          <h1 className="hero__title">
            <span className="line-small">Field</span>
            <span className="line-big">Notes</span>
          </h1>
          <p className="hero__sub">
            Notes from Anantapur — PEB panels, homes, plots and the Housing Board Colony desk.
          </p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="work-list">
            {journal.map((j, i) => (
              <article key={j.title} className="work-item">
                <span className="work-item__index">
                  {String(i + 1).padStart(2, "0")} / {j.kicker}
                </span>
                <p className="work-item__meta">{j.date}</p>
                <h3 className="work-item__title">{j.title}</h3>
                <p className="work-item__desc">{j.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
