/**
 * Simple Web Worker that generates batches of points and posts them.
 * Hosted under /workers/dataWorker.js so it can be loaded via new Worker('/workers/dataWorker.js')
 */
let interval = 100;
let batch = 10;

function genPoint(lastTs){
  return {
    id: Math.random().toString(36).slice(2,9),
    timestamp: lastTs + Math.floor(Math.random()*100) + 50,
    value: Math.random()*100,
    category: 'c' + Math.floor(Math.random()*5)
  };
}

let lastTs = Date.now();
let timer = setInterval(()=> {
  const pts = [];
  for (let i=0;i<batch;i++){
    const p = genPoint(lastTs);
    pts.push(p);
    lastTs = p.timestamp;
  }
  postMessage({ pts });
}, interval);

onmessage = (e) => {
  if (!e || !e.data) return;
  if (e.data.cmd === 'stop') clearInterval(timer);
  if (e.data.cmd === 'config') {
    if (typeof e.data.interval === 'number') {
      interval = e.data.interval;
      clearInterval(timer);
      timer = setInterval(()=> {
        const pts = [];
        for (let i=0;i<batch;i++){
          const p = genPoint(lastTs);
          pts.push(p);
          lastTs = p.timestamp;
        }
        postMessage({ pts });
      }, interval);
    }
    if (typeof e.data.batch === 'number') batch = e.data.batch;
  }
};
