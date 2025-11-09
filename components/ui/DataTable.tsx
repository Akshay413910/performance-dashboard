'use client';
import React, { useState } from 'react';
import type { DataPoint } from '@/lib/dataGenerator';

export default function DataTable({ data }: { data: DataPoint[] }) {
  const rowH = 30;
  const [scrollTop, setScrollTop] = useState(0);
  const totalH = data.length * rowH;
  const visibleCount = 10;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowH) - 2);
  const visible = data.slice(startIndex, startIndex + visibleCount);

  return (
    <div onScroll={(e)=> setScrollTop((e.target as HTMLDivElement).scrollTop)} style={{height: visibleCount*rowH, overflow:'auto', border:'1px solid #1f2937'}}>
      <div style={{height: totalH, position:'relative'}}>
        <div style={{position:'absolute', top: startIndex*rowH, left:0, right:0}}>
          {visible.map(d => (
            <div key={d.id} style={{height:rowH, display:'flex', gap:8, padding:'0 8px', alignItems:'center', borderBottom:'1px solid #0f172a'}}>
              <div style={{width:160}}>{new Date(d.timestamp).toLocaleTimeString()}</div>
              <div style={{flex:1}}>{d.value.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
