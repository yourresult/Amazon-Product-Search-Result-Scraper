import cheerio from 'cheerio';

/**
 * Through this function, it collects important data from the source data. The format of the collected data is 
 * [{title: string,
   image: string,
   totalRatings: string,
   starRating: string,
   price: number,
   productLink: string,
   pagination: string}]
 */
function searchResults(souce) {
    let result = [];
    const $ = cheerio.load(souce);
    $("div.s-asin > div").each((i,v) => {
        result.push(
            {
                title: $(v).find(".s-title-instructions-style").text(),
                image: $(v).find("div img").attr("src"),
                totalRatings: ($(v).find("span.s-underline-text").text().match("\((.*)\)")[0]).replace(/,/g, ''),
                starRating: $(v).find("span.a-size-base.puis-bold-weight-text").text(),
                price: parseFloat($(v).find("span.a-price-whole").text().replace(/,/g, '')),
                productLink: $(".s-title-instructions-style > h2 > a").attr("href"),
                pagination: $(".s-pagination-selected").text()
            }
        )
        
    })
    return result;
}

export { searchResults }
