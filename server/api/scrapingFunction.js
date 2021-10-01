const puppeteer = require ('puppeteer');

const scrapingFunction = (res, url, searchTerm) => {
    //clean search term to prep for RegEx search
    const termArray = searchTerm.split('')
    while(termArray[0]=== ' '){
        termArray.shift()
    }
    while(termArray[termArray.length-1]===' '){
        termArray.pop()
    }
    searchTerm = termArray.join('')
    //scrape using puppeteer headless browser
    puppeteer
    .launch ()
    .then (async browser => {
    
        //opening a new page and navigating to url
        const page = await browser.newPage ();
        await page.goto(url);
        await page.waitForSelector('body');
        
        /*
        Pulling "innerText" alone seems to result in some instances of the word being missed
        For next steps beyond this submission, I would like to do further research on how to more accurately 
        pull all the text from a page
        */
        const extractedText = await page.$eval('*', (el) => el.innerText)
        //\W*((?i){searchTerm}(?-i))\W*
        //const regex = new RegExp(`\W*((?i)${searchTerm}(?-i))\W*`, "gi")
        const regex = new RegExp(`\\b${searchTerm}\\b`, "gi")
        //const regexPunc = new RegExp(`\\b${searchTerm}\\b`, "gi")
        const found = extractedText.match(regex)
        console.log('found---->', found)
        await browser.close ();
        if(found===null){
            res.json(0)
        }
        else res.json(found.length)
    })
    //handling any errors
    .catch (function (err) {
        res.json("Error")
        console.error (err);
    });
}

module.exports = scrapingFunction