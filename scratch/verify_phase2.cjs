const { spawn, execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');
const puppeteer = require('puppeteer');

const ARTIFACT_DIR = path.resolve('C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd');
const USER_DATA_DIR = path.join(os.tmpdir(), 'puppeteer_profile_p2_' + Date.now());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function killProcess(proc) {
  if (!proc || !proc.pid) return;
  try {
    execSync(`taskkill /pid ${proc.pid} /T /F`);
  } catch (e) {}
}

async function runVerification() {
  console.log('--- Starting Phase 2 Verification ---');

  // Clear any existing listeners on 8000 or 4175
  try {
    const netstat = execSync('netstat -ano | findstr :8000').toString();
    const match = netstat.match(/\s+(\d+)\s*$/m);
    if (match) execSync(`taskkill /pid ${match[1]} /T /F`);
  } catch (e) {}

  try {
    const netstat = execSync('netstat -ano | findstr :4175').toString();
    const match = netstat.match(/\s+(\d+)\s*$/m);
    if (match) execSync(`taskkill /pid ${match[1]} /T /F`);
  } catch (e) {}

  // 1. Start Python backend
  console.log('Starting backend server on port 8000...');
  const backend = spawn('cmd.exe', ['/c', 'python', '-m', 'uvicorn', 'app.main:app', '--port', '8000', '--host', '127.0.0.1'], {
    cwd: path.resolve('backend'),
    env: { ...process.env, PYTHONPATH: path.resolve('backend'), PYTHONUTF8: '1' },
    stdio: 'pipe'
  });

  // 2. Start Vite Preview server
  console.log('Starting Vite preview on port 4175...');
  const frontend = spawn('cmd.exe', ['/c', 'npx', 'vite', 'preview', '--port', '4175', '--strictPort'], {
    stdio: 'pipe'
  });

  await sleep(4000);

  let browser;
  try {
    console.log('Launching Puppeteer browser...');
    browser = await puppeteer.launch({
      headless: true,
      userDataDir: USER_DATA_DIR,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // -----------------------------------------------------------------------
    // TEST 1: Navbar Dropdown - Insights & Resources
    // -----------------------------------------------------------------------
    console.log('\n[Test 1] Testing Insights & Resources Navbar Dropdown...');
    await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle0', timeout: 15000 });
    
    // Hover natively over Insights & Resources nav link
    const navLinks = await page.$$('nav a');
    for (const link of navLinks) {
      const text = await page.evaluate(el => el.innerText, link);
      if (text.includes('Insights & Resources') || text.includes('Insights')) {
        await link.hover();
        console.log(`Hovered over nav item: ${text}`);
        break;
      }
    }
    await sleep(600);

    // Verify submenu items exist
    const dropdownSubmenu = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('a, button')).map(el => el.innerText.trim());
      return {
        hasBlog: items.some(t => t.includes('Blog')),
        hasSapGuides: items.some(t => t.includes('SAP Guides')),
        hasIndustryInsights: items.some(t => t.includes('Industry Insights')),
        hasFaqs: items.some(t => t.includes('FAQs'))
      };
    });
    console.log('Dropdown submenu verification:', dropdownSubmenu);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '06_navbar_insights_dropdown.png'), fullPage: false });
    console.log('Saved screenshot: 06_navbar_insights_dropdown.png');

    // -----------------------------------------------------------------------
    // TEST 2: Blog Listing Page & Category Filter
    // -----------------------------------------------------------------------
    console.log('\n[Test 2] Testing /blog listing page & filters...');
    await page.goto('http://127.0.0.1:4175/blog', { waitUntil: 'networkidle0', timeout: 15000 });
    
    // Filter by SAP Business One
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const sapBtn = btns.find(b => b.innerText.includes('SAP Business One'));
      if (sapBtn) sapBtn.click();
    });
    await sleep(500);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '07_blog_listing_page.png'), fullPage: false });
    console.log('Saved screenshot: 07_blog_listing_page.png');

    // -----------------------------------------------------------------------
    // TEST 3: Blog Detail Page & Consultation Modal
    // -----------------------------------------------------------------------
    console.log('\n[Test 3] Testing /blog/:slug detail page...');
    await page.goto('http://127.0.0.1:4175/blog/how-sap-business-one-helps-smes-streamline-business-operations', { waitUntil: 'networkidle0', timeout: 15000 });
    await sleep(600);

    const articleTitle = await page.evaluate(() => {
      return document.querySelector('h1') ? document.querySelector('h1').innerText : null;
    });
    console.log('Article Title:', articleTitle);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '08_blog_detail_page.png'), fullPage: false });
    console.log('Saved screenshot: 08_blog_detail_page.png');

    // -----------------------------------------------------------------------
    // TEST 4: SAP Guides Page (/resources/sap-guides)
    // -----------------------------------------------------------------------
    console.log('\n[Test 4] Testing /resources/sap-guides...');
    const sapGuidesRes = await page.goto('http://127.0.0.1:4175/resources/sap-guides', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log(`SAP Guides status: ${sapGuidesRes.status()}`);

    // Verify guides rendered
    const guideCount = await page.evaluate(() => {
      return document.querySelectorAll('h2').length;
    });
    console.log(`Guide count: ${guideCount}`);

    // Expand second guide
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const readBtn = btns.find(b => b.innerText.includes('Read Full Blueprint'));
      if (readBtn) readBtn.click();
    });
    await sleep(400);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '09_sap_guides_page.png'), fullPage: false });
    console.log('Saved screenshot: 09_sap_guides_page.png');

    // -----------------------------------------------------------------------
    // TEST 5: Industry Insights Page (/resources/industry-insights)
    // -----------------------------------------------------------------------
    console.log('\n[Test 5] Testing /resources/industry-insights...');
    const indRes = await page.goto('http://127.0.0.1:4175/resources/industry-insights', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log(`Industry Insights status: ${indRes.status()}`);

    const indCheck = await page.evaluate(() => {
      const articles = document.querySelectorAll('article').length;
      const sectors = Array.from(document.querySelectorAll('button')).filter(b => ['Manufacturing', 'Warehouse & Logistics', 'Finance & Compliance', 'Trading & Shipping'].includes(b.innerText.trim())).length;
      return { articleCount: articles, sectorButtons: sectors };
    });
    console.log('Industry insights metrics:', indCheck);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '10_industry_insights_page.png'), fullPage: false });
    console.log('Saved screenshot: 10_industry_insights_page.png');

    // -----------------------------------------------------------------------
    // TEST 6: FAQs Page (/resources/faqs)
    // -----------------------------------------------------------------------
    console.log('\n[Test 6] Testing /resources/faqs...');
    const faqRes = await page.goto('http://127.0.0.1:4175/resources/faqs', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log(`FAQs status: ${faqRes.status()}`);

    // Test FAQ search
    await page.type('input[placeholder*="Search frequently"]', 'GST');
    await sleep(400);

    const gstResults = await page.evaluate(() => {
      return document.querySelectorAll('[aria-expanded]').length;
    });
    console.log(`FAQs matching "GST": ${gstResults}`);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '11_faqs_search_interaction.png'), fullPage: false });
    console.log('Saved screenshot: 11_faqs_search_interaction.png');

    // Clear search and switch to Boyum IT category
    await page.evaluate(() => {
      const clearBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Clear'));
      if (clearBtn) clearBtn.click();
    });
    await sleep(200);

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const boyumBtn = btns.find(b => b.innerText.includes('Boyum IT'));
      if (boyumBtn) boyumBtn.click();
    });
    await sleep(300);

    // Expand the first FAQ in Boyum category
    await page.evaluate(() => {
      const firstFaq = document.querySelector('button[aria-expanded="false"]');
      if (firstFaq) firstFaq.click();
    });
    await sleep(400);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '12_faqs_accordion_expanded.png'), fullPage: false });
    console.log('Saved screenshot: 12_faqs_accordion_expanded.png');

    // -----------------------------------------------------------------------
    // TEST 7: Mobile Viewport Verification (375x812)
    // -----------------------------------------------------------------------
    console.log('\n[Test 7] Mobile Viewport Verification (375x812)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    
    // Test mobile drawer
    await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle0', timeout: 15000 });
    await page.evaluate(() => {
      const hamburger = document.querySelector('button[aria-label="Toggle navigation menu"]');
      if (hamburger) hamburger.click();
    });
    await sleep(500);

    // Expand Insights & Resources in mobile drawer
    await page.evaluate(() => {
      const accordions = Array.from(document.querySelectorAll('button[aria-label*="Toggle"]'));
      const insightsAccordion = accordions.find(b => b.getAttribute('aria-label').includes('Insights'));
      if (insightsAccordion) insightsAccordion.click();
    });
    await sleep(500);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '13_mobile_insights_drawer.png'), fullPage: false });
    console.log('Saved screenshot: 13_mobile_insights_drawer.png');

    // Check FAQs on mobile
    await page.goto('http://127.0.0.1:4175/resources/faqs', { waitUntil: 'networkidle0', timeout: 15000 });
    await sleep(600);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '14_mobile_faqs_page.png'), fullPage: false });
    console.log('Saved screenshot: 14_mobile_faqs_page.png');

    console.log('\n--- Phase 2 Verification Successfully Completed ---');

  } catch (err) {
    console.error('Verification failed with error:', err);
  } finally {
    if (browser) await browser.close();
    killProcess(frontend);
    killProcess(backend);
    try {
      fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
    } catch (e) {}
  }
}

runVerification();
