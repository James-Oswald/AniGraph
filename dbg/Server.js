
//using this to replace the python server for debuging as well as acting as a CORS proxy to get around stupid CORS rules for my XML Http requests

let http = require("http");
let fs = require("fs");
let mime = require("mime");

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
    //}else{

    }
}

http.createServer(onRequest).listen(8000);
