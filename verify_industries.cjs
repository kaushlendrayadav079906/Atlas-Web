const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Starting Vite server for Industries page verification...');
  const viteProcess = spawn('npx.cmd', ['vite', '--port', '5179', '--strictPort'], {
    stdio: 'pipe',
    shell: true
  });

  viteProcess.stdout.on('data', data => {
    // console.log(`[Vite] ${data}`);
  });

  viteProcess.stderr.on('data', data => {
    console.error(`[Vite Error] ${data}`);
  });

  await wait(3000);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  try {
    const targetUrl = 'http://localhost:5179/industries';
    console.log(`Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await wait(1500);

    const artifactDir = 'C:\\Users\\A\\.gemini\\antigravity\\brain\\5b07bcd3-1b27-43b7-a312-bc3572569933';
    fs.mkdirSync(artifactDir, { recursive: true });

    // 1. Desktop Viewport (1440x900) - Hero Screen
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await wait(500);
    const heroPath = path.join(artifactDir, 'industries_01_desktop_hero.png');
    await page.screenshot({ path: heroPath });
    console.log(`Saved hero screenshot: ${heroPath}`);

    // Auto-scroll helper to trigger all image loads and observer transitions
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            setTimeout(resolve, 500);
          }
        }, 100);
      });
    });
    await wait(1000);

    // 2. Desktop Full Page
    const fullPath = path.join(artifactDir, 'industries_02_desktop_full.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved full page screenshot: ${fullPath}`);

    // 3. Tablet View (768px)
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await wait(600);
    const tabletPath = path.join(artifactDir, 'industries_03_tablet_768px.png');
    await page.screenshot({ path: tabletPath });
    console.log(`Saved tablet screenshot: ${tabletPath}`);

    // 4. Mobile View (375px)
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await wait(600);
    const mobilePath = path.join(artifactDir, 'industries_04_mobile_375px.png');
    await page.screenshot({ path: mobilePath });
    console.log(`Saved mobile screenshot: ${mobilePath}`);

    // 5. Test Interactive Industry Modal on Desktop
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await wait(500);
    // Click the first "Learn More" button
    const learnMoreBtn = await page.$('#industries-grid button');
    if (learnMoreBtn) {
      await learnMoreBtn.click();
      await wait(800);
      const modalPath = path.join(artifactDir, 'industries_05_modal_open.png');
      await page.screenshot({ path: modalPath });
      console.log(`Saved modal open screenshot: ${modalPath}`);
    }

    console.log('Console errors encountered:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log(consoleErrors);
    }
  } catch (err) {
    console.error('Verification failed:', err);
  } finally {
    await browser.close();
    viteProcess.kill();
    process.exit(0);
  }
}

run();
