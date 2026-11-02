const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BACKEND_PORT = 8000;
const FRONTEND_PORT = 4199;
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
  console.log('Starting FastAPI backend for Consultation test...');
  const backendProc = spawn(
    'python',
    ['-u', '-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', String(BACKEND_PORT)],
    {
      cwd: path.resolve(__dirname, '../backend'),
      env: { ...process.env, PYTHONPATH: path.resolve(__dirname, '../backend') },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  );

  const isUp = await waitForServer(`http://127.0.0.1:${BACKEND_PORT}/api/v1/health`);
  if (!isUp) {
    console.error('FastAPI backend failed to start.');
    backendProc.kill();
    process.exit(1);
  }

  const frontendServer = createStaticServer();
  await new Promise((r) => frontendServer.listen(FRONTEND_PORT, r));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    userDataDir: path.join(__dirname, 'chrome_modal_' + Date.now()),
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`http://127.0.0.1:${FRONTEND_PORT}/contact`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 500));

  console.log('Clicking "Book a Consultation" hero button to open modal...');
  const heroCtaButton = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.textContent.includes('Book a Consultation'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  await new Promise((r) => setTimeout(r, 600));

  console.log('Filling Consultation Modal form...');
  await page.type('div[role="dialog"] input[name="fullName"]', 'Kavita Patel');
  await page.type('div[role="dialog"] input[name="email"]', 'kavita.patel@gujaratmfg.com');
  await page.type('div[role="dialog"] input[name="phone"]', '+91 98980 11223');
  await page.type('div[role="dialog"] input[name="companyName"]', 'Gujarat Precision Manufacturing Pvt Ltd');
  await page.select('div[role="dialog"] select[name="service"]', 'boyum-it');
  await page.type(
    'div[role="dialog"] textarea[name="message"]',
    'We require an architectural consultation on Beas Manufacturing routing, shop-floor scheduling, and Produmex WMS.'
  );

  console.log('Submitting Consultation Modal form...');
  const modalSubmitBtn = await page.$('div[role="dialog"] button[type="submit"]');
  if (modalSubmitBtn) {
    await modalSubmitBtn.click();
  }

  await page.waitForFunction(
    () => {
      return (
        document.body.innerText.includes('Consultation Request Received!') ||
        document.body.innerText.includes('Ref: ATPL-CON-')
      );
    },
    { timeout: 7000 }
  );

  console.log('Consultation confirmed in SAP! Capturing screenshot...');
  const shotPath = path.join(ARTIFACTS_DIR, 'consultation_modal_e2e_sap_submission.png');
  await page.screenshot({ path: shotPath, fullPage: false });
  console.log('Saved screenshot:', shotPath);

  await browser.close();
  frontendServer.close();
  backendProc.kill();
  console.log('Consultation E2E test passed!');
  process.exit(0);
})();

