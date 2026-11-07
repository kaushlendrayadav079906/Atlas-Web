const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const distDir = path.resolve('dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end('Error loading file');
  }
});

const PORT = 4175;
server.listen(PORT, async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto(`http://localhost:${PORT}/services/sap-business-one`, { waitUntil: 'networkidle0' });

    const cardMeasurements = await page.evaluate(() => {
      const cards = document.querySelectorAll('#capabilities [data-card]');
      return Array.from(cards).slice(0, 3).map((card, i) => {
        const rect = card.getBoundingClientRect();
        return {
          cardIndex: i + 1,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
        };
      });
    });

    console.log('Card Measurements (Exact equal heights verification):', JSON.stringify(cardMeasurements, null, 2));

    const nextArrowRect = await page.evaluate(() => {
      const btn = document.querySelector('#capabilities button[aria-label="Next cards"]');
      if (!btn) return null;
      const rect = btn.getBoundingClientRect();
      const card3 = document.querySelectorAll('#capabilities [data-card]')[2];
      const card3Rect = card3 ? card3.getBoundingClientRect() : null;
      return {
        arrowRight: Math.round(rect.right),
        arrowLeft: Math.round(rect.left),
        card3Right: card3Rect ? Math.round(card3Rect.right) : null,
        doesOverlapCard3: card3Rect ? (rect.left < card3Rect.right && rect.right > card3Rect.left) : false
      };
    });

    console.log('Next Arrow Positioning vs Card 3:', JSON.stringify(nextArrowRect, null, 2));

    await browser.close();
  } catch (e) {
    console.error(e);
  } finally {
    server.close();
    process.exit(0);
  }
});

