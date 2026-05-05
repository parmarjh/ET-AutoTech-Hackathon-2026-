import { useState } from 'react';
import { Eye, Activity, AlertTriangle, UserCheck } from 'lucide-react';

function ADASViz({ progress, isRunning }) {
  const roadLanes = [-120, -40, 40, 120];
  const obstacles = [
    { x: 340, y: 120, type: 'car', color: '#ff6b35' },
    { x: 220, y: 200, type: 'truck', color: '#ff6b35' },
    { x: 460, y: 180, type: 'bike', color: '#fbbf24' },
  ];
  return (
    <svg width="100%" viewBox="0 0 680 420" style={{ display: 'block', background: 'transparent' }}>
      <defs>
        <filter id="glow3"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glow3s"><feGaussianBlur stdDeviation="10" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a2e"/>
          <stop offset="100%" stopColor="#0a0a14"/>
        </linearGradient>
      </defs>
      {/* Sky / background */}
      <rect x={0} y={0} width={680} height={200} fill="url(#roadGrad)"/>
      <rect x={0} y={200} width={680} height={220} fill="#050508"/>
      {/* Horizon line */}
      <line x1={0} y1={200} x2={680} y2={200} stroke="#ff6b35" strokeWidth={1} opacity={0.3}/>
      {/* Road perspective lines */}
      {roadLanes.map((offset, i) => (
        <line key={i}
          x1={340 + offset * 0.2} y1={200}
          x2={340 + offset * 4} y2={420}
          stroke={i === 1 || i === 2 ? 'rgba(255,255,255,0.4)' : 'rgba(255,107,53,0.3)'}
          strokeWidth={i === 1 || i === 2 ? 1 : 2}
          strokeDasharray={i === 1 || i === 2 ? '12 8' : '0'}
        />
      ))}
      {/* Dash markings */}
      {Array.from({length:6}).map((_,i) => (
        <line key={i} x1={340} y1={220 + i * 35} x2={340} y2={248 + i * 35}
          stroke="rgba(255,255,255,0.5)" strokeWidth={3}
        />
      ))}
      {/* ADAS Detection boxes */}
      {obstacles.map((obs, i) => {
        const active = progress > (i + 1) * 20;
        const size = obs.type === 'truck' ? 60 : obs.type === 'car' ? 48 : 34;
        return (
          <g key={i} filter={active ? "url(#glow3)" : undefined}>
            <rect x={obs.x - size/2} y={obs.y - size/2} width={size} height={size * 0.7}
              fill={`${obs.color}15`}
              stroke={active ? obs.color : 'transparent'}
              strokeWidth={2}
              strokeDasharray="4 2"
              style={{transition:'all 0.5s'}}
            />
            {active && <>
              {/* Corner markers */}
              {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([dx,dy],ci) => (
                <g key={ci}>
                  <line x1={obs.x + dx * size/2} y1={obs.y + dy * size/2 * 0.7}
                    x2={obs.x + dx * size/2} y2={obs.y + dy * size/2 * 0.7 - dy * 10}
                    stroke={obs.color} strokeWidth={2.5}/>
                  <line x1={obs.x + dx * size/2} y1={obs.y + dy * size/2 * 0.7}
                    x2={obs.x + dx * size/2 - dx * 10} y2={obs.y + dy * size/2 * 0.7}
                    stroke={obs.color} strokeWidth={2.5}/>
                </g>
              ))}
              <text x={obs.x} y={obs.y - size/2 - 5} textAnchor="middle"
                fill={obs.color} fontSize="9" fontFamily="JetBrains Mono, monospace">
                {obs.type.toUpperCase()} {obs.type === 'bike' ? '⚠' : ''}
              </text>
            </>}
          </g>
        );
      })}
      {/* Ego vehicle */}
      <rect x={305} y={320} width={70} height={80} rx={10}
        fill="rgba(0,200,255,0.2)" stroke="#00c8ff" strokeWidth={2}
        filter="url(#glow3)"
      />
      <rect x={315} y={330} width={50} height={30} rx={6} fill="rgba(0,200,255,0.3)" stroke="#00c8ff" strokeWidth={1}/>
      {/* LiDAR sweep */}
      {progress > 10 && (
        <g>
          <path
            d={`M 340 330 L ${340 - 180 * Math.cos(Math.PI/6)} ${330 - 180 * Math.sin(Math.PI/6)} A 180 180 0 0 1 ${340 + 180 * Math.cos(Math.PI/6)} ${330 - 180 * Math.sin(Math.PI/6)} Z`}
            fill={`rgba(255,107,53,${(progress - 10) / 400})`}
            stroke="rgba(255,107,53,0.3)"
            strokeWidth={1}
            style={{transition:'fill 0.5s'}}
          />
          <circle cx={340} cy={330} r={5} fill="#ff6b35" filter="url(#glow3s)"/>
        </g>
      )}
      {/* Speed / HUD overlays */}
      {progress > 30 && (
        <>
          <rect x={20} y={20} width={120} height={70} rx={8}
            fill="rgba(0,0,0,0.7)" stroke="rgba(255,107,53,0.4)" strokeWidth={1}/>
          <text x={30} y={42} fill="#ff6b35" fontSize="9" fontFamily="JetBrains Mono, monospace">SPEED</text>
          <text x={30} y={64} fill="#fff" fontSize="22" fontFamily="JetBrains Mono, monospace" fontWeight="bold">72</text>
          <text x={72} y={64} fill="#4a6a7a" fontSize="10" fontFamily="JetBrains Mono, monospace">km/h</text>

          <rect x={540} y={20} width={120} height={70} rx={8}
            fill="rgba(0,0,0,0.7)" stroke="rgba(0,200,255,0.4)" strokeWidth={1}/>
          <text x={550} y={42} fill="#00c8ff" fontSize="9" fontFamily="JetBrains Mono, monospace">RISK INDEX</text>
          <text x={550} y={64} fill={progress === 100 ? '#00ff9d' : '#fbbf24'} fontSize="22" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
            {progress === 100 ? 'LOW' : 'MED'}
          </text>
        </>
      )}
      {/* Scan line */}
      {isRunning && (
        <rect x={progress * 6.8 - 2} y={0} width={4} height={420}
          fill="#ff6b35" opacity={0.3} filter="url(#glow3)"
          style={{transition:'x 0.1s linear'}}
        />
      )}
    </svg>
  );
}

export default function Theme3() {
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
        <div style={{ padding: '1rem', background: 'rgba(255,107,53,0.1)', borderRadius: '12px', border: '1px solid rgba(255,107,53,0.3)' }}>
          <Eye size={32} color="#ff6b35" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0 }}>ADAS Adoption in India</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>Context-aware driver analysis and road risk scoring.</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(255,107,53,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#ff6b35' }}>// ADAS PERCEPTION VIEW</h3>
            {progress === 100 && <span style={{ background: 'rgba(255,107,53,0.2)', color: '#ff6b35', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>CALIBRATED</span>}
          </div>
          <div style={{ flex: 1, minHeight: '420px', background: 'rgba(4,4,14,0.95)' }}>
            <ADASViz progress={progress} isRunning={isRunning} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Road Risk Scorer</h3>
            <button onClick={handleRun} disabled={isRunning} style={{ width: '100%', padding: '1rem', background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #ff6b35, #fbbf24)', border: 'none', borderRadius: '8px', color: isRunning ? '#fff' : '#000', fontFamily: 'var(--font-display)', fontWeight: 'bold', fontSize: '1.1rem', cursor: isRunning ? 'default' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
              <Activity size={20} className={isRunning ? 'spin' : ''} />
              {isRunning ? `Calibrating... ${progress}%` : progress === 100 ? 'Re-Run Analysis' : 'Run ADAS Calibration'}
            </button>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #ff6b35, #fbbf24)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(255,107,53,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <AlertTriangle size={32} color="#ff6b35" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '92.5%' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Road Risk Accuracy</div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(251,191,36,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <UserCheck size={32} color="#fbbf24" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '8.7/10' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Driver Trust Index</div>
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
