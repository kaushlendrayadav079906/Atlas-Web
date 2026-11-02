const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4190;
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

async function run() {
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Server running at http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    userDataDir: path.join(__dirname, 'chrome_temp_' + Date.now()),
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Viewport (1440x900)
    await page.setViewport({ width: 1440, height: 900 });
    console.log('Navigating to homepage...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    const footerEl = await page.$('footer');
    if (footerEl) {
      const footerBox = await footerEl.boundingBox();
      if (footerBox) {
        const desktopShotPath = path.join(ARTIFACTS_DIR, 'footer_redesign_desktop.png');
        await page.screenshot({
          path: desktopShotPath,
          clip: {
            x: 0,
            y: footerBox.y,
            width: 1440,
            height: footerBox.height,
          },
        });
        console.log(`Saved desktop screenshot: ${desktopShotPath}`);
      }
    }

    // 2. Tablet Viewport (768x1024)
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    const tabletFooterEl = await page.$('footer');
    if (tabletFooterEl) {
      const tabletBox = await tabletFooterEl.boundingBox();
      if (tabletBox) {
        const tabletShotPath = path.join(ARTIFACTS_DIR, 'footer_redesign_tablet.png');
        await page.screenshot({
          path: tabletShotPath,
          clip: {
            x: 0,
            y: tabletBox.y,
            width: 768,
            height: tabletBox.height,
          },
        });
        console.log(`Saved tablet screenshot: ${tabletShotPath}`);
      }
    }

    // 3. Mobile Viewport (390x844)
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    const mobileFooterEl = await page.$('footer');
    if (mobileFooterEl) {
      const mobileBox = await mobileFooterEl.boundingBox();
      if (mobileBox) {
        const mobileShotPath = path.join(ARTIFACTS_DIR, 'footer_redesign_mobile.png');
        await page.screenshot({
          path: mobileShotPath,
          clip: {
            x: 0,
            y: mobileBox.y,
            width: 390,
            height: mobileBox.height,
          },
        });
        console.log(`Saved mobile screenshot: ${mobileShotPath}`);
      }
    }

    console.log('All footer redesign screenshots captured successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

