import type { StatTileData } from './data';

function Sparkline({ points, isGood }: { points: number[]; isGood: boolean }) {
  const width = 96;
  const height = 28;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((value, index) => ({
    x: (index / (points.length - 1)) * width,
    y: height - ((value - min) / range) * height,
  }));

  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x},${c.y}`).join(' ');
  const last = coords[coords.length - 1];
  const accent = isGood ? 'var(--status-good)' : 'var(--status-critical)';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={last.x}
        cy={last.y}
        r={4}
        fill={accent}
        stroke="var(--surface-1)"
        strokeWidth={2}
      />
    </svg>
  );
}

export default function StatTile({ label, value, delta, isGood, sparkline }: StatTileData) {
  return (
    <div
      className="viz-root flex flex-col gap-2 rounded-lg border p-5"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {label}
          </p>
          <p className="mt-1 text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {value}
          </p>
          <p
            className="mt-1 text-sm font-medium"
            style={{ color: isGood ? 'var(--delta-good)' : 'var(--delta-bad)' }}
          >
            {delta}
          </p>
        </div>
        <Sparkline points={sparkline} isGood={isGood} />
      </div>
    </div>
  );
}
