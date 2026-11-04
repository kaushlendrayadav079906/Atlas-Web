const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runVerification() {
  console.log('================================================================');
  console.log('ATLAS Technosoft - About Page Journey Timeline Verification');
  console.log('================================================================');

  const screenshotsDir = path.join(__dirname, '..', 'timeline_verification_artifacts');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const uniqueProfile = path.join(__dirname, 'test_profile_timeline_' + Date.now());
  const PORT = 4178;

  console.log(`\n[1/6] Launching Vite preview server on port ${PORT}...`);
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--host'], {
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', d => {});
  server.stderr.on('data', d => console.error(`[Vite Err]: ${d}`));

  await wait(3000);

  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: uniqueProfile,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  let allPassed = true;

  try {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('[Browser Error]:', msg.text());
      }
    });

    page.on('pageerror', err => {
      console.error('[Page Runtime Error]:', err.toString());
      allPassed = false;
    });

    // -------------------------------------------------------------------------
    // TEST 1: Navigate to About Page & Verify Section Existence
    // -------------------------------------------------------------------------
    console.log('\n[2/6] Verifying Journey Timeline section on About Page (Desktop 1440px)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/about`, { waitUntil: 'networkidle0' });
    await wait(600);

    const timelineSection = await page.$('#timeline');
    if (!timelineSection) {
      throw new Error('Could not find #timeline section on About Page');
    }

    // Verify Heading & Typography
    const headingText = await page.$eval('#timeline h2', el => el.textContent.trim());
    console.log(`  Section Heading: "${headingText}"`);
    if (!headingText.includes('Milestones That') || !headingText.includes('Define Us')) {
      console.error('  ❌ Heading does not match "Milestones That Define Us"');
      allPassed = false;
    } else {
      console.log('  ✓ Section heading matches exact requirements');
    }

    // Verify Subtitle
    const subtitleText = await page.$eval('#timeline p', el => el.textContent.trim());
    console.log(`  Subtitle: "${subtitleText.substring(0, 80)}..."`);
    if (!subtitleText.includes('foundation in enterprise ERP')) {
      console.error('  ❌ Subtitle content mismatch');
      allPassed = false;
    } else {
      console.log('  ✓ Subtitle content verified');
    }

    // -------------------------------------------------------------------------
    // TEST 2: Verify Alternating Arrangement & Card Contents
    // -------------------------------------------------------------------------
    console.log('\n[3/6] Inspecting 5 Milestone Cards & Alternating Arrangement...');
    const cards = await page.$$eval('#timeline [data-milestone-id]', els => {
      return els.map(el => {
        const id = el.getAttribute('data-milestone-id');
        const year = el.querySelector('[class*="font-black"]')?.textContent?.trim();
        const title = el.querySelector('h3')?.textContent?.trim();
        const flexClasses = el.className;
        const isRightAligned = flexClasses.includes('md:flex-row-reverse');
        return { id, year, title, isRightAligned };
      });
    });

    console.log('  Parsed Milestones:');
    cards.forEach((c, idx) => {
      const visualSide = c.isRightAligned ? 'RIGHT' : 'LEFT';
      console.log(`    ${idx + 1}. [${visualSide}] ${c.year} — ${c.title}`);
    });

    if (cards.length !== 5) {
      console.error(`  ❌ Expected 5 milestones, found ${cards.length}`);
      allPassed = false;
    }

    // Check Right → Left → Right → Left → Right
    const expectedSides = [true, false, true, false, true]; // true = isRightAligned (Right)
    const sidesMatch = cards.every((c, idx) => c.isRightAligned === expectedSides[idx]);

    if (sidesMatch) {
      console.log('  ✓ Visual arrangement strictly verified: Right → Left → Right → Left → Right');
    } else {
      console.error('  ❌ Card alternating alignment does not match expected sequence');
      allPassed = false;
    }

    // Check Years
    const expectedYears = ['c. 2005*', '2015*', '2018–2020*', '2020–2025', '2026–2030'];
    const yearsMatch = cards.every((c, idx) => c.year === expectedYears[idx]);
    if (yearsMatch) {
      console.log('  ✓ All 5 milestone years verified (including asterisked placeholders and documented eras)');
    } else {
      console.error('  ❌ Milestone years do not match expected sequence:', cards.map(c => c.year));
      allPassed = false;
    }

    // Scroll down to timeline to trigger animations and capture desktop screenshot
    console.log('\n[4/6] Scrolling into view & capturing Desktop screenshots...');
    await page.$eval('#timeline', el => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    await wait(800);

    await page.screenshot({
      path: path.join(screenshotsDir, '01_about_timeline_desktop_top.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 01_about_timeline_desktop_top.png');

    // Scroll to middle of timeline
    await page.evaluate(() => {
      const el = document.getElementById('timeline');
      if (el) {
        window.scrollTo(0, el.offsetTop + 600);
      }
    });
    await wait(700);

    await page.screenshot({
      path: path.join(screenshotsDir, '02_about_timeline_desktop_cards.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 02_about_timeline_desktop_cards.png');

    // -------------------------------------------------------------------------
    // TEST 3: Tablet Responsiveness (768px x 1024px iPad)
    // -------------------------------------------------------------------------
    console.log('\n[5/6] Testing Tablet Viewport (768px x 1024px)...');
    await page.setViewport({ width: 768, height: 1024 });
    await wait(500);

    await page.$eval('#timeline', el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await wait(600);

    await page.screenshot({
      path: path.join(screenshotsDir, '03_about_timeline_tablet.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 03_about_timeline_tablet.png');

    // -------------------------------------------------------------------------
    // TEST 4: Mobile Responsiveness (390px x 844px iPhone 14)
    // -------------------------------------------------------------------------
    console.log('\n[6/6] Testing Mobile Viewport (390px x 844px iPhone 14)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await wait(500);

    await page.$eval('#timeline', el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await wait(600);

    // Verify mobile layout: all cards positioned to the right of line
    const mobileCardPositions = await page.$$eval('#timeline article', els => {
      return els.map(el => {
        const rect = el.getBoundingClientRect();
        return { left: rect.left, width: rect.width };
      });
    });

    console.log(`  Mobile cards rendered: ${mobileCardPositions.length}`);
    const allRightOfLeftLine = mobileCardPositions.every(p => p.left >= 30);
    if (allRightOfLeftLine) {
      console.log('  ✓ Mobile layout verified: line moved to left, all cards displayed to the right');
    } else {
      console.error('  ❌ Mobile cards positioning issue detected');
      allPassed = false;
    }

    await page.screenshot({
      path: path.join(screenshotsDir, '04_about_timeline_mobile.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 04_about_timeline_mobile.png');

  } catch (err) {
    console.error('Verification failed with error:', err);
    allPassed = false;
  } finally {
    if (browser) await browser.close();
    if (server) server.kill();
    try { fs.rmSync(uniqueProfile, { recursive: true, force: true }); } catch (e) {}
  }

  if (allPassed) {
    console.log('\n================================================================');
    console.log('🎉 ALL JOURNEY TIMELINE TESTS PASSED 100%!');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error('\n❌ SOME TIMELINE VERIFICATION CHECKS FAILED.');
    process.exit(1);
  }
}

runVerification();
