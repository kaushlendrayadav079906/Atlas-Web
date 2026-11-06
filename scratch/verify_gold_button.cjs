const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('os');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const artifactDir = 'C:\\Users\\A\\.gemini\\antigravity\\brain\\bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';
  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
    shell: true,
    stdio: 'pipe',
  });

  await wait(3000);

  const tmpDir = fs.tmpdir() + '\\ptemp_btn_' + Date.now();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    userDataDir: tmpDir
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    await wait(500);

    // Capture navbar screenshot
    const navbarShot = path.join(artifactDir, '77_navbar_gold_button.png');
    const header = await page.$('header');
    if (header) {
      await header.screenshot({ path: navbarShot });
      console.log(`Saved navbar screenshot: ${navbarShot}`);
    } else {
      await page.screenshot({ path: navbarShot });
    }

    // Inspect colors of the button
    const btnStyles = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('header a, header button'));
      const btn = links.find(el => el.textContent.includes('Book a Consultation'));
      if (!btn) return null;
      const comp = window.getComputedStyle(btn);
      return {
        bgColor: comp.backgroundColor,
        color: comp.color,
        text: btn.textContent.trim()
      };
    });
    console.log('Book a Consultation button computed styles:', btnStyles);

  } finally {
    await browser.close();
    server.kill();
  }
}

run();

