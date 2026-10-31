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
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 4242;
server.listen(PORT, async () => {
  let browser;
  try {
    const customProfileDir = path.resolve(__dirname, 'test_profile_scroll_' + Date.now());
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: customProfileDir,
      args: ['--no-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/solutions/boyum-it`, { waitUntil: 'networkidle0' });

    // Scroll to #process
    await page.evaluate(() => {
      const el = document.getElementById('process');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 400));
    const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
    const outDir = path.join(artifactDir, 'boyum_verified');
    await page.screenshot({ path: path.join(outDir, '08_process_full.png'), fullPage: false });

    // Scroll to #industries
    await page.evaluate(() => {
      const el = document.getElementById('industries');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '09_industries_full.png'), fullPage: false });

    // Scroll to #contact-cta
    await page.evaluate(() => {
      const el = document.getElementById('contact-cta');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '10_cta_footer.png'), fullPage: false });

    console.log('Scroll screenshots captured successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(0);
  }
});

