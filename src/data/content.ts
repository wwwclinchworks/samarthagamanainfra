export const brand = {
  name: "Samartha Gamana Infra",
  short: "SGI",
  legal: "SamarthaGamanaInfra",
  tagline: "Capable journeys. Lasting homes.",
  since: "Established for the next generation of neighbourhoods",
}

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Our Projects" },
  { to: "/ongoing", label: "Ongoing" },
  { to: "/upcoming", label: "Upcoming" },
  { to: "/contact", label: "Contact" },
] as const

export const verticals = [
  {
    slug: "plots",
    title: "Plots",
    kicker: "Grounded beginnings",
    summary:
      "When a plot costs a fortune, we rewrite the finance formula in favour of the customer — a well-grounded process that creates awareness and helps families purchase land with clarity.",
    copy: "Open plots planned with approach roads, drainage, parks and clear titles. We walk with you from enquiry to registration so the land you buy is land you can build on.",
    tone: "from-[#ead7c3] to-[#f6f1ea]",
  },
  {
    slug: "apartments",
    title: "Apartments",
    kicker: "Elevated living",
    summary:
      "Flats at a considered price, where a family can live a well-deserved lifestyle — alluring localities, daylight interiors and amenities that feel like a small township.",
    copy: "From compact 2 BHKs to generous 3 BHKs, our residential towers are designed for light, ventilation and community. Clubhouses, landscaped podia and secure access come as standard.",
    tone: "from-[#d5e4ee] to-[#f6f1ea]",
  },
  {
    slug: "villas",
    title: "Villas",
    kicker: "A quieter horizon",
    summary:
      "From the congested city to a spacious villa — unique, customisable design, quality presence and a landscape of your choosing.",
    copy: "Independent villas and gated villa communities with private gardens, generous setbacks and architecture that sits gently in the plot. Built for families who want space without leaving the city behind.",
    tone: "from-[#e3eadc] to-[#f6f1ea]",
  },
  {
    slug: "commercial",
    title: "Commercial Complex",
    kicker: "Retail, food & gathering",
    summary:
      "Commercial complexes that bring retail, food and entertainment into one place — so a family can spend the day with enthusiasm and ease.",
    copy: "High-street frontage, efficient floor plates and parking planned for weekday office and weekend leisure. We design complexes that stay occupied because they stay useful.",
    tone: "from-[#edd6cc] to-[#f6f1ea]",
  },
  {
    slug: "farmlands",
    title: "Farmlands",
    kicker: "Nature, kept close",
    summary:
      "Premium farmlands that blend greenery with considered amenities — farming, produce, a clubhouse for leisure, weekend escapes and a long-horizon investment.",
    copy: "Managed farm plots with water, internal roads and a shared clubhouse. For those who want land that grows — trees, rest, and a second home when you are ready.",
    tone: "from-[#dce8d4] to-[#f6f1ea]",
  },
] as const

export const about = {
  quote:
    "Every successful project is a result of our hard work and determination, gained by the trust and satisfaction of our customers.",
  intro:
    "Samartha Gamana Infra is a real-estate house founded and owned by Nara Sudharshan of Anantapur, Andhra Pradesh. Named for capability (Samartha) and journey (Gamana), we plan, we build, and we stay until the keys feel like they were always yours.",
  body: "Nara Sudharshan started this desk in Anantapur so land, roads and homes stay on one drawing. We create plans to achieve your ambitions and then execute them with cost discipline and quality that satisfies. Details of our cities, years and square-feet will be updated as the portfolio is published — the craft and the promise begin here.",
  values: [
    {
      title: "Safety",
      text: "Zero accidents is the only acceptable count. Strong site practice is how we stay in business.",
    },
    {
      title: "Integrity",
      text: "We honour commitments and lead by example, aligning drawings, dates and deeds.",
    },
    {
      title: "Customer service",
      text: "Quality product, patient answers, and a process that does not ignore your needs.",
    },
    {
      title: "Collaboration",
      text: "Architects, contractors and families working toward one shared elevation.",
    },
    {
      title: "Team excellence",
      text: "Growth comes from people. We value our team beyond the roles on a site board.",
    },
    {
      title: "Social responsibility",
      text: "We aim to leave neighbourhoods better than we found them — through built work and civic care.",
    },
  ],
  vision:
    "To be an effective and innovative real-estate company, with a wistful commitment to superbly designed properties in excellent locations — homes, farmlands and shops that keep our trademark standards across budgets.",
  mission:
    "To provide an excellent level of service and expertise in the real-estate market. Highest standards of structure and performance, essential to fulfilling property dreams.",
}

export const locations = [
  "Kurnool",
  "Hyderabad",
  "Bengaluru",
  "Nandyal",
  "Anantapur",
  "Ballari",
  "Kadapa",
  "Gadwal",
  "Warangal",
  "Tadipatri",
] as const

export const completed = [
  {
    name: "Avencia",
    place: "Hyderabad",
    type: "Apartments",
    status: "Delivered",
  },
  {
    name: "Golden Oaks II",
    place: "Bengaluru",
    type: "Villas",
    status: "Delivered",
  },
  {
    name: "Ekashila",
    place: "Warangal",
    type: "Plots",
    status: "Delivered",
  },
  {
    name: "Silpa Emerald",
    place: "Kurnool",
    type: "Gated community",
    status: "Delivered",
  },
  {
    name: "Aarambh Econest",
    place: "Anantapur",
    type: "Farmlands",
    status: "Delivered",
  },
  {
    name: "Sindhooram",
    place: "Nandyal",
    type: "Apartments",
    status: "Delivered",
  },
] as const

export const ongoing = [
  {
    name: "Brindavanam",
    place: "Kurnool",
    type: "Residential township",
    note: "Landscaped streets, clubhouse and plotted parcels in progress.",
  },
  {
    name: "Green Farms",
    place: "Kadapa",
    type: "Farmlands",
    note: "Orchard grid, irrigation and a weekend pavilion under construction.",
  },
  {
    name: "Karthikeyam",
    place: "Hyderabad",
    type: "High-rise apartments",
    note: "Structure rising. Sample flat open for walkthroughs.",
  },
  {
    name: "Anvaya Greens",
    place: "Bengaluru",
    type: "Villas",
    note: "Villa shells and internal roads in current phase.",
  },
  {
    name: "Jasmine",
    place: "Ballari",
    type: "Plots",
    note: "Layout development and park works underway.",
  },
  {
    name: "Apoorva",
    place: "Tadipatri",
    type: "Commercial + homes",
    note: "Mixed-use podium and residential wings in parallel.",
  },
] as const

export const upcoming = [
  {
    name: "Gamana Heights",
    place: "Hyderabad",
    type: "Apartments",
    note: "A mid-rise on a quiet corridor. Launch details to follow.",
  },
  {
    name: "Samartha Grove",
    place: "Bengaluru",
    type: "Farmlands",
    note: "Managed groves with a shared clubhouse on the drawing board.",
  },
  {
    name: "Pallavi Square",
    place: "Kurnool",
    type: "Commercial complex",
    note: "Retail, food street and terrace lawn — coming next.",
  },
  {
    name: "Nivaasa Villas",
    place: "Nandyal",
    type: "Villas",
    note: "Limited villas around a central green. Waitlist open.",
  },
] as const

export const testimonials = [
  {
    quote:
      "From the day we booked to the day we received keys, the team was supportive and interactive. A hassle-free experience — I would recommend Samartha Gamana Infra whenever the opportunity arises.",
    name: "Prathap Reddy",
    role: "IT Professional",
  },
  {
    quote:
      "The quality of construction is excellent. Whenever we reached out, they responded immediately, handled queries patiently, and guided us with genuine care. We have since booked again.",
    name: "Surya",
    role: "Entrepreneur",
  },
  {
    quote:
      "Earlier developers ignored our needs. Once we switched, the process felt completely different — responsive coordination, well-informed guidance and unbiased advice.",
    name: "Ramana",
    role: "Business Professional",
  },
] as const

export const stats = [
  { value: 1, suffix: "L+", label: "Happy clients" },
  { value: 40, suffix: "+", label: "Projects" },
  { value: 70, suffix: "+ lakh sft", label: "Constructed" },
] as const

export const offices = [
  {
    title: "Corporate office",
    lines: ["Samartha Gamana Infra", "South India — address to be updated", "Open weekdays 10:00 – 18:00"],
  },
  {
    title: "Branch office",
    lines: ["City lounge & sample gallery", "By appointment on weekends", "hello@samarthagamana.infra"],
  },
] as const

export const awards = [
  "Leading Residential Developer — regional excellence",
  "Excellence in Plotted Development",
  "Emerging Developer of the Year (South)",
  "Low-cost Housing Development (South India)",
] as const
