let fs = require("fs");

let initilized = false;
let animeData = null;
function init(){
    initilized = true;
    fs.readFile("animeData.json", function(err, data){
        if(err){
            console.error(err);
            throw err;
        }
        animeData = JSON.parse(data);
    });
}

function queryIds(ids){
    if(!initilized){
        init();
        setTimeout(queryIds(ids), 1000);
    }
    
    
}


module.exports = {
    init,
    queryIds
}