const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    userDataDir: path.join(__dirname, 'chrome_check_' + Date.now())
  });
  const page = await browser.newPage();
  const filePath = path.resolve(__dirname, '../public/images/sap_silver_partner.png').replace(/\\/g, '/');
  await page.goto('file:///' + filePath);
  const info = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const p1 = ctx.getImageData(2, 2, 1, 1).data;
    const p2 = ctx.getImageData(canvas.width - 2, 2, 1, 1).data;
    const p3 = ctx.getImageData(2, canvas.height - 2, 1, 1).data;
    const p4 = ctx.getImageData(canvas.width - 2, canvas.height - 2, 1, 1).data;
    return {
      topLeft: Array.from(p1),
      topRight: Array.from(p2),
      bottomLeft: Array.from(p3),
      bottomRight: Array.from(p4)
    };
  });
  console.log(info);
  await browser.close();
})();

