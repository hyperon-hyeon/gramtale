const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json; charset=utf-8",
};

function send(res, status, type, body) {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.includes("\0")) {
    send(res, 400, "text/plain; charset=utf-8", "bad request");
    return;
  }

  const filePath = path.normalize(path.join(root, pathname));
  if (!filePath.startsWith(root)) {
    send(res, 403, "text/plain; charset=utf-8", "forbidden");
    return;
  }

  let target = filePath;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  }

  if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    if (path.extname(pathname)) {
      send(res, 404, "text/plain; charset=utf-8", "not found");
      return;
    }
    target = path.join(root, "index.html");
  }

  const type = types[path.extname(target)] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  fs.createReadStream(target).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`그램테일 웹사이트 http://127.0.0.1:${port}`);
});
