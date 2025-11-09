'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import type { DataPoint } from '@/lib/dataGenerator';

export default function LineChart({ data, width=920, height=300 }: { data: DataPoint[]; width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const rafRef = useRef<number|null>(null);

  const viewportData = useMemo(() => {
    const cutoff = Date.now() - 30000;
    const idx = data.findIndex(d => d.timestamp >= cutoff);
    return idx === -1 ? data : data.slice(Math.max(0, idx));
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const DPR = devicePixelRatio || 1;
    canvas.width = width * DPR; canvas.height = height * DPR;
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.scale(DPR,DPR);

    function render() {
      ctx.clearRect(0,0,width,height);
      const pts = viewportData;
      if (!pts || pts.length === 0) { rafRef.current = requestAnimationFrame(render); return; }

      const minT = pts[0].timestamp;
      const maxT = pts[pts.length-1].timestamp;
      let minV = Infinity, maxV = -Infinity;
      for (let i=0;i<pts.length;i++){ const v = pts[i].value; if (v<minV) minV=v; if(v>maxV) maxV=v; }
      if (minV===maxV){ minV -= 1; maxV += 1; }
      const plotW = width - 60, plotH = height - 50;
      const xFor = (t:number) => 40 + ((t - minT)/(maxT - minT || 1)) * plotW;
      const yFor = (v:number) => 10 + (1 - (v - minV)/(maxV - minV)) * plotH;

      const maxPoints = 5000;
      const step = Math.max(1, Math.floor(pts.length / maxPoints));

      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = '#06b6d4';
      for (let i=0;i<pts.length;i+=step){
        const p = pts[i];
        const x = xFor(p.timestamp), y = yFor(p.value);
        if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.stroke();

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [viewportData, width, height]);

  return <canvas ref={canvasRef} className="rounded" />;
}
