/*I really wanted to make my own web scraper rather then use the MAL Scraper some one else already made,
however I'll probably end up forking this project and creating a new version without this custom one for
a speed comparison at some point*/

const https = require("https");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

//Empty Structure for an Anime Object
const AnimeStructure = {
    img: null,
    info:{
        english: null,
        synonyms: [],
        japanese: null,
        type: null,
        episodes: null,
        status: null,
        aired: null, 
        premiered: null,
        broadcast: null,
        producers: [],
        licensors: [],
        studios: [],
        source: null,
        genres: [],
        duration: null,
        rating: null,
        score: null,
        ranked: null,
        popularity: null,
        members: null,
        favorites: null,
    }, 
    related:{
        adaptation: [],
        "spin-off": [],
        "side story": [],
        summary: [],
        sequel: [],
        character: [],
        other: [],
        "alternative version": [],
        prequel: [],
        adaptationId: [],
        "spin-offId": [],
        "side storyId": [],
        summaryId: [],
        sequelId: [],
        characterId: [],
        otherId: [],
        "alternative versionId": [],
        prequelId: [],
    }
};

//Convert raw HTML Page from MAL to an Anime Object
function processPage(HTMLString, id){
    let document = new JSDOM(HTMLString).window.document;
    let scrapeData = Object.assign({}, AnimeStructure);
    let infobox = document.getElementsByClassName("borderClass")[0].children[0];
    scrapeData["img"] = infobox.children[0].children[0].children[0].attributes["data-src"].value;
    for(let i = 0; i < infobox.children.length; i++) {
        let text = infobox.children[i].textContent.trim();
        if(/^[a-zA-Z]+:\s.+$/.test(text)) {
            let index = text.indexOf(":");
            let value = text.substring(index + 1, text.length).trim();
            let label = text.substring(0, index).toLowerCase();
            if(AnimeStructure["info"][label] != null){
                value = value.split(",");
                for(let j = 0; j < value.length; j++)
                    value[j] = value[j].trim();
            }else
                value.trim();
            scrapeData["info"][label] = value;
        }
    }
    let related = document.getElementsByClassName("anime_detail_related_anime");
    if(related.length > 0){
        let relatedbox = related[0].children[0];
        for(let i = 0; i < relatedbox.children.length; i++){
            let text = relatedbox.children[i].textContent.trim();
            let index = text.indexOf(":");
            let value = text.substring(index + 1, text.length).trim().split(",");
            let label = text.substring(0, index).toLowerCase();
            for(let j = 0; j < value.length; j++)
                value[j] = value[j].trim();
            scrapeData["related"][label] = value;
            let tags = relatedbox.children[i].children[1].children;
            let ids = [];
            for(let tag of tags){
                let id = tag.href.match(/[0-9]+/);
                if(id.length == 1)
                    ids.push(id[0]);
            }
            scrapeData["related"][label + "Id"] = ids;
        }
    }
    return scrapeData;
}

function scrape(AnimeId, callback){
    let url = "https://myanimelist.net/anime/" + AnimeId + "/";
    let req = https.request(url, function(responce) {
        let data = "";
        let status = responce.statusCode;
        if(status == 200) {
            responce.setEncoding("utf8");
            responce.on("data", function(chunk) { data += chunk; });
            responce.on("end", function() {
                callback(processPage(data, AnimeId));
            });
        } else {
            console.warn("Status Code " + status);
        }
    });
    req.on("error", function(err) {
        console.error(err);
    });
    req.end();
}

module.exports.scrape = scrape;