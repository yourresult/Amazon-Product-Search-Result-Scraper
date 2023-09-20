# Amazon Product Search Scraper

![GitHub last commit](https://img.shields.io/github/last-commit/your-username/your-repo-name)
![GitHub issues](https://img.shields.io/github/issues/your-username/your-repo-name)
![GitHub forks](https://img.shields.io/github/forks/your-username/your-repo-name)
![GitHub stars](https://img.shields.io/github/stars/your-username/your-repo-name)

## Description

This application allows you to scrape product search results from Amazon using Puppeteer. It can collect data from multiple pages of search results, storing the information in a JSON file named `searchResults.json` and also converting it into an Excel file named `searchResults.xlsx`. You can use this tool to scrape all the results for a given keyword on Amazon.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Important Files](#important-files)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourresult/amazon_acraper.git
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Configure your Puppeteer settings if needed in the `index.js` file.

## Usage

1. Run the application using the following command:

   ```bash
   node index.js
   ```

2. The application will launch a headless browser, navigate to Amazon, and perform a search based on the keyword specified in the `index.js` file (`"smart watch"` by default).

3. The search results will be scraped, and the data will be stored in the `searchResults.json` file.

4. The application will also attempt to paginate through the search results, collecting data from multiple pages and continuously updating the `searchResults.json` file.

## Important Files

1. **index.js**: This is the main application file that utilizes Puppeteer to scrape data from Amazon. It also handles pagination and stores the results in `searchResults.json`. You can configure the search keyword and other settings here.

2. **amazon.js**: This file exports a function `searchResults` that takes the HTML source of an Amazon search results page and extracts relevant data, such as product titles, images, ratings, prices, and more.

## Contributing

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README.md file to better suit your project's needs. Good luck with your Amazon product search scraper!