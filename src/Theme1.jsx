import { useState } from 'react';
import { Shield, Activity, ShieldAlert, Cpu } from 'lucide-react';
import img from './assets/supply_chain.png';

export default function Theme1() {
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
        <div style={{ padding: '1rem', background: 'rgba(0,200,255,0.1)', borderRadius: '12px', border: '1px solid rgba(0,200,255,0.3)' }}>
          <Shield size={32} color="#00c8ff" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0 }}>Resilient Supply Chains & Smart Manufacturing</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>AI-powered anomaly detection and risk forecasting.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Left Column: 3D Visualization */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(0,200,255,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#00c8ff' }}>// SUPPLY CHAIN NETWORK MAP</h3>
            {progress === 100 && <span style={{ background: 'rgba(0,200,255,0.2)', color: '#00c8ff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>SECURED</span>}
          </div>
          <div style={{ position: 'relative', flex: 1, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,200,255,0.05) 100%)' }}>
            <img 
              src={img} 
              alt="Supply Chain 3D Map" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'absolute', 
                top: 0, 
                left: 0,
                opacity: progress > 0 ? 1 : 0.6,
                filter: progress > 0 ? 'hue-rotate(-10deg) saturate(1.5)' : 'grayscale(0.7)',
                transition: 'all 1s ease'
              }} 
            />
            {/* Holographic overlay effects */}
            {isRunning && (
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${progress}%`, width: '4px', background: '#00c8ff', boxShadow: '0 0 30px 10px rgba(0,200,255,0.6)', transition: 'left 0.1s linear', zIndex: 10 }}></div>
            )}
          </div>
        </div>

        {/* Right Column: Controls and Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Risk Forecasting Engine</h3>
            
            <button 
              onClick={handleRun}
              disabled={isRunning}
              style={{
                width: '100%',
                padding: '1rem',
                background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #0055ff, #00c8ff)',
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
              {isRunning ? `Scanning Network... ${progress}%` : progress === 100 ? 'Re-Run Scan' : 'Run Disruption Forecast'}
            </button>

            {/* Progress bar */}
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #0055ff, #00c8ff)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>

          {/* Metrics grid */}
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
