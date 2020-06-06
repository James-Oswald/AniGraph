const fs = require("fs");
const scraper = require("./MalScraper");

let animeData = null;
function init(cback){
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
    let requestedInfo = [];
    for(let i = 0; i < ids.length; i++){
        if(animeData[ids[i]] == undefined)
            scraper.scrape(ids[i], function(data){
                animeData[ids[i]] = data;
                requestedInfo.push(animeData[ids[i]]);
                confirmed++;
                if(confirmed == ids.length){
                    fs.writeFile("animeData.json", JSON.stringify(animeData), function(){});
                    cback(requestedInfo);
                }
            });
        else{
            requestedInfo.push(animeData[ids[i]]);
            confirmed++;
        }
    }
    if(confirmed == ids.length)
        callback(requestedInfo);
}

module.exports.init = init;
module.exports.queryIds = queryIds;