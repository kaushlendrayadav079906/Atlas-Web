const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const artifactDir = 'C:\\Users\\A\\.gemini\\antigravity\\brain\\5b07bcd3-1b27-43b7-a312-bc3572569933';

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
  const port = 4291;
  await new Promise((resolve) => server.listen(port, resolve));
  console.log(`Server running on http://127.0.0.1:${port}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ptest_royal_'));
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tmpDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Home Page Hero & Carousel & CTA
  console.log('Capturing Home Page...');
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  // Home Hero
  const heroEl = await page.$('section');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(artifactDir, 'theme_home_hero.png') });
    console.log('Saved theme_home_hero.png');
  }

  // Home Carousel
  const successEl = await page.$('section#case-studies');
  if (successEl) {
    await successEl.screenshot({ path: path.join(artifactDir, 'theme_home_carousel.png') });
    console.log('Saved theme_home_carousel.png');
  }

  // Home CTA Banner
  const ctaEl = await page.$('section#contact');
  if (ctaEl) {
    await ctaEl.screenshot({ path: path.join(artifactDir, 'theme_home_cta.png') });
    console.log('Saved theme_home_cta.png');
  }

  // 2. About Page Hero
  console.log('Capturing About Page...');
  await page.goto(`http://127.0.0.1:${port}/about`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  const aboutHero = await page.$('section');
  if (aboutHero) {
    await aboutHero.screenshot({ path: path.join(artifactDir, 'theme_about_hero.png') });
    console.log('Saved theme_about_hero.png');
  }

  // 3. Contact Page Hero
  console.log('Capturing Contact Page...');
  await page.goto(`http://127.0.0.1:${port}/contact`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  const contactHero = await page.$('section');
  if (contactHero) {
    await contactHero.screenshot({ path: path.join(artifactDir, 'theme_contact_hero.png') });
    console.log('Saved theme_contact_hero.png');
  }

  // 4. Footer & Scroll-to-Top Button
  console.log('Capturing Footer...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'theme_footer_and_scroll.png') });
  console.log('Saved theme_footer_and_scroll.png');

  await browser.close();
  server.close();
  console.log('All screenshots verified successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
