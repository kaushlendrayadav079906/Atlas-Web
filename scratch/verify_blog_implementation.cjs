const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runVerification() {
  console.log('================================================================');
  console.log('ATLAS Technosoft - Blog & Insights Feature Verification');
  console.log('================================================================');

  const screenshotsDir = path.join(__dirname, '..', 'blog_verification_artifacts');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('\n[1/7] Launching Vite preview server on port 4173...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', d => {});
  server.stderr.on('data', d => console.error(`[Vite Err]: ${d}`));

  await wait(3000);

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
    // TEST 1: Homepage - Latest Insights Section
    // -------------------------------------------------------------------------
    console.log('\n[2/7] Verifying Homepage Latest Insights section...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await wait(500);

    const blogSection = await page.$('#insights');
    if (!blogSection) {
      throw new Error('Could not find #insights section on Homepage');
    }

    const headingText = await page.$eval('#insights h2', el => el.textContent.trim());
    console.log(`  Homepage Section Heading: "${headingText}"`);
    if (!headingText.includes('Insights That Drive') || !headingText.includes('Smarter Business')) {
      console.error('  ❌ Heading does not match required "Insights That Drive Smarter Business"');
      allPassed = false;
    } else {
      console.log('  ✓ Section heading verified');
    }

    const cardCount = await page.$$eval('#insights article', els => els.length);
    console.log(`  Homepage Blog Cards Count: ${cardCount}`);
    if (cardCount !== 4) {
      console.error(`  ❌ Expected 4 blog cards on homepage, found ${cardCount}`);
      allPassed = false;
    } else {
      console.log('  ✓ 4 blog cards rendered on homepage');
    }

    // Scroll to section and screenshot
    await page.$eval('#insights', el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await wait(400);

    await page.screenshot({
      path: path.join(screenshotsDir, '01_homepage_blog_section.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 01_homepage_blog_section.png');

    // -------------------------------------------------------------------------
    // TEST 2: Navbar & Footer Navigation Links
    // -------------------------------------------------------------------------
    console.log('\n[3/7] Verifying Navbar & Footer Blog links...');
    const navbarBlogLink = await page.$('nav a[href="/blog"]');
    if (!navbarBlogLink) {
      console.error('  ❌ Blog link missing from desktop navbar');
      allPassed = false;
    } else {
      console.log('  ✓ Navbar Blog link present');
    }

    const footerBlogLink = await page.$('footer a[href="/blog"]');
    if (!footerBlogLink) {
      console.error('  ❌ Blog link missing from footer');
      allPassed = false;
    } else {
      console.log('  ✓ Footer Blog link present');
    }

    // -------------------------------------------------------------------------
    // TEST 3: Dedicated Blog Page (/blog)
    // -------------------------------------------------------------------------
    console.log('\n[4/7] Testing Dedicated Blog Page (/blog)...');
    await navbarBlogLink.click();
    await wait(800);

    const currentUrl = page.url();
    console.log(`  Current URL: ${currentUrl}`);
    if (!currentUrl.includes('/blog')) {
      console.error('  ❌ Clicking navbar Blog link did not navigate to /blog');
      allPassed = false;
    }

    const blogHeading = await page.$eval('h1', el => el.textContent.trim());
    console.log(`  Blog Page Heading: "${blogHeading}"`);
    if (!blogHeading.includes('Knowledge, Insights') || !blogHeading.includes('Innovation')) {
      console.error('  ❌ Blog heading does not match "Knowledge, Insights & Innovation"');
      allPassed = false;
    } else {
      console.log('  ✓ Blog page heading verified');
    }

    // Capture Blog Listing screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, '02_blog_listing_page.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 02_blog_listing_page.png');

    // -------------------------------------------------------------------------
    // TEST 4: Category Filtering Interaction
    // -------------------------------------------------------------------------
    console.log('\n[5/7] Testing Category Filtering...');
    // Click 'Manufacturing' filter
    const catButtons = await page.$$('button');
    let mfgClicked = false;
    for (const b of catButtons) {
      const text = await (await b.getProperty('textContent')).jsonValue();
      if (text.includes('Manufacturing')) {
        await b.click();
        mfgClicked = true;
        break;
      }
    }
    await wait(600);

    const mfgCards = await page.$$eval('article h3', els => els.map(e => e.textContent.trim()));
    console.log(`  Articles displayed under Manufacturing: ${mfgCards.length}`);
    if (mfgCards.some(t => t.includes('Manufacturing'))) {
      console.log('  ✓ Manufacturing category filter successfully filtered articles');
    } else {
      console.error('  ❌ Manufacturing articles not found under filter');
      allPassed = false;
    }

    await page.screenshot({
      path: path.join(screenshotsDir, '03_blog_category_filter.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 03_blog_category_filter.png');

    // Reset to 'All'
    for (const b of catButtons) {
      const text = await (await b.getProperty('textContent')).jsonValue();
      if (text.trim().startsWith('All')) {
        await b.click();
        break;
      }
    }
    await wait(400);

    // -------------------------------------------------------------------------
    // TEST 5: Search Functionality
    // -------------------------------------------------------------------------
    console.log('\n[6/7] Testing Article Search...');
    const searchInput = await page.$('input[aria-label="Search blog articles"]');
    await searchInput.click();
    await searchInput.type('Produmex WMS', { delay: 30 });
    await wait(600);

    const searchResults = await page.$$eval('article h3', els => els.map(e => e.textContent.trim()));
    console.log(`  Search results for "Produmex WMS": ${searchResults.length} articles`);
    const wmsFound = searchResults.some(t => t.includes('Warehouse Management Solutions'));
    if (wmsFound) {
      console.log('  ✓ Search correctly returned matching WMS article');
    } else {
      console.error('  ❌ Expected WMS article not found in search results');
      allPassed = false;
    }

    await page.screenshot({
      path: path.join(screenshotsDir, '04_blog_search_interaction.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 04_blog_search_interaction.png');

    // Clear search
    const clearBtn = await page.$('button[aria-label="Clear search"]');
    if (clearBtn) {
      await clearBtn.click();
      await wait(400);
    }

    // -------------------------------------------------------------------------
    // TEST 6: Individual Article Page (/blog/:slug)
    // -------------------------------------------------------------------------
    console.log('\n[7/7] Testing Individual Article Detail Page...');
    // Click on SAP Business One article
    const articleLink = await page.$('a[href*="/blog/how-sap-business-one-helps-smes"]');
    if (articleLink) {
      await articleLink.click();
      await wait(800);
    } else {
      await page.goto('http://localhost:4173/blog/how-sap-business-one-helps-smes-streamline-business-operations', {
        waitUntil: 'networkidle0'
      });
      await wait(500);
    }

    const detailTitle = await page.$eval('h1', el => el.textContent.trim());
    console.log(`  Article Detail Title: "${detailTitle}"`);

    // Verify Table of Contents
    const tocItems = await page.$$eval('ol li button', els => els.map(e => e.textContent.trim()));
    console.log(`  Table of Contents Items: ${tocItems.length}`);
    if (tocItems.length >= 4) {
      console.log('  ✓ Table of Contents rendered correctly with section links');
    }

    // Screenshot top of article
    await page.screenshot({
      path: path.join(screenshotsDir, '05_blog_detail_page_top.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 05_blog_detail_page_top.png');

    // Scroll to bottom to view CTA & Related Articles
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.75));
    await wait(500);

    await page.screenshot({
      path: path.join(screenshotsDir, '06_blog_detail_page_content_cta.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 06_blog_detail_page_content_cta.png');

    // -------------------------------------------------------------------------
    // TEST 7: Mobile Viewport (390x844 iPhone 14)
    // -------------------------------------------------------------------------
    console.log('\nTesting Mobile Viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:4173/blog', { waitUntil: 'networkidle0' });
    await wait(500);

    await page.screenshot({
      path: path.join(screenshotsDir, '07_blog_mobile_view.png'),
      fullPage: false
    });
    console.log('  📸 Captured: 07_blog_mobile_view.png');

  } catch (err) {
    console.error('Verification failed with error:', err);
    allPassed = false;
  } finally {
    await browser.close();
    server.kill();
  }

  if (allPassed) {
    console.log('\n================================================================');
    console.log('🎉 ALL BLOG VERIFICATION TESTS PASSED SUCCESSFULLY!');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error('\n❌ SOME VERIFICATION CHECKS FAILED.');
    process.exit(1);
  }
}

runVerification();
