// ram-monitor.js
const fs = require('fs');
const logFile = 'ram-log.txt';

// Очищаємо файл при кожному запуску
fs.writeFileSync(logFile, '', 'utf8');

setInterval(() => {
  const mem = process.memoryUsage();
  const log = `RAM usage:
RSS: ${mem.rss} bytes
Heap Total: ${mem.heapTotal} bytes
Heap Used: ${mem.heapUsed} bytes
External: ${mem.external} bytes
\n`;

  // Додаємо запис у файл
  fs.appendFileSync(logFile, log);

  // Виводимо в консоль для наочності
  console.warn(log);
}, 5000);
