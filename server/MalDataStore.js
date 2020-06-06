let fs = require("fs");
let scraper = require("MalScraper.js");

let animeData = null;
function init(callback = function(){}){
    fs.readFile("animeData.json", function(err, data){
        if(err){
            console.error(err);
            throw err;
        }
        animeData = JSON.parse(data);
        callback();
    });
}

function queryIds(ids, callback){
    if(animeData == null){
        init(function(){
            queryIds(ids);
        });
        return;
    }
    let confirmed = 0;
    for(id of ids){
        if(animeData[id] == undefined)
            scraper.scrape(id, function(data){
                animeData[id] = data;
                confirmed++;
                if(confirmed == ids.length)
                    callback();
            });
        else
            confirmed++;
    }
    if(confirmed == ids.length)
        callback();
}

module.exports.init = init;
module.exports.queryIds = queryIds;