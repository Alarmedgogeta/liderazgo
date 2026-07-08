const brlFull = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const brlCents = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const plain = new Intl.NumberFormat('pt-BR');

export function formatBRL(value: number): string {
  return brlFull.format(value);
}

export function formatBRLCents(value: number): string {
  return brlCents.format(value);
}

export function formatBRLCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}K`;
  return brlFull.format(value);
}

export function formatNumber(value: number): string {
  return plain.format(value);
}

export function formatMonth(month: string): string {
  const [year, m] = month.split('-');
  const names = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  return `${names[Number(m) - 1]} ${year.slice(2)}`;
}
