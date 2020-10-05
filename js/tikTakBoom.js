tikTakBoom = {
	init(
		tasks,
		buttonStart,
		buttonFinish,
		countOfPlayersField,
		timerField,
		gameStatusField,
		textFieldQuestion,
		textFieldAnswer1,
		textFieldAnswer2
	) {
		this.boomTimer = 31;
		this.preTime = 4;
		this.stop = 1;
		this.tasks = JSON.parse(tasks);

		this.buttonStart = buttonStart;
		this.buttonFinish = buttonFinish;
		this.countOfPlayersField = countOfPlayersField;
		this.timerField = timerField;
		this.gameStatusField = gameStatusField;
		this.textFieldQuestion = textFieldQuestion;
		this.textFieldAnswer1 = textFieldAnswer1;
		this.textFieldAnswer2 = textFieldAnswer2;

		this.needRightAnswers = 3;
	},

	showDom() {
		this.buttonStart.style.display = "none";
		this.buttonFinish.style.display = "block";
		this.timerField.style.display = "block";
		this.gameStatusField.style.display = "block";
		this.textFieldQuestion.style.display = "block";
		this.textFieldAnswer1.style.display = "block";
		this.textFieldAnswer2.style.display = "block";
	},

	startGame() {
		this.buttonStart.addEventListener('click', function (e) {
			tikTakBoom.countOfPlayers = parseInt(this.countOfPlayersField).value || 2;
			tikTakBoom.showDom();
			tikTakBoom.gameStatusField.innerText = ``;
			tikTakBoom.gameStatusField.innerText = `Приготовьтесь...`;
			tikTakBoom.run();
			tikTakBoom.stopGame();
		}
		)
	},

	stopGame() {
		this.buttonFinish.addEventListener('click', function (e) {
			tikTakBoom.result = 'lose';
			tikTakBoom.stop = 0;
			tikTakBoom.boomTimer = 0;
			tikTakBoom.preTime = 0;
			tikTakBoom.state = 0;
			tikTakBoom.pretimer();
			tikTakBoom.timer();
			tikTakBoom.finish();
			tikTakBoom.buttonStart.style.display = "block";
			tikTakBoom.buttonFinish.style.display = "none";
		}
		)
	},

	run() {
		this.state = 1;
		if (this.result === 'lose') {
			this.boomTimer = 31;
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
			this.gameStatusField.innerText = ``;
			this.gameStatusField.innerText = `Игра идет...`;
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
		} else {
			this.gameStatusField.innerText = 'Неверно!';
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

		this.textFieldAnswer1.removeEventListener('click', answer1);
		this.textFieldAnswer2.removeEventListener('click', answer2);
	},

	printQuestion(task) {
		this.textFieldQuestion.innerText = task.question;
		this.textFieldAnswer1.innerText = task.answer1.value;
		this.textFieldAnswer2.innerText = task.answer2.value;

		this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
		this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));

		this.currentTask = task;
	},

	finish(result = 'lose') {
		this.state = 0;
		if (result === 'lose') {
			this.gameStatusField.innerText = `Вы проиграли!`;
		}
		if (result === 'won') {
			this.gameStatusField.innerText = `Вы выиграли!`;
		}

		this.textFieldQuestion.innerText = ``;
		this.textFieldAnswer1.innerText = ``;
		this.textFieldAnswer2.innerText = ``;

	},

	timer() {
		if ((this.state) && (this.stop == 0)) {
			this.boomTimer -= 1;
			let sec = this.boomTimer % 60;
			let min = (this.boomTimer - sec) / 60;
			sec = (sec >= 10) ? sec : '0' + sec;
			min = (min >= 10) ? min : '0' + min;
			this.timerField.innerText = `${min}:${sec}`;
			if (this.boomTimer > 0) {
				var timer2 = setTimeout(
					() => {
						this.timer()
					},
					1000,
				);
			} else {
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
				this.timerField.innerText = `0`;
				this.stop = 0;
				this.preTime = 4;
				this.turnOn();
				this.timer();
			}
		}
	},

}
