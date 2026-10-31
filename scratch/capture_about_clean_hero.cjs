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
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

async function run() {
  const port = 4210;
  await new Promise((resolve) => server.listen(port, resolve));
  console.log(`Test server running on http://127.0.0.1:${port}`);

  const userDataDir = path.join(os.tmpdir(), 'test_profile_about_' + Date.now());
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';

  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/about`, { waitUntil: 'networkidle0' });

    // Verify no SVG contour lines exist in section 1
    const linesExist = await page.evaluate(() => {
      const hero = document.querySelector('section');
      const svgs = hero.querySelectorAll('svg');
      return Array.from(svgs).some(s => s.getAttribute('viewBox') === '0 0 1440 600' || s.innerHTML.includes('1540,100'));
    });

    console.log('Background wave lines present:', linesExist);
    if (linesExist) throw new Error('Lines are still present!');
    console.log('PASS: The 3 background contour lines have been completely removed!');

    // Capture screenshot of hero section
    const heroSection = await page.$('section');
    if (heroSection) {
      await heroSection.screenshot({ path: path.join(artifactDir, 'about_hero_clean_no_lines.png') });
      console.log('Saved about_hero_clean_no_lines.png');
    }
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

