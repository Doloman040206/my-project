const fs = require('fs');
const inspector = require('inspector');
const session = new inspector.Session();
session.connect();

const logFile = 'ram-log.txt';
fs.writeFileSync(logFile, '', 'utf8');

const intervalMs = 5000;
let counter = 0;

const bufferTracker = { total: 0, byCaller: {} };
function recordBuf(n) {
  bufferTracker.total += n;
  const stack = new Error().stack || '';
  const lines = stack.split('\n').map((l) => l.trim());
  const caller = lines[2] ? lines[2].replace(/^at\s+/, '') : 'unknown';
  bufferTracker.byCaller[caller] = (bufferTracker.byCaller[caller] || 0) + n;
}
const _BufFrom = Buffer.from;
const _BufAlloc = Buffer.alloc;
const _BufAllocUnsafe = Buffer.allocUnsafe;
Buffer.from = function (...a) {
  const b = _BufFrom.apply(Buffer, a);
  try {
    recordBuf(b.length);
  } catch {}
  return b;
};
Buffer.alloc = function (size, ...a) {
  const b = _BufAlloc.apply(Buffer, [size, ...a]);
  try {
    recordBuf(size);
  } catch {}
  return b;
};
Buffer.allocUnsafe = function (size, ...a) {
  const b = _BufAllocUnsafe.apply(Buffer, [size, ...a]);
  try {
    recordBuf(size);
  } catch {}
  return b;
};

async function takeHeapSnapshotOnce() {
  return new Promise((resolve, reject) => {
    const fname = `heap-${Date.now()}.heapsnapshot`;
    const ws = fs.createWriteStream(fname);
    session.post('HeapProfiler.takeHeapSnapshot', null, (err) => {
      if (err) {
        ws.end();
        reject(err);
      }
    });
    session.on('HeapProfiler.addHeapSnapshotChunk', (m) => ws.write(m.params.chunk));
    session.once('HeapProfiler.heapSnapshotFinished', () => {
      ws.end();
      resolve(fname);
    });
    setTimeout(() => {
      if (!ws.closed) {
        ws.end();
        resolve(fname);
      }
    }, 15000);
  });
}

function toMB(n) {
  return (n / 1024 / 1024).toFixed(2);
}
function pct(part, total) {
  return total ? ((part / total) * 100).toFixed(2) + '%' : '0.00%';
}

setInterval(async () => {
  counter++;
  if (global.gc)
    try {
      global.gc();
    } catch (e) {} // optional

  const mem = process.memoryUsage();
  // v8 heap stats if available
  let v8stats = null;
  try {
    v8stats = require('v8').getHeapStatistics();
  } catch (_) {}

  const rss = mem.rss;
  let report = `\n=== RAM snapshot #${counter} ===\nTime: ${new Date().toISOString()}\n`;
  report += `RSS: ${mem.rss} bytes (${toMB(mem.rss)} MB)\n`;
  report += `Heap Total: ${mem.heapTotal} bytes (${toMB(mem.heapTotal)} MB) — ${pct(mem.heapTotal, rss)} of RSS\n`;
  report += `Heap Used: ${mem.heapUsed} bytes (${toMB(mem.heapUsed)} MB) — ${pct(mem.heapUsed, rss)} of RSS\n`;
  report += `External: ${mem.external} bytes (${toMB(mem.external)} MB) — ${pct(mem.external, rss)} of RSS\n`;
  if (mem.arrayBuffers !== undefined) {
    report += `ArrayBuffers: ${mem.arrayBuffers} bytes (${toMB(mem.arrayBuffers)} MB) — ${pct(mem.arrayBuffers, rss)} of RSS\n`;
  }
  if (v8stats) {
    report += `\nV8 stats (from require('v8').getHeapStatistics()):\n  total_heap_size: ${toMB(v8stats.total_heap_size)} MB\n  total_available_size: ${toMB(v8stats.total_available_size)} MB\n  used_heap_size: ${toMB(v8stats.used_heap_size)} MB\n`;
  }

  report += `\n-- Buffer (tracked external allocations) --\nTotal tracked Buffer bytes: ${bufferTracker.total} (${toMB(bufferTracker.total)} MB)\nTop callers:\n`;
  const top = Object.entries(bufferTracker.byCaller)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  if (top.length === 0) report += '  (no Buffer allocations recorded yet)\n';
  else
    for (const [caller, val] of top) {
      report += `${caller} -> ${val} bytes (${toMB(val)} MB) — ${pct(val, bufferTracker.total)} of tracked Buffers\n`;
    }

  fs.appendFileSync(logFile, report);
  console.warn(report);

  if (counter % 3 === 0) {
    try {
      const f = await takeHeapSnapshotOnce();
      const s = `Heap snapshot saved: ${f} — open in Chrome DevTools (chrome://inspect) -> Memory -> Load\n`;
      fs.appendFileSync(logFile, s);
      console.warn(s);
    } catch (err) {
      const e = `Heap snapshot failed: ${err.message}\n`;
      fs.appendFileSync(logFile, e);
      console.error(e);
    }
  }
}, intervalMs);
