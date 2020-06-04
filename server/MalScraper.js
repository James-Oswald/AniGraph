/*I really wanted to make my own web scraper rather then use the MAL Scraper some one else already made,
however I'll probably end up forking this project and creating a new version without this custom one for
a speed comparison at some point*/

const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


//function sliceName

function processPage(HTMLString, id) {
    let document = new JSDOM(HTMLString).window.document;
    let infobox = document.getElementsByClassName("borderClass")[0].children[0];
    let scrapeData = {}
    scrapeData["img"] = infobox.children[0].children[0].children[0].attributes["data-src"].value;
    for (let i = 0; i < infobox.children.length; i++) {
        let text = infobox.children[i].textContent.trim();
        if (/[a-zA-Z]+:\s.+/.test(text)) {
            let index = text.indexOf(":");
            scrapeData[text.substring(0, index)] = text.substring(index + 1, text.length).trim();
        }
    }

    return rv;
}

function scrape(AnimeId) { //, callback, delay = 1){
    let url = "https://myanimelist.net/anime/" + AnimeId + "/";
    let req = https.request(url, function(responce) {
        let data = "";
        let status = responce.statusCode;
        if (status == 200) {
            responce.setEncoding("utf8");
            responce.on("data", function(chunk) { data += chunk; });
            responce.on("end", function() {
                processPage(data, AnimeId);
            });
        } else {
            console.warn("Status Code " + status);
        }
    })
    req.on("error", function(err) {
        console.error(err);
    });
    req.end();
    //callback();
}

scrape(40591);