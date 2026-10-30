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

const PORT = 4179;
server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';

  let browser;
  try {
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-footer-'));
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tempUserDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // 1. Header screenshot
    await page.screenshot({
      path: path.join(artifactDir, 'header_logo_updated.png'),
      clip: { x: 0, y: 0, width: 1440, height: 120 }
    });
    console.log('Saved header_logo_updated.png');

    // 2. Footer screenshot
    const footerElem = await page.$('footer');
    if (footerElem) {
      const box = await footerElem.boundingBox();
      await page.screenshot({
        path: path.join(artifactDir, 'footer_logo_updated.png'),
        clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: box.height }
      });
      console.log('Saved footer_logo_updated.png');
    }

    // 3. Full page contact screenshot
    await page.screenshot({
      path: path.join(artifactDir, 'contact_with_new_logo_and_footer.png'),
      fullPage: true
    });
    console.log('Saved contact_with_new_logo_and_footer.png');

  } catch (err) {
    console.error('Puppeteer verification failed:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    console.log('Verification finished, server closed.');
  }
});

