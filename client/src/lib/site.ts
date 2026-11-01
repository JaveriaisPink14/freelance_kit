import {
  BriefcaseBusiness,
  Calculator,
  FileText,
  MessageCircleMore,
  PenLine,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: string;
};

export const tools: Tool[] = [
  {
    slug: "fee-calculator",
    title: "Fee calculator",
    eyebrow: "Know your cut",
    description: "See what survives platform and withdrawal fees before you accept the brief.",
    href: "/fee-calculator",
    icon: Calculator,
    accent: "saffron",
  },
  {
    slug: "pricing-calculator",
    title: "Pricing calculator",
    eyebrow: "Name your number",
    description: "Turn hours, expenses and a healthy margin into a confident project price.",
    href: "/pricing-calculator",
    icon: BriefcaseBusiness,
    accent: "juniper",
  },
  {
    slug: "invoice-generator",
    title: "Invoice generator",
    eyebrow: "Get paid cleanly",
    description: "Build a clear, multi-currency invoice with payment instructions in minutes.",
    href: "/invoice-generator",
    icon: FileText,
    accent: "terracotta",
  },
  {
    slug: "proposal-generator",
    title: "Proposal studio",
    eyebrow: "Pitch with clarity",
    description: "Shape a tailored proposal from a job post, your proof and your point of view.",
    href: "/proposal-generator",
    icon: PenLine,
    accent: "plum",
  },
  {
    slug: "client-reply-generator",
    title: "Client reply studio",
    eyebrow: "Reply like a pro",
    description: "Draft warm, direct responses for follow-ups, negotiation and next steps.",
    href: "/client-reply-generator",
    icon: MessageCircleMore,
    accent: "clay",
  },
];

export const currencies = [
  { code: "USD", symbol: "$", label: "US dollar" },
  { code: "PKR", symbol: "₨", label: "Pakistani rupee" },
  { code: "INR", symbol: "₹", label: "Indian rupee" },
  { code: "NGN", symbol: "₦", label: "Nigerian naira" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi taka" },
  { code: "PHP", symbol: "₱", label: "Philippine peso" },
  { code: "KES", symbol: "KSh", label: "Kenyan shilling" },
];

export const feePlatforms = {
  Upwork: 0.1,
  Fiverr: 0.2,
  "Freelancer.com": 0.1,
  Direct: 0,
};

export const withdrawalRates: Record<string, number> = {
  Payoneer: 0.02,
  Wise: 0.01,
  "Local bank": 0.015,
  "JazzCash / Easypaisa": 0.025,
};

export const popularTemplates = [
  { title: "Proposal for logo design", tag: "Pitch", href: "/templates#logo-proposal", note: "A focused way to show taste, process and proof." },
  { title: "Reply to a low-budget client", tag: "Boundaries", href: "/templates#low-budget", note: "Stay warm without quietly discounting your craft." },
  { title: "Follow-up after no response", tag: "Follow-up", href: "/templates#follow-up", note: "A short nudge that makes the next step easy." },
  { title: "Invoice payment reminder", tag: "Get paid", href: "/templates#payment-reminder", note: "Clear language for a clean payment trail." },
];

export const blogPosts = [
  { title: "How much does Upwork really take?", category: "Money basics", read: "6 min read", excerpt: "A plain-English look at platform fees, withdrawal costs and the number that matters: your net payout." },
  { title: "How to set an hourly rate when you are starting", category: "Pricing", read: "8 min read", excerpt: "Start from your real costs, not a random number pulled from someone else’s rate card." },
  { title: "The small invoice details that make you look established", category: "Get paid", read: "5 min read", excerpt: "Due dates, scope notes and payment instructions do more work than a fancy logo." },
  { title: "How to follow up without sounding pushy", category: "Client work", read: "4 min read", excerpt: "A follow-up is not an apology. Here is how to make it useful for both sides." },
];

export const faqs = [
  { q: "Is FreelanceKit really free?", a: "Yes. The first tools are free to use and do not require an account. We keep the interface focused on the work, not on gating a calculator behind signup." },
  { q: "Are platform fees exact?", a: "Fees can vary by contract, location, withdrawal route and policy changes. FreelanceKit uses clear example rates and shows the last-updated note so you can verify the official rate before sending a quote." },
  { q: "Which currencies can I use?", a: "You can calculate in USD, PKR, INR, NGN, BDT, PHP and KES. More local currencies can be added as the toolkit grows." },
  { q: "Does FreelanceKit save my invoice or messages?", a: "No. The current tools run in your browser. Your entries are used to calculate or draft the result and are not stored by FreelanceKit." },
  { q: "Can I use the invoice for international clients?", a: "Yes. Add the currency, due terms and your preferred payment route. Always confirm tax and invoicing requirements for your own jurisdiction." },
];

export function money(value: number, currency = "USD") {
  const currencyInfo = currencies.find((item) => item.code === currency);
  const maximumFractionDigits = ["PKR", "INR", "NGN", "BDT", "PHP", "KES"].includes(currency) ? 0 : 2;
  return `${currencyInfo?.symbol ?? ""}${new Intl.NumberFormat("en-US", { maximumFractionDigits, minimumFractionDigits: maximumFractionDigits === 0 ? 0 : 2 }).format(Number.isFinite(value) ? value : 0)}`;
}

export const FEES_REVIEWED = "Fee rates last reviewed: November 2026";

export function todayLabel() {
  return FEES_REVIEWED;
}

export const relatedGuides = [
  "How to price your freelance work when every project is different",
  "A simple invoice checklist for independent workers",
  "Why your net payout matters more than your headline rate",
];
