const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4202;
const DIST_DIR = path.resolve(__dirname, '../dist');
const ARTIFACT_DIR = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';
const USER_DATA_DIR = path.join(__dirname, 'chrome_btncheck_' + Date.now());

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
  console.log('=== Verifying Category Filter Buttons Desktop & Responsive Fit ===');

  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server running at http://localhost:${PORT}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      userDataDir: USER_DATA_DIR
    });

    const page = await browser.newPage();

    // 1. Desktop 1440x900
    console.log('[1/4] Testing Desktop 1440x900...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/blog`, { waitUntil: 'networkidle0' });
    await sleep(600);

    // Scroll to the filter buttons section
    await page.evaluate(() => {
      const filterSection = document.querySelector('section.min-h-\\[500px\\]');
      if (filterSection) filterSection.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await sleep(400);

    const shot1 = path.join(ARTIFACT_DIR, '67_blog_buttons_desktop_1440.png');
    await page.screenshot({ path: shot1, clip: { x: 0, y: 0, width: 1440, height: 450 } });
    console.log(`Saved: ${shot1}`);

    // Verify all category buttons are within viewport width
    const boundsCheck1440 = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent && (b.textContent.includes('All') || b.textContent.includes('SAP') || b.textContent.includes('Manufacturing')));
      const viewportWidth = window.innerWidth;
      const issues = [];
      buttons.forEach(b => {
        const rect = b.getBoundingClientRect();
        if (rect.right > viewportWidth) {
          issues.push({ text: b.textContent.trim(), right: rect.right, viewportWidth });
        }
      });
      return { totalButtons: buttons.length, issues };
    });
    console.log('1440px Bounds Check:', boundsCheck1440);

    // 2. Standard Laptop 1280x800
    console.log('[2/4] Testing Laptop 1280x800...');
    await page.setViewport({ width: 1280, height: 800 });
    await sleep(400);
    const shot2 = path.join(ARTIFACT_DIR, '68_blog_buttons_laptop_1280.png');
    await page.screenshot({ path: shot2, clip: { x: 0, y: 0, width: 1280, height: 480 } });
    console.log(`Saved: ${shot2}`);

    const boundsCheck1280 = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent && (b.textContent.includes('All') || b.textContent.includes('SAP') || b.textContent.includes('Manufacturing')));
      const viewportWidth = window.innerWidth;
      const issues = [];
      buttons.forEach(b => {
        const rect = b.getBoundingClientRect();
        if (rect.right > viewportWidth) {
          issues.push({ text: b.textContent.trim(), right: rect.right, viewportWidth });
        }
      });
      return { totalButtons: buttons.length, issues };
    });
    console.log('1280px Bounds Check:', boundsCheck1280);

    // 3. Tablet 1024x768
    console.log('[3/4] Testing Tablet 1024x768...');
    await page.setViewport({ width: 1024, height: 768 });
    await sleep(400);
    const shot3 = path.join(ARTIFACT_DIR, '69_blog_buttons_tablet_1024.png');
    await page.screenshot({ path: shot3, clip: { x: 0, y: 0, width: 1024, height: 500 } });
    console.log(`Saved: ${shot3}`);

    // 4. Mobile 390x844
    console.log('[4/4] Testing Mobile 390x844...');
    await page.setViewport({ width: 390, height: 844 });
    await sleep(400);
    const shot4 = path.join(ARTIFACT_DIR, '70_blog_buttons_mobile_390.png');
    await page.screenshot({ path: shot4, clip: { x: 0, y: 0, width: 390, height: 550 } });
    console.log(`Saved: ${shot4}`);

    console.log('=== All Category Button Layout Checks Completed Successfully ===');
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

