'use client';

import { useState } from 'react';
import { metrics, statTiles, type MetricKey } from './data';
import StatTile from './StatTile';
import MetricToggle from './MetricToggle';
import TrendChart from './TrendChart';
import RegionBarChart from './RegionBarChart';

export default function CaseStudyDashboard() {
  const [metricKey, setMetricKey] = useState<MetricKey>('cost');
  const metric = metrics[metricKey];

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">Case study</p>
          <h2 style={{ margin: 0 }}>Supply chain optimization &mdash; year 1 results</h2>
        </div>
        <MetricToggle value={metricKey} onChange={setMetricKey} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {statTiles.map((tile) => (
          <StatTile key={tile.label} {...tile} />
        ))}
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <TrendChart metric={metric} />
        <RegionBarChart metric={metric} />
      </div>
    </div>
  );
}
