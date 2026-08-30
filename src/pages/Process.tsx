import { approach } from "../data/content"
import { Link } from "react-router-dom"

export function ProcessPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Our approach</p>
          <h1 className="hero__title">
            <span className="line-equal">From Location</span>
            <span className="line-equal">to Opportunity</span>
          </h1>
          <p className="hero__sub">Every development begins with understanding.</p>
        </div>
      </section>
      <section className="chapter chapter--solid">
        <div className="container">
          <div className="process__track">
            {approach.map((s) => (
              <div key={s.n} className="process__step">
                <div className="process__node" />
                <span className="process__num">{s.n}</span>
                <h3 className="process__title">{s.t}</h3>
                <p className="process__desc">{s.d}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link className="btn-magnetic" to="/contact">
              Talk to Our Team →
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
