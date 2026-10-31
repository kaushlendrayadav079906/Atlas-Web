const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
const userRef = path.resolve(__dirname, 'user_ref_crops', '01_header_hero.png');
const renderedHero = path.join(artifactDir, 'about_01_hero.png');

async function main() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hero-cmp-' + Date.now() + '-'));
  const browser = await puppeteer.launch({ headless: 'new', userDataDir: tempDir, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 800 });

  const uB64 = fs.readFileSync(userRef).toString('base64');
  const rB64 = fs.readFileSync(renderedHero).toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 20px; background: #1e1e1e; color: white; display: flex; gap: 20px;">
      <div style="flex: 1;">
        <h3>Mockup Reference Hero</h3>
        <img src="data:image/png;base64,${uB64}" style="width: 100%; border: 1px solid #555;" />
      </div>
      <div style="flex: 1;">
        <h3>Our Rendered Hero</h3>
        <img src="data:image/png;base64,${rB64}" style="width: 100%; border: 1px solid #555;" />
      </div>
    </body>
    </html>
  `, { waitUntil: 'load' });

  await page.screenshot({ path: path.join(artifactDir, 'inspect_hero_diff.png'), fullPage: true });
  console.log('Saved inspect_hero_diff.png');
  await browser.close();
}

main().catch(console.error);

