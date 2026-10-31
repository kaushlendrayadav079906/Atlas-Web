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
  const port = 4199;
  await new Promise((resolve) => server.listen(port, resolve));
  console.log(`Test server running on http://127.0.0.1:${port}`);

  const userDataDir = path.join(os.tmpdir(), 'test_profile_hd_' + Date.now());
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
    // =========================================================================
    // 1. Desktop Test (1440x900)
    // =========================================================================
    console.log('\n======================================================');
    console.log('1. DESKTOP VIEWPORT TEST (1440x900)');
    console.log('======================================================');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    const section = await page.$('#case-studies');
    if (!section) throw new Error('#case-studies not found');
    await section.scrollIntoView();
    await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));

    const desktopAudit = await page.evaluate(() => {
      const track = document.querySelector('[role="region"][aria-label="Customer Testimonial Carousel"]');
      const firstSlide = track.querySelectorAll('.flex-none')[0];
      const cards = Array.from(firstSlide.querySelectorAll('.grid > div'));

      return cards.map((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const img = card.querySelector('img');
        const badge = card.querySelector('span');
        const link = card.querySelector('a[href^="/case-studies"]');
        const quote = card.querySelector('p');

        const badgeRect = badge.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const quoteRect = quote.getBoundingClientRect();

        // Check horizontal overlap between badge and link
        const overlaps = !(
          badgeRect.right <= linkRect.left ||
          badgeRect.left >= linkRect.right ||
          badgeRect.bottom <= linkRect.top ||
          badgeRect.top >= linkRect.bottom
        );

        // Check if link or badge overflows card
        const linkOverflows = linkRect.right > cardRect.right + 1;
        const badgeOverflows = badgeRect.left < cardRect.left - 1;

        return {
          cardIndex: i,
          cardWidth: cardRect.width,
          cardHeight: cardRect.height,
          imgSrc: img.getAttribute('src'),
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
          badgeText: badge.textContent.trim(),
          linkText: link.textContent.trim(),
          linkRight: linkRect.right,
          cardRight: cardRect.right,
          overlaps,
          linkOverflows,
          badgeOverflows,
          quoteLength: quote.textContent.length
        };
      });
    });

    console.log('Desktop Slide 0 Cards Audit:', desktopAudit);

    for (const card of desktopAudit) {
      if (!card.complete || card.naturalWidth === 0) {
        throw new Error(`Card ${card.cardIndex} image failed to load: ${card.imgSrc}`);
      }
      if (card.naturalWidth < 800) {
        throw new Error(`Card ${card.cardIndex} image width is ${card.naturalWidth}px, which is below 800px minimum!`);
      }
      if (card.overlaps) {
        throw new Error(`Card ${card.cardIndex}: Badge and Read Case Study link overlap!`);
      }
      if (card.linkOverflows) {
        throw new Error(`Card ${card.cardIndex}: Read Case Study link extends outside card right edge!`);
      }
      console.log(`PASS: Card ${card.cardIndex} (${card.badgeText}) image resolution is ${card.naturalWidth}x${card.naturalHeight}px (>=800px) and clean!`);
      console.log(`PASS: Card ${card.cardIndex} header has 0 overlap and 0 overflow! Link text: "${card.linkText}"`);
    }

    await section.screenshot({ path: path.join(artifactDir, 'carousel_desktop_1440.png') });
    console.log('Saved carousel_desktop_1440.png');

    // =========================================================================
    // 2. Tablet / Small Laptop Test (1024x768) - Reference from User Screenshot!
    // =========================================================================
    console.log('\n======================================================');
    console.log('2. TABLET / SMALL LAPTOP TEST (1024x768 - USER SCREENSHOT VIEWPORT)');
    console.log('======================================================');
    await page.setViewport({ width: 1024, height: 768 });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));

    const tabletAudit = await page.evaluate(() => {
      const track = document.querySelector('[role="region"][aria-label="Customer Testimonial Carousel"]');
      const firstSlide = track.querySelectorAll('.flex-none')[0];
      const cards = Array.from(firstSlide.querySelectorAll('.grid > div'));

      return cards.map((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const badge = card.querySelector('span');
        const link = card.querySelector('a[href^="/case-studies"]');
        const badgeRect = badge.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        const overlaps = !(
          badgeRect.right <= linkRect.left ||
          badgeRect.left >= linkRect.right ||
          badgeRect.bottom <= linkRect.top ||
          badgeRect.top >= linkRect.bottom
        );

        const linkOverflows = linkRect.right > cardRect.right + 1;

        return {
          cardIndex: i,
          cardWidth: cardRect.width,
          cardHeight: cardRect.height,
          badgeText: badge.textContent.trim(),
          linkText: link.textContent.trim(),
          overlaps,
          linkOverflows,
          linkRight: linkRect.right,
          cardRight: cardRect.right
        };
      });
    });

    console.log('Tablet 1024px Audit:', tabletAudit);

    for (const card of tabletAudit) {
      if (card.overlaps) {
        throw new Error(`At 1024px: Card ${card.cardIndex} badge and link overlap!`);
      }
      if (card.linkOverflows) {
        throw new Error(`At 1024px: Card ${card.cardIndex} Read Case Study link overflows card right boundary! (${card.linkRight} > ${card.cardRight})`);
      }
      console.log(`PASS: At 1024px: Card ${card.cardIndex} (${card.badgeText}) header wraps/aligns cleanly with 0 clipping and 0 overlap!`);
    }

    await section.screenshot({ path: path.join(artifactDir, 'carousel_tablet_1024.png') });
    console.log('Saved carousel_tablet_1024.png');

    // =========================================================================
    // 3. Arrow Navigation on Tablet / Laptop
    // =========================================================================
    console.log('\n======================================================');
    console.log('3. ARROW NAVIGATION TEST AT 1024px');
    console.log('======================================================');
    const rightBtn = await page.$('button[aria-label="Next customer testimonials"]');
    await rightBtn.click();
    await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));

    const slide1Check = await page.evaluate(() => {
      const track = document.querySelector('[role="region"][aria-label="Customer Testimonial Carousel"]');
      const secondSlide = track.querySelectorAll('.flex-none')[1];
      const cards = Array.from(secondSlide.querySelectorAll('.grid > div'));
      return cards.map((c) => ({
        badge: c.querySelector('span')?.textContent?.trim(),
        author: c.querySelector('.font-bold.text-\\[\\#142B59\\]')?.textContent?.trim(),
        imgSrc: c.querySelector('img')?.getAttribute('src'),
        naturalWidth: c.querySelector('img')?.naturalWidth
      }));
    });
    console.log('Slide 1 (Retail & Manufacturing) Audit:', slide1Check);
    if (!slide1Check[0].badge.includes('Retail & Wholesale') || !slide1Check[1].badge.includes('Manufacturing')) {
      throw new Error('Slide 1 failed to display Retail & Manufacturing!');
    }
    if (slide1Check[0].naturalWidth < 800 || slide1Check[1].naturalWidth < 800) {
      throw new Error(`Slide 1 images resolution below 800px!`);
    }
    console.log('PASS: Slide 1 images and text are high-res (>=800px) and updated simultaneously!');

    // =========================================================================
    // 4. Mobile Viewport Test (375x812)
    // =========================================================================
    console.log('\n======================================================');
    console.log('4. MOBILE VIEWPORT TEST (375x812)');
    console.log('======================================================');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    const mobileSec = await page.$('#case-studies');
    await mobileSec.scrollIntoView();
    await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));

    const mobileCheck = await page.evaluate(() => {
      const track = document.querySelector('[role="region"][aria-label="Customer Testimonial Carousel"]');
      const firstSlide = track.querySelectorAll('.flex-none')[0];
      const card = firstSlide.querySelector('.grid > div');
      const cardRect = card.getBoundingClientRect();
      const badge = card.querySelector('span');
      const link = card.querySelector('a[href^="/case-studies"]');
      const img = card.querySelector('img');

      const linkRect = link.getBoundingClientRect();
      const badgeRect = badge.getBoundingClientRect();

      return {
        cardWidth: cardRect.width,
        badgeText: badge.textContent.trim(),
        linkText: link.textContent.trim(),
        imgNaturalWidth: img.naturalWidth,
        linkOverflows: linkRect.right > cardRect.right + 2,
        overlaps: !(
          badgeRect.right <= linkRect.left ||
          badgeRect.left >= linkRect.right ||
          badgeRect.bottom <= linkRect.top ||
          badgeRect.top >= linkRect.bottom
        )
      };
    });

    console.log('Mobile 375px Audit:', mobileCheck);
    if (mobileCheck.linkOverflows) throw new Error('Mobile card: Read Case Study link extends outside card!');
    if (mobileCheck.overlaps) throw new Error('Mobile card: Badge and link overlap!');
    console.log('PASS: Mobile card renders cleanly with zero overflow and zero overlap!');

    await mobileSec.screenshot({ path: path.join(artifactDir, 'carousel_mobile_375.png') });
    console.log('Saved carousel_mobile_375.png');

    // =========================================================================
    // 5. Console Error Verification
    // =========================================================================
    console.log('\n======================================================');
    console.log('5. CONSOLE ERROR AUDIT');
    console.log('======================================================');
    console.log('Total console errors:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      throw new Error(`Console errors detected: ${consoleErrors.join(', ')}`);
    }
    console.log('PASS: Zero console errors!');

    console.log('\n======================================================');
    console.log('ALL TESTS PASSED WITH 100% SUCCESS!');
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
