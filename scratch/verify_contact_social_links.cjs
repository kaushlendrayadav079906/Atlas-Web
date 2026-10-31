const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const distDir = path.resolve(__dirname, '..', 'dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].split('#')[0];
  let filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

async function run() {
  const port = 4205;
  await new Promise((resolve) => server.listen(port, resolve));
  console.log(`Test server running on http://127.0.0.1:${port}`);

  const userDataDir = path.join(os.tmpdir(), 'test_profile_social_' + Date.now());
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    console.log('\n======================================================');
    console.log('1. VERIFY FOOTER SOCIAL ICONS ORDER & LINKS');
    console.log('======================================================');

    const footer = await page.$('footer');
    if (!footer) throw new Error('Footer not found');
    await footer.scrollIntoView();
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

    const socialLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('footer .flex.items-center.gap-3.pt-2 a'));
      return links.map((a) => ({
        ariaLabel: a.getAttribute('aria-label'),
        href: a.getAttribute('href'),
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel'),
        hasSvg: !!a.querySelector('svg'),
        svgHtml: a.querySelector('svg')?.outerHTML?.slice(0, 80)
      }));
    });

    console.log('Detected Footer Social Links:', socialLinks);

    if (socialLinks.length !== 3) {
      throw new Error(`Expected exactly 3 social links in footer, found ${socialLinks.length}`);
    }

    // 1. LinkedIn
    const linkedIn = socialLinks[0];
    if (linkedIn.ariaLabel !== 'LinkedIn') throw new Error(`Expected item 1 to be LinkedIn, got ${linkedIn.ariaLabel}`);
    if (linkedIn.href !== 'https://www.linkedin.com/company/atlas-technosoft-pvt-ltd/') {
      throw new Error(`LinkedIn href mismatch! Got: ${linkedIn.href}`);
    }
    if (linkedIn.target !== '_blank' || !linkedIn.rel.includes('noopener')) {
      throw new Error('LinkedIn link missing target="_blank" or rel="noopener noreferrer"');
    }
    console.log('PASS 1: LinkedIn link and target verified:', linkedIn.href);

    // 2. WhatsApp
    const whatsApp = socialLinks[1];
    if (whatsApp.ariaLabel !== 'WhatsApp') throw new Error(`Expected item 2 to be WhatsApp, got ${whatsApp.ariaLabel}`);
    const expectedWhatsAppUrl = 'https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20book%20a%20consultation.';
    if (whatsApp.href !== expectedWhatsAppUrl) {
      throw new Error(`WhatsApp href mismatch! Got: ${whatsApp.href}`);
    }
    if (whatsApp.target !== '_blank' || !whatsApp.rel.includes('noopener')) {
      throw new Error('WhatsApp link missing target="_blank" or rel="noopener noreferrer"');
    }
    console.log('PASS 2: WhatsApp link and target verified:', whatsApp.href);

    // 3. X (Twitter)
    const xTwitter = socialLinks[2];
    if (!xTwitter.ariaLabel.includes('X') && !xTwitter.ariaLabel.includes('Twitter')) {
      throw new Error(`Expected item 3 to be X (Twitter), got ${xTwitter.ariaLabel}`);
    }
    if (xTwitter.href !== 'https://x.com/atlastechnosoft') {
      throw new Error(`X (Twitter) href mismatch! Got: ${xTwitter.href}`);
    }
    if (xTwitter.target !== '_blank' || !xTwitter.rel.includes('noopener')) {
      throw new Error('X (Twitter) link missing target="_blank" or rel="noopener noreferrer"');
    }
    console.log('PASS 3: X (Twitter) link and target verified:', xTwitter.href);

    // Verify YouTube is REMOVED
    const hasYouTube = await page.evaluate(() => {
      const allFooterLinks = Array.from(document.querySelectorAll('footer a'));
      return allFooterLinks.some((a) => (a.getAttribute('href') || '').includes('youtube.com') || (a.getAttribute('aria-label') || '').toLowerCase().includes('youtube'));
    });
    if (hasYouTube) {
      throw new Error('YouTube icon was NOT removed from footer!');
    }
    console.log('PASS 4: YouTube icon is completely removed from footer!');

    // Screenshot of Footer Social Icons
    const socialContainer = await page.$('footer .flex.items-center.gap-3.pt-2');
    if (socialContainer) {
      await socialContainer.screenshot({ path: path.join(artifactDir, 'footer_social_icons_verified.png') });
      console.log('Saved footer_social_icons_verified.png');
    }

    console.log('\n======================================================');
    console.log('2. VERIFY FOOTER CONTACT US PHONE NUMBER (WHATSAPP)');
    console.log('======================================================');

    const footerPhone = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('footer ul a'));
      const phoneLink = links.find((a) => a.textContent.includes('9372329599'));
      if (!phoneLink) return null;
      return {
        text: phoneLink.textContent.trim(),
        href: phoneLink.getAttribute('href'),
        target: phoneLink.getAttribute('target'),
        rel: phoneLink.getAttribute('rel')
      };
    });

    console.log('Footer Contact Phone:', footerPhone);
    if (!footerPhone) throw new Error('Footer phone link with 9372329599 not found');
    if (footerPhone.href !== expectedWhatsAppUrl) {
      throw new Error(`Footer phone href mismatch! Expected ${expectedWhatsAppUrl}, got ${footerPhone.href}`);
    }
    if (footerPhone.target !== '_blank' || !footerPhone.rel.includes('noopener')) {
      throw new Error('Footer phone link missing target="_blank" or rel="noopener noreferrer"');
    }
    if (footerPhone.text !== '+91-9372329599') {
      throw new Error(`Expected phone text "+91-9372329599", got "${footerPhone.text}"`);
    }
    console.log('PASS 5: Footer Contact Us phone number correctly opens WhatsApp in new tab!');

    console.log('\n======================================================');
    console.log('3. VERIFY CONTACT PAGE (/contact) PHONE NUMBER');
    console.log('======================================================');
    await page.goto(`http://127.0.0.1:${port}/contact`, { waitUntil: 'networkidle0' });

    const contactPagePhone = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('section a'));
      const phoneLink = links.find((a) => a.textContent.includes('9372329599'));
      if (!phoneLink) return null;
      return {
        text: phoneLink.textContent.trim(),
        href: phoneLink.getAttribute('href'),
        target: phoneLink.getAttribute('target'),
        rel: phoneLink.getAttribute('rel')
      };
    });

    console.log('Contact Page Phone Card Link:', contactPagePhone);
    if (!contactPagePhone) throw new Error('Contact Page phone link not found');
    if (contactPagePhone.href !== expectedWhatsAppUrl) {
      throw new Error(`Contact Page phone href mismatch! Expected ${expectedWhatsAppUrl}, got ${contactPagePhone.href}`);
    }
    if (contactPagePhone.target !== '_blank' || !contactPagePhone.rel.includes('noopener')) {
      throw new Error('Contact Page phone link missing target="_blank" or rel="noopener noreferrer"');
    }
    console.log('PASS 6: Contact Page Get In Touch phone link correctly opens WhatsApp in new tab!');

    console.log('\n======================================================');
    console.log('4. VERIFY CTA CONTACT CARDS PHONE LINK');
    console.log('======================================================');
    await page.goto(`http://127.0.0.1:${port}/services`, { waitUntil: 'networkidle0' });
    const ctaPhone = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const phoneLink = links.find((a) => a.textContent.includes('9372329599'));
      if (!phoneLink) return null;
      return {
        text: phoneLink.textContent.trim(),
        href: phoneLink.getAttribute('href'),
        target: phoneLink.getAttribute('target'),
        rel: phoneLink.getAttribute('rel')
      };
    });

    console.log('CTA Phone Card Link:', ctaPhone);
    if (!ctaPhone) throw new Error('CTA phone link not found on /services');
    if (ctaPhone.href !== expectedWhatsAppUrl) {
      throw new Error(`CTA phone href mismatch! Expected ${expectedWhatsAppUrl}, got ${ctaPhone.href}`);
    }
    if (ctaPhone.target !== '_blank' || !ctaPhone.rel.includes('noopener')) {
      throw new Error('CTA phone link missing target="_blank"');
    }
    console.log('PASS 7: CTA Contact Cards phone link correctly opens WhatsApp in new tab!');

    // Screenshot of whole footer at 1440px
    const fullFooter = await page.$('footer');
    if (fullFooter) {
      await fullFooter.screenshot({ path: path.join(artifactDir, 'footer_full_verified.png') });
      console.log('Saved footer_full_verified.png');
    }

    console.log('\n======================================================');
    console.log('5. CONSOLE ERROR AUDIT');
    console.log('======================================================');
    console.log('Total console errors:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      throw new Error(`Console errors detected: ${consoleErrors.join(', ')}`);
    }
    console.log('PASS 8: Zero console errors!');

    console.log('\n======================================================');
    console.log('ALL SOCIAL & CONTACT LINK TESTS PASSED WITH 100% SUCCESS!');
    console.log('======================================================');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});

