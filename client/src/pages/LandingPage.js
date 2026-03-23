// client/src/pages/LandingPage.js
import { useState, useEffect } from 'react';

const FEATURES = [
  { icon: '✦', label: 'SEO Descriptions', desc: 'Google-ready copy that ranks and converts.', from: '#EDE8F8', to: '#D9D0F0' },
  { icon: '◈', label: 'Instagram Captions', desc: 'Scroll-stopping captions for feed & stories.', from: '#FDE8E8', to: '#FAD0D0' },
  { icon: '◎', label: 'LinkedIn Posts', desc: 'Professional copy that builds brand authority.', from: '#E8F0EC', to: '#CDDFD5' },
  { icon: '▶', label: 'Reel Scripts', desc: 'Hook-driven scripts ready to film.', from: '#F5EFD8', to: '#EDE8F8' },
];

const PREVIEW = [
  { label: 'SEO Description', text: 'Elevate your everyday with our premium handcrafted leather tote — sustainably made, endlessly versatile. Perfect for creators on the move.' },
  { label: 'Instagram Caption', text: 'okay so I finally caved and got this bag and honestly?? I\'m not okay 😭✨ it holds EVERYTHING and still looks cute...' },
  { label: 'Hashtags', text: '#aesthetic #slowliving #leatherbag #minimalstyle #thatgirl', tags: true },
];

const STATS = [
  { val: '10x', lbl: 'Faster than writing manually' },
  { val: '5+', lbl: 'Content formats at once' },
  { val: '∞', lbl: 'Brand voice combinations' },
];

export default function LandingPage({ navigate }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const tr = (delay = 0) => ({
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(18px)',
  });

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', paddingTop: 0 }}>

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 130, paddingBottom: 60, textAlign: 'center', maxWidth: 840, margin: '0 auto', padding: '130px 24px 60px' }}>
        <div style={{ ...tr(0), display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 30, background: 'rgba(255,255,255,0.75)', border: '0.5px solid var(--border)', marginBottom: 24, fontSize: 13, fontWeight: 600, color: 'var(--ink5)', backdropFilter: 'blur(8px)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage400)', animation: 'pulseSoft 2s ease-in-out infinite', display: 'inline-block' }} />
          AI-powered for creators & sellers
        </div>

        <h1 style={{ ...tr(80), fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px, 7vw, 68px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: 20 }}>
          Your Full {' '}<br/>
          <span className="grad-text">Marketing Team</span>
          <br />at one place.
        </h1>

        <p style={{ ...tr(160), fontSize: 'clamp(14px, 2vw, 18px)', color: 'var(--ink5)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.65 }}>
          Drop your product details or image. Get SEO descriptions, Instagram captions, LinkedIn posts, hashtags, and reel scripts — instantly.
        </p>

        <div style={{ ...tr(240), display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('dashboard')}
            style={{ padding: '13px 30px', borderRadius: 14, background: 'var(--ink)', color: 'var(--cream)', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', boxShadow: 'var(--shadow-md)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
          >Generate Now →</button>
          <button
            style={{ padding: '13px 30px', borderRadius: 14, background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', fontWeight: 600, fontSize: 15, border: '0.5px solid var(--border2)', cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(8px)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
          >See examples</button>
        </div>

        {/* Stats */}
        <div style={{ ...tr(320), display: 'flex', gap: 40, justifyContent: 'center', marginTop: 52, flexWrap: 'wrap' }}>
          {STATS.map(s => (
            <div key={s.val} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-1px' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--ink5)', marginTop: 4 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PREVIEW CARD ─── */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ background: 'rgba(255,255,255,0.72)', border: '0.5px solid var(--border)', borderRadius: 22, overflow: 'hidden', boxShadow: 'var(--shadow-md)', backdropFilter: 'blur(12px)' }}>
          {/* Window bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 18px', borderBottom: '0.5px solid var(--border)' }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--blush400)', opacity: 0.85 }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#F5EFD8', opacity: 0.85 }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--sage400)', opacity: 0.85 }} />
            <span style={{ flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--ink6)', fontFamily: "'DM Mono', monospace" }}>catalogr.app/generate</span>
          </div>
          <div style={{ padding: '16px 18px', display: 'grid', gap: 10 }}>
            {/* Input row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(237,232,248,0.25)', borderRadius: 13, border: '0.5px solid rgba(160,144,216,0.18)' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--lav100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>📦</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--ink5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Product</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginTop: 1 }}>Minimal Leather Tote · Gen Z · Women 18–28</div>
              </div>
              <span style={{ padding: '3px 10px', borderRadius: 30, background: 'var(--sage100)', color: 'var(--sage600)', fontSize: 11, fontWeight: 700 }}>✓ Ready</span>
            </div>
            {/* Output previews */}
            {PREVIEW.map((p, i) => (
              <div key={i} style={{ padding: '12px 14px', background: '#fff', borderRadius: 13, border: '0.5px solid var(--border)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{p.label}</span>
                  <span style={{ fontSize: 11, color: 'var(--lav400)', fontWeight: 700, cursor: 'pointer' }}>Copy</span>
                </div>
                {p.tags ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.text.split(' ').map((t, j) => (
                      <span key={j} style={{ padding: '3px 9px', borderRadius: 7, background: 'var(--lav100)', color: 'var(--lav600)', fontSize: 11, fontWeight: 700 }}>{t}</span>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.55 }}>{p.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.5px', marginBottom: 8 }}>
            Everything you need to sell
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink5)' }}>One input. Five marketing assets. Zero stress.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{ padding: '20px 18px', borderRadius: 20, background: `linear-gradient(135deg, ${f.from}, ${f.to})`, border: '0.5px solid var(--border)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.025)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: 22, marginBottom: 12, color: 'var(--lav600)' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 5 }}>{f.label}</div>
              <div style={{ fontSize: 12, color: 'var(--ink5)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'var(--ink)', borderRadius: 24, padding: '44px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'var(--lav400)', opacity: 0.07 }} />
          <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'var(--sage400)', opacity: 0.07 }} />
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: '#F5EFD8', marginBottom: 10, position: 'relative' }}>
            Ready to launch your product?
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink6)', marginBottom: 24, position: 'relative' }}>Join thousands of creators generating content in seconds.</p>
          <button
            onClick={() => navigate('dashboard')}
            style={{ padding: '13px 28px', borderRadius: 14, background: '#F5EFD8', color: 'var(--ink)', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', position: 'relative' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >Start for free — no signup needed ✦</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ paddingBottom: 32, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(135deg, var(--lav400), var(--sage400))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11 }}>✦</div>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>Catalogr</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink5)' }}>Made with ♡ for creators & sellers everywhere</p>
      </footer>
    </div>
  );
}
