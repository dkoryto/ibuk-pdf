// Configuration file for the scraper
module.exports = {
  startPage: 1, // The pages from which to start scanning
  totalPages: 3,  // Page to finish scanning or number of pages in the book
  screenshotsParentDir: './screenshots',  // Parent directory to save screenshots
  pdfParentDir: './pdf',  // Directory to save PDF file
  loginUrl: 'https://www.ibuk.pl/logowanie.html',
  targetUrl: 'https://reader.ibuk.pl/?p=book:291462', // Link bought to the book
  credentials: {
    username: 'login', // Account login
    password: 'hasło' // Account password
  }
};
