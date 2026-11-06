// Single source for brand copy and SEO. Content follows memory/PRD.md guardrails:
// no prices, availability, customers, partners or certifications.
export const site = {
  name: "NTRX",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ntrx.in",
  email: "hello@ntrx.in",
  title: "NTRX — Intelligence You Can Wear",
  tagline: "Technology. Made Human.",
  description:
    "NTRX builds wearable intelligence: NTRX-C, AI assistive technology for smart glasses that helps blind and visually impaired people, and NTRX Pay, an NFC payment tag.",
  keywords: [
    "NTRX",
    "NTRX-C",
    "NTRX Pay",
    "wearable technology",
    "wearable intelligence",
    "AI smart glasses",
    "smart glasses for the blind",
    "AI for visually impaired",
    "assistive technology",
    "accessibility technology",
    "hands-free AI assistant",
    "NFC payment tag",
    "contactless payment wearable",
    "wearable payments",
    "tap to pay accessory",
  ],
} as const;
