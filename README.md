# Performance Dashboard (Next.js 14 + TypeScript)

This project is a complete, plagiarism-free implementation of the Performance-Critical Data Visualization Dashboard assignment.

## Features
- Next.js 14 App Router with Server and Client components
- Tailwind CSS for responsive UI
- Real-time simulated data using a Web Worker (public/workers/dataWorker.js)
- Canvas-based Line, Bar, Scatter, and Heatmap visualizations (no chart libraries)
- Virtualized data table for large datasets
- Performance monitor: FPS and memory
- Sliding window and LOD sampling to keep memory stable

## Quick start

1. Install dependencies:
```bash
npm install
```

2. Run dev server:
```bash
npm run dev
# open http://localhost:3000/dashboard
```

3. Production build:
```bash
npm run build
npm start
```
