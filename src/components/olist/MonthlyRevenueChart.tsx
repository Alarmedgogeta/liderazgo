'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import monthlyRevenue from '@/data/monthly_revenue.json';
import { formatBRL, formatBRLCompact, formatMonth, formatNumber } from './format';

const peak = monthlyRevenue.reduce((a, b) => (b.revenue > a.revenue ? b : a));

function RevenueTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: (typeof monthlyRevenue)[number] }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
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
        {formatMonth(point.order_month)}
      </p>
      <p className="font-semibold">{formatBRL(point.revenue)}</p>
      <p style={{ color: 'var(--text-secondary)' }}>{formatNumber(point.orders)} órdenes</p>
    </div>
  );
}

export default function MonthlyRevenueChart({ height = 300 }: { height?: number }) {
  return (
    <div
      className="viz-root rounded-lg border p-4"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <h3 style={{ margin: '0 0 8px', color: 'var(--text-primary)' }}>Ingresos mensuales (BRL)</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={monthlyRevenue} margin={{ top: 24, right: 24, bottom: 0, left: 8 }}>
          <CartesianGrid stroke="var(--gridline)" vertical={false} />
          <XAxis
            dataKey="order_month"
            tickFormatter={formatMonth}
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            stroke="var(--baseline)"
            interval={2}
          />
          <YAxis
            tickFormatter={formatBRLCompact}
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            stroke="var(--baseline)"
            width={70}
          />
          <Tooltip content={<RevenueTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--series-1)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, stroke: 'var(--surface-1)', strokeWidth: 2 }}
          />
          <ReferenceDot
            x={peak.order_month}
            y={peak.revenue}
            r={5}
            fill="var(--series-1)"
            stroke="var(--surface-1)"
            strokeWidth={2}
            label={{
              value: `Pico: ${formatBRLCompact(peak.revenue)} (${formatMonth(peak.order_month)})`,
              position: 'top',
              fill: 'var(--text-primary)',
              fontSize: 12,
              fontWeight: 600,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
