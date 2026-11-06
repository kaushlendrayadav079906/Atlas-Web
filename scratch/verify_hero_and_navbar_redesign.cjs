const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runVerification() {
  console.log('====================================================');
  console.log('Verifying Hero & Navbar Redesign Across Viewports');
  console.log('====================================================');

  const artifactDir = 'C:\\Users\\A\\.gemini\\antigravity\\brain\\bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log(`[Vite]: ${d}`));
  server.stderr.on('data', (d) => console.error(`[Vite Err]: ${d}`));

  await wait(3500);

  const browser = await puppeteer.launch({
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let allPassed = true;

  try {
    const page = await browser.newPage();

    // 1. Desktop 1440x900
    console.log('\n[1/5] Verifying Desktop (1440x900)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    await wait(600);

    const desktopScreenshotPath = path.join(artifactDir, '71_hero_navbar_desktop_1440.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`Saved: ${desktopScreenshotPath}`);

    // Verify contact strip details
    const contactStripText = await page.evaluate(() => {
      const el = document.querySelector('header');
      return el ? el.innerText : '';
    });
    console.log('Header text includes email:', contactStripText.includes('sales@atlastechnosoft.com'));
    console.log('Header text includes phone:', contactStripText.includes('+91 93723 29599'));
    console.log('Header text includes Request Callback:', contactStripText.includes('Request Callback'));
    console.log('Header text includes Book a Consultation:', contactStripText.includes('Book a Consultation'));

    // Verify hero headline
    const heroHeadline = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.innerText : '';
    });
    console.log('Hero Headline:', heroHeadline);

    // 2. Open Mega Menu on Desktop
    console.log('\n[2/5] Verifying Mega Menu from capsule navbar on Desktop...');
    // Hover on Services
    const servicesLink = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll('header nav a'));
      return links.find(a => a.textContent.includes('Services'));
    });
    if (servicesLink) {
      await servicesLink.hover();
      await wait(600);
      const megaMenuPath = path.join(artifactDir, '75_navbar_megamenu_desktop.png');
      await page.screenshot({ path: megaMenuPath, fullPage: false });
      console.log(`Saved: ${megaMenuPath}`);
    }

    // 3. Laptop 1280x800
    console.log('\n[3/5] Verifying Laptop (1280x800)...');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    await wait(600);
    const laptopScreenshotPath = path.join(artifactDir, '72_hero_navbar_laptop_1280.png');
    await page.screenshot({ path: laptopScreenshotPath, fullPage: false });
    console.log(`Saved: ${laptopScreenshotPath}`);

    // 4. Tablet 1024x768
    console.log('\n[4/5] Verifying Tablet (1024x768)...');
    await page.setViewport({ width: 1024, height: 768 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    await wait(600);
    const tabletScreenshotPath = path.join(artifactDir, '73_hero_navbar_tablet_1024.png');
    await page.screenshot({ path: tabletScreenshotPath, fullPage: false });
    console.log(`Saved: ${tabletScreenshotPath}`);

    // 5. Mobile 390x844
    console.log('\n[5/5] Verifying Mobile (390x844)...');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    await wait(600);
    const mobileScreenshotPath = path.join(artifactDir, '74_hero_navbar_mobile_390.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`Saved: ${mobileScreenshotPath}`);

    // Open mobile drawer
    console.log('\n[6/5] Opening Mobile Drawer...');
    const hamburger = await page.$('header button[aria-label="Toggle navigation menu"]');
    if (hamburger) {
      await hamburger.click();
      await wait(500);
      const mobileDrawerPath = path.join(artifactDir, '76_mobile_drawer_open.png');
      await page.screenshot({ path: mobileDrawerPath, fullPage: false });
      console.log(`Saved: ${mobileDrawerPath}`);
    }

    console.log('\n====================================================');
    console.log('All Viewport Verification Screenshots Captured Successfully!');
    console.log('====================================================');

  } catch (err) {
    console.error('Verification error:', err);
    allPassed = false;
  } finally {
    await browser.close();
    server.kill();
    process.exit(allPassed ? 0 : 1);
  }
}

runVerification();
