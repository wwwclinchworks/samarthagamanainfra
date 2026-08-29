import { useState, type FormEvent } from "react"
import { offices, locations } from "../data/content"

export function ContactPage() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="page-block">
      <div className="container">
        <p className="eyebrow">Contact us</p>
        <h1 className="cta__headline" style={{ textAlign: "left" }}>
          Let’s put your next parcel in motion.
        </h1>
        <p className="cta__sub" style={{ marginLeft: 0, textAlign: "left" }}>
          Tell us where the land is. We’ll tell you what it can become.
        </p>
        <div className="contact-grid" style={{ justifyContent: "flex-start" }}>
          {offices.map((o) => (
            <div key={o.title} className="contact-row">
              <span className="contact-row__label">{o.title}</span>
              {o.lines.map((line) => (
                <span key={line} className="contact-row__value" style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="glass-dark" style={{ marginTop: "3rem" }}>
          <h2 className="parcel-card__title">Request a call back</h2>
          {sent ? (
            <p className="dev-panel__desc">Request noted. The lounge will take it from here.</p>
          ) : (
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 20 }}>
              <input required name="name" placeholder="Name" className="field" />
              <input required type="email" name="email" placeholder="Email" className="field" />
              <input required type="tel" name="phone" placeholder="Phone" className="field" />
              <select name="location" className="field" defaultValue="">
                <option value="" disabled>
                  Location
                </option>
                {locations.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <label style={{ fontSize: 12, color: "var(--ink-dim)" }}>
                <input type="checkbox" required style={{ marginRight: 8 }} />
                I authorise Samartha Gamana Infra to contact me about products and offers.
              </label>
              <button type="submit" className="btn-magnetic" style={{ justifySelf: "start" }}>
                Request a call back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
