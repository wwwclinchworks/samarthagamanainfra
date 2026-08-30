type BrandLogoProps = {
  variant?: "nobg" | "bg"
  className?: string
  alt?: string
}

export function BrandLogo({ variant = "nobg", className, alt = "Samartha Gamana Infra" }: BrandLogoProps) {
  const src = variant === "bg" ? "/logo-bg.png" : "/logo-nobg.png"
  return <img src={src} alt={alt} className={className} />
}
