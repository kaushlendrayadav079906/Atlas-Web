const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 4192;
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

async function capture() {
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const PORT = server.address().port;
  console.log(`Server running at http://localhost:${PORT}`);

  const tempProfile = path.resolve(__dirname, `chrome_test_${Date.now()}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempProfile,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });

  // Scroll to technology partners section
  const section = await page.$('#technology-partners-slider');
  if (section) {
    const box = await section.boundingBox();
    console.log('Section bounding box:', box);
    
    // Also scroll so services and ecosystem are both in view
    await page.evaluate(() => {
      document.querySelector('#technology-partners-slider').scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'current_ecosystem_section.png'),
      clip: {
        x: 0,
        y: Math.max(0, box.y - 120),
        width: 1440,
        height: Math.min(800, box.height + 200)
      }
    });
    console.log('Saved current_ecosystem_section.png');
  } else {
    console.log('Section #technology-partners-slider not found');
  }

  await browser.close();
  server.close();
}

capture().catch(console.error);
