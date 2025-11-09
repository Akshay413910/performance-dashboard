'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { DataPoint } from '@/lib/dataGenerator';

type DataContextType = {
  data: DataPoint[];
  pushPoints: (pts: DataPoint[]) => void;
  clear: () => void;
};

const DataContext = createContext<DataContextType | null>(null);

export default function DataProvider({ children, initialData } : { children: React.ReactNode; initialData: DataPoint[] }) {
  const [data, setData] = useState<DataPoint[]>(initialData ?? []);
  const maxPointsRef = useRef(200000);

  useEffect(() => {
    const t = setInterval(() => {
      setData((d) => (d.length > maxPointsRef.current ? d.slice(d.length - maxPointsRef.current) : d));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const pushPoints = (pts: DataPoint[]) => {
    setData((prev) => {
      const combined = prev.concat(pts);
      if (combined.length > maxPointsRef.current) return combined.slice(combined.length - maxPointsRef.current);
      return combined;
    });
  };

  const clear = () => setData([]);

  return <DataContext.Provider value={{ data, pushPoints, clear }}>{children}</DataContext.Provider>;
}

export const useDataContext = () => {
  const c = useContext(DataContext);
  if (!c) throw new Error('useDataContext must be used inside DataProvider');
  return c;
};
