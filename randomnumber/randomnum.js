/* var num = 0;
num = Math.floor(Math.random() * 100);
console.log("Tilfædligt tal: " + num);
document.body.innerHTML = "Tilfædligt tal: " + num; */

const tal = document.getElementsByClassName("tal");
const input = document.getElementById("input");
const svar = document.getElementById("svar");
var num = 0;
tal[0].innerHTML = "Tilfædligt tal: " + num;
document.getElementById("nyttal").addEventListener("click", nytTal);
input.addEventListener("change", function () {
	if (input.value == num) {
		svar.innerHTML = "Korrekt!";
	} else if (input.value < num) {
		svar.innerHTML = "Tallet er for lavt!";
	} else {
		svar.innerHTML = "Tallet er for højt!";
	}
});

function getRandomNum(min, max) {
	num = Math.floor(Math.random() * max) + min;
	console.log("Tilfædligt tal: " + num);
	tal[0].innerHTML = "Tilfædligt tal: " + num;
}

function nytTal() {
	getRandomNum(50, 150);
}
