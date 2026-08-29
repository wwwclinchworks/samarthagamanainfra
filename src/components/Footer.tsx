import { Link } from "react-router-dom"
import { brand, nav, verticals } from "../data/content"

export function Footer() {
  return (
    <footer className="border-t border-sand bg-[#2b3330] text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">{brand.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
            {brand.tagline} Plots, apartments, villas, commercial complexes and
            farmlands — planned with cost, quality and a calm hand.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-gold uppercase">House</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-gold uppercase">What we do</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            {verticals.map((v) => (
              <li key={v.slug}>
                <Link to={`/what-we-do/${v.slug}`} className="hover:text-cream">
                  {v.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {brand.legal}. All rights reserved. Marketing
        information is indicative and subject to change.
      </div>
    </footer>
  )
}
