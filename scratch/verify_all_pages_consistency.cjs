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

const PORT = 4198;
server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
  const outDir = path.join(artifactDir, 'typography_verified');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pagesToTest = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'solutions', path: '/solutions' },
    { name: 'industries', path: '/industries' },
    { name: 'case_studies', path: '/case-studies' },
    { name: 'partners', path: '/partners' },
    { name: 'contact', path: '/contact' }
  ];

  let browser;
  try {
    const customProfileDir = path.resolve(__dirname, 'test_profile_' + Date.now());
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: customProfileDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
    });

    for (const item of pagesToTest) {
      console.log(`Testing page: ${item.name} (${item.path})`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.goto(`http://localhost:${PORT}${item.path}`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 400));

      // Viewport screenshot (Hero + Header)
      const heroPath = path.join(outDir, `${item.name}_hero.png`);
      await page.screenshot({ path: heroPath, fullPage: false });

      // Scroll and capture second fold / sections
      await page.evaluate(() => window.scrollBy(0, 750));
      await new Promise(r => setTimeout(r, 300));
      const fold2Path = path.join(outDir, `${item.name}_fold2.png`);
      await page.screenshot({ path: fold2Path, fullPage: false });

      await page.close();
      console.log(`Captured ${item.name} hero and fold 2 successfully.`);
    }

    console.log('ALL PAGES CAPTURED SUCCESSFULLY!');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(0);
  }
});
