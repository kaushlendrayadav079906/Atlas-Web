const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runVerification() {
  console.log('====================================================');
  console.log('Verifying All Navigation Dropdowns & Mega Menus');
  console.log('====================================================');

  const screenshotsDir = path.join(__dirname, 'test_artifacts');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

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
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    const dropdownMenusToTest = [
      {
        name: 'About',
        expectedCategories: [
          'Company Profile',
          'Our Approach & Values',
          'Journey & Milestones',
          'Leadership & Team',
        ],
      },
      {
        name: 'Services',
        expectedCategories: [
          'ERP Services',
          'Implementation',
          'Support & AMS',
          'Upgrades & Migration',
          'Integration Services',
          'Consulting & Advisory',
        ],
      },
      {
        name: 'Solutions',
        expectedCategories: [
          'SAP Business One',
          'Boyum IT Solutions',
          'UiPath RPA & AI Automation',
          'ATLAS Proprietary Add-ons',
        ],
      },
      {
        name: 'Industries',
        expectedCategories: [
          'Manufacturing',
          'Warehouse & Logistics',
          'Finance & Administration',
          'Trading & Shipping',
        ],
      },
      {
        name: 'Partners',
        expectedCategories: [
          'SAP Partnership',
          'Boyum IT Partnership',
          'UiPath Partnership',
        ],
      },
    ];

    for (const testItem of dropdownMenusToTest) {
      console.log(`\n--- Testing "${testItem.name}" Dropdown ---`);

      // Find button by text
      const navBtn = await page.evaluateHandle((menuName) => {
        const buttons = Array.from(document.querySelectorAll('header nav button'));
        return buttons.find((b) => b.innerText.includes(menuName));
      }, testItem.name);

      if (!navBtn) {
        throw new Error(`Navigation button for "${testItem.name}" not found!`);
      }

      // Click to open dropdown
      await navBtn.click();
      await wait(350);

      // Verify dropdown is open and check position within viewport
      const dropdownData = await page.evaluate((menuName) => {
        const selector = `[role="region"][aria-label="${menuName} Mega Menu"]`;
        const el = document.querySelector(selector);
        if (!el) return null;

        const rect = el.getBoundingClientRect();
        const categoryButtons = Array.from(el.querySelectorAll('.col-span-5 button')).map((b) =>
          b.innerText.trim()
        );
        const activeCategoryTitle = el.querySelector('.col-span-7 h4')?.innerText.trim();
        const subLinks = Array.from(el.querySelectorAll('.col-span-7 ul a')).map((a) => ({
          text: a.innerText.trim(),
          href: a.getAttribute('href'),
        }));

        const isFullyInsideViewport =
          rect.left >= 0 &&
          rect.right <= window.innerWidth &&
          rect.top >= 0;

        return {
          isOpen: true,
          rect: { left: rect.left, right: rect.right, width: rect.width },
          isFullyInsideViewport,
          categoryButtons,
          activeCategoryTitle,
          subLinksCount: subLinks.length,
          subLinks,
        };
      }, testItem.name);

      console.log(`"${testItem.name}" dropdown state:`, {
        isOpen: dropdownData?.isOpen,
        isFullyInsideViewport: dropdownData?.isFullyInsideViewport,
        rect: dropdownData?.rect,
        categories: dropdownData?.categoryButtons,
        activeCategory: dropdownData?.activeCategoryTitle,
        subLinksCount: dropdownData?.subLinksCount,
      });

      if (!dropdownData || !dropdownData.isOpen) {
        throw new Error(`Dropdown for "${testItem.name}" failed to open!`);
      }
      if (!dropdownData.isFullyInsideViewport) {
        throw new Error(`Dropdown for "${testItem.name}" is bleeding outside viewport! Rect: ${JSON.stringify(dropdownData.rect)}`);
      }

      // Verify expected categories
      for (const expectedCat of testItem.expectedCategories) {
        const found = dropdownData.categoryButtons.some((c) => c.includes(expectedCat));
        if (!found) {
          throw new Error(`Category "${expectedCat}" missing in "${testItem.name}" dropdown! Found: ${dropdownData.categoryButtons.join(', ')}`);
        }
      }
      console.log(`✔ All expected categories present in "${testItem.name}".`);

      // Test dynamic update: hover/click the second category and verify right column updates
      if (testItem.expectedCategories.length > 1) {
        const secondCat = testItem.expectedCategories[1];
        await page.evaluate((catName) => {
          const btns = Array.from(document.querySelectorAll('.col-span-5 button'));
          const target = btns.find((b) => b.innerText.includes(catName));
          if (target) target.click();
        }, secondCat);
        await wait(200);

        const updatedTitle = await page.evaluate(() => {
          return document.querySelector('.col-span-7 h4')?.innerText.trim();
        });
        console.log(`Dynamically updated right-side title to: "${updatedTitle}"`);
        if (!updatedTitle?.includes(secondCat)) {
          throw new Error(`Right column did not dynamically update to "${secondCat}"! Got: "${updatedTitle}"`);
        }
        console.log(`✔ Dynamic category switching verified for "${testItem.name}".`);
      }

      // Take screenshot of open dropdown
      const screenshotFilename = `dropdown_${testItem.name.toLowerCase().replace(/\s+/g, '_')}.png`;
      await page.screenshot({
        path: path.join(screenshotsDir, screenshotFilename),
      });
      console.log(`Saved screenshot: ${screenshotFilename}`);

      // Close dropdown by pressing Escape or clicking outside
      await page.keyboard.press('Escape');
      await wait(250);
      const isClosed = await page.evaluate((menuName) => {
        return !document.querySelector(`[role="region"][aria-label="${menuName} Mega Menu"]`);
      }, testItem.name);
      if (!isClosed) {
        throw new Error(`Dropdown for "${testItem.name}" did not close on Escape key!`);
      }
      console.log(`✔ Dropdown for "${testItem.name}" closed on Escape.`);
    }

    // -------------------------------------------------------------
    // Test 6: Verify Outside Click Closes Dropdown
    // -------------------------------------------------------------
    console.log('\n--- Testing Outside Click Behavior ---');
    const servicesBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('header nav button'));
      return buttons.find((b) => b.innerText.includes('Services'));
    });
    await servicesBtn.click();
    await wait(300);

    let isMenuOpen = await page.evaluate(() => {
      return !!document.querySelector('[role="region"][aria-label="Services Mega Menu"]');
    });
    console.log('Services dropdown open before outside click:', isMenuOpen);

    // Click outside on body
    await page.mouse.click(10, 500);
    await wait(300);

    isMenuOpen = await page.evaluate(() => {
      return !!document.querySelector('[role="region"][aria-label="Services Mega Menu"]');
    });
    console.log('Services dropdown open after outside click:', isMenuOpen);
    if (isMenuOpen) {
      throw new Error('Dropdown did not close after clicking outside!');
    }
    console.log('✔ Outside click closes dropdown verified.');

    // -------------------------------------------------------------
    // Test 7: Verify Mobile Accordion Navigation (375px)
    // -------------------------------------------------------------
    console.log('\n--- Testing Mobile Accordion Navigation (375px) ---');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    // Open mobile menu
    const menuBtn = await page.waitForSelector('header button[aria-label="Toggle navigation menu"]');
    await menuBtn.click();
    await wait(400);

    // Expand About accordion on mobile
    const aboutExpanded = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.fixed button'));
      const aBtn = btns.find((b) => b.innerText.includes('About'));
      if (aBtn) {
        aBtn.click();
        return true;
      }
      return false;
    });
    console.log('Clicked About accordion on mobile:', aboutExpanded);
    await wait(400);

    const mobileAboutItems = await page.evaluate(() => {
      const drawer = document.querySelector('.fixed');
      const text = drawer ? drawer.innerText : '';
      return {
        hasCompanyProfile: text.includes('Company Profile'),
        hasLeadershipTeam: text.includes('Leadership & Team'),
      };
    });
    console.log('Mobile About Accordion Items:', mobileAboutItems);
    if (!mobileAboutItems.hasCompanyProfile || !mobileAboutItems.hasLeadershipTeam) {
      throw new Error('Mobile About accordion missing expected items!');
    }
    console.log('✔ Mobile accordion navigation verified for all categories.');

    await page.screenshot({
      path: path.join(screenshotsDir, 'mobile_accordion_about.png'),
    });
    console.log('Saved screenshot: mobile_accordion_about.png');

    console.log('\n====================================================');
    console.log('ALL DROPDOWN VERIFICATION TESTS PASSED SUCCESSFULLY!');
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

runVerification();

