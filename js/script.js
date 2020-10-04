window.onload = function () {
	tikTakBoom.init(
		tasks,
		document.getElementById('countOfPlayersField'),
		document.getElementById('timerField'),
		document.getElementById('gameStatusField'),
	)
	tikTakBoom.enterCount();
	tikTakBoom.init(
		tasks,
		document.getElementById('countOfPlayersField'),
		document.getElementById('timerField'),
		document.getElementById('gameStatusField'),
		document.getElementById('questionField'),
		document.getElementById('answer1'),
		document.getElementById('answer2'),
	)
}
