'use client';
import { useEffect, useState } from 'react';

export function usePerformanceMonitor(){
  const [fps,setFps] = useState(0);
  const [mem,setMem] = useState<number|null>(null);
  useEffect(() => {
    let last = performance.now();
    let frames = 0;
    let raf = 0;
    function loop(now:number){
      frames++;
      const dt = now - last;
      if (dt >= 1000) { setFps(Math.round((frames*1000)/dt)); frames = 0; last = now; }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    const memInt = setInterval(()=> {
      if ((performance as any).memory) setMem(Math.round((performance as any).memory.usedJSHeapSize/1024/1024));
      else setMem(null);
    },1000);
    return () => { cancelAnimationFrame(raf); clearInterval(memInt); };
  }, []);
  return { fps, mem };
}
