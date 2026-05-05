import { useState } from 'react';
import { BatteryCharging, Activity, Map, Zap } from 'lucide-react';

export default function Theme4() {
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
        <div style={{ padding: '1rem', background: 'rgba(168,85,247,0.1)', borderRadius: '12px', border: '1px solid rgba(168,85,247,0.3)' }}>
          <BatteryCharging size={32} color="#a855f7" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0 }}>Seamless EV Charging Ecosystem</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>AI-powered route optimization and smart charger availability prediction.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(168,85,247,0.2)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#a855f7' }}>// CHARGING NETWORK OPTIMIZATION</h3>
            {progress === 100 && <span style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>ROUTE PLANNED</span>}
          </div>
          <div style={{ position: 'relative', flex: 1, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(168,85,247,0.05) 100%)' }}>
            <img 
              src={`${import.meta.env.BASE_URL}ev_charging.png`} 
              alt="EV Charging 3D Map" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'absolute', 
                top: 0, 
                left: 0,
                opacity: progress > 0 ? 1 : 0.5,
                filter: progress > 0 ? 'brightness(1.4) saturate(1.2)' : 'grayscale(0.6)',
                transition: 'all 1s ease',
                transform: isRunning ? 'perspective(1000px) rotateX(5deg)' : 'perspective(1000px) rotateX(0deg)'
              }} 
            />
            {isRunning && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(168,85,247,0) 0%, rgba(168,85,247,0.1) 100%)', backgroundSize: '100% 10px', animation: 'scan 1s linear infinite' }}></div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(5,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>ONDC Network Monitor</h3>
            
            <button 
              onClick={handleRun}
              disabled={isRunning}
              style={{
                width: '100%',
                padding: '1rem',
                background: isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #a855f7, #ff00ff)',
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
              {isRunning ? `Optimizing Route... ${progress}%` : progress === 100 ? 'Calculate New Route' : 'Find Best Chargers'}
            </button>

            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #a855f7, #ff00ff)', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(168,85,247,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <Map size={32} color="#a855f7" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '12 min' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ETA to Station</div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: `1px solid rgba(255,0,255,${progress === 100 ? 0.4 : 0.1})`, transition: 'all 0.5s' }}>
              <Zap size={32} color="#ff00ff" style={{ marginBottom: '1rem', opacity: progress === 100 ? 1 : 0.4 }} />
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{progress === 100 ? '120 kW' : '--'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Available Speed</div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes scan { from { background-position: 0 0; } to { background-position: 0 100%; } }
        .spin { animation: spin 2s linear infinite; }
      `}} />
    </div>
  );
}
