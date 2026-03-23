// client/src/pages/CompetitorAnalysisPage.js
import { useState } from 'react';
import toast from 'react-hot-toast';

const INDUSTRIES = [
  'Fashion & Apparel', 'Beauty & Skincare', 'Food & Beverage',
  'Health & Fitness', 'Home Decor', 'Tech & Gadgets',
  'Jewellery & Accessories', 'Stationery & Lifestyle', 'Pet Products', 'Other',
];

const MOCK_COMPETITORS = [
  {
    name: 'CompetitorA',
    handle: '@competitora',
    followers: '124K',
    engagement: '2.1%',
    weaknesses: ['Generic captions', 'No storytelling', 'Keyword stuffing in SEO', 'Low hashtag variety'],
    seoScore: 58,
    captionScore: 44,
    hashtagScore: 62,
  },
  {
    name: 'CompetitorB',
    handle: '@competitorb',
    followers: '89K',
    engagement: '1.8%',
    weaknesses: ['Outdated tone', 'No CTA in captions', 'Poor keyword density', 'Missing long-tail tags'],
    seoScore: 51,
    captionScore: 38,
    hashtagScore: 55,
  },
  {
    name: 'CompetitorC',
    handle: '@competitorc',
    followers: '210K',
    engagement: '0.9%',
    weaknesses: ['High followers but low engagement', 'Repetitive copy', 'No brand voice', 'Weak hooks'],
    seoScore: 67,
    captionScore: 52,
    hashtagScore: 70,
  },
];

function ScoreBar({ score, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{
          width: `${score}%`, height: '100%', borderRadius: 99,
          background: color,
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink3)', minWidth: 28 }}>{score}</span>
    </div>
  );
}

function OurScoreBar({ score, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{
          width: `${score}%`, height: '100%', borderRadius: 99,
          background: `linear-gradient(90deg, ${color}, var(--lav400))`,
          transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 8px ${color}55`,
        }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)', minWidth: 28 }}>{score}</span>
    </div>
  );
}

export default function CompetitorAnalysisPage({ navigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    productName: '',
    industry: 'Fashion & Apparel',
    competitors: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeComp, setActiveComp] = useState(0);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const runAnalysis = async () => {
    if (!form.productName.trim()) { toast.error('Enter your product name'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 3200));

    const name = form.productName;
    setResults({
      competitors: MOCK_COMPETITORS,
      ourScores: { seo: 94, caption: 91, hashtag: 96 },
      optimisedSEO: `Introducing ${name} — the ${form.industry.toLowerCase()} essential that actually gets it right. While others focus on trends, we obsess over quality, sustainability, and the details that matter most to you.\n\nHandcrafted with precision and designed for longevity, ${name} bridges the gap between everyday functionality and elevated aesthetics. Perfect for those who want their purchases to mean something.\n\nJoin thousands of customers who've made the switch. ${name} — because you deserve better than average. Free shipping on all orders. 30-day returns.`,
      optimisedCaption: `not to be dramatic but this changed everything 😭✨\n\nintroducing ${name} — and yes, it's as good as it looks. we saw what everyone else was doing and decided to just... do it better. the details, the quality, the feel of it.\n\nyour fave thing you didn't know you needed is here. link in bio 🔗\n\n#${name.replace(/\s+/g, '').toLowerCase()} #newdrop`,
      optimisedHashtags: `#${name.replace(/\s+/g, '').toLowerCase()} #newdrop #${form.industry.replace(/\s+&\s+/g, '').replace(/\s+/g, '').toLowerCase()} #shopnow #aesthetic #qualitymatters #smallbusiness #newlaunch #musthave #trending #explore #instashop #productlaunch #obsessed #shopsmall #curated #mindfulbuying #shoplocal #fyp #viral`,
      advantages: [
        'Stronger emotional hooks in every caption',
        '2.3x better keyword density in SEO copy',
        'Hashtag mix covers trending + niche + branded',
        'Consistent brand voice across all formats',
        'CTA placement optimised for conversion',
        'Story-driven copy vs competitor\'s list-style',
      ],
    });
    setLoading(false);
    setStep(2);
  };

  const inputStyle = {
    width: '100%', padding: '11px 13px', borderRadius: 12,
    border: '0.5px solid var(--border2)', background: 'rgba(255,255,255,0.8)',
    fontSize: 13, color: 'var(--ink)', fontFamily: "'DM Sans', sans-serif",
    outline: 'none', transition: 'all 0.2s',
  };

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', paddingTop: 0 }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 110, paddingBottom: 32, textAlign: 'center', maxWidth: 680, margin: '0 auto', padding: '110px 24px 32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 30, background: 'rgba(255,255,255,0.75)', border: '0.5px solid var(--border)', marginBottom: 18, fontSize: 12, fontWeight: 700, color: 'var(--ink5)' }}>
          ◐ AI-Powered Competitor Analysis
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          See what competitors miss.<br />
          <span className="grad-text">Win with better copy.</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink5)', lineHeight: 1.65 }}>
          Enter your product and industry. We analyse competitor content weaknesses and generate optimised SEO, captions, and hashtags that outperform them.
        </p>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>

        {step === 1 && (
          <div style={{ maxWidth: 620, margin: '0 auto' }}>
            <div style={{ background: 'rgba(255,255,255,0.82)', border: '0.5px solid var(--border)', borderRadius: 24, padding: '28px 24px', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
                <div style={{ width: 28, height: 28, borderRadius: 9, background: 'var(--lav100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lav600)', fontSize: 13 }}>◐</div>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>Set up your analysis</span>
              </div>

              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Your Product Name *</label>
                  <input style={inputStyle} value={form.productName} onChange={e => update('productName', e.target.value)} placeholder="e.g. Minimal Leather Tote"
                    onFocus={e => { e.target.style.borderColor = 'rgba(160,144,216,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(160,144,216,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Industry / Niche</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236B6B80' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 13px center', appearance: 'none' }}
                    value={form.industry} onChange={e => update('industry', e.target.value)}>
                    {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Competitor Handles (optional)</label>
                  <input style={inputStyle} value={form.competitors} onChange={e => update('competitors', e.target.value)} placeholder="e.g. @brand1, @brand2, @brand3"
                    onFocus={e => { e.target.style.borderColor = 'rgba(160,144,216,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(160,144,216,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <p style={{ fontSize: 11, color: 'var(--ink5)', marginTop: 5 }}>Leave blank and we'll find top competitors in your industry automatically</p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Your Product Description</label>
                  <textarea style={{ ...inputStyle, resize: 'none', height: 80, lineHeight: 1.55 }} value={form.description} onChange={e => update('description', e.target.value)} placeholder="What makes your product better? Any unique features or values..."
                    onFocus={e => { e.target.style.borderColor = 'rgba(160,144,216,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(160,144,216,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <button onClick={runAnalysis} disabled={loading}
                  style={{ width: '100%', padding: '13px', borderRadius: 13, fontWeight: 700, fontSize: 14, border: 'none', fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(0,0,0,0.06)' : 'var(--ink)', color: loading ? 'var(--ink6)' : 'var(--cream)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <span style={{ display: 'flex', gap: 4 }}><span className="dot" /><span className="dot" /><span className="dot" /></span>
                      Analysing competitors...
                    </span>
                  ) : '◐ Run Competitor Analysis'}
                </button>
              </div>
            </div>

            {/* How it works */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 16 }}>
              {[
                { icon: '◐', title: 'Scan competitors', desc: 'We analyse top players in your niche' },
                { icon: '✦', title: 'Find weaknesses', desc: 'Identify gaps in their copy & SEO' },
                { icon: '◎', title: 'Beat them', desc: 'Generate copy that outranks & outperforms' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '16px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.7)', border: '0.5px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, marginBottom: 8, color: 'var(--lav400)' }}>{s.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink5)', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && results && (
          <div className="animate-fade-in">
            {/* Back button */}
            <button onClick={() => { setStep(1); setResults(null); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 11, border: '0.5px solid var(--border)', background: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, color: 'var(--ink5)', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
            >← New Analysis</button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

              {/* LEFT — Competitor scores */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ padding: '20px', borderRadius: 20, background: 'rgba(255,255,255,0.82)', border: '0.5px solid var(--border)', backdropFilter: 'blur(12px)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Competitor Scores (avg)</div>

                  {/* Competitor tabs */}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                    {results.competitors.map((c, i) => (
                      <button key={i} onClick={() => setActiveComp(i)} style={{ padding: '5px 11px', borderRadius: 9, fontSize: 11, fontWeight: 700, border: '0.5px solid', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.18s', background: activeComp === i ? 'var(--ink)' : 'rgba(255,255,255,0.7)', color: activeComp === i ? 'var(--cream)' : 'var(--ink5)', borderColor: activeComp === i ? 'transparent' : 'var(--border)' }}>{c.handle}</button>
                    ))}
                  </div>

                  {/* Selected competitor */}
                  {(() => {
                    const c = results.competitors[activeComp];
                    return (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{c.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--ink5)' }}>{c.followers} followers · {c.engagement} engagement</div>
                          </div>
                          <div style={{ padding: '4px 10px', borderRadius: 9, background: 'var(--blush100)', color: 'var(--blush400)', fontSize: 11, fontWeight: 700, height: 'fit-content' }}>Weak</div>
                        </div>

                        <div style={{ display: 'grid', gap: 10, marginBottom: 14 }}>
                          {[
                            { label: 'SEO Score', score: c.seoScore, color: 'var(--blush400)' },
                            { label: 'Caption Score', score: c.captionScore, color: 'var(--blush400)' },
                            { label: 'Hashtag Score', score: c.hashtagScore, color: 'var(--blush400)' },
                          ].map(s => (
                            <div key={s.label}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink5)' }}>{s.label}</span>
                              </div>
                              <ScoreBar score={s.score} color={s.color} />
                            </div>
                          ))}
                        </div>

                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Weaknesses Found</div>
                        <div style={{ display: 'grid', gap: 6 }}>
                          {c.weaknesses.map((w, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--ink4)' }}>
                              <span style={{ color: 'var(--blush400)', fontWeight: 700, flexShrink: 0 }}>✗</span>{w}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Our scores */}
                <div style={{ padding: '20px', borderRadius: 20, background: 'linear-gradient(135deg, rgba(237,232,248,0.7), rgba(232,240,236,0.7))', border: '0.5px solid rgba(160,144,216,0.2)', backdropFilter: 'blur(12px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--lav600)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Your Catalogr Scores</div>
                    <div style={{ padding: '4px 10px', borderRadius: 9, background: 'var(--sage100)', color: 'var(--sage600)', fontSize: 11, fontWeight: 700 }}>↑ Winning</div>
                  </div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {[
                      { label: 'SEO Score', score: results.ourScores.seo, color: 'var(--sage400)' },
                      { label: 'Caption Score', score: results.ourScores.caption, color: 'var(--lav400)' },
                      { label: 'Hashtag Score', score: results.ourScores.hashtag, color: 'var(--sage400)' },
                    ].map(s => (
                      <div key={s.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink4)' }}>{s.label}</span>
                        </div>
                        <OurScoreBar score={s.score} color={s.color} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, display: 'grid', gap: 5 }}>
                    {results.advantages.map((a, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--ink3)' }}>
                        <span style={{ color: 'var(--sage400)', fontWeight: 700, flexShrink: 0 }}>✓</span>{a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — Optimised copy */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Optimised SEO Description', icon: '◎', content: results.optimisedSEO, color: 'var(--sage100)', textColor: 'var(--sage600)' },
                  { label: 'Optimised Instagram Caption', icon: '◈', content: results.optimisedCaption, color: 'var(--lav100)', textColor: 'var(--lav600)' },
                  { label: 'Optimised Hashtags', icon: '#', content: results.optimisedHashtags, color: 'var(--blush100)', textColor: 'var(--blush400)', isHashtags: true },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '18px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.82)', border: '0.5px solid var(--border)', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-soft)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 24, height: 24, borderRadius: 7, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: item.textColor, fontWeight: 700 }}>{item.icon}</div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink4)' }}>{item.label}</span>
                      </div>
                      <button onClick={() => { navigator.clipboard.writeText(item.content); toast.success('Copied!'); }}
                        style={{ padding: '4px 11px', borderRadius: 8, background: item.color, color: item.textColor, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                        ⎘ Copy
                      </button>
                    </div>
                    {item.isHashtags ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {item.content.split(' ').filter(t => t.startsWith('#')).map((tag, j) => (
                          <span key={j} onClick={() => { navigator.clipboard.writeText(tag); toast.success(`${tag} copied!`); }}
                            style={{ padding: '4px 10px', borderRadius: 7, background: 'var(--lav100)', color: 'var(--lav600)', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--lav200)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--lav100)'; e.currentTarget.style.transform = 'scale(1)'; }}
                          >{tag}</span>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{item.content}</p>
                    )}
                  </div>
                ))}

                {/* CTA to generate more */}
                <button onClick={() => navigate('dashboard')}
                  style={{ padding: '14px', borderRadius: 14, background: 'var(--ink)', color: 'var(--cream)', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >✦ Generate full campaign with these insights →</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
