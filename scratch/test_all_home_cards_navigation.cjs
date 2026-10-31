const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

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

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 4237;
const outputDir = path.resolve(__dirname, '..', 'home_cards_verified');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-test-cards-'));

    const browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tempUserDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const errors = [];
    const failedRequests = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
        console.error('Browser Console Error:', msg.text());
      }
    });

    page.on('requestfailed', req => {
      failedRequests.push(`${req.url()} (${req.failure().errorText})`);
      console.error('Request Failed:', req.url());
    });

    try {
      console.log('\n--- 1. Testing Home Page Loading ---');
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
      await page.screenshot({ path: path.join(outputDir, '00_homepage.png') });
      console.log('Homepage loaded.');

      // Test 1: Service Cards
      const serviceTests = [
        { name: 'SAP Business One', route: '/services/sap-business-one', selector: 'a[href="/services/sap-business-one"]' },
        { name: 'Boyum IT Solutions', route: '/services/boyum-it', selector: 'a[href="/services/boyum-it"]' },
        { name: 'UiPath RPA', route: '/services/uipath-automation', selector: 'a[href="/services/uipath-automation"]' },
        { name: 'ATLAS Add-ons', route: '/services/atlas-addons', selector: 'a[href="/services/atlas-addons"]' },
      ];

      for (const st of serviceTests) {
        console.log(`\nTesting click on ${st.name} -> ${st.route} ...`);
        await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
        const link = await page.$(st.selector);
        if (!link) throw new Error(`Link not found for ${st.selector}`);
        await link.click();
        await page.waitForFunction((r) => window.location.pathname.startsWith(r), {}, st.route);
        const currentUrl = page.url();
        console.log(`Arrived at: ${currentUrl}`);
        const fileSafe = st.route.replace(/[\/]/g, '_');
        await page.screenshot({ path: path.join(outputDir, `service${fileSafe}.png`) });
      }

      // Test 2: Industry Cards
      const industryTests = [
        { name: 'Manufacturing', route: '/industries/manufacturing', selector: 'a[href="/industries/manufacturing"]' },
        { name: 'Warehouse & Logistics', route: '/industries/warehouse-logistics', selector: 'a[href="/industries/warehouse-logistics"]' },
        { name: 'Finance & Administration', route: '/industries/finance-administration', selector: 'a[href="/industries/finance-administration"]' },
        { name: 'Trading & Shipping', route: '/industries/trading-shipping', selector: 'a[href="/industries/trading-shipping"]' },
      ];

      for (const it of industryTests) {
        console.log(`\nTesting click on ${it.name} -> ${it.route} ...`);
        await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
        const link = await page.$(it.selector);
        if (!link) throw new Error(`Link not found for ${it.selector}`);
        await link.click();
        await page.waitForFunction((r) => window.location.pathname.startsWith(r), {}, it.route);
        const currentUrl = page.url();
        console.log(`Arrived at: ${currentUrl}`);
        const fileSafe = it.route.replace(/[\/]/g, '_');
        await page.screenshot({ path: path.join(outputDir, `industry${fileSafe}.png`) });
      }

      // Test 3: Other Sections
      console.log('\nTesting Our Story -> /about ...');
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
      const storyBtn = await page.$('a[href="/about"]');
      if (storyBtn) {
        await storyBtn.click();
        await page.waitForFunction(() => window.location.pathname.startsWith('/about'));
        console.log(`Arrived at: ${page.url()}`);
      }

      console.log('\nTesting Our Expertise -> /services ...');
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
      const expBtn = await page.$('a[href="/services"]');
      if (expBtn) {
        await expBtn.click();
        await page.waitForFunction(() => window.location.pathname.startsWith('/services'));
        console.log(`Arrived at: ${page.url()}`);
        await page.screenshot({ path: path.join(outputDir, 'services_overview.png') });
      }

      console.log('\nTesting Customer Success -> /case-studies ...');
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
      const csBtn = await page.$('a[href="/case-studies"]');
      if (csBtn) {
        await csBtn.click();
        await page.waitForFunction(() => window.location.pathname.startsWith('/case-studies'));
        console.log(`Arrived at: ${page.url()}`);
      }

      console.log('\nTesting Technology Partners -> /partners ...');
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
      const partBtn = await page.$('a[href="/partners"]');
      if (partBtn) {
        await partBtn.click();
        await page.waitForFunction(() => window.location.pathname.startsWith('/partners'));
        console.log(`Arrived at: ${page.url()}`);
      }

      // Test 4: Direct URL access & Refresh
      console.log('\nTesting direct URL access & refresh on /services/sap-business-one ...');
      await page.goto(`http://localhost:${PORT}/services/sap-business-one`, { waitUntil: 'networkidle0' });
      await page.reload({ waitUntil: 'networkidle0' });
      console.log(`Refreshed successfully at: ${page.url()}`);

      // Test 5: Browser Back & Forward Navigation
      console.log('\nTesting browser back and forward navigation ...');
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
      await page.goto(`http://localhost:${PORT}/services/uipath-automation`, { waitUntil: 'networkidle0' });
      await page.goBack({ waitUntil: 'networkidle0' });
      console.log(`After goBack: ${page.url()}`);
      await page.goForward({ waitUntil: 'networkidle0' });
      console.log(`After goForward: ${page.url()}`);

      console.log('\n--- ALL NAVIGATION TESTS COMPLETED SUCCESSFULLY ---');
      console.log(`Errors: ${errors.length}, Failed Requests: ${failedRequests.length}`);

    } catch (e) {
      console.error('TEST FAILED:', e);
    } finally {
      await browser.close();
      server.close();
      try {
        fs.rmSync(tempUserDataDir, { recursive: true, force: true });
      } catch (err) {}
    }
  });
}

run();
