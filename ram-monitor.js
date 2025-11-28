const fs = require('fs');
const logFile = 'ram-log.txt';

fs.writeFileSync(logFile, '', 'utf8');

setInterval(() => {
  const mem = process.memoryUsage();
  const log = `RAM usage:
RSS: ${mem.rss} bytes
Heap Total: ${mem.heapTotal} bytes
Heap Used: ${mem.heapUsed} bytes
External: ${mem.external} bytes
\n`;

  fs.appendFileSync(logFile, log);

  console.warn(log);
}, 5000);
