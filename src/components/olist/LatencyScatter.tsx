'use client';

import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import latencyReview from '@/data/latency_review.json';
import { formatNumber } from './format';

type LatencyPoint = (typeof latencyReview.points)[number];

function describeDelay(delay: number) {
  if (delay === 0) return 'Entrega en fecha estimada';
  if (delay > 0) return `${delay} días de atraso`;
  return `${-delay} días de anticipación`;
}

function LatencyTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: LatencyPoint }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  const when = describeDelay(point.delay);
  return (
    <div
      className="rounded-md border px-3 py-2 text-xs shadow-sm"
      style={{
        borderColor: 'var(--border-hairline)',
        backgroundColor: 'var(--surface-1)',
        color: 'var(--text-primary)',
      }}
    >
      <p className="mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
        {when}
      </p>
      <p className="font-semibold">{point.avgScore.toFixed(2)} ★ promedio</p>
      <p style={{ color: 'var(--text-secondary)' }}>{formatNumber(point.orders)} órdenes</p>
    </div>
  );
}

export default function LatencyScatter({ height = 340 }: { height?: number }) {
  const [region, setRegion] = useState('Todas');

  const points = useMemo(() => latencyReview.points.filter((p) => p.region === region), [region]);

  return (
    <div
      className="viz-root rounded-lg border p-4"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <div className="mb-2 flex items-center justify-between gap-4">
        <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
          Score promedio según días de atraso — tamaño = nº de órdenes
        </h3>
        <div
          className="flex items-center gap-1 rounded-full border p-1"
          role="tablist"
          aria-label="Filtro por región"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          {latencyReview.regions.map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={r === region}
              onClick={() => setRegion(r)}
              className="rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors"
              style={{
                backgroundColor: r === region ? 'var(--series-1)' : 'transparent',
                color: r === region ? '#ffffff' : 'var(--text-secondary)',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 12, right: 24, bottom: 24, left: 8 }}>
          <CartesianGrid stroke="var(--gridline)" />
          <XAxis
            type="number"
            dataKey="delay"
            domain={[-30, 30]}
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            stroke="var(--baseline)"
            label={{
              value: '← anticipación · días vs. fecha estimada · atraso →',
              position: 'insideBottom',
              offset: -16,
              fill: 'var(--text-secondary)',
              fontSize: 12,
            }}
          />
          <YAxis
            type="number"
            dataKey="avgScore"
            domain={[1, 5]}
            tickCount={5}
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            stroke="var(--baseline)"
            label={{
              value: 'Score promedio',
              angle: -90,
              position: 'insideLeft',
              fill: 'var(--text-secondary)',
              fontSize: 12,
            }}
          />
          <ZAxis type="number" dataKey="orders" range={[30, 420]} />
          <ReferenceLine
            x={0}
            stroke="var(--text-muted)"
            strokeDasharray="4 3"
            label={{
              value: 'Fecha estimada',
              position: 'top',
              fill: 'var(--text-secondary)',
              fontSize: 11,
            }}
          />
          <Tooltip content={<LatencyTooltip />} cursor={{ stroke: 'var(--gridline)' }} />
          <Scatter
            data={points}
            fill="var(--series-1)"
            fillOpacity={0.75}
            stroke="var(--surface-1)"
            strokeWidth={1}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
