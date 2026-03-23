// client/src/components/SkeletonLoader.js
const Line = ({ w = '100%', h = 14, mb = 8 }) => (
  <div className="shimmer" style={{ width: w, height: h, marginBottom: mb }} />
);

export default function SkeletonLoader() {
  return (
    <div style={{ display: 'grid', gap: 12 }} className="animate-fade-in">
      {/* Generating indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 2px', marginBottom: 4 }}>
        <span style={{ display: 'flex', gap: 5 }}>
          <span className="dot" style={{ background: 'var(--lav400)' }} />
          <span className="dot" style={{ background: 'var(--lav400)' }} />
          <span className="dot" style={{ background: 'var(--lav400)' }} />
        </span>
        <span style={{ fontSize: 13, color: 'var(--ink5)', fontWeight: 500 }}>
          Generating your marketing content...
        </span>
      </div>

      {/* Card 1 */}
      <div style={{ padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div className="shimmer" style={{ width: 68, height: 28, borderRadius: 9 }} />
          <div className="shimmer" style={{ width: 50, height: 28, borderRadius: 9 }} />
        </div>
        <Line /><Line /><Line w="80%" mb={0} />
      </div>

      {/* Hashtag skeleton */}
      <div style={{ padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)' }}>
        <div className="shimmer" style={{ width: 68, height: 28, borderRadius: 9, marginBottom: 14 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[82, 104, 72, 96, 60, 114, 78, 88, 66].map((w, i) => (
            <div key={i} className="shimmer" style={{ width: w, height: 30, borderRadius: 9 }} />
          ))}
        </div>
      </div>

      {/* Card 2 */}
      <div style={{ padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.8)', border: '0.5px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div className="shimmer" style={{ width: 68, height: 28, borderRadius: 9 }} />
        </div>
        <Line /><Line w="88%" mb={0} />
      </div>
    </div>
  );
}
