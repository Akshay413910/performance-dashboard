'use client';
import React from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

export default function PerformanceMonitor(){
  const { fps, mem } = usePerformanceMonitor();
  return (
    <div className="p-3 rounded bg-slate-800 border border-slate-700">
      <h4 className="font-medium">Performance</h4>
      <div className="mt-2">FPS: <strong>{fps}</strong></div>
      <div>Memory (MB): <strong>{mem ?? 'n/a'}</strong></div>
    </div>
  );
}
