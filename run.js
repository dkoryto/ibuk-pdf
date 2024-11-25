// Starting point. Runs the scraper script

const { exec } = require("child_process");
const path = require("path");

const scraperPath = path.join(__dirname, "src", "scraper.js");

exec(`node ${scraperPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
