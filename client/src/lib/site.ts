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

export const toolFaqs = {
  fee: [
    { q: "How do I calculate what I receive after Upwork or Fiverr fees?", a: "Subtract the platform fee percentage from the gross amount, then subtract your withdrawal fee from what is left. Enter your amount, platform and withdrawal method above and the calculator does both steps for you." },
    { q: "What is the difference between a platform fee and a withdrawal fee?", a: "The platform fee is taken by the marketplace when you get paid for a contract. The withdrawal fee is charged by the service that moves the money to your bank, such as Wise or Payoneer. They are separate costs, so both reduce your final payout." },
    { q: "Why does my real payout differ from the calculator?", a: "Platform rates can change by contract history, category and location, and currency conversion adds its own margin. The calculator gives a planning estimate, so confirm the current rate on the platform's official help page." },
    { q: "Should I add fees on top of my quote?", a: "Yes, if you want to keep a target amount. Use the pricing calculator to work backwards from the payout you need to the price you should quote." },
    { q: "Does this calculator include income tax?", a: "No. It only covers platform and withdrawal fees. Tax depends on where you live, so check your local filing rules separately." },
  ],
  pricing: [
    { q: "What is the formula for pricing a freelance project?", a: "Total cost divided by one minus your fee, tax and profit percentages. Total cost is hours times hourly rate, plus expenses." },
    { q: "Why divide instead of adding a percentage?", a: "Fees are taken from the final price, not from your cost. If your cost is $1,000 and the fee is 10%, adding 10% gives $1,100 and you keep $990. Dividing by 0.9 gives $1,111 and you keep $1,000." },
    { q: "What should I include in expenses?", a: "Anything the project genuinely uses: software subscriptions, a share of internet and electricity, stock assets, and payment costs. Leave out costs you would pay anyway if the project did not exist." },
    { q: "What is the effective hourly rate?", a: "It is your net profit divided by the hours the project takes. If it is lower than you expected, reduce the scope, raise the quote or cut an avoidable expense." },
    { q: "What if my percentages add up to 100% or more?", a: "The quote becomes impossible because the fee, tax and profit would take the whole price. Lower one of the percentages until the total is clearly under 100%." },
  ],
  invoice: [
    { q: "What should a freelance invoice include?", a: "Your name or studio, the client's name, an invoice number, the issue date, payment terms, a line for each piece of work, the currency and how to pay you. Add tax details if they apply where you work." },
    { q: "How do I save the invoice as a PDF?", a: "Press the print button and choose Save as PDF as the destination in your browser's print window. Only the invoice is printed, not the rest of the page." },
    { q: "Which currency should I invoice an international client in?", a: "Use the currency you agreed in the contract. Many freelancers invoice in USD to avoid conversion disputes, then convert on withdrawal. Check what your payment route supports." },
    { q: "Does FreelanceKit save my invoice?", a: "No. The invoice is built in your browser and nothing is stored on our side, so keep your own copy of the PDF." },
    { q: "Do I have to charge tax on an invoice?", a: "It depends on your country and your client's. This generator lets you add a tax percentage but does not decide your obligations, so check your local rules." },
  ],
  proposal: [
    { q: "How long should a freelance proposal be?", a: "Short enough to read in about a minute. Show you understood the brief, name one relevant proof point and offer a clear next step." },
    { q: "Is this an AI proposal writer?", a: "No. It is a template tool that arranges your job description, skills and details into a proven structure in your browser. It does not call an AI service, so you should edit the draft before sending." },
    { q: "What should I change before sending the draft?", a: "Replace the placeholder name, add one specific example of past work and delete any sentence you would not say out loud." },
    { q: "Can I reuse the same proposal for many jobs?", a: "Reuse the structure, not the text. Clients notice generic proposals, so rewrite the opening line to reflect their specific brief." },
    { q: "Does the tool save the job description I paste?", a: "No. Everything stays in your browser and is not stored." },
  ],
  reply: [
    { q: "How do I reply to a client with a very low budget?", a: "Thank them, state what the current budget can realistically cover, and offer a smaller scope or a separate quote for the full work. Keep the tone calm and specific." },
    { q: "How do I handle scope creep politely?", a: "Name what was agreed, explain that the new request is extra, and offer a quote or timeline change for it. Do it early, before extra work is done." },
    { q: "Is it okay to decline a project?", a: "Yes. A short, polite decline that thanks the client and, if possible, suggests another option protects your reputation." },
    { q: "How quickly should I reply to a client?", a: "A reply within one working day is a good habit. A clear, short message sent on time works better than a long one sent late." },
    { q: "Does the tool store the client message I paste?", a: "No. The draft is created in your browser and nothing is saved." },
  ],
};

export function todayLabel() {
  return FEES_REVIEWED;
}

export const relatedGuides = [
  "How to price your freelance work when every project is different",
  "A simple invoice checklist for independent workers",
  "Why your net payout matters more than your headline rate",
];
