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

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error: ' + err.code);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 4195;
server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';

  let browser;
  try {
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-about-' + Date.now() + '-'));
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tempUserDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    // Navigate to About Page
    await page.goto(`http://localhost:${PORT}/about`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    // Full page screenshot
    const fullPath = path.join(artifactDir, 'about_page_complete_verified.png');
    await page.screenshot({
      path: fullPath,
      fullPage: true
    });
    console.log('Saved full-page screenshot:', fullPath);

    // Section 1: Hero
    const heroPath = path.join(artifactDir, 'about_01_hero.png');
    await page.screenshot({
      path: heroPath,
      clip: { x: 0, y: 0, width: 1440, height: 850 }
    });
    console.log('Saved hero screenshot:', heroPath);

    // Section 8: Journey Timeline
    const journeyEl = await page.$('#journey');
    if (journeyEl) {
      const box = await journeyEl.boundingBox();
      const journeyPath = path.join(artifactDir, 'about_08_journey.png');
      await page.screenshot({
        path: journeyPath,
        clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: Math.min(box.height, 900) }
      });
      console.log('Saved journey screenshot:', journeyPath);
    }

  } catch (err) {
    console.error('Puppeteer verification failed:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    console.log('Verification finished, server closed.');
  }
});

