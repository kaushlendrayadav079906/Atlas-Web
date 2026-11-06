const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4199;
const DIST_DIR = path.resolve(__dirname, '../dist');
const ARTIFACT_DIR = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';
const USER_DATA_DIR = path.join(__dirname, 'chrome_mega_' + Date.now());

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
  console.log('=== Starting Mega Menu Verification ===');

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
    await page.setViewport({ width: 1440, height: 950 });

    console.log('[1/8] Loading Home Page on Desktop (1440x950)...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await sleep(600);

    // 1. Hover/Click Services
    console.log('[2/8] Opening Services Mega Menu...');
    await page.hover('nav a[href="/services"]');
    await sleep(400);
    const shotServices = path.join(ARTIFACT_DIR, '50_megamenu_services_desktop.png');
    await page.screenshot({ path: shotServices, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotServices}`);

    // 2. Hover Solutions
    console.log('[3/8] Opening Solutions Mega Menu...');
    await page.hover('nav a[href="/solutions"]');
    await sleep(400);
    const shotSolutions = path.join(ARTIFACT_DIR, '51_megamenu_solutions_desktop.png');
    await page.screenshot({ path: shotSolutions, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotSolutions}`);

    // 3. Hover Industries
    console.log('[4/8] Opening Industries Mega Menu...');
    await page.hover('nav a[href="/industries"]');
    await sleep(400);
    const shotIndustries = path.join(ARTIFACT_DIR, '52_megamenu_industries_desktop.png');
    await page.screenshot({ path: shotIndustries, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotIndustries}`);

    // 4. Hover Partners
    console.log('[5/8] Opening Partners Mega Menu...');
    await page.hover('nav a[href="/partners"]');
    await sleep(400);
    const shotPartners = path.join(ARTIFACT_DIR, '53_megamenu_partners_desktop.png');
    await page.screenshot({ path: shotPartners, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotPartners}`);

    // 5. Hover Insights & Resources
    console.log('[6/8] Opening Insights & Resources Mega Menu...');
    await page.hover('nav a[href="/blog"]');
    await sleep(400);
    const shotInsights = path.join(ARTIFACT_DIR, '54_megamenu_insights_desktop.png');
    await page.screenshot({ path: shotInsights, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotInsights}`);

    // 6. Hover About
    console.log('[7/8] Opening About Mega Menu...');
    await page.hover('nav a[href="/about"]');
    await sleep(400);
    const shotAbout = path.join(ARTIFACT_DIR, '55_megamenu_about_desktop.png');
    await page.screenshot({ path: shotAbout, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotAbout}`);

    // 7. Test Outside Click / Escape key
    console.log('Testing Escape key to close...');
    await page.keyboard.press('Escape');
    await sleep(300);
    const isClosed = await page.evaluate(() => !document.querySelector('[role="region"][aria-label*="Mega Menu"]'));
    console.log(`Mega Menu closed on Escape: ${isClosed}`);

    // 8. Mobile Viewport Test (390x844)
    console.log('[8/8] Testing Mobile Navigation Drawer & Accordion...');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await sleep(500);

    // Click Hamburger
    await page.click('button[aria-label="Toggle navigation menu"]');
    await sleep(400);
    const shotMobDrawer = path.join(ARTIFACT_DIR, '56_megamenu_mobile_drawer.png');
    await page.screenshot({ path: shotMobDrawer });
    console.log(`Saved: ${shotMobDrawer}`);

    // Expand Services accordion
    await page.click('button[aria-label="Toggle Services subcategories"]');
    await sleep(400);
    const shotMobExp = path.join(ARTIFACT_DIR, '57_megamenu_mobile_expanded.png');
    await page.screenshot({ path: shotMobExp });
    console.log(`Saved: ${shotMobExp}`);

    console.log('=== All Mega Menu Visual Tests Completed Successfully ===');
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

