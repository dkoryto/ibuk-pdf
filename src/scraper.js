const puppeteer = require('puppeteer');
const { delay, combineImagesToPDF } = require('./utils');
const { startPage, totalPages, screenshotsParentDir, pdfParentDir, loginUrl, targetUrl, credentials } = require('../config');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-fullscreen']  // Fullscreen mode
  });
  const page = await browser.newPage();

  // Set viewport for high-quality screenshots
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  // Open login page
  await page.goto(loginUrl, { waitUntil: 'networkidle2' });

  // Perform login
  await page.type('#loginform-username', credentials.username);
  await page.type('#loginform-password', credentials.password);
  await page.focus('#customer_login > div.clearfix > button');
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('Logged in successfully');

  // Navigate to target page
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });
  await delay(5000);  // Ensure everything is loaded

  // Get the page title to use as the PDF filename and folder name
  const pageTitle = await page.title();
  const sanitizedTitle = pageTitle.replace(/[<>:"\/\\|?*]+/g, '');  // Remove illegal characters for file names

  // Define paths for screenshots and PDF
  const screenshotDir = path.join(screenshotsParentDir, sanitizedTitle);  // Create a folder inside screenshots
  const outputPdfPath = path.join(pdfParentDir, `${sanitizedTitle}.pdf`);

  // Ensure directories exist
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  if (!fs.existsSync(pdfParentDir)) {
    fs.mkdirSync(pdfParentDir, { recursive: true });
  }

  const images = [];

  for (let i = startPage; i < startPage + totalPages; i++) {
    await delay(3000);

    // Click on the current page number and input new page number
    await page.click('#current-page-number');
    await page.click('#go-to-page');
    await page.keyboard.press('Backspace');  // Clear previous value
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.type('#go-to-page', String(i));
    await page.keyboard.press('Enter');

    // Delay to allow page to load
    await delay(5000);

    // Screenshot path and page block selector
    const screenshotPath = path.join(screenshotDir, `page${i}.png`);
    const pageBlockId = `#page${i}`;
    const pageElement = await page.$(pageBlockId);

    if (pageElement) {
      const boundingBox = await pageElement.boundingBox();
      await page.screenshot({
        path: screenshotPath,
        clip: {
          x: boundingBox.x,
          y: boundingBox.y,
          width: boundingBox.width,
          height: boundingBox.height
        }
      });
      console.log(`Saved block ${pageBlockId} as ${screenshotPath}`);
      images.push(screenshotPath);
    } else {
      console.log(`Block ${pageBlockId} not found.`);
    }
  }

  await browser.close();

  // Combine all screenshots into a single PDF with the dynamic title
  await combineImagesToPDF(images, outputPdfPath);
  console.log(`All pages combined into ${sanitizedTitle}.pdf`);
})();
