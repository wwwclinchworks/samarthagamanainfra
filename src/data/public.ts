export const SITE_URL = "https://samarthagamanainfra.com"

/** MCA / public registry facts for Samartha Gamana Infra PVT LTD */
export const company = {
  tradeName: "Samartha Gamana Infra",
  short: "SGI",
  legalName: "Samartha Gamana Infra PVT LTD",
  entityType: "Private Limited Company",
  notLlp: "Not an LLP — incorporated as a Private Limited Company under the Companies Act.",
  cin: "U43300AP2026PTC124637",
  registrationNumber: "124637",
  state: "Andhra Pradesh",
  roc: "RoC — Andhra Pradesh",
  activityCode: "U43300",
  activity:
    "Specialized construction and infrastructure activities (MCA class U43300), including PEB wall panels, real-estate development for plots, homes and commercial work.",
  incorporatedYear: "2026",
  status: "Active",
  addressLines: [
    "No. 28-5-154, 1st Floor",
    "Housing Board Colony",
    "Anantapur, Andhra Pradesh 515001",
    "India",
  ],
  addressOneLine:
    "No. 28-5-154, 1st Floor, Housing Board Colony, Anantapur, Andhra Pradesh 515001",
  email: "connect@samarthagamana.in",
  phoneDisplay: "+91 63025 56139",
  phone: "+916302556139",
  website: SITE_URL,
  github: "https://github.com/wwwclinchworks/samarthagamanainfra",
}

export const founder = {
  name: "Nara Sudharshan",
  givenName: "Sudharshan",
  familyName: "Nara",
  role: "Founder and owner",
  city: "Anantapur",
  region: "Andhra Pradesh",
  country: "India",
  email: company.email,
  phoneDisplay: company.phoneDisplay,
  phone: company.phone,
  sameAs: ["https://samarthagamanainfra.com/nara-sudharshan"],
  short:
    "Nara Sudharshan is the founder and owner of Samartha Gamana Infra PVT LTD. He is from Anantapur, Andhra Pradesh.",
  bio: [
    "Nara Sudharshan founded Samartha Gamana Infra PVT LTD in Anantapur to hold land, PEB structures and homes to the same drawing. The registered office is at Housing Board Colony, Anantapur (CIN U43300AP2026PTC124637).",
    "Samartha (capability) and Gamana (journey) is the name of the house: plots, residences, PEB wall panels, commercial work, construction and land development rooted in Anantapur and Rayalaseema, Andhra Pradesh.",
    `Public desk: WhatsApp ${company.phoneDisplay} and ${company.email}. Searches for Nara Sudharshan, Nara Sudharshan Anantapur, or Samartha Gamana Infra should lead here — this is the company's official site.`,
  ],
}

export const publicDesk = {
  email: company.email,
  whatsapp: company.phoneDisplay,
  website: SITE_URL,
  github: company.github,
  address: company.addressOneLine,
  legalName: company.legalName,
  cin: company.cin,
}

export const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Samartha Gamana Infra Pvt Ltd | Anantapur | Nara Sudharshan",
    description:
      "Samartha Gamana Infra PVT LTD (CIN U43300AP2026PTC124637), Housing Board Colony, Anantapur. Founded by Nara Sudharshan. PEB wall panels, plots, homes and infrastructure.",
  },
  "/nara-sudharshan": {
    title: "Nara Sudharshan | Founder of Samartha Gamana Infra | Anantapur",
    description:
      "Nara Sudharshan is the founder and owner of Samartha Gamana Infra PVT LTD, Anantapur, Andhra Pradesh. Official profile and contact.",
  },
  "/founder": {
    title: "Nara Sudharshan | Founder of Samartha Gamana Infra | Anantapur",
    description:
      "Nara Sudharshan, founder and owner of Samartha Gamana Infra PVT LTD, Anantapur. Official company profile.",
  },
  "/about": {
    title: "About Samartha Gamana Infra PVT LTD | Anantapur",
    description:
      "About Samartha Gamana Infra PVT LTD — CIN, registered office at Housing Board Colony, Anantapur, founded by Nara Sudharshan.",
  },
  "/team": {
    title: "Team | Nara Sudharshan, Founder | Samartha Gamana Infra",
    description: "Meet Nara Sudharshan, founder of Samartha Gamana Infra PVT LTD, Anantapur.",
  },
  "/gallery": {
    title: "Gallery | Anantapur & Andhra Pradesh | Samartha Gamana Infra",
    description:
      "Anantapur and Andhra Pradesh place gallery for Samartha Gamana Infra PVT LTD — Lepakshi, Rayalaseema, Housing Board Colony desk.",
  },
  "/projects": {
    title: "Developments | Samartha Gamana Infra | Anantapur",
    description:
      "Developments and lines of work by Samartha Gamana Infra PVT LTD in Anantapur and Rayalaseema.",
  },
  "/ongoing": {
    title: "Ongoing work | Samartha Gamana Infra | Anantapur",
    description: "Current focus of Samartha Gamana Infra PVT LTD in Anantapur.",
  },
  "/upcoming": {
    title: "Upcoming | Samartha Gamana Infra | Anantapur",
    description: "Next parcels from Samartha Gamana Infra PVT LTD, Anantapur.",
  },
  "/process": {
    title: "Process | Samartha Gamana Infra",
    description: "Land, design, build, deliver — how Samartha Gamana Infra PVT LTD works from Anantapur.",
  },
  "/cities": {
    title: "Cities | Anantapur focus | Samartha Gamana Infra",
    description: "Anantapur is home. Samartha Gamana Infra PVT LTD also works across Rayalaseema and neighbouring towns.",
  },
  "/careers": {
    title: "Careers | Samartha Gamana Infra | Anantapur",
    description: "Roles at Samartha Gamana Infra PVT LTD, Anantapur.",
  },
  "/press": {
    title: "Press | Samartha Gamana Infra PVT LTD",
    description: "Company facts for Samartha Gamana Infra PVT LTD and founder Nara Sudharshan.",
  },
  "/faq": {
    title: "FAQ | Samartha Gamana Infra | Anantapur",
    description: `Questions for Samartha Gamana Infra PVT LTD. WhatsApp ${company.phoneDisplay}.`,
  },
  "/journal": {
    title: "Journal | Samartha Gamana Infra",
    description: "Field notes from Samartha Gamana Infra, Anantapur.",
  },
  "/contact": {
    title: "Contact Samartha Gamana Infra | Anantapur | 6302556139",
    description: `Contact Samartha Gamana Infra PVT LTD and founder Nara Sudharshan. WhatsApp ${company.phoneDisplay}. Housing Board Colony, Anantapur.`,
  },
  "/what-we-do/peb": {
    title: "PEB Wall Panels | Samartha Gamana Infra PVT LTD | Anantapur",
    description:
      "Pre-Engineered Building wall panels — warehouses, factories and industrial sheds. Major business of Samartha Gamana Infra PVT LTD, Anantapur.",
  },
  "/what-we-do/plots": {
    title: "Plots | Samartha Gamana Infra | Anantapur",
    description: "Open plots from Samartha Gamana Infra PVT LTD, Anantapur.",
  },
  "/what-we-do/apartments": {
    title: "Apartments | Samartha Gamana Infra | Anantapur",
    description: "Apartment living from Samartha Gamana Infra PVT LTD, Anantapur.",
  },
  "/what-we-do/villas": {
    title: "Villas & houses | Samartha Gamana Infra | Anantapur",
    description: "Independent houses and villas by Samartha Gamana Infra PVT LTD.",
  },
  "/what-we-do/commercial": {
    title: "Commercial | Samartha Gamana Infra | Anantapur",
    description: "Commercial work from Samartha Gamana Infra PVT LTD, Anantapur.",
  },
  "/what-we-do/farmlands": {
    title: "Farmlands | Samartha Gamana Infra | Anantapur",
    description: "Farm and orchard parcels from Samartha Gamana Infra PVT LTD, Anantapur district.",
  },
}

export const sitemapPaths = [
  "/",
  "/nara-sudharshan",
  "/founder",
  "/about",
  "/team",
  "/gallery",
  "/projects",
  "/ongoing",
  "/upcoming",
  "/process",
  "/cities",
  "/careers",
  "/press",
  "/faq",
  "/journal",
  "/contact",
  "/why-anantapur",
  "/legal",
  "/disclaimer",
  "/privacy",
  "/terms",
  "/what-we-do/peb",
  "/what-we-do/plots",
  "/what-we-do/apartments",
  "/what-we-do/villas",
  "/what-we-do/commercial",
  "/what-we-do/farmlands",
] as const

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": SITE_URL + "/#org",
        name: company.tradeName,
        legalName: company.legalName,
        alternateName: ["SGI", "SamarthaGamanaInfra", "Samartha Gamana", company.legalName],
        url: SITE_URL,
        logo: SITE_URL + "/newlogo.png",
        image: SITE_URL + "/newlogo.png",
        email: company.email,
        telephone: company.phone,
        identifier: company.cin,
        taxID: company.cin,
        foundingLocation: {
          "@type": "Place",
          name: "Anantapur, Andhra Pradesh, India",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "No. 28-5-154, 1st Floor, Housing Board Colony",
          addressLocality: "Anantapur",
          postalCode: "515001",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
        founder: { "@id": SITE_URL + "/nara-sudharshan#person" },
        owner: { "@id": SITE_URL + "/nara-sudharshan#person" },
        employee: { "@id": SITE_URL + "/nara-sudharshan#person" },
        sameAs: [company.github, SITE_URL + "/nara-sudharshan", SITE_URL + "/founder"],
        description:
          founder.short +
          " Registered as a Private Limited Company (CIN " +
          company.cin +
          ").",
        areaServed: ["Anantapur", "Rayalaseema", "Andhra Pradesh"],
        knowsAbout: [
          "Nara Sudharshan",
          "Anantapur real estate",
          "Samartha Gamana Infra PVT LTD",
          "plots",
          "infrastructure",
        ],
      },
      {
        "@type": "Person",
        "@id": SITE_URL + "/nara-sudharshan#person",
        name: "Nara Sudharshan",
        alternateName: ["Sudharshan Nara", "Nara Sudarshan"],
        givenName: "Sudharshan",
        familyName: "Nara",
        jobTitle: "Founder and owner",
        url: SITE_URL + "/nara-sudharshan",
        image: SITE_URL + "/newlogo.png",
        email: company.email,
        telephone: company.phone,
        homeLocation: {
          "@type": "Place",
          name: "Anantapur, Andhra Pradesh, India",
          geo: {
            "@type": "GeoCoordinates",
            latitude: 14.6819,
            longitude: 77.6006,
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Anantapur",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
        worksFor: { "@id": SITE_URL + "/#org" },
        founderOf: { "@id": SITE_URL + "/#org" },
        affiliation: { "@id": SITE_URL + "/#org" },
        description: founder.short,
        sameAs: founder.sameAs,
        knowsAbout: ["Samartha Gamana Infra", "real estate", "infrastructure", "Anantapur"],
      },
      {
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        url: SITE_URL,
        name: company.tradeName,
        publisher: { "@id": SITE_URL + "/#org" },
        inLanguage: "en-IN",
      },
      {
        "@type": "RealEstateAgent",
        "@id": SITE_URL + "/#agent",
        name: company.tradeName,
        url: SITE_URL,
        founder: { "@id": SITE_URL + "/nara-sudharshan#person" },
        telephone: company.phone,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "No. 28-5-154, 1st Floor, Housing Board Colony",
          addressLocality: "Anantapur",
          postalCode: "515001",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
      },
    ],
  }
}
