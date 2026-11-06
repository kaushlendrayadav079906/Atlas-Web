const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const http = require('http');

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        resolve();
      }).on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timeout waiting for ${url}`));
        } else {
          setTimeout(check, 400);
        }
      });
    };
    check();
  });
}

(async () => {
  const viteCmd = path.resolve(__dirname, '../node_modules/.bin/vite.cmd');
  const server = spawn(viteCmd, ['preview', '--port', '4173', '--strictPort'], {
    shell: true,
    stdio: 'ignore'
  });

  try {
    console.log('Waiting for preview server on http://localhost:4173...');
    await waitForServer('http://localhost:4173');
    console.log('Server is up!');

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ptemp-gold-'));
    const browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tmpDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';

    // 1. Home page navbar
    console.log('Navigating to http://localhost:4173...');
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    // Capture navbar with gold button & active "Home"
    const headerEl = await page.$('header');
    if (headerEl) {
      await headerEl.screenshot({ path: path.join(artifactDir, '81_navbar_gold_button_and_active.png') });
      console.log('Saved 81_navbar_gold_button_and_active.png');
    }

    // 2. Open Services MegaMenu
    console.log('Opening Services MegaMenu...');
    const servicesNavBtn = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll('header nav a, header nav button'));
      return links.find(el => el.textContent.trim().startsWith('Services'));
    });
    if (servicesNavBtn) {
      await servicesNavBtn.hover();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: path.join(artifactDir, '82_services_megamenu_gold.png'), clip: { x: 0, y: 0, width: 1440, height: 600 } });
      console.log('Saved 82_services_megamenu_gold.png');
    }

    // 3. Open Solutions MegaMenu
    console.log('Opening Solutions MegaMenu...');
    const solutionsNavBtn = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll('header nav a, header nav button'));
      return links.find(el => el.textContent.trim().startsWith('Solutions'));
    });
    if (solutionsNavBtn) {
      await solutionsNavBtn.hover();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: path.join(artifactDir, '83_solutions_megamenu_gold.png'), clip: { x: 0, y: 0, width: 1440, height: 600 } });
      console.log('Saved 83_solutions_megamenu_gold.png');
    }

    // Move mouse away to close megamenu
    await page.mouse.move(10, 10);
    await new Promise(r => setTimeout(r, 400));

    // 4. Scroll to Approach section ("lasting success")
    console.log('Scrolling to Approach section...');
    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('lasting success'));
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(artifactDir, '84_section_lasting_success_gold.png') });
    console.log('Saved 84_section_lasting_success_gold.png');

    // 5. Navigate to /blog to check Category Filter ("All 8")
    console.log('Navigating to http://localhost:4173/blog...');
    await page.goto('http://localhost:4173/blog', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200));

    // Scroll to category filter
    await page.evaluate(() => {
      const filter = document.querySelector('button[type="button"]');
      if (filter) filter.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, '85_blog_category_filter_gold.png') });
    console.log('Saved 85_blog_category_filter_gold.png');

    await browser.close();
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (_) {}
    console.log('Finished all screenshots!');
  } finally {
    try {
      process.kill(-server.pid);
    } catch (_) {
      try {
        server.kill();
      } catch (__) {}
    }
  }
})();
