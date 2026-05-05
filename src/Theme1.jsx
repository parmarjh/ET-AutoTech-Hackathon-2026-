import { useState } from 'react';
import { Shield, Activity, ShieldAlert, Cpu } from 'lucide-react';

function SupplyChainViz({ progress, isRunning }) {
  const nodes = [
    { id: 'S1', x: 80, y: 80, label: 'Supplier A', color: '#00c8ff' },
    { id: 'S2', x: 80, y: 200, label: 'Supplier B', color: '#00c8ff' },
    { id: 'S3', x: 80, y: 320, label: 'Supplier C', color: '#00c8ff' },
    { id: 'M1', x: 260, y: 140, label: 'MFG Hub', color: '#7c3aed' },
    { id: 'M2', x: 260, y: 260, label: 'Assembly', color: '#7c3aed' },
    { id: 'D1', x: 430, y: 100, label: 'Distrib N', color: '#00ff9d' },
    { id: 'D2', x: 430, y: 220, label: 'Distrib S', color: '#00ff9d' },
    { id: 'D3', x: 430, y: 340, label: 'Distrib E', color: '#00ff9d' },
    { id: 'R1', x: 590, y: 170, label: 'Retail', color: '#f59e0b' },
    { id: 'R2', x: 590, y: 290, label: 'OEM', color: '#f59e0b' },
  ];
  const edges = [
    ['S1','M1'],['S2','M1'],['S2','M2'],['S3','M2'],
    ['M1','D1'],['M1','D2'],['M2','D2'],['M2','D3'],
    ['D1','R1'],['D2','R1'],['D2','R2'],['D3','R2'],
  ];
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <svg width="100%" viewBox="0 0 680 420" style={{ display:'block', background: 'transparent' }}>
      <defs>
        <filter id="glow1"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glow-strong"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#00c8ff" opacity="0.5"/>
        </marker>
      </defs>
      {/* Grid */}
      {Array.from({length:14}).map((_,i)=>(
        <line key={`v${i}`} x1={i*50} y1={0} x2={i*50} y2={420} stroke="#1e3a4a" strokeWidth="0.5"/>
      ))}
      {Array.from({length:9}).map((_,i)=>(
        <line key={`h${i}`} x1={0} y1={i*50} x2={680} y2={i*50} stroke="#1e3a4a" strokeWidth="0.5"/>
      ))}
      {/* Edges */}
      {edges.map(([a,b],i) => {
        const na = nodeMap[a], nb = nodeMap[b];
        const active = progress > (i / edges.length * 100);
        return (
          <line key={`e${i}`}
            x1={na.x+20} y1={na.y+20} x2={nb.x+20} y2={nb.y+20}
            stroke={active ? '#00c8ff' : '#1e3a4a'}
            strokeWidth={active ? 2 : 1}
            strokeDasharray={active ? '0' : '4 4'}
            opacity={active ? 0.8 : 0.4}
            markerEnd="url(#arr1)"
            style={{transition:'all 0.5s'}}
          />
        );
      })}
      {/* Nodes */}
      {nodes.map((n, i) => {
        const active = progress > (i / nodes.length * 80);
        return (
          <g key={n.id} filter={active ? "url(#glow1)" : undefined}>
            <circle cx={n.x+20} cy={n.y+20} r={active ? 26 : 20}
              fill={`${n.color}22`} stroke={n.color}
              strokeWidth={active ? 2.5 : 1.5}
              opacity={active ? 1 : 0.4}
              style={{transition:'all 0.5s'}}
            />
            <circle cx={n.x+20} cy={n.y+20} r={8} fill={n.color} opacity={active ? 0.9 : 0.3}
              style={{transition:'all 0.5s'}}
            />
            <text x={n.x+20} y={n.y+56} textAnchor="middle" fill={n.color} fontSize="10" opacity={active?1:0.4}
              fontFamily="JetBrains Mono, monospace" style={{transition:'all 0.5s'}}>
              {n.label}
            </text>
          </g>
        );
      })}
      {/* Scanning beam */}
      {isRunning && (
        <rect x={progress * 6.8 - 2} y={0} width={4} height={420}
          fill="#00c8ff" opacity={0.4}
          filter="url(#glow-strong)"
          style={{transition:'x 0.1s linear'}}
        />
      )}
      {/* Labels */}
      {['SUPPLIERS','MANUFACTURING','DISTRIBUTION','RETAIL'].map((label, i) => (
        <text key={label} x={[100, 280, 450, 610][i]} y={400} textAnchor="middle"
          fill="#4a6a7a" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
          {label}
        </text>
      ))}
    </svg>
  );
}

export default function Theme1() {
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
        <div style={{ padding: '1rem', background: 'rgba(0,200,255,0.1)', borderRadius: '12px', border: '1px solid rgba(0,200,255,0.3)' }}>
          <Shield size={32} color="#00c8ff" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0 }}>Resilient Supply Chains & Smart Manufacturing</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>AI-powered anomaly detection and risk forecasting.</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(0,200,255,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#00c8ff' }}>// SUPPLY CHAIN NETWORK MAP</h3>
            {progress === 100 && <span style={{ background: 'rgba(0,200,255,0.2)', color: '#00c8ff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>SECURED</span>}
          </div>
          <div style={{ flex: 1, minHeight: '420px', background: 'rgba(0,8,16,0.8)' }}>
            <SupplyChainViz progress={progress} isRunning={isRunning} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Risk Forecasting Engine</h3>
            <button onClick={handleRun} disabled={isRunning} style={{ width: '100%', padding: '1rem', background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #0055ff, #00c8ff)', border: 'none', borderRadius: '8px', color: isRunning ? '#fff' : '#000', fontFamily: 'var(--font-display)', fontWeight: 'bold', fontSize: '1.1rem', cursor: isRunning ? 'default' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
              <Activity size={20} className={isRunning ? 'spin' : ''} />
              {isRunning ? `Scanning Network... ${progress}%` : progress === 100 ? 'Re-Run Scan' : 'Run Disruption Forecast'}
            </button>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #0055ff, #00c8ff)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(0,200,255,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <ShieldAlert size={32} color="#00c8ff" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '3' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Disruptions Prevented</div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(0,85,255,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <Cpu size={32} color="#0055ff" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '99.9%' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI Anomaly Accuracy</div>
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
