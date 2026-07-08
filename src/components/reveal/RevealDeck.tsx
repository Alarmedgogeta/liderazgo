'use client';

import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
import './reveal-overrides.css';

import type { RevealApi } from 'reveal.js';
import { useEffect, useRef } from 'react';

export default function RevealDeck({ children }: { children: React.ReactNode }) {
  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<RevealApi | null>(null);

  useEffect(() => {
    const deckElement = deckRef.current;
    if (!deckElement) return undefined;

    let cancelled = false;

    import('reveal.js').then(({ default: Reveal }) => {
      if (cancelled) return;
      const deck = new Reveal(deckElement, {
        hash: true,
        transition: 'slide',
        slideNumber: 'c/t',
        width: 1280,
        height: 720,
        margin: 0.04,
      });
      revealRef.current = deck;
      deck.initialize();
    });

    return () => {
      cancelled = true;
      if (revealRef.current) {
        try {
          revealRef.current.destroy();
        } catch {
          // Reveal throws if the DOM was already torn down; safe to ignore on unmount.
        }
        revealRef.current = null;
      }
    };
  }, []);

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">{children}</div>
    </div>
  );
}
