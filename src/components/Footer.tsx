import { Link } from "react-router-dom"
import { BrandLogo } from "./BrandLogo"
import { brand, contact } from "../data/content"

const primary = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/nara-sudharshan", label: "Founder" },
  { to: "/projects", label: "Projects" },
  { to: "/why-anantapur", label: "Why Anantapur" },
  { to: "/contact", label: "Contact" },
] as const

const legal = [
  { to: "/faq", label: "FAQ" },
  { to: "/legal", label: "Corporate info" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/disclaimer", label: "Disclaimer" },
] as const

export function Footer() {
  return (
    <footer id="site-footer">
      <div className="container footer__inner">
        <div className="footer__brand-block">
          <Link to="/" className="footer__brand" aria-label="Samartha Gamana Infra home">
            <BrandLogo className="footer__logo" />
          </Link>
          <div className="footer__identity">
            <p className="footer__name">{brand.name}</p>
            <p className="footer__tagline">{brand.tagline}</p>
            <p className="footer__place">Anantapur, Andhra Pradesh</p>
          </div>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <p className="footer__col-title">Explore</p>
            <nav className="footer__nav" aria-label="Footer">
              {primary.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Legal</p>
            <nav className="footer__nav" aria-label="Legal">
              {legal.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
              <a href="https://preview.samarthagamanainfra.com" rel="noreferrer">
                Previous site preview
              </a>
            </nav>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Contact</p>
            <div className="footer__contact">
              <a href={`https://wa.me/91${contact.phoneDigits}`}>{contact.whatsapp}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{contact.addressOneLine}</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {brand.legal}. All Rights Reserved. · CIN {brand.cin}
          </p>
          <button
            id="back-to-top"
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
