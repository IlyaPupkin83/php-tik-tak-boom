window.onload = function () {
	tikTakBoom.init(
		tasks,
		document.getElementById('timerField'),
		document.getElementById('gameStatusField'),
	)
	tikTakBoom.run();
	tikTakBoom.init(
		tasks,
		document.getElementById('timerField'),
		document.getElementById('gameStatusField'),
		document.getElementById('questionField'),
		document.getElementById('answer1'),
		document.getElementById('answer2'),
	)
}
