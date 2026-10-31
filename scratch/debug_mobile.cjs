const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: path.join(os.tmpdir(), 'debug_mobile_' + Date.now()),
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://127.0.0.1:4188/', { waitUntil: 'networkidle0' });

  const btn = await page.$('button[aria-label="Next slide"]');
  console.log('Button found:', !!btn);
  if (btn) {
    const box = await btn.boundingBox();
    console.log('Button box:', box);
    await btn.scrollIntoView();
    // evaluate click vs page.click
    await page.evaluate(b => b.click(), btn);
    await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
    const cards = await page.$$eval('#case-studies .grid > div', els => els.map(e => e.querySelector('span')?.textContent?.trim()));
    console.log('After evaluate click cards:', cards);
  }
  await browser.close();
})().catch(console.error);

