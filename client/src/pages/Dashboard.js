// client/src/pages/Dashboard.js
import { useState } from 'react';
import toast from 'react-hot-toast';
import InputPanel from '../components/InputPanel';
import OutputPanel from '../components/OutputPanel';
import HistoryPanel from '../components/HistoryPanel';
import { generateContent } from '../utils/api';

export default function Dashboard({ navigate, dark }) {
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setGenerated(false);
    setOutputs(null);
    try {
      const data = await generateContent(formData);
      setOutputs(data.outputs);
      setGenerated(true);
      toast.success('Content generated!');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Generation failed. Check your API key.';
      toast.error(msg);
    }
    setLoading(false);
  };

  const handleHistoryLoad = (outs) => {
    setOutputs(outs);
    setGenerated(true);
    toast.success('Loaded from history!');
  };

  return (
    <div
      className="mesh-bg"
      style={{ minHeight: '100vh', paddingTop: 0 }}
    >
      {/* Dashboard header bar */}
      <div style={{ paddingTop: 88, paddingBottom: 16, paddingLeft: 24, paddingRight: 24, maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.5px' }}>
              Content Generator
            </h1>
            <p style={{ fontSize: 13, color: 'var(--ink5)', marginTop: 4 }}>
              Fill in your product → watch the magic happen ✦
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {generated && !loading && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '5px 13px',
                borderRadius: 30, background: 'var(--sage100)', color: 'var(--sage600)',
                fontSize: 11, fontWeight: 700,
                animation: 'chipPop 0.4s cubic-bezier(.34,1.56,.64,1)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage400)', display: 'inline-block', animation: 'pulseSoft 2s ease-in-out infinite' }} />
                Content Ready
              </span>
            )}
            <HistoryPanel onLoad={handleHistoryLoad} />
            <button
              onClick={() => navigate('landing')}
              style={{
                padding: '7px 14px', borderRadius: 11, fontSize: 12, fontWeight: 600,
                color: 'var(--ink5)', background: 'rgba(255,255,255,0.7)',
                border: '0.5px solid var(--border)', fontFamily: 'inherit', cursor: 'pointer',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
            >← Back home</button>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        padding: '0 24px 40px',
        display: 'grid',
        gridTemplateColumns: 'clamp(300px, 35%, 400px) 1fr',
        gap: 14,
        alignItems: 'start',
      }}>
        {/* LEFT — Input */}
        <div style={{
          background: 'rgba(255,255,255,0.78)',
          border: '0.5px solid var(--border)',
          borderRadius: 22,
          padding: '22px 20px',
          boxShadow: 'var(--shadow-soft)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 88,
        }}>
          <InputPanel onGenerate={handleGenerate} loading={loading} />
        </div>

        {/* RIGHT — Output */}
        <div style={{
          background: 'rgba(255,255,255,0.78)',
          border: '0.5px solid var(--border)',
          borderRadius: 22,
          padding: '22px 20px',
          minHeight: 560,
          boxShadow: 'var(--shadow-soft)',
          backdropFilter: 'blur(12px)',
        }}>
          <OutputPanel outputs={outputs} loading={loading} generated={generated} />
        </div>
      </div>

      {/* Tips row */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            '💡 Be specific in your description for better results',
            '🎯 Brand Voice changes tone across all platforms',
            '✏️ Click Edit on any output to customise it',
            '📋 Use Copy All to grab everything at once',
            '🖼 Upload a product image for AI visual context',
          ].map(tip => (
            <span key={tip} style={{
              padding: '6px 14px', borderRadius: 10,
              background: 'rgba(255,255,255,0.6)',
              border: '0.5px solid var(--border)',
              fontSize: 11, color: 'var(--ink5)',
              backdropFilter: 'blur(6px)',
            }}>{tip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
