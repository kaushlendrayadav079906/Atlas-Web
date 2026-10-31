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

const PORT = 4196;
server.listen(PORT, async () => {
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';

  let browser;
  try {
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-about-sections-' + Date.now() + '-'));
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tempUserDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/about`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    // Capture sections
    const sections = [
      { id: 'metrics', name: 'about_02_metrics.png' },
      { id: 'story', name: 'about_03_story.png' },
      { id: 'mission-values', name: 'about_04_mvv.png' },
      { id: 'expertise', name: 'about_05_expertise.png' },
      { id: 'industries', name: 'about_06_industries.png' },
      { id: 'why-choose', name: 'about_07_why_choose.png' },
      { id: 'contact-cta', name: 'about_09_contact_cta.png' }
    ];

    for (const sec of sections) {
      const el = await page.$('#' + sec.id);
      if (el) {
        const box = await el.boundingBox();
        await page.screenshot({
          path: path.join(artifactDir, sec.name),
          clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: box.height }
        });
        console.log('Saved', sec.name);
      }
    }

  } catch (err) {
    console.error('Section capture error:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
});

