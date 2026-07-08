'use client';

import { useId, useMemo, useState } from 'react';
import type { MetricDefinition } from './data';

const WIDTH = 520;
const HEIGHT = 200;
const PADDING = { top: 16, right: 16, bottom: 28, left: 16 };

export default function TrendChart({ metric }: { metric: MetricDefinition }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const titleId = useId();

  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;

  const points = useMemo(() => {
    const values = metric.trend.flatMap((p) => [p.actual, p.target]);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    const spread = dataMax - dataMin || 1;
    const paddedMin = dataMin - spread * 0.15;
    const paddedMax = dataMax + spread * 0.15;

    const toXY = (value: number, index: number) => ({
      x: PADDING.left + (index / (metric.trend.length - 1)) * plotWidth,
      y: PADDING.top + (1 - (value - paddedMin) / (paddedMax - paddedMin)) * plotHeight,
    });

    return metric.trend.map((p, i) => ({
      quarter: p.quarter,
      actual: toXY(p.actual, i),
      target: toXY(p.target, i),
      raw: p,
    }));
  }, [metric, plotWidth, plotHeight]);

  const linePath = (key: 'actual' | 'target') =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[key].x},${p[key].y}`).join(' ');

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div
      className="viz-root rounded-lg border p-4"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{metric.label} by quarter</h3>
        </div>
        <div className="flex items-center gap-4">
          <ul
            className="flex items-center gap-3 text-xs"
            style={{ color: 'var(--text-secondary)' }}
          >
            <li className="flex items-center gap-1.5">
              <span
                className="inline-block h-0.5 w-4"
                style={{ backgroundColor: 'var(--series-1)' }}
              />
              Actual
            </li>
            <li className="flex items-center gap-1.5">
              <span
                className="inline-block h-0.5 w-4 border-t-2 border-dashed"
                style={{ borderColor: 'var(--text-muted)' }}
              />
              Target
            </li>
          </ul>
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            className="text-xs underline"
            style={{ color: 'var(--text-secondary)' }}
          >
            {showTable ? 'Hide data' : 'View data'}
          </button>
        </div>
      </div>

      {showTable ? (
        <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
          <caption className="sr-only">{metric.label} by quarter, actual vs target</caption>
          <thead>
            <tr style={{ color: 'var(--text-secondary)' }}>
              <th className="text-left font-normal">Quarter</th>
              <th className="text-right font-normal">Actual</th>
              <th className="text-right font-normal">Target</th>
            </tr>
          </thead>
          <tbody>
            {metric.trend.map((p) => (
              <tr key={p.quarter} className="border-t" style={{ borderColor: 'var(--gridline)' }}>
                <td className="py-1">{p.quarter}</td>
                <td className="py-1 text-right tabular-nums">{metric.format(p.actual)}</td>
                <td className="py-1 text-right tabular-nums">{metric.format(p.target)}</td>
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
            onPointerLeave={() => setHoverIndex(null)}
          >
            <title id={titleId}>{`${metric.label}, actual versus target, by quarter`}</title>

            <line
              x1={PADDING.left}
              y1={HEIGHT - PADDING.bottom}
              x2={WIDTH - PADDING.right}
              y2={HEIGHT - PADDING.bottom}
              stroke="var(--baseline)"
              strokeWidth={1}
            />

            {hovered ? (
              <line
                x1={hovered.actual.x}
                y1={PADDING.top}
                x2={hovered.actual.x}
                y2={HEIGHT - PADDING.bottom}
                stroke="var(--gridline)"
                strokeWidth={1}
              />
            ) : null}

            <path
              d={linePath('target')}
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
            <path
              d={linePath('actual')}
              fill="none"
              stroke="var(--series-1)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((p) => (
              <g key={p.quarter}>
                <circle
                  cx={p.target.x}
                  cy={p.target.y}
                  r={3}
                  fill="var(--text-muted)"
                  stroke="var(--surface-1)"
                  strokeWidth={2}
                />
                <circle
                  cx={p.actual.x}
                  cy={p.actual.y}
                  r={4}
                  fill="var(--series-1)"
                  stroke="var(--surface-1)"
                  strokeWidth={2}
                />
                <text
                  x={p.actual.x}
                  y={HEIGHT - PADDING.bottom + 16}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--text-muted)"
                >
                  {p.quarter}
                </text>
              </g>
            ))}

            {points.map((p, i) => (
              <rect
                key={`hit-${p.quarter}`}
                x={PADDING.left + (i / points.length) * plotWidth}
                y={0}
                width={plotWidth / points.length}
                height={HEIGHT}
                fill="transparent"
                onPointerEnter={() => setHoverIndex(i)}
                onFocus={() => setHoverIndex(i)}
                tabIndex={0}
                aria-label={`${p.quarter}: actual ${metric.format(p.raw.actual)}, target ${metric.format(p.raw.target)}`}
              />
            ))}
          </svg>

          {hovered ? (
            <div
              className="pointer-events-none absolute top-1 rounded-md border px-3 py-2 text-xs shadow-sm"
              style={{
                left: `${(hovered.actual.x / WIDTH) * 100}%`,
                transform: hovered.actual.x > WIDTH * 0.7 ? 'translateX(-100%)' : 'translateX(0)',
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--surface-1)',
                color: 'var(--text-primary)',
              }}
            >
              <p className="mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                {hovered.quarter}
              </p>
              <p className="flex items-center gap-1.5">
                <span
                  className="inline-block h-0.5 w-3"
                  style={{ backgroundColor: 'var(--series-1)' }}
                />
                <span className="font-semibold tabular-nums">
                  {metric.format(hovered.raw.actual)}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>actual</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span
                  className="inline-block h-0.5 w-3 border-t-2 border-dashed"
                  style={{ borderColor: 'var(--text-muted)' }}
                />
                <span className="font-semibold tabular-nums">
                  {metric.format(hovered.raw.target)}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>target</span>
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
