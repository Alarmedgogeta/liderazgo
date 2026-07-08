'use client';

import { useId, useMemo, useState } from 'react';
import type { MetricDefinition } from './data';

const WIDTH = 480;
const HEIGHT = 200;
const PADDING = { top: 24, right: 8, bottom: 28, left: 8 };
const BAR_WIDTH = 40;
const GAP = 2;

export default function RegionBarChart({ metric }: { metric: MetricDefinition }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const titleId = useId();

  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;

  const bars = useMemo(() => {
    const max = Math.max(...metric.regions.map((r) => r.value));
    const scaledMax = max * 1.15;
    const bandWidth = plotWidth / metric.regions.length;

    return metric.regions.map((r, i) => {
      const barHeight = (r.value / scaledMax) * plotHeight;
      return {
        ...r,
        x: PADDING.left + i * bandWidth + (bandWidth - BAR_WIDTH) / 2,
        bandX: PADDING.left + i * bandWidth,
        bandWidth,
        y: PADDING.top + plotHeight - barHeight,
        height: barHeight,
      };
    });
  }, [metric, plotWidth, plotHeight]);

  const hovered = hoverIndex !== null ? bars[hoverIndex] : null;
  const best = metric.higherIsBetter
    ? Math.max(...metric.regions.map((r) => r.value))
    : Math.min(...metric.regions.map((r) => r.value));

  return (
    <div
      className="viz-root rounded-lg border p-4"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3
          style={{ margin: 0, color: 'var(--text-primary)' }}
        >{`${metric.label} by region — Q4`}</h3>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="text-xs underline"
          style={{ color: 'var(--text-secondary)' }}
        >
          {showTable ? 'Hide data' : 'View data'}
        </button>
      </div>

      {showTable ? (
        <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
          <caption className="sr-only">{metric.label} by region, fourth quarter</caption>
          <thead>
            <tr style={{ color: 'var(--text-secondary)' }}>
              <th className="text-left font-normal">Region</th>
              <th className="text-right font-normal">Value</th>
            </tr>
          </thead>
          <tbody>
            {metric.regions.map((r) => (
              <tr key={r.region} className="border-t" style={{ borderColor: 'var(--gridline)' }}>
                <td className="py-1">{r.region}</td>
                <td className="py-1 text-right tabular-nums">{metric.format(r.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="relative">
          <svg
            role="img"
            aria-labelledby={titleId}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full"
          >
            <title id={titleId}>{`${metric.label} by region, fourth quarter`}</title>

            <line
              x1={PADDING.left}
              y1={PADDING.top + plotHeight}
              x2={WIDTH - PADDING.right}
              y2={PADDING.top + plotHeight}
              stroke="var(--baseline)"
              strokeWidth={1}
            />

            {bars.map((bar, i) => {
              const isBest = bar.value === best;
              const isHovered = hoverIndex === i;
              return (
                <g key={bar.region}>
                  <rect
                    x={bar.x}
                    y={bar.y}
                    width={BAR_WIDTH}
                    height={Math.max(bar.height, 1)}
                    rx={4}
                    fill={isBest ? 'var(--series-1)' : 'var(--series-2)'}
                    opacity={isHovered ? 1 : 0.92}
                  />
                  <text
                    x={bar.x + BAR_WIDTH / 2}
                    y={bar.y - 8}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill="var(--text-primary)"
                  >
                    {metric.format(bar.value)}
                  </text>
                  <text
                    x={bar.x + BAR_WIDTH / 2}
                    y={PADDING.top + plotHeight + 18}
                    textAnchor="middle"
                    fontSize={11}
                    fill="var(--text-muted)"
                  >
                    {bar.region}
                  </text>
                  <rect
                    x={bar.bandX}
                    y={0}
                    width={bar.bandWidth - GAP}
                    height={HEIGHT}
                    fill="transparent"
                    onPointerEnter={() => setHoverIndex(i)}
                    onPointerLeave={() => setHoverIndex(null)}
                    onFocus={() => setHoverIndex(i)}
                    onBlur={() => setHoverIndex(null)}
                    tabIndex={0}
                    aria-label={`${bar.region}: ${metric.format(bar.value)}`}
                  />
                </g>
              );
            })}
          </svg>

          {hovered ? (
            <div
              className="pointer-events-none absolute top-1 rounded-md border px-3 py-2 text-xs shadow-sm"
              style={{
                left: `${((hovered.x + BAR_WIDTH / 2) / WIDTH) * 100}%`,
                transform: 'translateX(-50%)',
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--surface-1)',
                color: 'var(--text-primary)',
              }}
            >
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                {hovered.region}
              </p>
              <p className="font-semibold tabular-nums">{metric.format(hovered.value)}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
