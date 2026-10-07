import { useState, useEffect, useRef } from 'react'
import arielPhoto   from '@/imports/Foto_perfil_Ariel_Ba_os_-_Optimizada.jpg'
import arielPhoto2  from '@/imports/Imagen2.jpg'
import libroCarato  from '@/imports/Libro_Carato_-_Optimizado.png'
import libro50lecciones from '@/imports/50-lecciones-de-precios.jpg'
import libroSecretosPrecios from '@/imports/Los-secretos-de-los-precios.jpg'
import imgFirma from '@/imports/firma.svg'
import imgDescuentos from '@/imports/descuentos.jpg'
import imgVendaCaro from '@/imports/venda_caro_y_resulte_barato.jpg'
import imgCarato from '@/imports/CARato.jpg'
import imgMessi from '@/imports/messi.jpg'
import imgPerfumes from '@/imports/perfumes_calidad.jpg'
import logoFdp      from '@/imports/logo-fijaciondeprecios.png'
import logoCaratoTransp   from '@/imports/Logo_Carato_Fondo_Transparente.png'
import logoCaratoBlanco   from '@/imports/Logo_Carato_Blanco_Transparente.png'
const WS_FORM = 'https://mailchi.mp/8763f40c7605/programas-virtuales-fijaciondeprecios'
import logoUnilever     from '@/imports/unilever_logo-removebg-preview__1_.png'
import logoUdesa        from '@/imports/UDESA-LOGO-1-removebg-preview-1.png'
import logoTorcuato     from '@/imports/Universidad_de_Torcuato_Di_Tella.png'
import logoUnr          from '@/imports/Logo-unr.png'
import logoToyota       from '@/imports/Toyota-Logo.png'
import logoBancolombia  from '@/imports/Logo_Bancolombia-removebg-preview.png'
import logoAvon         from '@/imports/avon_logo.jpg'
import logoCat          from '@/imports/caterpillar.png'
import logoCrucianelli  from '@/imports/crucianelli_logo-removebg-preview.png'
import logoTuv          from '@/imports/tuv_logo-removebg-preview.png'
import logoVistage      from '@/imports/Logos-Vistage.png'
import logoCambridge    from '@/imports/logo-nuevo-cambridge-removebg-preview.png'

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const io  = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

// ─── Counter animation hook ───────────────────────────────────────────────────
function useCounterAnimation(target: number, duration = 1400, delay = 0) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setCount(target); return }

    const timer = setTimeout(() => {
      const start = performance.now()
      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timer)
  }, [started, target, duration, delay])

  return { count, ref }
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
const btn = {
  primary: {
    fontFamily: 'Archivo', fontWeight: 700 as const, fontSize: 14,
    color: '#fff', background: 'var(--red)',
    padding: '13px 24px', borderRadius: 4, textDecoration: 'none',
    display: 'inline-block', letterSpacing: '0.02em', border: 'none',
    transition: 'background 0.2s, transform 0.15s', cursor: 'pointer',
  },
  secondary: {
    fontFamily: 'Archivo', fontWeight: 700 as const, fontSize: 14,
    color: 'var(--blue)', background: 'var(--white)',
    padding: '13px 24px', borderRadius: 4, textDecoration: 'none',
    display: 'inline-block', letterSpacing: '0.02em',
    border: '1.5px solid var(--blue)', transition: 'all 0.2s', cursor: 'pointer',
  },
  outline: {
    fontFamily: 'Archivo', fontWeight: 700 as const, fontSize: 14,
    color: 'var(--gray-800)', background: 'var(--white)',
    padding: '13px 24px', borderRadius: 4, textDecoration: 'none',
    display: 'inline-block', letterSpacing: '0.02em',
    border: '1.5px solid var(--border)', transition: 'all 0.2s', cursor: 'pointer',
  },
}

// ─── CARato logo component ────────────────────────────────────────────────────
function CaratoLogo({ height = 36, onDark = false }: { height?: number; onDark?: boolean }) {
  if (onDark) {
    return <img src={logoCaratoBlanco} alt="CARato" style={{ height, width: 'auto', display: 'inline-block', verticalAlign: 'middle' }} />
  }
  return <img src={logoCaratoTransp} alt="CARato" style={{ height, width: 'auto', display: 'inline-block', verticalAlign: 'middle' }} />
}

// ─── Tag label ────────────────────────────────────────────────────────────────
function Tag({ children, color = 'var(--blue)' }: { children: string; color?: string }) {
  return (
    <div style={{ display: 'inline-block', background: color, padding: '4px 14px', borderRadius: 2, marginBottom: 20 }}>
      <span style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>{children}</span>
    </div>
  )
}

// ─── Social icons ─────────────────────────────────────────────────────────────
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function IconYouTube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  )
}
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
const allNavItems = [
  { label: 'Inicio',            target: 'inicio'    },
  { label: 'Libros',            target: 'libro'     },
  { label: 'Workshops',         target: 'workshops' },
  { label: 'Sobre Ariel Baños', target: 'sobre-mi'  },
  { label: 'Recursos gratis',   target: 'recursos'  },
  { label: 'Contacto',          target: 'contacto'  },
]

function MenuIcon({ open, dark }: { open: boolean; dark: boolean }) {
  const color = dark ? 'var(--charcoal)' : 'var(--charcoal)'
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 20 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          display: 'block', height: 2, borderRadius: 2, background: color,
          transitionProperty: 'transform, opacity',
          transitionDuration: '0.22s',
          transitionTimingFunction: 'ease',
          transform: open
            ? i === 0 ? 'rotate(45deg) translate(4px,4px)'
            : i === 2 ? 'rotate(-45deg) translate(4px,-4px)'
            : 'none'
            : 'none',
          opacity: open && i === 1 ? 0 : 1,
          width: i === 1 ? 14 : 20,
        }} />
      ))}
    </span>
  )
}

function Header({ onNavigate }: { onNavigate: (target: string) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)
  const nav = (target: string) => { close(); onNavigate(target) }

  return (
    <>
      {/* Soft scrim in hero state only — cream gradient for logo readability */}
      {!scrolled && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 120, zIndex: 98,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
        }} />
      )}

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99,
        background: scrolled ? '#fff' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.07)' : 'none',
        transitionProperty: 'background, border-color, box-shadow',
        transitionDuration: '0.26s',
        transitionTimingFunction: 'ease',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto', padding: '0 32px',
          height: scrolled ? 72 : 88,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transitionProperty: 'height', transitionDuration: '0.26s',
        }}>

          {/* Logo */}
          <button onClick={() => nav('inicio')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src={logoFdp} alt="FijaciondePrecios.com"
              style={{ height: scrolled ? 54 : 68, width: 'auto', transitionProperty: 'height', transitionDuration: '0.26s' }} />
          </button>

          {/* Right cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

            {/* ── Sticky only: "Comprar el libro" (blue, secondary) ── */}
            {scrolled && (
              <button onClick={() => nav('libro')} className="hdr-libro"
                style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, color: 'var(--blue)', background: 'transparent', padding: '9px 16px', borderRadius: 4, border: '1.5px solid var(--blue)', whiteSpace: 'nowrap' as const, transition: 'background 0.18s, color 0.18s', cursor: 'pointer' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'var(--blue)'; el.style.color = '#fff' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = 'var(--blue)' }}>
                Comprar el libro
              </button>
            )}

            {/* ── Sticky only: "Consultar por un workshop" (red) ── */}
            {scrolled && (
              <a href={WS_FORM} target="_blank" rel="noopener noreferrer" className="hdr-cta"
                style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, color: '#fff', background: 'var(--red)', padding: '10px 18px', borderRadius: 4, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' as const, transition: 'background 0.18s', textDecoration: 'none', display: 'inline-block' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red-light)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red)' }}>
                Consultar por un workshop
              </a>
            )}

            {/* ── Menú button — always visible ── */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}
              style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Archivo', fontWeight: 700, fontSize: 12, color: 'var(--charcoal)', background: 'none', border: '1.5px solid rgba(0,0,0,0.18)', borderRadius: 4, padding: '7px 12px', cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap' as const, transition: 'border-color 0.18s, background 0.18s', minHeight: 44 }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'var(--charcoal)'; el.style.background = 'var(--gray-50)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'rgba(0,0,0,0.18)'; el.style.background = 'transparent' }}>
              <MenuIcon open={menuOpen} dark />
              Menú
            </button>
          </div>
        </div>
      </header>

      {/* ── Drawer overlay ── */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          {/* backdrop */}
          <div onClick={close}
            style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,46,0.45)', backdropFilter: 'blur(3px)' }} />

          {/* drawer panel */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 320,
            background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
            display: 'flex', flexDirection: 'column', overflowY: 'auto',
          }}>
            {/* Drawer header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>Menú</span>
              <button onClick={close} aria-label="Cerrar menú"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', fontSize: 20, lineHeight: 1, padding: '4px 6px', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s, background 0.15s' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.color = 'var(--charcoal)'; el.style.background = 'var(--gray-50)' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.color = 'var(--gray-400)'; el.style.background = 'transparent' }}>
                ✕
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, padding: '8px 0' }}>
              {allNavItems.map((item) => (
                <button key={item.label} onClick={() => nav(item.target)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '14px 28px', fontFamily: 'Archivo', fontWeight: 700, fontSize: 16, color: 'var(--charcoal)', background: 'none', border: 'none', borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s, color 0.15s', minHeight: 52, cursor: 'pointer', textAlign: 'left' as const }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'var(--gray-50)'; el.style.color = 'var(--blue)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = 'var(--charcoal)' }}>
                  {item.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              ))}
            </nav>

            {/* Drawer footer CTAs */}
            <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={WS_FORM} target="_blank" rel="noopener noreferrer" onClick={close}
                style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 14, color: '#fff', background: 'var(--red)', padding: '13px 20px', borderRadius: 4, border: 'none', cursor: 'pointer', textAlign: 'center' as const, transition: 'background 0.18s', minHeight: 48, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red-light)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red)' }}>
                Consultar por un workshop
              </a>
              <button onClick={() => nav('libro')}
                style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 14, color: 'var(--blue)', background: 'transparent', padding: '11px 20px', borderRadius: 4, border: '1.5px solid var(--blue)', textAlign: 'center' as const, transition: 'background 0.18s, color 0.18s', minHeight: 48, cursor: 'pointer' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'var(--blue)'; el.style.color = '#fff' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = 'var(--blue)' }}>
                Comprar el libro
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Hide CTAs on tablet/mobile — only Menú shown */
        @media (max-width: 860px) {
          .hdr-libro { display: none !important; }
          .hdr-cta   { display: none !important; }
        }
        /* Tablet: show CTA red, hide libro if tight */
        @media (min-width: 600px) and (max-width: 860px) {
          .hdr-cta { display: flex !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          header, header * { transition: none !important; }
        }
      `}</style>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="inicio" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      borderBottom: '1px solid var(--border)',
      background: 'linear-gradient(to right, #ffffff 28%, #f7f4f0 100%)',
    }}>
      {/* Full-bleed photo — right half, crystal clear */}
      <div className="hero-photo-panel" style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', zIndex: 0,
      }}>
        <img src={arielPhoto} alt="Ariel Baños – economista y consultor en estrategias de precios"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', display: 'block' }} />
        {/* Razor-thin seam only at the very left edge — no fog over Ariel */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '18%', background: 'linear-gradient(to right, #ffffff, transparent)' }} />
        {/* Name tag below photo */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(13,27,46,0.82)', backdropFilter: 'blur(8px)',
          padding: '12px 22px', borderRadius: 4, whiteSpace: 'nowrap' as const,
          borderLeft: '3px solid var(--red)',
        }}>
          <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(19px, 2.2vw, 24px)', color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Ariel Baños</div>
          <div style={{ fontFamily: 'Inter', fontSize: 'clamp(14px, 1.55vw, 18px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.4 }}>Creador método CARato® para vender caro y resultar barato.</div>
        </div>
      </div>

      {/* Text content – paddingTop ensures content clears the transparent header */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="animate-fade-up" style={{ maxWidth: 540, paddingTop: 124, paddingBottom: 96 }}>
          <h1 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(38px, 4.8vw, 72px)', color: 'var(--charcoal)', lineHeight: 1.06, marginBottom: 4 }}>
            Venda caro y
          </h1>
          <h1 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(38px, 4.8vw, 72px)', color: 'var(--red)', lineHeight: 1.06, marginBottom: 32, whiteSpace: 'nowrap' as const }}>
            resulte barato.
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'var(--gray-600)', lineHeight: 1.78, maxWidth: 460, marginBottom: 48 }}>
            Las empresas pierden dinero porque creen que sólo existen dos opciones: ser caro o ser barato. El método CARato® es la solución que permite subir precios sin perder ventas.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}>
            <a href={WS_FORM} target="_blank" rel="noopener noreferrer" style={{ ...btn.primary, fontSize: 15, padding: '15px 30px' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red-light)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red)' }}>
              Consultar por workshops
            </a>
            <a href="#libro" style={{ ...btn.secondary, fontSize: 15, padding: '15px 30px' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--blue)'; el.style.color = '#fff' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--white)'; el.style.color = 'var(--blue)' }}>
              Comprar el libro
            </a>
          </div>

          {/* Mobile-only: Ariel card shown below buttons */}
          <div className="hero-mobile-tag" style={{
            marginTop: 40, display: 'none', alignItems: 'center', gap: 16,
            background: 'var(--gray-50)', border: '1px solid var(--border)',
            borderLeft: '3px solid var(--red)', borderRadius: 4, padding: '14px 18px',
          }}>
            <img src={arielPhoto} alt="Ariel Baños"
              style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(19px, 4.8vw, 24px)', color: 'var(--charcoal)', letterSpacing: '0.04em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Ariel Baños</div>
              <div style={{ fontFamily: 'Inter', fontSize: 'clamp(14px, 3.8vw, 18px)', color: 'var(--gray-600)', lineHeight: 1.45 }}>Creador método CARato® para vender caro y resultar barato.</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .hero-photo-panel { width: 46% !important; } }
        @media (max-width: 768px) {
          .hero-photo-panel { display: none !important; }
          .hero-mobile-tag  { display: flex !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Stat counter item ────────────────────────────────────────────────────────
function StatItem({ num, label, delay }: { num: string; label: string; delay: number }) {
  const isNumeric = /^\d+/.test(num)
  const numericValue = parseInt(num.replace(/\D/g, ''), 10) || 0
  const suffix = num.replace(/^\d+/, '')
  const { count, ref } = useCounterAnimation(numericValue, 1400, delay)

  return (
    <div ref={ref} style={{ textAlign: 'center', flex: '1 1 120px' }}>
      <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 40, color: '#fff', lineHeight: 1 }}>
        {isNumeric ? `${count}${suffix}` : num}
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>{label}</div>
    </div>
  )
}

// ─── Authority strip ──────────────────────────────────────────────────────────
function AuthorityStrip() {
  const stats = [
    { num: '25+', label: 'Años de experiencia' },
    { num: '30+', label: 'Países de alcance' },
    { num: '3',   label: 'Libros publicados' },
    { num: '500+',label: 'Empresas asesoradas' },
    { num: '10+', label: 'Instituciones académicas' },
  ]
  return (
    <section style={{ background: 'var(--blue)', padding: '56px 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          {stats.map((s, i) => (
            <StatItem key={i} num={s.num} label={s.label} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CARato concept ───────────────────────────────────────────────────────────
function CaratoSection() {
  return (
    <section id="carato" style={{ background: 'var(--white)', padding: '96px 0', position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>

        {/* ── Bloque 3: "Ni caro. Ni barato." + logo + texto ── */}
        <div className="two-col reveal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 72 }}>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(40px, 5vw, 68px)', color: 'var(--charcoal)', lineHeight: 1.05, marginBottom: 10 }}>
              Ni caro.<br />Ni barato.
            </h2>
            <CaratoLogo height={96} />
          </div>
          <div className="reveal delay-200" style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'var(--gray-600)', lineHeight: 1.78 }}>
              CARato® es un exclusivo método creado por Ariel Baños que permite a cualquier empresa subir sus precios sin temor a perder clientes. CARato® es la oportunidad única de alcanzar la rentabilidad de vender caro, pero sin renunciar al magnetismo comercial de las propuestas baratas.
            </p>
          </div>
        </div>

        {/* ── Bloque 4: La nueva lógica de los precios ── */}
        <div className="reveal" style={{
          background: 'var(--navy)', borderRadius: 12, padding: '52px 48px',
          marginBottom: 64, textAlign: 'center',
          boxShadow: '0 12px 40px rgba(13,27,46,0.18)',
        }}>
          <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Método CARato®</div>
          <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(18px, 2.2vw, 26px)', color: '#fff', marginBottom: 40 }}>La nueva lógica de los precios</div>
          {/* Three equal-width columns: CARO → barato → CARato */}
          <div className="carato-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 0 }}>
            {/* Column: CARO */}
            <div className="carato-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 160px' }}>
              <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 34, color: 'rgba(255,255,255,0.55)', textDecoration: 'line-through', letterSpacing: '0.02em', lineHeight: 1 }}>CARO</div>
              </div>
              <div style={{ marginTop: 14, fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Nadie compra</div>
            </div>
            {/* Arrow */}
            <div className="carato-arrow" style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 12, color: 'rgba(255,255,255,0.25)', fontSize: 24, fontFamily: 'Archivo' }}>→</div>
            {/* Column: barato */}
            <div className="carato-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 160px' }}>
              <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 34, color: 'rgba(255,255,255,0.55)', textDecoration: 'line-through', letterSpacing: '0.02em', lineHeight: 1 }}>barato</div>
              </div>
              <div style={{ marginTop: 14, fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Sin margen</div>
            </div>
            {/* Arrow */}
            <div className="carato-arrow" style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 12, color: 'rgba(255,255,255,0.25)', fontSize: 24, fontFamily: 'Archivo' }}>→</div>
            {/* Column: CARato logo */}
            <div className="carato-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 160px' }}>
              <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CaratoLogo height={48} onDark />
              </div>
              <div style={{ marginTop: 14, fontFamily: 'Inter', fontSize: 11, color: '#fff', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>La zona ganadora</div>
            </div>
          </div>
        </div>

        {/* ── Bloque 6: Lead magnet ── */}
        <div className="reveal" style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 10, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' as const }}>
          <div style={{ flex: '1 1 320px' }}>
            <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: 'var(--gray-400)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 10 }}>Método CARato®</p>
            <h3 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 28px)', color: 'var(--charcoal)', lineHeight: 1.15, marginBottom: 12 }}>
              ¿Quieres conocer mejor el método CARato®?
            </h3>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7 }}>
              Descarga GRATIS una guía exclusiva y descubre cómo subir precios sin perder atractivo comercial.
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <a href="https://mailchi.mp/fijaciondeprecios/carato?fbclid=PAQ0xDSwLD4hRleHRuA2FlbQIxMQABp-U4B26NyruzQ-22xNpbYA5EKqtR8ympvoAp2JBl2wKumC81Lrr_AQplsbIO_aem_GdtDuEmZwCKuw9GDCURj3g" target="_blank" rel="noopener noreferrer"
              style={{ ...btn.primary, fontSize: 15, padding: '14px 28px' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red-light)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red)' }}>
              Descarga guía GRATIS
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Book section ─────────────────────────────────────────────────────────────
function BookSection() {
  const benefits = [
    'Cómo fijar precios que el mercado acepte y usted pueda defender',
    'Por qué bajar precios es casi siempre el peor camino',
    'Cómo construir el argumento de valor frente al cliente',
    'Herramientas concretas para salir de la guerra de precios',
    'Casos reales de empresas que aplicaron el método CARato®',
  ]
  return (
    <section id="libro" style={{ background: 'var(--gray-50)', padding: '96px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Book */}
          <div className="reveal-left" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img src={libroCarato} alt="CARato: Venda caro y resulte barato – Ariel Baños"
                style={{ width: 300, maxWidth: '100%', mixBlendMode: 'multiply', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.15))', cursor: 'pointer', transition: 'transform 0.4s ease, filter 0.4s ease' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLImageElement; el.style.transform = 'translateY(-10px) rotate(-1.5deg)'; el.style.filter = 'drop-shadow(0 32px 56px rgba(0,0,0,0.28))' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLImageElement; el.style.transform = 'none'; el.style.filter = 'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}
              />
              <div style={{ position: 'absolute', top: 8, right: -16, width: 68, height: 68, borderRadius: '50%', background: 'var(--red)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(229,25,42,0.35)' }}>
                <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 10, color: '#fff', textAlign: 'center', lineHeight: 1.3 }}>Nuevo<br />libro</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right">
            <Tag color="var(--red)">El libro</Tag>
            <div style={{ marginBottom: 20, maxWidth: 240 }}><CaratoLogo height={67} /></div>
            <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 46px)', color: 'var(--charcoal)', lineHeight: 1.08, marginBottom: 18 }}>
              <span style={{ color: 'var(--red)' }}>Venda caro</span><br />y resulte barato
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 28 }}>
              Una guía práctica para empresas y profesionales que quieren salir de la guerra de precios y aprender a capturar el valor real de lo que ofrecen.
            </p>
            <div style={{ marginBottom: 32 }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--red-subtle)', border: '1.5px solid var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 3 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)' }} />
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <a href="https://www.mercadolibre.com.ar/libro-venda-caro-y-resulte-barato--ariel-banos/up/MLAU3840526677?pdp_filters=item_id%3AMLA3060236124&matt_tool=89488245&ua=5ry73njlfO3HczXGUwR2QLZG9TYfyaq8a4th_lT4_ABJSw#origin=share&sid=share&wid=MLA3060236124&action=copy" target="_blank" rel="noopener noreferrer" style={{ ...btn.primary }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red-light)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red)' }}>
                Comprar en Mercado Libre
              </a>
              <a href="https://www.amazon.com/-/es/CARato-resulte-precios-arrepentirse-Spanish/dp/B0GT5Q3F99" target="_blank" rel="noopener noreferrer" style={{ ...btn.secondary }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--blue)'; el.style.color = '#fff' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--white)'; el.style.color = 'var(--blue)' }}>
                Comprar en Amazon
              </a>
            </div>
          </div>
        </div>

        {/* ── Libros anteriores ── */}
        <div style={{ marginTop: 72, paddingTop: 56, borderTop: '1px solid var(--border)' }}>
          <div className="reveal" style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 28 }}>Libros anteriores</div>
          <div className="libros-prev" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

            {/* 50 Lecciones */}
            <div className="reveal delay-100" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '28px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 64, height: 88, borderRadius: 4, flexShrink: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={libro50lecciones} alt="50 Lecciones de Precios de la Vida Real" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 13, color: 'var(--gray-400)', marginBottom: 2 }}>Ariel Baños</div>
                <h3 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 16, color: 'var(--charcoal)', lineHeight: 1.25, marginBottom: 8 }}>50 Lecciones de Precios de la Vida Real</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 14 }}>A partir de 50 situaciones cotidianas, Baños explora los misterios del precio y ofrece consejos prácticos para comprar y vender con mayor inteligencia.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}>
                  <a href="https://www.mercadolibre.com.ar/up/MLAU3373929619?matt_tool=89488245&pdp_filters=item_id:MLA2282964788&ua=sKhZXZOc8BJaIQBB1wk_oBAQK7xTESKKbHxs1okPtArGTg#origin=share&sid=share&wid=MLA2282964788&action=copy" target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, color: '#3483FA', textDecoration: 'none', borderBottom: '1.5px solid #3483FA', paddingBottom: 2, transition: 'opacity 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
                    Comprar en Mercado Libre →
                  </a>
                  <a href="https://www.amazon.com/lecciones-precios-vida-real-sorprendentes-ebook/dp/B071R7GCTV/" target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, color: 'var(--blue)', textDecoration: 'none', borderBottom: '1.5px solid var(--blue)', paddingBottom: 2, transition: 'opacity 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
                    Comprar en Amazon →
                  </a>
                </div>
              </div>
            </div>

            {/* Los Secretos de los Precios */}
            <div className="reveal delay-200" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '28px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 64, height: 88, borderRadius: 4, flexShrink: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={libroSecretosPrecios} alt="Los Secretos de los Precios" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 13, color: 'var(--gray-400)', marginBottom: 2 }}>Ariel Baños</div>
                <h3 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 16, color: 'var(--charcoal)', lineHeight: 1.25, marginBottom: 8 }}>Los Secretos de los Precios</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 14 }}>¿Qué hace que algo parezca caro o barato? ¿Por qué algunos precios terminan en nueve? Una exploración profunda de la lógica oculta detrás de las decisiones de precio.</p>
                <a href="https://www.amazon.com/Los-Secretos-los-precios-Spanish-ebook/dp/B008HFC5YO" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, color: 'var(--blue)', textDecoration: 'none', borderBottom: '1.5px solid var(--blue)', paddingBottom: 2, transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
                  Comprar en Amazon →
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
      <style>{`
        @media (max-width: 680px) { .libros-prev { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Shared newsletter form (Mailchimp POST) ──────────────────────────────────
const MC_ACTION = 'https://fijaciondeprecios.us7.list-manage.com/subscribe/post?u=33abf286df569b7a9f912e2da&id=f6e1eafbe6'

function NewsletterForm({ onDark = true }: { onDark?: boolean }) {
  const fg     = onDark ? '#fff' : 'var(--charcoal)'
  const border = (focused: boolean, err: boolean) =>
    err     ? (onDark ? '1.5px solid rgba(255,180,180,0.9)' : '1.5px solid var(--red)')
    : focused ? (onDark ? '1.5px solid rgba(255,255,255,0.8)' : '1.5px solid var(--blue)')
    :           (onDark ? '1.5px solid rgba(255,255,255,0.28)' : '1.5px solid var(--border)')
  const bg = (focused: boolean) =>
    onDark ? (focused ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.10)') : '#fff'

  const [focusedKey, setFocusedKey] = useState<string | null>(null)
  const [emailErr,   setEmailErr]   = useState(false)

  const field = (key: string, isEmail = false): React.CSSProperties => ({
    fontFamily: 'Inter', fontSize: 14, padding: '11px 15px',
    borderRadius: 4, outline: 'none', width: '100%',
    color: fg, boxSizing: 'border-box' as const,
    background: bg(focusedKey === key),
    border: border(focusedKey === key, isEmail && emailErr),
    transition: 'border-color 0.18s, background 0.18s',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const emailEl = e.currentTarget.querySelector<HTMLInputElement>('[name="EMAIL"]')
    if (!emailEl?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
      e.preventDefault(); setEmailErr(true)
    }
  }

  return (
    <form action={MC_ACTION} method="post" target="_blank" noValidate
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <input type="text" name="FNAME" placeholder="Tu nombre (opcional)"
        onFocus={() => setFocusedKey('name')} onBlur={() => setFocusedKey(null)}
        style={field('name')} />
      <input type="email" name="EMAIL" placeholder="Tu email *" required
        onFocus={() => setFocusedKey('email')} onBlur={() => setFocusedKey(null)}
        onChange={() => setEmailErr(false)}
        style={field('email', true)} />
      {emailErr && <p style={{ fontFamily: 'Inter', fontSize: 12, color: onDark ? 'rgba(255,210,210,1)' : 'var(--red)', margin: '2px 0 0' }}>Ingresá un email válido.</p>}
      {/* Mailchimp honeypot — must stay hidden */}
      <div style={{ position: 'absolute', left: -5000 }} aria-hidden>
        <input type="text" name="b_33abf286df569b7a9f912e2da_f6e1eafbe6" tabIndex={-1} defaultValue="" readOnly />
      </div>
      <button type="submit"
        style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 14,
          color: onDark ? 'var(--red)' : '#fff',
          background: onDark ? '#fff' : 'var(--red)',
          padding: '13px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
          letterSpacing: '0.02em', marginTop: 6,
          transitionProperty: 'transform, box-shadow', transitionDuration: '0.15s' }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)' }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}>
        Suscribirme al newsletter
      </button>
      <p style={{ fontFamily: 'Inter', fontSize: 11, color: onDark ? 'rgba(255,255,255,0.45)' : 'var(--gray-400)', marginTop: 6, lineHeight: 1.55, textAlign: 'center' as const }}>
        Al suscribirte aceptás recibir novedades de Fijación de Precios. Podés darte de baja cuando quieras.
      </p>
    </form>
  )
}

// ─── Newsletter section ───────────────────────────────────────────────────────
function NewsletterSection() {
  return (
    <section id="newsletter" style={{ background: 'var(--red)', padding: '64px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
            Newsletter de Fijación de Precios
          </div>
          <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(22px, 3.5vw, 34px)', color: '#fff', lineHeight: 1.12, marginBottom: 12 }}>
            Ideas de gestión de precios para cobrar mejor y competir por valor
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65, maxWidth: 400, margin: '0 auto 28px' }}>
            Suscríbete gratis al newsletter de Ariel Baños y recibe contenidos prácticos sobre Pricing y rentabilidad.
          </p>
        </div>
        <div className="reveal delay-100" style={{ textAlign: 'center' as const }}>
          <a href="https://fijaciondeprecios.us7.list-manage.com/subscribe?u=33abf286df569b7a9f912e2da&id=f6e1eafbe6"
            target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 16, color: 'var(--red)', background: '#fff', padding: '15px 36px', borderRadius: 4, textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.2s, transform 0.15s' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = '0.9'; el.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = '1'; el.style.transform = 'none' }}>
            Suscribirme al newsletter
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Workshops home section ───────────────────────────────────────────────────
function Workshops() {
  const beneficios = [
    'Reuniones personalizadas con Ariel Baños.',
    'Análisis de situaciones reales de la empresa.',
    'Debates y ejercitaciones prácticas.',
    'Herramientas aplicables inmediatamente.',
    'Reporte ejecutivo con acciones recomendadas.',
  ]

  return (
    <section id="workshops" style={{ background: 'var(--white)', padding: '96px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <h2 className="reveal" style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--blue)', lineHeight: 1.05, marginBottom: 48, letterSpacing: '-0.01em' }}>Workshops para empresas</h2>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start', marginBottom: 64 }}>
          <div>
            <h2 className="reveal" style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 46px)', color: 'var(--charcoal)', lineHeight: 1.08, marginBottom: 22 }}>
              Cambie la conversación<br />de precio a valor
            </h2>
            <p className="reveal delay-100" style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 22 }}>
              ¿Su empresa enfrenta pedidos constantes de descuentos? ¿Su equipo comercial necesita mejores herramientas para defender el valor de la propuesta?
            </p>
            <p className="reveal delay-200" style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 0 }}>
              A través de workshops in-company personalizados, Ariel Baños acompaña a empresas y equipos comerciales a fortalecer su estrategia de precios, mejorar sus márgenes y evitar competir únicamente por precio.
            </p>
          </div>
          <div className="reveal delay-200" style={{ paddingTop: 6 }}>
            <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 18 }}>¿Qué incluye cada workshop?</div>
            {beneficios.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 13 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--blue-subtle)', border: '1.5px solid var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)' }} />
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="reveal" style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 8, padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' as const }}>
          <div>
            <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 16, color: 'var(--charcoal)', marginBottom: 6 }}>
              Workshops diseñados según los desafíos reales de su empresa
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)' }}>
              Modalidad presencial o virtual para equipos directivos, comerciales, de marketing y Pricing.
            </div>
          </div>
          <a href={WS_FORM} target="_blank" rel="noopener noreferrer" style={{ ...btn.primary, fontSize: 14, padding: '13px 26px', flexShrink: 0 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red-light)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red)' }}>
            Consultar por un workshop
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimoniosData = [
  {
    quote: 'Ariel nos abrió los ojos sobre lo poco que trabajábamos el precio, siendo una de las principales claves para que los negocios funcionen correctamente.',
    name: 'Leopoldo Santorromán',
    role: 'Presidente de AFCO y CEO de Cartonajes Santorromán',
    location: 'Madrid, España',
    flagCode: 'es',
    flagAlt: 'España',
  },
  {
    quote: 'Necesitábamos una voz experta que nos ayudara a redefinir nuestra estrategia de Pricing. Logramos mejorar nuestro posicionamiento, los márgenes y el resultado global de la empresa.',
    name: 'Carlos Chimeno',
    role: 'Director Comercial de Essen',
    location: 'Argentina',
    flagCode: 'ar',
    flagAlt: 'Argentina',
  },
  {
    quote: 'Ariel logra captar e integrar a los participantes, y generar conciencia sobre la importancia del verdadero valor y precio de los productos.',
    name: 'Gina Muñoz Aguirre',
    role: 'Jefa de Recursos Humanos de RC Más Químicos',
    location: 'Ciudad de México, México',
    flagCode: 'mx',
    flagAlt: 'México',
  },
]

function TestimonialsSection() {
  return (
    <section style={{ background: 'var(--gray-50)', padding: '80px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="reveal" style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--blue)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Testimonios</div>
          <h2 className="reveal" style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', color: 'var(--charcoal)', lineHeight: 1.12 }}>Lo que dicen nuestros clientes</h2>
        </div>
        <div className="three-col-t" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {testimoniosData.map((t, i) => (
            <div key={i} className={`reveal delay-${(i+1)*100}`} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '32px 30px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 40, color: 'var(--blue)', lineHeight: 1, marginBottom: 4, opacity: 0.3 }}>"</div>
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{t.quote}</p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18 }}>
                <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 14, color: 'var(--charcoal)', marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: 4 }}>{t.role}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <img src={`https://hatscripts.github.io/circle-flags/flags/${t.flagCode}.svg`} alt={t.flagAlt} width={18} height={18} style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--gray-400)' }}>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .three-col-t { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 580px) { .three-col-t { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="sobre-mi" style={{ background: 'var(--gray-50)', padding: '96px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 80, alignItems: 'center' }}>

          <div className="reveal-left">
            <div style={{ position: 'relative', maxWidth: 340 }}>
              <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={arielPhoto2} alt="Ariel Baños" style={{ width: '100%', height: 460, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -20, right: -20, background: 'var(--red)', padding: '18px 22px', borderRadius: 6, maxWidth: 200, boxShadow: '0 8px 24px rgba(229,25,42,0.3)' }}>
                <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 28, color: '#fff', lineHeight: 1 }}>"</div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.95)', lineHeight: 1.5 }}>El precio es el único elemento del marketing mix que genera ingresos.</div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'var(--charcoal)', lineHeight: 1, marginBottom: 10 }}>Ariel Baños</div>
            <h2 style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 'clamp(18px, 2vw, 26px)', color: 'var(--blue)', lineHeight: 1.2, marginBottom: 24 }}>
              El mayor especialista en precios del mercado hispanohablante
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 18 }}>
              Economista con más de 25 años de experiencia en estrategias de pricing. Autor de tres libros sobre fijación de precios, docente en las principales escuelas de negocios de América Latina y España, y consultor para empresas líderes en más de 30 países.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 36 }}>
              Fundador de Fijaciondeprecios.com, la primera plataforma en español especializada en pricing estratégico para empresas.
            </p>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 36 }}>
              {[['3','Libros'],['30+','Países'],['500+','Empresas']].map(([n,l],i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 32, color: 'var(--blue)' }}>{n}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--gray-400)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Logo carousel ────────────────────────────────────────────────────────────
// Logo carousel items — images where available, text otherwise
type CarouselItem = { name: string } & ({ kind: 'img'; src: string; alt: string } | { kind: 'text' })

const carouselItems: CarouselItem[] = [
  { kind: 'img',  name: 'Unilever',                   src: logoUnilever,    alt: 'Logo de Unilever' },
  { kind: 'img',  name: 'Universidad de San Andrés',  src: logoUdesa,       alt: 'Logo de Universidad de San Andrés' },
  { kind: 'img',  name: 'Univ. Torcuato Di Tella',    src: logoTorcuato,    alt: 'Logo de Universidad Torcuato Di Tella' },
  { kind: 'img',  name: 'UNR',                        src: logoUnr,         alt: 'Logo de Universidad Nacional de Rosario' },
  { kind: 'img',  name: 'Toyota',                     src: logoToyota,      alt: 'Logo de Toyota' },
  { kind: 'img',  name: 'Bancolombia',                src: logoBancolombia, alt: 'Logo de Bancolombia' },
  { kind: 'img',  name: 'Avon',                       src: logoAvon,        alt: 'Logo de Avon' },
  { kind: 'img',  name: 'CAT',                        src: logoCat,         alt: 'Logo de CAT' },
  { kind: 'img',  name: 'Crucianelli',                src: logoCrucianelli, alt: 'Logo de Crucianelli' },
  { kind: 'img',  name: 'TÜV Rheinland',             src: logoTuv,         alt: 'Logo de TÜV Rheinland' },
  { kind: 'img',  name: 'Vistage',                    src: logoVistage,     alt: 'Logo de Vistage' },
  { kind: 'img',  name: 'Cambridge Assessment',       src: logoCambridge,   alt: 'Logo de Cambridge Assessment' },
]

function LogoCarousel() {
  const track = [...carouselItems, ...carouselItems]
  return (
    <section style={{ background: 'var(--white)', minHeight: 300, padding: '60px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          Empresas, universidades e instituciones que confían en Ariel Baños
        </div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'ticker 42s linear infinite', alignItems: 'center', height: 110 }}>
          {track.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 220, height: 110,
              borderRight: '1px solid var(--border)', flexShrink: 0,
            }}>
              {item.kind === 'img' ? (
                <img src={item.src} alt={item.alt}
                  style={{
                    maxHeight: item.name === 'Universidad de San Andrés' ? 58 : 60,
                    maxWidth: item.name === 'Universidad de San Andrés' ? 130 : 180,
                    width: 'auto', height: 'auto', objectFit: 'contain', display: 'block',
                    mixBlendMode: 'multiply' as const,
                  }} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WordPress integration ────────────────────────────────────────────────────
// Fuente de los artículos: WordPress REST API del cliente.
// El admin de WP sigue siendo la única fuente de verdad: cargar/editar/borrar
// posts allí se refleja acá automáticamente, sin tocar código ni volver a
// desplegar el sitio.
const WP_API_BASE = 'https://www.fijaciondeprecios.com/wp-json/wp/v2'

interface WPTerm { id: number; name: string; taxonomy: string }
interface WPMedia { source_url: string; alt_text?: string }
interface WPPost {
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[]
    'wp:term'?: WPTerm[][]
  }
}

interface Article {
  id: string        // slug de WordPress — se usa también en la URL/estado interno
  cat: string
  catColor: string
  title: string
  excerpt: string
  content: string    // HTML ya renderizado por WordPress (post.content.rendered)
  date: string
  img: string | null // URL de la imagen destacada, o null si el post no tiene una
}

// Paleta de colores del sitio para asignar a categorías de WordPress en el
// orden en que van apareciendo (ciclo, por si hay más de 3 categorías).
const CATEGORY_COLOR_PALETTE = ['var(--blue)', 'var(--red)', 'var(--gray-600)']

function decodeHTMLEntities(text: string): string {
  const el = document.createElement('textarea')
  el.innerHTML = text
  return el.value
}

function stripHTMLTags(html: string): string {
  const el = document.createElement('div')
  el.innerHTML = html
  return (el.textContent || el.innerText || '').replace(/\s+/g, ' ').trim()
}

function formatDateEs(dateStr: string): string {
  const d = new Date(dateStr)
  const formatted = d.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

function mapWordPressPost(post: WPPost, catColorMap: Map<string, string>): Article {
  const terms = (post._embedded?.['wp:term'] || []).flat()
  const category = terms.find((t) => t.taxonomy === 'category')
  const catName = category ? decodeHTMLEntities(category.name) : 'General'

  if (!catColorMap.has(catName)) {
    catColorMap.set(catName, CATEGORY_COLOR_PALETTE[catColorMap.size % CATEGORY_COLOR_PALETTE.length])
  }

  const media = post._embedded?.['wp:featuredmedia']?.[0]

  console.log('POST:', post.title.rendered)
  console.log('IMAGE:', media?.source_url)

  const rawExcerpt = stripHTMLTags(post.excerpt.rendered)
    .replace(/\[[…&#8230;]+\]\s*$/, '') // quita el "[…]" final que agrega WP
    .trim()

  return {
    id: post.slug,
    cat: catName,
    catColor: catColorMap.get(catName)!,
    title: decodeHTMLEntities(post.title.rendered),
    excerpt: rawExcerpt,
    content: post.content.rendered,
    date: formatDateEs(post.date),
    img: media?.source_url || null,
  }
}

// Hook que trae los posts publicados desde WordPress.
// `_embed=1` le pide a WP que incluya, en la misma respuesta, la imagen
// destacada y las categorías de cada post (evita hacer N llamadas extra).
function useWordPressPosts() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${WP_API_BASE}/posts?per_page=30&_embed=1`)
        if (!res.ok) throw new Error(`WordPress respondió ${res.status}`)
        const data: WPPost[] = await res.json()
        const catColorMap = new Map<string, string>()
        const mapped = data.map((post) => mapWordPressPost(post, catColorMap))
        if (!cancelled) setArticles(mapped)
      } catch (err) {
        console.error('Error al cargar artículos de WordPress:', err)
        if (!cancelled) setError('No pudimos cargar los artículos en este momento. Probá recargar la página en unos minutos.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { articles, loading, error }
}

// ─── Article skeleton (loading state) ─────────────────────────────────────────
function ArticleCardSkeleton() {
  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', background: '#fff' }}>
      <div style={{ height: 200, background: 'var(--gray-100)' }} />
      <div style={{ padding: '22px 22px 28px' }}>
        <div style={{ width: 90, height: 18, borderRadius: 2, background: 'var(--gray-100)', marginBottom: 14 }} />
        <div style={{ width: '85%', height: 16, borderRadius: 2, background: 'var(--gray-100)', marginBottom: 10 }} />
        <div style={{ width: '95%', height: 13, borderRadius: 2, background: 'var(--gray-100)', marginBottom: 8 }} />
        <div style={{ width: '70%', height: 13, borderRadius: 2, background: 'var(--gray-100)' }} />
      </div>
    </div>
  )
}

// ─── Article detail page ──────────────────────────────────────────────────────
function ArticleDetailPage({ article, loading, error, onBack }: { article: Article | undefined; loading: boolean; error: string | null; onBack: () => void }) {
  useEffect(() => { window.scrollTo({ top: 0 }) }, [article?.id])

  const catBg = (color: string) =>
    color === 'var(--blue)' ? 'var(--blue-subtle)' : color === 'var(--red)' ? 'var(--red-subtle)' : 'var(--gray-100)'

  if (loading) {
    return (
      <section style={{ background: '#fff', padding: '96px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-400)' }}>Cargando artículo…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section style={{ background: '#fff', padding: '96px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', marginBottom: 20 }}>{error}</p>
        <button onClick={onBack} style={{ ...btn.secondary }}>Volver a Artículos</button>
      </section>
    )
  }

  if (!article) {
    return (
      <section style={{ background: '#fff', padding: '96px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', marginBottom: 20 }}>No encontramos este artículo.</p>
        <button onClick={onBack} style={{ ...btn.secondary }}>Volver a Artículos</button>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '64px 0 56px', position: 'relative', overflow: 'hidden' }}>
        {/* Article illustration as background */}
        {article.img && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', pointerEvents: 'none' }}>
            <img src={article.img} alt="" referrerPolicy="no-referrer" aria-hidden="true" style={{ height: '100%', maxWidth: '50%', objectFit: 'contain', opacity: 0.12, filter: 'brightness(2)' }} />
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div className="art-content" style={{ position: 'relative' }}>
          <button onClick={onBack}
            style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 7H2M5.5 10l-3.5-3 3.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Artículos de Pricing
          </button>
          <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: article.catColor === 'var(--gray-600)' ? 'rgba(255,255,255,0.7)' : article.catColor, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '3px 9px', borderRadius: 2, display: 'inline-block', marginBottom: 18 }}>{article.cat}</span>
          <h1 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>{article.title}</h1>
          <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Ariel Baños · {article.date}</div>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: '#fff', padding: '56px 0 80px' }}>
        <div className="art-content">
          <div style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-800)', lineHeight: 1.85 }}>
            <style>{`
              .art-body h1, .art-body h2, .art-body h3 { font-family: 'Archivo', sans-serif; font-weight: 800; color: var(--charcoal); margin: 40px 0 12px; line-height: 1.25; letter-spacing: -0.01em; }
              .art-body h2 { font-size: 22px; }
              .art-body h3 { font-size: 19px; }
              .art-body p  { margin-bottom: 18px; }
              .art-body ul, .art-body ol { padding-left: 22px; margin-bottom: 18px; }
              .art-body li { margin-bottom: 7px; }
              .art-body blockquote { margin: 28px 0; padding: 16px 20px; border-left: 3px solid var(--blue); background: var(--blue-subtle); border-radius: 0 4px 4px 0; font-style: italic; color: var(--gray-800); }
              .art-body blockquote p { margin-bottom: 0; }
              .art-body strong { font-weight: 700; color: var(--charcoal); }
              .art-body a { color: var(--blue); }
              .art-body hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }
              .art-body img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0 24px; display: block; }
              .art-body figure { margin: 0 0 24px; }
              .art-body figcaption { font-size: 13px; color: var(--gray-400); text-align: center; margin-top: 8px; }
            `}</style>
            <div className="art-body" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Back link */}
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
            <button onClick={onBack}
              style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 14, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 7H2M5.5 10l-3.5-3 3.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Volver a Artículos de Pricing
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

  function ArticlesPage({ articles, loading, error, onBack, onArticle }: {
      articles: Article[];
      loading: boolean;
      error: string | null;
      onBack: () => void;
      onArticle: (article: Article) => void
    }) {
  const [activeCat, setActiveCat] = useState('Todos')

  const featured = articles[0]
  const rest = articles.slice(1)
  const cats = ['Todos', ...Array.from(new Set(articles.map((a) => a.cat)))]
  const filtered = activeCat === 'Todos' ? rest : rest.filter((a) => a.cat === activeCat)

  const catBg = (color: string) =>
    color === 'var(--blue)' ? 'var(--blue-subtle)' : color === 'var(--red)' ? 'var(--red-subtle)' : 'var(--gray-100)'

  return (
    <>
      {/* ── Hero strip ── */}
      <section style={{ background: 'var(--navy)', padding: '64px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
          <button onClick={onBack}
            style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 7H2M5.5 10l-3.5-3 3.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Volver al inicio
          </button>
          <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Recursos gratis</div>
          <h1 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(30px, 4vw, 52px)', color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            Artículos de Pricing
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 520 }}>
            Análisis, estrategias y casos reales para mejorar sus decisiones de precios y aumentar la rentabilidad.
          </p>
        </div>
      </section>

      {/* ── Error state ── */}
      {error && (
        <section style={{ background: 'var(--white)', padding: '48px 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)' }}>{error}</p>
          </div>
        </section>
      )}

      {/* ── Featured article ── */}
      {!error && (loading || featured) && (
        <section style={{ background: 'var(--white)', padding: '64px 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 20 }}>Artículo destacado</div>
            {loading ? (
              <div style={{ height: 340, borderRadius: 12, background: 'var(--gray-50)', border: '1px solid var(--border)' }} />
            ) : featured ? (
              <div className="art-featured" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ height: 340, overflow: 'hidden', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                  {featured.img ? (
                    <img src={featured.img} alt={featured.title} referrerPolicy="no-referrer" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.5s', display: 'block' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'none' }} />
                  ) : (
                    <CaratoLogo height={64} />
                  )}
                </div>
                <div style={{ padding: '40px 44px 40px 0' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '3px 9px', borderRadius: 2, background: 'var(--blue-subtle)', display: 'inline-block', marginBottom: 16 }}>{featured.cat}</span>
                  <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'var(--charcoal)', lineHeight: 1.2, marginBottom: 14 }}>{featured.title}</h2>
                  <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 24 }}>{featured.excerpt}</p>
                  <div style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--gray-400)', marginBottom: 24 }}>{featured.date}</div>
                  <button onClick={() => onArticle(featured)} style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 14, color: 'var(--blue)', background: 'none', border: 'none', borderBottom: '1.5px solid var(--blue)', cursor: 'pointer', padding: '0 0 3px', transition: 'opacity 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}>
                    Leer artículo completo →
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* ── Grid ── */}
      <section style={{ background: 'var(--gray-50)', padding: '72px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          {/* Category filters */}
          {!loading && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 40 }}>
              {cats.map((c) => (
                <button key={c} onClick={() => setActiveCat(c)}
                  style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, padding: '7px 16px', borderRadius: 4, border: '1.5px solid', borderColor: activeCat === c ? 'var(--blue)' : 'var(--border)', color: activeCat === c ? '#fff' : 'var(--gray-600)', background: activeCat === c ? 'var(--blue)' : '#fff', cursor: 'pointer', transition: 'all 0.18s' }}>
                  {c}
                </button>
              ))}
            </div>
          )}
          <div className="art-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)
            ) : filtered.length === 0 && !error ? (
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-400)', gridColumn: '1 / -1' }}>Todavía no hay artículos publicados en esta categoría.</p>
            ) : (
              filtered.map((a) => (
                <article key={a.id} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', transition: 'transform 0.25s, box-shadow 0.25s', display: 'flex', flexDirection: 'column' }}
                  onClick={() => onArticle(a)}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 36px rgba(0,0,0,0.08)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}>
                  <div style={{ height: 200, overflow: 'hidden', background: 'var(--gray-50)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    {a.img ? (
                      <img src={`${a.img}`} alt={a.title} referrerPolicy="no-referrer" onLoad={() => console.log('IMAGEN OK:', a.img)}
                        onError={(e) => {
                          console.error('IMAGEN ERROR:', {
                            url: e.currentTarget.src,
                            status: e.currentTarget.complete,
                            naturalWidth: e.currentTarget.naturalWidth
                          })
                        }}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.4s', display: 'block' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'none' }} />
                    ) : (
                      <CaratoLogo height={44} />
                    )}
                  </div>
                  <div style={{ padding: '22px 22px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: a.catColor, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '3px 9px', borderRadius: 2, background: catBg(a.catColor) }}>{a.cat}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--gray-400)' }}>{a.date}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 16, color: 'var(--charcoal)', lineHeight: 1.25, marginBottom: 10 }}>{a.title}</h3>
                    <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65, flex: 1 }}>{a.excerpt}</p>
                    <button onClick={(e) => { e.stopPropagation(); onArticle(a) }} style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 13, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5, marginTop: 18, transition: 'opacity 0.2s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}>
                      Leer más <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Newsletter strip ── */}
      <section style={{ background: 'var(--white)', padding: '64px 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--blue)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Newsletter</div>
          <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', color: 'var(--charcoal)', lineHeight: 1.12, marginBottom: 14 }}>
            Recibí nuevos artículos en tu email
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 32 }}>
            Suscribite al newsletter de Ariel Baños y recibí contenidos prácticos sobre Pricing, rentabilidad y comunicación de valor.
          </p>
          <NewsletterForm onDark={false} />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .art-featured { grid-template-columns: 1fr !important; }
          .art-featured > div:first-child { height: 240px !important; }
          .art-featured > div:last-child { padding: 28px 28px !important; }
          .art-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) { .art-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}

// ─── Resources section (previously News) ─────────────────────────────────────
function ResourcesSection({ onNavigate }: { onNavigate: (target: string) => void }) {
  return (
    <section id="recursos" style={{ background: 'var(--gray-50)', padding: '80px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="reveal">
            <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--charcoal)', lineHeight: 1.1, marginBottom: 12 }}>
              Recursos gratis
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto' }}>
              Ideas, herramientas y contenidos para tomar mejores decisiones de precios.
            </p>
          </div>
        </div>

        <div className="recursos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>

          {/* ── Artículos ── */}
          <div className="reveal delay-100" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16, transition: 'box-shadow 0.2s, transform 0.2s' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; el.style.transform = 'translateY(-3px)' }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.transform = 'none' }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--blue-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Artículos</div>
              <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 18, color: 'var(--charcoal)', lineHeight: 1.25, marginBottom: 10 }}>Análisis y estrategias de pricing</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65 }}>
                Casos reales, reflexiones y herramientas para mejorar sus decisiones de precios.
              </p>
            </div>
            <button onClick={() => onNavigate('articles')}
              style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 14, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto', padding: 0, transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.75' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}>
              Ver artículos <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* ── Descargable ── */}
          <div className="reveal delay-200" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16, transition: 'box-shadow 0.2s, transform 0.2s' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; el.style.transform = 'translateY(-3px)' }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.transform = 'none' }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--red-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Descargable</div>
              <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 18, color: 'var(--charcoal)', lineHeight: 1.25, marginBottom: 10 }}>Guía gratuita del método CARato®</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65 }}>
                Descubrí cómo subir precios sin perder atractivo comercial, con ejemplos y herramientas prácticas.
              </p>
            </div>
            <a href="https://mailchi.mp/fijaciondeprecios/carato" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 14, color: 'var(--red)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.75' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
              Descargar gratis <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

          {/* ── Newsletter ── */}
          <div className="reveal delay-300" style={{ background: 'var(--navy)', borderRadius: 10, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Newsletter</div>
              <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 18, color: '#fff', lineHeight: 1.25, marginBottom: 10 }}>Ideas para cobrar mejor</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
                Contenidos prácticos sobre Pricing, rentabilidad y comunicación de valor.
              </p>
            </div>
            <a href="https://fijaciondeprecios.us7.list-manage.com/subscribe?u=33abf286df569b7a9f912e2da&id=f6e1eafbe6" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 14, color: '#fff', background: 'var(--red)', padding: '11px 18px', borderRadius: 4, textDecoration: 'none', textAlign: 'center' as const, transition: 'background 0.18s', marginTop: 'auto', display: 'block' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red-light)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--red)' }}>
              Suscribirme gratis
            </a>
          </div>

        </div>
      </div>
      <style>{`
        @media (max-width: 860px) { .recursos-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .recursos-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="contacto" style={{ background: 'var(--navy)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px', textAlign: 'center', position: 'relative' }}>
        <div className="reveal">
          {/* No CARato logo here — eliminado por brief */}
          <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#fff', lineHeight: 1.1, marginBottom: 18 }}>
            ¿Listo para dejar de competir sólo por precio?
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 44 }}>
            Cuéntenos sobre su empresa y analizamos juntos cómo implementar una estrategia de precios que defienda su margen y genere más valor para sus clientes.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <a href={WS_FORM} target="_blank" rel="noopener noreferrer" style={{ ...btn.primary, fontSize: 16, padding: '16px 40px' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--red-light)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--red)'; el.style.transform = 'none' }}>
              Solicitar un workshop
            </a>
            <a href="https://mail.google.com/mail/u/0/?fs=1&to=info@fijaciondeprecios.com&tf=cm" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.8)', padding: '16px 40px', borderRadius: 4, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(255,255,255,0.5)'; el.style.color = '#fff' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = 'rgba(255,255,255,0.8)' }}>
              Contactar directamente
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Floating buttons ────────────────────────────────────────────────────────
function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const baseBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '50%', border: 'none', cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.25s',
    textDecoration: 'none',
    flexShrink: 0,
  }

  return (
    <>
      <style>{`
        .float-container { right: 16px; bottom: 16px; }
        @media (max-width: 768px) { .float-container { right: 12px; bottom: 12px; } }
      `}</style>
      {/* Contenedor vertical fijo: Volver arriba encima, WhatsApp abajo */}
      <div className="float-container" style={{
        position: 'fixed', zIndex: 300,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      }}>
        {/* Scroll to top */}
        <button
          aria-label="Volver arriba"
          onClick={scrollToTop}
          style={{
            ...baseBtn,
            width: 42, height: 42,
            background: 'var(--navy)',
            boxShadow: '0 4px 16px rgba(13,27,46,0.35)',
            opacity: showTop ? 1 : 0,
            pointerEvents: showTop ? 'auto' : 'none',
            color: '#fff',
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'scale(1.1)'; el.style.background = 'var(--blue)' }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'scale(1)'; el.style.background = 'var(--navy)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 14V4M4.5 8.5l4.5-4.5 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* WhatsApp */}
        <a href="https://wa.me/5493416022290?text=Hola%2C%20quisiera%20consultar%20sobre%20los%20workshops%20de%20Ariel%20Ba%C3%B1os"
          target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp"
          style={{
            ...baseBtn,
            width: 56, height: 56,
            background: '#25D366', color: '#fff',
            boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'scale(1.1)'; el.style.boxShadow = '0 6px 28px rgba(37,211,102,0.55)' }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'scale(1)'; el.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const socialLinks = [
  { label: 'LinkedIn',  icon: <IconLinkedIn />,  href: 'https://www.linkedin.com/in/arielbanos/' },
  { label: 'YouTube',   icon: <IconYouTube />,   href: 'https://www.youtube.com/c/ArielBa%C3%B1os' },
  { label: 'Instagram', icon: <IconInstagram />, href: 'https://www.instagram.com/arielbanos' },
]

const footerExternalMap: Record<string, string> = {
  'Descargables': 'https://mailchi.mp/fijaciondeprecios/carato',
  'Newsletter': 'https://fijaciondeprecios.us7.list-manage.com/subscribe?u=33abf286df569b7a9f912e2da&id=f6e1eafbe6',
}

// Footer nav: label → section target (must match allNavItems targets)
const footerNavMap: Record<string, string> = {
  'Inicio': 'inicio', 'Libros': 'libro', 'Workshops': 'workshops',
  'Sobre mí': 'sobre-mi', 'Contacto': 'contacto', 'Artículos': 'articles',
}

function Footer({ onNavigate }: { onNavigate: (target: string) => void }) {
  return (
    <footer style={{ background: 'var(--white)', padding: '64px 0 32px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 52 }}>

          {/* Brand */}
          <div>
            <button onClick={() => onNavigate('inicio')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block', marginBottom: 16 }}>
              <img src={logoFdp} alt="FijaciondePrecios.com" style={{ height: 80, width: 'auto', display: 'block' }} />
            </button>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              La plataforma de referencia en estrategias de precios para el mercado hispanohablante.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ color: 'var(--gray-400)', padding: '8px', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s, border-color 0.2s, background 0.2s', textDecoration: 'none' }}
                  onFocus={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.outline = '2px solid var(--blue)'; el.style.outlineOffset = '2px' }}
                  onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = 'none' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = 'var(--blue)'; el.style.borderColor = 'var(--blue)'; el.style.background = 'var(--blue-subtle)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = 'var(--gray-400)'; el.style.borderColor = 'var(--border)'; el.style.background = 'transparent' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Navegación', links: ['Inicio','Libros','Workshops','Sobre mí','Contacto'] },
            { title: 'Recursos',   links: ['Artículos','Newsletter','Descargables'] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 12, color: 'var(--gray-400)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 18 }}>{col.title}</div>
              {col.links.map((n) => {
                const target = footerNavMap[n]
                return target ? (
                  <button key={n} onClick={() => onNavigate(target)}
                    style={{ display: 'block', fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', background: 'none', border: 'none', padding: 0, marginBottom: 11, cursor: 'pointer', textAlign: 'left' as const, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--charcoal)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-600)' }}>
                    {n}
                  </button>
                ) : (
                    <a key={n} href={footerExternalMap[n] || '#'} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'block', fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', textDecoration: 'none', marginBottom: 11, transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--charcoal)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gray-600)' }}>
                      {n}
                    </a>
                  )
              })}
            </div>
          ))}

          <div>
            <div style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 12, color: 'var(--gray-400)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 18 }}>Contacto</div>
            <div style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', marginBottom: 8 }}><a href="https://mail.google.com/mail/u/0/?fs=1&to=info@fijaciondeprecios.com&tf=cm" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gray-600)', textDecoration: 'none' }}>info@fijaciondeprecios.com</a></div>
            <div style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)' }}>Argentina</div>
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--gray-400)', textAlign: 'center' }}>© 2026 Fijaciondeprecios.com · Ariel Baños · Todos los derechos reservados</span>
          <a href="https://axyoma.com.ar/" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--blue)', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
            Desarrollado por Axyoma
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
type Page = 'home' | 'articles' | 'article'

export default function App() {
  useReveal()
  const [page, setPage] = useState<Page>(() => {
  const path = window.location.pathname

  if (path === '/' || path === '/index.html') {
    return 'home'
  }

  return 'article'
})

const [articleId, setArticleId] = useState<string | null>(() => {
  const path = window.location.pathname

  if (path === '/' || path === '/index.html') {
    return null
  }

  return path.replace(/^\/|\/$/g, '')
})
  const pendingScroll = useRef<string | null>(null)

  // Posts de WordPress: se traen una única vez al montar la app y se
  // comparten entre la grilla de Artículos y el detalle de cada uno.
  const { articles, loading: articlesLoading, error: articlesError } = useWordPressPosts()

  useEffect(() => {
    if (page === 'home' && pendingScroll.current) {
      const id = pendingScroll.current
      pendingScroll.current = null
      setTimeout(() => {
        if (id === 'inicio') window.scrollTo({ top: 0, behavior: 'smooth' })
        else { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }
      }, 80)
    }
  }, [page])

  const navigateTo = (target: string) => {
    if (target === 'articles') {
      setPage('articles')
      window.scrollTo({ top: 0 })
      return
    }
    if (page === 'home') {
      if (target === 'inicio') window.scrollTo({ top: 0, behavior: 'smooth' })
      else { const el = document.getElementById(target); if (el) el.scrollIntoView({ behavior: 'smooth' }) }
    } else {
      pendingScroll.current = target === 'inicio' ? null : target
      setPage('home')
      window.scrollTo({ top: 0 })
    }
  }

const openArticle = (article: Article) => {
  setArticleId(article.id)
  setPage('article')
  window.history.pushState({}, '', `/${article.id}/`)
  window.scrollTo({ top: 0 })
}

  const backToArticles = () => {
    setPage('articles')
    window.scrollTo({ top: 0 })
  }

  const currentArticle = articleId ? articles.find((a) => a.id === articleId) : undefined

  return (
    <>
      <Header onNavigate={navigateTo} />
      {page === 'home' ? (
        <main>
          <Hero />
          <AuthorityStrip />
          <CaratoSection />
          <BookSection />
          <NewsletterSection />
          <Workshops />
          <TestimonialsSection />
          <About />
          <LogoCarousel />
          <ResourcesSection onNavigate={navigateTo} />
          <FinalCTA />
        </main>
      ) : page === 'article' && articleId ? (
        <main style={{ paddingTop: 88 }}>
          <ArticleDetailPage article={currentArticle} loading={articlesLoading} error={articlesError} onBack={backToArticles} />
        </main>
      ) : (
        <main style={{ paddingTop: 88 }}>
          <ArticlesPage articles={articles} loading={articlesLoading} error={articlesError} 
          onBack={() => navigateTo('inicio')} onArticle={openArticle} />
        </main>
      )}
      <Footer onNavigate={navigateTo} />

      {/* ── Floating buttons: scroll-to-top + WhatsApp ── */}
      <FloatingButtons />
    </>
  )
}