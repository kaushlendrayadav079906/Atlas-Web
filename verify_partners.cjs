const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Starting Vite server for Partners page verification...');
  const viteProcess = spawn('npx.cmd', ['vite', '--port', '5182', '--strictPort'], {
    stdio: 'pipe',
    shell: true
  });

  viteProcess.stdout.on('data', data => {});
  viteProcess.stderr.on('data', data => {
    console.error(`[Vite Error] ${data}`);
  });

  await wait(3000);

  const tempProfileDir = path.join(os.tmpdir(), `puppeteer_partners_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);
  fs.mkdirSync(tempProfileDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempProfileDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
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
    const targetUrl = 'http://localhost:5182/partners';
    console.log(`Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await wait(1500);

    const artifactDir = 'C:\\Users\\A\\.gemini\\antigravity\\brain\\5b07bcd3-1b27-43b7-a312-bc3572569933';
    fs.mkdirSync(artifactDir, { recursive: true });

    // 1. Desktop Viewport (1440x900) - Hero Screen
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await wait(500);
    const heroPath = path.join(artifactDir, 'partners_01_desktop_hero.png');
    await page.screenshot({ path: heroPath });
    console.log(`Saved hero screenshot: ${heroPath}`);

    // Auto-scroll helper to trigger all image loads and transitions
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
    const fullPath = path.join(artifactDir, 'partners_02_desktop_full.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved full page screenshot: ${fullPath}`);

    // 3. Tablet View (768px)
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await wait(600);
    const tabletPath = path.join(artifactDir, 'partners_03_tablet_768px.png');
    await page.screenshot({ path: tabletPath });
    console.log(`Saved tablet screenshot: ${tabletPath}`);

    // 4. Mobile View (375px)
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await wait(600);
    const mobilePath = path.join(artifactDir, 'partners_04_mobile_375px.png');
    await page.screenshot({ path: mobilePath });
    console.log(`Saved mobile screenshot: ${mobilePath}`);

    // 5. Test Interactive Boyum Product Modal
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await wait(500);
    const boyumBtn = await page.$('#boyum-partnership button');
    if (boyumBtn) {
      await boyumBtn.click();
      await wait(800);
      const modalBoyumPath = path.join(artifactDir, 'partners_05_boyum_modal.png');
      await page.screenshot({ path: modalBoyumPath });
      console.log(`Saved boyum modal screenshot: ${modalBoyumPath}`);
      // Close modal
      const closeBtn = await page.$('button[aria-label="Close dialog"]');
      if (closeBtn) await closeBtn.click();
      await wait(400);
    }

    // 6. Test Interactive SAP Modal
    const sapBtn = await page.$('#sap-partnership button');
    if (sapBtn) {
      await sapBtn.click();
      await wait(800);
      const modalSapPath = path.join(artifactDir, 'partners_06_sap_modal.png');
      await page.screenshot({ path: modalSapPath });
      console.log(`Saved SAP modal screenshot: ${modalSapPath}`);
    }

    console.log('Console errors encountered:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log(consoleErrors);
    }
  } catch (err) {
    console.error('Verification failed:', err);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {}
    }
    if (viteProcess) {
      try {
        viteProcess.kill();
      } catch (e) {}
    }
    process.exit(0);
  }
}

run();

