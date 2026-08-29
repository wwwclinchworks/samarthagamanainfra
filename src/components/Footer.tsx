import { Link } from "react-router-dom"
import { useEffect } from "react"
import { magnetic } from "../lib/motion"

export function Footer() {
  useEffect(() => {
    magnetic(document.getElementById("back-to-top"), 0.4)
  }, [])

  return (
    <footer id="site-footer">
      <div className="container footer__row">
        <span className="footer__stamp">SG / Gamana — Est. Parcel 00 · © {new Date().getFullYear()} Samartha Gamana Infra Developers</span>
        <div className="footer__links">
          <a href="/#chapter-parcels">Parcels</a>
          <a href="/#chapter-process">Process</a>
          <Link to="/projects">Developments</Link>
        </div>
        <button
          id="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
