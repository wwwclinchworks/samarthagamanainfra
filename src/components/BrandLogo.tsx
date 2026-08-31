type BrandLogoProps = {
  className?: string
  alt?: string
}

/** Official Samartha Gamana Infra mark — background-free apple-touch-icon asset. */
export function BrandLogo({ className, alt = "Samartha Gamana Infra PVT LTD" }: BrandLogoProps) {
  return (
    <span className="brand-logo-stage">
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
