import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('dist/client');
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif', '.mp4':'video/mp4', '.pdf':'application/pdf', '.json':'application/json', '.rsc':'text/x-component' };
const port = Number(process.env.PORT || 5175);
createServer(async (req,res) => {
  try {
    const path = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file = resolve(root, `.${path}`);
    if (file !== root && !file.startsWith(root+sep)) { res.writeHead(403).end(); return; }
    if (path.endsWith('/')) file = resolve(file,'index.html');
    else if (!extname(file)) { try { await stat(file); } catch { file += '.html'; } }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type':mime[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found'); }
}).listen(port,'localhost',()=>console.log(`Static GitHub Pages preview: http://localhost:${port}`));
