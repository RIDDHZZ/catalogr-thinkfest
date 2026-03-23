// client/src/components/InputPanel.js
import { useState, useRef } from 'react';

const VOICES = ['Luxury', 'Gen Z', 'Minimal', 'Corporate', 'Playful', 'Bold'];
const AUDIENCES = ['Young Adults (18–28)', 'Teens (13–17)', 'Professionals (25–45)', 'Creators', 'Parents', 'Entrepreneurs'];
const PLATFORMS = ['All Platforms', 'Instagram Only', 'LinkedIn Only', 'SEO / E-commerce'];

const s = {
  wrap: { display: 'flex', flexDirection: 'column', gap: 16 },
  header: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 },
  headerIcon: {
    width: 28, height: 28, borderRadius: 9,
    background: 'var(--lav100)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 13, color: 'var(--lav600)',
  },
  headerTitle: { fontWeight: 700, fontSize: 15, color: 'var(--ink)' },
  label: {
    display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--ink5)',
    textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6,
  },
  input: {
    width: '100%', padding: '10px 13px', borderRadius: 12,
    border: '0.5px solid var(--border2)', background: 'rgba(255,255,255,0.7)',
    fontSize: 13, color: 'var(--ink)', transition: 'all 0.2s',
    fontFamily: "'DM Sans', sans-serif",
  },
  textarea: { resize: 'none', height: 76, lineHeight: 1.55 },
  select: {
    width: '100%', padding: '10px 13px', borderRadius: 12,
    border: '0.5px solid var(--border2)', background: 'rgba(255,255,255,0.7)',
    fontSize: 13, color: 'var(--ink)', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236B6B80' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 13px center',
  },
  chipsRow: { display: 'flex', flexWrap: 'wrap', gap: 7 },
  uploadZone: (drag) => ({
    border: `1.5px dashed ${drag ? 'var(--lav400)' : 'var(--border2)'}`,
    borderRadius: 13, padding: 18, textAlign: 'center', cursor: 'pointer',
    background: drag ? 'var(--lav50)' : 'rgba(255,255,255,0.35)',
    transition: 'all 0.2s',
  }),
  uploadIcon: {
    width: 38, height: 38, borderRadius: 11, background: 'var(--lav100)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 8px', fontSize: 17,
  },
  toggleRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '11px 13px', borderRadius: 12,
    border: '0.5px solid var(--border)', background: 'rgba(255,255,255,0.4)',
  },
  genBtn: (ready, loading) => ({
    width: '100%', padding: '13px 20px', borderRadius: 13, fontWeight: 700,
    fontSize: 14, border: 'none', fontFamily: "'DM Sans', sans-serif",
    cursor: ready && !loading ? 'pointer' : 'not-allowed',
    background: ready && !loading ? 'var(--ink)' : 'rgba(0,0,0,0.06)',
    color: ready && !loading ? 'var(--cream)' : 'var(--ink6)',
    transition: 'all 0.2s', marginTop: 4,
  }),
};

export default function InputPanel({ onGenerate, loading }) {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [brandVoice, setBrandVoice] = useState('Gen Z');
  const [audience, setAudience] = useState('Young Adults (18–28)');
  const [platform, setPlatform] = useState('All Platforms');
  const [includeReel, setIncludeReel] = useState(true);
  const [drag, setDrag] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileRef = useRef();

  const setFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!productName.trim() || loading) return;
    const fd = new FormData();
    fd.append('productName', productName);
    fd.append('description', description);
    fd.append('brandVoice', brandVoice);
    fd.append('audience', audience);
    fd.append('platform', platform);
    fd.append('includeReel', includeReel);
    if (imageFile) fd.append('image', imageFile);
    onGenerate(fd);
  };

  const ready = productName.trim().length > 0;

  const focusStyle = { borderColor: 'rgba(160,144,216,0.55)', boxShadow: '0 0 0 3px rgba(160,144,216,0.12)' };

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <div style={s.headerIcon}>✦</div>
        <span style={s.headerTitle}>Product Input</span>
      </div>

      {/* Product Name */}
      <div>
        <label style={s.label}>Product Name *</label>
        <input
          style={s.input} value={productName}
          onChange={e => setProductName(e.target.value)}
          placeholder="e.g. Minimal Leather Tote Bag"
          onFocus={e => Object.assign(e.target.style, focusStyle)}
          onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Description */}
      <div>
        <label style={s.label}>Description / Specs</label>
        <textarea
          style={{ ...s.input, ...s.textarea }} value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe materials, features, price range, USPs..."
          onFocus={e => Object.assign(e.target.style, focusStyle)}
          onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label style={s.label}>Product Image (optional)</label>
        <div
          style={s.uploadZone(drag)}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); setFile(e.dataTransfer.files[0]); }}
          onClick={() => fileRef.current?.click()}
        >
          {image ? (
            <div style={{ position: 'relative' }}>
              <img src={image} alt="Product" style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 9 }} />
              <button
                onClick={e => { e.stopPropagation(); setImage(null); setImageFile(null); }}
                style={{
                  position: 'absolute', top: 6, right: 6, width: 26, height: 26,
                  borderRadius: '50%', background: 'rgba(0,0,0,0.55)', color: '#fff',
                  border: 'none', fontSize: 11, cursor: 'pointer',
                }}
              >✕</button>
            </div>
          ) : (
            <>
              <div style={s.uploadIcon}>🖼</div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink3)' }}>
                Drop image or <span style={{ color: 'var(--lav400)' }}>browse</span>
              </p>
              <p style={{ fontSize: 11, color: 'var(--ink5)', marginTop: 3 }}>PNG, JPG, WEBP · Max 10MB</p>
            </>
          )}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
        </div>
      </div>

      {/* Brand Voice */}
      <div>
        <label style={s.label}>Brand Voice</label>
        <div style={s.chipsRow}>
          {VOICES.map(v => (
            <button
              key={v}
              onClick={() => setBrandVoice(v)}
              style={{
                padding: '6px 13px', borderRadius: 9, fontSize: 12, fontWeight: 600,
                border: '0.5px solid', transition: 'all 0.18s', fontFamily: 'inherit',
                background: brandVoice === v ? 'var(--lav400)' : 'rgba(255,255,255,0.7)',
                color: brandVoice === v ? '#fff' : 'var(--ink5)',
                borderColor: brandVoice === v ? 'var(--lav400)' : 'var(--border2)',
              }}
            >{v}</button>
          ))}
        </div>
      </div>

      {/* Audience */}
      <div>
        <label style={s.label}>Target Audience</label>
        <select style={s.select} value={audience} onChange={e => setAudience(e.target.value)}>
          {AUDIENCES.map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      {/* Platform */}
      <div>
        <label style={s.label}>Platform Focus</label>
        <div style={s.chipsRow}>
          {PLATFORMS.map(p => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              style={{
                padding: '6px 13px', borderRadius: 9, fontSize: 12, fontWeight: 600,
                border: '0.5px solid', transition: 'all 0.18s', fontFamily: 'inherit',
                background: platform === p ? 'var(--ink)' : 'rgba(255,255,255,0.7)',
                color: platform === p ? 'var(--cream)' : 'var(--ink5)',
                borderColor: platform === p ? 'var(--ink)' : 'var(--border2)',
              }}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Reel Toggle */}
      <div style={s.toggleRow}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Include Reel Script</p>
          <p style={{ fontSize: 11, color: 'var(--ink5)', marginTop: 2 }}>Hook + body + CTA for short video</p>
        </div>
        <div
          onClick={() => setIncludeReel(r => !r)}
          style={{
            width: 42, height: 24, borderRadius: 12, position: 'relative', cursor: 'pointer',
            background: includeReel ? 'var(--lav400)' : 'rgba(0,0,0,0.12)',
            transition: 'background 0.25s', flexShrink: 0,
          }}
        >
          <div style={{
            position: 'absolute', top: 2, width: 20, height: 20, borderRadius: '50%',
            background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            left: includeReel ? 20 : 2, transition: 'left 0.25s',
          }} />
        </div>
      </div>

      {/* Generate Button */}
      <button
        style={s.genBtn(ready, loading)}
        onClick={handleSubmit}
        disabled={!ready || loading}
        onMouseEnter={e => { if (ready && !loading) e.currentTarget.style.opacity = '0.88'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ display: 'flex', gap: 4 }}>
              <span className="dot" /><span className="dot" /><span className="dot" />
            </span>
            Generating magic...
          </span>
        ) : '✦  Generate Content'}
      </button>

      {!ready && (
        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink6)' }}>Add a product name to get started</p>
      )}
    </div>
  );
}
