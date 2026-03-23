// client/src/pages/SignupPage.js
import { useState } from 'react';
import toast from 'react-hot-toast';

const PLANS = [
  { id: 'free', label: 'Starter', price: 'Free', desc: '5 generations/month', color: 'var(--sage100)', border: 'var(--sage200)', text: 'var(--sage600)' },
  { id: 'creator', label: 'Creator', price: '$12/mo', desc: '100 generations/month', color: 'var(--lav100)', border: 'var(--lav200)', text: 'var(--lav600)' },
  { id: 'business', label: 'Business', price: '$39/mo', desc: 'Unlimited generations', color: 'var(--ink)', border: 'var(--ink)', text: '#fff' },
];

export default function SignupPage({ navigate }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', plan: 'creator' });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = details, 2 = success

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!form.email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    // Simulate signup delay
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep(2);
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 12,
    border: '0.5px solid var(--border2)', background: 'rgba(255,255,255,0.8)',
    fontSize: 14, color: 'var(--ink)', fontFamily: "'DM Sans', sans-serif",
    outline: 'none', transition: 'all 0.2s',
  };

  const focusStyle = { borderColor: 'rgba(160,144,216,0.55)', boxShadow: '0 0 0 3px rgba(160,144,216,0.12)' };

  if (step === 2) {
    return (
      <div className="mesh-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: 460, width: '100%', textAlign: 'center' }}>
          <div className="animate-float" style={{ width: 72, height: 72, borderRadius: 22, background: 'linear-gradient(135deg, var(--lav100), var(--sage100))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 24px' }}>
            ✦
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1px', marginBottom: 10 }}>
            Welcome to Catalogr!
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink5)', lineHeight: 1.65, marginBottom: 28 }}>
            Hey <strong style={{ color: 'var(--ink)' }}>{form.name}</strong>! Your account is ready. You're on the <strong style={{ color: 'var(--lav600)' }}>{PLANS.find(p => p.id === form.plan)?.label}</strong> plan. Let's generate your first campaign!
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            <button
              onClick={() => navigate('dashboard')}
              style={{ padding: '14px', borderRadius: 13, background: 'var(--ink)', color: 'var(--cream)', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              ✦ Start Generating Content
            </button>
            <button
              onClick={() => navigate('pricing')}
              style={{ padding: '14px', borderRadius: 13, background: 'transparent', color: 'var(--ink5)', fontWeight: 600, fontSize: 14, border: '0.5px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              View my plan details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 40px' }}>
      <div style={{ maxWidth: 480, width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'linear-gradient(135deg, var(--lav400), var(--sage400))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>✦</div>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, color: 'var(--ink)' }}>Catalogr</span>
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5vw, 36px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1px', marginBottom: 8 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink5)' }}>Start free. No credit card required.</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.85)', border: '0.5px solid var(--border)', borderRadius: 24, padding: '28px 24px', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-md)' }}>

          {/* Plan Selector */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Choose your plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
              {PLANS.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => update('plan', plan.id)}
                  style={{
                    padding: '10px 8px', borderRadius: 12, border: '0.5px solid',
                    fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.18s', textAlign: 'center',
                    background: form.plan === plan.id ? (plan.id === 'business' ? 'var(--ink)' : plan.color) : 'rgba(255,255,255,0.7)',
                    borderColor: form.plan === plan.id ? plan.border : 'var(--border)',
                    color: form.plan === plan.id ? plan.text : 'var(--ink5)',
                    boxShadow: form.plan === plan.id ? 'var(--shadow-soft)' : 'none',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 13 }}>{plan.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{plan.price}</div>
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--ink5)', marginTop: 7, textAlign: 'center' }}>
              {PLANS.find(p => p.id === form.plan)?.desc}
            </p>
          </div>

          {/* Name */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Priya Sharma"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              style={inputStyle}
              onFocus={e => Object.assign(e.target.style, focusStyle)}
              onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              style={inputStyle}
              onFocus={e => Object.assign(e.target.style, focusStyle)}
              onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={e => update('password', e.target.value)}
              style={inputStyle}
              onFocus={e => Object.assign(e.target.style, focusStyle)}
              onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: 13, fontWeight: 700, fontSize: 14,
              border: 'none', fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? 'rgba(0,0,0,0.06)' : 'var(--ink)',
              color: loading ? 'var(--ink6)' : 'var(--cream)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ display: 'flex', gap: 4 }}>
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </span>
                Creating account...
              </span>
            ) : 'Create account ✦'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
            <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
            <span style={{ fontSize: 11, color: 'var(--ink5)', fontWeight: 600 }}>or</span>
            <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
          </div>

          {/* Social signup placeholder */}
          <button
            style={{ width: '100%', padding: '12px', borderRadius: 12, border: '0.5px solid var(--border)', background: '#fff', color: 'var(--ink)', fontWeight: 600, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.18s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--cream2)'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            onClick={() => toast('Google signup coming soon!')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
        </div>

        {/* Login link */}
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink5)', marginTop: 18 }}>
          Already have an account?{' '}
          <button onClick={() => navigate('dashboard')} style={{ color: 'var(--lav600)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
            Sign in →
          </button>
        </p>

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20 }}>
          {['🔒 Secure', '✦ No credit card', '7-day refund'].map(b => (
            <span key={b} style={{ fontSize: 11, color: 'var(--ink5)', fontWeight: 600 }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}