const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933';
const f1 = path.join(artifactDir, '.user_uploaded', 'media_1793421580001_84e60bba.jpg');
const f2 = path.join(artifactDir, '.user_uploaded', 'media_1793422870615_4eed803b.jpg');

async function main() {
  const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-diff-' + Date.now() + '-'));
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const b1 = fs.readFileSync(f1).toString('base64');
  const b2 = fs.readFileSync(f2).toString('base64');

  const diffResult = await page.evaluate(async (img1Src, img2Src) => {
    function loadImg(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    }

    const [img1, img2] = await Promise.all([
      loadImg('data:image/jpeg;base64,' + img1Src),
      loadImg('data:image/jpeg;base64,' + img2Src)
    ]);

    const canvas = document.createElement('canvas');
    canvas.width = img1.width;
    canvas.height = img1.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img1, 0, 0);
    const d1 = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img2, 0, 0);
    const d2 = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let diffCount = 0;
    let maxDiff = 0;
    const diffCanvas = document.createElement('canvas');
    diffCanvas.width = canvas.width;
    diffCanvas.height = canvas.height;
    const diffCtx = diffCanvas.getContext('2d');
    const diffData = diffCtx.createImageData(canvas.width, canvas.height);

    for (let i = 0; i < d1.data.length; i += 4) {
      const dr = Math.abs(d1.data[i] - d2.data[i]);
      const dg = Math.abs(d1.data[i + 1] - d2.data[i + 1]);
      const db = Math.abs(d1.data[i + 2] - d2.data[i + 2]);
      const d = dr + dg + db;
      if (d > 30) {
        diffCount++;
        diffData.data[i] = 255;
        diffData.data[i + 1] = 0;
        diffData.data[i + 2] = 0;
        diffData.data[i + 3] = 255;
      } else {
        diffData.data[i] = 0;
        diffData.data[i + 1] = 0;
        diffData.data[i + 2] = 0;
        diffData.data[i + 3] = 0;
      }
      if (d > maxDiff) maxDiff = d;
    }

    diffCtx.putImageData(diffData, 0, 0);
    return {
      diffCount,
      totalPixels: canvas.width * canvas.height,
      maxDiff,
      diffDataUrl: diffCanvas.toDataURL()
    };
  }, b1, b2);

  console.log('Diff result:', {
    diffCount: diffResult.diffCount,
    totalPixels: diffResult.totalPixels,
    percent: (diffResult.diffCount / diffResult.totalPixels * 100).toFixed(2) + '%',
    maxDiff: diffResult.maxDiff
  });

  await browser.close();
}

main().catch(console.error);

