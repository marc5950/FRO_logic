const computerText = document.getElementById("computerText");
const forLavtButton = document.getElementById("forLavt");
const forHojtButton = document.getElementById("forHojt");
const rigtigtButton = document.getElementById("rigtigt");
const startSpilButton = document.getElementById("startSpil");

let min = 1;
let max = 100;
let computerNum;
let count = 0;
computerText.innerHTML = "Skal jeg gætte et tal mellem 1 og 100?";

function setButtons(forLavt, forHojt, rigtigt, startSpil) {
	forLavtButton.disabled = forLavt;
	forHojtButton.disabled = forHojt;
	rigtigtButton.disabled = rigtigt;
	startSpilButton.disabled = startSpil;
}
setButtons(true, true, true, false);

startSpilButton.addEventListener("click", newNumber);
function newNumber() {
	min = 1;
	max = 100;
	count = 1;
	console.log("Count: " + count);
	computerNum = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log("Computer gætter: " + computerNum);
	computerText.innerHTML = `Computer gætter: ${computerNum}`;
	setButtons(false, false, false, true);
}

forLavtButton.addEventListener("click", () => {
	min = computerNum + 1; // Opdaterer min til at være et mere end computerens nuværende gæt
	console.log("Min er nu: " + min + " Max er nu: " + max);
	if (min > max) {
		computerText.innerHTML = "Der er ingen tal tilbage at gætte på!";
		setButtons(true, true, true, false);
	} else {
		count++;
		console.log("Count: " + count);
		computerNum = Math.floor(Math.random() * (max - min + 1)) + min;
		console.log("Computer gætter: " + computerNum);
		computerText.innerHTML = `Computer gætter: ${computerNum}`;
	}
});

forHojtButton.addEventListener("click", () => {
	max = computerNum - 1; // Opdaterer max til at være et mindre end computerens nuværende gæt
	console.log("Min er nu: " + min + " Max er nu: " + max);
	if (min > max) {
		computerText.innerHTML = "Der er ingen tal tilbage at gætte på!";
		setButtons(true, true, true, false);
	} else {
		count++;
		console.log("Count: " + count);
		computerNum = Math.floor(Math.random() * (max - min + 1)) + min;
		console.log("Computer gætter: " + computerNum);
		computerText.innerHTML = `Computer gætter: ${computerNum}`;
	}
});

rigtigtButton.addEventListener("click", () => {
	setButtons(true, true, true, false);
	const guesses = count;
	console.log("Count ved rigtigt: " + count);
	computerText.innerHTML = `Yay! Computeren gættede rigtigt på ${guesses} forsøg! Klik på "Start Spil" for at prøve igen.`;
});
