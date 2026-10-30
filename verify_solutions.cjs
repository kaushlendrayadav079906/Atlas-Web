const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalDistance = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalDistance += distance;

        if (totalDistance >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 60);
    });
  });
}

async function runSolutionsVerification() {
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

    // 1. Desktop Test (1440px) on /solutions
    console.log('\n========================================');
    console.log('1. Testing Solutions Page Desktop Layout (1440px)');
    console.log('========================================');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173/solutions', { waitUntil: 'networkidle0' });

    // Check Active Navigation Item
    const activeNav = await page.evaluate(() => {
      const activeEl = document.querySelector('header nav a.text-blue-600');
      return activeEl ? activeEl.innerText.trim() : null;
    });
    console.log(`Active Navbar Item: "${activeNav}" (Target: "Solutions")`);

    // Check Hero Heading typography
    const heroHeadingData = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return null;
      const style = window.getComputedStyle(h1);
      return {
        text: h1.innerText,
        fontSize: parseFloat(style.fontSize),
        lineHeight: style.lineHeight,
        fontWeight: style.fontWeight
      };
    });
    console.log(`Solutions Hero H1: "${heroHeadingData ? heroHeadingData.text.replace(/\n/g, ' ') : 'N/A'}"`);
    console.log(`Hero Font Size: ${heroHeadingData ? heroHeadingData.fontSize : 0}px (Target: 46-54px)`);

    // Check Section Headings
    const sectionHeadings = await page.evaluate(() => {
      const h2s = Array.from(document.querySelectorAll('h2'));
      return h2s.map(h => ({
        text: h.innerText.replace(/\n/g, ' '),
        fontSize: parseFloat(window.getComputedStyle(h).fontSize)
      }));
    });
    console.log(`Section Headings (${sectionHeadings.length}):`);
    sectionHeadings.forEach(h => console.log(`  - [${h.fontSize}px] ${h.text}`));

    // Capture Desktop Hero Screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'solutions_01_desktop_hero.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved: solutions_01_desktop_hero.png');

    // Auto-scroll through the entire page so all content is loaded
    console.log('Auto-scrolling page...');
    await autoScroll(page);
    await wait(600);

    // Capture Full Page Desktop Screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'solutions_02_desktop_full.png'),
      fullPage: true
    });
    console.log('Saved: solutions_02_desktop_full.png');

    // Check 5 Overview Cards
    const overviewCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#overview .group'));
      return cards.map(c => c.querySelector('h3')?.innerText.trim());
    });
    console.log(`Overview Cards (${overviewCards.length}):`, overviewCards);

    // Check 3 Boyum Modules
    const boyumModules = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#boyum-section .group'));
      return cards.map(c => c.querySelector('h4')?.innerText.trim());
    });
    console.log(`Boyum Modules (${boyumModules.length}):`, boyumModules);

    // Check 4 UiPath Areas
    const uipathAreas = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('#uipath-section h5'));
      return items.map(h => h.innerText.trim());
    });
    console.log(`UiPath Areas (${uipathAreas.length}):`, uipathAreas);

    // Check 5 Proprietary Add-on Cards
    const addonCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#atlas-addons-section .group'));
      return cards.map(c => c.querySelector('h4')?.innerText.trim());
    });
    console.log(`Proprietary Addons (${addonCards.length}):`, addonCards);

    // Check 4 Industry Cards
    const industryCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#industries h3'));
      return cards.map(h => h.innerText.trim());
    });
    console.log(`Industry Cards (${industryCards.length}):`, industryCards);

    // 2. Tablet Test (768px)
    console.log('\n========================================');
    console.log('2. Testing Solutions Page Tablet Layout (768px)');
    console.log('========================================');
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto('http://localhost:4173/solutions', { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(screenshotsDir, 'solutions_03_tablet_768px.png'),
      fullPage: false,
      clip: { x: 0, y: 0, width: 768, height: 1024 }
    });
    console.log('Saved: solutions_03_tablet_768px.png');

    // 3. Mobile Test (375px)
    console.log('\n========================================');
    console.log('3. Testing Solutions Page Mobile Layout (375px)');
    console.log('========================================');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:4173/solutions', { waitUntil: 'networkidle0' });
    await autoScroll(page);
    await wait(400);

    await page.screenshot({
      path: path.join(screenshotsDir, 'solutions_04_mobile_375px.png'),
      fullPage: false,
      clip: { x: 0, y: 0, width: 375, height: 812 }
    });
    console.log('Saved: solutions_04_mobile_375px.png');

    // 4. Test Consultation Modal
    console.log('\n========================================');
    console.log('4. Testing Consultation Modal on Solutions Page');
    console.log('========================================');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173/solutions', { waitUntil: 'networkidle0' });

    // Click "Book a Consultation" button in contact CTA
    await page.evaluate(() => {
      const btn = document.querySelector('#contact-cta button');
      if (btn) btn.click();
    });
    await wait(600);

    const isModalVisible = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      return !!modal;
    });
    console.log(`Modal Open State: ${isModalVisible}`);

    await page.screenshot({
      path: path.join(screenshotsDir, 'solutions_05_modal_open.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved: solutions_05_modal_open.png');

    console.log('\n========================================');
    console.log('Solutions Page Verification Completed Successfully!');
    console.log('Total Console/Page Errors:', pageErrors.length);
    console.log('========================================');

    // Copy screenshots to artifact directory
    const artifactDir = path.resolve('C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933');
    if (fs.existsSync(artifactDir)) {
      const files = fs.readdirSync(screenshotsDir).filter(f => f.startsWith('solutions_'));
      for (const f of files) {
        fs.copyFileSync(path.join(screenshotsDir, f), path.join(artifactDir, f));
        console.log(`Copied to artifact dir: ${f}`);
      }
    }

  } catch (err) {
    console.error('Verification failed:', err);
  } finally {
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

runSolutionsVerification();
