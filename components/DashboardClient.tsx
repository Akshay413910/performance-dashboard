'use client';
import React, { useState } from 'react';
import { useDataContext } from '@/components/providers/DataProvider';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ScatterPlot from '@/components/charts/ScatterPlot';
import Heatmap from '@/components/charts/Heatmap';
import { useDataStream } from '@/hooks/useDataStream';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import DataTable from '@/components/ui/DataTable';

export default function DashboardClient() {
  const { data, clear } = useDataContext();
  const [intervalMs, setIntervalMs] = useState(100);
  const [batchSize, setBatchSize] = useState(10);

  useDataStream({ intervalMs, batchSize });

  return (
    <div className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Performance Dashboard</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm">Interval(ms)</label>
          <input value={intervalMs} onChange={e=>setIntervalMs(Number(e.target.value))} className="w-20 px-2 py-1 rounded bg-slate-800" />
          <label className="text-sm">Batch</label>
          <input value={batchSize} onChange={e=>setBatchSize(Number(e.target.value))} className="w-16 px-2 py-1 rounded bg-slate-800" />
          <button className="ml-2 px-3 py-1 bg-cyan-500 text-slate-900 rounded" onClick={()=>clear()}>Clear</button>
        </div>
      </header>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-slate-800 p-3 rounded">
            <LineChart data={data} width={1000} height={300} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800 p-3 rounded"><BarChart data={data} /></div>
            <div className="bg-slate-800 p-3 rounded"><ScatterPlot data={data} /></div>
          </div>
        </div>

        <aside className="space-y-3">
          <PerformanceMonitor />
          <div className="bg-slate-800 p-3 rounded">
            <h3 className="font-medium mb-2">Recent Points</h3>
            <DataTable data={data} />
          </div>
        </aside>
      </section>

      <div className="bg-slate-800 p-3 rounded">
        <h3 className="font-medium mb-2">Heatmap</h3>
        <Heatmap data={data} />
      </div>
    </div>
  );
}
