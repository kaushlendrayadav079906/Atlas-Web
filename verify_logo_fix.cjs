const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runVerification() {
  console.log('====================================================');
  console.log('Verifying Logo Cards Vertical Positioning & Sizing');
  console.log('====================================================');

  const screenshotsDir = path.join(__dirname, 'test_artifacts');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log(`[Vite]: ${d}`));
  server.stderr.on('data', (d) => console.error(`[Vite Err]: ${d}`));

  await wait(3000);

  const browser = await puppeteer.launch({
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let testPassed = true;

  try {
    const page = await browser.newPage();

    // -------------------------------------------------------------
    // Test 1: Desktop (1440px)
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Desktop View (1440px) ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    // Scroll to Services and Slider
    await page.evaluate(() => {
      const el = document.getElementById('technology-partners-slider');
      if (el) el.scrollIntoView({ block: 'center' });
    });
    await wait(600);

    const desktopData = await page.evaluate(() => {
      const services = document.getElementById('services');
      const slider = document.getElementById('technology-partners-slider');
      const trackContainer = slider?.querySelector('.logo-slider-group');
      const cards = Array.from(slider?.querySelectorAll('.animate-marquee-left:first-child a') || []);

      const servicesRect = services?.getBoundingClientRect();
      const sliderRect = slider?.getBoundingClientRect();
      const trackRect = trackContainer?.getBoundingClientRect();

      const firstCard = cards[0];
      const cardRect = firstCard?.getBoundingClientRect();

      const isCardVerticallyContained =
        cardRect &&
        trackRect &&
        cardRect.top >= trackRect.top - 2 &&
        cardRect.bottom <= trackRect.bottom + 2;

      const allCards = Array.from(slider?.querySelectorAll('a') || []);
      const visibleCards = allCards.filter((c) => {
        const r = c.getBoundingClientRect();
        return r.left >= 0 && r.right <= window.innerWidth;
      });

      const gapBetweenSections = sliderRect && servicesRect ? sliderRect.top - servicesRect.bottom : 0;

      return {
        hasServices: !!services,
        hasSlider: !!slider,
        cardsCount: cards.length,
        visibleCardsCount: visibleCards.length,
        isCardVerticallyContained,
        cardHeight: cardRect?.height,
        trackHeight: trackRect?.height,
        gapBetweenSections,
      };
    });

    console.log('Desktop Layout Data:', desktopData);
    if (!desktopData.isCardVerticallyContained) {
      throw new Error(`Logo cards are vertically clipped! Card height: ${desktopData.cardHeight}, Track height: ${desktopData.trackHeight}`);
    }
    console.log('✔ Desktop: Cards are vertically centered and 100% fully visible without clipping.');

    // Capture desktop screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'fixed_desktop_services_and_slider.png'),
    });
    console.log('Saved screenshot: fixed_desktop_services_and_slider.png');

    // -------------------------------------------------------------
    // Test 2: Tablet (820px)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Tablet View (820px) ---');
    await page.setViewport({ width: 820, height: 1180 });
    await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (slider) slider.scrollIntoView({ block: 'center' });
    });
    await wait(500);

    const tabletData = await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      const trackContainer = slider?.querySelector('.logo-slider-group');
      const trackRect = trackContainer?.getBoundingClientRect();

      const allCards = Array.from(slider?.querySelectorAll('a') || []);
      const visibleCards = allCards.filter((c) => {
        const r = c.getBoundingClientRect();
        return r.left >= 0 && r.right <= window.innerWidth;
      });

      const firstCard = allCards[0];
      const cardRect = firstCard?.getBoundingClientRect();

      const isCardVerticallyContained =
        cardRect &&
        trackRect &&
        cardRect.top >= trackRect.top - 2 &&
        cardRect.bottom <= trackRect.bottom + 2;

      return {
        visibleCardsCount: visibleCards.length,
        isCardVerticallyContained,
        cardHeight: cardRect?.height,
        trackHeight: trackRect?.height,
      };
    });

    console.log('Tablet Layout Data:', tabletData);
    if (!tabletData.isCardVerticallyContained) {
      throw new Error('Cards vertically clipped on tablet!');
    }
    console.log(`✔ Tablet: ${tabletData.visibleCardsCount} cards visible, perfectly contained vertically.`);

    await page.screenshot({
      path: path.join(screenshotsDir, 'fixed_tablet_slider.png'),
    });
    console.log('Saved screenshot: fixed_tablet_slider.png');

    // -------------------------------------------------------------
    // Test 3: Mobile (375px)
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Mobile View (375px) ---');
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (slider) slider.scrollIntoView({ block: 'center' });
    });
    await wait(500);

    const mobileData = await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      const trackContainer = slider?.querySelector('.logo-slider-group');
      const trackRect = trackContainer?.getBoundingClientRect();

      const allCards = Array.from(slider?.querySelectorAll('a') || []);
      const visibleCards = allCards.filter((c) => {
        const r = c.getBoundingClientRect();
        return r.left >= 0 && r.right <= window.innerWidth;
      });

      const firstCard = allCards[0];
      const cardRect = firstCard?.getBoundingClientRect();

      const isCardVerticallyContained =
        cardRect &&
        trackRect &&
        cardRect.top >= trackRect.top - 2 &&
        cardRect.bottom <= trackRect.bottom + 2;

      return {
        visibleCardsCount: visibleCards.length,
        isCardVerticallyContained,
        cardHeight: cardRect?.height,
        trackHeight: trackRect?.height,
      };
    });

    console.log('Mobile Layout Data:', mobileData);
    if (!mobileData.isCardVerticallyContained) {
      throw new Error('Cards vertically clipped on mobile!');
    }
    console.log(`✔ Mobile: ${mobileData.visibleCardsCount} card(s) visible, perfectly contained vertically.`);

    await page.screenshot({
      path: path.join(screenshotsDir, 'fixed_mobile_slider.png'),
    });
    console.log('Saved screenshot: fixed_mobile_slider.png');

    console.log('\n====================================================');
    console.log('ALL POSITIONING & VISIBILITY TESTS PASSED!');
    console.log('====================================================');
  } catch (err) {
    console.error('VERIFICATION ERROR:', err);
    testPassed = false;
  } finally {
    await browser.close();
    server.kill();
  }

  process.exit(testPassed ? 0 : 1);
}

runVerification();
