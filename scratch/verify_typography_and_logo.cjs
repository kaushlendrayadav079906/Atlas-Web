const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Simple static server for dist/
const distDir = path.resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end('Error loading file');
  }
});

const PORT = 4180;
const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';
const USER_DATA_DIR = path.join(__dirname, 'chrome_logo_' + Date.now());

server.listen(PORT, async () => {
  console.log(`Static server running on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: USER_DATA_DIR,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 950 });

    // 1. Header with enlarged logo and 16-17px navigation
    console.log('Navigating to homepage for Header inspection...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('header');

    // Take screenshot of Header
    const headerClip = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const rect = header.getBoundingClientRect();
      return { x: 0, y: 0, width: 1440, height: Math.max(120, Math.ceil(rect.bottom) + 20) };
    });

    await page.screenshot({
      path: path.join(artifactDir, '86_header_enlarged_logo_and_nav.png'),
      clip: headerClip || { x: 0, y: 0, width: 1440, height: 130 }
    });
    console.log('Saved 86_header_enlarged_logo_and_nav.png');

    // 2. Open Services MegaMenu to inspect enlarged labels and descriptions
    console.log('Hovering Services for MegaMenu inspection...');
    const servicesNav = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll('header nav a'));
      return links.find(el => el.textContent.includes('Services'));
    });
    if (servicesNav) {
      await servicesNav.hover();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(artifactDir, '87_header_megamenu_labels_and_desc.png'),
        clip: { x: 0, y: 0, width: 1440, height: 620 }
      });
      console.log('Saved 87_header_megamenu_labels_and_desc.png');
    }

    // 3. Scroll to Footer to inspect enlarged logo and increased text size
    console.log('Scrolling to Footer...');
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    const footerClip = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return null;
      const rect = footer.getBoundingClientRect();
      return {
        x: 0,
        y: Math.max(0, Math.floor(window.scrollY + rect.top)),
        width: 1440,
        height: Math.ceil(rect.height)
      };
    });

    if (footerClip) {
      await page.screenshot({
        path: path.join(artifactDir, '88_footer_enlarged_logo_and_typography.png'),
        clip: footerClip
      });
      console.log('Saved 88_footer_enlarged_logo_and_typography.png');
    }

    // 4. Contact Page: Hero & Communication Channels
    console.log('Navigating to Contact Page...');
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({
      path: path.join(artifactDir, '89_contact_hero_and_channel_cards.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1100 }
    });
    console.log('Saved 89_contact_hero_and_channel_cards.png');

    // 5. Contact Page: Enquiry Form & Office Locations
    await page.evaluate(() => {
      const form = document.querySelector('#contact-enquiry-form');
      if (form) form.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    const formClip = await page.evaluate(() => {
      const form = document.querySelector('#contact-enquiry-form');
      if (!form) return null;
      const rect = form.getBoundingClientRect();
      return {
        x: 0,
        y: Math.max(0, Math.floor(window.scrollY + rect.top)),
        width: 1440,
        height: Math.min(1150, Math.ceil(rect.height))
      };
    });

    if (formClip) {
      await page.screenshot({
        path: path.join(artifactDir, '90_contact_enquiry_form_and_offices.png'),
        clip: formClip
      });
      console.log('Saved 90_contact_enquiry_form_and_offices.png');
    }

    // 6. Mobile view (390px)
    console.log('Switching to mobile viewport 390x844...');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({
      path: path.join(artifactDir, '91_contact_mobile_hero.png'),
      clip: { x: 0, y: 0, width: 390, height: 780 }
    });
    console.log('Saved 91_contact_mobile_hero.png');

    // Scroll to mobile footer
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 500));

    const mobileFooterClip = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return null;
      const rect = footer.getBoundingClientRect();
      return {
        x: 0,
        y: Math.max(0, Math.floor(window.scrollY + rect.top)),
        width: 390,
        height: Math.ceil(rect.height)
      };
    });

    if (mobileFooterClip) {
      await page.screenshot({
        path: path.join(artifactDir, '92_mobile_footer.png'),
        clip: mobileFooterClip
      });
      console.log('Saved 92_mobile_footer.png');
    }

  } catch (err) {
    console.error('Error capturing screenshots:', err);
  } finally {
    await browser.close();
    server.close();
    console.log('Closed browser and server.');
    process.exit(0);
  }
});
