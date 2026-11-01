"use client"

import * as React from "react"

/*
 * Tilted Grid Hero — one row of tiles streams right-to-left around the
 * inside of a cylinder. The centre faces you flat, the ends bend toward you
 * and each end tile curves along its length, fading into the page.
 *
 * A CSS box can't bend, so every tile is cut into SLICES vertical strips,
 * each a flat facet showing its share of the tile. The strips sit still
 * inside the tile; the tile (preserve-3d) is what moves: one rotateY carries
 * it along the arc. Tiles render arbitrary content via `renderTile`, so the
 * site's own cards can ride the band with their styling untouched.
 */

const SLICES = 16
const CAMERA = 1.6
const MAX_WIDTH = 55

function arc(bend: number) {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend))
}

function measure(width: number, height: number, tile: number, aspect: number, gap: number, bend: number) {
  const h = Math.min((tile / 100) * height, ((MAX_WIDTH / 100) * width) / aspect)
  const radius = width * arc(bend)
  if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 }
  const deg = (rad: number) => (rad * 180) / Math.PI
  const unit = deg(h / radius)
  const pitch = (aspect + gap / 100) * unit
  const limit = deg(bend) + (aspect * unit) / 2
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)))
  const sweep = +(columns * pitch / 2).toFixed(4)
  return { columns, sweep, unit: +unit.toFixed(4), limit: +Math.min(sweep, limit).toFixed(4) }
}

export type TiltedGridTileProps<T> = {
  item: T
  index: number
  tileHeight: number
  aspectRatio: number
  gap: number
  axis: number
}

export type TiltedGridHeroProps<T> = {
  items: T[]
  renderTile: React.ComponentType<TiltedGridTileProps<T>>
  /** Seconds for the row to advance by one tile. @default 4 */
  speed?: number
  /** Tile height, as a percentage of the band's height. @default 30 */
  tileHeight?: number
  /** Tile width divided by tile height. @default 0.9 */
  aspectRatio?: number
  /** Space between tiles, as a percentage of a tile's height. @default 5 */
  gap?: number
  /** Vertical centre of the row, as a percentage of the band's height. @default 50 */
  axis?: number
  /** How far the row bends round by the frame's edge, degrees. @default 80 */
  curve?: number
  /** Width of the fade at each end, as a percentage of the band's width. @default 10 */
  fade?: number
  /** Content rendered above the band. */
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const TG_CSS = [
  ".tg-root{position:relative;overflow:hidden;width:100%;container-type:size}",
  ".tg-band{position:absolute;inset:0;pointer-events:none;transition:opacity .5s ease}",
  ".tg-tile{position:absolute;transform-style:preserve-3d}",
  ".tg-facet{position:absolute;top:0;overflow:hidden;background:var(--paper)}",
  ".tg-strip{position:absolute;top:0;max-width:none}",
  "@media (prefers-reduced-motion:reduce){.tg-tile{animation-play-state:paused}}",
].join("\n")

export default function TiltedGridHero<T>({
  items,
  renderTile: Tile,
  speed = 4,
  tileHeight = 30,
  aspectRatio = 0.9,
  gap = 5,
  axis = 50,
  curve = 80,
  fade = 10,
  children,
  className,
  style,
}: TiltedGridHeroProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null)
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const orbit = `tgh-o-${id}`
  const tileCls = `tgh-t-${id}`
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180

  const [layout, setLayout] = React.useState<ReturnType<typeof measure> | null>(null)
  const [shown, setShown] = React.useState<Record<number, number>>({})

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend)
      setLayout((prev) =>
        prev?.columns === next.columns && prev.sweep === next.sweep && prev.unit === next.unit ? prev : next,
      )
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [tileHeight, aspectRatio, gap, bend])

  const { columns, sweep, unit, limit } = layout ?? measure(1200, 560, tileHeight, aspectRatio, gap, bend)

  const u = (n: number) => `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`
  const r = 100 * arc(bend)
  const radius = `${+r.toFixed(3)}cqw`
  const turn = (deg: number) => `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`

  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4)
  const css =
    `@keyframes ${orbit}{` +
    `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
    `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
    `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}` +
    `@media(prefers-reduced-motion:reduce){.${tileCls}{animation-play-state:paused}}`

  const share = aspectRatio / SLICES
  const duration = columns * speed
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`

  return (
    <div ref={ref} className={"tg-root" + (className ? " " + className : "")} style={style}>
      <style>{TG_CSS}</style>
      <style>{css}</style>
      <div
        aria-hidden
        className="tg-band"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: columns }, (_, t) => {
          const first = columns - 1 - t
          const item = items[(shown[t] ?? first) % Math.max(items.length, 1)]
          return (
            <div
              key={t}
              className={"tg-tile " + tileCls}
              style={{
                left: `calc(50% - ${u(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${u(0.5)})`,
                width: u(aspectRatio),
                height: u(1),
                animation: `${orbit} ${duration}s linear ${-t * speed}s infinite`,
              }}
              onAnimationIteration={(e) => {
                const lap = Math.round(e.elapsedTime / duration)
                const next = lap * columns + first
                setShown((prev) => (prev[t] === next ? prev : { ...prev, [t]: next }))
              }}
            >
              {Array.from({ length: SLICES }, (_, k) => (
                <div
                  key={k}
                  className={"tg-facet" + (k === 0 ? " tg-first" : "") + (k === SLICES - 1 ? " tg-last" : "")}
                  style={{
                    left: u((aspectRatio - share) / 2),
                    width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
                    height: u(1),
                    transform: turn((aspectRatio / 2 - (k + 0.5) * share) * unit),
                    borderRadius: (k === 0 ? "15px 0 0 15px" : "") + (k === SLICES - 1 ? " 0 15px 15px 0" : ""),
                  }}
                >
                  {item !== undefined && (
                    <div
                      className="tg-strip"
                      style={{
                        left: u(-k * share),
                        width: u(aspectRatio),
                        height: u(1),
                      }}
                    >
                      <Tile item={item} index={(shown[t] ?? first) % items.length} tileHeight={tileHeight} aspectRatio={aspectRatio} gap={gap} axis={axis} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
      {children}
    </div>
  )
}
