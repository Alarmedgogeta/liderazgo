export default function KpiCard({
  label,
  value,
  detail,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  detail?: string;
  tone?: 'neutral' | 'good' | 'bad';
}) {
  const detailColor = {
    neutral: 'var(--text-secondary)',
    good: 'var(--delta-good)',
    bad: 'var(--delta-bad)',
  }[tone];

  return (
    <div
      className="viz-root flex flex-col gap-1 rounded-lg border px-5 py-4"
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
      <p className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
      {detail ? (
        <p className="text-xs font-medium" style={{ color: detailColor }}>
          {detail}
        </p>
      ) : null}
    </div>
  );
}
