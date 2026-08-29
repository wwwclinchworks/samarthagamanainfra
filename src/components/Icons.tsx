type IconProps = { className?: string }

const wrap = (d: string, { className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
)

export function IconHome(p: IconProps) {
  return wrap("M3 10.5 12 3l9 7.5V21H15v-6H9v6H3V10.5Z", p)
}

export function IconBuildings(p: IconProps) {
  return (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="8" width="7" height="13" />
      <rect x="14" y="3" width="7" height="18" />
      <path d="M5.5 12h2M5.5 15h2M16.5 7h2M16.5 11h2M16.5 15h2" />
    </svg>
  )
}

export function IconPlot(p: IconProps) {
  return (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 18h16M6 18 8 8h8l2 10M9 12h6" strokeDasharray="0" />
    </svg>
  )
}

export function IconWhatsApp(p: IconProps) {
  return (
    <svg className={p.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.38-1.4a10 10 0 0 0 4.66 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.16c-.24.68-1.4 1.25-1.95 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.86-4.22-5.01-4.42-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.2 1.04-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.24.6.82 2.07.89 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.3.15.47.12.64-.07.17-.2.73-.85.93-1.14.2-.3.4-.24.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.34.08.12.08.7-.16 1.38Z" />
    </svg>
  )
}

export function IconPhone(p: IconProps) {
  return wrap("M7 3h4l1 4-2 1a12 12 0 0 0 6 6l1-2 4 1v4c0 1-1 2-2 2C10 19 5 14 5 5c0-1 1-2 2-2Z", p)
}
