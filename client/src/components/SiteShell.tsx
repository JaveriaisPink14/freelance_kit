import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { tools } from "@/lib/site";

type Props = { children: React.ReactNode; eyebrow?: string };

export function BrandMark() {
  return (
    <Link href="/" className="brand-mark" aria-label="FreelanceKit home">
      <span className="brand-stamp">FK</span>
      <span className="brand-word">Freelance<span>Kit</span></span>
    </Link>
  );
}

export function SiteShell({ children, eyebrow }: Props) {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [location] = useLocation();

  const close = () => setOpen(false);

  return (
    <div className="site-frame">
      <div className="announcement"><span className="announcement-dot" /> Built for the way independent work actually gets paid <span className="announcement-arrow">↗</span></div>
      <header className="site-header">
        <div className="site-header-inner">
          <BrandMark />
          <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
            <div className="nav-tools-wrap">
              <button className="nav-link nav-tools-button" onClick={() => setToolsOpen((value) => !value)} aria-expanded={toolsOpen}>
                Tools <ChevronDown size={14} className={toolsOpen ? "rotate" : ""} />
              </button>
              {toolsOpen && <div className="tools-popover">
                {tools.map((tool) => <Link key={tool.slug} href={tool.href} onClick={() => { setToolsOpen(false); close(); }} className="popover-link"><tool.icon size={15} /><span>{tool.title}</span><ArrowUpRight size={13} /></Link>)}
              </div>}
            </div>
            <Link href="/templates" onClick={close} className={`nav-link ${location === "/templates" ? "active" : ""}`}>Templates</Link>
            <Link href="/blog" onClick={close} className={`nav-link ${location === "/blog" ? "active" : ""}`}>Blog</Link>
            <Link href="/about" onClick={close} className={`nav-link ${location === "/about" ? "active" : ""}`}>About</Link>
            <Link href="/contact" onClick={close} className="nav-link">Contact</Link>
          </nav>
          <Link href="/fee-calculator" className="header-cta" onClick={close}>Try a free tool <ArrowUpRight size={15} /></Link>
          <button className="mobile-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button>
        </div>
      </header>
      {eyebrow && <div className="page-kicker container"><span>{eyebrow}</span><span className="kicker-line" /></div>}
      {children}
      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand"><BrandMark /><p>A small, useful toolkit for freelancers who want to price with confidence, pitch with clarity and keep the getting-paid part simple.</p><span className="footer-note">No signup. No fuss. Just useful.</span></div>
          <div className="footer-col"><h3>Tools</h3>{tools.map((tool) => <Link key={tool.slug} href={tool.href}>{tool.title}</Link>)}</div>
          <div className="footer-col"><h3>Resources</h3><Link href="/templates">Templates</Link><Link href="/blog">Blog & guides</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
          <div className="footer-col"><h3>Good to know</h3><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms">Terms of use</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/affiliate-disclosure">Affiliate disclosure</Link></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} FreelanceKit. All rights reserved.</span><span>Made for the people behind the work.</span><a className="footer-badge" href="https://dofollow.tools" target="_blank" rel="dofollow noopener" aria-label="Featured on Dofollow.Tools"><img src="https://dofollow.tools/badge/badge_dark.svg" alt="Featured on Dofollow.Tools" loading="lazy" width="150" height="22" /></a></div>
      </footer>
    </div>
  );
}

export function SectionHeading({ kicker, title, copy, align = "left" }: { kicker: string; title: string; copy?: string; align?: "left" | "center" }) {
  return <div className={`section-heading ${align === "center" ? "centered" : ""}`}><span className="eyebrow">{kicker}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

export function ToolCard({ tool, compact = false }: { tool: (typeof tools)[number]; compact?: boolean }) {
  return <Link href={tool.href} className={`tool-card accent-${tool.accent} ${compact ? "compact" : ""}`}>
    <div className="tool-card-top"><span className="tool-icon"><tool.icon size={20} strokeWidth={1.8} /></span><ArrowUpRight size={17} className="tool-arrow" /></div>
    <div><span className="tool-eyebrow">{tool.eyebrow}</span><h3>{tool.title}</h3><p>{tool.description}</p></div>
    <span className="tool-use">Use free <span>→</span></span>
  </Link>;
}

export function FAQList({ items }: { items: { q: string; a: string }[] }) {
  return <div className="faq-list">{items.map((item) => <details key={item.q} className="faq-item"><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div>;
}
