# PERFORMANCE Report (template)

## Environment
- Browser: Chrome stable (recommended)
- Machine: developer laptop
- Build: production (npm run build + npm start)

## Benchmarks to run
1. Baseline - 10k points, interval 100ms, batch 10:
   - Target: 60 FPS desktop
2. Stress - increase batch or reduce interval to emulate 50k/100k points.

## How to measure
- Use Chrome DevTools Performance tab and the FPS meter.
- Record 30s traces for each scenario and note average FPS, memory usage (heap), and main-thread tasks.

## Techniques implemented
- Canvas rendering with rAF
- Level-of-detail sampling
- Web Worker for generation
- Sliding window and caps to avoid memory leaks

## Suggestions for improvement
- OffscreenCanvas (worker-side rendering)
- WebGL for millions of points
- Server-side downsampling for shared datasets
