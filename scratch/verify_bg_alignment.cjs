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

const PORT = 4182;
server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';

  let browser;
  try {
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-bgs-' + Date.now() + '-'));
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tempUserDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    // 1. Contact Page
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(artifactDir, 'contact_page_about_bg_aligned.png'),
      fullPage: true
    });
    console.log('Saved contact_page_about_bg_aligned.png');

    // 2. Home Page
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(artifactDir, 'home_page_about_bg_aligned.png'),
      fullPage: true
    });
    console.log('Saved home_page_about_bg_aligned.png');

    // 3. Home Page Contact Section
    const homeContact = await page.$('#contact');
    if (homeContact) {
      const box = await homeContact.boundingBox();
      await page.screenshot({
        path: path.join(artifactDir, 'home_contact_section_aligned.png'),
        clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: box.height }
      });
      console.log('Saved home_contact_section_aligned.png');
    }

  } catch (err) {
    console.error('Puppeteer verification failed:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    console.log('Verification finished, server closed.');
  }
});

