const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
const f1 = path.join(artifactDir, '.user_uploaded', 'media_1793421580001_84e60bba.jpg');
const f2 = path.join(artifactDir, '.user_uploaded', 'media_1793422870615_4eed803b.jpg');

async function main() {
  const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-diffview-' + Date.now() + '-'));
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1200 });

  const b1 = fs.readFileSync(f1).toString('base64');
  const b2 = fs.readFileSync(f2).toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; background: #222; display: flex; gap: 10px; padding: 10px;">
      <div style="flex: 1;">
        <h3 style="color: white; text-align: center;">Upload 1 (Previous)</h3>
        <img src="data:image/jpeg;base64,${b1}" style="width: 100%;" />
      </div>
      <div style="flex: 1;">
        <h3 style="color: white; text-align: center;">Upload 2 (Current)</h3>
        <img src="data:image/jpeg;base64,${b2}" style="width: 100%;" />
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({
    path: path.join(artifactDir, 'upload1_vs_upload2.png'),
    fullPage: true
  });
  console.log('Saved upload1_vs_upload2.png');

  await browser.close();
}

main().catch(console.error);

