import { Link } from "react-router-dom"
import { useEffect } from "react"
import { magnetic } from "../lib/motion"
import { BrandLogo } from "./BrandLogo"

export function Footer() {
  useEffect(() => {
    magnetic(document.getElementById("back-to-top"), 0.4)
  }, [])

  return (
    <footer id="site-footer">
      <div className="container footer__row">
        <Link to="/" className="footer__brand" aria-label="Samartha Gamana Infra home">
          <BrandLogo className="footer__logo" />
        </Link>
        <span className="footer__stamp">
          © {new Date().getFullYear()} Samartha Gamana Infra PVT LTD · CIN U43300AP2026PTC124637
        </span>
        <div className="footer__links">
          <Link to="/nara-sudharshan">Nara Sudharshan</Link>
          <Link to={{ pathname: "/", hash: "#chapter-peb" }}>PEB panels</Link>
          <Link to={{ pathname: "/", hash: "#chapter-parcels" }}>Parcels</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/projects">Work</Link>
          <Link to="/process">Process</Link>
          <Link to="/team">Team</Link>
          <Link to="/cities">Cities</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/press">Press</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <button
          id="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo(0, 0)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
