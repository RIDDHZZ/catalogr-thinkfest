// client/src/components/HistoryPanel.js
import { useState, useEffect } from 'react';
import { fetchHistory, fetchGeneration } from '../utils/api';

export default function HistoryPanel({ onLoad }) {
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (e) {
      console.error('History load failed:', e);
    }
    setLoading(false);
  };

  useEffect(() => { if (open) load(); }, [open]);

  const loadItem = async (id) => {
    try {
      const gen = await fetchGeneration(id);
      onLoad(gen.outputs);
      setOpen(false);
    } catch (e) {
      console.error('Load failed:', e);
    }
  };

  const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
          borderRadius: 11, border: '0.5px solid var(--border2)',
          background: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 700,
          color: 'var(--ink5)', fontFamily: 'inherit', cursor: 'pointer',
          transition: 'all 0.18s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
      >
        ⏱ History {open ? '▲' : '▼'}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '110%', right: 0, width: 300, zIndex: 50,
          background: 'rgba(254,253,248,0.97)', border: '0.5px solid var(--border2)',
          borderRadius: 16, boxShadow: 'var(--shadow-md)', overflow: 'hidden',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ padding: '13px 16px', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recent Generations</span>
            <button onClick={load} style={{ fontSize: 11, color: 'var(--lav400)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Refresh</button>
          </div>
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--ink5)', fontSize: 13 }}>Loading...</div>
            ) : history.length === 0 ? (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--ink5)', fontSize: 13 }}>No generations yet</div>
            ) : history.map(h => (
              <div
                key={h._id}
                onClick={() => loadItem(h._id)}
                style={{
                  padding: '11px 16px', borderBottom: '0.5px solid var(--border)',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--lav50)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{h.productName}</span>
                  {h.hasImage && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, background: 'var(--lav100)', color: 'var(--lav600)', fontWeight: 700 }}>IMG</span>}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, background: 'var(--sage100)', color: 'var(--sage600)', fontWeight: 700 }}>{h.brandVoice}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink5)' }}>{fmt(h.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
