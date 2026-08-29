import { about, awards, brand } from "../data/content"

export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">About us</p>
      <h1 className="font-display mt-2 max-w-3xl text-5xl sm:text-6xl">
        The real-estate brand built on trust
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{about.intro}</p>
      <blockquote className="font-display mt-8 max-w-3xl text-3xl leading-snug text-sage-deep italic">
        “{about.quote}”
      </blockquote>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">{about.body}</p>

      <h2 className="font-display mt-16 text-4xl">{brand.short} values</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {about.values.map((v) => (
          <article
            key={v.title}
            className="rounded-[1.4rem] bg-white/70 p-6 ring-1 ring-sand"
          >
            <h3 className="font-display text-2xl">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <article className="rounded-[1.6rem] bg-gradient-to-br from-sky/80 to-cream p-8">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Vision</p>
          <p className="mt-3 text-sm leading-relaxed text-ink">{about.vision}</p>
        </article>
        <article className="rounded-[1.6rem] bg-gradient-to-br from-blush/80 to-cream p-8">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Mission</p>
          <p className="mt-3 text-sm leading-relaxed text-ink">{about.mission}</p>
        </article>
      </div>

      <h2 className="font-display mt-16 text-4xl">Leadership</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Portraits and biographies of the chairman, managing director and principals
        will be published here. Until then, the house stands on the same values:
        quality, customer satisfaction, and ethical practice across construction,
        plotted development and mixed-use work.
      </p>

      <h2 className="font-display mt-16 text-4xl">Awards & accolades</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {awards.map((a) => (
          <li
            key={a}
            className="rounded-2xl border border-sand bg-white/60 px-5 py-4 text-sm text-ink"
          >
            {a}
          </li>
        ))}
      </ul>

      <h2 className="font-display mt-16 text-4xl">Foundation & civic work</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Corporate social responsibility — blood donation camps, education support
        and neighbourhood programmes — will be listed as campaigns go live. We
        believe a small drop can serve a greater cause.
      </p>
    </div>
  )
}
