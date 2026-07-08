'use client';

import { useState } from 'react';
import { RotateCw } from 'lucide-react';

export default function FlipCard({
  frontTitle,
  frontSubtitle,
  backTitle,
  backItems,
  compact = false,
}: {
  frontTitle: string;
  frontSubtitle: string;
  backTitle: string;
  backItems: string[];
  compact?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className={`flip-card ${compact ? 'h-40' : 'h-64'} w-full text-left`}
      aria-pressed={flipped}
    >
      <div className={`flip-card-inner ${flipped ? 'flip-card-flipped' : ''}`}>
        <div
          className={`flip-card-face viz-root flex flex-col justify-between rounded-lg border ${compact ? 'p-4' : 'p-5'}`}
          style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
        >
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--series-1)' }}
            >
              {frontTitle}
            </p>
            <p
              className={`${compact ? 'mt-2 text-sm' : 'mt-3 text-lg'} leading-snug`}
              style={{ color: 'var(--text-primary)' }}
            >
              {frontSubtitle}
            </p>
          </div>
          {compact ? null : (
            <p className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <RotateCw size={12} /> Pasa el cursor para el detalle
            </p>
          )}
        </div>

        <div
          className={`flip-card-face flip-card-back flex flex-col rounded-lg border ${compact ? 'p-4' : 'p-5'}`}
          style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--series-1)' }}
        >
          <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">
            {backTitle}
          </p>
          <ul
            className={`${compact ? 'mt-2 space-y-1 text-xs' : 'mt-3 space-y-2 text-sm'} leading-snug text-white`}
          >
            {backItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
}
