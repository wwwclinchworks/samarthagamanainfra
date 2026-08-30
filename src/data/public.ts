export const SITE_URL = "https://samarthagamanainfra.com"

/** MCA / public registry facts for Samartha Gamana Infra Private Limited */
export const company = {
  tradeName: "Samartha Gamana Infra",
  short: "SGI",
  legalName: "Samartha Gamana Infra Private Limited",
  entityType: "Private Limited Company",
  notLlp: "Not an LLP — incorporated as a Private Limited Company under the Companies Act.",
  cin: "U43300AP2026PTC124637",
  registrationNumber: "124637",
  state: "Andhra Pradesh",
  roc: "Vijayawada",
  activityCode: "U43300",
  activity:
    "Specialized construction and infrastructure activities (MCA class U43300), with real-estate development for plots, homes and commercial work.",
  incorporatedYear: "2026",
  status: "Active",
  addressLines: [
    "No-28-5-154, 1st Floor",
    "Housing Board Colony",
    "Anantapur, Andhra Pradesh 515001",
    "India",
  ],
  addressOneLine:
    "No-28-5-154, 1st Floor, Housing Board Colony, Anantapur, Andhra Pradesh 515001",
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
  founderEmail: "narashudharshan@gmail.com",
  phoneDisplay: company.phoneDisplay,
  phone: company.phone,
  sameAs: ["https://samarthagamanainfra.com/nara-sudharshan"],
  short:
    "Nara Sudharshan is the founder and owner of Samartha Gamana Infra Private Limited. He is from Anantapur, Andhra Pradesh.",
  bio: [
    "Nara Sudharshan is the founder and owner of Samartha Gamana Infra. With the company based in Anantapur, his vision is centred on building a trusted infrastructure and real-estate enterprise with a strong focus on thoughtful development and long-term value.",
    "Under his leadership, Samartha Gamana Infra aims to create a growing portfolio of opportunities while maintaining a customer-focused and transparent approach.",
    `Founder's vision: “Build with purpose. Grow with trust. Create value that lasts.” Public desk: WhatsApp ${company.phoneDisplay}, ${company.email}, and narashudharshan@gmail.com.`,
  ],
}

export const publicDesk = {
  email: company.email,
  founderEmail: "narashudharshan@gmail.com",
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
      "Samartha Gamana Infra Private Limited (CIN U43300AP2026PTC124637), Housing Board Colony, Anantapur. Founded by Nara Sudharshan. Plots, homes, roads and infrastructure.",
  },
  "/nara-sudharshan": {
    title: "Nara Sudharshan | Founder of Samartha Gamana Infra | Anantapur",
    description:
      "Nara Sudharshan is the founder and owner of Samartha Gamana Infra Private Limited, Anantapur, Andhra Pradesh. Official profile and contact.",
  },
  "/founder": {
    title: "Nara Sudharshan | Founder of Samartha Gamana Infra | Anantapur",
    description:
      "Nara Sudharshan, founder and owner of Samartha Gamana Infra Private Limited, Anantapur. Official company profile.",
  },
  "/about": {
    title: "About Samartha Gamana Infra Private Limited | Anantapur",
    description:
      "About Samartha Gamana Infra Private Limited — CIN, registered office at Housing Board Colony, Anantapur, founded by Nara Sudharshan.",
  },
  "/team": {
    title: "Team | Nara Sudharshan, Founder | Samartha Gamana Infra",
    description: "Meet Nara Sudharshan, founder of Samartha Gamana Infra Private Limited, Anantapur.",
  },
  "/gallery": {
    title: "Gallery | Anantapur & Andhra Pradesh | Samartha Gamana Infra",
    description:
      "Anantapur and Andhra Pradesh place gallery for Samartha Gamana Infra Private Limited — Lepakshi, Rayalaseema, Housing Board Colony desk.",
  },
  "/projects": {
    title: "Developments | Samartha Gamana Infra | Anantapur",
    description:
      "Developments and lines of work by Samartha Gamana Infra Private Limited in Anantapur and Rayalaseema.",
  },
  "/ongoing": {
    title: "Ongoing work | Samartha Gamana Infra | Anantapur",
    description: "Current focus of Samartha Gamana Infra Private Limited in Anantapur.",
  },
  "/upcoming": {
    title: "Upcoming | Samartha Gamana Infra | Anantapur",
    description: "Next parcels from Samartha Gamana Infra Private Limited, Anantapur.",
  },
  "/process": {
    title: "Process | Samartha Gamana Infra",
    description: "Land, design, build, deliver — how Samartha Gamana Infra Private Limited works from Anantapur.",
  },
  "/cities": {
    title: "Cities | Anantapur focus | Samartha Gamana Infra",
    description: "Anantapur is home. Samartha Gamana Infra Private Limited also works across Rayalaseema and neighbouring towns.",
  },
  "/careers": {
    title: "Careers | Samartha Gamana Infra | Anantapur",
    description: "Roles at Samartha Gamana Infra Private Limited, Anantapur.",
  },
  "/press": {
    title: "Press | Samartha Gamana Infra Private Limited",
    description: "Company facts for Samartha Gamana Infra Private Limited and founder Nara Sudharshan.",
  },
  "/faq": {
    title: "FAQ | Samartha Gamana Infra | Anantapur",
    description: `Questions for Samartha Gamana Infra Private Limited. WhatsApp ${company.phoneDisplay}.`,
  },
  "/journal": {
    title: "Journal | Samartha Gamana Infra",
    description: "Field notes from Samartha Gamana Infra, Anantapur.",
  },
  "/contact": {
    title: "Contact Samartha Gamana Infra | Anantapur | 6302556139",
    description: `Contact Samartha Gamana Infra Private Limited and founder Nara Sudharshan. WhatsApp ${company.phoneDisplay}. Housing Board Colony, Anantapur.`,
  },
  "/what-we-do/plots": {
    title: "Plots | Samartha Gamana Infra | Anantapur",
    description: "Open plots from Samartha Gamana Infra Private Limited, Anantapur.",
  },
  "/what-we-do/apartments": {
    title: "Apartments | Samartha Gamana Infra | Anantapur",
    description: "Apartment living from Samartha Gamana Infra Private Limited, Anantapur.",
  },
  "/what-we-do/villas": {
    title: "Villas & houses | Samartha Gamana Infra | Anantapur",
    description: "Independent houses and villas by Samartha Gamana Infra Private Limited.",
  },
  "/what-we-do/commercial": {
    title: "Commercial | Samartha Gamana Infra | Anantapur",
    description: "Commercial work from Samartha Gamana Infra Private Limited, Anantapur.",
  },
  "/what-we-do/farmlands": {
    title: "Farmlands | Samartha Gamana Infra | Anantapur",
    description: "Farm and orchard parcels from Samartha Gamana Infra Private Limited, Anantapur district.",
  },
  "/why-anantapur": {
    title: "Why Anantapur | Samartha Gamana Infra",
    description:
      "Anantapur connectivity, industry and growth — why Samartha Gamana Infra is based here.",
  },
  "/legal": {
    title: "Corporate Information | Samartha Gamana Infra Private Limited",
    description:
      "CIN U43300AP2026PTC124637, ROC Vijayawada, Housing Board Colony, Anantapur.",
  },
  "/disclaimer": {
    title: "Disclaimer | Samartha Gamana Infra",
    description:
      "General information disclaimer for Samartha Gamana Infra Private Limited.",
  },
  "/privacy": {
    title: "Privacy Policy | Samartha Gamana Infra",
    description:
      "Privacy policy for Samartha Gamana Infra Private Limited.",
  },
  "/terms": {
    title: "Terms & Conditions | Samartha Gamana Infra",
    description:
      "Website terms for Samartha Gamana Infra Private Limited.",
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
  "/process",
  "/why-anantapur",
  "/careers",
  "/press",
  "/faq",
  "/journal",
  "/contact",
  "/legal",
  "/disclaimer",
  "/privacy",
  "/terms",
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
  founderEmail: "narashudharshan@gmail.com",
        telephone: company.phone,
        identifier: company.cin,
        taxID: company.cin,
        foundingLocation: {
          "@type": "Place",
          name: "Anantapur, Andhra Pradesh, India",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "No-28-5-154, 1st Floor, Housing Board Colony",
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
          "Samartha Gamana Infra Private Limited",
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
  founderEmail: "narashudharshan@gmail.com",
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
  founderEmail: "narashudharshan@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "No-28-5-154, 1st Floor, Housing Board Colony",
          addressLocality: "Anantapur",
          postalCode: "515001",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
      },
    ],
  }
}
