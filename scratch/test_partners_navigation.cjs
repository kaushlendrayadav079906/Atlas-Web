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

const PORT = 4242;
const outputDir = path.resolve(__dirname, '..', 'partners_verified');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-partner-test-'));

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
      console.log('\n--- 1. Testing Partners Listing Page ---');
      await page.goto(`http://localhost:${PORT}/partners`, { waitUntil: 'networkidle0' });
      await page.screenshot({ path: path.join(outputDir, '00_partners_listing.png') });
      console.log('Partners listing page loaded successfully.');

      // 4 Partners to test
      const partners = [
        {
          name: 'SAP Business One',
          route: '/partners/sap-business-one',
          titleSnippet: 'Comprehensive ERP for Agile'
        },
        {
          name: 'Boyum IT',
          route: '/partners/boyum-it',
          titleSnippet: 'Extend SAP Business One'
        },
        {
          name: 'UiPath',
          route: '/partners/uipath',
          titleSnippet: 'Transform Operations with Enterprise RPA'
        },
        {
          name: 'ATLAS Technology & Add-ons',
          route: '/partners/atlas-solutions',
          titleSnippet: 'Industry-Specific Proprietary Add-on Suite'
        }
      ];

      for (const partner of partners) {
        console.log(`\nTesting navigation to ${partner.name} (${partner.route}) from listing ...`);
        await page.goto(`http://localhost:${PORT}/partners`, { waitUntil: 'networkidle0' });

        // Find the link to this route
        const link = await page.$(`a[href="${partner.route}"]`);
        if (!link) throw new Error(`Could not find link with href="${partner.route}" on /partners`);

        await link.click();
        await page.waitForFunction((r) => window.location.pathname === r, {}, partner.route);

        const currentUrl = page.url();
        console.log(`Arrived at: ${currentUrl}`);
        if (!currentUrl.includes(partner.route)) {
          throw new Error(`Expected URL ${partner.route}, but got ${currentUrl}`);
        }

        // Verify NO modal popup overlay is visible
        const modalOverlay = await page.$('.fixed.inset-0.bg-slate-900\\/60');
        if (modalOverlay) {
          throw new Error('Unexpected modal overlay detected!');
        }

        // Verify page content has the heading
        const headingText = await page.$eval('h1', el => el.textContent);
        console.log(`Page H1: "${headingText.trim().replace(/\s+/g, ' ')}"`);
        if (!headingText.includes(partner.titleSnippet)) {
          throw new Error(`Heading does not match snippet "${partner.titleSnippet}"`);
        }

        // Verify breadcrumb exists
        const breadcrumbs = await page.$eval('nav[aria-label="Breadcrumb"]', el => el.textContent);
        console.log(`Breadcrumbs: "${breadcrumbs.trim().replace(/\s+/g, ' ')}"`);

        const fileSafe = partner.route.replace(/[\/]/g, '_');
        await page.screenshot({ path: path.join(outputDir, `partner${fileSafe}.png`) });
      }

      // Test Direct URL Access and Refresh on /partners/boyum-it
      console.log('\nTesting direct URL access & refresh on /partners/boyum-it ...');
      await page.goto(`http://localhost:${PORT}/partners/boyum-it`, { waitUntil: 'networkidle0' });
      await page.reload({ waitUntil: 'networkidle0' });
      console.log(`Refreshed successfully at: ${page.url()}`);

      // Test Direct URL Access and Refresh on /partners/atlas-solutions
      console.log('\nTesting direct URL access & refresh on /partners/atlas-solutions ...');
      await page.goto(`http://localhost:${PORT}/partners/atlas-solutions`, { waitUntil: 'networkidle0' });
      await page.reload({ waitUntil: 'networkidle0' });
      console.log(`Refreshed successfully at: ${page.url()}`);

      // Test Browser History Navigation (Back & Forward)
      console.log('\nTesting browser back and forward navigation ...');
      await page.goto(`http://localhost:${PORT}/partners`, { waitUntil: 'networkidle0' });
      await page.goto(`http://localhost:${PORT}/partners/uipath`, { waitUntil: 'networkidle0' });
      await page.goBack({ waitUntil: 'networkidle0' });
      console.log(`After goBack: ${page.url()}`);
      if (page.url() !== `http://localhost:${PORT}/partners`) {
        throw new Error(`Expected /partners after goBack, got ${page.url()}`);
      }

      await page.goForward({ waitUntil: 'networkidle0' });
      console.log(`After goForward: ${page.url()}`);
      if (page.url() !== `http://localhost:${PORT}/partners/uipath`) {
        throw new Error(`Expected /partners/uipath after goForward, got ${page.url()}`);
      }

      // Test Back to Partners link click
      console.log('\nTesting "Back to All Partners" click ...');
      const backLink = await page.$('a[href="/partners"]');
      if (backLink) {
        await backLink.click();
        await page.waitForFunction(() => window.location.pathname === '/partners');
        console.log(`Navigated via back link back to: ${page.url()}`);
      }

      console.log('\n--- ALL PARTNERS NAVIGATION TESTS PASSED SUCCESSFULLY! ---');
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

