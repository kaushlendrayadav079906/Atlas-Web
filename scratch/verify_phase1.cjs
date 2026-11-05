const { spawn, execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');
const puppeteer = require('puppeteer');

const ARTIFACT_DIR = path.resolve('C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd');
const USER_DATA_DIR = path.join(os.tmpdir(), 'puppeteer_profile_' + Date.now());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function killProcess(proc) {
  if (!proc || !proc.pid) return;
  try {
    execSync(`taskkill /pid ${proc.pid} /T /F`);
  } catch (e) {
    // ignore
  }
}

async function runVerification() {
  console.log('--- Starting Phase 1 Verification ---');

  // Kill any old processes on ports 8000 or 4175 if any
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

  backend.stdout.on('data', data => console.log(`[Backend]: ${data.toString().trim()}`));
  backend.stderr.on('data', data => console.log(`[Backend err]: ${data.toString().trim()}`));

  // 2. Start Vite Preview server
  console.log('Starting Vite preview on port 4175...');
  const frontend = spawn('cmd.exe', ['/c', 'npx', 'vite', 'preview', '--port', '4175', '--strictPort'], {
    stdio: 'pipe'
  });

  frontend.stdout.on('data', data => console.log(`[Frontend]: ${data.toString().trim()}`));
  frontend.stderr.on('data', data => console.log(`[Frontend err]: ${data.toString().trim()}`));

  // Wait for servers to be ready
  await sleep(4000);

  let browser;
  try {
    console.log('Launching Puppeteer browser with fresh profile dir...');
    browser = await puppeteer.launch({
      headless: true,
      userDataDir: USER_DATA_DIR,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // -----------------------------------------------------------------------
    // TEST 1: Homepage & Consultation Modal Integration
    // -----------------------------------------------------------------------
    console.log('\n[Test 1] Testing Consultation Modal on Homepage...');
    await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log('Homepage loaded.');

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const target = btns.find(b => b.innerText.includes('Consultation') || b.innerText.includes('Book'));
      if (target) target.click();
    });

    await sleep(600);

    // Verify modal is visible
    const modalVisible = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]') || document.querySelector('.fixed.inset-0');
      return !!dialog;
    });
    console.log(`Modal visible: ${modalVisible}`);

    // Fill the consultation modal with valid data
    console.log('Filling consultation form with realistic enterprise lead data...');
    await page.type('input[placeholder*="Rajesh"], input[id="fullName"], input[name="fullName"]', 'Vikram Sharma');
    await page.type('input[placeholder*="email"], input[id="email"], input[name="email"]', 'vikram.sharma@enterprise-logistics.in');
    await page.type('input[placeholder*="Phone"], input[id="phone"], input[name="phone"]', '+91 98200 12345');
    await page.type('input[placeholder*="Enterprises"], input[id="companyName"], input[name="companyName"]', 'Apex Industrial Logistics Ltd');
    await page.type('textarea[id="message"], textarea[name="message"]', 'Looking for an SAP Business One HANA migration and Produmex WMS deployment for 3 regional warehouses.');

    // Submit consultation to backend API
    console.log('Submitting to backend API (/api/v1/consultations)...');
    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('button[type="submit"]')).find(b => b.innerText.includes('Confirm') || b.innerText.includes('Consultation'));
      if (submitBtn) submitBtn.click();
    });

    // Wait for submission response
    await sleep(3000);

    // Check for success state
    const successResult = await page.evaluate(() => {
      const successHeading = Array.from(document.querySelectorAll('h3')).find(h => h.innerText.includes('Consultation Request Confirmed'));
      const refText = Array.from(document.querySelectorAll('span, p')).find(el => el.innerText.includes('REF-') || el.innerText.includes('Reference ID'));
      const sapText = Array.from(document.querySelectorAll('span, p')).find(el => el.innerText.includes('C00') || el.innerText.includes('SAP Lead'));
      return {
        confirmed: !!successHeading,
        referenceId: refText ? refText.innerText : null,
        sapLead: sapText ? sapText.innerText : null
      };
    });
    console.log('Form submission result:', successResult);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '01_consultation_modal_success.png'), fullPage: false });
    console.log('Saved screenshot: 01_consultation_modal_success.png');

    // Close modal
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Done') || b.innerText.includes('Close') || b.getAttribute('aria-label') === 'Close');
      if (closeBtn) closeBtn.click();
    });
    await sleep(400);

    // -----------------------------------------------------------------------
    // TEST 2 & 3: About Page & Leadership Section
    // -----------------------------------------------------------------------
    console.log('\n[Test 2 & 3] Navigating to About Page (/about#team)...');
    await page.goto('http://127.0.0.1:4175/about#team', { waitUntil: 'networkidle0', timeout: 15000 });
    await sleep(800);

    const teamCheck = await page.evaluate(() => {
      const teamSection = document.getElementById('team') || document.getElementById('leadership');
      const heading = teamSection ? teamSection.querySelector('h2') : null;
      const practices = document.querySelectorAll('#team .grid > div, #leadership .grid > div').length;
      return {
        exists: !!teamSection,
        headingText: heading ? heading.innerText : null,
        practiceCount: practices
      };
    });
    console.log('Leadership section check:', teamCheck);

    // Scroll to team section for screenshot
    await page.evaluate(() => {
      const el = document.getElementById('team') || document.getElementById('leadership');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await sleep(500);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '02_about_leadership_team.png'), fullPage: false });
    console.log('Saved screenshot: 02_about_leadership_team.png');

    // Check Values anchor
    const valuesCheck = await page.evaluate(() => {
      const valuesAnchor = document.getElementById('values');
      return !!valuesAnchor;
    });
    console.log(`Values anchor (#values) exists on About page: ${valuesCheck}`);

    // -----------------------------------------------------------------------
    // TEST 4: Manufacturing Industry Page
    // -----------------------------------------------------------------------
    console.log('\n[Test 4] Navigating to /industries/manufacturing...');
    const mfgResponse = await page.goto('http://127.0.0.1:4175/industries/manufacturing', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log(`Manufacturing page status: ${mfgResponse.status()}`);

    const mfgContent = await page.evaluate(() => {
      return {
        title: document.title,
        h1: document.querySelector('h1') ? document.querySelector('h1').innerText : null,
        hasFeatures: document.querySelectorAll('.grid').length > 0
      };
    });
    console.log('Manufacturing page content:', mfgContent);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '03_manufacturing_industry_page.png'), fullPage: false });
    console.log('Saved screenshot: 03_manufacturing_industry_page.png');

    // -----------------------------------------------------------------------
    // TEST 5: Mobile Viewport Verification
    // -----------------------------------------------------------------------
    console.log('\n[Test 5] Mobile Viewport Verification (375x812)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto('http://127.0.0.1:4175/about#team', { waitUntil: 'networkidle0', timeout: 15000 });
    await sleep(600);

    await page.evaluate(() => {
      const el = document.getElementById('team') || document.getElementById('leadership');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await sleep(400);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '04_mobile_leadership_team.png'), fullPage: false });
    console.log('Saved screenshot: 04_mobile_leadership_team.png');

    // Test Consultation modal on mobile
    await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle0', timeout: 15000 });
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const target = btns.find(b => b.innerText.includes('Consultation') || b.innerText.includes('Book'));
      if (target) target.click();
    });
    await sleep(600);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '05_mobile_consultation_modal.png'), fullPage: false });
    console.log('Saved screenshot: 05_mobile_consultation_modal.png');

    console.log('\n--- Phase 1 Verification Successfully Completed ---');

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
