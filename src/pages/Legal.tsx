import { brand, legal } from "../data/content"
import { Link } from "react-router-dom"

export function LegalPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__inner">
          <p className="eyebrow">Legal</p>
          <h1 className="hero__title">
            <span className="line-equal">Corporate</span>
            <span className="line-equal">Information</span>
          </h1>
          <p className="hero__sub">{brand.legal}</p>
        </div>
      </section>
      <section className="chapter">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-row">
              <span className="contact-row__label">Legal name</span>
              <span className="contact-row__value">{legal.legalName}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">CIN</span>
              <span className="contact-row__value">{legal.cin}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">ROC</span>
              <span className="contact-row__value">{legal.roc}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row__label">Registered office</span>
              <span className="contact-row__value">{legal.registeredOffice}</span>
            </div>
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link className="nav__link" to="/disclaimer">
              Read disclaimer →
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
