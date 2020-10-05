window.onload = function () {
	tikTakBoom.init(
		tasks,
		document.getElementById('buttonStart'),
		document.getElementById('buttonFinish'),
		document.getElementById('countOfPlayersField'),
		document.getElementById('timerField'),
		document.getElementById('gameStatusField'),
		document.getElementById('questionField'),
		document.getElementById('answer1'),
		document.getElementById('answer2'),
	)
	tikTakBoom.startGame();
}
