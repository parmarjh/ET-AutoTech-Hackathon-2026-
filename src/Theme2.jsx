import { useState } from 'react';
import { Zap, Activity, Battery, ShieldCheck } from 'lucide-react';

export default function Theme2() {
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
        {/* Left Column: 3D Visualization */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(0,255,157,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#00ff9d' }}>// 3D SYSTEM SCAN</h3>
            {progress === 100 && <span style={{ background: 'rgba(0,255,157,0.2)', color: '#00ff9d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>OPTIMIZED</span>}
          </div>
          <div style={{ position: 'relative', flex: 1, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,255,157,0.05) 100%)' }}>
            <img 
              src={`${import.meta.env.BASE_URL}ev_retrofit.png`} 
              alt="EV Retrofit 3D Scan" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'absolute', 
                top: 0, 
                left: 0,
                opacity: progress > 0 ? 0.9 : 0.6,
                filter: progress > 0 ? 'hue-rotate(10deg) brightness(1.2)' : 'grayscale(0.5)',
                transition: 'all 1s ease'
              }} 
            />
            {/* Holographic overlay effects */}
            {isRunning && (
              <div style={{ position: 'absolute', top: `${100 - progress}%`, left: 0, right: 0, height: '2px', background: '#00ff9d', boxShadow: '0 0 20px 5px rgba(0,255,157,0.5)', transition: 'top 0.1s linear', zIndex: 10 }}></div>
            )}
          </div>
        </div>

        {/* Right Column: Controls and Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Conversion Analysis Engine</h3>
            
            <button 
              onClick={handleRun}
              disabled={isRunning}
              style={{
                width: '100%',
                padding: '1rem',
                background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #00c8ff, #00ff9d)',
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
              <Activity size={20} className={isRunning ? 'spin' : ''} />
              {isRunning ? `Analyzing... ${progress}%` : progress === 100 ? 'Re-Run Analysis' : 'Run Diagnostics & Optimization'}
            </button>

            {/* Progress bar */}
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #00c8ff, #00ff9d)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>

          {/* Metrics grid */}
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
