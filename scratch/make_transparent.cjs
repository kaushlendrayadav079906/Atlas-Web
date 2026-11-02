const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    userDataDir: path.join(__dirname, 'chrome_trans_' + Date.now())
  });
  const page = await browser.newPage();
  const filePath = path.resolve(__dirname, '../public/images/sap_silver_partner.png').replace(/\\/g, '/');
  await page.goto('file:///' + filePath);

  const pngBase64 = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Corner background color reference: ~ [237, 244, 253]
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Distance from light blue background [237, 244, 253]
      const dist = Math.sqrt((r - 237) ** 2 + (g - 244) ** 2 + (b - 253) ** 2);

      if (dist < 18) {
        data[i + 3] = 0; // completely transparent
      } else if (dist < 32) {
        // Smooth alpha edge transition
        const factor = (dist - 18) / (32 - 18);
        data[i + 3] = Math.round(data[i + 3] * factor);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png').split(',')[1];
  });

  const outPath = path.resolve(__dirname, '../public/images/sap_silver_partner_transparent.png');
  fs.writeFileSync(outPath, Buffer.from(pngBase64, 'base64'));
  console.log('Saved transparent PNG to:', outPath);

  await browser.close();
})();

