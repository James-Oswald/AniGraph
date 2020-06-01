
/*function yearList()
{
	let currentYear = new Date().getFullYear() + 5;
	animeList.sort((a, b) => a.year > b.year ? 1 : -1);
	let firstYear = animeList[0].year;
	let dataSets = {"Watching":[], "Dropped": [], "Completed":[], "On-Hold": [], "Plan to Watch": []};
	for(let key of Object.keys(dataSets))
		dataSets[key] = new Array(currentYear - firstYear).fill(0);
	let yearLabels = new Array(currentYear - firstYear);
	for(let i = 0; i < yearLabels.length; i++)
		yearLabels[i] = i + firstYear;
	for(let anime of animeList)
		if(!anime.unknownYear)
			dataSets[anime.status][anime.year - firstYear]++;
	console.log(dataSets);
	console.log(yearLabels);
	let graph = document.getElementById(gid).getContext("2d");
	let myChart = new Chart(graph, {
		type: 'bar',
		data:{
			labels: yearLabels,
			datasets:[{
				label: "Completed",
				stack: "Stack 0",
				backgroundColor: "#26448f",
				borderWidth: 1,
				data: dataSets["Completed"]
			},{
				label: "Dropped",
				stack: "Stack 0",
				backgroundColor: "#a12f31",
				borderWidth: 1,
				data: dataSets["Dropped"]
			},{
				label: "On-Hold",
				stack: "Stack 0",
				backgroundColor: "#f9d457",
				borderWidth: 1,
				data: dataSets["On-Hold"]
			},{
				label: "Watching",
				stack: "Stack 0",
				backgroundColor: "#2db039",
				borderWidth: 1,
				data: dataSets["Watching"]
			},{
				label: "Plan to Watch",
				stack: "Stack 0",
				backgroundColor: "rgb(190, 190, 190)",
				borderWidth: 1,
				data: dataSets["Plan to Watch"]
			},]
		},
		options:{
			legend:{display: false},
			title:{
				display: true,
				text: 'Total Seen Anime'
			}
		}
	});
}

function seasonList(anime){
	let currentYear = new Date().getFullYear() + 3;
	animeList.sort((a, b) => a.year > b.year ? 1 : -1);
	let firstYear = animeList[0].year;
	let numSeasons = (currentYear - firstYear) * 4
	let dataSets = {"Watching": [], "Dropped": [], "Completed": [], "On-Hold": [], "Plan to Watch": []};
	for(let key of Object.keys(dataSets))
		dataSets[key] = new Array(numSeasons).fill(0);
	const seasons = ["Wi", "Sp", "Su", "Sp"];
	let yearLabels = new Array(numSeasons);
	let scores = new Array(numSeasons)
	for(let i = 0; i < yearLabels.length; i++){
		yearLabels[i] = seasons[i % 4] + "" + (Math.floor(i / 4) + firstYear);
		scores[i] = 0;
	}
	for(let anime of animeList)
		if(!anime.unknownYear && !anime.unknownSeason){
			let index = (anime.year - firstYear) * 4 + anime.getSeasonIndex();
			dataSets[anime.status][index]++;
			if(anime.score != 0){
				console.log(anime.score);
				scores[index] += anime.score;
			}
		}
	console.log(scores);
	for(let i = 0; i < scores.length; i++)
		scores[i] /= dataSets["Completed"][i] + dataSets["Watching"][i] + dataSets["On-Hold"][i] + dataSets["Dropped"][i];
	console.log(scores);
	//console.log(dataSets);
	//console.log(yearLabels);
	let graph = document.getElementById(gid).getContext("2d");
	let myChart = new Chart(graph, {
		type: 'bar',
		data:{
			labels: yearLabels,
			datasets:[{
				label: "Completed",
				stack: "Stack 0",
				backgroundColor: "#26448f",
				borderWidth: 1,
				data: dataSets["Completed"]
			},{
				label: "Dropped",
				stack: "Stack 0",
				backgroundColor: "#a12f31",
				borderWidth: 1,
				data: dataSets["Dropped"]
			},{
				label: "On-Hold",
				stack: "Stack 0",
				backgroundColor: "#f9d457",
				borderWidth: 1,
				data: dataSets["On-Hold"]
			},{
				label: "Watching",
				stack: "Stack 0",
				backgroundColor: "#2db039",
				borderWidth: 1,
				data: dataSets["Watching"]
			},{
				label: "Plan to Watch",
				stack: "Stack 0",
				backgroundColor: "rgb(190, 190, 190)",
				borderWidth: 1,
				data: dataSets["Plan to Watch"]
			},{
				label: "Score",
				stack: "Stack 1",
				backgroundColor: "rgb(0, 255, 0)",
				borderWidth: 1,
				data: scores
			}]
		},
		options:{
			legend:{display: false},
			title:{
				display: true,
				text: 'Total Seen Anime'
			}
		}
	});
}*/
