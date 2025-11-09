'use client';
import React, { useEffect, useRef } from 'react';
import type { DataPoint } from '@/lib/dataGenerator';

export default function BarChart({ data, width=420, height=160 }: { data: DataPoint[]; width?: number; height?: number }) {
  const ref = useRef<HTMLCanvasElement|null>(null);
  useEffect(()=> {
    const canvas = ref.current; if(!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const DPR = devicePixelRatio||1;
    canvas.width = width*DPR; canvas.height = height*DPR;
    canvas.style.width = width+'px'; canvas.style.height = height+'px';
    ctx.scale(DPR,DPR);
    ctx.clearRect(0,0,width,height);
    if (!data || data.length===0) return;
    const buckets: Record<string, number> = {};
    for (const d of data.slice(-5000)) buckets[d.category||'c0'] = (buckets[d.category||'c0']||0) + d.value;
    const entries = Object.entries(buckets);
    const max = Math.max(...entries.map(e=>e[1]), 1);
    const barW = (width - 20) / Math.max(1, entries.length);
    entries.forEach(([k,v], i) => {
      const h = (v/max) * (height - 30);
      const x = 10 + i*barW;
      ctx.fillStyle = '#34d399';
      ctx.fillRect(x, height - 10 - h, barW*0.7, h);
    });
  }, [data, width, height]);
  return <canvas ref={ref} className="rounded" />;
}
