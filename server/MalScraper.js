
const https = require("https");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;


function processPage(HTMLString){
    let doc = new JSDOM(HTMLString);
    console.log(doc.window.document.title);
}

function scrape(AnimeId, callback, delay = 1){
    let url = "https://myanimelist.net/anime/" + AnimeId + "/";
    let req = https.request(url, function(responce){
        let data = "";
        let status = responce.statusCode;
        if(status == 200){
            responce.setEncoding("utf8");
            responce.on("data", function(chunk){data += chunk;});
            responce.on("end", function(){
                processPage(data);
            });
        }else{
            console.warn("Status Code " + status);
        }
    })
    req.on("error", function(err){
        console.error(err);
    });
    req.end();
    //callback();
}

scrape(40591, function(){});
//scrape(40591, function(){});
//scrape(40591, function(){});
//scrape(40591, function(){});