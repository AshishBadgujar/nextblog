'use client'
import { useEffect, useRef } from 'react'

type Node = {
   x: number
   y: number
   vx: number
   vy: number
   xmin: number
   xmax: number
}

export default function Hero() {
   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let w = 0
      let h = 0
      let dpr = 1
      let nodes: Node[] = []
      let dist = 120

      const seed = () => {
         nodes = []
         dist = Math.min(150, Math.max(100, w * 0.13))
         const perSide = Math.max(14, Math.min(34, Math.round(w / 52)))
         const make = (xmin: number, xmax: number) => {
            for (let i = 0; i < perSide; i++) {
               nodes.push({
                  x: xmin + Math.random() * (xmax - xmin),
                  y: Math.random() * h,
                  vx: (Math.random() - 0.5) * 0.35,
                  vy: (Math.random() - 0.5) * 0.35,
                  xmin,
                  xmax,
               })
            }
         }
         // left + right clusters — centre stays clear for the text
         make(w * 0.02, w * 0.4)
         make(w * 0.6, w * 0.98)
      }

      const resize = () => {
         dpr = Math.min(window.devicePixelRatio || 1, 2)
         w = canvas.clientWidth
         h = canvas.clientHeight
         canvas.width = Math.floor(w * dpr)
         canvas.height = Math.floor(h * dpr)
         ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
         seed()
      }

      let raf = 0
      const draw = (animate: boolean) => {
         ctx.clearRect(0, 0, w, h)
         // dark dots on a light theme, light dots on dark
         const rgb =
            document.documentElement.getAttribute('data-theme') === 'light'
               ? '0,0,0'
               : '255,255,255'

         for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
               const a = nodes[i]
               const b = nodes[j]
               const dx = a.x - b.x
               const dy = a.y - b.y
               const d = Math.sqrt(dx * dx + dy * dy)
               if (d < dist) {
                  ctx.strokeStyle = `rgba(${rgb},${(1 - d / dist) * 0.18})`
                  ctx.lineWidth = 0.6
                  ctx.beginPath()
                  ctx.moveTo(a.x, a.y)
                  ctx.lineTo(b.x, b.y)
                  ctx.stroke()
               }
            }
         }

         for (const n of nodes) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(${rgb},0.8)`
            ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2)
            ctx.fill()
            if (animate) {
               n.x += n.vx
               n.y += n.vy
               if (n.x < n.xmin || n.x > n.xmax) n.vx *= -1
               if (n.y < 0 || n.y > h) n.vy *= -1
            }
         }
      }

      const loop = () => {
         draw(true)
         raf = requestAnimationFrame(loop)
      }

      resize()
      window.addEventListener('resize', resize)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) draw(false)
      else raf = requestAnimationFrame(loop)

      return () => {
         cancelAnimationFrame(raf)
         window.removeEventListener('resize', resize)
      }
   }, [])

   const scrollToLatest = () => {
      document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' })
   }

   return (
      <section className="hero-stage">
         <canvas ref={canvasRef} className="hero-stage__canvas" aria-hidden="true" />
         <div className="hero-stage__inner">
            <p className="hero-eyebrow">
               <span className="hero-eyebrow__num">00</span>
               <span className="hero-eyebrow__line" />
               The writing space
            </p>
            <h1 className="hero-stage__title">
               Less noise,
               <br />
               <span className="dim">more signal.</span>
            </h1>
            <p className="hero-stage__sub">
               We could hand you a feed. We&apos;d rather hand you a quiet place to
               think — offline, in black &amp; white.
            </p>
            <button type="button" className="hero-stage__cta" onClick={scrollToLatest}>
               Read the latest
               <span className="hero-stage__chev" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                     <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </span>
            </button>
         </div>
      </section>
   )
}
