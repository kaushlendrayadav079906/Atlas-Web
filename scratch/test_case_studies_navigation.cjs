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

const PORT = 4238;
const outputDir = path.resolve(__dirname, '..', 'case_studies_verified');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-cs-test-'));

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
      console.log('\n--- 1. Testing Case Studies Listing Page ---');
      await page.goto(`http://localhost:${PORT}/case-studies`, { waitUntil: 'networkidle0' });
      await page.screenshot({ path: path.join(outputDir, '00_case_studies_listing.png') });
      console.log('Listing page loaded.');

      // 4 Case Studies to test
      const studies = [
        {
          name: 'Warehouse Management',
          route: '/case-studies/warehouse-management',
          titleSnippet: 'Warehouse Management for'
        },
        {
          name: 'Trading Operations',
          route: '/case-studies/trading-operations',
          titleSnippet: 'Unified System for'
        },
        {
          name: 'Inventory Visibility',
          route: '/case-studies/inventory-visibility',
          titleSnippet: 'Improved Inventory Visibility'
        },
        {
          name: 'Business Process Automation',
          route: '/case-studies/business-process-automation',
          titleSnippet: 'Automating Manual Business'
        }
      ];

      for (const cs of studies) {
        console.log(`\nTesting navigation to ${cs.name} (${cs.route}) from listing ...`);
        await page.goto(`http://localhost:${PORT}/case-studies`, { waitUntil: 'networkidle0' });

        // Find the link to this route
        const link = await page.$(`a[href="${cs.route}"]`);
        if (!link) throw new Error(`Could not find link with href="${cs.route}" on /case-studies`);

        await link.click();
        await page.waitForFunction((r) => window.location.pathname === r, {}, cs.route);

        const currentUrl = page.url();
        console.log(`Arrived at: ${currentUrl}`);
        if (!currentUrl.includes(cs.route)) {
          throw new Error(`Expected URL ${cs.route}, but got ${currentUrl}`);
        }

        // Verify no modal overlay is visible
        const modalOverlay = await page.$('.fixed.inset-0.bg-slate-900\\/60');
        if (modalOverlay) {
          throw new Error('Unexpected modal overlay detected!');
        }

        // Verify page content has the heading
        const headingText = await page.$eval('h1', el => el.textContent);
        console.log(`Page H1: "${headingText.trim().replace(/\s+/g, ' ')}"`);
        if (!headingText.includes(cs.titleSnippet)) {
          throw new Error(`Heading does not match snippet "${cs.titleSnippet}"`);
        }

        // Verify breadcrumb exists
        const breadcrumbs = await page.$eval('nav', el => el.textContent);
        console.log(`Breadcrumbs: "${breadcrumbs.trim().replace(/\s+/g, ' ')}"`);

        const fileSafe = cs.route.replace(/[\/]/g, '_');
        await page.screenshot({ path: path.join(outputDir, `cs${fileSafe}.png`) });
      }

      // Test Direct URL Access and Refresh
      console.log('\nTesting direct URL access & refresh on /case-studies/warehouse-management ...');
      await page.goto(`http://localhost:${PORT}/case-studies/warehouse-management`, { waitUntil: 'networkidle0' });
      await page.reload({ waitUntil: 'networkidle0' });
      console.log(`Refreshed successfully at: ${page.url()}`);

      // Test Browser History Navigation (Back & Forward)
      console.log('\nTesting browser back and forward navigation ...');
      await page.goto(`http://localhost:${PORT}/case-studies`, { waitUntil: 'networkidle0' });
      await page.goto(`http://localhost:${PORT}/case-studies/business-process-automation`, { waitUntil: 'networkidle0' });
      await page.goBack({ waitUntil: 'networkidle0' });
      console.log(`After goBack: ${page.url()}`);
      if (page.url() !== `http://localhost:${PORT}/case-studies`) {
        throw new Error(`Expected /case-studies after goBack, got ${page.url()}`);
      }

      await page.goForward({ waitUntil: 'networkidle0' });
      console.log(`After goForward: ${page.url()}`);
      if (page.url() !== `http://localhost:${PORT}/case-studies/business-process-automation`) {
        throw new Error(`Expected /case-studies/business-process-automation after goForward, got ${page.url()}`);
      }

      // Test Breadcrumb link back to Case Studies
      console.log('\nTesting breadcrumb click back to /case-studies ...');
      const csBreadcrumbLink = await page.$('nav a[href="/case-studies"]');
      if (csBreadcrumbLink) {
        await csBreadcrumbLink.click();
        await page.waitForFunction(() => window.location.pathname === '/case-studies');
        console.log(`Navigated via breadcrumb back to: ${page.url()}`);
      }

      console.log('\n--- ALL CASE STUDIES NAVIGATION TESTS PASSED SUCCESSFULLY! ---');
      console.log(`Console Errors: ${errors.length}, Failed Asset Requests: ${failedRequests.length}`);

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

