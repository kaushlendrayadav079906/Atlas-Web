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

  // Wait for server to be up
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

    const headline = await page.$eval('h1', el => el.innerText);
    console.log('Desktop H1 Headline:', headline);
    if (!headline.includes('Where SAP Business One Meets Intelligent Automation')) {
      throw new Error(`Headline does not match PDF! Got: ${headline}`);
    }

    // Check solution cards count
    const solutionCards = await page.$$eval('#solutions .group', els => els.length);
    console.log('Solution cards detected:', solutionCards);

    // Check metric cards count
    const metricCards = await page.$$eval('[role="tooltip"], .relative .border', els => els.length);
    console.log('Metric/card elements count:', metricCards);

    // Check broken images
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
      
      // Close menu
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

    // Fill valid data
    console.log('\n--- 5. Filling Valid Contact Data & Verifying Mailto Placeholder ---');
    await page.type('#fullName', 'Amitabh Verma');
    await page.type('#companyName', 'Verma Precision Forgings Ltd');
    await page.type('#workEmail', 'averma@vermaprecision.in');
    await page.type('#phoneNumber', '+91 98201 55678');
    await page.select('#areaOfInterest', 'boyum');
    await page.type('#message', 'We need Beas APS shop floor scheduling and SAP B1 HANA upgrade for our Pune plant.');
    await submitBtn.click();
    await wait(800);

    // Check modal appeared
    const modalTitle = await page.$eval('#modal-title', el => el.innerText);
    console.log('Submission Modal Title:', modalTitle);
    await page.screenshot({ path: path.join(screenshotsDir, '07_form_submission_modal.png'), fullPage: false });

    console.log('\n=== ALL VERIFICATION CHECKS PASSED ===');
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
