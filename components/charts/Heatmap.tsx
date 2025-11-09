'use client';
import React, { useEffect, useRef } from 'react';
import type { DataPoint } from '@/lib/dataGenerator';

function colorFor(v:number){
  const t = Math.max(0, Math.min(1, v));
  const r = Math.floor(6 + (30 * (1-t)));
  const g = Math.floor(60 + (180 * t));
  const b = Math.floor(120 + (100 * t));
  return [r,g,b];
}

export default function Heatmap({ data, width=1000, height=160 }: { data: DataPoint[]; width?: number; height?: number }) {
  const ref = useRef<HTMLCanvasElement|null>(null);
  useEffect(()=> {
    const canvas = ref.current; if(!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const DPR = 1;
    canvas.width = width*DPR; canvas.height = height*DPR;
    canvas.style.width = width+'px'; canvas.style.height = height+'px';
    ctx.scale(DPR,DPR);
    ctx.clearRect(0,0,width,height);
    if (!data.length) return;
    const bins = 200;
    const arr = new Float32Array(bins);
    const pts = data.slice(-20000);
    const minT = pts[0].timestamp, maxT = pts[pts.length-1].timestamp;
    for (const p of pts){
      const x = Math.floor(((p.timestamp - minT)/(maxT - minT || 1)) * (bins-1));
      arr[x] = arr[x] + 1;
    }
    const mx = Math.max(...arr);
    for (let i=0;i<bins;i++){
      const v = arr[i]/(mx||1);
      const [r,g,b] = colorFor(v);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      const x = Math.floor(i * (width/bins));
      ctx.fillRect(x,0, Math.ceil(width/bins), height);
    }
  }, [data, width, height]);
  return <canvas ref={ref} className="rounded" />;
}
