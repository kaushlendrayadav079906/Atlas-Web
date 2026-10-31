const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

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
      res.end('Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 4221;
server.listen(PORT, async () => {
  let browser;
  try {
    const customProfileDir = path.resolve(__dirname, 'test_profile_contact_' + Date.now());
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: customProfileDir,
      args: ['--no-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.scrollBy(0, 1600));
    await new Promise(r => setTimeout(r, 400));

    const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
    await page.screenshot({ path: path.join(artifactDir, 'typography_verified', 'contact_sec4.png') });
    console.log('contact_sec4.png captured!');
  } catch (e) {
    console.error(e);
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(0);
  }
});
