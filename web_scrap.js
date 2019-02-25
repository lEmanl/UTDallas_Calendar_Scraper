//  web_scrap.js

const https = require("https")
const cheerio = require("cheerio")

/*

event (#event-detail .cat-events.thirty-type)
|
|_title         (.featured-title a)
|_day           (.day)
|_month         (month)
|_day number    (span day-left)
|_time          (span event-time-left id tleft)
|_location      (span featured-location span orange)

*/

//  export of webScraper function with callback
exports.webScraper = function (callback) {
    
    const url = "https://www.utdallas.edu/calendar/mobile/events-by-date.php?type=thirty"

    /*
        Gets our html data from utdallas calendar website
    */
    https.get(url, (res) => {

        //  holds html data from website
        let data = ''
    
        //  on response, appends to data string
        res.on('data', (chunk) => {
            data += chunk
        })
        
        //  on end response, save relevant html data into object 'events'
        res.on('end', () => {

            console.log("Finished collecting data!")

            //  object to hold events data
            let events = []

            //  loads html into jquery object
            let $ = cheerio.load(data)

            //  for each object of '#event-detail .cat-events.thirty-type'
            $('#event-detail .cat-events.thirty-type').each(function(index, element){

                //  index = iteration number (ex: first pass index = 0, second index = 1, etc)
                events[index] = {}
                events[index]['title'] = $(element).find('.featured-title a').text()
                events[index]['day'] = $(element).find('.day').text()
                events[index]['month'] = $(element).find(".month").text()
                events[index]['day'] = $(element).find(".day-left").text()
                events[index]['time'] = $(element).find(".event-time-left").text()

                console.log(events[index])
            })

            //  if successfully got data, then callback function used with events object passed to it
            return callback(events)

        })
    }).on("error", (err) => {
        console.log("Error: " + err.message)

        //  return error if error on get request
        return "err"

    })
}