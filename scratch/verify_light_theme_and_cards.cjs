const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Simple static server for dist/
const distDir = path.resolve('dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end('Error loading file');
  }
});

const PORT = 4173;
server.listen(PORT, async () => {
  console.log(`Preview server running at http://localhost:${PORT}`);

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';

    // 1. Verify 3-card UI on Service Detail Page
    console.log('Navigating to Service Detail Page (/services/sap-business-one)...');
    await page.goto(`http://localhost:${PORT}/services/sap-business-one`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.scrollTo(0, 1100));
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(artifactDir, '108_service_detail_3cards_corrected.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Captured 108_service_detail_3cards_corrected.png');

    // 2. Capture Home Page Hero & Navbar
    console.log('Navigating to Home Page (/)...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({
      path: path.join(artifactDir, '109_home_light_theme_hero.png'),
      clip: { x: 0, y: 0, width: 1440, height: 850 }
    });
    console.log('Captured 109_home_light_theme_hero.png');

    // 3. Capture Home Page Expertise & Approach
    await page.evaluate(() => window.scrollTo(0, 1500));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(artifactDir, '110_home_expertise_light_blue.png'),
      clip: { x: 0, y: 0, width: 1440, height: 850 }
    });
    console.log('Captured 110_home_expertise_light_blue.png');

    // 4. Capture Footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(artifactDir, '111_footer_light_blue_theme.png'),
      clip: { x: 0, y: 0, width: 1440, height: 700 }
    });
    console.log('Captured 111_footer_light_blue_theme.png');

    // 5. Capture Contact Page
    console.log('Navigating to Contact Page (/contact)...');
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({
      path: path.join(artifactDir, '112_contact_page_light_theme.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Captured 112_contact_page_light_theme.png');

    await browser.close();
    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Error taking screenshots:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});

