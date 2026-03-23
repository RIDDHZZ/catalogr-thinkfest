// client/src/components/Navbar.js
import { useState, useEffect } from 'react';

export default function Navbar({ dark, toggleDark, navigate, page }) {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const tools = [
    { label: '✦ Content Generator', page: 'dashboard', desc: 'SEO, captions, hashtags' },
    { label: '◐ Competitor Analysis', page: 'competitor', desc: 'Beat rivals with better copy' },
    { label: '◎ Campaign Generator', page: 'campaign', desc: 'Full multi-phase campaigns' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '10px 28px' : '16px 28px',
      background: scrolled ? (dark ? 'rgba(15,15,18,0.92)' : 'rgba(254,253,248,0.92)') : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '0.5px solid var(--border)' : '0.5px solid transparent',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? 'var(--shadow-soft)' : 'none',
    }}>

      {/* Logo */}
      <button onClick={() => navigate('landing')} style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, color: 'var(--ink)', background: 'none', border: 'none' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #A090D8, #8BB09A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >✦</div>
        Catalogr
      </button>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 2, alignItems: 'center', position: 'relative' }}>

        {/* Tools dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setToolsOpen(o => !o)}
            style={{ padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: ['dashboard','competitor','campaign'].includes(page) ? 'var(--ink)' : 'var(--ink5)', background: ['dashboard','competitor','campaign'].includes(page) ? 'rgba(0,0,0,0.05)' : 'none', border: 'none', transition: 'all 0.18s', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ['dashboard','competitor','campaign'].includes(page) ? 'rgba(0,0,0,0.05)' : 'none'; e.currentTarget.style.color = ['dashboard','competitor','campaign'].includes(page) ? 'var(--ink)' : 'var(--ink5)'; }}
          >
            Tools <span style={{ fontSize: 10, transition: 'transform 0.2s', display: 'inline-block', transform: toolsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
          </button>

          {toolsOpen && (
            <div style={{ position: 'absolute', top: '110%', left: 0, width: 240, background: 'rgba(254,253,248,0.97)', border: '0.5px solid var(--border)', borderRadius: 16, boxShadow: 'var(--shadow-md)', overflow: 'hidden', backdropFilter: 'blur(14px)', zIndex: 200 }}>
              {tools.map(tool => (
                <button key={tool.page} onClick={() => { navigate(tool.page); setToolsOpen(false); }} style={{ width: '100%', padding: '12px 16px', background: 'none', border: 'none', borderBottom: '0.5px solid var(--border)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--lav50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>{tool.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink5)' }}>{tool.desc}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {[
          { label: 'Pricing', page: 'pricing' },
          { label: 'Impact', page: 'impact' },
        ].map(link => (
          <button key={link.label} onClick={() => navigate(link.page)} style={{ padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: page === link.page ? 'var(--ink)' : 'var(--ink5)', background: page === link.page ? 'rgba(0,0,0,0.05)' : 'none', border: 'none', transition: 'all 0.18s', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = page === link.page ? 'rgba(0,0,0,0.05)' : 'none'; e.currentTarget.style.color = page === link.page ? 'var(--ink)' : 'var(--ink5)'; }}
          >{link.label}</button>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={toggleDark} style={{ width: 36, height: 36, borderRadius: 10, border: '0.5px solid var(--border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: 'var(--ink5)', cursor: 'pointer', transition: 'all 0.18s' }} title="Toggle dark mode"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = 'var(--ink)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink5)'; }}
        >{dark ? '☀︎' : '☽'}</button>

        <button onClick={() => navigate('auth')} style={{ padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--ink5)', background: 'transparent', border: '0.5px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink5)'; e.currentTarget.style.background = 'transparent'; }}
        >Sign in</button>

        <button onClick={() => navigate('register')} style={{ padding: '8px 18px', borderRadius: 11, background: 'var(--ink)', color: 'var(--cream)', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
        >Get started →</button>
      </div>

      {/* Close dropdown when clicking outside */}
      {toolsOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setToolsOpen(false)} />}
    </nav>
  );
}