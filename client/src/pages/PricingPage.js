// client/src/pages/PricingPage.js
import { useState } from 'react';

const PLANS = [
  {
    id: 'free',
    name: 'Starter',
    emoji: '✦',
    price: { monthly: 0, yearly: 0 },
    tagline: 'Try before you commit',
    color: 'var(--sage100)',
    colorDark: 'var(--sage400)',
    textColor: 'var(--sage600)',
    features: [
      '5 generations per month',
      'SEO Description',
      'Instagram Caption',
      'Hashtag Generator',
      'Gen Z & Minimal voices',
      'Basic history (7 days)',
    ],
    missing: [
      'LinkedIn Post',
      'Reel Script',
      'Image upload',
      'All brand voices',
      'Priority support',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    id: 'creator',
    name: 'Creator',
    emoji: '◈',
    price: { monthly: 12, yearly: 8 },
    tagline: 'For Instagram sellers & content creators',
    color: 'var(--lav100)',
    colorDark: 'var(--lav400)',
    textColor: 'var(--lav600)',
    features: [
      '100 generations per month',
      'All 5 content formats',
      'Image upload (AI vision)',
      'All 6 brand voices',
      'Reel Script generator',
      'History (30 days)',
      'Copy & edit outputs',
      'Email support',
    ],
    missing: [
      'Team members',
      'API access',
      'White-label exports',
    ],
    cta: 'Start Creator',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    emoji: '◎',
    price: { monthly: 39, yearly: 28 },
    tagline: 'For brands, agencies & e-commerce stores',
    color: 'var(--ink)',
    colorDark: 'var(--ink)',
    textColor: '#fff',
    features: [
      'Unlimited generations',
      'All 5 content formats',
      'Image upload (AI vision)',
      'All 6 brand voices',
      'Reel Script generator',
      'Unlimited history',
      '5 team members',
      'API access',
      'White-label exports',
      'Priority support',
      'Custom brand voice',
      'Bulk generation',
    ],
    missing: [],
    cta: 'Start Business',
    popular: false,
  },
];

const FAQS = [
  { q: 'Can I switch plans anytime?', a: 'Yes! Upgrade or downgrade anytime. When you upgrade, you get access immediately. When you downgrade, changes take effect at your next billing cycle.' },
  { q: 'What counts as a generation?', a: 'Each time you click "Generate Content" counts as one generation — this gives you all 5 content formats at once (SEO, Instagram, LinkedIn, Hashtags, Reel Script).' },
  { q: 'Do you offer refunds?', a: 'Yes, we offer a 7-day money-back guarantee on all paid plans. No questions asked.' },
  { q: 'Is my API key stored securely?', a: 'We never store your Anthropic API key. All requests are made server-side and your key stays in your environment.' },
  { q: 'Can I use my own Anthropic API key?', a: 'On the Business plan, yes! You can bring your own Anthropic API key for maximum control and cost transparency.' },
];

export default function PricingPage({ navigate }) {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', paddingTop: 0 }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 120, paddingBottom: 48, textAlign: 'center', maxWidth: 680, margin: '0 auto', padding: '120px 24px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 30, background: 'rgba(255,255,255,0.75)', border: '0.5px solid var(--border)', marginBottom: 20, fontSize: 12, fontWeight: 700, color: 'var(--ink5)' }}>
          ✦ Simple, transparent pricing
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          Plans that grow<br />
          <span className="grad-text">with your hustle</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink5)', lineHeight: 1.65, marginBottom: 28 }}>
          Start free. Upgrade when you're ready. No hidden fees, no surprises.
        </p>

        {/* Toggle */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '6px 8px', borderRadius: 14, background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)' }}>
          <button
            onClick={() => setYearly(false)}
            style={{ padding: '7px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, border: 'none', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s', background: !yearly ? 'var(--ink)' : 'transparent', color: !yearly ? '#fff' : 'var(--ink5)' }}
          >Monthly</button>
          <button
            onClick={() => setYearly(true)}
            style={{ padding: '7px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, border: 'none', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s', background: yearly ? 'var(--ink)' : 'transparent', color: yearly ? '#fff' : 'var(--ink5)', display: 'flex', alignItems: 'center', gap: 7 }}
          >
            Yearly
            <span style={{ padding: '2px 8px', borderRadius: 6, background: 'var(--sage400)', color: '#fff', fontSize: 10, fontWeight: 800 }}>-33%</span>
          </button>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} yearly={yearly} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px 64px' }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: 'var(--ink)', textAlign: 'center', marginBottom: 28, letterSpacing: '-0.5px' }}>
          What's included
        </h2>
        <div style={{ background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)', borderRadius: 20, overflow: 'hidden', backdropFilter: 'blur(12px)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid var(--border)' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Feature</th>
                {PLANS.map(p => (
                  <th key={p.id} style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: p.popular ? 'var(--lav600)' : 'var(--ink)' }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Generations / month', '5', '100', 'Unlimited'],
                ['SEO Description', '✓', '✓', '✓'],
                ['Instagram Caption', '✓', '✓', '✓'],
                ['Hashtag Generator', '✓', '✓', '✓'],
                ['LinkedIn Post', '✗', '✓', '✓'],
                ['Reel Script', '✗', '✓', '✓'],
                ['Image Upload (Vision AI)', '✗', '✓', '✓'],
                ['All Brand Voices', '✗', '✓', '✓'],
                ['History', '7 days', '30 days', 'Unlimited'],
                ['Team Members', '✗', '✗', '5'],
                ['API Access', '✗', '✗', '✓'],
                ['Priority Support', '✗', '✗', '✓'],
              ].map(([feature, starter, creator, business], i) => (
                <tr key={feature} style={{ borderBottom: '0.5px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                  <td style={{ padding: '12px 20px', fontSize: 13, color: 'var(--ink3)', fontWeight: 500 }}>{feature}</td>
                  {[starter, creator, business].map((val, j) => (
                    <td key={j} style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: val === '✓' ? 'var(--sage600)' : val === '✗' ? 'var(--ink6)' : 'var(--ink)' }}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 64px' }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: 'var(--ink)', textAlign: 'center', marginBottom: 28, letterSpacing: '-0.5px' }}>
          Frequently asked
        </h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{ background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)', borderRadius: 14, overflow: 'hidden', backdropFilter: 'blur(8px)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{faq.q}</span>
                <span style={{ fontSize: 18, color: 'var(--ink5)', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', flexShrink: 0, marginLeft: 12 }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 18px 16px', fontSize: 13, color: 'var(--ink5)', lineHeight: 1.65 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'var(--ink)', borderRadius: 24, padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'var(--lav400)', opacity: 0.08 }} />
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: '#F5EFD8', marginBottom: 8, position: 'relative' }}>Still deciding?</h2>
          <p style={{ fontSize: 14, color: 'var(--ink6)', marginBottom: 22, position: 'relative' }}>Start free — no credit card needed. Upgrade only when you love it.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <button
              onClick={() => navigate('signup')}
              style={{ padding: '12px 24px', borderRadius: 12, background: '#F5EFD8', color: 'var(--ink)', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >Start for free ✦</button>
            <button
              onClick={() => navigate('dashboard')}
              style={{ padding: '12px 24px', borderRadius: 12, background: 'transparent', color: '#F5EFD8', fontWeight: 600, fontSize: 13, border: '0.5px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontFamily: 'inherit' }}
            >Try the generator →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanCard({ plan, yearly, navigate }) {
  const price = yearly ? plan.price.yearly : plan.price.monthly;
  const isInk = plan.color === 'var(--ink)';

  return (
    <div style={{
      background: isInk ? 'var(--ink)' : 'rgba(255,255,255,0.82)',
      border: plan.popular ? `2px solid var(--lav400)` : '0.5px solid var(--border)',
      borderRadius: 22,
      padding: '28px 24px',
      position: 'relative',
      backdropFilter: 'blur(12px)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: plan.popular ? '0 8px 40px rgba(160,144,216,0.2)' : 'var(--shadow-soft)',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = plan.popular ? '0 8px 40px rgba(160,144,216,0.2)' : 'var(--shadow-soft)'; }}
    >
      {plan.popular && (
        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', borderRadius: 30, background: 'var(--lav400)', color: '#fff', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>
          Most Popular
        </div>
      )}

      {/* Plan header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: isInk ? 'rgba(255,255,255,0.1)' : plan.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: isInk ? '#fff' : plan.textColor }}>
          {plan.emoji}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: isInk ? '#F5EFD8' : 'var(--ink)' }}>{plan.name}</div>
          <div style={{ fontSize: 11, color: isInk ? 'rgba(245,239,216,0.6)' : 'var(--ink5)', marginTop: 1 }}>{plan.tagline}</div>
        </div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 900, color: isInk ? '#F5EFD8' : 'var(--ink)', letterSpacing: '-1px' }}>
            {price === 0 ? 'Free' : `$${price}`}
          </span>
          {price > 0 && (
            <span style={{ fontSize: 13, color: isInk ? 'rgba(245,239,216,0.5)' : 'var(--ink5)', fontWeight: 500 }}>/ mo</span>
          )}
        </div>
        {yearly && price > 0 && (
          <div style={{ fontSize: 11, color: 'var(--sage400)', fontWeight: 700, marginTop: 2 }}>
            Billed yearly · Save ${(plan.price.monthly - price) * 12}/yr
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('signup')}
        style={{
          width: '100%', padding: '12px', borderRadius: 12, fontWeight: 700, fontSize: 13,
          border: isInk ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid var(--border)',
          fontFamily: 'inherit', cursor: 'pointer', marginBottom: 22, transition: 'all 0.2s',
          background: plan.popular ? 'var(--lav400)' : isInk ? 'rgba(255,255,255,0.1)' : 'var(--ink)',
          color: plan.popular ? '#fff' : isInk ? '#F5EFD8' : 'var(--cream)',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >{plan.cta} →</button>

      {/* Features */}
      <div style={{ display: 'grid', gap: 8 }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: isInk ? 'rgba(245,239,216,0.85)' : 'var(--ink3)' }}>
            <span style={{ color: 'var(--sage400)', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>✓</span>
            {f}
          </div>
        ))}
        {plan.missing.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: isInk ? 'rgba(245,239,216,0.3)' : 'var(--ink6)' }}>
            <span style={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>✗</span>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
