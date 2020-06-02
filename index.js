"use strict"

function getNode(xmlObject, tagName){
	return xmlObject.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
}

///*
class Anime{
	constructor(animeXML){
		this.title = getNode(animeXML, "series_title");
		this.type = getNode(animeXML, "series_type");
		this.episodes = parseInt(getNode(animeXML, "series_episodes"));
		this.episodesWatched = parseInt(getNode(animeXML, "my_watched_episodes"));
		this.start = Date.parse(getNode(animeXML, "my_start_date"));
		this.end = Date.parse(getNode(animeXML, "my_finish_date"));
		this.score = parseInt(getNode(animeXML, "my_score"));
		this.status = getNode(animeXML, "my_status");
		this.rewatchs = parseInt(getNode(animeXML, "my_times_watched"));
		this.unknownYear = false;
		this.unknownSeason = false;
		let tags = getNode(animeXML, "my_tags");
		if(tags.match(/(Wi|Sp|Su|Fa)\d\d, \d\d/)){
			this.season = tags.substr(0, 2);
			this.year = parseInt(tags.substr(2, 2));
			this.year += this.year > 50 ? 1900 : 2000;
		}else if(tags.match(/\?, \d\d/)){
			this.unknownSeason = true;
			this.season = "?";
			this.year = parseInt(tags.substr(3, 2));
			this.year += this.year > 50 ? 1900 : 2000;
		}else{
			this.unknownSeason = true;
			this.season = "?";
			this.unknownYear = true;
			this.year = new Date().getFullYear() + 1;
		}
	}
	
	getSeasonIndex(){
		switch(this.season){
			case("Wi"): return 0;
			case("Sp"): return 1;
			case("Su"): return 2;
			case("Fa"): return 3;
		}
		return 0;
	}
}

//*/
const statuses = ["Completed", "Watching", "Dropped", "On-Hold", "Plan to Watch"];
const statusColors = {
	"Watching": "#2db039",
	"Dropped": "#a12f31",
	"Completed": "#26448f",
	"On-Hold": "#f9d457", 
	"Plan to Watch": "#c3c3c3" 
};

const showTypes = ["TV", "Movie", "OVA", "Special", "ONA", "Music"];
const showTypeColors = {
	"TV": "red",
	"Movie": "orange",
	"OVA": "yellow",
	"Special": "green", 
	"ONA": "blue",
	"Music": "purple" 
};

let animeList = [];

function getStati(){
	let stati = [];
	for(let i = 0; i < statuses.length; i++)
		if(document.getElementById("statOp" + i).checked)
			stati.push(statuses[i]);
	return stati;
}

function getTypei(){
	let typei = [];
	for(let i = 0; i < showTypes.length; i++)
		if(document.getElementById("typeOp" + i).checked)
			typei.push(showTypes[i]);
	return typei;
}


function seasonList(){
	let stati = getStati();
	let typei = getTypei();

	//Data Range init logic
	let firstYear, lastYear, numSeasons;
	if(document.getElementById("customYears").checked){
		lastYear = parseInt(document.getElementById("endYear").value) + 1;
		firstYear = parseInt(document.getElementById("startYear").value);
	}else{
		lastYear = new Date().getFullYear() + 3;
		animeList.sort((a, b) => a.year > b.year ? 1 : -1);
		firstYear = animeList[0].year;
	}
	numSeasons = (lastYear - firstYear) * 4;

	//Dataset Initilization 
	let dataSets = {};
	for(let key of stati)
		dataSets[key] = new Array(numSeasons).fill(0);
	let typeSets = {};
	for(let key of typei)
		typeSets[key] = new Array(numSeasons).fill(0);
	const seasons = ["Wi", "Sp", "Su", "Fa"];
	let yearLabels = new Array(numSeasons);
	let scores = new Array(numSeasons);
	for(let i = 0; i < yearLabels.length; i++){
		yearLabels[i] = seasons[i % 4] + "" + (Math.floor(i / 4) + firstYear);
		scores[i] = 0;
	}

	//Main data computation loop
	for(let anime of animeList)
		if(!anime.unknownYear && !anime.unknownSeason && stati.includes(anime.status)){
			let index = (anime.year - firstYear) * 4 + anime.getSeasonIndex();
			let validStatus = stati.includes(anime.status);
			let validType = typei.includes(anime.type);
			if(validStatus)
				dataSets[anime.status][index]++;
			if(validType)
				typeSets[anime.type][index]++;
			if(anime.score != 0 && validType && validStatus)
				scores[index] += anime.score;
		}

	//secondary score data divider computation loop
	for(let i = 0; i < scores.length; i++){
		let numSeasonalAnime = 0;
		for(let key in dataSets)
			if(key != "Plan to Watch")
				numSeasonalAnime += dataSets[key][i]
		scores[i] /= numSeasonalAnime;
	}

	//configuring data sets to pass to chart.js
	let configuredDataSets = [];
	if(document.getElementById("statusCheck").checked)
		for(let i = 0; i < stati.length; i++)
			configuredDataSets.push({
				label: stati[i],
				stack: "stack 0",
				backgroundColor: statusColors[stati[i]],
				borderWidth: 1,
				data: dataSets[stati[i]]
			});
	if(document.getElementById("typeCheck").checked)
		for(let i = 0; i < typei.length; i++)
			configuredDataSets.push({
				label: typei[i],
				stack: "stack 2",
				backgroundColor: showTypeColors[typei[i]],
				borderWidth: 1,
				data: typeSets[typei[i]]
			});
	if(document.getElementById("scoreCheck").checked)
		configuredDataSets.push({
			label: "Average Score",
			stack: "stack 1",
			backgroundColor: "green",
			borderWidth: 1,
			data: scores
		});

	//Initilizing and displaying the chart
	const id = "seasonals";
	document.getElementById("charts").innerHTML += "<canvas class='chart' id='" + id + "'>"
	let graph = document.getElementById(id).getContext("2d");
	let myChart = new Chart(graph, {
		type: "bar",
		data:{
			labels: yearLabels,
			datasets: configuredDataSets,
			options:{
				legend:{display: false},
				title:{
					display: true,
					text: "Total Seen Anime"
				},
				maintainAspectRatio: true,
				//responsive: true,
			}
		}
	});
}

function parse(rawData){
	//console.log(data);
	let parser = new DOMParser();
	let xmlData = parser.parseFromString(rawData, "text/xml");
	let animeXMLList = xmlData.getElementsByTagName("anime");
	animeList = [];
	for(let animeXML of animeXMLList)
		animeList.push(new Anime(animeXML));
	//yearList(animeList, "yearGraph", stati);
	reload();
}

export function reload(){
	document.getElementById("charts").innerHTML = "";
	seasonList();
}

export function main(){
	let statHTML = "";
	for(let i = 0; i < statuses.length; i++)
		statHTML += "<input id='statOp" + i + "' type='checkbox' onchange='reload()' checked/><label for='statOp" + i + "'>" + statuses[i] + "</label>"
	document.getElementById("statOp").innerHTML = statHTML;
	let typeHTML = "";
	for(let i = 0; i < showTypes.length; i++)
		typeHTML += "<input id='typeOp" + i + "' type='checkbox' onchange='reload()' checked/><label for='typeOp" + i + "'>" + showTypes[i] + "</label>"
	document.getElementById("typeOp").innerHTML = typeHTML;
	fetch("./list2.xml").then(r => r.text()).then(d => parse(d));
}

export function customYears(){
	let sy = document.getElementById("startYear");
	let ey = document.getElementById("endYear");
	sy.disabled = !sy.disabled;
	ey.disabled = !ey.disabled;
	reload();
}

export function newXML(){
	const reader = new FileReader();
	reader.onload = function(e){
		parse(e.target.result);
	};
	reader.readAsText(document.getElementById("xmlFileUpload").files[0]);
}

main();