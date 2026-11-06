const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end('Error loading file');
  }
});

const PORT = 4250;
const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';

server.listen(PORT, async () => {
  console.log(`Static server running on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });

    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    
    // Scroll to the footer
    const footerElement = await page.$('footer');
    if (footerElement) {
      await footerElement.scrollIntoView();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: path.join(artifactDir, '105_footer_cream_restored.png') });
      console.log('Saved 105_footer_cream_restored.png');
    }

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
    server.close();
    console.log('Verification finished');
  }
});
