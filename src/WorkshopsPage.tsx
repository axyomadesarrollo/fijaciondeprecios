import { useState } from 'react'
import arielPhoto from '@/imports/Foto_perfil_Ariel_Ba_os_-_Optimizada.jpg'

const WORKSHOP_HERO_IMG = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600'

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
}

// ─── Contact form modal ───────────────────────────────────────────────────────
function ContactForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    nombre: '', empresa: '', cargo: '', pais: '', email: '',
    telefono: '', participantes: '', modalidad: '', workshop: '', mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nombre.trim())  e.nombre  = 'Requerido'
    if (!form.empresa.trim()) e.empresa = 'Requerido'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    return e
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const inputStyle = (key: string): React.CSSProperties => ({
    fontFamily: 'Inter', fontSize: 14, width: '100%',
    padding: '11px 14px', borderRadius: 4, outline: 'none',
    border: errors[key] ? '1.5px solid var(--red)' : '1.5px solid var(--border)',
    background: '#fff', color: 'var(--charcoal)', transition: 'border-color 0.2s',
  })
  const label: React.CSSProperties = {
    fontFamily: 'Inter', fontSize: 12, fontWeight: 600,
    color: 'var(--gray-600)', marginBottom: 6, display: 'block', letterSpacing: '0.02em',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,46,0.7)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 10, maxWidth: 640, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '40px 48px', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}>
        <button onClick={onClose} aria-label="Cerrar"
          style={{ position: 'absolute', top: 18, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', fontSize: 22, lineHeight: 1, padding: 4 }}>×</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--blue-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 24, color: 'var(--charcoal)', marginBottom: 12 }}>¡Gracias por su consulta!</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7 }}>Nos pondremos en contacto en las próximas horas para conversar sobre su proyecto.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--red)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Solicitar propuesta</div>
              <h3 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 22, color: 'var(--charcoal)', lineHeight: 1.2 }}>Cuéntenos sobre su empresa</h3>
            </div>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-2col">
                <div>
                  <label style={label}>Nombre y apellido *</label>
                  <input value={form.nombre} onChange={(e) => update('nombre', e.target.value)} style={inputStyle('nombre')} placeholder="Juan García" />
                  {errors.nombre && <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--red)', marginTop: 4 }}>{errors.nombre}</p>}
                </div>
                <div>
                  <label style={label}>Empresa *</label>
                  <input value={form.empresa} onChange={(e) => update('empresa', e.target.value)} style={inputStyle('empresa')} placeholder="Nombre de su empresa" />
                  {errors.empresa && <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--red)', marginTop: 4 }}>{errors.empresa}</p>}
                </div>
                <div>
                  <label style={label}>Cargo</label>
                  <input value={form.cargo} onChange={(e) => update('cargo', e.target.value)} style={inputStyle('cargo')} placeholder="Director Comercial" />
                </div>
                <div>
                  <label style={label}>País</label>
                  <input value={form.pais} onChange={(e) => update('pais', e.target.value)} style={inputStyle('pais')} placeholder="Argentina" />
                </div>
                <div>
                  <label style={label}>Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} style={inputStyle('email')} placeholder="email@empresa.com" />
                  {errors.email && <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--red)', marginTop: 4 }}>{errors.email}</p>}
                </div>
                <div>
                  <label style={label}>Teléfono</label>
                  <input value={form.telefono} onChange={(e) => update('telefono', e.target.value)} style={inputStyle('telefono')} placeholder="+54 11 0000-0000" />
                </div>
                <div>
                  <label style={label}>Cantidad aprox. de participantes</label>
                  <select value={form.participantes} onChange={(e) => update('participantes', e.target.value)} style={{ ...inputStyle('participantes'), cursor: 'pointer' }}>
                    <option value="">Seleccionar…</option>
                    <option>Hasta 10</option>
                    <option>10 – 25</option>
                    <option>25 – 50</option>
                    <option>Más de 50</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Modalidad preferida</label>
                  <select value={form.modalidad} onChange={(e) => update('modalidad', e.target.value)} style={{ ...inputStyle('modalidad'), cursor: 'pointer' }}>
                    <option value="">Seleccionar…</option>
                    <option>Presencial</option>
                    <option>Virtual</option>
                    <option>A definir</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={label}>Workshop de interés</label>
                <select value={form.workshop} onChange={(e) => update('workshop', e.target.value)} style={{ ...inputStyle('workshop'), cursor: 'pointer' }}>
                  <option value="">Seleccionar…</option>
                  <option>Gestión de Precios</option>
                  <option>Vender Defendiendo los Precios</option>
                  <option>Ambos</option>
                  <option>No lo tengo definido aún</option>
                </select>
              </div>
              <div>
                <label style={label}>Mensaje</label>
                <textarea value={form.mensaje} onChange={(e) => update('mensaje', e.target.value)} rows={3}
                  style={{ ...inputStyle('mensaje'), resize: 'vertical' as const, fontFamily: 'Inter' }}
                  placeholder="Cuéntenos brevemente sobre su equipo y los desafíos que enfrentan con los precios…" />
              </div>
              <button type="submit" style={{ ...btn.primary, fontSize: 15, padding: '14px 28px', width: '100%', textAlign: 'center' as const, marginTop: 4 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red-light)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red)' }}>
                Enviar solicitud
              </button>
            </form>
          </>
        )}
      </div>
      <style>{`
        @media (max-width: 600px) { .form-2col { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

// ─── Workshop card ────────────────────────────────────────────────────────────
function WorkshopCard({ num, title, desc, items, onCTA }: {
  num: string; title: string; desc: string; items: string[]; onCTA: () => void
}) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      {/* top accent */}
      <div style={{ background: 'var(--blue)', padding: '28px 36px 24px' }}>
        <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 44, color: 'rgba(255,255,255,0.15)', lineHeight: 1, marginBottom: -8 }}>{num}</div>
        <h3 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 22, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>{title}</h3>
        <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </div>
      <div style={{ padding: '28px 36px 32px' }}>
        <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>Aprendizajes clave</div>
        <div style={{ marginBottom: 28 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 11 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--blue-subtle)', border: '1.5px solid var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)' }} />
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
        <button onClick={onCTA} style={{ ...btn.primary, fontSize: 14, padding: '12px 24px' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red-light)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red)' }}>
          Solicitar una propuesta
        </button>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function WorkshopsPage({ onBack }: { onBack: () => void }) {
  const [formOpen, setFormOpen] = useState(false)

  const workshops = [
    {
      num: '01',
      title: 'Gestión de Precios',
      desc: 'Desarrolle un modelo profesional de Pricing y descubra cómo cobrar el precio adecuado para cada cliente y situación.',
      items: [
        'Definir el precio óptimo para diferentes clientes y situaciones.',
        'Identificar oportunidades para mejorar márgenes.',
        'Reaccionar ante competidores agresivos.',
        'Evitar guerras de precios.',
        'Evaluar descuentos y promociones.',
        'Incorporar criterios profesionales de Pricing.',
      ],
    },
    {
      num: '02',
      title: 'Vender Defendiendo los Precios',
      desc: 'Prepare a su fuerza de ventas para transformar compradores de precio en compradores de valor.',
      items: [
        'Convertir compradores de precio en compradores de valor.',
        'Identificar los diferenciales de la propuesta.',
        'Aplicar el método de los 8 pasos.',
        'Comunicar valor de forma convincente.',
        'Manejar objeciones relacionadas con el precio.',
        'Defender márgenes durante la negociación.',
      ],
    },
  ]

  const metodologia = [
    { n: '1', label: 'Diagnóstico',      desc: 'Relevamiento inicial de los desafíos de precios y ventas de la empresa.' },
    { n: '2', label: 'Personalización',  desc: 'Adaptación del contenido, casos y ejercitaciones a la realidad de la organización.' },
    { n: '3', label: 'Workshop',         desc: 'Encuentro presencial o virtual con participación activa del equipo.' },
    { n: '4', label: 'Plan de acción',   desc: 'Entrega de un reporte ejecutivo con conclusiones y recomendaciones aplicables.' },
  ]

  const problemas = [
    'Los clientes solicitan descuentos de forma permanente.',
    'La fuerza de ventas tiene dificultades para defender los precios.',
    'Los precios se definen principalmente según la competencia.',
    'Las promociones reducen los márgenes sin generar resultados claros.',
    'Los equipos comerciales comunican características, pero no valor.',
    'No existe un modelo profesional para tomar decisiones de Pricing.',
  ]

  const participantes = [
    'Dueños y directores de empresas',
    'Gerentes comerciales',
    'Equipos de ventas',
    'Áreas de marketing',
    'Responsables de Pricing',
    'Gerentes financieros',
    'Líderes de unidades de negocio',
  ]

  const testimonios = [
    {
      quote: 'Ariel nos abrió los ojos sobre lo poco que trabajábamos el precio, siendo una de las principales claves para que los negocios funcionen correctamente.',
      name: 'Leopoldo Santorromán',
      role: 'Presidente de AFCO y CEO de Cartonajes Santorromán',
      location: 'Madrid, España',
    },
    {
      quote: 'Necesitábamos una voz experta que nos ayudara a redefinir nuestra estrategia de Pricing. Logramos mejorar nuestro posicionamiento, los márgenes y el resultado global de la empresa.',
      name: 'Carlos Chimeno',
      role: 'Director Comercial de Essen',
      location: 'Argentina',
    },
    {
      quote: 'Ariel logra captar e integrar a los participantes, y generar conciencia sobre la importancia del verdadero valor y precio de los productos.',
      name: 'Gina Muñoz Aguirre',
      role: 'Jefa de Recursos Humanos de RC Más Químicos',
      location: 'Ciudad de México, México',
    },
  ]

  return (
    <>
      {formOpen && <ContactForm onClose={() => setFormOpen(false)} />}

      {/* ── 1. Hero ── */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--navy)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={WORKSHOP_HERO_IMG} alt="Workshop in-company con Ariel Baños" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,27,46,0.92) 42%, rgba(13,27,46,0.55) 72%, rgba(13,27,46,0.3) 100%)' }} />
        </div>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', width: '100%', position: 'relative', paddingTop: 100, paddingBottom: 80 }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 18 }}>Workshops in-company</div>
            <h1 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(34px, 4.5vw, 60px)', color: '#fff', lineHeight: 1.06, marginBottom: 24 }}>
              Cobre lo que realmente<br />vale su propuesta
            </h1>
            <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 40, maxWidth: 520 }}>
              Fortalezca su estrategia de precios y prepare a su equipo para defender el valor de sus productos y servicios, mediante workshops personalizados con Ariel Baños.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}>
              <button onClick={() => setFormOpen(true)} style={{ ...btn.primary, fontSize: 15, padding: '15px 32px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red-light)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red)' }}>
                Solicitar una propuesta
              </button>
              <a href="#workshops-detalle" style={{ ...btn.secondary, fontSize: 15, padding: '15px 32px', borderColor: 'rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#fff'; el.style.color = '#fff' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(255,255,255,0.4)'; el.style.color = 'rgba(255,255,255,0.85)' }}>
                Conocer los workshops
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Problemas ── */}
      <section style={{ background: 'var(--white)', padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          <div className="ws-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--charcoal)', lineHeight: 1.12, marginBottom: 32 }}>
                ¿Su empresa atraviesa alguna de estas situaciones?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {problemas.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 26, height: 26, borderRadius: 4, background: 'var(--blue-subtle)', border: '1.5px solid var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.65 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 10, padding: '36px 36px' }}>
              <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 32, color: 'var(--blue)', lineHeight: 1, marginBottom: 12 }}>"</div>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 24 }}>
                Los workshops ayudan a transformar estas situaciones en decisiones concretas de precio, valor y rentabilidad.
              </p>
              <button onClick={() => setFormOpen(true)} style={{ ...btn.primary, fontSize: 14, padding: '12px 22px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red-light)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red)' }}>
                Solicitar una propuesta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Propuesta personalizada ── */}
      <section style={{ background: 'var(--blue)', padding: '72px 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          <div className="ws-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 14 }}>Diseño personalizado</div>
              <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 36px)', color: '#fff', lineHeight: 1.12, marginBottom: 16 }}>
                Workshops a la medida<br />de su empresa
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75 }}>
                Cada organización tiene clientes, mercados y desafíos diferentes. Por eso, los programas se adaptan a la realidad de cada compañía.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                'Reuniones personalizadas con Ariel Baños',
                'Análisis de casos reales',
                'Debates con el equipo',
                'Ejercitaciones prácticas',
                'Herramientas de aplicación inmediata',
                'Reporte ejecutivo con acciones recomendadas',
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#fff', lineHeight: 1.55 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Metodología ── */}
      <section style={{ background: 'var(--white)', padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--charcoal)', lineHeight: 1.12 }}>
              Una experiencia diseñada para<br />generar acciones concretas
            </h2>
          </div>
          {/* Process line */}
          <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }} className="ws-metodologia">
            {metodologia.map((m, i) => (
              <div key={i} style={{ flex: 1, position: 'relative', paddingTop: 20 }}>
                {/* connector line */}
                {i < metodologia.length - 1 && (
                  <div style={{ position: 'absolute', top: 36, left: 'calc(50% + 24px)', right: 'calc(-50% + 24px)', height: 2, background: 'var(--border)', zIndex: 0 }} className="ws-connector" />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 0 0 6px var(--blue-subtle)' }}>
                    <span style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 18, color: '#fff' }}>{m.n}</span>
                  </div>
                  <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 16, color: 'var(--charcoal)', marginBottom: 10 }}>{m.label}</div>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Participantes ── */}
      <section style={{ background: 'var(--gray-50)', padding: '72px 0', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          <div className="ws-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', color: 'var(--charcoal)', lineHeight: 1.15, marginBottom: 32 }}>
                ¿A quiénes están<br />dirigidos?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {participantes.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--navy)', borderRadius: 10, padding: '40px 44px' }}>
              <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 14 }}>In-company</div>
              <h3 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 22, color: '#fff', lineHeight: 1.2, marginBottom: 14 }}>
                Workshops diseñados según los desafíos reales de su empresa
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 28 }}>
                Modalidad presencial o virtual para equipos directivos, comerciales, de marketing y Pricing.
              </p>
              <button onClick={() => setFormOpen(true)} style={{ ...btn.primary, fontSize: 14, padding: '13px 24px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red-light)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red)' }}>
                Consultar por un workshop
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Testimonios ── */}
      <section style={{ background: 'var(--white)', padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--blue)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Testimonios</div>
            <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', color: 'var(--charcoal)', lineHeight: 1.12 }}>Lo que dicen quienes participaron</h2>
          </div>
          <div className="ws-three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {testimonios.map((t, i) => (
              <div key={i} style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 8, padding: '32px 30px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 40, color: 'var(--blue)', lineHeight: 1, marginBottom: 4, opacity: 0.3 }}>"</div>
                <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{t.quote}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18 }}>
                  <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 14, color: 'var(--charcoal)', marginBottom: 4 }}>{t.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: 4 }}>{t.role}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--gray-400)' }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Sobre Ariel ── */}
      <section style={{ background: 'var(--gray-50)', padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          <div className="ws-two-col" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 72, alignItems: 'center' }}>
            <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', maxWidth: 360 }}>
              <img src={arielPhoto} alt="Ariel Baños" style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 11, color: 'var(--blue)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 14 }}>Quien lidera los workshops</div>
              <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', color: 'var(--charcoal)', lineHeight: 1.15, marginBottom: 20 }}>
                Un workshop liderado personalmente por Ariel Baños
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 18 }}>
                Economista, consultor, autor y fundador de Fijaciondeprecios.com, la primera organización del mercado hispanohablante especializada en gestión de precios.
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 32 }}>
                Ariel trabaja junto a equipos empresariales de América Latina y España para desarrollar estrategias que permitan capturar más valor y mejorar la rentabilidad.
              </p>
              <a href="#" onClick={onBack}
                style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 14, color: 'var(--blue)', textDecoration: 'none', borderBottom: '1.5px solid var(--blue)', paddingBottom: 3, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
                Conocer más sobre Ariel →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. CTA final ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Archivo', fontWeight: 900, fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
            Anticípese e impulse la rentabilidad de su empresa
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 36 }}>
            Conversemos sobre los desafíos de precios y ventas de su organización y diseñemos un workshop adaptado a su equipo.
          </p>
          <button onClick={() => setFormOpen(true)} style={{ ...btn.primary, fontSize: 16, padding: '16px 40px' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red-light)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--red)' }}>
            Solicitar una propuesta
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .ws-two-col   { grid-template-columns: 1fr !important; }
          .ws-three-col { grid-template-columns: 1fr 1fr !important; }
          .ws-metodologia { flex-direction: column !important; }
          .ws-connector { display: none !important; }
        }
        @media (max-width: 600px) {
          .ws-three-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
