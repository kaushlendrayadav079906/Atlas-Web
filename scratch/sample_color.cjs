const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');

(async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ptemp-'));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], userDataDir: tmpDir });
  const page = await browser.newPage();
  const filePath = 'file:///C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd/.user_uploaded/media_1793963288513_94d43617.png';
  await page.goto(filePath);
  const colors = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCounts = {};
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      if (r > 240 && g > 235 && b > 220) continue;
      const key = r + ',' + g + ',' + b;
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }
    const sorted = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]);
    return sorted.slice(0, 5);
  });
  console.log('Top colors in text:', colors);
  if (colors.length > 0) {
    const rgb = colors[0][0].split(',').map(Number);
    const hex = '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    console.log('Most frequent text Hex:', hex);
  }
  await browser.close();
  fs.rmSync(tmpDir, { recursive: true, force: true });
})();

