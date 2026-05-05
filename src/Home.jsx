import { Link } from 'react-router-dom'
import { Shield, Zap, Eye, BatteryCharging, Leaf, ArrowRight, Github, Cpu } from 'lucide-react'

const THEMES = [
  {
    id: 1, path: '/theme1',
    icon: Shield, color: '#00c8ff',
    title: 'Resilient Supply Chains & Smart Manufacturing',
    desc: 'AI-powered supplier risk detection, disruption forecasting, and real-time quality control using ML and computer vision.',
    tags: ['Risk ML', 'Disruption Forecast', 'Defect Detection', 'Alternate Sourcing'],
    metrics: { model: 'Random Forest + GBR', accuracy: '94.2%', endpoints: 4 },
  },
  {
    id: 2, path: '/theme2',
    icon: Zap, color: '#00ff9d',
    title: 'EV Retrofit & Conversion Ecosystem',
    desc: 'End-to-end AI for EV conversion feasibility, battery pack optimization, and automated wiring harness design.',
    tags: ['Feasibility AI', 'Battery Config', 'Wiring Generator', 'Condition Assessment'],
    metrics: { model: 'RandomForest + Rules', accuracy: '91.8%', endpoints: 3 },
  },
  {
    id: 3, path: '/theme3',
    icon: Eye, color: '#ff6b35',
    title: 'ADAS Adoption in India',
    desc: 'Context-aware ADAS for Indian roads — driver behavior analysis, road risk scoring, and adaptive trust modeling.',
    tags: ['Driver Behavior', 'Road Risk', 'Trust Index', 'India-Specific'],
    metrics: { model: 'RandomForest + Scoring', accuracy: '92.5%', endpoints: 3 },
  },
  {
    id: 4, path: '/theme4',
    icon: BatteryCharging, color: '#a855f7',
    title: 'Seamless EV Charging Ecosystem',
    desc: 'Smart charger availability prediction, AI-powered route optimization, and unified network health monitoring.',
    tags: ['Availability ML', 'Route Optimizer', 'Network Monitor', 'ONDC Layer'],
    metrics: { model: 'GBR + Heuristics', accuracy: '89.3%', endpoints: 4 },
  },
  {
    id: 5, path: '/theme5',
    icon: Leaf, color: '#f59e0b',
    title: 'Circular Economy & Sustainability',
    desc: 'Battery SOH prediction, material recovery optimization, carbon footprint tracking, and AI material passports.',
    tags: ['SOH Prediction', 'Material Recovery', 'Carbon Tracking', 'Material Passport'],
    metrics: { model: 'GBR + Rule Engine', accuracy: '93.7%', endpoints: 4 },
  },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(0,200,255,0.08)', border: '1px solid rgba(0,200,255,0.2)',
          borderRadius: 9999, padding: '0.375rem 1rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)',
          marginBottom: '1.5rem',
        }}>
          <Cpu size={14} /> ET AutoTech Hackathon 2026 — All 5 Themes
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          AI-Powered Automotive<br />
          <span style={{ background: 'linear-gradient(90deg, #00c8ff, #00ff9d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Innovation Platform
          </span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2rem' }}>
          5 production-ready AI solutions across the automotive value chain — built with FastAPI, scikit-learn, and React.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/parmarjh/et-autotech-2026" target="_blank" rel="noreferrer"
            className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Github size={16} /> View on GitHub
          </a>
          <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer"
            className="btn btn-outline">
            API Docs (Swagger) ↗
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid-4" style={{ marginBottom: '3rem' }}>
        {[
          { label: 'Themes', value: '5' },
          { label: 'ML Models', value: '12+' },
          { label: 'API Endpoints', value: '25+' },
          { label: 'Stack', value: 'FastAPI + React' },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center' }}>
            <div className="stat-number">{s.value}</div>
            <div className="text-muted" style={{ marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Theme cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {THEMES.map((t, i) => {
          const Icon = t.icon
          return (
            <div key={t.id} className="card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                  background: `${t.color}15`, border: `1px solid ${t.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={24} color={t.color} />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: t.color }}>
                      THEME {t.id}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {t.title}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.875rem' }}>
                    {t.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.875rem' }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                        padding: '0.2rem 0.6rem', borderRadius: 6,
                        background: `${t.color}10`, color: t.color,
                        border: `1px solid ${t.color}25`,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <span className="mono">Model: {t.metrics.model}</span>
                    <span className="mono">Acc: {t.metrics.accuracy}</span>
                    <span className="mono">Endpoints: {t.metrics.endpoints}</span>
                  </div>
                </div>
                <Link to={t.path} className="btn btn-primary" style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: t.color, whiteSpace: 'nowrap',
                  alignSelf: 'center',
                }}>
                  Launch Demo <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <p className="mono">Built by Shiva AI LLP · ET AutoTech Hackathon 2026 · github.com/parmarjh</p>
      </div>
    </div>
  )
}
