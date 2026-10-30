const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Simple static server for dist
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
    // SPA fallback
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error: ' + err.code);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 4178;
server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';

  let browser;
  try {
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-contact-'));
    browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tempUserDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // 1. Desktop full & hero
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Hero screenshot
    await page.screenshot({
      path: path.join(artifactDir, 'contact_01_desktop_hero.png'),
      clip: { x: 0, y: 0, width: 1440, height: 750 }
    });
    console.log('Saved contact_01_desktop_hero.png');

    // Full page screenshot
    await page.screenshot({
      path: path.join(artifactDir, 'contact_02_desktop_full.png'),
      fullPage: true
    });
    console.log('Saved contact_02_desktop_full.png');

    // 2. Tablet view
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(artifactDir, 'contact_03_tablet_768px.png'),
      fullPage: true
    });
    console.log('Saved contact_03_tablet_768px.png');

    // 3. Mobile view
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(artifactDir, 'contact_04_mobile_375px.png'),
      fullPage: true
    });
    console.log('Saved contact_04_mobile_375px.png');

    // 4. Form validation & interaction test
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/contact#contact-form`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    // Click submit without entering anything to test validation
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({
        path: path.join(artifactDir, 'contact_05_form_validation.png'),
        clip: { x: 100, y: 650, width: 1240, height: 700 }
      });
      console.log('Saved contact_05_form_validation.png');
    }

    // Now fill the form
    await page.type('#fullName', 'Aditya Mehta');
    await page.type('#email', 'aditya.mehta@example.com');
    await page.type('#phone', '+91 98765 43210');
    await page.select('#subject', 'sap-b1');
    await page.type('#message', 'We are looking to implement SAP Business One ERP with warehouse management across two manufacturing facilities in Mumbai.');
    
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(artifactDir, 'contact_06_form_success.png'),
      clip: { x: 100, y: 650, width: 1240, height: 600 }
    });
    console.log('Saved contact_06_form_success.png');

    // 5. Modal open
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 300));
    // Click "Book a Consultation" in hero
    const consultBtns = await page.$$('button');
    for (const b of consultBtns) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text.includes('Book a Consultation')) {
        await b.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(artifactDir, 'contact_07_consultation_modal.png')
    });
    console.log('Saved contact_07_consultation_modal.png');

  } catch (err) {
    console.error('Puppeteer verification failed:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    console.log('Verification finished, server closed.');
  }
});

