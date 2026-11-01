import { useState } from "react";
import { ArrowRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import { Link } from "wouter";
import { FAQList, SectionHeading, SiteShell, ToolCard } from "@/components/SiteShell";
import { blogPosts, faqs, popularTemplates, tools } from "@/lib/site";
import Seo from "@/components/Seo";
import { articleSchema, faqSchema } from "@/lib/schema";

function PageIntro({ kicker, title, copy, media, mediaPosition = "right" }: { kicker?: string; title: string; copy: string; media?: React.ReactNode; mediaPosition?: "left" | "right" }) {
  return (
    <div className={`content-intro ${media ? `has-media media-${mediaPosition}` : ""}`}>
      {media && mediaPosition === "left" && <div className="content-intro-media">{media}</div>}
      <div className="content-intro-text">
        {kicker && <span className="eyebrow">{kicker}</span>}
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {media && mediaPosition === "right" && <div className="content-intro-media">{media}</div>}
    </div>
  );
}

export function TemplatesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const templateTexts = [
    "Hi [name], I enjoyed seeing the direction behind this project. I can help bring it into a focused page with a clear visual hierarchy and a voice that feels considered, not crowded. My first step would be to align on the audience, the offer and the one action the page needs to make easy.",
    "Thanks for sharing the budget. At that number, I can offer a focused first pass with [deliverable]. If you need the full scope, I can send a revised estimate once we confirm the final deliverables and timeline. Which direction would be more useful for you?",
    "Hi [name], just bringing this back to the top of your inbox in case it got buried. If the project is still active, I can hold [date] for a first step. If priorities have changed, no worries — a quick note helps me close the loop.",
    "Hi [name], a quick note that invoice [number] for [amount] is due on [date]. I have attached it again here for convenience. If payment has already been sent, thank you — otherwise, let me know if you need any other details from me."
  ];

  return (
    <SiteShell eyebrow="Resource shelf">
      <Seo
        title="Free Freelance Templates: Proposals, Follow-ups & Invoices"
        description="Copy-ready freelance templates for proposals, low-budget replies, follow-ups and invoice payment reminders. Edit them until they sound like you."
        path="/templates"
      />
      <main className="content-page container">
        <PageIntro
          title="A better first line changes the whole conversation."
          copy="Use these small, practical starting points for proposals, follow-ups, boundaries and getting paid. Edit them until they sound like you."
          mediaPosition="right"
          media={
            <div className="template-video-wrap">
              <video
                src="/template.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="template-video-player"
              />
            </div>
          }
        />
        <div className="template-library">
          {popularTemplates.map((template, index) => {
            const copyContent = templateTexts[index] || "FreelanceKit template — edit this starting point until it sounds like you.";
            const isCopied = copied === template.title;

            return (
              <article id={template.href.split("#")[1]} key={template.title} className="library-card">
                <div className="library-card-top">
                  <span>0{index + 1} / {template.tag}</span>
                  <span>FreelanceKit original</span>
                </div>
                <h2>{template.title}</h2>
                <p>{template.note}</p>
                <div className="template-copy">{copyContent}</div>
                <button
                  type="button"
                  className="button button-primary copy-template-btn"
                  onClick={async () => {
                    const area = document.createElement("textarea");
                    area.value = copyContent;
                    area.style.position = "fixed";
                    area.style.opacity = "0";
                    document.body.appendChild(area);
                    area.select();
                    const success = await (navigator.clipboard
                      ? navigator.clipboard.writeText(copyContent).then(() => true).catch(() => false)
                      : Promise.resolve(document.execCommand("copy")));
                    area.remove();
                    if (success) {
                      setCopied(template.title);
                      setTimeout(() => setCopied(null), 1600);
                    }
                  }}
                >
                  {isCopied ? (
                    <>
                      <Check size={15} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> Copy starting point
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      </main>
    </SiteShell>
  );
}

export function BlogPage() {
  return (
    <SiteShell eyebrow="Notes for the work">
      <Seo
        title="Freelance Blog & Guides"
        description="Plain-English notes on pricing, proposals, invoices and client communication for independent freelancers."
        path="/blog"
      />
      <main className="content-page container">
        <PageIntro
          kicker="Blog & guides"
          title="Plain-English notes for making freelance work work."
          copy="Helpful context for pricing, proposals, invoices and the little systems that make independent work feel less improvisational."
          media={
            <div className="blog-video-wrap">
              <video
                src="/blog.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="blog-video-player"
              />
            </div>
          }
        />
        <div className="blog-grid">
          {blogPosts.map((post, index) => {
            const isFeatured = index === 0;
            return (
              <article className={`blog-card ${isFeatured ? "featured" : ""}`} key={post.title}>
                <div className="blog-card-top">
                  <span className="blog-number">0{index + 1}</span>
                  <span>{post.category}</span>
                  <span>{post.read}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <Link
                  href={`/blog/${index}`}
                  className={`button ${isFeatured ? "button-featured-blog" : "button-primary"} blog-card-btn`}
                >
                  Read the guide <ArrowRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>
        <div className="content-callout">
          <span className="eyebrow">A useful promise</span>
          <h2>No filler. No scraped listicles. Just original notes that respect your time.</h2>
          <p>We are building the library one practical guide at a time. If there is a question you wish more freelancer tools answered plainly, send it over.</p>
          <Link href="/contact" className="button button-primary">Suggest a guide <ArrowRight size={16} /></Link>
        </div>
      </main>
    </SiteShell>
  );
}

const articleBodies = [
  { intro: "A practical primer on gross quotes, platform deductions and the number that makes your next decision easier.", sections: ["Start with the amount you quote, then split out the platform fee and withdrawal route instead of treating them as one invisible deduction.", "The point is not to memorize one permanent percentage. The point is to make assumptions visible, check the official terms and leave enough room for the work around the work."] },
  { intro: "A starting method for building a rate from your costs, capacity and the kind of work you want more of.", sections: ["Begin with the monthly number you need to cover, then account for the hours that are actually billable. Your calendar is not 160 billable hours a month.", "Add room for admin, software, revisions and the risk of a quiet month. A rate is not a verdict on your talent; it is a small operating system for your business."] },
  { intro: "The details that make an invoice easy to approve, easy to file and much harder to misunderstand.", sections: ["A useful invoice names the people involved, the work delivered, the currency, the due date and the route for payment. Everything else should support those decisions.", "Keep line items specific enough that a client can recognize the work without decoding your process. Clear is professional; ornate is optional."] },
  { intro: "A respectful follow-up gives the project a next step instead of asking the other person to perform the whole decision in their head.", sections: ["Bring the relevant context back into the message, suggest a date or choice, and make it easy to say that priorities have changed.", "Following up is not being pushy when the note is useful. It is a small act of project hygiene."] },
];
export function BlogArticlePage() {
  const path = window.location.pathname;
  const index = Math.max(0, Math.min(blogPosts.length - 1, Number(path.split("/").pop()) || 0));
  const post = blogPosts[index];
  const article = articleBodies[index];
  const seoPath = `/blog/${index}`;
  return <SiteShell eyebrow={`Guide 0${index + 1}`}><Seo
    title={post.title}
    description={post.excerpt}
    path={seoPath}
    jsonLd={articleSchema(post.title, post.excerpt, seoPath)}
  /><main className="content-page container"><PageIntro kicker={post.category} title={post.title} copy={article.intro} /><article className="article-copy"><span className="eyebrow">{post.read} · FreelanceKit original</span>{article.sections.map((section) => <p key={section}>{section}</p>)}<h2>A good rule of thumb</h2><p>Make the next action visible. Check the assumptions. Keep the words human. Tools can make the first draft faster, but your judgment is still the part that makes it yours.</p><Link href="/templates" className="button button-primary">Browse templates <ArrowRight size={16} /></Link></article></main></SiteShell>;
}

export function AboutPage() {
  return (
    <SiteShell eyebrow="The reason this exists">
      <Seo
        title="About FreelanceKit"
        description="FreelanceKit is a small, independent toolkit of free browser-based tools for freelancers: pricing, fees, invoices and client communication."
        path="/about"
      />
      <main className="content-page container">
        <PageIntro
          kicker="About FreelanceKit"
          title="The internet has enough tools that ask you to become a project manager."
          copy="FreelanceKit is a small, independent toolkit for the moments around the work: setting a fair price, writing a clear proposal, replying to a client and sending an invoice that gets understood."
          mediaPosition="right"
          media={
            <div className="about-video-wrap">
              <video
                src="/about.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="about-video-player"
              />
            </div>
          }
        />
        <div className="about-layout">
          <div className="about-statement">
            <span className="stamp-large">FK</span>
            <h2>For the freelancers who work across borders, currencies and too many browser tabs.</h2>
          </div>
          <div className="about-copy">
            <p>Freelancers in the Global South often have to stitch together payment tools, platform rules and local realities that were never considered by generic calculators. FreelanceKit starts there.</p>
            <p>That means local-friendly currencies, familiar payment methods and language that stays simple. It also means being honest: fee estimates change, tax rules are local, and no tool can replace checking the official terms for your situation.</p>
            <p>We are keeping the first release browser-based and no-signup on purpose. Your client message and quote belong to you.</p>
            <div className="about-values">
              <div><span>01</span><strong>Useful before clever</strong></div>
              <div><span>02</span><strong>Clear about assumptions</strong></div>
              <div><span>03</span><strong>Made to be edited</strong></div>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!/^[^\s]+(\s+[^\s]+)+$/.test(name)) { setError("Please enter your full name (first and last name)."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setError("Please enter a valid email address, e.g. you@studio.com."); return; }
    if (message.length < 10) { setError("Please write a message of at least 10 characters."); return; }
    setError(null);
    try {
      await fetch("https://formsubmit.co/ajax/jaweriashabbir517@gmail.com", { method: "POST", body: data });
      form.reset();
      setSent(true);
    } catch { setError("Message could not be sent. Please try again."); }
  };
  return <SiteShell eyebrow="Say hello"><Seo
    title="Contact FreelanceKit"
    description="Found a rough edge, have a template request or want to suggest a local payment method? Send us a note."
    path="/contact"
  /><main className="content-page container"><div className="contact-layout"><div><PageIntro kicker="Contact" title="Tell us what would make the work easier." copy="Found a rough edge, have a template request or want to suggest a local payment method? Write a note below. Your message goes straight to our inbox and we will get back to you." /><div className="contact-details"><div><Mail size={18} /><a href="mailto:jaweriashabbir517@gmail.com">jaweriashabbir517@gmail.com</a></div><div><MapPin size={18} /><span>Built for independent work, wherever you are.</span></div></div></div><form className="contact-form" noValidate onSubmit={handleSubmit}><input type="hidden" name="_subject" value="New message from FreelanceKit contact form" /><input type="hidden" name="_captcha" value="false" /><div className="field-row"><label className="field"><span>Your name</span><input name="name" placeholder="Full Name" required /></label><label className="field"><span>Email</span><input type="email" name="email" placeholder="you@studio.com" required /></label></div><label className="field"><span>What is on your mind?</span><textarea name="message" rows={7} placeholder="I would love a calculator for…" required minLength={10} /></label>{error && <small className="form-error" role="alert">{error}</small>}<button className="button button-primary" type="submit">{sent ? "Thanks — noted" : "Send message"} {!sent && <Send size={16} />}</button><small>{sent ? "Thanks! Your message is on its way — we will reply soon." : "Your message will be sent "}</small></form></div></main></SiteShell>;
}

const policyCopy: Record<string, { kicker: string; title: string; copy: string; sections: { title: string; body: string }[] }> = {
  "/privacy-policy": { kicker: "Good housekeeping", title: "Privacy policy", copy: "A plain-language outline of what the current browser-only site does with your information.", sections: [{ title: "What we collect", body: "The calculators, invoice generator and copy tools work in your browser. FreelanceKit does not currently store the values you enter into those tools. If you choose to contact us or subscribe to a future free pack, we will receive the details you intentionally submit through that form." }, { title: "How we use information", body: "We use messages to respond to your request and to understand which tools or guides would be useful. We do not sell personal information. Before adding analytics, email marketing or advertising, this policy should be updated with the relevant providers and choices." }, { title: "Your choices", body: "You can use the tools without an account. You can choose not to submit a form. For privacy questions, contact jaweriashabbir517@gmail.com." }] },
  "/terms": { kicker: "Good housekeeping", title: "Terms of use", copy: "The simple version of how to use FreelanceKit responsibly.", sections: [{ title: "Use the tools as estimates", body: "FreelanceKit provides general planning tools, not legal, tax, financial or platform-policy advice. Check official sources and your own records before relying on a result." }, { title: "Be thoughtful with client information", body: "Do not paste sensitive personal, financial or confidential information into a browser tool unless you are comfortable doing so. The current tools are designed to work without storing your entries." }, { title: "Changes", body: "We may improve, update or retire features as the product grows. Tool assumptions and examples may change when platform policies change." }] },
  "/disclaimer": { kicker: "Good housekeeping", title: "Disclaimer", copy: "A clear note about estimates, platform rates and the limits of a free tool.", sections: [{ title: "No guarantee", body: "Calculator outputs are estimates based on the inputs and sample rates shown. Platform fees, withdrawal charges, exchange rates, taxes and local rules can change. FreelanceKit does not guarantee a payout, approval, ranking or income result." }, { title: "Do your own check", body: "Before sending a quote, invoice or client message, review the result against the official platform terms and your own professional or tax advice where needed." }] },
  "/affiliate-disclosure": { kicker: "Good housekeeping", title: "Affiliate disclosure", copy: "How future recommendations will be handled with care.", sections: [{ title: "If we recommend a tool", body: "FreelanceKit may eventually recommend products such as payment services, design tools, hosting or software. If a link earns us a commission, we will label it clearly on the relevant page." }, { title: "Our editorial promise", body: "A commission will never change the price you see or the honesty of the recommendation. We will not add a referral link just to fill a page." }] },
};
export function PolicyPage({ path }: { path: string }) { const data = policyCopy[path] ?? policyCopy["/terms"]; return <SiteShell eyebrow={data.kicker}><Seo
  title={data.title}
  description={data.copy}
  path={path}
/><main className="content-page container"><PageIntro kicker={data.kicker} title={data.title} copy={data.copy} /><div className="policy-copy">{data.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div><div className="policy-footer-note">Questions about any of this? <Link href="/contact">Contact us <ArrowRight size={15} /></Link></div></main></SiteShell>; }

export function NotFoundPage() { return <SiteShell eyebrow="404"><Seo
  title="Page not found"
  description="This page does not exist."
  path="/404"
  noindex
/><main className="content-page container"><PageIntro kicker="Page not found" title="This page took a different route." copy="Try one of the useful places below, or head back to the desk." /><div className="not-found-links">{tools.slice(0, 3).map((tool) => <ToolCard key={tool.slug} tool={tool} compact />)}</div></main></SiteShell>; }
