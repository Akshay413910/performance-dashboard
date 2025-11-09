'use client';
import { useEffect, useRef } from 'react';
import { useDataContext } from '@/components/providers/DataProvider';
import type { DataPoint } from '@/lib/dataGenerator';

export function useDataStream({ intervalMs = 100, batchSize = 10 } = {}) {
  const { pushPoints } = useDataContext();
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // public worker path
    const worker = new Worker('/workers/dataWorker.js');
    worker.onmessage = (ev) => pushPoints(ev.data.pts as DataPoint[]);
    worker.postMessage({ cmd: 'config', interval: intervalMs, batch: batchSize });
    workerRef.current = worker;
    return () => {
      worker.postMessage({ cmd: 'stop' });
      worker.terminate();
      workerRef.current = null;
    };
  }, [intervalMs, batchSize, pushPoints]);
}
