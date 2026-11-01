import { SITE_URL } from "@/components/Seo";

export const softwareSchema = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  url: `${SITE_URL}${path}`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleSchema = (title: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url: `${SITE_URL}${path}`,
  author: { "@type": "Organization", name: "FreelanceKit" },
});
