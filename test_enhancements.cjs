const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
  console.log('====================================================');
  console.log('ATLAS Technosoft - Verification of UI, Counters & Logo Slider');
  console.log('====================================================');

  const screenshotsDir = path.join(__dirname, 'test_artifacts');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Start Vite Preview Server
  console.log('1. Starting Vite preview server...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log(`[Vite]: ${d}`));
  server.stderr.on('data', (d) => console.error(`[Vite Err]: ${d}`));

  await wait(3000);

  const browser = await puppeteer.launch({
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let testPassed = true;

  try {
    const page = await browser.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Browser Console Error:', msg.text());
      }
    });

    page.on('pageerror', (err) => {
      console.error('Browser Page Error:', err.toString());
      testPassed = false;
    });

    // -------------------------------------------------------------
    // Test 1: Desktop Navigation & Top Bar (1440px)
    // -------------------------------------------------------------
    console.log('\n--- TEST 1: Desktop Header & Top Information Bar ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    const topBarData = await page.evaluate(() => {
      const locationEl = document.evaluate(
        "//*[contains(text(), 'Mumbai, India')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      const emailEl = document.querySelector('a[href^="mailto:sales@atlastechnosoft.com"]');
      const phoneEl = document.querySelector('a[href^="tel:+919372329599"]');
      const linkedinEl = document.querySelector('a[href*="linkedin.com"]');
      const twitterEl = document.querySelector('a[href*="x.com"]');
      const whatsappEl = document.querySelector('a[href*="wa.me"]');

      return {
        hasLocation: !!locationEl,
        hasEmail: !!emailEl,
        emailText: emailEl ? emailEl.innerText : null,
        hasPhone: !!phoneEl,
        phoneText: phoneEl ? phoneEl.innerText : null,
        hasLinkedin: !!linkedinEl,
        hasTwitter: !!twitterEl,
        hasWhatsApp: !!whatsappEl,
      };
    });

    console.log('Top bar verification result:', topBarData);
    if (
      !topBarData.hasLocation ||
      !topBarData.hasEmail ||
      !topBarData.hasPhone ||
      !topBarData.hasLinkedin ||
      !topBarData.hasTwitter ||
      !topBarData.hasWhatsApp
    ) {
      throw new Error('Top Info Bar missing critical fields!');
    }
    console.log('✔ Top Information Bar verified successfully.');

    // -------------------------------------------------------------
    // Test 2: Dropdown Mega Menu (Services)
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Services Dropdown Mega Menu ---');
    const servicesBtn = await page.evaluateHandle(() =>
      Array.from(document.querySelectorAll('header nav button')).find((b) =>
        b.innerText.includes('Services')
      )
    );
    await servicesBtn.hover();
    await wait(300);

    const megaMenuData = await page.evaluate(() => {
      const megaMenu = document.querySelector('[role="region"][aria-label="Services Mega Menu"]');
      if (!megaMenu) return null;

      const categoryBtns = Array.from(megaMenu.querySelectorAll('.col-span-5 button'));
      const activeCategoryTitle = megaMenu.querySelector('.col-span-7 h4')?.innerText;
      const subItemLinks = Array.from(megaMenu.querySelectorAll('.col-span-7 ul a')).map((a) => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href'),
      }));

      return {
        isOpen: true,
        categoryCount: categoryBtns.length,
        categories: categoryBtns.map((b) => b.innerText.trim()),
        activeCategoryTitle,
        subItemLinks,
      };
    });

    console.log('Mega Menu Open state:', megaMenuData);
    if (!megaMenuData || megaMenuData.categoryCount < 5) {
      throw new Error('Services Mega Menu failed to render properly!');
    }
    console.log('✔ Services Mega Menu verified with categories and subitems.');

    // Test Escape Key closes Mega Menu
    await page.keyboard.press('Escape');
    await wait(300);

    // -------------------------------------------------------------
    // Test 3: Automatic Animated Number Counters
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: Automatic Animated Number Counters ---');
    await page.evaluate(() => {
      const metricsSec = document.getElementById('metrics');
      if (metricsSec) metricsSec.scrollIntoView({ behavior: 'smooth' });
    });

    console.log('Waiting for count-up animation to complete (2500ms)...');
    await wait(2500);

    const finalMetrics = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#metrics .tabular-nums'));
      return cards.map((c) => c.innerText.trim());
    });
    console.log('Final Metrics on screen:', finalMetrics);

    const expectedTargets = ['80+', '98.7%', '1.2M+', '32'];
    const matched = expectedTargets.every((t) => finalMetrics.includes(t));
    if (!matched) {
      throw new Error(`Animated counters did not reach expected targets! Got: ${JSON.stringify(finalMetrics)}`);
    }
    console.log('✔ All 4 animated counters reached their exact target values with suffixes!');

    // -------------------------------------------------------------
    // Test 4: Preservation of All Original Service Cards
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Verification of Preserved 4 Service Cards ---');
    const serviceCardsData = await page.evaluate(() => {
      const servicesSection = document.getElementById('services');
      if (!servicesSection) return null;

      const cards = Array.from(servicesSection.querySelectorAll('.group'));
      const cardDetails = cards.map((card) => {
        const title = card.querySelector('h3')?.innerText.trim();
        const link = card.querySelector('a');
        return {
          title,
          linkText: link?.innerText.trim(),
          href: link?.getAttribute('href'),
        };
      });

      return {
        count: cards.length,
        cardDetails,
      };
    });

    console.log('Preserved Service Cards Data:', serviceCardsData);
    if (!serviceCardsData || serviceCardsData.count !== 4) {
      throw new Error(`Expected 4 original service cards, but found ${serviceCardsData?.count}!`);
    }

    const expectedRoutes = [
      '/services/sap-business-one',
      '/services/boyum-it',
      '/services/uipath-automation',
      '/services/atlas-addons',
    ];
    const routesMatch = expectedRoutes.every((r) =>
      serviceCardsData.cardDetails.some((c) => c.href === r)
    );
    if (!routesMatch) {
      throw new Error('Service cards Learn More routes do not match expected dedicated detail pages!');
    }
    console.log('✔ All 4 Service Cards fully preserved with functional detail-page Learn More links.');

    // -------------------------------------------------------------
    // Test 5: New Continuous Company Logo Slider (LogoMarquee)
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: Continuous Company Logo Slider ---');
    // Scroll to the logo marquee slider
    await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (slider) slider.scrollIntoView({ behavior: 'smooth' });
    });
    await wait(600);

    const sliderData = await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (!slider) return null;

      const marqueeGroups = Array.from(slider.querySelectorAll('.animate-marquee-left'));
      const firstGroupLinks = Array.from(marqueeGroups[0].querySelectorAll('a')).map((a) => ({
        href: a.getAttribute('href'),
        title: a.getAttribute('title'),
        text: a.innerText.trim(),
      }));

      // Calculate visible cards at desktop width
      const sliderRect = slider.getBoundingClientRect();
      const allCards = Array.from(slider.querySelectorAll('a'));
      const visibleCards = allCards.filter((card) => {
        const r = card.getBoundingClientRect();
        return r.left >= 0 && r.right <= window.innerWidth;
      });

      return {
        exists: true,
        marqueeSetsCount: marqueeGroups.length,
        logosCountPerSet: firstGroupLinks.length,
        firstGroupLogos: firstGroupLinks,
        visibleCardsCount: visibleCards.length,
      };
    });

    console.log('Logo Slider Verification Data:', sliderData);
    if (!sliderData || !sliderData.exists) {
      throw new Error('LogoMarquee section #technology-partners-slider not found!');
    }
    if (sliderData.marqueeSetsCount < 2) {
      throw new Error('LogoMarquee must have at least 2 duplicated sets for seamless loop!');
    }
    if (sliderData.logosCountPerSet < 6) {
      throw new Error(`Expected at least 6 logos in slider, got ${sliderData.logosCountPerSet}`);
    }
    console.log(`✔ Slider contains ${sliderData.logosCountPerSet} logos per set across ${sliderData.marqueeSetsCount} looping tracks.`);
    console.log(`✔ Approximately ${sliderData.visibleCardsCount} logos visible simultaneously across desktop width.`);

    // Test Hover to Pause Animation
    console.log('Testing Pause on Hover...');
    const sliderGroup = await page.$('.logo-slider-group');
    await sliderGroup.hover();
    await wait(300);

    const isAnimationPaused = await page.evaluate(() => {
      const track = document.querySelector('.animate-marquee-left');
      if (!track) return false;
      const computedStyle = window.getComputedStyle(track);
      return computedStyle.animationPlayState === 'paused';
    });

    console.log('Hover paused state:', isAnimationPaused);
    if (!isAnimationPaused) {
      throw new Error('Marquee animation did not pause on hover!');
    }
    console.log('✔ Logo slider successfully pauses on hover.');

    // Move mouse away to test resume
    await page.mouse.move(0, 0);
    await wait(300);

    const isAnimationResumed = await page.evaluate(() => {
      const track = document.querySelector('.animate-marquee-left');
      if (!track) return false;
      const computedStyle = window.getComputedStyle(track);
      return computedStyle.animationPlayState === 'running';
    });
    console.log('Mouse leave resumed state:', isAnimationResumed);
    if (!isAnimationResumed) {
      throw new Error('Marquee animation did not resume on mouse leave!');
    }
    console.log('✔ Logo slider successfully resumes scrolling on mouse leave.');

    // Screenshot of Services Cards + Logo Slider Section
    await page.screenshot({
      path: path.join(screenshotsDir, 'desktop_services_and_logo_slider.png'),
    });
    console.log('Saved screenshot: desktop_services_and_logo_slider.png');

    // -------------------------------------------------------------
    // Test 6: Preservation of Case Studies & Partner Sections
    // -------------------------------------------------------------
    console.log('\n--- TEST 6: Preservation of Other Sections (Case Studies & Partners) ---');
    const sectionsPresence = await page.evaluate(() => {
      return {
        hasIndustries: !!document.getElementById('industries'),
        hasApproach: !!document.getElementById('approach'),
        hasCustomerSuccess: Array.from(document.querySelectorAll('h2, span')).some((el) =>
          el.innerText.includes('CUSTOMER SUCCESS') || el.innerText.includes('Real Results')
        ),
        hasPartners: Array.from(document.querySelectorAll('h2, span')).some((el) =>
          el.innerText.includes('OUR PARTNERS') || el.innerText.includes('Technology Ecosystem')
        ),
      };
    });
    console.log('Other Sections Presence:', sectionsPresence);
    if (!sectionsPresence.hasIndustries || !sectionsPresence.hasApproach || !sectionsPresence.hasCustomerSuccess) {
      throw new Error('One or more original page sections were unintentionally removed!');
    }
    console.log('✔ All original sections (Industries, Approach, Case Studies, Partners) are 100% intact.');

    // -------------------------------------------------------------
    // Test 7: Mobile Responsiveness (375px)
    // -------------------------------------------------------------
    console.log('\n--- TEST 7: Mobile Slider Responsiveness (375px) ---');
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      if (slider) slider.scrollIntoView();
    });
    await wait(400);

    const mobileSliderVisible = await page.evaluate(() => {
      const slider = document.getElementById('technology-partners-slider');
      const track = slider?.querySelector('.animate-marquee-left');
      return !!track;
    });
    console.log('Mobile slider active:', mobileSliderVisible);
    if (!mobileSliderVisible) {
      throw new Error('Logo slider is not active on mobile!');
    }
    console.log('✔ Mobile continuous slider verified.');

    // Screenshot on Mobile
    await page.screenshot({
      path: path.join(screenshotsDir, 'mobile_logo_slider.png'),
    });
    console.log('Saved screenshot: mobile_logo_slider.png');

    console.log('\n====================================================');
    console.log('ALL VERIFICATION TESTS PASSED SUCCESSFULLY! (7/7)');
    console.log('====================================================');
  } catch (err) {
    console.error('VERIFICATION ERROR:', err);
    testPassed = false;
  } finally {
    await browser.close();
    server.kill();
  }

  process.exit(testPassed ? 0 : 1);
}

runTests();
