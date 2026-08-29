import { useState, type FormEvent } from "react"
import { offices, locations } from "../data/content"

export function ContactPage() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Contact us</p>
      <h1 className="font-display mt-2 max-w-3xl text-5xl">
        We are here to make your dreams a reality
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        From open plots and high-rise residential spaces to commercial complexes —
        Samartha Gamana Infra has what you are looking for.
      </p>

      <h2 className="font-display mt-12 text-3xl">We would love to hear from you</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {offices.map((o) => (
          <article key={o.title} className="rounded-[1.5rem] bg-white/70 p-6 ring-1 ring-sand">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">{o.title}</p>
            {o.lines.map((line) => (
              <p key={line} className="mt-2 text-sm text-ink">
                {line}
              </p>
            ))}
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] bg-white/70 p-8 ring-1 ring-sand">
        <h2 className="font-display text-3xl">Request a call back</h2>
        {sent ? (
          <p className="mt-4 text-sm text-sage-deep">
            Request noted. When telephony is connected, this will reach the lounge.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
            <input required name="name" placeholder="Name" className="field" />
            <input required type="email" name="email" placeholder="Email" className="field" />
            <input required type="tel" name="phone" placeholder="Phone" className="field" />
            <input name="subject" placeholder="Subject" className="field" />
            <select name="location" className="field" defaultValue="">
              <option value="" disabled>
                Location
              </option>
              {locations.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select name="time" className="field" defaultValue="10:00 AM - 12:00 PM">
              <option>10:00 AM - 12:00 PM</option>
              <option>12:01 PM - 03:00 PM</option>
              <option>03:01 PM - 06:00 PM</option>
            </select>
            <label className="sm:col-span-2 flex items-start gap-2 text-xs text-muted">
              <input type="checkbox" required className="mt-0.5" />
              I authorise Samartha Gamana Infra and its representatives to call, SMS,
              email or WhatsApp me about products and offers. This consent overrides
              any registration for DNC / NDNC.
            </label>
            <button
              type="submit"
              className="rounded-full bg-sage-deep py-3 text-sm text-cream sm:col-span-2"
            >
              Request a call back
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
