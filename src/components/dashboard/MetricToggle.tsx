import type { MetricKey } from './data';

const OPTIONS: { key: MetricKey; label: string }[] = [
  { key: 'cost', label: 'Cost' },
  { key: 'service', label: 'Service' },
];

export default function MetricToggle({
  value,
  onChange,
}: {
  value: MetricKey;
  onChange: (key: MetricKey) => void;
}) {
  return (
    <div
      className="viz-root inline-flex items-center gap-1 rounded-full border p-1"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
      role="tablist"
      aria-label="Metric filter"
    >
      {OPTIONS.map((option) => {
        const isActive = option.key === value;
        return (
          <button
            key={option.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.key)}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            style={{
              backgroundColor: isActive ? 'var(--series-1)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
