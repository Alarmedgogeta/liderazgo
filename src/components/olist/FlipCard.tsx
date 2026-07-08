'use client';

import { useState } from 'react';
import { RotateCw } from 'lucide-react';

export default function FlipCard({
  frontTitle,
  frontSubtitle,
  backTitle,
  backItems,
}: {
  frontTitle: string;
  frontSubtitle: string;
  backTitle: string;
  backItems: string[];
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="flip-card h-64 w-full text-left"
      aria-pressed={flipped}
    >
      <div className={`flip-card-inner ${flipped ? 'flip-card-flipped' : ''}`}>
        <div
          className="flip-card-face viz-root flex flex-col justify-between rounded-lg border p-5"
          style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
        >
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--series-1)' }}
            >
              {frontTitle}
            </p>
            <p className="mt-3 text-lg leading-snug" style={{ color: 'var(--text-primary)' }}>
              {frontSubtitle}
            </p>
          </div>
          <p className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <RotateCw size={12} /> Clic para voltear
          </p>
        </div>

        <div
          className="flip-card-face flip-card-back flex flex-col rounded-lg border p-5"
          style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--series-1)' }}
        >
          <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">
            {backTitle}
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-snug text-white">
            {backItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
}
