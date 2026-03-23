// client/src/pages/CampaignPage.js
import { useState } from 'react';
import toast from 'react-hot-toast';

const CAMPAIGN_TYPES = [
  { id: 'product_launch', label: 'Product Launch', icon: '🚀', desc: 'New product drop campaign' },
  { id: 'seasonal', label: 'Seasonal Sale', icon: '🌸', desc: 'Holiday or seasonal promotions' },
  { id: 'brand_awareness', label: 'Brand Awareness', icon: '✦', desc: 'Grow your audience & reach' },
  { id: 'restock', label: 'Restock Alert', icon: '🔥', desc: 'Bring back a bestseller' },
  { id: 'collaboration', label: 'Collab Drop', icon: '◈', desc: 'Partnership or collab launch' },
  { id: 'flash_sale', label: 'Flash Sale', icon: '⚡', desc: '24–48hr urgency campaigns' },
];

const DURATIONS = ['3 Days', '1 Week', '2 Weeks', '1 Month'];
const PLATFORMS_LIST = ['Instagram', 'LinkedIn', 'Twitter/X', 'Pinterest', 'YouTube Shorts'];

const MOCK_CAMPAIGN = (name, type, days) => ({
  overview: {
    name: `${name} — ${type} Campaign`,
    goal: 'Drive maximum awareness and conversions across all platforms',
    duration: days,
    totalPosts: days === '1 Week' ? 14 : days === '3 Days' ? 6 : days === '2 Weeks' ? 21 : 30,
    estimatedReach: '45K–120K',
    expectedEngagement: '3.2%–5.8%',
  },
  phases: [
    {
      phase: 'Phase 1 — Tease',
      duration: 'Day 1–2',
      color: 'var(--lav100)',
      accentColor: 'var(--lav400)',
      textColor: 'var(--lav600)',
      goal: 'Build anticipation before launch',
      posts: [
        {
          platform: 'Instagram',
          type: 'Story',
          timing: 'Day 1 · 6PM',
          caption: `something's coming. and you're going to want to be ready for it 👀\n\nsave this. tell a friend. we'll see you soon.`,
          hashtags: '#comingsoon #newdrop #staytuned',
        },
        {
          platform: 'Instagram',
          type: 'Feed Post',
          timing: 'Day 2 · 12PM',
          caption: `the wait is almost over ✦\n\ncounting down to something we've been building for months. drop a 🔥 in the comments if you're ready.`,
          hashtags: '#countdown #newlaunch #exclusive',
        },
        {
          platform: 'LinkedIn',
          type: 'Post',
          timing: 'Day 2 · 9AM',
          caption: `We've been working on something quietly for the past few months.\n\nTomorrow, we share it.\n\nBuilding in public is scary. Shipping is scarier. But the alternative — never releasing — is the scariest of all.\n\nStay tuned. Big news tomorrow.`,
          hashtags: '#buildinginpublic #launch #entrepreneurship',
        },
      ],
    },
    {
      phase: 'Phase 2 — Launch',
      duration: 'Day 3–5',
      color: 'var(--sage100)',
      accentColor: 'var(--sage400)',
      textColor: 'var(--sage600)',
      goal: 'Maximum visibility and conversion push',
      posts: [
        {
          platform: 'Instagram',
          type: 'Reel',
          timing: 'Day 3 · 10AM',
          caption: `IT'S HERE. ${name} is officially live 🎉\n\nnot gonna lie this one hits different. swipe through, tap the link in bio, and let us know what you think in the comments 🤍`,
          hashtags: `#${name.replace(/\s+/g, '').toLowerCase()} #newlaunch #shopnow #launch`,
        },
        {
          platform: 'Instagram',
          type: 'Story (Swipe Up)',
          timing: 'Day 3 · 12PM',
          caption: `THE LAUNCH IS LIVE ✦ Tap to shop before it sells out 👆`,
          hashtags: '',
        },
        {
          platform: 'LinkedIn',
          type: 'Carousel',
          timing: 'Day 3 · 8AM',
          caption: `Today we launch ${name}.\n\nHere's what we learned building it, why we built it, and why we think it's the best version of this product in the market right now.\n\nSwipe through →`,
          hashtags: '#launch #product #startup #buildinpublic',
        },
        {
          platform: 'Instagram',
          type: 'Feed Post',
          timing: 'Day 5 · 6PM',
          caption: `48 hours in and wow 🥹\n\nThe response to ${name} has been everything. Thank you for every share, every save, every comment. You're why we do this. Still some left — link in bio 🔗`,
          hashtags: '#grateful #community #${name.replace(/\s+/g, "").toLowerCase()}',
        },
      ],
    },
    {
      phase: 'Phase 3 — Sustain',
      duration: 'Day 6–7',
      color: 'var(--blush100)',
      accentColor: 'var(--blush400)',
      textColor: 'var(--blush400)',
      goal: 'Keep momentum, convert late buyers',
      posts: [
        {
          platform: 'Instagram',
          type: 'Story',
          timing: 'Day 6 · 3PM',
          caption: `customer love 🤍 real reviews from real people who got ${name} this week. this is why we do it.`,
          hashtags: '#reviews #customerlove #repost',
        },
        {
          platform: 'Instagram',
          type: 'Feed Post',
          timing: 'Day 7 · 11AM',
          caption: `last few available ⏳\n\n${name} is nearly gone. we're not restocking for a while — if you've been on the fence, this is your sign. link in bio.`,
          hashtags: '#lastchance #soldoutsoon #shopnow #limitededition',
        },
        {
          platform: 'LinkedIn',
          type: 'Post',
          timing: 'Day 7 · 10AM',
          caption: `One week ago we launched ${name}.\n\nHere's what the numbers looked like:\n\n→ Week 1 sales exceeded forecast by 3x\n→ 92% positive sentiment in comments\n→ Waitlist already forming for round 2\n\nThe lesson: build for your audience, not for algorithms. They'll do the rest.\n\nThank you to everyone who supported the launch.`,
          hashtags: '#results #transparency #startup #ecommerce',
        },
      ],
    },
  ],
  emailSequence: [
    { day: 'Day 1', subject: `Something exciting is coming — be the first to know`, preview: 'We\'ve been keeping a secret...' },
    { day: 'Day 3', subject: `🎉 It's here. ${name} is officially live.`, preview: 'Your wait is over. Shop now before it sells out.' },
    { day: 'Day 5', subject: `Last chance — ${name} selling fast`, preview: 'Only a few left. Don\'t miss out.' },
    { day: 'Day 7', subject: `Thank you 🤍 + what's coming next`, preview: 'Week 1 recap and what we learned.' },
  ],
});

export default function CampaignPage({ navigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    productName: '',
    campaignType: 'product_launch',
    duration: '1 Week',
    platforms: ['Instagram', 'LinkedIn'],
    goal: '',
    budget: 'Organic (no paid ads)',
  });
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [activePhase, setActivePhase] = useState(0);
  const [activePost, setActivePost] = useState(0);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const togglePlatform = (p) => setForm(f => ({ ...f, platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p] }));

  const generate = async () => {
    if (!form.productName.trim()) { toast.error('Enter your product name'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 3000));
    const campaignType = CAMPAIGN_TYPES.find(c => c.id === form.campaignType)?.label || 'Product Launch';
    setCampaign(MOCK_CAMPAIGN(form.productName, campaignType, form.duration));
    setLoading(false);
    setStep(2);
  };

  const inputStyle = { width: '100%', padding: '11px 13px', borderRadius: 12, border: '0.5px solid var(--border2)', background: 'rgba(255,255,255,0.8)', fontSize: 13, color: 'var(--ink)', fontFamily: "'DM Sans', sans-serif", outline: 'none', transition: 'all 0.2s' };

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ paddingTop: 110, paddingBottom: 32, textAlign: 'center', maxWidth: 700, margin: '0 auto', padding: '110px 24px 32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 30, background: 'rgba(255,255,255,0.75)', border: '0.5px solid var(--border)', marginBottom: 18, fontSize: 12, fontWeight: 700, color: 'var(--ink5)' }}>
          ◎ AI Marketing Campaign Generator
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          A complete campaign.<br />
          <span className="grad-text">Built in 30 seconds.</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink5)', lineHeight: 1.65 }}>
          Enter your product and campaign type. Get a full multi-phase content calendar with captions, timing, hashtags, and email sequences — ready to post.
        </p>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>

        {step === 1 && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ background: 'rgba(255,255,255,0.82)', border: '0.5px solid var(--border)', borderRadius: 24, padding: '28px 24px', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-md)' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
                <div style={{ width: 28, height: 28, borderRadius: 9, background: 'var(--sage100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sage600)', fontSize: 13 }}>◎</div>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>Campaign Setup</span>
              </div>

              <div style={{ display: 'grid', gap: 16 }}>
                {/* Product Name */}
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Product / Brand Name *</label>
                  <input style={inputStyle} value={form.productName} onChange={e => update('productName', e.target.value)} placeholder="e.g. Summer Collection 2025"
                    onFocus={e => { e.target.style.borderColor = 'rgba(160,144,216,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(160,144,216,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Campaign Type */}
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Campaign Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7 }}>
                    {CAMPAIGN_TYPES.map(ct => (
                      <button key={ct.id} onClick={() => update('campaignType', ct.id)} style={{ padding: '10px 8px', borderRadius: 11, border: '0.5px solid', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s', background: form.campaignType === ct.id ? 'var(--ink)' : 'rgba(255,255,255,0.7)', color: form.campaignType === ct.id ? 'var(--cream)' : 'var(--ink5)', borderColor: form.campaignType === ct.id ? 'transparent' : 'var(--border)' }}>
                        <div style={{ fontSize: 16, marginBottom: 4 }}>{ct.icon}</div>
                        <div style={{ fontSize: 11, fontWeight: 700 }}>{ct.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration + Budget row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Duration</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {DURATIONS.map(d => (
                        <button key={d} onClick={() => update('duration', d)} style={{ padding: '7px 12px', borderRadius: 10, border: '0.5px solid', fontFamily: 'inherit', cursor: 'pointer', fontSize: 12, fontWeight: 600, textAlign: 'left', transition: 'all 0.18s', background: form.duration === d ? 'var(--lav400)' : 'rgba(255,255,255,0.7)', color: form.duration === d ? '#fff' : 'var(--ink5)', borderColor: form.duration === d ? 'transparent' : 'var(--border)' }}>{d}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Platforms</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {PLATFORMS_LIST.map(p => (
                        <button key={p} onClick={() => togglePlatform(p)} style={{ padding: '7px 12px', borderRadius: 10, border: '0.5px solid', fontFamily: 'inherit', cursor: 'pointer', fontSize: 12, fontWeight: 600, textAlign: 'left', transition: 'all 0.18s', background: form.platforms.includes(p) ? 'var(--sage100)' : 'rgba(255,255,255,0.7)', color: form.platforms.includes(p) ? 'var(--sage600)' : 'var(--ink5)', borderColor: form.platforms.includes(p) ? 'var(--sage200)' : 'var(--border)' }}>
                          {form.platforms.includes(p) ? '✓ ' : ''}{p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Campaign Goal */}
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Campaign Goal (optional)</label>
                  <input style={inputStyle} value={form.goal} onChange={e => update('goal', e.target.value)} placeholder="e.g. Sell 500 units, grow to 10K followers"
                    onFocus={e => { e.target.style.borderColor = 'rgba(160,144,216,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(160,144,216,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <button onClick={generate} disabled={loading} style={{ width: '100%', padding: '13px', borderRadius: 13, fontWeight: 700, fontSize: 14, border: 'none', fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(0,0,0,0.06)' : 'var(--ink)', color: loading ? 'var(--ink6)' : 'var(--cream)', transition: 'all 0.2s' }}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <span style={{ display: 'flex', gap: 4 }}><span className="dot" /><span className="dot" /><span className="dot" /></span>
                      Building your campaign...
                    </span>
                  ) : '◎ Generate Full Campaign'}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && campaign && (
          <div className="animate-fade-in">
            <button onClick={() => { setStep(1); setCampaign(null); setActivePhase(0); setActivePost(0); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 11, border: '0.5px solid var(--border)', background: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, color: 'var(--ink5)', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
            >← New Campaign</button>

            {/* Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, marginBottom: 18 }}>
              {[
                { label: 'Campaign', value: campaign.overview.name.split('—')[0].trim(), sub: 'Name' },
                { label: campaign.overview.duration, value: campaign.overview.totalPosts, sub: 'Total Posts' },
                { label: 'Estimated Reach', value: campaign.overview.estimatedReach, sub: 'Impressions' },
                { label: 'Expected', value: campaign.overview.expectedEngagement, sub: 'Engagement rate' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.82)', border: '0.5px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 2 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink5)', fontWeight: 600 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 14 }}>
              {/* LEFT — Phase selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {campaign.phases.map((phase, i) => (
                  <button key={i} onClick={() => { setActivePhase(i); setActivePost(0); }} style={{ padding: '14px 16px', borderRadius: 16, border: '0.5px solid', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', background: activePhase === i ? 'var(--ink)' : 'rgba(255,255,255,0.82)', borderColor: activePhase === i ? 'transparent' : 'var(--border)', boxShadow: activePhase === i ? 'var(--shadow-md)' : 'var(--shadow-soft)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: activePhase === i ? 'var(--cream)' : 'var(--ink)', marginBottom: 3 }}>{phase.phase}</div>
                    <div style={{ fontSize: 11, color: activePhase === i ? 'rgba(245,239,216,0.6)' : 'var(--ink5)' }}>{phase.duration} · {phase.posts.length} posts</div>
                    <div style={{ fontSize: 11, color: activePhase === i ? 'rgba(245,239,216,0.5)' : 'var(--ink6)', marginTop: 4, fontStyle: 'italic' }}>{phase.goal}</div>
                  </button>
                ))}

                {/* Email sequence */}
                <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.82)', border: '0.5px solid var(--border)', marginTop: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Email Sequence</div>
                  {campaign.emailSequence.map((email, i) => (
                    <div key={i} style={{ padding: '9px 0', borderBottom: i < campaign.emailSequence.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--lav600)', marginBottom: 2 }}>{email.day}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 1 }}>{email.subject}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink5)' }}>{email.preview}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Posts */}
              <div>
                {/* Post tabs */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  {campaign.phases[activePhase].posts.map((post, i) => (
                    <button key={i} onClick={() => setActivePost(i)} style={{ padding: '6px 13px', borderRadius: 10, fontSize: 12, fontWeight: 700, border: '0.5px solid', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.18s', background: activePost === i ? campaign.phases[activePhase].accentColor : 'rgba(255,255,255,0.7)', color: activePost === i ? '#fff' : 'var(--ink5)', borderColor: activePost === i ? 'transparent' : 'var(--border)' }}>
                      {post.platform} · {post.type}
                    </button>
                  ))}
                </div>

                {/* Active post */}
                {(() => {
                  const post = campaign.phases[activePhase].posts[activePost];
                  const phase = campaign.phases[activePhase];
                  if (!post) return null;
                  return (
                    <div className="animate-slide-up" style={{ background: 'rgba(255,255,255,0.85)', border: '0.5px solid var(--border)', borderRadius: 20, padding: '20px', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-soft)' }}>
                      {/* Post header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <div style={{ padding: '5px 12px', borderRadius: 9, background: phase.color, color: phase.textColor, fontSize: 12, fontWeight: 700 }}>{post.platform}</div>
                          <div style={{ padding: '5px 12px', borderRadius: 9, background: 'rgba(0,0,0,0.04)', color: 'var(--ink5)', fontSize: 12, fontWeight: 600 }}>{post.type}</div>
                          <div style={{ fontSize: 12, color: 'var(--ink5)', fontWeight: 500 }}>🕐 {post.timing}</div>
                        </div>
                        <button onClick={() => { navigator.clipboard.writeText(post.caption + (post.hashtags ? '\n\n' + post.hashtags : '')); toast.success('Post copied!'); }}
                          style={{ padding: '6px 14px', borderRadius: 9, background: phase.color, color: phase.textColor, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                          ⎘ Copy Post
                        </button>
                      </div>

                      {/* Caption */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Caption</div>
                        <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(0,0,0,0.02)', border: '0.5px solid var(--border)', fontSize: 13, color: 'var(--ink3)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{post.caption}</div>
                      </div>

                      {/* Hashtags */}
                      {post.hashtags && (
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Hashtags</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {post.hashtags.split(' ').map((tag, j) => (
                              <span key={j} onClick={() => { navigator.clipboard.writeText(tag); toast.success(`${tag} copied!`); }} style={{ padding: '4px 10px', borderRadius: 7, background: 'var(--lav100)', color: 'var(--lav600)', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--lav200)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'var(--lav100)'; e.currentTarget.style.transform = 'scale(1)'; }}
                              >{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tips */}
                      <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 11, background: phase.color, border: `0.5px solid ${phase.accentColor}30` }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: phase.textColor, marginBottom: 4 }}>✦ Posting tip</div>
                        <div style={{ fontSize: 12, color: phase.textColor, opacity: 0.85 }}>
                          {post.platform === 'Instagram' && post.type === 'Reel' && 'Post between 10AM–12PM or 7PM–9PM for maximum reach. Use original audio for extra algorithmic boost.'}
                          {post.platform === 'Instagram' && post.type === 'Feed Post' && 'Carousel posts get 3x more engagement than single images. Consider turning this into a 3-slide carousel.'}
                          {post.platform === 'Instagram' && post.type.includes('Story') && 'Add a poll or question sticker to boost story completion rate by up to 40%.'}
                          {post.platform === 'LinkedIn' && 'Post Tuesday–Thursday between 8–10AM. LinkedIn rewards native content — avoid external links in the main post.'}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
