'use client';
import React, { useEffect, useRef } from 'react';
import type { DataPoint } from '@/lib/dataGenerator';

export default function ScatterPlot({ data, width=420, height=160 }: { data: DataPoint[]; width?: number; height?: number }) {
  const ref = useRef<HTMLCanvasElement|null>(null);
  useEffect(()=> {
    const canvas = ref.current; if(!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const DPR = devicePixelRatio||1;
    canvas.width = width*DPR; canvas.height = height*DPR;
    canvas.style.width = width+'px'; canvas.style.height = height+'px';
    ctx.scale(DPR,DPR);
    ctx.clearRect(0,0,width,height);
    const pts = data.slice(-2000);
    if (!pts.length) return;
    const minT = pts[0].timestamp, maxT = pts[pts.length-1].timestamp;
    let minV = Infinity, maxV = -Infinity;
    for (const p of pts) { if (p.value < minV) minV = p.value; if (p.value > maxV) maxV = p.value; }
    const xFor = (t:number) => 8 + ((t - minT)/(maxT - minT || 1))*(width - 16);
    const yFor = (v:number) => 8 + (1 - (v - minV)/(maxV - minV || 1))*(height - 16);
    ctx.fillStyle = '#f472b6';
    for (let i=0;i<pts.length;i+=3) {
      const p = pts[i];
      ctx.beginPath();
      ctx.arc(xFor(p.timestamp), yFor(p.value), 1.4, 0, Math.PI*2);
      ctx.fill();
    }
  }, [data, width, height]);
  return <canvas ref={ref} className="rounded" />;
}
