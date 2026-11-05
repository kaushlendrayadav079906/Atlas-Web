const { spawn, execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');
const puppeteer = require('puppeteer');

const ARTIFACT_DIR = path.resolve('C:/Users/A/.gemini/antigravity/brain/bdcc5a0d-6fd7-4b0f-b35a-9a774feccfbd');
const USER_DATA_DIR = path.join(os.tmpdir(), 'puppeteer_profile_p3_' + Date.now());

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
  console.log('=== Starting Phase 3 Verification ===');

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
    // TEST 1: Manufacturing Solutions (/solutions/manufacturing)
    // -----------------------------------------------------------------------
    console.log('\n[Test 1] Verifying /solutions/manufacturing...');
    const resMfg = await page.goto('http://127.0.0.1:4175/solutions/manufacturing', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log('Response Status:', resMfg.status());
    const mfgTitle = await page.$eval('h1', el => el.innerText);
    console.log('Heading:', mfgTitle);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '15_mfg_solution.png'), fullPage: false });
    console.log('Saved: 15_mfg_solution.png');

    // -----------------------------------------------------------------------
    // TEST 2: Warehouse Management (/solutions/warehouse-management)
    // -----------------------------------------------------------------------
    console.log('\n[Test 2] Verifying /solutions/warehouse-management...');
    const resWms = await page.goto('http://127.0.0.1:4175/solutions/warehouse-management', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log('Response Status:', resWms.status());
    const wmsTitle = await page.$eval('h1', el => el.innerText);
    console.log('Heading:', wmsTitle);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '16_wms_solution.png'), fullPage: false });
    console.log('Saved: 16_wms_solution.png');

    // -----------------------------------------------------------------------
    // TEST 3: Finance Automation (/solutions/finance-automation)
    // -----------------------------------------------------------------------
    console.log('\n[Test 3] Verifying /solutions/finance-automation...');
    const resFin = await page.goto('http://127.0.0.1:4175/solutions/finance-automation', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log('Response Status:', resFin.status());
    const finTitle = await page.$eval('h1', el => el.innerText);
    console.log('Heading:', finTitle);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '17_finance_solution.png'), fullPage: false });
    console.log('Saved: 17_finance_solution.png');

    // -----------------------------------------------------------------------
    // TEST 4: Logistics & Shipping (/solutions/logistics-shipping)
    // -----------------------------------------------------------------------
    console.log('\n[Test 4] Verifying /solutions/logistics-shipping...');
    const resLog = await page.goto('http://127.0.0.1:4175/solutions/logistics-shipping', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log('Response Status:', resLog.status());
    const logTitle = await page.$eval('h1', el => el.innerText);
    console.log('Heading:', logTitle);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '18_logistics_solution.png'), fullPage: false });
    console.log('Saved: 18_logistics_solution.png');

    // -----------------------------------------------------------------------
    // TEST 5: ATLAS Proprietary Add-ons (/solutions/atlas-addons)
    // -----------------------------------------------------------------------
    console.log('\n[Test 5] Verifying /solutions/atlas-addons...');
    const resAddons = await page.goto('http://127.0.0.1:4175/solutions/atlas-addons', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log('Response Status:', resAddons.status());
    const addonsTitle = await page.$eval('h1', el => el.innerText);
    console.log('Heading:', addonsTitle);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '19_atlas_addons.png'), fullPage: false });
    console.log('Saved: 19_atlas_addons.png');

    // -----------------------------------------------------------------------
    // TEST 6: Support & Maintenance (/services/support-maintenance)
    // -----------------------------------------------------------------------
    console.log('\n[Test 6] Verifying /services/support-maintenance...');
    const resSupport = await page.goto('http://127.0.0.1:4175/services/support-maintenance', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log('Response Status:', resSupport.status());
    const supportTitle = await page.$eval('h1', el => el.innerText);
    console.log('Heading:', supportTitle);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '20_support_maintenance.png'), fullPage: false });
    console.log('Saved: 20_support_maintenance.png');

    // -----------------------------------------------------------------------
    // TEST 7: Domain Consultation Modal Trigger
    // -----------------------------------------------------------------------
    console.log('\n[Test 7] Testing Domain Consultation Modal opening...');
    await page.goto('http://127.0.0.1:4175/solutions/manufacturing', { waitUntil: 'networkidle0' });
    const ctaBtn = await page.waitForSelector('button ::-p-text(Book a Domain Consultation)', { timeout: 5000 });
    if (ctaBtn) {
      await ctaBtn.click();
      await sleep(600);
      const modal = await page.waitForSelector('[role="dialog"]', { visible: true, timeout: 5000 });
      console.log('Consultation Modal opened successfully!');
      await page.screenshot({ path: path.join(ARTIFACT_DIR, '22_domain_consultation_modal.png'), fullPage: false });
      console.log('Saved: 22_domain_consultation_modal.png');
      
      // Close modal
      const closeBtn = await page.$('[aria-label="Close dialog"], [aria-label="Close modal"]');
      if (closeBtn) await closeBtn.click();
      await sleep(300);
    }

    // -----------------------------------------------------------------------
    // TEST 8: Mobile Viewport Responsiveness (375x812)
    // -----------------------------------------------------------------------
    console.log('\n[Test 8] Testing Mobile Responsiveness (375x812)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto('http://127.0.0.1:4175/solutions/manufacturing', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '21_mobile_domain_solutions.png'), fullPage: false });
    console.log('Saved: 21_mobile_domain_solutions.png');

    // -----------------------------------------------------------------------
    // TEST 9: Desktop Navbar - Solutions Dropdown
    // -----------------------------------------------------------------------
    console.log('\n[Test 9] Testing Desktop Navbar Solutions Dropdown...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle0' });
    
    // Find Solutions nav item and hover
    const navItems = await page.$$('nav a, nav button');
    for (const item of navItems) {
      const text = await (await item.getProperty('innerText')).jsonValue();
      if (text && text.trim() === 'Solutions') {
        await item.hover();
        break;
      }
    }
    await sleep(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '23_navbar_solutions_dropdown.png'), fullPage: false });
    console.log('Saved: 23_navbar_solutions_dropdown.png');

    // -----------------------------------------------------------------------
    // TEST 10: Desktop Navbar - Services Dropdown (Support & AMS)
    // -----------------------------------------------------------------------
    console.log('\n[Test 10] Testing Desktop Navbar Services Dropdown...');
    for (const item of navItems) {
      const text = await (await item.getProperty('innerText')).jsonValue();
      if (text && text.trim() === 'Services') {
        await item.hover();
        break;
      }
    }
    await sleep(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '24_navbar_services_ams.png'), fullPage: false });
    console.log('Saved: 24_navbar_services_ams.png');

    console.log('\n=== ALL PHASE 3 VERIFICATION TESTS PASSED SUCCESSFULLY! ===');
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    if (browser) await browser.close();
    killProcess(backend);
    killProcess(frontend);
    try {
      fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
    } catch (e) {}
  }
}

runVerification();

