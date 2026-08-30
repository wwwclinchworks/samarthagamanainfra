import { legal } from "../data/content"

export function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Terms &amp; conditions</p>
          <h1 className="hero__title">
            <span className="line-equal">Terms of</span>
            <span className="line-equal">Use</span>
          </h1>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          {legal.terms.map((p) => (
            <p key={p.slice(0, 40)} className="inner-copy">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}
