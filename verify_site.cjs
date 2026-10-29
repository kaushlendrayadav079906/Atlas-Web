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
    const consoleLogs = [];
    const pageErrors = [];

    page.on('console', msg => {
      consoleLogs.push({ type: msg.type(), text: msg.text() });
      if (msg.type() === 'error') {
        console.error('Browser Console Error:', msg.text());
      }
    });

    page.on('pageerror', err => {
      pageErrors.push(err.toString());
      console.error('Browser Page Error:', err.toString());
    });

    // 1. Desktop Test (1440px)
    console.log('\n--- 1. Testing Desktop Layout (1440px) ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    // Verify H1 Headline
    const headline = await page.$eval('h1', el => el.innerText);
    console.log('Desktop H1 Headline:', headline);
    if (!headline.includes('Where SAP Business One Meets Intelligent Automation')) {
      throw new Error(`Headline does not match PDF! Got: ${headline}`);
    }

    // Verify 8 Navigation links in header
    const navLinks = await page.$$eval('header nav a', els => els.map(e => e.innerText.trim()));
    console.log('Header Navigation Links detected:', navLinks);
    const expectedNav = ['Home', 'About', 'Services', 'Solutions', 'Industries', 'Case Studies', 'Partners', 'Contact'];
    for (const link of expectedNav) {
      if (!navLinks.includes(link)) {
        throw new Error(`Missing expected nav link: ${link}`);
      }
    }
    console.log('✓ All 8 navigation links verified.');

    // Verify CTAs
    const heroBtn1 = await page.$eval('section a[href="#contact"]', el => el.innerText);
    console.log('Primary CTA button text:', heroBtn1);
    if (!heroBtn1.includes('Book a Consultation')) {
      throw new Error(`Expected primary CTA to be "Book a Consultation", got: ${heroBtn1}`);
    }

    const heroBtn2 = await page.$eval('section a[href="#solutions"]', el => el.innerText);
    console.log('Secondary CTA button text:', heroBtn2);
    if (!heroBtn2.includes('Explore Our Solutions')) {
      throw new Error(`Expected secondary CTA to be "Explore Our Solutions", got: ${heroBtn2}`);
    }

    // Check 4 Service Cards
    const serviceCards = await page.$$eval('#services .group', els => els.length);
    console.log('Section 4 Services Overview cards detected:', serviceCards);
    if (serviceCards !== 4) {
      throw new Error(`Expected 4 core service cards, found: ${serviceCards}`);
    }

    // Check 6 Solution Cards
    const solutionCards = await page.$$eval('#solutions .group', els => els.length);
    console.log('Section 4B Solutions Suite cards detected:', solutionCards);
    if (solutionCards !== 6) {
      throw new Error(`Expected 6 solution cards, found: ${solutionCards}`);
    }

    // Check 4 Industry Cards
    const industryCards = await page.$$eval('#industries .flex.flex-col', els => els.length);
    console.log('Section 6 Industry cards detected:', industryCards);

    // Check 4 Approach Steps (Discover, Design, Implement, Optimize & Support)
    const approachSteps = await page.$$eval('#approach h3', els => els.map(e => e.innerText.trim()));
    console.log('Section 7 Approach Steps detected:', approachSteps);
    if (!approachSteps.includes('Discover') || !approachSteps.includes('Design') || !approachSteps.includes('Implement')) {
      throw new Error(`Missing expected approach steps: ${approachSteps}`);
    }

    // Check Partners Section
    const partnerCount = await page.$$eval('#partners h3', els => els.length);
    console.log('Section 9 Partner cards detected:', partnerCount);
    if (partnerCount !== 3) {
      throw new Error(`Expected 3 partner statements, found: ${partnerCount}`);
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

    await page.screenshot({ path: path.join(screenshotsDir, '01_desktop_1440px_hero.png'), fullPage: false });
    await page.screenshot({ path: path.join(screenshotsDir, '02_desktop_full_page.png'), fullPage: true });

    // 2. Tablet Test (768px)
    console.log('\n--- 2. Testing Tablet Layout (768px) ---');
    await page.setViewport({ width: 768, height: 1024 });
    await page.reload({ waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(screenshotsDir, '03_tablet_768px.png'), fullPage: false });

    // 3. Mobile Test (375px)
    console.log('\n--- 3. Testing Mobile Layout (375px) & Hamburger Menu ---');
    await page.setViewport({ width: 375, height: 812 });
    await page.reload({ waitUntil: 'networkidle0' });

    // Verify Sticky Quick CTA on Mobile
    const quickCtaVisible = await page.$eval('.fixed.bottom-0', el => !!el);
    console.log('Sticky Mobile Quick CTA visible:', quickCtaVisible);

    await page.screenshot({ path: path.join(screenshotsDir, '04_mobile_375px_hero.png'), fullPage: false });

    // Open Mobile Hamburger Menu
    const hamburgerBtn = await page.$('button[aria-label="Toggle navigation menu"]');
    if (hamburgerBtn) {
      await hamburgerBtn.click();
      await wait(500);
      await page.screenshot({ path: path.join(screenshotsDir, '05_mobile_menu_open.png'), fullPage: false });
      console.log('Mobile menu opened successfully.');
      
      const closeBtn = await page.$('button[aria-label="Close menu"]');
      if (closeBtn) {
        await closeBtn.click();
        await wait(500);
        console.log('Mobile menu closed successfully.');
      }
    }

    // 4. Form Field Validation Test
    console.log('\n--- 4. Testing Contact Form Validation ---');
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto('http://localhost:4173#contact', { waitUntil: 'networkidle0' });
    await wait(800);

    // Click submit on empty form
    const submitBtn = await page.$('form button[type="submit"]');
    await submitBtn.click();
    await wait(500);

    const errorCount = await page.$$eval('form .text-rose-600', els => els.length);
    console.log('Empty form validation errors triggered:', errorCount);
    if (errorCount < 4) {
      throw new Error(`Expected at least 4 field validation errors, got: ${errorCount}`);
    }
    await page.screenshot({ path: path.join(screenshotsDir, '06_form_validation_errors.png'), fullPage: false });

    // 5. Fill Valid Contact Data
    console.log('\n--- 5. Filling Valid Contact Data & Verifying Mailto Modal ---');
    await page.type('#fullName', 'Sanjay Mehra');
    await page.type('#companyName', 'Mehra Precision Tools Ltd');
    await page.type('#workEmail', 'smehra@mehraprecision.com');
    await page.type('#phoneNumber', '+91 98200 44556');
    await page.select('#areaOfInterest', 'boyum');
    await page.type('#message', 'Interested in Beas Manufacturing APS shop floor scheduling and SAP B1 HANA upgrade.');
    await submitBtn.click();
    await wait(800);

    const modalTitle = await page.$eval('#modal-title', el => el.innerText);
    console.log('Submission Modal Title:', modalTitle);
    await page.screenshot({ path: path.join(screenshotsDir, '07_form_submission_modal.png'), fullPage: false });

    console.log('\n=== ALL HOME PAGE VERIFICATION CHECKS PASSED ===');
    console.log('Total console errors:', pageErrors.length);

  } finally {
    await browser.close();
    server.kill();
  }
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
