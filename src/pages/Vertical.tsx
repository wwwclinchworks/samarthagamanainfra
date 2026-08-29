import { Link, useParams } from "react-router-dom"
import { verticals } from "../data/content"

export function VerticalPage() {
  const { slug } = useParams()
  const item = verticals.find((v) => v.slug === slug)

  if (!item) {
    return (
      <div className="page-block container">
        <h1 className="origin__title">This offering is not listed</h1>
        <Link to="/" className="btn-magnetic" style={{ marginTop: "2rem" }}>
          Return home
        </Link>
      </div>
    )
  }

  return (
    <div className="page-block">
      <div className="container origin__grid">
        <div>
          <p className="eyebrow">{item.kicker}</p>
          <h1 className="origin__title">{item.title}</h1>
          <p className="dev-panel__desc" style={{ marginTop: "1.2rem" }}>
            {item.summary}
          </p>
          <p className="dev-panel__desc" style={{ marginTop: "1rem" }}>
            {item.copy}
          </p>
          <Link to="/contact" className="btn-magnetic" style={{ marginTop: "2rem" }}>
            Speak with the desk
          </Link>
        </div>
        <div
          className="dev-panel__media"
          style={{ minHeight: 320, background: "linear-gradient(135deg,#1c2530,#3e5c76 55%,#c9a176)" }}
        />
      </div>
    </div>
  )
}
