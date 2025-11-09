export type DataPoint = {
  id: string;
  timestamp: number;
  value: number;
  category?: string;
};

function rand(seed = 1) {
  let s = seed;
  return () => {
    s = (s * 48271) % 2147483647;
    return (s % 1000) / 1000;
  };
}

export async function generateInitialDataset(n = 10000, start = Date.now() - 60000) {
  const r = rand(Date.now() % 100000);
  const out: DataPoint[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const t = start + i * 10;
    out[i] = {
      id: `p-${i}`,
      timestamp: t,
      value: Math.sin(i / 50) * 20 + r() * 10 + 50,
      category: `c${i % 5}`,
    };
  }
  return out;
}

export function generatePoint(lastTimestamp: number) {
  return {
    id: `p-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: lastTimestamp + Math.floor(Math.random() * 100) + 50,
    value: Math.random() * 100,
    category: `c${Math.floor(Math.random() * 5)}`,
  };
}
