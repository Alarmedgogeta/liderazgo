'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import paymentByScore from '@/data/payment_by_score.json';
import { formatBRL, formatNumber } from './format';

type ScoreSlice = (typeof paymentByScore)[number];

// Polaridad de satisfacción con par divergente rojo ↔ azul y punto medio neutro
const SCORE_COLORS: Record<number, string> = {
  1: '#d03b3b',
  2: '#ec8483',
  3: '#b0afa8',
  4: '#86b6ef',
  5: '#2a78d6',
};

const atRiskValue = paymentByScore
  .filter((s) => s.score <= 2)
  .reduce((sum, s) => sum + s.paymentValue, 0);
const atRiskPct = paymentByScore
  .filter((s) => s.score <= 2)
  .reduce((sum, s) => sum + s.pctValue, 0);

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ScoreSlice }[];
}) {
  if (!active || !payload?.length) return null;
  const slice = payload[0].payload;
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
        Score {slice.score} ★
      </p>
      <p className="font-semibold">{formatBRL(slice.paymentValue)}</p>
      <p style={{ color: 'var(--text-secondary)' }}>
        {slice.pctValue}% del total · {formatNumber(slice.orders)} órdenes
      </p>
    </div>
  );
}

export default function PaymentDonut({ height = 340 }: { height?: number }) {
  const [selected, setSelected] = useState<ScoreSlice | null>(null);

  return (
    <div
      className="viz-root relative rounded-lg border p-4"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <h3 style={{ margin: '0 0 4px', color: 'var(--text-primary)' }}>
        Valor de pagos por score de reseña
      </h3>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        Haz clic en un segmento para ver el detalle monetario
      </p>

      <div className="flex items-center gap-6">
        <ResponsiveContainer width="60%" height={height}>
          <PieChart>
            <Tooltip content={<DonutTooltip />} />
            <Pie
              data={paymentByScore}
              dataKey="paymentValue"
              nameKey="score"
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={2}
              stroke="var(--surface-1)"
              strokeWidth={2}
              onClick={(_, index) => setSelected(paymentByScore[index])}
              className="cursor-pointer"
            >
              {paymentByScore.map((slice) => (
                <Cell key={slice.score} fill={SCORE_COLORS[slice.score]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {[...paymentByScore].reverse().map((slice) => (
            <li key={slice.score}>
              <button
                type="button"
                onClick={() => setSelected(slice)}
                className="flex w-full items-center gap-2 rounded px-1 text-left"
              >
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-sm"
                  style={{ backgroundColor: SCORE_COLORS[slice.score] }}
                />
                <span className="whitespace-nowrap">
                  {slice.score} ★ ·{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>{slice.pctValue}%</strong>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected ? (
        <div
          role="dialog"
          aria-label={`Detalle score ${selected.score}`}
          className="absolute inset-x-8 top-1/3 z-10 rounded-lg border p-5 shadow-lg"
          style={{
            borderColor: 'var(--border-hairline)',
            backgroundColor: 'var(--surface-1)',
            color: 'var(--text-primary)',
          }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={16} />
          </button>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Órdenes calificadas con {selected.score} ★
          </p>
          <p className="mt-1 text-3xl font-semibold">{formatBRL(selected.paymentValue)}</p>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {selected.pctValue}% del volumen de pagos · {formatNumber(selected.orders)} órdenes
          </p>
          {selected.score <= 2 ? (
            <p className="mt-3 text-sm font-medium" style={{ color: 'var(--delta-bad)' }}>
              Revenue en riesgo (scores 1–2): {formatBRL(atRiskValue)} — {atRiskPct.toFixed(1)}% del
              valor con reseña
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
