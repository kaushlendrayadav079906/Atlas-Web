const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
const userRef = path.join(artifactDir, '.user_uploaded', 'media_1793422870615_4eed803b.jpg');
const outDir = path.resolve(__dirname, 'user_ref_crops');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'crops-' + Date.now() + '-'));
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 449, height: 1024, deviceScaleFactor: 2 });
  const b64 = fs.readFileSync(userRef).toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background: white;">
      <img src="data:image/jpeg;base64,${b64}" style="width: 449px; display: block;" />
    </body>
    </html>
  `, { waitUntil: 'load' });

  const crops = [
    { name: '01_header_hero.png', y: 0, height: 160 },
    { name: '02_metrics.png', y: 155, height: 48 },
    { name: '03_story.png', y: 200, height: 130 },
    { name: '04_mvv.png', y: 325, height: 95 },
    { name: '05_expertise.png', y: 420, height: 140 },
    { name: '06_industries.png', y: 555, height: 115 },
    { name: '07_why_choose.png', y: 668, height: 95 },
    { name: '08_journey.png', y: 760, height: 80 },
    { name: '09_cta.png', y: 838, height: 70 },
    { name: '10_footer.png', y: 900, height: 124 }
  ];

  for (const c of crops) {
    await page.screenshot({
      path: path.join(outDir, c.name),
      clip: { x: 0, y: c.y, width: 449, height: c.height }
    });
    console.log('Saved', c.name);
  }

  await browser.close();
}

main().catch(console.error);

