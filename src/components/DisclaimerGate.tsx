import { useEffect, useState, type ReactNode } from "react"
import { brand } from "../data/content"

const KEY = "sgi-disclaimer"

export function useDisclaimer() {
  const [agreed, setAgreed] = useState<boolean | null>(null)

  useEffect(() => {
    setAgreed(localStorage.getItem(KEY) === "agreed")
  }, [])

  const agree = () => {
    localStorage.setItem(KEY, "agreed")
    setAgreed(true)
  }

  return { agreed, agree }
}

export function DisclaimerScreen({ onAgree }: { onAgree: () => void }) {
  return (
    <div className="disclaimer-screen">
      <article className="disclaimer-card">
        <p className="eyebrow">Disclaimer</p>
        <h2 className="origin__title" style={{ fontSize: "2rem" }}>
          Please read in full before proceeding
        </h2>
        <p className="origin__text" style={{ marginTop: "1rem" }}>
          Welcome to {brand.name}. Images, details and marketing materials on this website are for
          information only and subject to change. Do not rely on this site alone for bookings.
        </p>
        <button type="button" className="btn-magnetic" style={{ marginTop: "2rem" }} onClick={onAgree}>
          I agree — enter the house
        </button>
      </article>
    </div>
  )
}

export function DisclaimerGate({ children }: { children: ReactNode }) {
  return children
}
