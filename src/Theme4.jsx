import { useState } from 'react';
import { BatteryCharging, Activity, Map, Zap } from 'lucide-react';

function EVChargingViz({ progress, isRunning }) {
  const stations = [
    { x: 120, y: 100, name: 'Hub A', power: 150, status: 'fast' },
    { x: 300, y: 80, name: 'Hub B', power: 350, status: 'ultra' },
    { x: 500, y: 120, name: 'Hub C', power: 150, status: 'fast' },
    { x: 180, y: 280, name: 'Node D', power: 22, status: 'slow' },
    { x: 400, y: 260, name: 'Node E', power: 50, status: 'fast' },
    { x: 580, y: 300, name: 'Hub F', power: 350, status: 'ultra' },
    { x: 80, y: 360, name: 'Node G', power: 22, status: 'slow' },
    { x: 340, y: 380, name: 'Hub H', power: 150, status: 'fast' },
  ];
  const routes = [[0,1],[1,2],[0,3],[1,4],[2,5],[3,7],[4,7],[5,7],[3,4],[4,5]];
  const colorMap = { ultra: '#a855f7', fast: '#00c8ff', slow: '#4a6a7a' };

  return (
    <svg width="100%" viewBox="0 0 680 420" style={{ display: 'block', background: 'transparent' }}>
      <defs>
        <filter id="glow4"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a0a2e" stopOpacity="1"/>
          <stop offset="100%" stopColor="#050508" stopOpacity="1"/>
        </radialGradient>
      </defs>
      {/* Terrain background */}
      <rect x={0} y={0} width={680} height={420} fill="url(#mapGrad)"/>
      {/* Grid */}
      {Array.from({length:14}).map((_,i)=>(
        <line key={`v${i}`} x1={i*50} y1={0} x2={i*50} y2={420} stroke="#1a0a2e" strokeWidth="0.5"/>
      ))}
      {Array.from({length:9}).map((_,i)=>(
        <line key={`h${i}`} x1={0} y1={i*50} x2={680} y2={i*50} stroke="#1a0a2e" strokeWidth="0.5"/>
      ))}
      {/* Terrain contours */}
      {[1,2,3].map(i => (
        <ellipse key={i} cx={340} cy={210} rx={i*110} ry={i*65}
          fill="none" stroke={`rgba(168,85,247,${0.08 - i*0.02})`} strokeWidth={1}/>
      ))}
      {/* Route connections */}
      {routes.map(([a,b],i) => {
        const sa = stations[a], sb = stations[b];
        const active = progress > (i / routes.length * 80);
        return (
          <line key={i}
            x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
            stroke={active ? '#a855f7' : '#2a1a4a'}
            strokeWidth={active ? 2 : 1}
            strokeDasharray={active ? '0' : '4 4'}
            opacity={active ? 0.7 : 0.3}
            filter={active ? "url(#glow4)" : undefined}
            style={{transition:'all 0.5s'}}
          />
        );
      })}
      {/* Stations */}
      {stations.map((s, i) => {
        const active = progress > (i / stations.length * 70);
        const col = colorMap[s.status];
        return (
          <g key={i} filter={active ? "url(#glow4)" : undefined}>
            <circle cx={s.x} cy={s.y} r={active ? 22 : 16}
              fill={`${col}20`} stroke={col}
              strokeWidth={active ? 2 : 1}
              opacity={active ? 1 : 0.3}
              style={{transition:'all 0.5s'}}
            />
            <circle cx={s.x} cy={s.y} r={8} fill={col} opacity={active ? 0.9 : 0.2}
              style={{transition:'all 0.5s'}}
            />
            {/* Lightning bolt icon */}
            <text x={s.x} y={s.y+4} textAnchor="middle" fill={active ? '#fff' : '#2a1a4a'} fontSize="10" style={{transition:'all 0.5s'}}>⚡</text>
            <text x={s.x} y={s.y+36} textAnchor="middle" fill={col} fontSize="9"
              fontFamily="JetBrains Mono, monospace" opacity={active?1:0.3}
              style={{transition:'all 0.5s'}}>
              {s.name}
            </text>
            {active && (
              <text x={s.x} y={s.y+48} textAnchor="middle" fill="#4a6a7a" fontSize="8"
                fontFamily="JetBrains Mono, monospace">
                {s.power}kW
              </text>
            )}
          </g>
        );
      })}
      {/* Best route highlight */}
      {progress > 60 && (
        <g>
          <polyline points="300,80 400,260 580,300"
            fill="none" stroke="#00ff9d" strokeWidth={3}
            strokeDasharray="12 4" opacity={0.9}
            filter="url(#glow4)"
          />
          <text x={440} y={155} fill="#00ff9d" fontSize="10" fontFamily="JetBrains Mono, monospace"
            transform="rotate(-20, 440, 155)">OPTIMAL ROUTE</text>
        </g>
      )}
      {/* Scan beam */}
      {isRunning && (
        <rect x={progress * 6.8 - 2} y={0} width={4} height={420}
          fill="#a855f7" opacity={0.4} filter="url(#glow4)"
          style={{transition:'x 0.1s linear'}}
        />
      )}
      {/* Legend */}
      {[['ultra', '#a855f7','350kW Ultra'], ['fast','#00c8ff','150kW Fast'], ['slow','#4a6a7a','22kW AC']].map(([k,c,l],i) => (
        <g key={k}>
          <circle cx={20} cy={20 + i * 20} r={5} fill={c} opacity={0.8}/>
          <text x={32} y={25 + i * 20} fill="#4a6a7a" fontSize="9" fontFamily="JetBrains Mono, monospace">{l}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Theme4() {
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
        <div style={{ padding: '1rem', background: 'rgba(168,85,247,0.1)', borderRadius: '12px', border: '1px solid rgba(168,85,247,0.3)' }}>
          <BatteryCharging size={32} color="#a855f7" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0 }}>Seamless EV Charging Ecosystem</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>Smart charger availability and route optimization.</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(168,85,247,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#a855f7' }}>// CHARGING NETWORK MAP</h3>
            {progress === 100 && <span style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>OPTIMIZED</span>}
          </div>
          <div style={{ flex: 1, minHeight: '420px', background: 'rgba(5,2,12,0.95)' }}>
            <EVChargingViz progress={progress} isRunning={isRunning} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>ONDC Network Monitor</h3>
            <button onClick={handleRun} disabled={isRunning} style={{ width: '100%', padding: '1rem', background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #7c3aed, #a855f7)', border: 'none', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 'bold', fontSize: '1.1rem', cursor: isRunning ? 'default' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
              <Activity size={20} className={isRunning ? 'spin' : ''} />
              {isRunning ? `Mapping Network... ${progress}%` : progress === 100 ? 'Re-Run Optimizer' : 'Run Route Optimizer'}
            </button>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #a855f7)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(168,85,247,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <Map size={32} color="#a855f7" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '8 min' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Nearest Charger ETA</div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(0,200,255,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <Zap size={32} color="#00c8ff" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '350kW' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Peak Charging Speed</div>
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
