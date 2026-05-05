import { Link, useLocation } from 'react-router-dom'
import { Cpu, Menu, X } from 'lucide-react'
import { useState } from 'react'

const themes = [
  { path: '/theme1', label: 'T1 Supply Chain', color: '#00c8ff' },
  { path: '/theme2', label: 'T2 EV Retrofit', color: '#00ff9d' },
  { path: '/theme3', label: 'T3 ADAS India', color: '#ff6b35' },
  { path: '/theme4', label: 'T4 EV Charging', color: '#a855f7' },
  { path: '/theme5', label: 'T5 Circular Economy', color: '#f59e0b' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(5,10,15,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0,200,255,0.12)',
      padding: '0 1.5rem',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        height: 60, gap: '2rem',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Cpu size={20} color="#00c8ff" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: '#00c8ff' }}>
            ET AutoTech <span style={{ color: '#00ff9d' }}>2026</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', flex: 1 }}>
          {themes.map(t => (
            <Link key={t.path} to={t.path} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              padding: '0.3rem 0.75rem',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: pathname === t.path ? `${t.color}20` : 'transparent',
              color: pathname === t.path ? t.color : 'var(--text-muted)',
              border: `1px solid ${pathname === t.path ? t.color + '40' : 'transparent'}`,
            }}>
              {t.label}
            </Link>
          ))}
        </div>

        <a
          href="https://github.com/parmarjh/et-autotech-2026"
          target="_blank" rel="noreferrer"
          className="btn btn-outline"
          style={{ fontSize: '0.72rem', padding: '0.35rem 0.875rem', whiteSpace: 'nowrap' }}
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}
