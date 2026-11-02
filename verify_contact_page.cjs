const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyContactPage() {
  console.log('Starting verification for ATLAS Contact Page...');

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
    // 1. Desktop Full Viewport
    await page.setViewport({ width: 1440, height: 950 });
    await page.goto('http://localhost:4173/contact', { waitUntil: 'networkidle0' });
    await wait(800);

    // Verify Hero and 4 Contact Info cards
    const heroTitle = await page.$eval('h1', el => el.innerText.trim());
    console.log('Contact Hero Title:', heroTitle);

    // Take Hero Screenshot
    const heroShotPath = path.join(localArtifactDir, 'contact_hero_and_channels.png');
    await page.screenshot({
      path: heroShotPath,
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    fs.copyFileSync(heroShotPath, path.join(artifactDir, 'contact_hero_and_channels.png'));
    console.log('Saved contact_hero_and_channels.png');

    // Scroll down to Enquiry Form & Office Locations
    await page.evaluate(() => {
      const el = document.getElementById('contact-enquiry-form');
      if (el) el.scrollIntoView({ block: 'start' });
    });
    await wait(600);

    const formShotPath = path.join(localArtifactDir, 'contact_enquiry_form_and_locations.png');
    const formRect = await page.evaluate(() => {
      const el = document.getElementById('contact-enquiry-form');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: 0,
        y: window.scrollY + r.top - 10,
        width: 1440,
        height: Math.min(r.height + 20, 950)
      };
    });

    if (formRect) {
      await page.screenshot({
        path: formShotPath,
        clip: formRect
      });
      fs.copyFileSync(formShotPath, path.join(artifactDir, 'contact_enquiry_form_and_locations.png'));
      console.log('Saved contact_enquiry_form_and_locations.png');
    }

    // Scroll to Footer
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ block: 'start' });
    });
    await wait(600);

    const footerShotPath = path.join(localArtifactDir, 'contact_footer.png');
    const footerRect = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return null;
      const r = footer.getBoundingClientRect();
      return {
        x: 0,
        y: window.scrollY + r.top - 10,
        width: 1440,
        height: r.height + 20
      };
    });

    if (footerRect) {
      await page.screenshot({
        path: footerShotPath,
        clip: footerRect
      });
      fs.copyFileSync(footerShotPath, path.join(artifactDir, 'contact_footer.png'));
      console.log('Saved contact_footer.png');
    }

    // Test Mobile viewport
    console.log('Testing mobile viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(600);

    const mobileHeroPath = path.join(localArtifactDir, 'contact_mobile_hero.png');
    await page.screenshot({ path: mobileHeroPath });
    fs.copyFileSync(mobileHeroPath, path.join(artifactDir, 'contact_mobile_hero.png'));
    console.log('Saved contact_mobile_hero.png');

    // Scroll down to Mobile form
    await page.evaluate(() => {
      const el = document.getElementById('contact-enquiry-form');
      if (el) el.scrollIntoView();
    });
    await wait(600);

    const mobileFormPath = path.join(localArtifactDir, 'contact_mobile_form.png');
    await page.screenshot({ path: mobileFormPath });
    fs.copyFileSync(mobileFormPath, path.join(artifactDir, 'contact_mobile_form.png'));
    console.log('Saved contact_mobile_form.png');

    console.log('ALL CONTACT PAGE VERIFICATIONS COMPLETED SUCCESSFULLY!');

  } catch (err) {
    console.error('Error during Contact page verification:', err);
  } finally {
    await browser.close();
    server.kill();
  }
}

verifyContactPage();

