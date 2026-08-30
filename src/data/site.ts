import { contact } from "./content"

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
    note: "Landmark of Anantapur — home of Samartha Gamana Infra Private Limited.",
    img: w("c/c8/Anantapur_Clock_tower_at_night.jpg"),
  },
  {
    id: "anantapur-rocks",
    kind: "house" as const,
    title: "Rock country, Anantapur district",
    place: "Anantapur district",
    area: "Rayalaseema",
    note: "The ground of the region Samartha Gamana Infra serves.",
    img: w("e/e6/Rock_formations_in_Anantapur_dt_Andhra_Pradesh_JEG9139.JPG"),
  },
  {
    id: "anantapur-rocks-b",
    kind: "villa" as const,
    title: "Anantapur district outcrops",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Location, contour and long-term potential come first.",
    img: w("5/54/Rock_formations_in_Anantapur_dt_Andhra_Pradesh_JEG9135.JPG"),
  },
  {
    id: "lepakshi-temple",
    kind: "villa" as const,
    title: "Lepakshi temple precinct",
    place: "Lepakshi, Anantapur district",
    area: "Heritage town",
    note: "Veerabhadra temple town in Anantapur district.",
    img: w("5/5a/LEPAKSHI_TEMPLE.jpg"),
  },
  {
    id: "lepakshi-temple-b",
    kind: "villa" as const,
    title: "Lepakshi, second court",
    place: "Lepakshi",
    area: "Anantapur district",
    note: "Heritage stone a short drive from Housing Board Colony.",
    img: w("7/76/LEPAKSHI_TEMPLE_02.jpg"),
  },
  {
    id: "lepakshi-eagle",
    kind: "house" as const,
    title: "Lepakshi Nandi & eagle lore",
    place: "Lepakshi",
    area: "Anantapur district",
    note: "Place memory for families exploring the district.",
    img: w("2/23/Eagle_at_Lepakshi.jpg"),
  },
  {
    id: "lepakshi-sculpture",
    kind: "2bhk" as const,
    title: "Veerabhadra Temple sculptures",
    place: "Lepakshi, Andhra Pradesh",
    area: "Heritage",
    note: "Craft and detail that remind us planning must endure.",
    img: w("f/fc/Sculptures_at_the_Veerabhadra_Temple%2C_Lepakshi%2C_Andhra_Pradesh%2C_India_%282017%29.jpg"),
  },
  {
    id: "rayalaseema-park-1",
    kind: "house" as const,
    title: "Rayalaseema parkland",
    place: "Anantapur, Rayalaseema",
    area: "Andhra Pradesh",
    note: "Open green in Anantapur country.",
    img: w("9/91/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_1.jpg"),
  },
  {
    id: "rayalaseema-park-2",
    kind: "villa" as const,
    title: "Anantapur scrub forest",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Native landscape before the first road is cut.",
    img: w("3/39/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_2.jpg"),
  },
  {
    id: "rayalaseema-park-3",
    kind: "2bhk" as const,
    title: "Rayalaseema morning light",
    place: "Anantapur district",
    area: "Andhra Pradesh",
    note: "Light and location shape every plan.",
    img: w("a/a8/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_3.jpg"),
  },
  {
    id: "rayalaseema-park-4",
    kind: "house" as const,
    title: "Anantapur hills edge",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Where regional growth meets open land.",
    img: w("f/f9/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_4.jpg"),
  },
  {
    id: "rayalaseema-park-5",
    kind: "villa" as const,
    title: "Rayalaseema canopy",
    place: "Anantapur district",
    area: "Andhra Pradesh",
    note: "Thoughtful development respects the landscape.",
    img: w("3/31/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_5.jpg"),
  },
  {
    id: "rayalaseema-park-6",
    kind: "2bhk" as const,
    title: "Anantapur reserve trail",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Connectivity and place — why Anantapur matters.",
    img: w("8/88/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_6.jpg"),
  },
  {
    id: "rayalaseema-park-7",
    kind: "house" as const,
    title: "Rayalaseema plateau",
    place: "Anantapur district",
    area: "Andhra Pradesh",
    note: "Understand the location before the plan.",
    img: w("9/9b/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_7.jpg"),
  },
  {
    id: "rayalaseema-park-9",
    kind: "villa" as const,
    title: "Anantapur green belt",
    place: "Anantapur",
    area: "Rayalaseema",
    note: "Long-term value starts with the land.",
    img: w("c/c1/National_park%2C_Anantapur%2C_Rayalaseema%2C_Andhra_Pradesh%2C_India_%282018%29_9.jpg"),
  },
  {
    id: "krishnadevaraya",
    kind: "house" as const,
    title: "Sri Krishnadevaraya statue",
    place: "Andhra Pradesh",
    area: "Heritage",
    note: "Regional history beside Anantapur's growth story.",
    img: w("6/66/Sri_Krishnadevaraya_Statue.jpg"),
  },
]

export const team = [
  {
    name: "Nara Sudharshan",
    role: "Founder & Owner",
    note: "Founder and owner of Samartha Gamana Infra Private Limited, Anantapur. WhatsApp " + contact.whatsapp + ".",
  },
]

export const journal = [
  {
    title: "Building with purpose from Anantapur",
    kicker: "Origin",
    date: "2026",
    body: "Samartha Gamana Infra Private Limited was established with a vision to create a modern and trusted presence in infrastructure and property development — from Housing Board Colony, Anantapur.",
  },
  {
    title: "A region with momentum",
    kicker: "Anantapur",
    date: "2026",
    body: "NH-44, NH-205, an A-category railway station and airport access via Bengaluru place Anantapur on Andhra Pradesh's growth map — the context for our long-term vision.",
  },
]

export const faqs = [
  {
    q: "Where is Samartha Gamana Infra based?",
    a: "Samartha Gamana Infra is based in Anantapur, Andhra Pradesh.",
  },
  {
    q: "Who founded Samartha Gamana Infra?",
    a: "The company was founded and is owned by Nara Sudharshan.",
  },
  {
    q: "What does Samartha Gamana Infra do?",
    a: "Samartha Gamana Infra operates in the infrastructure and real-estate space, with a focus on development opportunities and long-term growth.",
  },
  {
    q: "Where can I find project information?",
    a: "Project information will be published on the official website as individual developments are formally announced.",
  },
  {
    q: "How can I contact Samartha Gamana Infra?",
    a: `You can contact the team through WhatsApp at ${contact.whatsapp} or by email at ${contact.founderEmail} / ${contact.email}.`,
  },
  {
    q: "Where is the registered office?",
    a: `The registered office is at ${contact.addressOneLine}.`,
  },
  {
    q: "Is Samartha Gamana Infra a Private Limited or an LLP?",
    a: "Private Limited Company — Samartha Gamana Infra Private Limited, CIN U43300AP2026PTC124637, ROC Vijayawada. Not an LLP.",
  },
]

export const jobs = [
  {
    title: "Join the Anantapur desk",
    place: "Anantapur",
    note: "As the portfolio grows, roles will be announced here. Introduce yourself on WhatsApp " + contact.whatsapp + ".",
  },
]

export const press = [
  {
    title: "Corporate information",
    year: "2026",
    outlet: "MCA / public registry",
    body: "Samartha Gamana Infra Private Limited, CIN U43300AP2026PTC124637, ROC Vijayawada. Registered office: Housing Board Colony, Anantapur 515001.",
  },
]

export const cityCopy = [
  { name: "Anantapur", note: "Home city and registered office. NH-44 and NH-205 connectivity. A-category railway station." },
  { name: "Bengaluru corridor", note: "NH-44 toward Bengaluru; Kempegowda International Airport approx. 184 km." },
  { name: "Hyderabad corridor", note: "NH-44 linking Anantapur toward Hyderabad." },
  { name: "Chennai corridor", note: "NH-205 connectivity toward Chennai through the Renigunta corridor." },
  { name: "Lepakshi", note: "Heritage town in Anantapur district." },
  { name: "Industrial Anantapur", note: "Manufacturing ecosystem including Kia India in Anantapur district." },
]

export const processCopy = [
  {
    n: "01",
    t: "Understand",
    d: "We study the location, requirements and potential of the opportunity.",
    long: "Every development begins with understanding people, place and long-term potential.",
  },
  {
    n: "02",
    t: "Plan",
    d: "We focus on practical planning, usability, accessibility and long-term value.",
    long: "Thoughtful planning before execution.",
  },
  {
    n: "03",
    t: "Develop",
    d: "Responsible execution and attention to development quality remain central.",
    long: "Quality and responsibility throughout the journey.",
  },
  {
    n: "04",
    t: "Connect",
    d: "We maintain clear communication with customers and stakeholders.",
    long: "Transparency at every step.",
  },
  {
    n: "05",
    t: "Grow",
    d: "We continue building our portfolio with a long-term vision for the region.",
    long: "Growing alongside Anantapur and Rayalaseema.",
  },
]
