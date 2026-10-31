const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
const userRef = path.join(artifactDir, '.user_uploaded', 'media_1793422870615_4eed803b.jpg');
const renderedPage = path.join(artifactDir, 'about_page_complete_verified.png');

async function main() {
  const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-compare-' + Date.now() + '-'));
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1800, height: 2400 });

  // Read images as base64
  const userRefB64 = fs.readFileSync(userRef).toString('base64');
  const renderedB64 = fs.readFileSync(renderedPage).toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 20px; background: #1e1e1e; font-family: sans-serif; color: white; }
        .container { display: flex; gap: 20px; }
        .col { flex: 1; }
        h2 { text-align: center; margin-bottom: 10px; }
        img { width: 100%; height: auto; border: 1px solid #444; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="col">
          <h2>User Mockup (Reference)</h2>
          <img src="data:image/jpeg;base64,${userRefB64}" />
        </div>
        <div class="col">
          <h2>Our Implemented Page (Rendered)</h2>
          <img src="data:image/png;base64,${renderedB64}" />
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({
    path: path.join(artifactDir, 'side_by_side_comparison.png'),
    fullPage: true
  });
  console.log('Saved side_by_side_comparison.png');

  await browser.close();
}

main().catch(console.error);

