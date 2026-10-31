const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
const userRef = path.join(artifactDir, '.user_uploaded', 'media_1793422870615_4eed803b.jpg');
const renderedPage = path.join(artifactDir, 'about_page_complete_verified.png');

async function main() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'slice-check-' + Date.now() + '-'));
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 1000 });

  const userRefB64 = fs.readFileSync(userRef).toString('base64');
  const renderedB64 = fs.readFileSync(renderedPage).toString('base64');

  // Let's create an HTML that displays each section side by side at large scale
  const sections = [
    { title: '1. Header & Hero', userTop: 0, userHeight: 155, rendTop: 0, rendHeight: 600 },
    { title: '2. Metrics Bar', userTop: 155, userHeight: 50, rendTop: 580, rendHeight: 240 },
    { title: '3. Our Story', userTop: 205, userHeight: 125, rendTop: 820, rendHeight: 460 },
    { title: '4. Mission, Vision, Values', userTop: 330, userHeight: 95, rendTop: 1280, rendHeight: 380 },
    { title: '5. Our Expertise', userTop: 425, userHeight: 135, rendTop: 1660, rendHeight: 460 },
    { title: '6. Industries We Serve', userTop: 560, userHeight: 115, rendTop: 2120, rendHeight: 440 },
    { title: '7. Why Choose ATLAS', userTop: 675, userHeight: 95, rendTop: 2560, rendHeight: 380 },
    { title: '8. Key Milestones Journey', userTop: 770, userHeight: 80, rendTop: 2940, rendHeight: 340 },
    { title: '9. Contact CTA & Footer', userTop: 850, userHeight: 174, rendTop: 3280, rendHeight: 700 },
  ];

  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 20px; background: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: white; }
          .container { display: flex; gap: 30px; }
          .card { flex: 1; background: #1e293b; border-radius: 12px; padding: 16px; border: 1px solid #334155; }
          h2 { margin: 0 0 12px; font-size: 18px; color: #38bdf8; }
          .img-wrap { width: 100%; overflow: hidden; background: white; border-radius: 8px; border: 2px solid #64748b; }
          .img-wrap img { width: 100%; display: block; }
        </style>
      </head>
      <body>
        <h1 style="margin: 0 0 20px; font-size: 22px;">Section ${i + 1}: ${s.title}</h1>
        <div class="container">
          <div class="card">
            <h2>User Mockup Reference (Target)</h2>
            <div class="img-wrap" style="height: 500px;">
              <img src="data:image/jpeg;base64,${userRefB64}" style="margin-top: -${s.userTop * (1024 / 1024) * 2.5}px; transform: scale(2.5); transform-origin: top left; width: 449px;" />
            </div>
          </div>
          <div class="card">
            <h2>Our Rendered Implementation (Current)</h2>
            <div class="img-wrap" style="height: 500px;">
              <img src="data:image/png;base64,${renderedB64}" style="margin-top: -${s.rendTop}px;" />
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'load' });
    const outName = `compare_sec_${i + 1}.png`;
    await page.screenshot({
      path: path.join(artifactDir, outName),
      fullPage: false
    });
    console.log('Saved', outName);
  }

  await browser.close();
}

main().catch(console.error);

