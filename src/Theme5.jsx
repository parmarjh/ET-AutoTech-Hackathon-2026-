import { useState } from 'react';
import { Leaf, Activity, RefreshCw, BarChart3 } from 'lucide-react';

export default function Theme5() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
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
        {/* Left Column: 3D Visualization */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(245,158,11,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#f59e0b' }}>// MATERIAL RECOVERY SIMULATION</h3>
            {progress === 100 && <span style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>SIMULATION COMPLETE</span>}
          </div>
          <div style={{ position: 'relative', flex: 1, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(245,158,11,0.05) 100%)' }}>
            <img 
              src={`${import.meta.env.BASE_URL}circular_economy.png`} 
              alt="Circular Economy 3D Simulation" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'absolute', 
                top: 0, 
                left: 0,
                opacity: progress > 0 ? 1 : 0.5,
                filter: progress > 0 ? 'saturate(1.2)' : 'grayscale(0.8)',
                transition: 'all 1s ease',
                transform: isRunning ? 'scale(1.05)' : 'scale(1)'
              }} 
            />
            {/* Circular scanning effect */}
            {isRunning && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: `${progress}%`, height: `${progress}%`, borderRadius: '50%', border: '2px solid rgba(245,158,11,0.5)', transform: 'translate(-50%, -50%)', transition: 'all 0.1s linear', boxShadow: '0 0 30px rgba(245,158,11,0.3)', pointerEvents: 'none' }}></div>
            )}
          </div>
        </div>

        {/* Right Column: Controls and Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Material Passport Generator</h3>
            
            <button 
              onClick={handleRun}
              disabled={isRunning}
              style={{
                width: '100%',
                padding: '1rem',
                background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #f59e0b, #ef4444)',
                border: 'none',
                borderRadius: '8px',
                color: isRunning ? '#fff' : '#000',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: isRunning ? 'default' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
            >
              <RefreshCw size={20} className={isRunning ? 'spin' : ''} />
              {isRunning ? `Extracting Data... ${progress}%` : progress === 100 ? 'Re-Run Extraction' : 'Run Material Analysis'}
            </button>

            {/* Progress bar */}
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #f59e0b, #ef4444)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>

          {/* Metrics grid */}
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
