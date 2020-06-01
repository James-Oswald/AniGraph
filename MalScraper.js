

function getData(Id){
    let request = new XMLHttpRequest();
    request.onload = function(){
        console.log(xhr.responseText);
    };
    request.open("GET", "https://myanimelist.net/anime/" + Id);
    request.send();
}
