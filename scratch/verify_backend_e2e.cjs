const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BACKEND_PORT = 8000;
const FRONTEND_PORT = 4198;
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

    // Proxy /api to backend
    if (reqPath.startsWith('/api')) {
      const proxyReq = http.request(
        {
          host: '127.0.0.1',
          port: BACKEND_PORT,
          path: req.url,
          method: req.method,
          headers: req.headers,
        },
        (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res);
        }
      );
      req.pipe(proxyReq);
      proxyReq.on('error', (e) => {
        res.writeHead(502);
        res.end(JSON.stringify({ error: e.message }));
      });
      return;
    }

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

async function waitForServer(url, timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const ok = await new Promise((resolve) => {
        http.get(url, (res) => resolve(res.statusCode === 200)).on('error', () => resolve(false));
      });
      if (ok) return true;
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
}

(async () => {
  console.log('1. Starting FastAPI backend...');
  const backendProc = spawn(
    'python',
    ['-u', '-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', String(BACKEND_PORT)],
    {
      cwd: path.resolve(__dirname, '../backend'),
      env: { ...process.env, PYTHONPATH: path.resolve(__dirname, '../backend') },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  );

  backendProc.stdout.on('data', (d) => process.stdout.write(`[API STDOUT] ${d}`));
  backendProc.stderr.on('data', (d) => process.stderr.write(`[API STDERR] ${d}`));

  const isUp = await waitForServer(`http://127.0.0.1:${BACKEND_PORT}/api/v1/health`);
  if (!isUp) {
    console.error('FastAPI backend failed to start in time.');
    backendProc.kill();
    process.exit(1);
  }
  console.log('FastAPI backend is healthy!');

  console.log('2. Starting frontend static server with /api proxy on port', FRONTEND_PORT);
  const frontendServer = createStaticServer();
  await new Promise((r) => frontendServer.listen(FRONTEND_PORT, r));

  console.log('3. Launching Puppeteer to test live Contact Us form...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    userDataDir: path.join(__dirname, 'chrome_e2e_' + Date.now()),
  });

  const page = await browser.newPage();
  page.on('console', (msg) => console.log('[BROWSER CONSOLE]', msg.text()));
  page.on('pageerror', (err) => console.log('[BROWSER ERR]', err.message));

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`http://127.0.0.1:${FRONTEND_PORT}/contact`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  console.log('Filling form fields...');
  await page.type('#fullName', 'Devendra Joshi');
  await page.type('#email', 'devendra.joshi@mumbai-tech.in');
  await page.type('#phone', '+91 93723 29599');
  await page.type('#companyName', 'Mumbai Tech Industries Ltd');
  await page.select('#service', 'sap-b1');
  await page.type(
    '#message',
    'We are planning an end-to-end upgrade to SAP Business One on HANA with Beas discrete manufacturing and Produmex WMS.'
  );

  console.log('Submitting form...');
  const submitButton = await page.$('form button[type="submit"]');
  if (submitButton) {
    await submitButton.click();
  }

  // Wait for response card
  await page.waitForFunction(() => {
    return document.body.innerText.includes('Thank You, Devendra Joshi!') || document.body.innerText.includes('SAP Lead:');
  }, { timeout: 6000 });

  console.log('Form submission succeeded! Verifying content...');
  const resultText = await page.evaluate(() => {
    const successCard = document.querySelector('.bg-emerald-50');
    return successCard ? successCard.innerText : 'NO SUCCESS CARD';
  });
  console.log('Success Card Text:\n', resultText);

  // Take screenshot
  const shotPath = path.join(ARTIFACTS_DIR, 'contact_form_e2e_sap_submission.png');
  await page.screenshot({ path: shotPath, fullPage: false });
  console.log('Saved screenshot:', shotPath);

  await browser.close();
  frontendServer.close();
  backendProc.kill();
  console.log('End-to-end test completed successfully!');
  process.exit(0);
})();
