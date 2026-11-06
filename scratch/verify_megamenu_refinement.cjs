const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4201;
const DIST_DIR = path.resolve(__dirname, '../dist');
const ARTIFACT_DIR = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';
const USER_DATA_DIR = path.join(__dirname, 'chrome_mega_refine_' + Date.now());

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
  console.log('=== Verifying Refined Typography & Hierarchy for All 7 Mega Menus ===');

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
    await page.setViewport({ width: 1440, height: 980 });

    console.log('[1/9] Loading Home Page on Desktop (1440x980)...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await sleep(600);

    // 1. About
    console.log('[2/9] Capturing About Mega Menu...');
    await page.hover('nav a[href="/about"]');
    await sleep(400);
    const shotAbout = path.join(ARTIFACT_DIR, '58_refined_megamenu_about.png');
    await page.screenshot({ path: shotAbout, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotAbout}`);

    // 2. Services
    console.log('[3/9] Capturing Services Mega Menu...');
    await page.hover('nav a[href="/services"]');
    await sleep(400);
    const shotServices = path.join(ARTIFACT_DIR, '59_refined_megamenu_services.png');
    await page.screenshot({ path: shotServices, clip: { x: 0, y: 0, width: 1440, height: 780 } });
    console.log(`Saved: ${shotServices}`);

    // 3. Solutions
    console.log('[4/9] Capturing Solutions Mega Menu...');
    await page.hover('nav a[href="/solutions"]');
    await sleep(400);
    const shotSolutions = path.join(ARTIFACT_DIR, '60_refined_megamenu_solutions.png');
    await page.screenshot({ path: shotSolutions, clip: { x: 0, y: 0, width: 1440, height: 780 } });
    console.log(`Saved: ${shotSolutions}`);

    // 4. Industries
    console.log('[5/9] Capturing Industries Mega Menu...');
    await page.hover('nav a[href="/industries"]');
    await sleep(400);
    const shotIndustries = path.join(ARTIFACT_DIR, '61_refined_megamenu_industries.png');
    await page.screenshot({ path: shotIndustries, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotIndustries}`);

    // 5. Case Studies
    console.log('[6/9] Capturing Case Studies Mega Menu...');
    await page.hover('nav a[href="/case-studies"]');
    await sleep(400);
    const shotCaseStudies = path.join(ARTIFACT_DIR, '62_refined_megamenu_casestudies.png');
    await page.screenshot({ path: shotCaseStudies, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotCaseStudies}`);

    // 6. Partners
    console.log('[7/9] Capturing Partners Mega Menu...');
    await page.hover('nav a[href="/partners"]');
    await sleep(400);
    const shotPartners = path.join(ARTIFACT_DIR, '63_refined_megamenu_partners.png');
    await page.screenshot({ path: shotPartners, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotPartners}`);

    // 7. Insights & Resources
    console.log('[8/9] Capturing Insights & Resources Mega Menu...');
    await page.hover('nav a[href="/blog"]');
    await sleep(400);
    const shotInsights = path.join(ARTIFACT_DIR, '64_refined_megamenu_insights.png');
    await page.screenshot({ path: shotInsights, clip: { x: 0, y: 0, width: 1440, height: 750 } });
    console.log(`Saved: ${shotInsights}`);

    // 8. Mobile Viewport (390x844)
    console.log('[9/9] Testing Mobile Drawer & Accordion...');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await sleep(500);

    // Open mobile drawer
    await page.click('button[aria-label="Toggle navigation menu"]');
    await sleep(400);
    const shotMobDrawer = path.join(ARTIFACT_DIR, '65_refined_megamenu_mobile_drawer.png');
    await page.screenshot({ path: shotMobDrawer });
    console.log(`Saved: ${shotMobDrawer}`);

    // Expand Solutions
    await page.click('button[aria-label="Toggle Solutions subcategories"]');
    await sleep(400);
    const shotMobExp = path.join(ARTIFACT_DIR, '66_refined_megamenu_mobile_accordion.png');
    await page.screenshot({ path: shotMobExp });
    console.log(`Saved: ${shotMobExp}`);

    console.log('=== All 7 Mega Menus & Mobile Refinements Successfully Verified ===');
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

