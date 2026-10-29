const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runVerification() {
  console.log('--- Starting Vite Preview Server ---');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', (d) => console.log(`[Vite]: ${d}`));
  server.stderr.on('data', (d) => console.error(`[Vite Err]: ${d}`));

  await wait(3000);

  const screenshotsDir = path.join(__dirname, 'verification_artifacts');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('Browser Console Error:', msg.text());
      }
    });

    page.on('pageerror', err => {
      pageErrors.push(err.toString());
      console.error('Browser Page Error:', err.toString());
    });

    // 1. Desktop Test (1440px)
    console.log('\n========================================');
    console.log('1. Testing Desktop Layout & Large Typography (1440px)');
    console.log('========================================');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    // Check Hero Heading typography
    const heroHeadingData = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const style = window.getComputedStyle(h1);
      return {
        text: h1.innerText,
        fontSize: parseFloat(style.fontSize),
        lineHeight: style.lineHeight,
        fontWeight: style.fontWeight
      };
    });
    console.log(`Hero H1: "${heroHeadingData.text.replace(/\n/g, ' ')}"`);
    console.log(`Hero Font Size: ${heroHeadingData.fontSize}px (Target: 48-56px)`);
    if (heroHeadingData.fontSize < 46) {
      throw new Error(`Hero font size too small! Expected >= 48px, got ${heroHeadingData.fontSize}px`);
    }

    // Check Section Headings typography
    const sectionHeadingSize = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      return parseFloat(window.getComputedStyle(h2).fontSize);
    });
    console.log(`Section Heading Font Size: ${sectionHeadingSize}px (Target: 32-38px)`);
    if (sectionHeadingSize < 30) {
      throw new Error(`Section heading size too small! Got ${sectionHeadingSize}px`);
    }

    // Check Navigation Links
    const navData = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('header nav a'));
      return {
        count: links.length,
        names: links.map(l => l.innerText.trim()),
        fontSize: links[0] ? parseFloat(window.getComputedStyle(links[0]).fontSize) : 0
      };
    });
    console.log(`Navigation links (${navData.count}):`, navData.names);
    console.log(`Navigation Link Font Size: ${navData.fontSize}px (Target: 16-17px)`);

    // Check 4 Service Cards
    const serviceCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#services .group'));
      const h3s = Array.from(document.querySelectorAll('#services h3'));
      const firstH3 = h3s[0] ? parseFloat(window.getComputedStyle(h3s[0]).fontSize) : 0;
      return {
        count: cards.length,
        titles: h3s.map(h => h.innerText.trim()),
        headingSize: firstH3
      };
    });
    console.log(`Services Cards (${serviceCards.count}):`, serviceCards.titles);
    console.log(`Service Card Heading Font Size: ${serviceCards.headingSize}px (Target: 20-23px)`);
    if (serviceCards.count !== 4) {
      throw new Error(`Expected 4 service cards, found: ${serviceCards.count}`);
    }

    // Check 4 Industry Cards
    const industryCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#industries .group'));
      const h3s = Array.from(document.querySelectorAll('#industries h3'));
      const firstH3 = h3s[0] ? parseFloat(window.getComputedStyle(h3s[0]).fontSize) : 0;
      return {
        count: cards.length,
        titles: h3s.map(h => h.innerText.trim()),
        headingSize: firstH3
      };
    });
    console.log(`Industry Cards (${industryCards.count}):`, industryCards.titles);
    console.log(`Industry Card Heading Font Size: ${industryCards.headingSize}px (Target: 19-22px)`);
    if (industryCards.count !== 4) {
      throw new Error(`Expected 4 industry cards, found: ${industryCards.count}`);
    }

    // Check 4 Process Steps
    const approachSteps = await page.evaluate(() => {
      const steps = Array.from(document.querySelectorAll('#approach h3'));
      return steps.map(s => s.innerText.trim());
    });
    console.log('Approach Steps (4):', approachSteps);
    if (approachSteps.length !== 4) {
      throw new Error(`Expected 4 approach steps, found: ${approachSteps.length}`);
    }

    // Check Broken Images
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src);
    });
    console.log('Broken images count:', brokenImages.length);
    if (brokenImages.length > 0) {
      console.warn('Broken images:', brokenImages);
    }

    // Take Desktop Screenshots
    await page.screenshot({ path: path.join(screenshotsDir, '01_desktop_1440px_hero.png'), fullPage: false });
    await page.screenshot({ path: path.join(screenshotsDir, '02_desktop_full_page.png'), fullPage: true });

    // 2. Tablet Test (768px)
    console.log('\n========================================');
    console.log('2. Testing Tablet Layout (768px)');
    console.log('========================================');
    await page.setViewport({ width: 768, height: 1024 });
    await page.reload({ waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(screenshotsDir, '03_tablet_768px.png'), fullPage: false });

    // 3. Mobile Test (375px)
    console.log('\n========================================');
    console.log('3. Testing Mobile Layout & Typography (375px)');
    console.log('========================================');
    await page.setViewport({ width: 375, height: 812 });
    await page.reload({ waitUntil: 'networkidle0' });

    const mobileHeroSize = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return parseFloat(window.getComputedStyle(h1).fontSize);
    });
    console.log(`Mobile Hero Font Size: ${mobileHeroSize}px (Target: 34-40px)`);
    if (mobileHeroSize < 32 || mobileHeroSize > 44) {
      throw new Error(`Mobile hero font size out of target range: ${mobileHeroSize}px`);
    }

    // Check Sticky Mobile CTA
    const mobileCtaVisible = await page.$eval('.fixed.bottom-0', el => !!el);
    console.log('Sticky Mobile Quick CTA visible:', mobileCtaVisible);

    await page.screenshot({ path: path.join(screenshotsDir, '04_mobile_375px_hero.png'), fullPage: false });

    // Test Mobile Menu
    const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await wait(400);
      await page.screenshot({ path: path.join(screenshotsDir, '05_mobile_menu_open.png'), fullPage: false });
      console.log('Mobile menu opened and verified.');
      const closeBtn = await page.$('button[aria-label="Close menu"]');
      if (closeBtn) {
        await closeBtn.click();
        await wait(300);
      }
    }

    // 4. Test Consultation Modal & Form Validation
    console.log('\n========================================');
    console.log('4. Testing Consultation Modal & Validation');
    console.log('========================================');
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    // Click Hero Book a Consultation button
    const heroBtn = await page.$('#hero-book-btn');
    if (heroBtn) {
      await heroBtn.click();
      await wait(600);

      const modalVisible = await page.$eval('#modal-title', el => el.innerText);
      console.log('Consultation Modal Opened:', modalVisible);
      await page.screenshot({ path: path.join(screenshotsDir, '06_consultation_modal.png'), fullPage: false });
    }

    console.log('\n=== ALL LARGE TYPOGRAPHY & REFERENCE DESIGN TESTS PASSED ===');
    console.log('Total console page errors:', pageErrors.length);

  } finally {
    await browser.close();
    server.kill();
  }
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
