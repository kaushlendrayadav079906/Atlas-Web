const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
const userRef = path.join(artifactDir, '.user_uploaded', 'media_1793422870615_4eed803b.jpg');
const renderedPage = path.join(artifactDir, 'about_page_complete_verified.png');

async function main() {
  const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-slices-' + Date.now() + '-'));
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const userRefB64 = fs.readFileSync(userRef).toString('base64');
  const renderedB64 = fs.readFileSync(renderedPage).toString('base64');

  // Let's create an inspector page that allows cropping/viewing sections
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 20px; background: #0f172a; font-family: -apple-system, sans-serif; color: white; }
        .row { display: flex; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid #334155; padding-bottom: 20px; }
        .pane { flex: 1; overflow: hidden; background: #1e293b; border-radius: 8px; padding: 12px; }
        h3 { margin-top: 0; color: #38bdf8; font-size: 16px; }
        .crop-box { position: relative; width: 100%; overflow: hidden; background: white; border: 1px solid #475569; }
        .crop-box img { width: 100%; display: block; }
      </style>
    </head>
    <body>
      <h1>Detailed Section-by-Section Comparison</h1>
      
      <!-- Compare 1: Hero -->
      <div class="row">
        <div class="pane">
          <h3>User Reference — Hero</h3>
          <div class="crop-box" style="height: 340px;">
            <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -30px;" />
          </div>
        </div>
        <div class="pane">
          <h3>Our Rendered Page — Hero</h3>
          <div class="crop-box" style="height: 340px;">
            <img src="data:image/png;base64,${renderedB64}" style="margin-top: -65px;" />
          </div>
        </div>
      </div>

      <!-- Compare 2: Metrics -->
      <div class="row">
        <div class="pane">
          <h3>User Reference — Metrics</h3>
          <div class="crop-box" style="height: 120px;">
            <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -380px;" />
          </div>
        </div>
        <div class="pane">
          <h3>Our Rendered Page — Metrics</h3>
          <div class="crop-box" style="height: 120px;">
            <img src="data:image/png;base64,${renderedB64}" style="margin-top: -550px;" />
          </div>
        </div>
      </div>

      <!-- Compare 3: Story -->
      <div class="row">
        <div class="pane">
          <h3>User Reference — Story</h3>
          <div class="crop-box" style="height: 320px;">
            <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -510px;" />
          </div>
        </div>
        <div class="pane">
          <h3>Our Rendered Page — Story</h3>
          <div class="crop-box" style="height: 320px;">
            <img src="data:image/png;base64,${renderedB64}" style="margin-top: -720px;" />
          </div>
        </div>
      </div>

      <!-- Compare 4: Mission Vision Values -->
      <div class="row">
        <div class="pane">
          <h3>User Reference — MVV</h3>
          <div class="crop-box" style="height: 250px;">
            <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -850px;" />
          </div>
        </div>
        <div class="pane">
          <h3>Our Rendered Page — MVV</h3>
          <div class="crop-box" style="height: 250px;">
            <img src="data:image/png;base64,${renderedB64}" style="margin-top: -1250px;" />
          </div>
        </div>
      </div>

      <!-- Compare 5: Expertise -->
      <div class="row">
        <div class="pane">
          <h3>User Reference — Expertise</h3>
          <div class="crop-box" style="height: 340px;">
            <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -1110px;" />
          </div>
        </div>
        <div class="pane">
          <h3>Our Rendered Page — Expertise</h3>
          <div class="crop-box" style="height: 340px;">
            <img src="data:image/png;base64,${renderedB64}" style="margin-top: -1600px;" />
          </div>
        </div>
      </div>

      <!-- Compare 6: Industries -->
      <div class="row">
        <div class="pane">
          <h3>User Reference — Industries</h3>
          <div class="crop-box" style="height: 300px;">
            <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -1460px;" />
          </div>
        </div>
        <div class="pane">
          <h3>Our Rendered Page — Industries</h3>
          <div class="crop-box" style="height: 300px;">
            <img src="data:image/png;base64,${renderedB64}" style="margin-top: -2100px;" />
          </div>
        </div>
      </div>

      <!-- Compare 7: Why Choose & Journey -->
      <div class="row">
        <div class="pane">
          <h3>User Reference — Why Choose & Journey</h3>
          <div class="crop-box" style="height: 420px;">
            <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -1770px;" />
          </div>
        </div>
        <div class="pane">
          <h3>Our Rendered Page — Why Choose & Journey</h3>
          <div class="crop-box" style="height: 420px;">
            <img src="data:image/png;base64,${renderedB64}" style="margin-top: -2600px;" />
          </div>
        </div>
      </div>

      <!-- Compare 8: CTA & Footer -->
      <div class="row">
        <div class="pane">
          <h3>User Reference — CTA & Footer</h3>
          <div class="crop-box" style="height: 380px;">
            <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -2220px;" />
          </div>
        </div>
        <div class="pane">
          <h3>Our Rendered Page — CTA & Footer</h3>
          <div class="crop-box" style="height: 380px;">
            <img src="data:image/png;base64,${renderedB64}" style="margin-top: -3300px;" />
          </div>
        </div>
      </div>

    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({
    path: path.join(artifactDir, 'sections_comparison.png'),
    fullPage: true
  });
  console.log('Saved sections_comparison.png');

  await browser.close();
}

main().catch(console.error);

