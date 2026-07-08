'use client';

import { useMemo, useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import categoryMatrix from '@/data/category_matrix.json';
import { formatBRLCents, formatBRLCompact, formatNumber } from './format';

type Row = (typeof categoryMatrix)[number];
type SortKey = 'volume' | 'revenue' | 'avgFreight' | 'avgReview';

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'volume', label: 'Volumen (ítems)' },
  { key: 'revenue', label: 'Ingresos' },
  { key: 'avgFreight', label: 'Flete promedio' },
  { key: 'avgReview', label: 'Score promedio' },
];

// Rampa secuencial azul para magnitud de flete (claro → oscuro)
function freightHeat(value: number, min: number, max: number) {
  const steps = ['#cde2fb', '#9ec5f4', '#6da7ec', '#3987e5', '#256abf'];
  const idx = Math.min(
    steps.length - 1,
    Math.floor(((value - min) / (max - min || 1)) * steps.length),
  );
  return { backgroundColor: steps[idx], color: idx >= 3 ? '#ffffff' : '#0b0b0b' };
}

// Divergente rojo ↔ azul alrededor del promedio global (~4.0)
function reviewHeat(value: number) {
  if (value <= 3.7) return { backgroundColor: '#e34948', color: '#ffffff' };
  if (value <= 3.9) return { backgroundColor: '#f3b4b3', color: '#0b0b0b' };
  if (value <= 4.1) return { backgroundColor: '#f0efec', color: '#0b0b0b' };
  if (value <= 4.3) return { backgroundColor: '#9ec5f4', color: '#0b0b0b' };
  return { backgroundColor: '#3987e5', color: '#ffffff' };
}

function labelize(category: string) {
  return category.replaceAll('_', ' ');
}

function SortIcon({ isActive, descending }: { isActive: boolean; descending: boolean }) {
  if (!isActive) return <ArrowUpDown size={12} style={{ color: 'var(--text-muted)' }} />;
  if (descending) return <ChevronDown size={13} />;
  return <ChevronUp size={13} />;
}

export default function CategoryTable({
  rows = categoryMatrix.length,
  maxHeight = 400,
}: {
  rows?: number;
  maxHeight?: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>('volume');
  const [descending, setDescending] = useState(true);

  const sorted = useMemo(() => {
    const copy = [...categoryMatrix].sort((a, b) =>
      descending ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey],
    );
    return copy.slice(0, rows);
  }, [sortKey, descending, rows]);

  const freightValues = categoryMatrix.map((r) => r.avgFreight);
  const freightMin = Math.min(...freightValues);
  const freightMax = Math.max(...freightValues);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setDescending((d) => !d);
    } else {
      setSortKey(key);
      setDescending(true);
    }
  };

  return (
    <div
      className="viz-root rounded-lg border p-4"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <h3 style={{ margin: '0 0 8px', color: 'var(--text-primary)' }}>
        Top 20 categorías: volumen, flete y satisfacción — ordena con las columnas y desplázate para
        ver todas
      </h3>
      <div className="overflow-y-auto" style={{ maxHeight }}>
        <table className="w-full border-collapse text-sm">
          <thead
            className="sticky top-0 z-10"
            style={{
              backgroundColor: 'var(--surface-1)',
              boxShadow: 'inset 0 -1px 0 var(--gridline)',
            }}
          >
            <tr>
              <th
                className="py-1.5 pr-2 text-left text-xs font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Categoría
              </th>
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-2 py-1.5 text-right">
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="inline-flex items-center gap-1 text-xs font-medium"
                    style={{
                      color: col.key === sortKey ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {col.label}
                    <SortIcon isActive={col.key === sortKey} descending={descending} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-primary)' }}>
            {sorted.map((row: Row) => (
              <tr
                key={row.category}
                className="border-t"
                style={{ borderColor: 'var(--gridline)' }}
              >
                <td className="max-w-[220px] truncate py-1 pr-2 capitalize">
                  {labelize(row.category)}
                </td>
                <td className="px-2 py-1 text-right tabular-nums">{formatNumber(row.volume)}</td>
                <td className="px-2 py-1 text-right tabular-nums">
                  {formatBRLCompact(row.revenue)}
                </td>
                <td className="px-2 py-1 text-right">
                  <span
                    className="inline-block min-w-[72px] rounded px-2 py-0.5 text-right tabular-nums"
                    style={freightHeat(row.avgFreight, freightMin, freightMax)}
                  >
                    {formatBRLCents(row.avgFreight)}
                  </span>
                </td>
                <td className="px-2 py-1 text-right">
                  <span
                    className="inline-block min-w-[48px] rounded px-2 py-0.5 text-right tabular-nums"
                    style={reviewHeat(row.avgReview)}
                  >
                    {row.avgReview.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
