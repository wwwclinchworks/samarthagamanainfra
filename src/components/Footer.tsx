import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer id="site-footer">
      <div className="container footer__row">
        <span className="footer__stamp">SG / Gamana — Est. Parcel 00 · © {new Date().getFullYear()} Samartha Gamana Infra</span>
        <div className="footer__links">
          <Link to="/">Parcels</Link>
          <Link to="/projects">Developments</Link>
          <Link to="/about">About</Link>
        </div>
        <button
          id="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="16" height="16">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
