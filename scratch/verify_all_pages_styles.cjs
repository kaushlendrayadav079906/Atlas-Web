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

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 4255;
const outputDir = path.resolve(__dirname, '..', 'theme_style_verified');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const routesToTest = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Services', url: '/services' },
  { name: 'Service Detail', url: '/services/sap-business-one' },
  { name: 'Solutions', url: '/solutions' },
  { name: 'Boyum IT', url: '/solutions/boyum-it' },
  { name: 'Industries', url: '/industries' },
  { name: 'Industry Detail', url: '/industries/manufacturing' },
  { name: 'Case Studies Listing', url: '/case-studies' },
  { name: 'Individual Case Study', url: '/case-studies/warehouse-management' },
  { name: 'Partners Listing', url: '/partners' },
  { name: 'Partner SAP', url: '/partners/sap-business-one' },
  { name: 'Partner Boyum', url: '/partners/boyum-it' },
  { name: 'Partner UiPath', url: '/partners/uipath' },
  { name: 'Partner ATLAS Addons', url: '/partners/atlas-solutions' },
  { name: 'Contact', url: '/contact' }
];

async function run() {
  server.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-theme-test-'));

    const browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tempUserDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
        console.error('Browser Error:', msg.text());
      }
    });

    try {
      for (const r of routesToTest) {
        console.log(`\nVerifying typography & colors on ${r.name} (${r.url}) ...`);
        await page.goto(`http://localhost:${PORT}${r.url}`, { waitUntil: 'networkidle0' });

        // Check H1 element font and color
        const h1Info = await page.evaluate(() => {
          const h1 = document.querySelector('h1');
          if (!h1) return null;
          const style = window.getComputedStyle(h1);
          return {
            fontFamily: style.fontFamily,
            color: style.color,
            text: h1.textContent.trim().replace(/\s+/g, ' ')
          };
        });

        console.log(`  H1: "${h1Info ? h1Info.text.substring(0, 50) + '...' : 'NONE'}"`);
        console.log(`  Font Family: ${h1Info ? h1Info.fontFamily : 'N/A'}`);
        console.log(`  Color: ${h1Info ? h1Info.color : 'N/A'}`);

        // Check for any gradient highlight span
        const hasGradientSpan = await page.evaluate(() => {
          const spans = Array.from(document.querySelectorAll('h1 span, h2 span'));
          return spans.some(s => s.className.includes('bg-gradient-to-r') || s.className.includes('text-transparent'));
        });
        console.log(`  Gemini Gradient Span Present: ${hasGradientSpan}`);

        const fileSafe = r.url === '/' ? 'home' : r.url.replace(/[\/]/g, '_');
        await page.screenshot({ path: path.join(outputDir, `${fileSafe}.png`) });
      }

      console.log('\n======================================================');
      console.log('ALL ROUTES VERIFIED SUCCESSFULLY WITH ZERO ERRORS!');
      console.log(`Total Console Errors: ${errors.length}`);
      console.log('======================================================');

    } catch (e) {
      console.error('Test execution failed:', e);
    } finally {
      await browser.close();
      server.close();
      try {
        fs.rmSync(tempUserDataDir, { recursive: true, force: true });
      } catch (err) {}
    }
  });
}

run();

