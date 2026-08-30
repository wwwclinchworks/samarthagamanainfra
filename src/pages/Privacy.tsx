import { legal } from "../data/content"

export function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Privacy policy</p>
          <h1 className="hero__title">
            <span className="line-equal">Your</span>
            <span className="line-equal">Privacy</span>
          </h1>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          {legal.privacy.map((p) => (
            <p key={p.slice(0, 40)} className="inner-copy">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}
