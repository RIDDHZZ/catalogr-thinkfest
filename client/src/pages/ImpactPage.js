// client/src/pages/ImpactPage.js
import { useState, useEffect, useRef } from 'react';

const CREATOR_STATS = [
  { value: '10x', label: 'Faster content creation', sub: 'vs writing manually' },
  { value: '3.2x', label: 'More engagement', sub: 'avg across Instagram posts' },
  { value: '67%', label: 'Time saved per week', sub: 'on marketing copy' },
  { value: '4.8★', label: 'Creator satisfaction', sub: 'out of 5 stars' },
];

const BUSINESS_STATS = [
  { value: '2.4x', label: 'More product listings', sub: 'created per week' },
  { value: '41%', label: 'Higher SEO ranking', sub: 'avg improvement in 60 days' },
  { value: '58%', label: 'More conversions', sub: 'with AI-optimised copy' },
  { value: '$2,400', label: 'Saved annually', sub: 'vs hiring a copywriter' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    handle: '@priyacreates',
    avatar: 'PS',
    type: 'creator',
    color: 'var(--lav100)',
    textColor: 'var(--lav600)',
    followers: '142K followers',
    quote: 'I used to spend 2 hours writing captions for one product drop. Now I do the whole collection in 10 minutes. My engagement literally doubled because the copy actually sounds like me.',
    metric: '2x engagement',
    metricColor: 'var(--lav400)',
  },
  {
    name: 'Arjun Mehta',
    handle: 'Founder, ThreadCo',
    avatar: 'AM',
    type: 'business',
    color: 'var(--sage100)',
    textColor: 'var(--sage600)',
    followers: 'E-commerce brand',
    quote: 'We sell 200+ SKUs. Writing SEO descriptions for all of them was impossible. Catalogr cut our content production time by 70% and our Google traffic went up 41% in two months.',
    metric: '+41% organic traffic',
    metricColor: 'var(--sage400)',
  },
  {
    name: 'Zara Khatri',
    handle: '@zarastyled',
    avatar: 'ZK',
    type: 'creator',
    color: 'var(--blush100)',
    textColor: 'var(--blush400)',
    followers: '89K followers',
    quote: 'The Gen Z brand voice is SCARY accurate. My followers can\'t tell the difference between my usual captions and the AI ones. That\'s how good this is.',
    metric: '3.5x saves per post',
    metricColor: 'var(--blush400)',
  },
  {
    name: 'Ravi Patel',
    handle: 'CEO, NaturalNest',
    avatar: 'RP',
    type: 'business',
    color: 'var(--lav100)',
    textColor: 'var(--lav600)',
    followers: 'D2C brand',
    quote: 'We were spending ₹80,000/month on a content agency. Catalogr replaced 80% of that work at a fraction of the cost. The LinkedIn posts alone brought in 3 B2B deals.',
    metric: '₹80K/mo saved',
    metricColor: 'var(--lav400)',
  },
  {
    name: 'Meera Iyer',
    handle: '@meeramakes',
    avatar: 'MI',
    type: 'creator',
    color: 'var(--sage100)',
    textColor: 'var(--sage600)',
    followers: '34K followers',
    quote: 'I launched my first product collection using Catalogr for all the copy. Sold out in 48 hours. The reel script was the best thing — I just read it on camera and it converted like crazy.',
    metric: 'Sold out in 48hrs',
    metricColor: 'var(--sage400)',
  },
  {
    name: 'Karan Shah',
    handle: 'Marketing Head, StyleVault',
    avatar: 'KS',
    type: 'business',
    color: 'var(--blush100)',
    textColor: 'var(--blush400)',
    followers: 'Fashion retail',
    quote: 'Our team of 3 marketers now handles the content workload that used to require 8 people. The SEO descriptions are especially strong — they rank on page one within weeks.',
    metric: 'Page 1 rankings',
    metricColor: 'var(--blush400)',
  },
];

const BEFORE_AFTER = [
  {
    type: 'Creator',
    icon: '◈',
    color: 'var(--lav400)',
    before: [
      'Writing 1 caption = 45 mins',
      'Inconsistent brand voice',
      'Generic hashtags',
      'No LinkedIn presence',
      'Skipping product launches',
    ],
    after: [
      'Writing 1 caption = 2 mins',
      'Consistent, on-brand tone always',
      '20 targeted hashtags instantly',
      'LinkedIn posts in one click',
      'Launch every product confidently',
    ],
  },
  {
    type: 'Business',
    icon: '◎',
    color: 'var(--sage400)',
    before: [
      'Agency costs $2,000+/month',
      'SEO copy takes 3–5 days',
      'Inconsistent product listings',
      'Missing video content strategy',
      'Marketing bottleneck slows sales',
    ],
    after: [
      'Full copy suite for $39/month',
      'SEO descriptions in 30 seconds',
      'Uniform, professional listings',
      'Reel scripts for every product',
      'Launch products same-day',
    ],
  },
];

function CountUp({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target.replace(/[^0-9.]/g, ''));
        const steps = 60;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          setCount(Math.round((num * step) / steps * 10) / 10);
          if (step >= steps) clearInterval(timer);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function ImpactPage({ navigate }) {
  const [activeTab, setActiveTab] = useState('creator');

  const stats = activeTab === 'creator' ? CREATOR_STATS : BUSINESS_STATS;
  const testimonials = TESTIMONIALS.filter(t => t.type === activeTab);

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 120, paddingBottom: 48, textAlign: 'center', maxWidth: 720, margin: '0 auto', padding: '120px 24px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 30, background: 'rgba(255,255,255,0.75)', border: '0.5px solid var(--border)', marginBottom: 20, fontSize: 12, fontWeight: 700, color: 'var(--ink5)' }}>
          ◎ Real results from real users
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          What happens after<br />
          <span className="grad-text">you start using Catalogr</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink5)', lineHeight: 1.65 }}>
          Hundreds of creators and businesses have transformed their content workflow. Here's what changed for them.
        </p>
      </section>

      {/* ── TAB SELECTOR ── */}
      <section style={{ maxWidth: 400, margin: '0 auto 48px', padding: '0 24px' }}>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)', borderRadius: 16, padding: 5, gap: 4, backdropFilter: 'blur(8px)' }}>
          {['creator', 'business'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '10px', borderRadius: 12, fontWeight: 700, fontSize: 13,
                border: 'none', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === tab ? 'var(--ink)' : 'transparent',
                color: activeTab === tab ? 'var(--cream)' : 'var(--ink5)',
              }}
            >
              {tab === 'creator' ? '◈ Creators' : '◎ Businesses'}
            </button>
          ))}
        </div>
      </section>

      {/* ── STATS GRID ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{ padding: '24px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.82)', border: '0.5px solid var(--border)', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}
            >
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1.5px', marginBottom: 6 }}>
                <CountUp
                  target={stat.value}
                  prefix={stat.value.startsWith('$') ? '$' : stat.value.startsWith('₹') ? '₹' : ''}
                  suffix={stat.value.endsWith('%') ? '%' : stat.value.endsWith('x') ? 'x' : stat.value.endsWith('★') ? '★' : ''}
                />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: 'var(--ink5)' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 64px' }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 700, color: 'var(--ink)', textAlign: 'center', marginBottom: 32, letterSpacing: '-0.5px' }}>
          Before vs After Catalogr
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
          {BEFORE_AFTER.filter(b => b.type.toLowerCase() === activeTab).map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {/* Before */}
              <div style={{ padding: '20px 18px', borderRadius: 18, background: 'rgba(255,255,255,0.7)', border: '0.5px solid var(--border)' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Before</div>
                <div style={{ display: 'grid', gap: 9 }}>
                  {item.before.map((b, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12, color: 'var(--ink4)', lineHeight: 1.45 }}>
                      <span style={{ color: 'var(--blush400)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗</span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              {/* After */}
              <div style={{ padding: '20px 18px', borderRadius: 18, background: activeTab === 'creator' ? 'rgba(237,232,248,0.6)' : 'rgba(232,240,236,0.6)', border: `0.5px solid ${activeTab === 'creator' ? 'rgba(160,144,216,0.25)' : 'rgba(139,176,154,0.25)'}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: item.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>After ✦</div>
                <div style={{ display: 'grid', gap: 9 }}>
                  {item.after.map((a, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12, color: 'var(--ink3)', lineHeight: 1.45 }}>
                      <span style={{ color: 'var(--sage400)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 64px' }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 700, color: 'var(--ink)', textAlign: 'center', marginBottom: 32, letterSpacing: '-0.5px' }}>
          Straight from our users
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 14 }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{ padding: '22px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.85)', border: '0.5px solid var(--border)', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: t.textColor, flexShrink: 0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink5)' }}>{t.handle} · {t.followers}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.65, marginBottom: 14, fontStyle: 'italic' }}>"{t.quote}"</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 30, background: t.color, fontSize: 11, fontWeight: 800, color: t.textColor }}>
                ✦ {t.metric}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'var(--ink)', borderRadius: 24, padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'var(--sage400)', opacity: 0.08 }} />
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: '#F5EFD8', marginBottom: 8, position: 'relative' }}>
            Your turn to transform
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink6)', marginBottom: 22, position: 'relative' }}>
            Join thousands of creators and businesses already using Catalogr.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <button
              onClick={() => navigate('signup')}
              style={{ padding: '12px 24px', borderRadius: 12, background: '#F5EFD8', color: 'var(--ink)', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >Get started free ✦</button>
            <button
              onClick={() => navigate('pricing')}
              style={{ padding: '12px 24px', borderRadius: 12, background: 'transparent', color: '#F5EFD8', fontWeight: 600, fontSize: 13, border: '0.5px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontFamily: 'inherit' }}
            >View pricing →</button>
          </div>
        </div>
      </section>
    </div>
  );
}