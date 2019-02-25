//  example.js

const scrap = require('./web_scrap.js')

//  passes callback function to webscraper to print events object
scrap.webScraper(function(events) {
    console.log(events)
})