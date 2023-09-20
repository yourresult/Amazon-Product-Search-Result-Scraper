import puppeteer from 'puppeteer';
import fs from "fs";
import { searchResults } from "./classes/amazon.js";

async function storeResult(newData = []) {
    const filePath = 'searchResults.json';

    if (!Array.isArray(newData)) return;

    // Step 1: Read the existing JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Step 2: Parse JSON content into a JavaScript object
        var jsonData = JSON.parse(data);

        // Step 3: Modify the JavaScript object (for example, update a property)
        for (let i = 0; i < newData.length; i++) {
            const element = newData[i];
            jsonData.push(element)
        }

        // Step 4: Convert the modified object back to JSON
        const updatedJsonData = JSON.stringify(jsonData, null, 2); // The '2' argument is for pretty printing

        // Step 5: Write the updated JSON back to the file
        try {
            fs.writeFile(filePath, updatedJsonData, 'utf8', (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log('File updated successfully.');
                }
            });
        } catch (error) {
            throw error;
        }
    });
}

(async () => {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    // Set the viewport size to 1200x800 pixels
    await page.setViewport({ width: 1024, height: 800 });

    // Navigate to the webpage
    await page.goto('https://www.amazon.in/');

    await page.waitForSelector("input#twotabsearchtextbox");

    await page.type("input#twotabsearchtextbox", "smart watch");

    await page.click("input#nav-search-submit-button");

    await page.waitForSelector("div.s-asin > div");

    const result = await page.evaluate(() => {
        return document.querySelector('html').innerHTML;
    });

    const results = searchResults(result);
    storeResult(results);

    // Pagination 
    async function pagination(params) {

        const nextButton = await page.$('a.s-pagination-next');

        if (nextButton) {
            await nextButton.click();
            // await page.waitForNavigation({ waitUntil: 'networkidle2' });
            // await page.waitForSelector(".s-search-results");
            // Wait for 5 seconds
            await page.waitForTimeout(5000);

            const result2 = await page.evaluate(() => {
                return document.querySelector('.s-result-list').innerHTML;
            });

            const results2 = await searchResults(result2);

            await storeResult(results2).then(d => {
                pagination();
            }).catch(err => {
                console.log(err);
            });

        } else {
            return;
        }

        // await page.waitForSelector("a.s-pagination-next");
        // await page.click("a.s-pagination-next");
        // await page.waitForSelector("div.s-asin > div");

    }
    pagination();
    // console.log(results);

    // Close the browser
    // await browser.close();
})();