import { useEffect, useRef } from "react"

export function PersistBrand() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const hero = document.getElementById("hero")
      const gone = hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > 420
      el.classList.toggle("show", gone)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="brand-persist" ref={ref} aria-hidden="true">
      SAMARTHAGAMANAINFRA
    </div>
  )
}
