type BrandLogoProps = {
  className?: string
  alt?: string
}

/** Official Samartha Gamana Infra mark — public/newlogo.png */
export function BrandLogo({ className, alt = "Samartha Gamana Infra PVT LTD" }: BrandLogoProps) {
  return (
    <img
      src="/newlogo.png"
      alt={alt}
      className={className}
      width={1536}
      height={1024}
      decoding="async"
    />
  )
}
