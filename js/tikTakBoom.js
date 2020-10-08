tikTakBoom = {
	init(
		tasks,
		buttonStart,
		buttonFinish,
		countOfPlayersField,
		countOfTimeField,
		timerField,
		gameStatusField,
		textFieldQuestion,
		textFieldAnswer,
		textFieldAnswer1,
		textFieldAnswer2,
		textFieldAnswer3,
		textFieldAnswer4,
		textFieldAnswer5,
		textFieldAnswer6
	) {

		this.preTime = 4;
		this.stop = 1;
		this.tasks = JSON.parse(tasks);
		this.players = new Object();
		;

		this.buttonStart = buttonStart;
		this.buttonFinish = buttonFinish;
		this.countOfPlayersField = countOfPlayersField;
		this.countOfTimeField = countOfTimeField;
		this.timerField = timerField;
		this.gameStatusField = gameStatusField;
		this.textFieldQuestion = textFieldQuestion;
		this.textFieldAnswer = textFieldAnswer;
		this.textFieldAnswer1 = textFieldAnswer1;
		this.textFieldAnswer2 = textFieldAnswer2;
		this.textFieldAnswer3 = textFieldAnswer3;
		this.textFieldAnswer4 = textFieldAnswer4;
		this.textFieldAnswer5 = textFieldAnswer5;
		this.textFieldAnswer6 = textFieldAnswer6;

		this.needRightAnswers = 19;
		this.maxWrongAnswers = 3;
		this.playersWrongAnswer = 0;
		this.playerNumber = 1;
	},

	showDom() {
		this.buttonStart.style.display = "none";
		this.buttonFinish.style.display = "block";
		this.timerField.style.display = "block";
		this.gameStatusField.style.display = "block";
	},

	startGame() {
		this.buttonStart.addEventListener('click', (event) => {
			tikTakBoom.countOfPlayers = parseInt(tikTakBoom.countOfPlayersField.value) || 2;
			tikTakBoom.boomTimer = (parseInt(tikTakBoom.countOfTimeField.value) + 1) || 31;

			tikTakBoom.createPlayers();
			console.log(tikTakBoom.players);
			tikTakBoom.showDom();
			tikTakBoom.gameStatusField.innerText = ``;
			tikTakBoom.gameStatusField.innerText = `Приготовьтесь...`;
			tikTakBoom.run();
			tikTakBoom.stopGame();
		}
		)
	},

	createPlayers() {
		while (Object.keys(this.players).length < this.countOfPlayers) {
			this.players[`${this.playerNumber}`] = `0`;
			this.playerNumber += 1;
		};
		return this.players;
	},

	stopGame() {
		this.buttonFinish.addEventListener('click', (event) => {
			tikTakBoom.result = 'lose';
			tikTakBoom.stop = 0;
			tikTakBoom.boomTimer = 0;
			tikTakBoom.preTime = 0;
			tikTakBoom.state = 0;
			tikTakBoom.pretimer();
			tikTakBoom.timer();
			tikTakBoom.finish();
		}
		)
	},

	run() {
		this.state = 1;
		if (this.result === 'lose') {
			tikTakBoom.boomTimer = (parseInt(tikTakBoom.countOfTimeField.value) + 1) || 31;
			this.preTime = 4;
			this.stop = 1;
		};
		this.rightAnswers = 0;
		this.pretimer();
		this.timer();
		this.turnOn();
	},

	turnOn() {
		if (this.stop == 0) {
			this.gameStatusField.innerText += ` Вопрос игроку №${this.state}`;

			const taskNumber = randomIntNumber(this.tasks.length - 1);
			this.printQuestion(this.tasks[taskNumber]);
			this.tasks.splice(taskNumber, 1);
			this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
		}
	},

	turnOff(value) {
		if (this.currentTask[value].result) {
			this.gameStatusField.innerText = 'Верно!';
			this.rightAnswers += 1;
			this.boomTimer += 5;
		} else {
			this.gameStatusField.innerText = 'Неверно!';
			this.boomTimer -= 5;
			if (parseInt[this.players[this.state].value] <= this.maxWrongAnswers) {
				this.playersWrongAnswer += 1;
				this.players[`${this.state}`].value = `${this.playersWrongAnswer}`;
			} else {
				delete this.players[`${this.state}`];
				console.log(this.players);
			}
		}
		if (this.rightAnswers < this.needRightAnswers) {
			if (this.tasks.length === 0) {
				this.finish('lose');
			} else {
				this.turnOn();
			}
		} else {
			this.finish('won');
		}
	},

	printQuestion(task) {
		this.textFieldQuestion.innerText = task.question;
		this.textFieldAnswer1.innerText = task.answer1.value;
		this.textFieldAnswer2.innerText = task.answer2.value;
		this.textFieldAnswer1.style.display = "block";
		this.textFieldAnswer2.style.display = "block";

		if (task.answer3 === undefined) {
			this.textFieldAnswer3.style.display = "none";
		} else {
			this.textFieldAnswer3.innerText = task.answer3.value;
			this.textFieldAnswer3.style.display = "block";
		};
		if (task.answer4 === undefined) {
			this.textFieldAnswer4.style.display = "none";
		} else {
			this.textFieldAnswer4.innerText = task.answer4.value;
			this.textFieldAnswer4.style.display = "block";
		};
		if (task.answer5 === undefined) {
			this.textFieldAnswer5.style.display = "none";
		} else {
			this.textFieldAnswer5.innerText = task.answer5.value;
			this.textFieldAnswer5.style.display = "block";
		};
		if (task.answer6 === undefined) {
			this.textFieldAnswer6.style.display = "none";
		} else {
			this.textFieldAnswer6.innerText = task.answer6.value;
			this.textFieldAnswer6.style.display = "block";
		};
		this.textFieldAnswer1.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer1');
		});
		this.textFieldAnswer2.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer2');
		});
		this.textFieldAnswer3.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer3');
		});
		this.textFieldAnswer4.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer4');
		});
		this.textFieldAnswer5.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer5');
		});
		this.textFieldAnswer6.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer6');
		});

		this.currentTask = task;
	},

	finish(result = 'lose') {
		this.buttonStart.style.display = "block";
		this.textFieldAnswer.style.display = "none";
		this.textFieldQuestion.style.display = "none";
		this.buttonStart.innerText = `Начать заново!`;
		this.buttonFinish.style.display = "none";
		this.state = 0;

		if (result === 'lose') {
			this.gameStatusField.innerText = `Вы проиграли!`;
		}
		if (result === 'won') {
			this.gameStatusField.innerText = `Вы выиграли!`;
		}
	},

	timer() {
		if ((this.state) && (this.stop == 0)) {
			this.boomTimer -= 1;

			if (this.boomTimer > 0) {
				let sec = this.boomTimer % 60;
				let min = (this.boomTimer - sec) / 60;
				sec = (sec >= 10) ? sec : '0' + sec;
				min = (min >= 10) ? min : '0' + min;
				this.timerField.innerText = `${min}:${sec}`;
				var timer2 = setTimeout(
					() => {
						this.timer()
					},
					1000,
				);
			} else {
				this.timerField.innerText = `00:00`;
				this.finish('lose');
				setTimeout(
					() => clearTimeOut(timer2)
				);
			}
		}
	},

	pretimer() {
		if (this.stop == 1) {
			this.preTime -= 1;
			let sec = this.preTime % 60;
			this.timerField.innerText = `${sec}`;
			if (this.preTime > 0) {
				var timer1 = setTimeout(
					() => {
						this.pretimer()
					},
					1000,
				)
			} else {
				setTimeout(
					() => clearTimeout(timer1)
				);
				this.gameStatusField.innerText = ``;
				this.gameStatusField.innerText = `Игра идет...`;
				this.timerField.innerText = `0`;
				this.stop = 0;
				this.preTime = 4;
				this.textFieldQuestion.style.display = "block";
				this.textFieldAnswer.style.display = "block";
				this.turnOn();
				this.timer();
			}
		}
	},

}
