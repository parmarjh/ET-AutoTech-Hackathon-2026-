import { useState } from 'react';
import { Eye, Activity, AlertTriangle, UserCheck } from 'lucide-react';

export default function Theme3() {
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
        return prev + 6;
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
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>Context-aware road risk scoring and adaptive trust modeling.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(255,107,53,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#ff6b35' }}>// DRIVER BEHAVIOR DASHBOARD</h3>
            {progress === 100 && <span style={{ background: 'rgba(255,107,53,0.2)', color: '#ff6b35', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>LIVE TELEMETRY ACTIVE</span>}
          </div>
          <div style={{ position: 'relative', flex: 1, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,107,53,0.05) 100%)' }}>
            <img 
              src="/adas_india.png" 
              alt="ADAS 3D Interface" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'absolute', 
                top: 0, 
                left: 0,
                opacity: progress > 0 ? 1 : 0.4,
                filter: progress > 0 ? 'brightness(1.3) contrast(1.2)' : 'grayscale(0.8)',
                transition: 'all 1s ease',
                transform: isRunning ? 'scale(1.02)' : 'scale(1)'
              }} 
            />
            {isRunning && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle, rgba(255,107,53,0) 60%, rgba(255,107,53,0.2) 100%)', animation: 'pulse 1s infinite alternate' }}></div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Road Risk Scorer</h3>
            
            <button 
              onClick={handleRun}
              disabled={isRunning}
              style={{
                width: '100%',
                padding: '1rem',
                background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #ff6b35, #ffb347)',
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
              {isRunning ? `Analyzing Behavior... ${progress}%` : progress === 100 ? 'Re-Calibrate ADAS' : 'Start Live ADAS Telemetry'}
            </button>

            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #ff6b35, #ffb347)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(255,107,53,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <AlertTriangle size={32} color="#ff6b35" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? 'Low' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Road Risk Level</div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(255,179,71,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <UserCheck size={32} color="#ffb347" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '94%' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Driver Trust Index</div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulse { from { opacity: 0.5; } to { opacity: 1; } }
        .spin { animation: spin 2s linear infinite; }
      `}} />
    </div>
  );
}
