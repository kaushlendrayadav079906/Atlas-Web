const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
const cropsDir = path.resolve(__dirname, 'user_ref_crops');

async function main() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inspect-crops-' + Date.now() + '-'));
  const browser = await puppeteer.launch({ headless: 'new', userDataDir: tempDir, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1200 });

  const crops = fs.readdirSync(cropsDir).filter(f => f.endsWith('.png'));
  console.log('Available crops:', crops);

  // Let's create an HTML displaying all crops in full width
  const itemsHtml = crops.map(c => {
    const b64 = fs.readFileSync(path.join(cropsDir, c)).toString('base64');
    return `
      <div style="margin-bottom: 30px; border: 2px solid #3b82f6; border-radius: 8px; overflow: hidden; background: white;">
        <div style="background: #1e293b; color: white; padding: 6px 12px; font-size: 14px; font-weight: bold;">${c}</div>
        <img src="data:image/png;base64,${b64}" style="width: 100%; display: block;" />
      </div>
    `;
  }).join('');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 20px; background: #0f172a; font-family: sans-serif;">
      <h1 style="color: white; margin-bottom: 20px;">Reference Mockup Crops</h1>
      ${itemsHtml}
    </body>
    </html>
  `, { waitUntil: 'load' });

  await page.screenshot({ path: path.join(artifactDir, 'all_user_crops_preview.png'), fullPage: true });
  console.log('Saved all_user_crops_preview.png');
  await browser.close();
}

main().catch(console.error);

