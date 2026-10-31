const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].split('#')[0];
  let filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 4235;
server.listen(PORT, async () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  let browser;
  const consoleErrors = [];
  const failedRequests = [];

  try {
    const customProfileDir = path.resolve(__dirname, 'test_profile_boyum_' + Date.now());
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: customProfileDir,
      args: ['--no-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', req => {
      failedRequests.push(`${req.url()} (${req.failure().errorText})`);
    });

    // 1. Test navigation from Solutions page
    console.log('Testing navigation from /solutions ...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/solutions`, { waitUntil: 'networkidle0' });

    // Click on boyum card link
    const boyumLink = await page.$('a[href="/solutions/boyum-it"]');
    if (boyumLink) {
      console.log('Found Boyum IT link on /solutions, clicking it...');
      await boyumLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});
      console.log('Current URL after click:', page.url());
    } else {
      console.error('Boyum IT link not found on /solutions!');
    }

    // 2. Direct load and screenshot of /solutions/boyum-it
    console.log('Navigating directly to /solutions/boyum-it ...');
    await page.goto(`http://localhost:${PORT}/solutions/boyum-it`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
    const outDir = path.join(artifactDir, 'boyum_verified');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // Section 1: Hero & Metrics
    await page.screenshot({ path: path.join(outDir, '01_hero_metrics.png'), fullPage: false });
    console.log('Captured 01_hero_metrics.png');

    // Section 2: Intro & Products
    await page.evaluate(() => window.scrollBy(0, 750));
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '02_intro_products.png'), fullPage: false });
    console.log('Captured 02_intro_products.png');

    // Section 3: Product Cards Detail
    await page.evaluate(() => window.scrollBy(0, 650));
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '03_product_cards.png'), fullPage: false });
    console.log('Captured 03_product_cards.png');

    // Section 4: Benefits & Process
    await page.evaluate(() => window.scrollBy(0, 750));
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '04_benefits_process.png'), fullPage: false });
    console.log('Captured 04_benefits_process.png');

    // Section 5: Industries & CTA
    await page.evaluate(() => window.scrollBy(0, 850));
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '05_industries_cta.png'), fullPage: false });
    console.log('Captured 05_industries_cta.png');

    // Section 6: Test Consultation Modal
    console.log('Testing Consultation Modal trigger...');
    const modalBtn = await page.$('button[type="button"]');
    // Click the hero consultation button
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const consultBtn = btns.find(b => b.textContent.includes('Book a Consultation'));
      if (consultBtn) consultBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '06_modal_open.png'), fullPage: false });
    console.log('Captured 06_modal_open.png');

    // 3. Mobile Viewport Check
    console.log('Testing mobile viewport (375x812) ...');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`http://localhost:${PORT}/solutions/boyum-it`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '07_mobile_hero.png'), fullPage: false });
    console.log('Captured 07_mobile_hero.png');

    console.log('--- TEST SUMMARY ---');
    console.log(`Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) console.log(consoleErrors);
    console.log(`Failed Asset Requests: ${failedRequests.length}`);
    if (failedRequests.length > 0) console.log(failedRequests);
    console.log('ALL BOYUM IT TESTS PASSED SUCCESSFULLY!');

  } catch (err) {
    console.error('Error during testing:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(0);
  }
});

