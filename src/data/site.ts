/** Gallery: Anantapur & Andhra Pradesh place imagery (Wikimedia Commons). */
export type GalleryKind = "2bhk" | "villa" | "house"

const w = (path: string) => `https://upload.wikimedia.org/wikipedia/commons/${path}`

export const gallery = [
  {
    id: "anantapur-clock",
    kind: "house" as const,
    title: "Anantapur clock tower",
    place: "Anantapur",
    area: "City centre",
    note: "Landmark of Anantapur city — home of Samartha Gamana Infra PVT LTD.",
    img: w("c/c8/Anantapur_Clock_tower_at_night.jpg"),
  },
  {
    id: "anantapur-rocks",
    kind: "house" as const,
    title: "Rock country, Anantapur district",
    place: "Anantapur district",
    area: "Rayalaseema",
    note: "Hard stone and open sky — the ground Samartha Gamana Infra builds on.",
    img: w("e/e6/Rock_formations_in_Anantapur_dt_Andhra_Pradesh_JEG9139.JPG"),
  },
  {
    id: "anantapur-rocks-b",
    kind: "villa" as const,
    title: "Anantapur district outcrops",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Contour before cut-and-fill. Local stone sets the drawing.",
    img: w("5/54/Rock_formations_in_Anantapur_dt_Andhra_Pradesh_JEG9135.JPG"),
  },
  {
    id: "lepakshi-temple",
    kind: "villa" as const,
    title: "Lepakshi temple precinct",
    place: "Lepakshi, Anantapur district",
    area: "Heritage town",
    note: "Veerabhadra temple town in Anantapur district — craft and stone the company knows by name.",
    img: w("5/5a/LEPAKSHI_TEMPLE.jpg"),
  },
  {
    id: "lepakshi-temple-b",
    kind: "villa" as const,
    title: "Lepakshi, second court",
    place: "Lepakshi",
    area: "Anantapur district",
    note: "Vijayanagara stonework a short drive from the Housing Board Colony desk.",
    img: w("7/76/LEPAKSHI_TEMPLE_02.jpg"),
  },
  {
    id: "lepakshi-eagle",
    kind: "house" as const,
    title: "Lepakshi Nandi & eagle lore",
    place: "Lepakshi",
    area: "Anantapur district",
    note: "Place memory for families buying land in the district.",
    img: w("2/23/Eagle_at_Lepakshi.jpg"),
  },
  {
    id: "lepakshi-sculpture",
    kind: "2bhk" as const,
    title: "Veerabhadra Temple sculptures",
    place: "Lepakshi, Andhra Pradesh",
    area: "Heritage",
    note: "Detail that reminds us drawings must survive the site.",
    img: w("f/fc/Sculptures_at_the_Veerabhadra_Temple%2C_Lepakshi%2C_Andhra_Pradesh%2C_India_%282017%29.jpg"),
  },
  {
    id: "rayalaseema-park-1",
    kind: "house" as const,
    title: "Rayalaseema parkland",
    place: "Anantapur, Rayalaseema",
    area: "Andhra Pradesh",
    note: "Open green in Anantapur country — how a township spine should feel.",
    img: w("9/91/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_1.jpg"),
  },
  {
    id: "rayalaseema-park-2",
    kind: "villa" as const,
    title: "Anantapur scrub forest",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Native landscape before the first foundation is set.",
    img: w("3/39/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_2.jpg"),
  },
  {
    id: "rayalaseema-park-3",
    kind: "2bhk" as const,
    title: "Rayalaseema morning light",
    place: "Anantapur district",
    area: "Andhra Pradesh",
    note: "East light that a good 2 BHK should catch.",
    img: w("a/a8/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_3.jpg"),
  },
  {
    id: "rayalaseema-park-4",
    kind: "house" as const,
    title: "Anantapur hills edge",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Where farm parcels and weekend houses sit.",
    img: w("f/f9/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_4.jpg"),
  },
  {
    id: "rayalaseema-park-5",
    kind: "villa" as const,
    title: "Rayalaseema canopy",
    place: "Anantapur district",
    area: "Andhra Pradesh",
    note: "Tree line along a future township spine.",
    img: w("3/31/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_5.jpg"),
  },
  {
    id: "rayalaseema-park-6",
    kind: "2bhk" as const,
    title: "Anantapur reserve trail",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Walkable edges — how Samartha Gamana Infra thinks about plotted layouts.",
    img: w("8/88/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_6.jpg"),
  },
  {
    id: "rayalaseema-park-7",
    kind: "house" as const,
    title: "Rayalaseema plateau",
    place: "Anantapur district",
    area: "Andhra Pradesh",
    note: "Survey before design. Contour first.",
    img: w("9/9b/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_7.jpg"),
  },
  {
    id: "rayalaseema-park-9",
    kind: "villa" as const,
    title: "Anantapur green belt",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Parks and setbacks that stay on the drawing.",
    img: w("c/c1/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_9.jpg"),
  },
  {
    id: "krishnadevaraya",
    kind: "house" as const,
    title: "Sri Krishnadevaraya statue",
    place: "Andhra Pradesh",
    area: "Heritage",
    note: "Regional history that sits beside every Rayalaseema survey number.",
    img: w("6/66/Sri_Krishnadevaraya_Statue.jpg"),
  },
]

export const team = [
  {
    name: "Nara Sudharshan",
    role: "Founder and owner",
    note: "From Anantapur. Founded Samartha Gamana Infra PVT LTD (CIN U43300AP2026PTC124637). Desk: WhatsApp +91 63025 56139.",
  },
  {
    name: "Projects desk",
    role: "Site & sequence",
    note: "Weekly counts on Anantapur and Rayalaseema parcels. Concrete, safety, and the date on the board.",
  },
  {
    name: "Customer desk",
    role: "Families",
    note: "The number families call — WhatsApp +91 63025 56139. Sample walks and title questions.",
  },
  {
    name: "Titles & legal",
    role: "Documents",
    note: "Survey numbers that match the sale deed. EC, layout, and the Housing Board Colony file.",
  },
]

export const journal = [
  {
    title: "Why Anantapur is the first city on the map",
    kicker: "Origin",
    date: "12 Mar 2026",
    body: "Samartha Gamana Infra PVT LTD is registered at Housing Board Colony, Anantapur. The founder, Nara Sudharshan, builds from the city he knows by street and survey number — not from a brochure map drawn elsewhere.",
  },
  {
    title: "Private Limited, not LLP",
    kicker: "Company",
    date: "02 Apr 2026",
    body: "Public MCA listings show Samartha Gamana Infra as a Private Limited Company (CIN U43300AP2026PTC124637), class U43300 specialised construction. It is not an LLP. Ask the desk for the CIN on any agreement.",
  },
  {
    title: "Lepakshi stone, Anantapur plots",
    kicker: "Place",
    date: "21 Apr 2026",
    body: "Lepakshi sits in Anantapur district. The same hard stone that carved Veerabhadra is the geology under local plots — contour first, then the foundation, then the house.",
  },
  {
    title: "Keys from the Housing Board Colony desk",
    kicker: "Handover",
    date: "18 May 2026",
    body: "A lock that turns, a file that matches the unit, and WhatsApp +91 63025 56139 that still answers after the board comes down.",
  },
]

export const faqs = [
  {
    q: "Does Samartha Gamana Infra supply PEB wall panels?",
    a: "Yes — PEB (Pre-Engineered Building) wall panels are one of our major businesses. We handle warehouse, factory and industrial shed structures across Anantapur and Rayalaseema. Enquire on WhatsApp +91 63025 56139.",
  },
  {
    q: "Is Samartha Gamana Infra a Private Limited or an LLP?",
    a: "Private Limited Company — Samartha Gamana Infra PVT LTD, CIN U43300AP2026PTC124637. Not an LLP. Registered office: Housing Board Colony, Anantapur 515001.",
  },
  {
    q: "Who founded Samartha Gamana Infra?",
    a: "Nara Sudharshan, from Anantapur, Andhra Pradesh. Official page: /nara-sudharshan. WhatsApp +91 63025 56139.",
  },
  {
    q: "Where is the registered office?",
    a: "No. 28-5-154, 1st Floor, Housing Board Colony, Anantapur, Andhra Pradesh 515001.",
  },
  {
    q: "What work does the company do?",
    a: "MCA class U43300 — specialised construction and infrastructure, with plots, independent houses, apartments, commercial and land development rooted in Anantapur and Rayalaseema.",
  },
  {
    q: "Where do you build?",
    a: "Anantapur is home. Work also reaches neighbouring Rayalaseema towns. Confirm a live parcel on WhatsApp.",
  },
  {
    q: "How do I enquire?",
    a: "WhatsApp +91 63025 56139 or email connect@samarthagamana.in. Quote the gallery place name or the parcel you have in mind.",
  },
  {
    q: "Is the gallery live inventory?",
    a: "Gallery shows Anantapur and Andhra Pradesh place photography for context. Live stock, floor and facing are confirmed on WhatsApp.",
  },
  {
    q: "What is the email?",
    a: "connect@samarthagamana.in — WhatsApp is faster for site visits.",
  },
]

export const jobs = [
  {
    title: "Site engineer",
    place: "Anantapur",
    note: "RCC, safety counts, weekly reports on local parcels. Apply on WhatsApp with the role title.",
  },
  {
    title: "Sales associate",
    place: "Anantapur",
    note: "Walk families through plots and homes without inflating the carpet. Housing Board Colony desk.",
  },
  {
    title: "CAD drafter",
    place: "Anantapur",
    note: "Revisions held to the last redline. Township streets and house types.",
  },
]

export const press = [
  {
    title: "MCA listing — Private Limited",
    year: "2026",
    outlet: "Company registry (public)",
    body: "Samartha Gamana Infra PVT LTD, CIN U43300AP2026PTC124637, registered at Housing Board Colony, Anantapur 515001. Class: Private Limited (not LLP).",
  },
  {
    title: "Founder — Nara Sudharshan",
    year: "2026",
    outlet: "Official site",
    body: "Nara Sudharshan of Anantapur is the founder and owner. Profile: samarthagamanainfra.com/nara-sudharshan.",
  },
]

export const cityCopy = [
  {
    name: "Anantapur",
    note: "Home city. Registered office at Housing Board Colony. Founder Nara Sudharshan. Clock tower, Lepakshi district, Rayalaseema ground.",
  },
  { name: "Lepakshi", note: "Anantapur district heritage town — Veerabhadra temple stone and local plots." },
  { name: "Tadipatri", note: "Neighbouring Rayalaseema town on the company map for mixed-use and house enquiries." },
  { name: "Kurnool", note: "Rayalaseema neighbour — plots and independent houses by enquiry." },
  { name: "Kadapa", note: "Rayalaseema corridor — farm and weekend house interest." },
  { name: "Ballari", note: "Border town enquiries for plotted work." },
  { name: "Nandyal", note: "Regional town for residential walkthroughs by appointment." },
  { name: "Gadwal", note: "Street-house and plotted parcel enquiries." },
  { name: "Hyderabad", note: "Buyer desk for families moving between Hyderabad and Anantapur." },
  { name: "Bengaluru", note: "NRI and metro buyers looking at Anantapur district land — by appointment." },
]

export const processCopy = [
  {
    n: "01",
    t: "Land",
    d: "Survey, title, and soil on Anantapur ground before design.",
    long: "EC, layout, and a boundary a tape can find. Housing Board Colony desk holds the file.",
  },
  {
    n: "02",
    t: "Design",
    d: "Master plan and approvals drawn to the same scale as what gets built.",
    long: "House types, plot grids and PEB shells share one brass line.",
  },
  {
    n: "03",
    t: "Build",
    d: "Sequence against the drawing. Weekly board.",
    long: "Structure and services before the first plaster. RCC counts and a date that is not a slogan.",
  },
  {
    n: "04",
    t: "Deliver",
    d: "Keys, documents, and a lock that turns.",
    long: "Snag list closed, file matching the unit, WhatsApp +91 63025 56139 still answers.",
  },
]
