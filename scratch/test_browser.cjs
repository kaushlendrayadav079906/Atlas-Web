const puppeteer = require('puppeteer');

async function test() {
  const browser = await puppeteer.launch({
    headless: 'new',
    pipe: false,
    args: ['--no-sandbox', '--disable-gpu', '--remote-debugging-port=0']
  });
  console.log('Browser launched successfully!');
  await browser.close();
}

test().catch(console.error);

