import { motion } from "framer-motion"
import { useEffect, useState } from "react"
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
    <div className="pastel-grid flex min-h-svh items-end justify-center p-4 sm:items-center">
      <motion.article
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-3xl p-7 shadow-2xl sm:p-10"
      >
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Disclaimer</p>
        <h2 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
          Please read in full before proceeding
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Welcome to {brand.name}. By continuing you confirm that images, details,
          brochures and marketing materials on this website are for informational
          purposes only. All information is subject to change. Do not rely on this
          site alone for bookings or purchases in any project — visit a sales lounge,
          review approved documents, and take independent advice.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Project names, statistics and office addresses shown here are placeholders
          until the official portfolio is published. The experience, art direction
          and structure are ready for that update.
        </p>
        <button
          type="button"
          className="mt-7 w-full rounded-full bg-sage-deep px-6 py-3 text-sm tracking-wide text-cream transition hover:bg-ink"
          onClick={onAgree}
        >
          I agree — enter the house
        </button>
      </motion.article>
    </div>
  )
}
