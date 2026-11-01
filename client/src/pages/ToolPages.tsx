import { useMemo, useState } from "react";
import { ArrowRight, Check, Copy, Download, FileDown, Plus, Printer, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { FAQList, SectionHeading, SiteShell, ToolCard } from "@/components/SiteShell";
import { FEES_REVIEWED, currencies, faqs, feePlatforms, money, relatedGuides, tools, withdrawalRates } from "@/lib/site";
import Seo from "@/components/Seo";
import { faqSchema, softwareSchema } from "@/lib/schema";

type ToolLayoutProps = { title: string; intro: string; kicker: string; path: string; children: React.ReactNode; guideTitle: string; guide: React.ReactNode; example: React.ReactNode; faq?: { q: string; a: string }[] };

function ToolLayout({ title, intro, kicker, path, children, guideTitle, guide, example, faq = faqs.slice(0, 5) }: ToolLayoutProps) {
  return <SiteShell eyebrow={kicker}><Seo
      title={title}
      description={intro}
      path={path}
      jsonLd={[softwareSchema(title, intro, path), faqSchema(faq)]}
    /><main className="tool-page container"><div className="tool-hero"><div><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{intro}</p><div className="tool-meta"><span><Check size={14} /> Free to use</span><span><Check size={14} /> No signup</span><span>{FEES_REVIEWED}</span></div></div><div className="tool-hero-aside"><span className="aside-stamp">FK / TOOL</span><span>Clear numbers.<br /><em>Better decisions.</em></span></div></div>{children}<div className="tool-content-grid"><article className="guide-copy"><span className="eyebrow">The useful bit</span><h2>{guideTitle}</h2>{guide}<div className="example-block"><span className="eyebrow">A quick example</span>{example}</div></article><aside className="related-panel">
          <div className="tool-card accent-saffron benefit-card side-benefit-card">
            <div className="tool-card-top">
              <span className="tool-eyebrow">Keep going</span>
              <span className="tool-icon"><Sparkles size={18} strokeWidth={1.8} /></span>
            </div>
            <div>
              <h3>More useful corners</h3>
              <p>Articles and field guides for independent work.</p>
            </div>
            <div className="side-card-links">
              {relatedGuides.map((guideItem) => (
                <Link key={guideItem} href="/blog" className="related-link">
                  <span>{guideItem}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          <div className="tool-card accent-juniper benefit-card side-benefit-card">
            <div className="tool-card-top">
              <span className="tool-eyebrow">Related tools</span>
              <span className="tool-icon"><ArrowRight size={18} strokeWidth={1.8} /></span>
            </div>
            <div>
              <h3>Handy calculators</h3>
              <p>Jump to other tools built for your flow.</p>
            </div>
            <div className="side-card-links">
              {tools.slice(0, 3).map((tool) => (
                <Link key={tool.slug} href={tool.href} className="related-link">
                  <span>{tool.title}</span>
                  <span>↗</span>
                </Link>
              ))}
            </div>
          </div>
        </aside></div><section className="tool-faq"><SectionHeading kicker="Questions, answered" title="A little more context." /><FAQList items={faq} /></section></main></SiteShell>;
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return <label className="field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function ToolBox({ children, result }: { children: React.ReactNode; result: React.ReactNode }) {
  return <section className="tool-box"><div className="tool-form">{children}</div><div className="tool-result">{result}</div></section>;
}

export function FeeCalculator() {
  const [amount, setAmount] = useState("1250");
  const [platform, setPlatform] = useState<keyof typeof feePlatforms>("Upwork");
  const [withdrawal, setWithdrawal] = useState("Wise");
  const [currency, setCurrency] = useState("USD");
  const result = useMemo(() => { const gross = Number(amount) || 0; const platformFee = gross * feePlatforms[platform]; const withdrawalFee = (gross - platformFee) * withdrawalRates[withdrawal]; return { gross, platformFee, withdrawalFee, net: gross - platformFee - withdrawalFee }; }, [amount, platform, withdrawal]);
  return <ToolLayout kicker="Tool 01 / Fee calculator" path="/fee-calculator" title="Freelance fee calculator" intro="Know your net payout before you accept the job. Compare platform fees and withdrawal costs across the routes freelancers actually use." guideTitle="Your headline rate is not your take-home rate." guide={<><p>It is easy to look at a $1,000 project and feel like you have a $1,000 project. The useful number is what reaches the account you use for groceries, rent or your next software subscription.</p><p>This calculator separates two costs that often get mashed together: the platform fee and the withdrawal fee. Platform rates can change by marketplace, contract history, category and location, so use the number here as a planning estimate and verify the official help page before you send a final quote.</p><h3>How to use this result</h3><p>Start with the amount you plan to quote. Choose the platform, then choose how you normally withdraw. If a client is direct, select Direct to see the difference a platform fee makes. Use the net payout to check whether the work still makes sense after your real costs.</p></>} example={<><h3>$1,250 on Upwork via Wise</h3><p>At the sample 10% platform rate and 1% withdrawal estimate, you would plan around <strong>{money(1113.75, "USD")}</strong> after fees. That is the number to compare with your hours and expenses.</p></>}><ToolBox result={<><span className="result-label">Your estimated payout</span><strong className="result-number">{money(result.net, currency)}</strong><span className="result-note">from {money(result.gross, currency)} gross</span><div className="result-lines"><div><span>Platform fee <b>{Math.round(feePlatforms[platform] * 100)}%</b></span><strong>− {money(result.platformFee, currency)}</strong></div><div><span>Withdrawal <b>{Math.round(withdrawalRates[withdrawal] * 100)}%</b></span><strong>− {money(result.withdrawalFee, currency)}</strong></div></div><div className="result-tip">✦ Keep a screenshot with the quote so your assumptions stay clear.</div></>}><Field label="Amount you will quote"><div className="input-prefix"><span>{currencies.find((item) => item.code === currency)?.symbol}</span><input type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} /></div></Field><Field label="Currency"><select value={currency} onChange={(event) => setCurrency(event.target.value)}>{currencies.map((item) => <option key={item.code} value={item.code}>{item.code} — {item.label}</option>)}</select></Field><Field label="Platform"><select value={platform} onChange={(event) => setPlatform(event.target.value as keyof typeof feePlatforms)}>{Object.keys(feePlatforms).map((item) => <option key={item} value={item}>{item}</option>)}</select></Field><Field label="Withdrawal method"><select value={withdrawal} onChange={(event) => setWithdrawal(event.target.value)}>{Object.keys(withdrawalRates).map((item) => <option key={item} value={item}>{item}</option>)}</select></Field><p className="form-note">Illustrative rates only. Platform policies and currency conversions change; check the official rate before invoicing.</p></ToolBox></ToolLayout>;
}

export function PricingCalculator() {
  const [hours, setHours] = useState("24"); const [rate, setRate] = useState("35"); const [expenses, setExpenses] = useState("120"); const [fee, setFee] = useState("10"); const [tax, setTax] = useState("5"); const [profit, setProfit] = useState("15"); const [currency, setCurrency] = useState("USD");
  const result = useMemo(() => {
    const h = Math.max(0, Number(hours) || 0);
    const hourly = Math.max(0, Number(rate) || 0);
    const extras = Math.max(0, Number(expenses) || 0);
    const feeRate = Math.max(0, Number(fee) || 0);
    const taxRate = Math.max(0, Number(tax) || 0);
    const profitRate = Math.max(0, Number(profit) || 0);
    const totalCost = h * hourly + extras;
    const combinedRate = feeRate + taxRate + profitRate;
    const divisor = 1 - combinedRate / 100;
    const invalid = divisor <= 0;
    const price = invalid ? 0 : totalCost / divisor;
    const platformFee = price * feeRate / 100;
    const taxAmount = price * taxRate / 100;
    const netProfit = price - platformFee - taxAmount - totalCost;
    return { totalCost, price, netProfit, effective: h ? netProfit / h : 0, invalid, combinedRate };
  }, [hours, rate, expenses, fee, tax, profit]);
  return <ToolLayout kicker="Tool 02 / Pricing calculator" path="/pricing-calculator" title="Freelance pricing calculator" intro="Work out a project price that covers your time, your overhead and the fees that come out before your money lands." guideTitle="Price from the work underneath the work." guide={<><p>A sustainable project price starts with more than your hourly rate. It includes the invisible work around delivery: internet, power, software, admin, revisions and the time you spend keeping a project moving.</p><p>FreelanceKit starts with base cost — hours multiplied by your hourly rate — then adds your expenses. The requested price is grossed up for platform fee, tax and target profit so those deductions do not quietly eat the margin you thought you had.</p><h3>Use the effective hourly rate as a gut check</h3><p>If the final effective rate feels low, you have three honest levers: reduce scope, increase the quote or remove an expense you can truly avoid. Do not make the first lever “work faster” when the brief itself is the problem.</p></>} example={<><h3>24 hours at $35 + $120 expenses</h3><p>With 10% platform fee, 5% tax and a 15% target margin, the suggested project price lands around <strong>{money(result.price, currency)}</strong>. Your effective profit rate is about <strong>{money(result.effective, currency)}/hr</strong>.</p></>}><ToolBox result={result.invalid ? <div className="invalid-result"><span className="result-label">Check your assumptions</span><strong>Percentages are too high.</strong><p>Your platform fee, tax and target profit currently add up to {result.combinedRate}%. Keep the combined rate below 100% to create a meaningful quote.</p></div> : <><span className="result-label">Suggested project price</span><strong className="result-number">{money(result.price, currency)}</strong><span className="result-note">before you send the quote</span><div className="result-lines"><div><span>Net profit</span><strong>{money(result.netProfit, currency)}</strong></div><div><span>Effective hourly rate</span><strong>{money(result.effective, currency)}/hr</strong></div><div><span>Total cost base</span><strong>{money(result.totalCost, currency)}</strong></div></div><div className="result-tip">✦ Formula: total cost ÷ (1 − fee − tax − profit).</div></>}><div className="field-row"><Field label="Project hours"><input type="number" min="0" value={hours} onChange={(event) => setHours(event.target.value)} /></Field><Field label="Hourly rate"><input type="number" min="0" value={rate} onChange={(event) => setRate(event.target.value)} /></Field></div><div className="field-row"><Field label="Expenses"><input type="number" min="0" value={expenses} onChange={(event) => setExpenses(event.target.value)} /></Field><Field label="Currency"><select value={currency} onChange={(event) => setCurrency(event.target.value)}>{currencies.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}</select></Field></div><div className="field-row three"><Field label="Platform fee %"><input type="number" min="0" max="90" value={fee} onChange={(event) => setFee(event.target.value)} /></Field><Field label="Tax %"><input type="number" min="0" max="90" value={tax} onChange={(event) => setTax(event.target.value)} /></Field><Field label="Target profit %"><input type="number" min="0" max="90" value={profit} onChange={(event) => setProfit(event.target.value)} /></Field></div><p className="form-note">This is a planning tool, not tax advice. Check your own filing rules and any platform-specific deductions.</p></ToolBox></ToolLayout>;
}

type LineItem = { id: string; description: string; quantity: string; rate: string };
export function InvoiceGenerator() {
  const [from, setFrom] = useState("Your Studio"); const [client, setClient] = useState("Client name"); const [email, setEmail] = useState("client@company.com"); const [currency, setCurrency] = useState("USD"); const [tax, setTax] = useState("0"); const [invoiceNumber, setInvoiceNumber] = useState("FK-2026-001"); const [issueDate, setIssueDate] = useState("1 November 2026"); const [due, setDue] = useState("Due within 14 days"); const [method, setMethod] = useState("Wise / Payoneer"); const [notes, setNotes] = useState("Thank you for the opportunity to work together."); const [items, setItems] = useState<LineItem[]>([{ id: "line-1", description: "Brand strategy sprint", quantity: "1", rate: "750" }]);
  const subtotal = items.reduce((total, item) => total + (Number(item.quantity) || 0) * (Number(item.rate) || 0), 0); const total = subtotal * (1 + (Number(tax) || 0) / 100);
  const updateItem = (index: number, key: keyof LineItem, value: string) => setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  return <ToolLayout kicker="Tool 03 / Invoice generator" path="/invoice-generator" title="Free invoice generator for freelancers" intro="Create a clear, multi-currency invoice with line items, payment terms and the details a client needs to pay you without another question." guideTitle="A good invoice is a tiny project handoff." guide={<><p>An invoice is more than a request for money. It is the final, useful summary of what was delivered, who owns the next action and how a client can close the loop.</p><p>Keep the language plain. Use one invoice number, a clear issue date, a due term and a line for every meaningful piece of work. If you use Wise, Payoneer, a local bank or a service such as JazzCash or Easypaisa, add the payment route that creates the least friction for your client.</p><h3>Before you press print</h3><p>Check the currency, spelling of the client name, quantities and the due date. If tax applies in your jurisdiction, confirm whether it belongs on the invoice and whether the client needs your registration details. This generator creates a browser-only document; it does not decide your legal or tax obligations.</p></>} example={<><h3>One clear line can be enough</h3><p>“Brand strategy sprint · 1 × $750” tells a better story than a single unexplained total. Add a short scope note in the notes field if the invoice closes a larger project.</p></>}><ToolBox result={<div className="invoice-preview"><div className="invoice-preview-top"><div><span className="invoice-label">INVOICE</span><h3>{from || "Your Studio"}</h3></div><span className="invoice-number"># {invoiceNumber || "FK-2026-001"}</span></div><div className="invoice-meta"><div><span>Bill to</span><strong>{client || "Client name"}</strong><small>{email}</small></div><div><span>Issue date</span><strong>{issueDate || "Today"}</strong><small>{method}</small></div><div><span>Payment terms</span><strong>{due}</strong></div></div><div className="invoice-lines">{items.map((item) => <div key={item.id} className="invoice-line"><span>{item.description || "Line item"}</span><span>{item.quantity} × {money(Number(item.rate) || 0, currency)}</span><strong>{money((Number(item.quantity) || 0) * (Number(item.rate) || 0), currency)}</strong></div>)}</div><div className="invoice-total"><span>Subtotal <b>{money(subtotal, currency)}</b></span><span>Tax <b>{tax}%</b></span><strong>{money(total, currency)}</strong></div><p className="invoice-note">{notes}</p><button className="button button-primary full-width" onClick={() => window.print()}><Printer size={16} /> Print / save as PDF</button></div>}><div className="invoice-form-head"><span className="eyebrow">Invoice details</span><span className="tiny-note">Browser-only · nothing is saved</span></div><div className="field-row"><Field label="Your name / studio"><input value={from} onChange={(event) => setFrom(event.target.value)} /></Field><Field label="Client name"><input value={client} onChange={(event) => setClient(event.target.value)} /></Field></div><div className="field-row"><Field label="Invoice number"><input value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} /></Field><Field label="Issue date"><input value={issueDate} onChange={(event) => setIssueDate(event.target.value)} /></Field></div><div className="field-row"><Field label="Client email"><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></Field><Field label="Currency"><select value={currency} onChange={(event) => setCurrency(event.target.value)}>{currencies.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}</select></Field></div><div className="field-row three"><Field label="Tax %"><input type="number" min="0" value={tax} onChange={(event) => setTax(event.target.value)} /></Field><Field label="Payment terms"><select value={due} onChange={(event) => setDue(event.target.value)}><option>Due on receipt</option><option>Due within 7 days</option><option>Due within 14 days</option><option>Due within 30 days</option></select></Field><Field label="Payment method"><input value={method} onChange={(event) => setMethod(event.target.value)} /></Field></div><div className="items-editor"><div className="items-heading"><span>Line items</span><button type="button" className="small-action" onClick={() => setItems((current) => [...current, { id: `line-${Date.now()}`, description: "", quantity: "1", rate: "0" }])}><Plus size={14} /> Add line</button></div>{items.map((item, index) => <div className="item-row" key={item.id}><input aria-label="Description" placeholder="Description" value={item.description} onChange={(event) => updateItem(index, "description", event.target.value)} /><input aria-label="Quantity" type="number" min="0" placeholder="Qty" value={item.quantity} onChange={(event) => updateItem(index, "quantity", event.target.value)} /><input aria-label="Rate" type="number" min="0" placeholder="Rate" value={item.rate} onChange={(event) => updateItem(index, "rate", event.target.value)} /><button type="button" className="icon-action" aria-label="Remove line" onClick={() => setItems((current) => current.length > 1 ? current.filter((_, itemIndex) => itemIndex !== index) : current)}><Trash2 size={15} /></button></div>)}</div><Field label="Notes"><textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} /></Field></ToolBox></ToolLayout>;
}

const replyTypes = [
  { value: "Low budget", label: "The budget is too low" },
  { value: "Scope grew", label: "The scope grew" },
  { value: "Follow-up", label: "Follow-up after silence" },
  { value: "Decline", label: "Politely decline" },
] as const;

type ReplyType = (typeof replyTypes)[number]["value"];
function CopyTool({ type }: { type: "proposal" | "reply" }) {
  const [job, setJob] = useState(type === "proposal" ? "We need a thoughtful landing page for a small ethical fashion brand." : "Hi, can you do this project for $50? It should be quick.");
  const [skills, setSkills] = useState(type === "proposal" ? "UX writing, landing pages, clear content systems" : "Professional, calm communication");
  const [goal, setGoal] = useState(type === "proposal" ? "Win the project with a focused, warm proposal" : "Negotiate the scope without sounding defensive");
  const [tone, setTone] = useState("Warm and direct");
  const [clientName, setClientName] = useState("");
  const [proof, setProof] = useState("");
  const [timeline, setTimeline] = useState("5 working days for the first draft");
  const [replyType, setReplyType] = useState<ReplyType>("Low budget");
  const [copied, setCopied] = useState(false);
  const output = useMemo(() => {
    if (type === "proposal") {
      const firstSentence = job.trim().split(/(?<=[.!?])\s/)[0] || "your project";
      return `Hi ${clientName.trim() || "there"},\n\nI read your brief: "${firstSentence}"\n\nI can help with ${skills.trim() || "this kind of work"}.${proof.trim() ? `\n\nRelevant experience: ${proof.trim()}` : ""}\n\nHow I would approach it:\n1. Confirm the goal, audience and what a good result looks like.\n2. Deliver a focused first version (${timeline.trim()}).\n3. Make clear revisions and hand over everything you need.\n\nIf the scope fits, I would be happy to share a short plan and a relevant example before we start.\n\nBest,\nYour name`;
    }
    if (replyType === "Scope grew") {
      return `Hi ${clientName.trim() || "there"},\n\nThanks for sending this over. I read your note: “${job.trim().slice(0, 120)}”. Happy to help with it — it sounds like the scope has grown beyond what we first agreed.\n\nI can cover the original scope as planned, and I would treat ${goal.toLowerCase()} as a separate piece of work with its own timeline and quote. That keeps both parts clear and well looked after.\n\nWould you like me to send a short estimate for the additional scope?\n\nBest,\nYour name`;
    }
    if (replyType === "Follow-up") {
      return `Hi ${clientName.trim() || "there"},\n\nJust bringing this back to the top of your inbox in case it got buried. Your message — “${job.trim().slice(0, 120)}” — is still on my list, and I would be glad to move on ${goal.toLowerCase()} whenever you are ready.\n\nIf the timing has changed or priorities have moved, no worries at all: a quick note either way helps me plan my week.\n\nBest,\nYour name`;
    }
    if (replyType === "Decline") {
      return `Hi ${clientName.trim() || "there"},\n\nThanks for thinking of me for this. After reading the brief — “${job.trim().slice(0, 120)}” — I do not think I am the right fit for ${goal.toLowerCase()}, and I would rather tell you that plainly than take on work I cannot do well.\n\nIf it is useful, I am happy to point you toward someone better suited, or help with a narrower piece where I can genuinely add value.\n\nBest wishes for the project,\nYour name`;
    }
    return `Hi ${clientName.trim() || "there"},\n\nThanks for sending this over. I read your note: “${job.trim().slice(0, 120)}”. I can help, but the current budget would need to match a smaller scope. I could deliver ${goal.toLowerCase()} as a focused first pass. If you need the full version, I can quote that separately once we confirm the deliverables and timeline.\n\nWould you like to keep the smaller scope, or should I send a fuller estimate?\n\nBest,\nYour name`;
  }, [type, job, skills, goal, clientName, proof, timeline, replyType]);
  const copy = async () => { const area = document.createElement("textarea"); area.value = output; area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select(); const success = await (navigator.clipboard ? navigator.clipboard.writeText(output).then(() => true).catch(() => false) : Promise.resolve(document.execCommand("copy"))); area.remove(); if (success) { setCopied(true); setTimeout(() => setCopied(false), 1800); } };
  const title = type === "proposal"
    ? "Free proposal template generator for freelancers"
    : "Client reply template generator";
  const intro = type === "proposal"
    ? "Fill in the job and your skills to get an editable proposal draft built on a proven structure. Free, no signup, nothing saved."
    : "Get an editable, professional reply to hard client messages like low budgets and scope creep. Free, no signup, nothing saved.";
  const guideTitle = type === "proposal" ? "The best proposal sounds like someone who read the brief." : "Boundaries read better when they are specific.";
  const guide = <><p>{type === "proposal" ? "A strong proposal does not repeat every line of a job post. It shows that you noticed the real problem, names the relevant experience you bring and offers a clear first step." : "Negotiation does not need a defensive paragraph. Name what the current scope includes, explain what would change at the current budget and make the next choice easy."}</p><p>This local tool creates a useful draft from the details you provide. It does not call an external AI API and it does not save your client’s message. Edit the draft until it sounds like you, then send it with the confidence that comes from a clear scope.</p><h3>One edit before you send</h3><p>Replace the generic “Your name” line, add one specific proof point and remove any sentence you would not say out loud. Clarity is more persuasive than polish.</p></>;
  const example = <><h3>Make the next step small</h3><p>Instead of “Let me know what you think,” try “If this direction fits, I can send a two-step plan and a first draft date.” A smaller next step creates momentum.</p></>;
  const fieldLabel = type === "proposal" ? "Job description" : "Client message";
  return (
    <ToolLayout kicker={type === "proposal" ? "Tool 04 / Proposal studio" : "Tool 05 / Reply studio"} path={type === "proposal" ? "/proposal-generator" : "/client-reply-generator"} title={title} intro={intro} guideTitle={guideTitle} guide={guide} example={example}>
      <ToolBox result={<div className="copy-result"><div className="result-label"><Sparkles size={15} /> Your editable draft <span className="local-badge">Local only</span></div><pre>{output}</pre><div className="copy-actions"><button className="button button-primary" onClick={copy}>{copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy draft</>}</button><button className="button button-ghost" onClick={() => setJob("")}><RefreshCw size={15} /> Start over</button></div></div>}>
        <Field label={fieldLabel}><textarea rows={5} value={job} onChange={(event) => setJob(event.target.value)} /></Field>
        <Field label={type === "proposal" ? "Your useful skills" : "What do you want to achieve"}><textarea rows={3} value={type === "proposal" ? skills : goal} onChange={(event) => { if (type === "proposal") setSkills(event.target.value); else setGoal(event.target.value); }} /></Field>
        {type === "proposal" && <>
          <Field label="Client name (optional)"><input value={clientName} onChange={(e) => setClientName(e.target.value)} /></Field>
          <Field label="One proof point (optional)" hint="Example: Built 12 landing pages for ecommerce brands">
            <input value={proof} onChange={(e) => setProof(e.target.value)} />
          </Field>
          <Field label="Timeline"><input value={timeline} onChange={(e) => setTimeline(e.target.value)} /></Field>
        </>}
        {type === "reply" && <Field label="What kind of message is this?">
          <select value={replyType} onChange={(event) => setReplyType(event.target.value as ReplyType)}>
            {replyTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </Field>}
        {type === "proposal" && <Field label="Tone"><select value={tone} onChange={(event) => setTone(event.target.value)}><option>Warm and direct</option><option>Confident and concise</option><option>Friendly and collaborative</option></select></Field>}
        <p className="form-note"><Sparkles size={14} /> A transparent, local-first draft. No API key, no hidden generation, no saved messages.</p>
      </ToolBox>
    </ToolLayout>
  );
}

export function ProposalGenerator() { return <CopyTool type="proposal" />; }
export function ReplyGenerator() { return <CopyTool type="reply" />; }
