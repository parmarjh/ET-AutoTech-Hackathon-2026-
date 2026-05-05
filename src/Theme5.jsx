import { useState } from 'react';
import { Leaf, Activity, RefreshCw, BarChart3 } from 'lucide-react';

function CircularEconomyViz({ progress, isRunning }) {
  const materials = [
    { label: 'Lithium', pct: 92, color: '#f59e0b', r: 60, startAngle: 0 },
    { label: 'Cobalt', pct: 78, color: '#ef4444', r: 60, startAngle: 120 },
    { label: 'Nickel', pct: 85, color: '#00ff9d', r: 60, startAngle: 240 },
  ];
  const stages = [
    { x: 340, y: 80, label: 'Battery Use', icon: '🔋', color: '#f59e0b' },
    { x: 560, y: 200, label: 'Collection', icon: '♻', color: '#ef4444' },
    { x: 500, y: 360, label: 'Extraction', icon: '⚗', color: '#00c8ff' },
    { x: 180, y: 360, label: 'Refining', icon: '⚡', color: '#00ff9d' },
    { x: 120, y: 200, label: 'Re-mfg', icon: '🏭', color: '#a855f7' },
  ];

  function polarToXY(cx, cy, r, angleDeg) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  return (
    <svg width="100%" viewBox="0 0 680 440" style={{ display: 'block', background: 'transparent' }}>
      <defs>
        <filter id="glow5"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a2a0a"/>
          <stop offset="100%" stopColor="#050806"/>
        </radialGradient>
      </defs>
      {/* Background */}
      <rect x={0} y={0} width={680} height={440} fill="url(#coreGrad)"/>
      {/* Grid */}
      {Array.from({length:14}).map((_,i)=>(
        <line key={`v${i}`} x1={i*50} y1={0} x2={i*50} y2={440} stroke="#0a1a05" strokeWidth="0.5"/>
      ))}
      {Array.from({length:9}).map((_,i)=>(
        <line key={`h${i}`} x1={0} y1={i*50} x2={680} y2={i*50} stroke="#0a1a05" strokeWidth="0.5"/>
      ))}

      {/* Circular economy loop */}
      {stages.map((s, i) => {
        const next = stages[(i+1) % stages.length];
        const active = progress > (i / stages.length * 70);
        return (
          <line key={i}
            x1={s.x} y1={s.y} x2={next.x} y2={next.y}
            stroke={active ? s.color : '#1a2a0a'}
            strokeWidth={active ? 2.5 : 1}
            opacity={active ? 0.7 : 0.3}
            strokeDasharray={active ? '0' : '4 4'}
            filter={active ? "url(#glow5)" : undefined}
            style={{transition:'all 0.5s'}}
          />
        );
      })}

      {/* Stage nodes */}
      {stages.map((s, i) => {
        const active = progress > (i / stages.length * 60);
        return (
          <g key={i} filter={active ? "url(#glow5)" : undefined}>
            <circle cx={s.x} cy={s.y} r={active ? 34 : 26}
              fill={`${s.color}15`} stroke={s.color}
              strokeWidth={active ? 2 : 1}
              opacity={active ? 1 : 0.3}
              style={{transition:'all 0.5s'}}
            />
            <text x={s.x} y={s.y+5} textAnchor="middle" fontSize="18" opacity={active?1:0.3}>{s.icon}</text>
            <text x={s.x} y={s.y + (active?48:40)} textAnchor="middle"
              fill={s.color} fontSize="9" fontFamily="JetBrains Mono, monospace"
              opacity={active?1:0.3} style={{transition:'all 0.5s'}}>
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Material recovery bars (right side) */}
      {materials.map((m, i) => {
        const barWidth = (progress / 100) * m.pct / 100 * 160;
        const active = progress > i * 20;
        return (
          <g key={i}>
            <text x={20} y={160 + i * 60} fill={m.color} fontSize="10"
              fontFamily="JetBrains Mono, monospace" opacity={active?1:0.3}>
              {m.label}
            </text>
            <rect x={20} y={172 + i * 60} width={160} height={16} rx={4}
              fill="rgba(255,255,255,0.05)" stroke={`${m.color}30`} strokeWidth={1}/>
            <rect x={20} y={172 + i * 60} width={barWidth} height={16} rx={4}
              fill={m.color} opacity={active ? 0.85 : 0}
              filter={active ? "url(#glow5)" : undefined}
              style={{transition:'width 0.3s ease'}}
            />
            <text x={190} y={185 + i * 60} fill={m.color} fontSize="10"
              fontFamily="JetBrains Mono, monospace" opacity={active ? 1 : 0}>
              {active ? `${m.pct}%` : ''}
            </text>
          </g>
        );
      })}

      {/* Carbon savings meter */}
      {progress > 50 && (
        <g>
          <rect x={460} y={300} width={200} height={80} rx={8}
            fill="rgba(0,0,0,0.7)" stroke="rgba(0,255,157,0.3)" strokeWidth={1}/>
          <text x={560} y={325} textAnchor="middle" fill="#4a6a7a" fontSize="9"
            fontFamily="JetBrains Mono, monospace">CARBON OFFSET</text>
          <text x={560} y={358} textAnchor="middle"
            fill="#00ff9d" fontSize="28" fontFamily="JetBrains Mono, monospace" fontWeight="bold"
            filter="url(#glow5)">
            {progress === 100 ? '-45%' : `-${Math.floor((progress - 50) * 0.9)}%`}
          </text>
        </g>
      )}

      {/* Central recycle symbol */}
      <text x={340} y={230} textAnchor="middle" fontSize="36"
        opacity={progress > 30 ? 0.7 : 0.15}
        filter={progress > 30 ? "url(#glow5)" : undefined}
        style={{transition:'opacity 0.5s'}}>
        ♻
      </text>

      {/* Scan line */}
      {isRunning && (
        <rect x={progress * 6.8 - 2} y={0} width={4} height={440}
          fill="#f59e0b" opacity={0.3} filter="url(#glow5)"
          style={{transition:'x 0.1s linear'}}
        />
      )}
    </svg>
  );
}

export default function Theme5() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setIsRunning(false); return 100; }
        return prev + 4;
      });
    }, 100);
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '3rem 1.5rem', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(245,158,11,0.1)', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.3)' }}>
          <Leaf size={32} color="#f59e0b" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0 }}>Circular Economy & Sustainability</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>Battery recycling AI and material footprint tracking.</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(245,158,11,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#f59e0b' }}>// MATERIAL RECOVERY LOOP</h3>
            {progress === 100 && <span style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>SIMULATION COMPLETE</span>}
          </div>
          <div style={{ flex: 1, minHeight: '420px', background: 'rgba(3,6,2,0.95)' }}>
            <CircularEconomyViz progress={progress} isRunning={isRunning} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Material Passport Generator</h3>
            <button onClick={handleRun} disabled={isRunning} style={{ width: '100%', padding: '1rem', background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #f59e0b, #ef4444)', border: 'none', borderRadius: '8px', color: isRunning ? '#fff' : '#000', fontFamily: 'var(--font-display)', fontWeight: 'bold', fontSize: '1.1rem', cursor: isRunning ? 'default' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
              <RefreshCw size={20} className={isRunning ? 'spin' : ''} />
              {isRunning ? `Extracting Data... ${progress}%` : progress === 100 ? 'Re-Run Extraction' : 'Run Material Analysis'}
            </button>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #f59e0b, #ef4444)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(245,158,11,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <Activity size={32} color="#f59e0b" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '92%' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Lithium Recovery Rate</div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(239,68,68,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <BarChart3 size={32} color="#ef4444" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '-45%' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Carbon Offset</div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 2s linear infinite; }
      `}} />
    </div>
  );
}
