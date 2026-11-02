const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyScreenshots() {
  console.log('Starting verification server and Puppeteer...');

  const artifactDir = 'C:\\Users\\A\\.gemini\\antigravity\\brain\\de38c53a-2b32-47a9-9cdb-25ce692fa608';
  const localArtifactDir = path.join(__dirname, 'test_artifacts');
  if (!fs.existsSync(localArtifactDir)) {
    fs.mkdirSync(localArtifactDir, { recursive: true });
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

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 950 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    console.log('Page loaded successfully. Waiting for counters to animate...');
    await wait(2200);

    // Verify counter values are rendered
    const counterTexts = await page.evaluate(() => {
      const metricsSection = document.getElementById('metrics');
      if (!metricsSection) return [];
      return Array.from(metricsSection.querySelectorAll('.text-\\[32px\\]')).map(el => el.innerText.trim());
    });
    console.log('Animated counter final values:', counterTexts);

    // Click on "Services" nav button to open the dropdown
    console.log('Clicking "Services" navigation button...');
    const servicesBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('header nav button'));
      return buttons.find(b => b.innerText.includes('Services'));
    });

    if (servicesBtn) {
      await servicesBtn.click();
      await wait(500);
    }

    // Capture screenshot matching Reference 1 (Header + Open Dropdown + Hero + Animated Counters)
    const shot1Path = path.join(localArtifactDir, 'screenshot1_header_megamenu_hero.png');
    await page.screenshot({
      path: shot1Path,
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    fs.copyFileSync(shot1Path, path.join(artifactDir, 'screenshot1_header_megamenu_hero.png'));
    console.log('Captured screenshot1_header_megamenu_hero.png');

    // Close the dropdown by clicking outside or body
    await page.keyboard.press('Escape');
    await wait(300);

    // Scroll down to Services section & Authorized Technology Ecosystem
    console.log('Scrolling to Services section and Ecosystem slider...');
    await page.evaluate(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView();
      }
    });
    await wait(800);

    // Capture screenshot matching Reference 2 (Services 4 Cards + Authorized Technology Ecosystem slider)
    const servicesRect = await page.evaluate(() => {
      const s = document.getElementById('services');
      const p = document.getElementById('technology-partners-slider');
      if (!s || !p) return null;
      const sRect = s.getBoundingClientRect();
      const pRect = p.getBoundingClientRect();
      return {
        top: window.scrollY + sRect.top,
        height: (pRect.bottom - sRect.top) + 20
      };
    });

    if (servicesRect) {
      const shot2Path = path.join(localArtifactDir, 'screenshot2_services_and_ecosystem.png');
      await page.screenshot({
        path: shot2Path,
        clip: {
          x: 0,
          y: Math.max(0, servicesRect.top - 10),
          width: 1440,
          height: Math.min(servicesRect.height + 30, 950)
        }
      });
      fs.copyFileSync(shot2Path, path.join(artifactDir, 'screenshot2_services_and_ecosystem.png'));
      console.log('Captured screenshot2_services_and_ecosystem.png');
    }

    // Now test clicking on a submenu item to confirm navigation
    console.log('Testing submenu navigation...');
    // Re-open Services
    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(400);
    const servicesBtn2 = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('header nav button'));
      return buttons.find(b => b.innerText.includes('Services'));
    });
    await servicesBtn2.click();
    await wait(400);

    // Hover second item "Implementation"
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('[role="region"] button'));
      const impl = buttons.find(b => b.innerText.includes('Implementation'));
      if (impl) impl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    });
    await wait(400);

    // Capture "Implementation" selected state
    const shotImplPath = path.join(localArtifactDir, 'services_dropdown_implementation.png');
    await page.screenshot({
      path: shotImplPath,
      clip: { x: 0, y: 0, width: 1440, height: 750 }
    });
    fs.copyFileSync(shotImplPath, path.join(artifactDir, 'services_dropdown_implementation.png'));
    console.log('Captured services_dropdown_implementation.png');

    // Click on a submenu link to verify page transition
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('[role="region"] a'));
      if (links.length > 0) links[0].click();
    });
    await wait(600);
    console.log('URL after clicking subitem:', page.url());

    // Test Mobile viewport
    console.log('Testing mobile viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    await wait(500);

    // Open mobile menu drawer
    const hamburger = await page.$('button[aria-label="Toggle navigation menu"]');
    if (hamburger) {
      await hamburger.click();
      await wait(400);

      // Expand Services accordion
      const mobileServices = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll('.fixed button'));
        return btns.find(b => b.innerText.includes('Services'));
      });
      if (mobileServices) {
        await mobileServices.click();
        await wait(400);
      }

      const mobileShotPath = path.join(localArtifactDir, 'mobile_services_accordion_open.png');
      await page.screenshot({ path: mobileShotPath });
      fs.copyFileSync(mobileShotPath, path.join(artifactDir, 'mobile_services_accordion_open.png'));
      console.log('Captured mobile_services_accordion_open.png');
    }

    console.log('ALL SCREENSHOT AND VERIFICATION CHECKS COMPLETED!');

  } catch (err) {
    console.error('Error in verification:', err);
  } finally {
    await browser.close();
    server.kill();
  }
}

verifyScreenshots();

