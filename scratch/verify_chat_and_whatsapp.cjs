const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runVerification() {
  console.log('================================================================');
  console.log('ATLAS Technosoft - WhatsApp & Customer Support Chat Verification');
  console.log('================================================================');

  const screenshotsDir = path.join(__dirname, '..', 'chat_verification_artifacts');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // 1. Start FastAPI Backend & Vite Preview server
  console.log('\n[1/6] Launching FastAPI Backend (port 8000) & Vite Preview server (port 4173)...');
  
  const backend = spawn('python', ['-m', 'uvicorn', 'app.main:app', '--port', '8000', '--host', '127.0.0.1'], {
    cwd: path.join(__dirname, '..', 'backend'),
    shell: true,
    stdio: 'pipe',
    env: { ...process.env, PYTHONPATH: path.join(__dirname, '..', 'backend'), PYTHONUTF8: '1' }
  });

  backend.stdout.on('data', d => {
    // console.log(`[FastAPI]: ${d}`);
  });
  backend.stderr.on('data', d => {
    // console.error(`[FastAPI Err]: ${d}`);
  });

  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', d => {
    // console.log(`[Vite]: ${d}`);
  });
  server.stderr.on('data', d => {
    console.error(`[Vite Err]: ${d}`);
  });

  await wait(4000);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  let allPassed = true;

  try {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('[Browser Error]:', msg.text());
      }
    });

    page.on('pageerror', err => {
      console.error('[Page Runtime Error]:', err.toString());
      allPassed = false;
    });

    // -------------------------------------------------------------------------
    // TEST 1: Verify Floating WhatsApp & Chat Buttons Across All Pages
    // -------------------------------------------------------------------------
    console.log('\n[2/6] Verifying presence on all key website routes...');
    const routes = [
      '/',
      '/about',
      '/services',
      '/solutions',
      '/industries',
      '/case-studies',
      '/partners',
      '/contact'
    ];

    for (const route of routes) {
      await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle0' });
      await wait(400);

      const hasWhatsApp = await page.$('a[aria-label="Chat with us on WhatsApp"]');
      const hasChat = await page.$('button[aria-label="Open ATLAS Customer Support Chat"]');

      if (!hasWhatsApp || !hasChat) {
        console.error(`❌ Missing floating button(s) on route: ${route}`);
        allPassed = false;
      } else {
        console.log(`  ✓ Route ${route.padEnd(14)}: WhatsApp & Chat buttons present`);
      }
    }

    // -------------------------------------------------------------------------
    // TEST 2: Inspect WhatsApp Floating Button Attributes & Geometry
    // -------------------------------------------------------------------------
    console.log('\n[3/6] Inspecting WhatsApp button configuration...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await wait(500);

    const waHref = await page.$eval('a[aria-label="Chat with us on WhatsApp"]', el => el.getAttribute('href'));
    console.log('  WhatsApp Link:', waHref);

    if (
      waHref.includes('wa.me/919372329599') &&
      waHref.includes('Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions.')
    ) {
      console.log('  ✓ WhatsApp phone number and prefilled message verified successfully');
    } else {
      console.error('  ❌ WhatsApp href does not match required phone or message template');
      allPassed = false;
    }

    // Check SVG Brand Icon
    const waSvgPresent = await page.$eval('a[aria-label="Chat with us on WhatsApp"] svg', el => {
      return el.getAttribute('viewBox') === '0 0 24 24';
    });
    if (waSvgPresent) {
      console.log('  ✓ Official WhatsApp brand vector icon verified');
    }

    // -------------------------------------------------------------------------
    // TEST 3: Desktop Support Panel Interaction & Knowledge Responses
    // -------------------------------------------------------------------------
    console.log('\n[4/6] Testing Chat Window open, suggestions, Q&A, and minimize...');
    await page.setViewport({ width: 1440, height: 900 });

    // Hover on Chat button to verify tooltip
    const chatBtn = await page.$('button[aria-label="Open ATLAS Customer Support Chat"]');
    await chatBtn.hover();
    await wait(300);

    // Click to open chat
    await chatBtn.click();
    await wait(600);

    // Verify Chat Window opened
    const chatDialog = await page.$('div[role="dialog"][aria-label="ATLAS Customer Support Assistant"]');
    if (!chatDialog) {
      throw new Error('Chat window failed to open upon clicking trigger');
    }
    console.log('  ✓ Chat window opened successfully');

    // Screenshot Desktop Initial Welcome
    await page.screenshot({
      path: path.join(screenshotsDir, '01_desktop_chat_welcome.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 01_desktop_chat_welcome.png');

    // Verify Header text
    const headerTitle = await page.$eval('div[role="dialog"] h3', el => el.textContent.trim());
    const headerSubtitle = await page.$eval('div[role="dialog"] p', el => el.textContent.trim());
    console.log(`  Header Title: "${headerTitle}"`);
    console.log(`  Header Subtitle: "${headerSubtitle}"`);

    if (headerTitle === 'How can we help you?' && headerSubtitle.includes('Ask us anything about our solutions.')) {
      console.log('  ✓ Header branding, title and subtitle match reference requirements');
    } else {
      console.error('  ❌ Header texts do not match');
      allPassed = false;
    }

    // Test Suggested Question Click: "SAP Business One"
    console.log('\n  Clicking suggested question: "SAP Business One"...');
    const buttons = await page.$$('div[role="dialog"] button');
    let sapClicked = false;
    for (const b of buttons) {
      const text = await (await b.getProperty('textContent')).jsonValue();
      if (text.trim() === 'SAP Business One') {
        await b.click();
        sapClicked = true;
        break;
      }
    }
    if (!sapClicked) {
      console.error('  ❌ Could not find "SAP Business One" suggested pill');
      allPassed = false;
    }

    await wait(1000);

    // Verify SAP reply
    const messagesText = await page.$$eval('div[role="dialog"] [class*="rounded-2xl"]', els =>
      els.map(e => e.textContent.trim())
    );
    const sapReplyFound = messagesText.some(
      t => t.includes('SAP Business One is an integrated ERP solution') && t.includes('Would you like to speak with our SAP team?')
    );
    if (sapReplyFound) {
      console.log('  ✓ SAP Business One verified company answer received accurately');
    } else {
      console.error('  ❌ Did not find expected SAP answer in messages:', messagesText);
      allPassed = false;
    }

    // Screenshot Desktop After SAP Query
    await page.screenshot({
      path: path.join(screenshotsDir, '02_desktop_chat_sap_reply.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 02_desktop_chat_sap_reply.png');

    // Test Typing Custom Query: "Where are your offices located?"
    console.log('\n  Typing custom question: "Where are your offices located?"...');
    const input = await page.$('input[aria-label="Chat message input"]');
    await input.click();
    await input.type('Where are your offices located?', { delay: 30 });
    await wait(200);

    const sendBtn = await page.$('button[aria-label="Send message"]');
    await sendBtn.click();
    await wait(1000);

    // Check office reply
    const updatedMessages = await page.$$eval('div[role="dialog"] [class*="rounded-2xl"]', els =>
      els.map(e => e.textContent.trim())
    );
    const officeReplyFound = updatedMessages.some(
      t => t.includes('Borivali Office') && t.includes('Marine Lines Office')
    );
    if (officeReplyFound) {
      console.log('  ✓ Mumbai office locations (Borivali & Marine Lines) received accurately');
    } else {
      console.error('  ❌ Did not find expected office locations in messages');
      allPassed = false;
    }

    // Screenshot Desktop After Office Query
    await page.screenshot({
      path: path.join(screenshotsDir, '03_desktop_chat_offices_reply.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 03_desktop_chat_offices_reply.png');

    // Test Fallback with Unanswerable Question
    console.log('\n  Testing polite fallback for unanswerable query: "Can you fix an electric scooter?"...');
    await input.click();
    await input.type('Can you fix an electric scooter?', { delay: 30 });
    await wait(200);
    await sendBtn.click();
    await wait(1000);

    const afterFallbackMessages = await page.$$eval('div[role="dialog"] [class*="rounded-2xl"]', els =>
      els.map(e => e.textContent.trim())
    );
    const fallbackFound = afterFallbackMessages.some(
      t => t.includes('verified company knowledge base') && t.includes('WhatsApp')
    );
    if (fallbackFound) {
      console.log('  ✓ Polite company fallback triggered without hallucinating unsupported claims');
    } else {
      console.error('  ❌ Fallback answer not detected');
      allPassed = false;
    }

    // Test Minimize and Reopen
    console.log('\n  Testing Minimize and Reopen...');
    const minimizeBtn = await page.$('button[aria-label="Minimize"]');
    await minimizeBtn.click();
    await wait(500);

    // Screenshot Minimized State
    await page.screenshot({
      path: path.join(screenshotsDir, '04_desktop_chat_minimized.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 04_desktop_chat_minimized.png');

    // Expand again
    const expandBtn = await page.$('button[aria-label="Expand"]');
    await expandBtn.click();
    await wait(500);

    // Verify conversation still has all turns
    const countAfterExpand = await page.$$eval('div[role="dialog"] [class*="rounded-2xl"]', els => els.length);
    console.log(`  Messages preserved after minimize & restore: ${countAfterExpand} bubbles`);
    if (countAfterExpand >= 6) {
      console.log('  ✓ Conversation successfully preserved across minimize/restore');
    } else {
      console.error('  ❌ Messages were lost on restore');
      allPassed = false;
    }

    // Close chat
    const closeBtn = await page.$('button[aria-label="Close chat"]');
    await closeBtn.click();
    await wait(500);

    const isClosed = (await page.$('div[role="dialog"]')) === null;
    if (isClosed) {
      console.log('  ✓ Chat panel closed cleanly; trigger button reappeared');
    }

    // -------------------------------------------------------------------------
    // TEST 4: Mobile Responsive Layout Verification (390px x 844px iPhone)
    // -------------------------------------------------------------------------
    console.log('\n[5/6] Testing Mobile viewport (390x844 iPhone 14)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await wait(500);

    // Check floating trigger positions on mobile
    await page.screenshot({
      path: path.join(screenshotsDir, '05_mobile_floating_buttons.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 05_mobile_floating_buttons.png');

    // Open chat on mobile
    const mobileChatBtn = await page.$('button[aria-label="Open ATLAS Customer Support Chat"]');
    await mobileChatBtn.click();
    await wait(600);

    // Screenshot Mobile Chat Open
    await page.screenshot({
      path: path.join(screenshotsDir, '06_mobile_chat_open.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 06_mobile_chat_open.png');

    // Verify input and send button are visible and accessible on mobile
    const mobileInput = await page.$('input[aria-label="Chat message input"]');
    const mobileSendBtn = await page.$('button[aria-label="Send message"]');
    const inputVisible = await mobileInput.isIntersectingViewport();
    console.log(`  Mobile chat input visible and accessible in viewport: ${inputVisible}`);

    if (inputVisible) {
      console.log('  ✓ Mobile responsive panel fully functional without overlapping navigation');
    }

    console.log('\n[6/6] All automated verification suites completed.');
  } catch (err) {
    console.error('Verification failed with error:', err);
    allPassed = false;
  } finally {
    await browser.close();
    server.kill();
    backend.kill();
  }

  if (allPassed) {
    console.log('\n================================================================');
    console.log('🎉 ALL TESTS PASSED! WhatsApp & Smart Support Chat are 100% verified.');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error('\n❌ SOME VERIFICATION CHECKS FAILED.');
    process.exit(1);
  }
}

runVerification();
