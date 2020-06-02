
//using this to replace the python server for debuging as well as acting as a CORS proxy to get around stupid CORS rules for my XML Http requests

let http = require("http");
let https = require("https");
let fs = require("fs");
let mime = require("mime");
let url = require("url");

function onRequest(request, responce){
    console.log("Request for: " + request.url);
    if(request.url[1] != "?"){
        let path = "../" + request.url;
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
    }else{
        let urlQ = url.parse(request.url, true).query;
        console.log(urlQ);
        let decUrl = decodeURI(urlQ.encoded)
        let urlO = new URL(decUrl);
        /*let options = {
            hostname: urlO.hostname,
            path: urlO.path,
            port: urlO.port
        };*/
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
    }
}

http.createServer(onRequest).listen(8000);
