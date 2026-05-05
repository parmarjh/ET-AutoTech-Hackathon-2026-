import { useState } from 'react';
import { Zap, Activity, Battery, ShieldCheck } from 'lucide-react';

function EVRetrofitViz({ progress, isRunning }) {
  const battery = Array.from({ length: 12 });
  return (
    <svg width="100%" viewBox="0 0 680 420" style={{ display: 'block', background: 'transparent' }}>
      <defs>
        <filter id="glow2"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="battGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00ff9d"/>
          <stop offset="100%" stopColor="#00c8ff"/>
        </linearGradient>
      </defs>
      {/* Grid */}
      {Array.from({length:14}).map((_,i)=>(
        <line key={`v${i}`} x1={i*50} y1={0} x2={i*50} y2={420} stroke="#0a2a1a" strokeWidth="0.5"/>
      ))}
      {Array.from({length:9}).map((_,i)=>(
        <line key={`h${i}`} x1={0} y1={i*50} x2={680} y2={i*50} stroke="#0a2a1a" strokeWidth="0.5"/>
      ))}
      {/* Vehicle outline */}
      <rect x={200} y={160} width={280} height={120} rx={20}
        fill="rgba(0,255,157,0.04)" stroke="rgba(0,255,157,0.3)" strokeWidth={1.5}/>
      <rect x={240} y={120} width={200} height={60} rx={15}
        fill="rgba(0,255,157,0.04)" stroke="rgba(0,255,157,0.2)" strokeWidth={1}/>
      {/* Wheels */}
      {[230, 450].map((cx,i) => (
        <g key={i}>
          <circle cx={cx} cy={290} r={35} fill="rgba(0,20,10,0.8)" stroke="rgba(0,255,157,0.4)" strokeWidth={2}/>
          <circle cx={cx} cy={290} r={20} fill="rgba(0,255,157,0.1)" stroke="rgba(0,255,157,0.6)" strokeWidth={1.5}/>
          <circle cx={cx} cy={290} r={6} fill="#00ff9d" opacity={progress > 30 ? 0.9 : 0.3}/>
        </g>
      ))}
      {/* Battery pack (bottom of car) */}
      <rect x={220} y={245} width={240} height={40} rx={6}
        fill="rgba(0,10,5,0.9)" stroke={progress > 10 ? '#00ff9d' : '#1a3a2a'} strokeWidth={1.5}/>
      {battery.map((_, i) => {
        const filled = (i / battery.length) * 100 < progress;
        return (
          <rect key={i} x={226 + i * 19} y={250} width={15} height={30} rx={3}
            fill={filled ? 'url(#battGrad)' : 'rgba(0,255,157,0.07)'}
            stroke={filled ? '#00ff9d' : '#0a2a1a'}
            strokeWidth={1}
            filter={filled ? "url(#glow2)" : undefined}
            style={{transition:'all 0.4s'}}
          />
        );
      })}
      {/* Motor */}
      <circle cx={340} cy={200} r={35} fill="rgba(0,200,255,0.1)" stroke={progress > 40 ? '#00c8ff' : '#1e3a4a'} strokeWidth={2} style={{transition:'all 0.5s'}}/>
      <circle cx={340} cy={200} r={20} fill="rgba(0,200,255,0.15)" stroke={progress > 40 ? '#00c8ff' : '#1e3a4a'} strokeWidth={1.5} style={{transition:'all 0.5s'}} filter={progress > 40 ? "url(#glow2)" : undefined}/>
      <text x={340} y={205} textAnchor="middle" fill={progress > 40 ? '#00c8ff' : '#1e3a4a'} fontSize="9" fontFamily="JetBrains Mono, monospace" style={{transition:'all 0.5s'}}>EV MOTOR</text>
      {/* Wiring harness */}
      {progress > 20 && [
        { x1:220, y1:265, x2:100, y2:150 },
        { x1:460, y1:265, x2:580, y2:150 },
        { x1:305, y1:200, x2:200, y2:200 },
        { x1:375, y1:200, x2:480, y2:200 },
      ].map((line, i) => (
        <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke="#00ff9d" strokeWidth={2} strokeDasharray="8 4"
          opacity={Math.min(1, (progress - 20) / 30)}
          style={{transition:'opacity 0.5s'}}
          filter="url(#glow2)"
        />
      ))}
      {/* Controller boxes */}
      {[{x:40,y:110,label:'BMS'}, {x:560,y:110,label:'VCU'}, {x:40,y:300,label:'OBC'}, {x:560,y:300,label:'DCDC'}].map((box, i) => {
        const active = progress > (i + 1) * 15;
        return (
          <g key={i}>
            <rect x={box.x} y={box.y} width={70} height={40} rx={6}
              fill={`rgba(0,255,157,${active ? 0.15 : 0.03})`}
              stroke={active ? '#00ff9d' : '#1a3a2a'}
              strokeWidth={1.5}
              filter={active ? "url(#glow2)" : undefined}
              style={{transition:'all 0.5s'}}
            />
            <text x={box.x+35} y={box.y+25} textAnchor="middle"
              fill={active ? '#00ff9d' : '#1a3a2a'} fontSize="11"
              fontFamily="JetBrains Mono, monospace" fontWeight="bold"
              style={{transition:'all 0.5s'}}>
              {box.label}
            </text>
          </g>
        );
      })}
      {/* Scan line */}
      {isRunning && (
        <line x1={progress * 6.8} y1={0} x2={progress * 6.8} y2={420}
          stroke="#00ff9d" strokeWidth={3} opacity={0.5} filter="url(#glow2)"
          style={{transition:'x1 0.1s linear, x2 0.1s linear'}}
        />
      )}
    </svg>
  );
}

export default function Theme2() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setIsRunning(false); return 100; }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '3rem 1.5rem', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(0,255,157,0.1)', borderRadius: '12px', border: '1px solid rgba(0,255,157,0.3)' }}>
          <Zap size={32} color="#00ff9d" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0 }}>EV Retrofit & Conversion Ecosystem</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>AI-powered feasibility analysis and battery configuration.</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(0,255,157,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#00ff9d' }}>// EV SYSTEM SCAN</h3>
            {progress === 100 && <span style={{ background: 'rgba(0,255,157,0.2)', color: '#00ff9d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>OPTIMIZED</span>}
          </div>
          <div style={{ flex: 1, minHeight: '420px', background: 'rgba(0,8,4,0.9)' }}>
            <EVRetrofitViz progress={progress} isRunning={isRunning} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Conversion Analysis Engine</h3>
            <button onClick={handleRun} disabled={isRunning} style={{ width: '100%', padding: '1rem', background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #00c8ff, #00ff9d)', border: 'none', borderRadius: '8px', color: isRunning ? '#fff' : '#000', fontFamily: 'var(--font-display)', fontWeight: 'bold', fontSize: '1.1rem', cursor: isRunning ? 'default' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
              <Activity size={20} className={isRunning ? 'spin' : ''} />
              {isRunning ? `Analyzing... ${progress}%` : progress === 100 ? 'Re-Run Analysis' : 'Run Diagnostics & Optimization'}
            </button>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #00c8ff, #00ff9d)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(0,255,157,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <Battery size={32} color="#00ff9d" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '98.4%' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Battery SOH Confidence</div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(0,200,255,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <ShieldCheck size={32} color="#00c8ff" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? 'A+' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Wiring Integrity Score</div>
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
