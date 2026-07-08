export type MetricKey = 'cost' | 'service';

export interface TrendPoint {
  quarter: string;
  actual: number;
  target: number;
}

export interface RegionPoint {
  region: string;
  value: number;
}

export interface MetricDefinition {
  label: string;
  unit: string;
  format: (value: number) => string;
  trend: TrendPoint[];
  regions: RegionPoint[];
  higherIsBetter: boolean;
}

export const metrics: Record<MetricKey, MetricDefinition> = {
  cost: {
    label: 'Logistics cost per unit',
    unit: 'USD',
    format: (value) => `$${value.toFixed(2)}`,
    trend: [
      { quarter: 'Q1', actual: 24.1, target: 23.0 },
      { quarter: 'Q2', actual: 22.3, target: 21.5 },
      { quarter: 'Q3', actual: 19.8, target: 20.0 },
      { quarter: 'Q4', actual: 18.4, target: 18.5 },
    ],
    regions: [
      { region: 'North', value: 17.2 },
      { region: 'South', value: 19.6 },
      { region: 'East', value: 18.1 },
      { region: 'West', value: 18.9 },
    ],
    higherIsBetter: false,
  },
  service: {
    label: 'On-time delivery',
    unit: '%',
    format: (value) => `${value.toFixed(1)}%`,
    trend: [
      { quarter: 'Q1', actual: 88.1, target: 90.0 },
      { quarter: 'Q2', actual: 91.4, target: 92.0 },
      { quarter: 'Q3', actual: 94.0, target: 94.0 },
      { quarter: 'Q4', actual: 96.2, target: 95.5 },
    ],
    regions: [
      { region: 'North', value: 97.5 },
      { region: 'South', value: 94.1 },
      { region: 'East', value: 96.8 },
      { region: 'West', value: 95.4 },
    ],
    higherIsBetter: true,
  },
};

export interface StatTileData {
  label: string;
  value: string;
  delta: string;
  isGood: boolean;
  sparkline: number[];
}

export const statTiles: StatTileData[] = [
  {
    label: 'Cost per unit vs. baseline',
    value: '$18.40',
    delta: '-23.7% vs. baseline',
    isGood: true,
    sparkline: [24.1, 22.3, 19.8, 18.4],
  },
  {
    label: 'On-time delivery',
    value: '96.2%',
    delta: '+8.1 pts vs. baseline',
    isGood: true,
    sparkline: [88.1, 91.4, 94.0, 96.2],
  },
  {
    label: 'Customer NPS',
    value: '61',
    delta: '+14 pts vs. baseline',
    isGood: true,
    sparkline: [47, 52, 57, 61],
  },
];
