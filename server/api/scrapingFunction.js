const puppeteer = require ('puppeteer');

const Scrape = (res, url, searchTerm) => {
    //clean search term to prep for RegEx search
    const termArray = searchTerm.split('')
    while(termArray[0]=== ' '){
        termArray.shift()
    }
    while(termArray[termArray.length-1]===' ' && termArray[termArray-2]===' '){
        termArray.pop()
    }
    // if(termArray[termArray.length-1]!==' '){
    //     termArray.push(' ')
    // }
    searchTerm = termArray.join('')

    console.log('new--->', searchTerm.length)
    puppeteer
    .launch ()
    .then (async browser => {
    
        //opening a new page and navigating to Reddit
        const page = await browser.newPage ();
        console.log('url--->', url)
        await page.goto(url);
        //await page.waitForSelector('body');
        const extractedText = await page.$eval('*', (el) => el.innerText)
        const regex = new RegExp("^", searchTerm, "$gi")
        //const regex = /(help\s)/gi
        const found = extractedText.match(regex)
        console.log('found-->', found)
        
        await browser.close ();
        res.json({result: found})
    })
    //handling any errors
    .catch (function (err) {
        console.error (err);
    });
}

module.exports = Scrape