import { useEffect } from "react"
import { Lottie } from "lottie-react"
import intro from "../../assets/intro.json"

export function IntroLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let done = false
    const finish = () => {
      if (done) return
      done = true
      onDone()
    }
    const t = window.setTimeout(finish, reduce ? 200 : 1800)
    const skip = document.getElementById("skip-intro")
    skip?.addEventListener("click", finish)
    return () => {
      window.clearTimeout(t)
      skip?.removeEventListener("click", finish)
    }
  }, [onDone])

  return (
    <div id="loader">
      <div className="intro-card">
        <Lottie src={intro} loop autoplay style={{ width: 72, height: 72 }} />
        <p id="loader-caption">Opening the gates</p>
      </div>
      <button id="skip-intro" className="show" type="button">
        Skip →
      </button>
    </div>
  )
}
