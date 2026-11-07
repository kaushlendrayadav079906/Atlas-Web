const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

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

const PORT = 4176;
server.listen(PORT, async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd';

    // 1. Service Detail 3 cards section
    console.log('Capturing 114_capabilities_3cards_perfect_alignment.png...');
    await page.goto(`http://localhost:${PORT}/services/sap-business-one`, { waitUntil: 'networkidle0' });
    const section = await page.$('#capabilities');
    if (section) {
      await section.screenshot({
        path: path.join(artifactDir, '114_capabilities_3cards_perfect_alignment.png')
      });
    }

    // 2. Home page top & navbar
    console.log('Capturing 115_homepage_full_light_blue_theme.png...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(artifactDir, '115_homepage_full_light_blue_theme.png'),
      clip: { x: 0, y: 0, width: 1440, height: 850 }
    });

    // 3. Footer with light blue gradient
    console.log('Capturing 116_footer_light_blue_gradient.png...');
    const footer = await page.$('footer');
    if (footer) {
      await footer.screenshot({
        path: path.join(artifactDir, '116_footer_light_blue_gradient.png')
      });
    }

    // 4. About page
    console.log('Capturing 117_about_page_light_theme.png...');
    await page.goto(`http://localhost:${PORT}/about`, { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(artifactDir, '117_about_page_light_theme.png'),
      clip: { x: 0, y: 0, width: 1440, height: 850 }
    });

    // 5. Contact page
    console.log('Capturing 118_contact_page_light_theme.png...');
    await page.goto(`http://localhost:${PORT}/contact`, { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(artifactDir, '118_contact_page_light_theme.png'),
      clip: { x: 0, y: 0, width: 1440, height: 850 }
    });

    await browser.close();
    console.log('All final verification screenshots captured successfully!');
  } catch (e) {
    console.error(e);
  } finally {
    server.close();
    process.exit(0);
  }
});

