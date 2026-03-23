// client/src/components/OutputPanel.js
import { useState } from 'react';
import toast from 'react-hot-toast';
import SkeletonLoader from './SkeletonLoader';

const TABS = [
  { id: 'seo', label: 'SEO', icon: '◎', full: 'SEO Description' },
  { id: 'instagram', label: 'Instagram', icon: '◈', full: 'Instagram Caption' },
  { id: 'linkedin', label: 'LinkedIn', icon: '◐', full: 'LinkedIn Post' },
  { id: 'hashtags', label: 'Hashtags', icon: '#', full: 'Hashtags' },
  { id: 'reel', label: 'Reel Script', icon: '▶', full: 'Reel Script' },
];

export default function OutputPanel({ outputs, loading, generated }) {
  const [activeTab, setActiveTab] = useState('seo');
  const [editing, setEditing] = useState(null);
  const [edits, setEdits] = useState({});

  const getContent = id => edits[id] ?? outputs?.[id] ?? '';

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const copyAll = () => {
    if (!outputs) return;
    const text = TABS.filter(t => outputs[t.id])
      .map(t => `=== ${t.full} ===\n${getContent(t.id)}`).join('\n\n');
    copy(text, 'All content');
  };

  const visibleTabs = outputs?.reel ? TABS : TABS.filter(t => t.id !== 'reel');

  if (!generated && !loading) return <EmptyState />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: 'var(--sage100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sage600)', fontSize: 13 }}>◎</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>Generated Content</span>
          {generated && !loading && (
            <span style={{ padding: '2px 10px', borderRadius: 30, background: 'var(--sage100)', color: 'var(--sage600)', fontSize: 11, fontWeight: 700 }}>Ready</span>
          )}
        </div>
        {generated && !loading && (
          <button
            onClick={copyAll}
            style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 13px',
              borderRadius: 9, background: 'rgba(255,255,255,0.7)', border: '0.5px solid var(--border2)',
              fontSize: 11, fontWeight: 700, color: 'var(--ink5)', cursor: 'pointer', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
          >
            ⎘ Copy All
          </button>
        )}
      </div>

      {/* Tabs */}
      {(generated || loading) && (
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 4 }}>
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setEditing(null); }}
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 13px', borderRadius: 10, whiteSpace: 'nowrap',
                fontSize: 12, fontWeight: 700, border: '0.5px solid',
                fontFamily: 'inherit', transition: 'all 0.18s', cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--ink)' : 'rgba(255,255,255,0.6)',
                color: activeTab === tab.id ? 'var(--cream)' : 'var(--ink5)',
                borderColor: activeTab === tab.id ? 'transparent' : 'var(--border)',
              }}
            >{tab.icon} {tab.label}</button>
          ))}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <SkeletonLoader />
      ) : generated && outputs ? (
        <div className="animate-slide-up" key={activeTab}>
          {activeTab === 'hashtags' ? (
            <HashtagsCard
              content={getContent('hashtags')}
              onCopy={() => copy(getContent('hashtags'), 'Hashtags')}
            />
          ) : (
            <TextCard
              content={getContent(activeTab)}
              isEditing={editing === activeTab}
              onEdit={() => { setEdits(p => ({ ...p, [activeTab]: getContent(activeTab) })); setEditing(activeTab); }}
              onSave={() => { setEditing(null); toast.success('Saved!'); }}
              onCopy={() => copy(getContent(activeTab), TABS.find(t => t.id === activeTab)?.full || '')}
              onChange={v => setEdits(p => ({ ...p, [activeTab]: v }))}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

function TextCard({ content, isEditing, onEdit, onSave, onCopy, onChange }) {
  return (
    <div style={{ padding: '18px 20px', borderRadius: 18, background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)', boxShadow: 'var(--shadow-soft)' }}>
      <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
        <ActionBtn color="lav" onClick={onCopy}>⎘ Copy</ActionBtn>
        {isEditing
          ? <ActionBtn color="sage" onClick={onSave}>✓ Save</ActionBtn>
          : <ActionBtn color="gray" onClick={onEdit}>✎ Edit</ActionBtn>
        }
      </div>
      {isEditing ? (
        <textarea
          autoFocus
          value={content}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%', border: 'none', outline: 'none', resize: 'none',
            fontSize: 13, color: 'var(--ink)', lineHeight: 1.65,
            fontFamily: "'DM Sans', sans-serif", background: 'rgba(237,232,248,0.15)',
            borderRadius: 9, padding: 10, minHeight: 140,
          }}
        />
      ) : (
        <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{content}</p>
      )}
    </div>
  );
}

function HashtagsCard({ content, onCopy }) {
  const tags = (content || '').split(/\s+/).filter(t => t.startsWith('#'));
  return (
    <div style={{ padding: '18px 20px', borderRadius: 18, background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)', boxShadow: 'var(--shadow-soft)' }}>
      <div style={{ marginBottom: 14 }}>
        <ActionBtn color="lav" onClick={onCopy}>⎘ Copy All</ActionBtn>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((tag, i) => (
          <span
            key={i}
            onClick={() => { navigator.clipboard.writeText(tag); }}
            title="Click to copy"
            style={{
              padding: '6px 12px', borderRadius: 9,
              background: 'var(--lav100)', color: 'var(--lav600)',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
              animation: `chipPop 0.3s cubic-bezier(.34,1.56,.64,1) ${i * 35}ms both`,
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--lav200)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--lav100)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >{tag}</span>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--ink5)', marginTop: 12 }}>{tags.length} hashtags · Click any tag to copy individually</p>
    </div>
  );
}

function ActionBtn({ color, onClick, children }) {
  const colors = {
    lav: { bg: 'var(--lav100)', hbg: 'var(--lav200)', color: 'var(--lav600)' },
    sage: { bg: 'var(--sage100)', hbg: 'var(--sage200)', color: 'var(--sage600)' },
    gray: { bg: 'rgba(0,0,0,0.04)', hbg: 'rgba(0,0,0,0.08)', color: 'var(--ink5)' },
  };
  const c = colors[color] || colors.gray;
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '5px 13px', borderRadius: 9, border: 'none',
        background: c.bg, color: c.color, fontSize: 12, fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'all 0.18s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = c.hbg; e.currentTarget.style.transform = 'scale(1.02)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = c.bg; e.currentTarget.style.transform = 'scale(1)'; }}
    >{children}</button>
  );
}

function EmptyState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 20px', textAlign: 'center' }}>
      <div className="animate-float" style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(135deg, var(--lav100), var(--sage100))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>✦</div>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Your content will appear here</h3>
      <p style={{ fontSize: 13, color: 'var(--ink5)', maxWidth: 260, lineHeight: 1.6 }}>
        Fill in your product details on the left and hit <strong style={{ color: 'var(--ink4)' }}>Generate Content</strong> to see the magic ✨
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', marginTop: 18 }}>
        {['SEO ◎', 'Instagram ◈', 'LinkedIn ◐', 'Hashtags #', 'Reel ▶'].map(l => (
          <span key={l} style={{ padding: '5px 12px', borderRadius: 9, background: 'rgba(255,255,255,0.7)', border: '0.5px solid var(--border)', fontSize: 11, color: 'var(--ink5)', fontWeight: 600 }}>{l}</span>
        ))}
      </div>
    </div>
  );
}
