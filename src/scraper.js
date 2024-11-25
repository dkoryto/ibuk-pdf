// Main script: login, navigation, screenshots in the browser and PDF creation

const puppeteer = require("puppeteer");
const { delay, combineImagesToPDF } = require("./utils");
const {
  startPage,
  totalPages,
  screenshotsParentDir,
  pdfParentDir,
  loginUrl,
  targetUrl,
  credentials,
} = require("../config");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-fullscreen"],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(loginUrl, { waitUntil: "networkidle2" });
  await page.type("#loginform-username", credentials.username);
  await page.type("#loginform-password", credentials.password);
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await page.goto(targetUrl, { waitUntil: "networkidle2" });
  await delay(5000);

  const pageTitle = await page.title();
  const sanitizedTitle = pageTitle.replace(/[<>:"\/\\|?*]+/g, "");
  const screenshotDir = path.join(screenshotsParentDir, sanitizedTitle);
  const outputPdfPath = path.join(pdfParentDir, `${sanitizedTitle}.pdf`);

  if (!fs.existsSync(screenshotDir))
    fs.mkdirSync(screenshotDir, { recursive: true });
  if (!fs.existsSync(pdfParentDir))
    fs.mkdirSync(pdfParentDir, { recursive: true });

  const images = [];

  for (let i = startPage; i < startPage + totalPages; i++) {
    await delay(3000);
    await page.click("#current-page-number");
    await page.click("#go-to-page");
    await page.keyboard.press("Backspace");
    await page.type("#go-to-page", String(i));
    await page.keyboard.press("Enter");
    await delay(5000);

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
          height: boundingBox.height,
        },
      });
      images.push(screenshotPath);
    }
  }

  await browser.close();
  await combineImagesToPDF(images, outputPdfPath);
})();
