import { ArrowRight, Download, FileText, Gauge, Globe2, MousePointerClick, Sparkles, Zap } from "lucide-react";
import { Link } from "wouter";
import { FAQList, SectionHeading, SiteShell, ToolCard } from "@/components/SiteShell";
import HangingToolsCarousel from "@/components/ui/hanging-tools-carousel";
import TiltedGridHero from "@/components/ui/tilted-grid-hero";
import { faqs, popularTemplates, tools } from "@/lib/site";
import Seo from "@/components/Seo";
import { faqSchema, softwareSchema } from "@/lib/schema";

const homeDescription = "Free tools to calculate fees, price your work and create invoices. Built for freelancers worldwide — no signup, no hidden costs.";

export default function Home() {
  return <SiteShell>
    <Seo
      title="FreelanceKit: Free Tools for Freelancers"
      description={homeDescription}
      path="/"
      jsonLd={[
        softwareSchema("FreelanceKit", homeDescription, "/"),
        faqSchema(faqs),
      ]}
    />
    <main>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-mark">✦</span> Free tools for the independent-minded</div>
            <h1>Price your work.<br /><em>Pitch with confidence.</em><br />Get paid cleanly.</h1>
            <p className="hero-intro">FreelanceKit turns the fiddly bits of freelancing into clear, useful steps — from the first number you quote to the invoice you send.</p>
            <div className="hero-actions"><Link href="/fee-calculator" className="button button-primary">Calculate your fees <ArrowRight size={17} /></Link><Link href="/invoice-generator" className="button button-secondary">Create an invoice <FileText size={16} /></Link></div>
          </div>
          <div className="hero-visual" aria-label="A preview of the fee calculator">
            <div className="hero-scribble">made for your next<br /><strong>good decision</strong></div>
            <div className="calc-paper">
              <div className="paper-top"><span className="paper-stamp">FK / 01</span><span className="paper-label">Fee calculator</span><span className="paper-dot" /></div>
              <div className="paper-question">What will you<br /><em>actually</em> take home?</div>
              <div className="paper-field"><span>Project amount</span><strong>$1,250.00</strong></div>
              <div className="paper-row"><span>Platform fee <b>10%</b></span><strong>− $125.00</strong></div>
              <div className="paper-row"><span>Withdrawal <b>Wise · 1%</b></span><strong>− $11.25</strong></div>
              <div className="paper-total"><span>Your net payout</span><strong>$1,113.75</strong></div>
              <div className="paper-foot"><span>✦ Ready to quote</span><span>26.10.26</span></div>
            </div>
            <div className="hero-orbit orbit-one">₨</div><div className="hero-orbit orbit-two">$</div><div className="hero-orbit orbit-three">↗</div>
          </div>
        </div>
      </section>

      <section className="tools-section section-space">
        <div className="container tools-heading"><SectionHeading kicker="The toolkit" title="Useful beats impressive." copy="Five small tools for the moments that usually take too much tab-switching and too much guesswork." /><span className="section-index">01 / 05</span></div>
        <HangingToolsCarousel tools={tools} className="tools-hanging" />
      </section>

      <section className="how-section section-space">
        <div className="container how-grid"><div className="how-lead"><span className="eyebrow">A calmer workflow</span><h2>From “I think so”<br />to <em>“here’s the number.”</em></h2><p>Freelancing has enough moving parts. These tools keep the useful bits visible, so you can spend your energy on the work itself.</p><Link href="/about" className="text-link">Why we built this <ArrowRight size={16} /></Link></div><div className="steps-list">
          <div className="step-item"><span className="step-number">01</span><div><h3>Enter the details</h3><p>Use the numbers you already have: hours, expenses, platform and currency.</p></div><MousePointerClick size={21} /></div>
          <div className="step-item"><span className="step-number">02</span><div><h3>See the useful result</h3><p>We keep the calculation visible, not hidden behind a mysterious score.</p></div><Gauge size={21} /></div>
          <div className="step-item"><span className="step-number">03</span><div><h3>Copy, download or send</h3><p>Take the answer into your next proposal, invoice or client message.</p></div><Download size={21} /></div>
        </div></div>
      </section>

      <section className="why-section container section-space"><div className="why-top"><SectionHeading kicker="Why FreelanceKit" title="Built with real-world constraints in mind." copy="Not every freelancer bills in dollars. Not everyone wants another account. Good tools should meet you where your work already happens." /><span className="hand-note">for the early mornings<br />& late invoices ↘</span></div><div className="benefit-grid"><div className="tool-card accent-saffron benefit-card"><div className="tool-card-top"><span className="tool-icon"><Sparkles size={20} strokeWidth={1.8} /></span></div><div><span className="tool-eyebrow">Free by default</span><h3>No “start trial” maze</h3><p>The useful part is right here, when you need it.</p></div><span className="tool-use">Always free <span>→</span></span></div><div className="tool-card accent-juniper benefit-card"><div className="tool-card-top"><span className="tool-icon"><Globe2 size={20} strokeWidth={1.8} /></span></div><div><span className="tool-eyebrow">Local-first</span><h3>Your currencies, first</h3><p>PKR, INR, NGN, BDT, PHP and KES — with room for how money moves in your market.</p></div><span className="tool-use">Made locally <span>→</span></span></div><div className="tool-card accent-terracotta benefit-card"><div className="tool-card-top"><span className="tool-icon"><Zap size={20} strokeWidth={1.8} /></span></div><div><span className="tool-eyebrow">Fast and private</span><h3>Stays in your browser</h3><p>Your entries stay in your browser while you work. No account required.</p></div><span className="tool-use">No account <span>→</span></span></div></div></section>

      <section className="templates-section">
        <div className="container templates-head"><SectionHeading kicker="Popular templates" title="Start with a good first line." copy="Small words can move a project forward. Use these as a starting point, then make them yours." align="center" /></div>
        <TiltedGridHero
          items={popularTemplates}
          speed={4}
          tileHeight={36}
          aspectRatio={1.05}
          gap={4}
          axis={46}
          curve={72}
          fade={9}
          className="templates-band"
          renderTile={({ item }) => (
            <Link href={item.href} className="template-card tg-card" tabIndex={-1}>
              <span className="template-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
              <span className="template-arrow">↗</span>
            </Link>
          )}
        >
          <div className="templates-center">
            <Link href="/templates" className="text-link">See all templates <ArrowRight size={16} /></Link>
          </div>
        </TiltedGridHero>
      </section>

      <section className="faq-section container section-space"><div className="faq-grid"><SectionHeading kicker="Good questions" title="Before you quote, send or click." copy="A few honest answers about the tools, the numbers and what stays on your screen." /><FAQList items={faqs} /></div></section>
    </main>
  </SiteShell>;
}
