const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4200;
const DIST_DIR = path.resolve(__dirname, '../dist');
const USER_DATA_DIR = path.join(__dirname, 'chrome_navcheck_' + Date.now());

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('=== Checking Navigation & Routes Integrity ===');

  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      userDataDir: USER_DATA_DIR
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const testRoutes = [
      '/',
      '/about',
      '/services',
      '/services/sap-business-one',
      '/services/support-maintenance',
      '/solutions',
      '/solutions/manufacturing',
      '/solutions/warehouse-management',
      '/solutions/finance-automation',
      '/solutions/logistics-shipping',
      '/solutions/boyum-it',
      '/solutions/atlas-addons',
      '/industries',
      '/industries/manufacturing',
      '/industries/warehouse-logistics',
      '/industries/finance-administration',
      '/industries/trading-shipping',
      '/case-studies',
      '/partners',
      '/partners/sap-business-one',
      '/partners/boyum-it',
      '/partners/uipath',
      '/blog',
      '/resources/sap-guides',
      '/resources/industry-insights',
      '/resources/faqs',
      '/contact'
    ];

    let passed = 0;
    for (const route of testRoutes) {
      const res = await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 10000 });
      const status = res.status();
      const title = await page.title();
      if (status === 200) {
        passed++;
        console.log(`[PASS] ${route} -> Status 200 (Title: ${title.substring(0, 30)}...)`);
      } else {
        console.error(`[FAIL] ${route} -> Status ${status}`);
      }
    }

    console.log(`\nResults: ${passed} / ${testRoutes.length} routes verified with 200 OK.`);
    if (passed === testRoutes.length) {
      console.log('=== ALL ROUTES VERIFIED SUCCESSFULLY ===');
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('Error during route checks:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    server.close();
    try {
      fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
    } catch (e) {}
  }
}

run();

