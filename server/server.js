
//using this to replace the python server for debuging as well as acting as a CORS proxy to get around stupid CORS rules for my XML Http requests

const http = require("http");
const https = require("https");
const fs = require("fs");
const mime = require("mime");
const url = require("url");
const dataStore = require("./MalDataStore");

//http://localhost:8000/list.json?user=Tenebris-Lux

function onRequest(request, responce){
    console.log("Request for: " + request.url);
    let reqUrl = url.parse(request.url, true);
    if(reqUrl.pathname == "/list.json"){
        let query = reqUrl.query;
        if(query != null && query.user != undefined){
            let url = "https://myanimelist.net/animelist/" + query.user + "/load.json";
            let malReq = https.request(url, function(malResponce){
                let data = "";
                let status = malResponce.statusCode;
                if(status == 200){
                    malResponce.setEncoding("utf8");
                    malResponce.on("data", function(chunk){data += chunk;});
                    malResponce.on("end", function(){
                        let listData = JSON.parse(data);
                        if(listData.errors != undefined){
                            console.error(listData.errors);
                            throw listData.errors;
                        }
                        let idList = [];
                        for(let i = 0; i < listData.length; i++)
                            idList.push(listData[i].anime_id)
                        dataStore.queryIds(idList, function(animeInfo){
                            let finalObject = {
                                userData: listData,
                                animeData: animeInfo
                            };
                            responce.writeHead(200, {"Content-Type": "application/json"});
                            responce.write(JSON.stringify(finalObject)); 
                            responce.end();
                        });
                    });
                }else{
                    console.warn("Status Code " + status);
                }
            });
            malReq.on("error", function(err){console.error(err);});
            malReq.end();
        }
    }else{
        let path = "../client/" + request.url;
        fs.readFile(path, function(err, data){
            if(err){
                responce.writeHead(404);
                responce.end();
            }else{
                let mimetype = mime.getType(path);
                responce.writeHead(200, {"Content-Type": mimetype});
                responce.write(data); 
                responce.end();
            }
        });
    }
}

http.createServer(onRequest).listen(8000);


/*let urlQ = url.parse(request.url, true).query;
        console.log(urlQ);
        let decUrl = decodeURI(urlQ.encoded)
        let urlO = new URL(decUrl);
        /*let options = {
            hostname: urlO.hostname,
            path: urlO.path,
            port: urlO.port
        };
        let req = https.request(urlO, function(getResponce){
            let data = "";
            getResponce.setEncoding("utf8");
            getResponce.on("data", function(chunk){data += chunk;});
            getResponce.on("end", function(){
                console.log(data);
            });
        })
        req.on("error", function(err){console.log(err);});
        req.end();
        //*/