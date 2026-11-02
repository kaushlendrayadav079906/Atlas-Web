const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4185;
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
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to /contact...');
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    // 1. Capture Hero + Communication Channels
    const heroChannelsPath = path.join(ARTIFACTS_DIR, 'contact_new_bg_hero_channels.png');
    await page.screenshot({
      path: heroChannelsPath,
      clip: { x: 0, y: 0, width: 1440, height: 1100 },
    });
    console.log(`Saved: ${heroChannelsPath}`);

    // 2. Capture Form + Locations
    const formSection = await page.$('#contact-enquiry-form');
    if (formSection) {
      const box = await formSection.boundingBox();
      if (box) {
        const formLocationsPath = path.join(ARTIFACTS_DIR, 'contact_new_bg_form_locations.png');
        await page.screenshot({
          path: formLocationsPath,
          clip: { x: 0, y: box.y, width: 1440, height: box.height },
        });
        console.log(`Saved: ${formLocationsPath}`);
      }
    }

    console.log('Contact page screenshots captured successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

