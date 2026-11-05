const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4198;
const DIST_DIR = path.resolve(__dirname, '../dist');
const ARTIFACT_DIR = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';
const USER_DATA_DIR = path.join(__dirname, 'chrome_final_' + Date.now());

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
  console.log('=== Verifying Complete Removal of Dark Blue Bar & Attractive Callback Button ===');

  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Static server running at http://localhost:${PORT}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      userDataDir: USER_DATA_DIR
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('[1/4] Navigating to Home Page...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await sleep(600);

    // 1. Capture Header at scroll 0 (White navbar, NO dark bar above)
    const shot1 = path.join(ARTIFACT_DIR, '46_final_clean_header_at_top.png');
    await page.screenshot({ path: shot1, clip: { x: 0, y: 0, width: 1440, height: 160 } });
    console.log(`Saved screenshot 1: ${shot1}`);

    // 2. Scroll 350px down and capture sticky navbar
    console.log('[2/4] Scrolling down to test sticky navbar...');
    await page.evaluate(() => window.scrollTo(0, 350));
    await sleep(500);
    const shot2 = path.join(ARTIFACT_DIR, '47_final_sticky_navbar_on_scroll.png');
    await page.screenshot({ path: shot2, clip: { x: 0, y: 0, width: 1440, height: 140 } });
    console.log(`Saved screenshot 2: ${shot2}`);

    // 3. Scroll to footer and capture clean footer
    console.log('[3/4] Scrolling to bottom for clean footer...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(800);
    const shot3 = path.join(ARTIFACT_DIR, '48_final_clean_footer_no_dark_bar.png');
    await page.screenshot({ path: shot3 });
    console.log(`Saved screenshot 3: ${shot3}`);

    // 4. Test Mobile viewport
    console.log('[4/4] Testing mobile viewport...');
    await page.setViewport({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);
    const shot4 = path.join(ARTIFACT_DIR, '49_final_mobile_header.png');
    await page.screenshot({ path: shot4, clip: { x: 0, y: 0, width: 390, height: 180 } });
    console.log(`Saved screenshot 4: ${shot4}`);

    console.log('=== All visual verifications captured successfully ===');
  } catch (err) {
    console.error('Error during verification:', err);
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
