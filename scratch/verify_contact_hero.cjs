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
  const port = 4215;
  await new Promise((resolve) => server.listen(port, resolve));
  console.log(`Test server running on http://127.0.0.1:${port}`);

  const userDataDir = path.join(os.tmpdir(), 'test_profile_contact_' + Date.now());
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  try {
    // 1. Desktop Test (1440x900)
    console.log('\n======================================================');
    console.log('1. DESKTOP VIEWPORT TEST (1440x900)');
    console.log('======================================================');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/contact`, { waitUntil: 'networkidle0' });

    const hero = await page.$('section');
    if (!hero) throw new Error('Hero section not found');

    const heroDetails = await page.evaluate(() => {
      const img = document.querySelector('section img');
      const h1 = document.querySelector('section h1');
      const p = document.querySelector('section p');
      const btn1 = document.querySelector('section button');
      const btn2 = document.querySelector('section a[href="#contact-form"]');

      return {
        imgSrc: img ? img.getAttribute('src') : null,
        imgAlt: img ? img.getAttribute('alt') : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        complete: img ? img.complete : false,
        h1Text: h1 ? h1.textContent.trim() : null,
        pText: p ? p.textContent.trim() : null,
        btn1Text: btn1 ? btn1.textContent.trim() : null,
        btn2Text: btn2 ? btn2.textContent.trim() : null
      };
    });

    console.log('Hero details:', heroDetails);
    if (!heroDetails.imgSrc.includes('contact_hero_consultation.jpg')) {
      throw new Error(`Expected heroImage contact_hero_consultation.jpg, got ${heroDetails.imgSrc}`);
    }
    if (!heroDetails.complete || heroDetails.naturalWidth < 800) {
      throw new Error(`Image resolution check failed! naturalWidth: ${heroDetails.naturalWidth}`);
    }
    if (!heroDetails.h1Text.includes("Let's Build Something Great Together")) {
      throw new Error(`Heading text mismatch: ${heroDetails.h1Text}`);
    }
    console.log(`PASS 1: Hero image verified: ${heroDetails.naturalWidth}x${heroDetails.naturalHeight}px HD (>=800px)!`);

    // Screenshot Desktop
    await hero.screenshot({ path: path.join(artifactDir, 'contact_hero_desktop_1440.png') });
    console.log('Saved contact_hero_desktop_1440.png');

    // 2. Tablet / Laptop Test (1024x768) - Matching user reference screenshot
    console.log('\n======================================================');
    console.log('2. TABLET / LAPTOP VIEWPORT TEST (1024x768 - USER REFERENCE)');
    console.log('======================================================');
    await page.setViewport({ width: 1024, height: 768 });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 400)));

    const tabletHero = await page.$('section');
    await tabletHero.screenshot({ path: path.join(artifactDir, 'contact_hero_tablet_1024.png') });
    console.log('Saved contact_hero_tablet_1024.png');

    // 3. Mobile Test (375x812)
    console.log('\n======================================================');
    console.log('3. MOBILE VIEWPORT TEST (375x812)');
    console.log('======================================================');
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 400)));

    const mobileHero = await page.$('section');
    await mobileHero.screenshot({ path: path.join(artifactDir, 'contact_hero_mobile_375.png') });
    console.log('Saved contact_hero_mobile_375.png');

    // 4. Test Book a Consultation Modal Button
    console.log('\n======================================================');
    console.log('4. MODAL BUTTON INTERACTION TEST');
    console.log('======================================================');
    await page.setViewport({ width: 1440, height: 900 });
    const modalBtn = await page.$('section button');
    await modalBtn.click();
    await page.evaluate(() => new Promise((r) => setTimeout(r, 400)));

    const isModalOpen = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]') || document.querySelector('.fixed.inset-0');
      return !!modal;
    });
    console.log('Modal opened successfully:', isModalOpen);
    if (!isModalOpen) throw new Error('Consultation modal did not open upon clicking button');
    console.log('PASS 2: Book a Consultation modal opens properly!');

    // 5. Console Error Verification
    console.log('\n======================================================');
    console.log('5. CONSOLE ERROR AUDIT');
    console.log('======================================================');
    console.log('Total console errors:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      throw new Error(`Console errors detected: ${consoleErrors.join(', ')}`);
    }
    console.log('PASS 3: Zero console errors!');

    console.log('\n======================================================');
    console.log('ALL CONTACT HERO VERIFICATION TESTS PASSED WITH 100% SUCCESS!');
    console.log('======================================================');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});

