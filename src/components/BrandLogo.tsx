import { useTheme } from "../lib/theme"

type BrandLogoProps = {
  className?: string
  alt?: string
}

/** Official Samartha Gamana Infra mark — background-free apple-touch-icon asset. */
export function BrandLogo({ className, alt = "Samartha Gamana Infra PVT LTD" }: BrandLogoProps) {
  const { theme } = useTheme()

  return (
    <span className={`brand-logo-stage brand-logo-stage--${theme}`} aria-hidden="true">
      <img
        src="/apple-touch-icon.png"
        alt={alt}
        className={className}
        width={180}
        height={180}
        decoding="async"
      />
    </span>
  )
}
