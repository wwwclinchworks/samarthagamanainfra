import { Link } from "react-router-dom"
import { useEffect } from "react"
import { magnetic } from "../lib/motion"
import { BrandLogo } from "./BrandLogo"
import { brand, contact } from "../data/content"

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
        <div className="footer__stamp">
          <strong>{brand.name}</strong>
          <br />
          {brand.tagline}
          <br />
          Anantapur, Andhra Pradesh
          <br />
          © {new Date().getFullYear()} {brand.legal}. All Rights Reserved.
          <br />
          WhatsApp {contact.whatsapp} · {contact.email}
        </div>
        <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/nara-sudharshan">Founder</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/why-anantapur">Why Anantapur</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/legal">Corporate info</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
          <Link to="/disclaimer">Disclaimer</Link>
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
