const next = require('next');
const http = require('http');

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res));
  server.listen(port, () => {
    console.warn(`Server listening on http://localhost:${port}`);
  });
});
