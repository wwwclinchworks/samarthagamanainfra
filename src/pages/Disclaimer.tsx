import { legal } from "../data/content"

export function DisclaimerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Disclaimer</p>
          <h1 className="hero__title">
            <span className="line-equal">General</span>
            <span className="line-equal">Information</span>
          </h1>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          {legal.disclaimer.map((p) => (
            <p key={p.slice(0, 40)} className="inner-copy">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}
