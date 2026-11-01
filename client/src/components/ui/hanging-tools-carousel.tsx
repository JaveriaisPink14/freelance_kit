"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "wouter"
import { tools } from "@/lib/site"

/*
 * Hanging Tools Carousel — the existing tool cards, hung from a sagging
 * string on little wooden pegs. Drag the line and the cards slide along it,
 * swinging on their pegs, and it loops forever. The card styling, colours
 * and content are exactly the site's own `.tool-card`.
 */

type Tool = (typeof tools)[number]

export type HangingToolsCarouselProps = {
  tools?: Tool[]
  /** Width of a hanging card in px (shrinks on narrow screens). */
  cardWidth?: number
  /** How far the string sags in the middle, px. */
  sag?: number
  /** How much the cards swing; 0 holds them still. */
  swing?: number
  /** ms per card; 0 turns autoplay off. */
  autoplay?: number
  /** Colour of the string and pegs. */
  string?: string
  className?: string
  ariaLabel?: string
}

// #region logic
function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v))
}

/** Height of a string sagging by `sag` between (0, y0) and (w, y0), at x. */
function stringY(x: number, w: number, y0: number, sag: number): number {
  const t = clamp(x / w, 0, 1)
  return y0 + 4 * sag * t * (1 - t)
}

/** One step of a critically damped spring toward target. */
function springStep(x: number, v: number, target: number, dt: number, k = 70): [number, number] {
  const c = 2 * Math.sqrt(k)
  const nv = v + (k * (target - x) - c * v) * dt
  return [x + nv * dt, nv]
}

/** One step of a card's swing. lineVel is the line's on-screen speed (px/s). */
function swingStep(a: number, w: number, lineVel: number, dt: number, gain: number): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt
  return [clamp(a + nw * dt, -0.6, 0.6), nw]
}

function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n)
}
// #endregion logic

const HC_CSS = [
  ".hc-root{position:relative;width:100%;overflow:hidden;user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none;cursor:grab;padding-bottom:clamp(56px,7vh,84px)}",
  ".hc-root[data-drag='1']{cursor:grabbing}",
  ".hc-root:focus-visible{box-shadow:inset 0 0 0 2px var(--juniper)}",
  ".hc-string{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}",
  ".hc-card{position:absolute;left:0;top:0;width:var(--hcw);transform-origin:50% 0;will-change:transform}",
  ".hc-peg{position:absolute;left:50%;top:0;width:10px;height:26px;margin-left:-5px;border-radius:2px;background:linear-gradient(90deg,#c9a67a,#e3c9a1 45%,#b8915f);box-shadow:0 2px 3px rgba(0,0,0,.25);z-index:2}",
  ".hc-peg::after{content:'';position:absolute;left:4px;top:8px;width:2px;height:7px;background:rgba(80,60,30,.45);border-radius:1px}",
  ".hc-print{margin-top:16px;width:100%;min-height:0;height:auto}",
  ".hc-print .tool-card p{max-width:100%}",
  ".hc-bar{position:absolute;left:clamp(16px,4vw,56px);right:clamp(16px,4vw,56px);bottom:clamp(14px,3vh,32px);display:flex;align-items:center;gap:clamp(12px,2vw,24px);cursor:default}",
  ".hc-count{font:500 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;color:var(--ink-soft);margin-left:auto}",
  ".hc-count b{color:var(--ink);font-weight:500}",
  ".hc-btn{appearance:none;width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:var(--paper);color:var(--ink);display:grid;place-items:center;cursor:pointer;transition:background .2s ease,color .2s ease}",
  ".hc-btn:hover{background:var(--juniper);color:#fffdf9}",
  ".hc-btn:focus-visible{outline:2px solid var(--juniper);outline-offset:2px}",
  "@media (prefers-reduced-motion:reduce){.hc-print{transition:none}}",
].join("\n")

export default function HangingToolsCarousel({
  tools: list = tools,
  cardWidth = 320,
  sag = 34,
  swing = 1,
  autoplay = 4200,
  string = "#8a7f72",
  className,
  ariaLabel = "Hanging tools carousel",
}: HangingToolsCarouselProps) {
  const n = list.length
  const COPIES = 3
  const total = n * COPIES
  const [active, setActive] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const [size, setSize] = React.useState({ w: 1200, h: 420, cw: cardWidth })
  const rootRef = React.useRef(null as HTMLDivElement | null)
  const pathRef = React.useRef(null as SVGPathElement | null)
  const cards = React.useRef([] as (HTMLDivElement | null)[])
  const sim = React.useRef({ off: 0, vel: 0, target: 0, a: [] as number[], w: [] as number[] })
  const drag = React.useRef(null as null | { x: number; off: number; lx: number; lt: number; v: number; moved: boolean })
  const lastTouch = React.useRef(0)
  const activeRef = React.useRef(0)
  const opts = React.useRef({ sag, swing })
  opts.current = { sag, swing }

  const spacing = size.cw * 1.12
  const step = (dir: number) => {
    lastTouch.current = performance.now()
    sim.current.target = activeRef.current * spacing + dir * spacing
  }

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect()
      const cw = Math.round(Math.max(190, Math.min(cardWidth, r.width * 0.42)))
      setSize({ w: r.width, h: r.height, cw })
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [cardWidth])

  // start with a middle copy centred on screen
  React.useEffect(() => {
    const start = n * spacing
    sim.current.off = start
    sim.current.target = start
    activeRef.current = n
  }, [n, spacing])

  // the simulation, written straight to the DOM each frame
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let visible = true
    let raf = 0
    let prev = performance.now()
    const S = sim.current
    const frame = (now: number) => {
      raf = 0
      if (!visible) return
      const dt = Math.min(0.033, (now - prev) / 1000)
      prev = now
      const { w, cw } = size
      const y0 = 10
      const d = drag.current
      let lineVel: number
      if (d && d.moved) {
        lineVel = d.v * 1000
      } else {
        const before = S.off
          ;[S.off, S.vel] = springStep(S.off, S.vel, S.target, dt)
        lineVel = -(S.off - before) / Math.max(dt, 1e-3)
      }
      const g = reduce ? 0 : opts.current.swing
      const span = total * spacing
      let nearestScreen = -1
      let nearestDist = Infinity
      for (let i = 0; i < total; i++) {
        const el = cards.current[i]
        if (!el) continue
        let x = i * spacing - S.off
        // wrap into [0, span) so the line loops forever
        x = ((x % span) + span) % span
        if (x > span - spacing * 0.8 && w < span - x + x) x -= span
        const dist = Math.abs(x - w / 2)
        if (dist < nearestDist) {
          nearestDist = dist
          nearestScreen = i % n
        }
        if (x < -cw * 1.2 || x > w + cw * 1.2) {
          el.style.visibility = "hidden"
          continue
        }
        el.style.visibility = "visible"
        let a = S.a[i] || 0
        let av = S.w[i] || 0
          ;[a, av] = swingStep(a, av, lineVel, dt, g)
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g
        S.a[i] = a
        S.w[i] = av
        const y = stringY(clamp(x, 0, w), w, y0, opts.current.sag) - 6
        el.style.transform = "translate(" + (x - cw / 2).toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + a.toFixed(4) + "rad)"
      }
      pathRef.current?.setAttribute("d", "M0 " + y0 + " Q" + w / 2 + " " + (y0 + 2 * opts.current.sag) + " " + w + " " + y0)
      if (nearestScreen !== activeRef.current % n) {
        activeRef.current = nearestScreen
        setActive(nearestScreen)
      }
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) {
        prev = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(root)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [size, spacing, n, total])

  // autoplay, always forward — the wrap makes it loop
  React.useEffect(() => {
    if (!autoplay || n < 2) return
    const t = window.setInterval(() => {
      if (document.hidden || drag.current || performance.now() - lastTouch.current < autoplay) return
      step(1)
    }, autoplay)
    return () => window.clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, n, spacing])

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".hc-bar")) return
    lastTouch.current = performance.now()
    drag.current = { x: e.clientX, off: sim.current.off, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false }
  }
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      setDragging(true)
      rootRef.current?.setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    const dt = Math.max(1, e.timeStamp - d.lt)
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v
    d.lx = e.clientX
    d.lt = e.timeStamp
    sim.current.off = d.off - dx
  }
  const onUp = () => {
    const d = drag.current
    drag.current = null
    lastTouch.current = performance.now()
    if (!d) return
    if (d.moved) {
      setDragging(false)
      sim.current.vel = -d.v * 1000
      // fling: land on the nearest card after momentum
      const projected = sim.current.off - d.v * 180
      sim.current.target = Math.round(projected / spacing) * spacing
    }
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1)
    else if (e.key === "ArrowLeft") step(-1)
    else return
    e.preventDefault()
  }
  // swallow the click right after a drag so links don't fire
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current?.moved) e.preventDefault()
  }

  return (
    <div
      ref={rootRef}
      className={["hc-root", className].filter(Boolean).join(" ")}
      style={{ ["--hcw" as string]: size.cw + "px" }}
      data-drag={dragging ? "1" : "0"}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onClickCapture={onClickCapture}
    >
      <style>{HC_CSS}</style>
      <svg className="hc-string" aria-hidden="true">
        <path ref={pathRef} fill="none" stroke={string} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {Array.from({ length: total }, (_, i) => {
        const tool = list[i % n]
        return (
          <div key={i} className="hc-card" ref={(el) => void (cards.current[i] = el)} aria-hidden={true}>
            <div className="hc-peg" />
            <Link href={tool.href} tabIndex={-1} className={`tool-card accent-${tool.accent} hc-print`} draggable={false}>
              <div className="tool-card-top"><span className="tool-icon"><tool.icon size={20} strokeWidth={1.8} /></span><ArrowUpRight size={17} className="tool-arrow" /></div>
              <div><span className="tool-eyebrow">{tool.eyebrow}</span><h3>{tool.title}</h3><p>{tool.description}</p></div>
              <span className="tool-use">Use free <span>→</span></span>
            </Link>
          </div>
        )
      })}
      <div className="hc-bar">
        <span className="hc-count" aria-hidden="true">
          <b>{pad2(active + 1)}</b> / {pad2(n)}
        </span>
        <button type="button" className="hc-btn" aria-label="Previous tool" onClick={() => step(-1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <button type="button" className="hc-btn" aria-label="Next tool" onClick={() => step(1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
