// Additional features for delaying and merging images into PDFs

const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function combineImagesToPDF(imagePaths, outputPdfPath) {
  const pdfDoc = await PDFDocument.create();

  for (const imagePath of imagePaths) {
    const imageBytes = fs.readFileSync(imagePath);
    const image = await pdfDoc.embedPng(imageBytes);
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, pdfBytes);
}

module.exports = { delay, combineImagesToPDF };
