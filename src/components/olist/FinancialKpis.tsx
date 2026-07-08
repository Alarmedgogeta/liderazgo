'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import financial from '@/data/financial_kpis.json';
import KpiCard from './KpiCard';
import { formatBRL, formatBRLCompact, formatNumber } from './format';

type Quarter = (typeof financial.quarters)[number];

const ALL = 'Todos';

// "2017-Q3" → "Q3'17"
function shortQuarter(quarter: string) {
  const [year, q] = quarter.split('-');
  return `${q}'${year.slice(2)}`;
}

function QuarterTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: Quarter }[];
}) {
  if (!active || !payload?.length) return null;
  const q = payload[0].payload;
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
        {q.quarter}
      </p>
      <p className="font-semibold">{formatBRL(q.atRisk)} en riesgo</p>
      <p style={{ color: 'var(--text-secondary)' }}>
        {q.riskPct}% del revenue del trimestre · {formatNumber(q.orders)} órdenes
      </p>
    </div>
  );
}

export default function FinancialKpis({ chartHeight = 170 }: { chartHeight?: number }) {
  const [selected, setSelected] = useState<string>(ALL);

  const quarter = financial.quarters.find((q) => q.quarter === selected);
  const revenue = quarter ? quarter.revenue : financial.total.revenue;
  const atRisk = quarter ? quarter.atRisk : financial.total.atRisk;
  const riskPct = quarter ? quarter.riskPct : financial.total.riskPct;

  return (
    <div
      className="viz-root flex flex-col gap-3 rounded-lg border p-4"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Revenue en riesgo por trimestre</h3>
        <label
          htmlFor="quarter-select"
          className="flex items-center gap-2 text-xs"
          style={{ color: 'var(--text-secondary)' }}
        >
          Periodo
          <select
            id="quarter-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-md border px-2 py-1 text-xs"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--surface-1)',
              color: 'var(--text-primary)',
            }}
          >
            <option value={ALL}>{ALL}</option>
            {financial.quarters.map((q) => (
              <option key={q.quarter} value={q.quarter}>
                {q.quarter}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <KpiCard label="Revenue total" value={formatBRLCompact(revenue)} />
        <KpiCard
          label="Revenue en riesgo"
          value={formatBRLCompact(atRisk)}
          tone="bad"
          detail="órdenes 1–2★"
        />
        <KpiCard label="% en riesgo" value={`${riskPct.toFixed(1)}%`} tone="bad" />
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart data={financial.quarters} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid stroke="var(--gridline)" vertical={false} />
          <XAxis
            dataKey="quarter"
            tickFormatter={shortQuarter}
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            stroke="var(--baseline)"
          />
          <YAxis
            tickFormatter={(v: number) => formatBRLCompact(v)}
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            stroke="var(--baseline)"
            width={70}
          />
          <Tooltip
            content={<QuarterTooltip />}
            cursor={{ fill: 'var(--gridline)', opacity: 0.4 }}
          />
          <Bar
            dataKey="atRisk"
            radius={[4, 4, 0, 0]}
            className="cursor-pointer"
            onClick={(_, index) => setSelected(financial.quarters[index].quarter)}
          >
            {financial.quarters.map((q) => (
              <Cell
                key={q.quarter}
                fill="var(--delta-bad)"
                fillOpacity={selected === ALL || selected === q.quarter ? 0.9 : 0.3}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
