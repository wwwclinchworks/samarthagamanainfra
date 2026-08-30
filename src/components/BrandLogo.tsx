type BrandLogoProps = {
  className?: string
  alt?: string
}

/** Official mark from public/newlogo.png */
export function BrandLogo({ className, alt = "Samartha Gamana Infra" }: BrandLogoProps) {
  return <img src="/newlogo.png" alt={alt} className={className} />
}
