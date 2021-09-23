const router = require('express').Router()
const Scrape = require('./scrapingFunction')


router.get('/', async (req, res, next) => {
  try {
    
    let result = await Scrape(res, 'https://www.forextradingbig.com/instaforex-broker-review/', 'Big')
      
      console.log(result)
    //res.json({result: result});
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const {url, searchTerm} = req.body
    await Scrape(res, url, searchTerm)
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
