const gamefield = document.getElementById("gamefield");
const player = document.getElementById("player1");
const computer = document.getElementById("player2");

const lose = document.getElementById("lose");
const win = document.getElementById("win");
const draw = document.getElementById("draw");

const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const buttons = [rock, paper, scissors];
const buttons2 = document.getElementById("buttons");
console.log(buttons);

let playerChoice;
let computerChoice;
let result;

player.classList.add("shake");
computer.classList.add("shake");

buttons.forEach((button) =>
	button.addEventListener("click", () => {
		playerChoice = button.classList;
		console.log(playerChoice);
		player.classList.remove("shake");
		player.classList.add(playerChoice);
		console.log("player " + player.classList);
		computerTurn();
		buttons2.classList.add("disabled");
		setTimeout(() => {
			buttons2.classList.remove("disabled");
			getResult();
		}, 2000);
	})
);

function computerTurn() {
	const random = Math.floor(Math.random() * 3);
	if (random === 0) {
		computerChoice = "rock";
	} else if (random === 1) {
		computerChoice = "paper";
	} else {
		computerChoice = "scissors";
	}
	computer.classList.remove("shake");
	computer.classList.add(computerChoice);
	console.log("computer " + computer.classList);
}

function getResult() {
	if (playerChoice == computerChoice) {
		result = "draw";
	} else if (
		(playerChoice == "rock" && computerChoice == "scissors") ||
		(playerChoice == "paper" && computerChoice == "rock") ||
		(playerChoice == "scissors" && computerChoice == "paper")
	) {
		result = "win";
	} else {
		result = "lose";
	}
	showResult();
}

function showResult() {
	if (result === "draw") {
		draw.classList.remove("hidden");
	} else if (result === "win") {
		win.classList.remove("hidden");
	} else {
		lose.classList.remove("hidden");
	}
	setTimeout(() => {
		resetGame();
	}, 2000);
}

function resetGame() {
	player.classList.remove(playerChoice);
	player.classList.add("shake");
	computer.classList.remove(computerChoice);
	computer.classList.add("shake");
	draw.classList.add("hidden");
	win.classList.add("hidden");
	lose.classList.add("hidden");
	playerChoice = "";
	computerChoice = "";
	result = "";
}
