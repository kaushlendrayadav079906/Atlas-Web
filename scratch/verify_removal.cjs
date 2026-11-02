const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4201;
const DIST_DIR = path.resolve(__dirname, '../dist');
const ARTIFACTS_DIR = 'C:/Users/A/.gemini/antigravity/brain/de38c53a-2b32-47a9-9cdb-25ce692fa608';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function createStaticServer() {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    let filePath = path.join(DIST_DIR, reqPath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch (err) {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

async function run() {
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Server running at http://localhost:${PORT}`);

  const userDataDir = path.resolve(__dirname, `chrome_verify_rem_${Date.now()}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });

  // Scroll to section #partners
  await page.evaluate(() => {
    document.querySelector('#partners').scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  const shotPath = path.join(ARTIFACTS_DIR, 'homepage_after_client_marquee_removed.png');
  await page.screenshot({ path: shotPath });
  console.log('Saved:', shotPath);

  await browser.close();
  server.close();
}

run().catch(console.error);

