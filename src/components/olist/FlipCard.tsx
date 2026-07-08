'use client';

import { useState } from 'react';

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
  const [open, setOpen] = useState(false);

  const showDetail = open;

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-pressed={open}
      className={`group viz-root flex h-full w-full flex-col rounded-lg border text-left transition-shadow duration-200 hover:shadow-md ${
        compact ? 'p-3' : 'p-5'
      }`}
      style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--surface-1)' }}
    >
      <p
        className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: 'var(--series-1)' }}
      >
        {frontTitle}
      </p>

      {/* Ambas capas ocupan la misma celda del grid: la carta mide lo que mida la más alta */}
      <div className={`grid ${compact ? 'mt-1.5' : 'mt-2'}`}>
        <p
          className={`leading-snug transition-opacity duration-200 [grid-area:1/1] group-hover:opacity-0 ${
            compact ? 'text-sm' : 'text-lg'
          } ${showDetail ? 'opacity-0' : 'opacity-100'}`}
          style={{ color: 'var(--text-primary)' }}
        >
          {frontSubtitle}
        </p>

        <div
          className={`transition-all duration-200 [grid-area:1/1] group-hover:translate-y-0 group-hover:opacity-100 ${
            showDetail ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'
          }`}
        >
          <p
            className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            {backTitle}
          </p>
          <ul
            className={`mt-1 leading-snug ${compact ? 'space-y-0.5 text-xs' : 'space-y-2 text-sm'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            {backItems.map((item) => (
              <li key={item} className="flex gap-1.5">
                <span aria-hidden style={{ color: 'var(--series-1)' }}>
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
}
