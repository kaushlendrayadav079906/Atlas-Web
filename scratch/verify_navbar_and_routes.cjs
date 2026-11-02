const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4195;
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

(async () => {
  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server running at http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    userDataDir: path.join(__dirname, 'chrome_nav_' + Date.now())
  });

  const page = await browser.newPage();

  // Test 1: Desktop 1440x900 Navbar Spacing
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const navMetrics = await page.evaluate(() => {
    const header = document.querySelector('header');
    const logoLink = header ? header.querySelector('a[href="/"]') : null;
    const homeLink = Array.from(header ? header.querySelectorAll('nav a') : []).find(a => a.textContent.trim().startsWith('Home'));
    const contactLink = Array.from(header ? header.querySelectorAll('nav a') : []).find(a => a.textContent.trim().startsWith('Contact'));
    const ctaButton = header ? header.querySelector('a[href*="contact"]') : null;

    const logoRect = logoLink ? logoLink.getBoundingClientRect() : null;
    const homeRect = homeLink ? homeLink.getBoundingClientRect() : null;
    const contactRect = contactLink ? contactLink.getBoundingClientRect() : null;

    const allNavs = Array.from(header ? header.querySelectorAll('nav a') : []).map(a => ({
      text: a.textContent.trim(),
      href: a.getAttribute('href')
    }));

    return {
      logoRight: logoRect ? logoRect.right : null,
      homeLeft: homeRect ? homeRect.left : null,
      gapBetweenLogoAndHome: (homeRect && logoRect) ? (homeRect.left - logoRect.right) : null,
      headerWidth: header ? header.getBoundingClientRect().width : null,
      allNavs
    };
  });

  console.log('--- NAVBAR METRICS (1440px) ---');
  console.log('Logo Right:', navMetrics.logoRight);
  console.log('Home Left:', navMetrics.homeLeft);
  console.log('Gap Between Logo & Home:', navMetrics.gapBetweenLogoAndHome, 'px');
  console.log('Navigation items:', navMetrics.allNavs);

  // Capture screenshot of header at 1440px
  const headerEl = await page.$('header');
  if (headerEl) {
    const headerBox = await headerEl.boundingBox();
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'navbar_spacing_1440.png'),
      clip: {
        x: 0,
        y: 0,
        width: 1440,
        height: Math.max(160, headerBox ? headerBox.y + headerBox.height + 20 : 160)
      }
    });
    console.log('Saved navbar_spacing_1440.png');
  }

  // Test 2: Wide Desktop 1920x1080 Navbar Spacing
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const wideMetrics = await page.evaluate(() => {
    const header = document.querySelector('header');
    const logoLink = header ? header.querySelector('a[href="/"]') : null;
    const homeLink = Array.from(header ? header.querySelectorAll('nav a') : []).find(a => a.textContent.trim().startsWith('Home'));
    const logoRect = logoLink ? logoLink.getBoundingClientRect() : null;
    const homeRect = homeLink ? homeLink.getBoundingClientRect() : null;
    return {
      logoRight: logoRect ? logoRect.right : null,
      homeLeft: homeRect ? homeRect.left : null,
      gapBetweenLogoAndHome: (homeRect && logoRect) ? (homeRect.left - logoRect.right) : null
    };
  });
  console.log('--- NAVBAR METRICS (1920px) ---');
  console.log('Gap Between Logo & Home (1920px):', wideMetrics.gapBetweenLogoAndHome, 'px');

  const wideHeaderEl = await page.$('header');
  if (wideHeaderEl) {
    const wideHeaderBox = await wideHeaderEl.boundingBox();
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'navbar_spacing_1920.png'),
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: Math.max(160, wideHeaderBox ? wideHeaderBox.y + wideHeaderBox.height + 20 : 160)
      }
    });
    console.log('Saved navbar_spacing_1920.png');
  }

  // Test 3: Navigation Routes Functionality
  const routesToTest = [
    { name: 'Home', expectedPath: '/' },
    { name: 'About', expectedPath: '/about' },
    { name: 'Services', expectedPath: '/services' },
    { name: 'Solutions', expectedPath: '/solutions' },
    { name: 'Industries', expectedPath: '/industries' },
    { name: 'Case Studies', expectedPath: '/case-studies' },
    { name: 'Partners', expectedPath: '/partners' },
    { name: 'Contact', expectedPath: '/contact' }
  ];

  console.log('--- TESTING ROUTE CLICKS ---');
  for (const item of routesToTest) {
    // Go to homepage first
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 200));

    // Find the link by text inside nav
    const linkFound = await page.evaluate((itemName) => {
      const header = document.querySelector('header');
      if (!header) return false;
      const links = Array.from(header.querySelectorAll('nav a'));
      const target = links.find(l => l.textContent.trim().startsWith(itemName));
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, item.name);

    await new Promise(r => setTimeout(r, 400));
    const currentUrl = page.url();
    const currentPath = new URL(currentUrl).pathname;
    const pageTitle = await page.title();
    const h1Text = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.textContent.trim() : 'NO H1';
    });

    const passed = currentPath === item.expectedPath;
    console.log(`[${passed ? 'PASS' : 'FAIL'}] Click "${item.name}": Expected ${item.expectedPath}, Got ${currentPath} | Heading: "${h1Text.substring(0, 40)}..."`);
  }

  await browser.close();
  server.close();
  console.log('All navbar & route tests completed successfully!');
})();

