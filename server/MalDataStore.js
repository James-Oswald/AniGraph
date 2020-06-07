const fs = require("fs");
const scraper = require("./MalScraper");

let debug = true;

let animeData = null;
function init(cback){
    if(debug)
        console.log("Initilizing ")
    fs.readFile("animeData.json", function(err, data){
        if(err){
            console.error(err);
            throw err;
        }
        animeData = JSON.parse(data);
        cback();
    });
}

function queryIds(ids, cback){
    if(animeData == null){
        init(function(){
            queryIds(ids, cback);
        });
        return;
    }
    let confirmed = 0;
    let scraped = 0;
    let requestedInfo = [];
    for(let i = 0; i < ids.length; i++){
        if(animeData[ids[i]] == undefined){
            scraped++;
            let delay = (5 + Math.floor(5 * Math.random())) * scraped * 1000;
            if(debug) 
                console.log("Scheduling scrape "+ scraped +" for ID:" + ids[i] + " with delay of " + (delay / 1000) + " seconds");
            setTimeout(function(){
                if(debug) 
                    console.log("Begining scrape "+ confirmed +" for ID:" + ids[i]);
                scraper.scrape(ids[i], function(data){
                    if(debug) 
                        console.log("Finished Scrape "+ confimred +" for ID:" + ids[i]);
                    animeData[ids[i]] = data;
                    requestedInfo.push(animeData[ids[i]]);
                    confirmed++;
                    if(confirmed == ids.length){
                        fs.writeFile("animeData.json", JSON.stringify(animeData), function(){});
                        cback(requestedInfo);
                    }
                });
            }, delay);
        }
        else{
            requestedInfo.push(animeData[ids[i]]);
            confirmed++;
        }
    }
    if(confirmed == ids.length)
        cback(requestedInfo);
}

/*
if(debug)
    queryIds([40591, 40221, 39463], function(data){
        console.log(data)
    });
    */

module.exports.init = init;
module.exports.queryIds = queryIds;