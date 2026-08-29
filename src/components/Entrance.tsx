import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ConstructionCanvas } from "./scene/Scenes"
import { brand } from "../data/content"

export function Entrance({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 7800
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(t)
      if (t < 1) frame = requestAnimationFrame(tick)
      else onDone()
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-[70] bg-[#e9e3d8]">
      <ConstructionCanvas progress={progress} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2b3330]/50 via-transparent to-[#f6f1ea]/25" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-[11px] tracking-[0.42em] text-cream uppercase">
          {brand.legal}
        </p>
        <h1 className="font-display text-4xl text-cream drop-shadow sm:text-6xl">
          The building is rising
        </h1>
        <p className="max-w-md text-sm text-cream/80">
          A cinematic construction sequence — floors, crane and site — before you
          step into the house.
        </p>
        <div className="h-[2px] w-48 overflow-hidden rounded-full bg-cream/25">
          <motion.div
            className="h-full bg-gold"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <button
          type="button"
          className="pointer-events-auto text-xs tracking-[0.22em] text-cream/80 uppercase underline-offset-4 hover:text-cream hover:underline"
          onClick={onDone}
        >
          Skip entrance
        </button>
      </div>
    </div>
  )
}
