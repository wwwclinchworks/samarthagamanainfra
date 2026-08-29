export const WA_NUMBER = "917815872759"

export const waLink = (topic: string) =>
  "https://wa.me/" +
  WA_NUMBER +
  "?text=" +
  encodeURIComponent("Hello Samartha Gamana Infra, I would like to enquire about " + topic + ".")

export const contactIntents = [
  { id: "house", label: "House / Villa", topic: "a house / villa" },
  { id: "apartment", label: "Apartment", topic: "an apartment" },
  { id: "plot", label: "Plot", topic: "a plot" },
  { id: "commercial", label: "Commercial", topic: "commercial space" },
  { id: "call", label: "Enquiry call", topic: "a phone enquiry (please call me)" },
] as const
