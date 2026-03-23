// client/src/pages/AuthPage.js
import { useState } from 'react';
import toast from 'react-hot-toast';

const PLANS = [
  { id: 'free', label: 'Starter', price: 'Free', color: 'var(--sage100)', border: 'var(--sage200)', text: 'var(--sage600)' },
  { id: 'creator', label: 'Creator', price: '$12/mo', color: 'var(--lav100)', border: 'var(--lav200)', text: 'var(--lav600)' },
  { id: 'business', label: 'Business', price: '$39/mo', color: 'rgba(15,15,18,0.9)', border: 'var(--ink)', text: '#F5EFD8' },
];

export default function AuthPage({ navigate, initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [plan, setPlan] = useState('creator');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (mode === 'forgot') {
      if (!form.email.trim() || !form.email.includes('@')) { toast.error('Enter a valid email'); return; }
      setLoading(true);
      await new Promise(r => setTimeout(r, 1400));
      setLoading(false);
      toast.success('Reset link sent to your email!');
      setMode('signin');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) { toast.error('Enter a valid email'); return; }
    if (!form.password || form.password.length < 6) { toast.error('Password must be 6+ characters'); return; }
    if (mode === 'signup') {
      if (!form.name.trim()) { toast.error('Enter your name'); return; }
      if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    if (mode === 'signup') { setDone(true); }
    else { toast.success('Welcome back!'); navigate('dashboard'); }
  };

  const inputStyle = (focused) => ({
    width: '100%', padding: '12px 14px', borderRadius: 12,
    border: `0.5px solid ${focused ? 'rgba(160,144,216,0.55)' : 'var(--border2)'}`,
    boxShadow: focused ? '0 0 0 3px rgba(160,144,216,0.12)' : 'none',
    background: 'rgba(255,255,255,0.85)', fontSize: 14, color: 'var(--ink)',
    fontFamily: "'DM Sans', sans-serif", outline: 'none', transition: 'all 0.2s',
  });

  const [focused, setFocused] = useState({});
  const onFocus = k => setFocused(f => ({ ...f, [k]: true }));
  const onBlur = k => setFocused(f => ({ ...f, [k]: false }));

  // Success screen
  if (done) {
    return (
      <div className="mesh-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>
          <div className="animate-float" style={{ width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg, var(--lav100), var(--sage100))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 24px' }}>✦</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 38, fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1.5px', marginBottom: 10 }}>You're in!</h1>
          <p style={{ fontSize: 15, color: 'var(--ink5)', lineHeight: 1.65, marginBottom: 10 }}>
            Welcome, <strong style={{ color: 'var(--ink)' }}>{form.name || 'creator'}</strong>! 🎉
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink5)', marginBottom: 28 }}>
            You're on the <strong style={{ color: 'var(--lav600)' }}>{PLANS.find(p => p.id === plan)?.label}</strong> plan. Time to generate your first campaign!
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            <button onClick={() => navigate('dashboard')} style={{ padding: '14px', borderRadius: 13, background: 'var(--ink)', color: 'var(--cream)', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              ✦ Start Generating Content
            </button>
            <button onClick={() => navigate('campaign')} style={{ padding: '14px', borderRadius: 13, background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', fontWeight: 600, fontSize: 14, border: '0.5px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit' }}>
              Build my first campaign →
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 22 }}>
            {['🔒 SSL Secured', '✦ No spam ever', '7-day refund'].map(b => <span key={b} style={{ fontSize: 11, color: 'var(--ink5)', fontWeight: 600 }}>{b}</span>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 40px' }}>
      <div style={{ maxWidth: 500, width: '100%' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <button onClick={() => navigate('landing')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'linear-gradient(135deg, var(--lav400), var(--sage400))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>✦</div>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, color: 'var(--ink)' }}>Catalogr</span>
          </button>

          {/* Mode Toggle */}
          {mode !== 'forgot' && (
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)', borderRadius: 14, padding: 4, gap: 3 }}>
              {['signin', 'signup'].map(m => (
                <button key={m} onClick={() => setMode(m)} style={{ padding: '8px 20px', borderRadius: 11, fontWeight: 700, fontSize: 13, border: 'none', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s', background: mode === m ? 'var(--ink)' : 'transparent', color: mode === m ? 'var(--cream)' : 'var(--ink5)' }}>
                  {m === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>
          )}

          {mode === 'forgot' && (
            <div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700, color: 'var(--ink)', marginBottom: 6, letterSpacing: '-0.5px' }}>Reset password</h2>
              <p style={{ fontSize: 13, color: 'var(--ink5)' }}>We'll send a reset link to your email</p>
            </div>
          )}
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.88)', border: '0.5px solid var(--border)', borderRadius: 24, padding: '26px 24px', backdropFilter: 'blur(14px)', boxShadow: 'var(--shadow-md)' }}>

          {/* Signup: Plan selector */}
          {mode === 'signup' && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Choose plan</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7 }}>
                {PLANS.map(p => (
                  <button key={p.id} onClick={() => setPlan(p.id)} style={{ padding: '10px 6px', borderRadius: 11, border: '0.5px solid', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s', background: plan === p.id ? p.color : 'rgba(255,255,255,0.7)', color: plan === p.id ? p.text : 'var(--ink5)', borderColor: plan === p.id ? p.border : 'var(--border)' }}>
                    <div style={{ fontWeight: 800, fontSize: 13 }}>{p.label}</div>
                    <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{p.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: 13 }}>
            {/* Name — signup only */}
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Full Name</label>
                <input type="text" placeholder="Priya Sharma" value={form.name} onChange={e => update('name', e.target.value)} style={inputStyle(focused.name)} onFocus={() => onFocus('name')} onBlur={() => onBlur('name')} />
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} style={inputStyle(focused.email)} onFocus={() => onFocus('email')} onBlur={() => onBlur('email')} />
            </div>

            {/* Password */}
            {mode !== 'forgot' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Password</label>
                  {mode === 'signin' && (
                    <button onClick={() => setMode('forgot')} style={{ fontSize: 11, color: 'var(--lav600)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Forgot password?</button>
                  )}
                </div>
                <input type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => update('password', e.target.value)} style={inputStyle(focused.password)} onFocus={() => onFocus('password')} onBlur={() => onBlur('password')} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              </div>
            )}

            {/* Confirm password — signup only */}
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Confirm Password</label>
                <input type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => update('confirm', e.target.value)} style={inputStyle(focused.confirm)} onFocus={() => onFocus('confirm')} onBlur={() => onBlur('confirm')} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              </div>
            )}

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '13px', borderRadius: 13, fontWeight: 700, fontSize: 14, border: 'none', fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(0,0,0,0.06)' : 'var(--ink)', color: loading ? 'var(--ink6)' : 'var(--cream)', transition: 'all 0.2s', marginTop: 2 }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ display: 'flex', gap: 4 }}><span className="dot" /><span className="dot" /><span className="dot" /></span>
                  {mode === 'forgot' ? 'Sending...' : mode === 'signup' ? 'Creating account...' : 'Signing in...'}
                </span>
              ) : mode === 'forgot' ? 'Send reset link' : mode === 'signup' ? 'Create account ✦' : 'Sign in →'}
            </button>
          </div>

          {/* Divider + Google */}
          {mode !== 'forgot' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
                <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
                <span style={{ fontSize: 11, color: 'var(--ink5)', fontWeight: 600 }}>or</span>
                <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
              </div>
              <button onClick={() => toast('Google auth coming soon!')} style={{ width: '100%', padding: '11px', borderRadius: 12, border: '0.5px solid var(--border)', background: '#fff', color: 'var(--ink)', fontWeight: 600, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
            </>
          )}

          {/* Forgot → back to sign in */}
          {mode === 'forgot' && (
            <button onClick={() => setMode('signin')} style={{ width: '100%', padding: '11px', borderRadius: 12, border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--ink5)', fontWeight: 600, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', marginTop: 10 }}>
              ← Back to sign in
            </button>
          )}
        </div>

        {/* Footer links */}
        {mode !== 'forgot' && (
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink5)', marginTop: 16 }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} style={{ color: 'var(--lav600)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
              {mode === 'signin' ? 'Sign up free →' : 'Sign in →'}
            </button>
          </p>
        )}

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 18 }}>
          {['🔒 SSL Secured', '✦ No credit card needed', '7-day refund'].map(b => (
            <span key={b} style={{ fontSize: 11, color: 'var(--ink5)', fontWeight: 600 }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
