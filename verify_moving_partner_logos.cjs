const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyPartnerLogos() {
  console.log('Starting verification server for Moving Partner Logos...');

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
    // Desktop Viewport
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    await wait(1000);

    // Scroll to the moving partner logo section
    await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (slider) slider.scrollIntoView({ block: 'center' });
    });
    await wait(600);

    // Verify card content
    const cardData = await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (!slider) return [];
      const links = Array.from(slider.querySelectorAll('.animate-marquee-left:first-child a'));
      return links.map(link => {
        const nameEl = link.querySelector('.font-bold');
        const badgeEl = link.querySelector('.text-slate-500');
        return {
          title: link.getAttribute('title'),
          name: nameEl?.innerText.trim(),
          badge: badgeEl?.innerText.trim(),
        };
      });
    });

    console.log('Extracted Logo Cards:', JSON.stringify(cardData, null, 2));

    // Capture desktop screenshot of the section (Services + Logo Marquee)
    const clipRect = await page.evaluate(() => {
      const services = document.getElementById('services');
      const slider = document.getElementById('technology-partners-slider');
      if (!slider) return null;
      const sRect = services ? services.getBoundingClientRect() : slider.getBoundingClientRect();
      const pRect = slider.getBoundingClientRect();
      return {
        x: 0,
        y: Math.max(0, window.scrollY + sRect.top + 300),
        width: 1440,
        height: Math.min(650, window.innerHeight)
      };
    });

    // Capture focused screenshot of the Moving Partner Logos section
    const partnerRect = await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (!slider) return null;
      const r = slider.getBoundingClientRect();
      return {
        x: 0,
        y: window.scrollY + r.top - 20,
        width: 1440,
        height: r.height + 40
      };
    });

    if (partnerRect) {
      const focusedShotPath = path.join(localArtifactDir, 'moving_partner_logos_desktop.png');
      await page.screenshot({
        path: focusedShotPath,
        clip: partnerRect
      });
      fs.copyFileSync(focusedShotPath, path.join(artifactDir, 'moving_partner_logos_desktop.png'));
      console.log('Saved moving_partner_logos_desktop.png');
    }

    // Capture combined view (Services Cards + Moving Partner Logos)
    const combinedShotPath = path.join(localArtifactDir, 'services_and_moving_partner_logos.png');
    await page.evaluate(() => {
      const s = document.getElementById('services');
      if (s) s.scrollIntoView({ block: 'start' });
    });
    await wait(600);

    const fullRect = await page.evaluate(() => {
      const s = document.getElementById('services');
      const slider = document.getElementById('technology-partners-slider');
      if (!s || !slider) return null;
      const sR = s.getBoundingClientRect();
      const pR = slider.getBoundingClientRect();
      return {
        x: 0,
        y: window.scrollY + sR.top,
        width: 1440,
        height: Math.min(pR.bottom - sR.top + 10, 950)
      };
    });

    if (fullRect) {
      await page.screenshot({
        path: combinedShotPath,
        clip: fullRect
      });
      fs.copyFileSync(combinedShotPath, path.join(artifactDir, 'services_and_moving_partner_logos.png'));
      console.log('Saved services_and_moving_partner_logos.png');
    }

    // Test Mobile viewport (390x844)
    await page.setViewport({ width: 390, height: 844 });
    await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (slider) slider.scrollIntoView({ block: 'center' });
    });
    await wait(600);

    const mobileRect = await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (!slider) return null;
      const r = slider.getBoundingClientRect();
      return {
        x: 0,
        y: window.scrollY + r.top - 10,
        width: 390,
        height: r.height + 20
      };
    });

    if (mobileRect) {
      const mobileShotPath = path.join(localArtifactDir, 'moving_partner_logos_mobile.png');
      await page.screenshot({
        path: mobileShotPath,
        clip: mobileRect
      });
      fs.copyFileSync(mobileShotPath, path.join(artifactDir, 'moving_partner_logos_mobile.png'));
      console.log('Saved moving_partner_logos_mobile.png');
    }

    console.log('ALL MOVING PARTNER LOGO CHECKS PASSED!');

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
    server.kill();
  }
}

verifyPartnerLogos();

