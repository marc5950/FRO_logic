"use strict";
/* var num = 0;
num = Math.floor(Math.random() * 100);
console.log("Tilfædligt tal: " + num);
document.body.innerHTML = "Tilfædligt tal: " + num; */

// Henter HTML elementer
const tal = document.getElementById("tal");
const input = document.getElementById("input");
const svar = document.getElementById("svar");

// Initialisering af variabler
let num;
let min = 1;
let max = 100;

// Funktion til at generere et tilfældigt tal mellem min og max
function getRandomNum(min, max) {
	/* 	num = Math.floor(Math.random() * max) + min; */
	num = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log("Tilfædligt tal: " + num);
	input.value = ""; // Nulstiller input feltet
	svar.innerHTML = ""; // Nulstiller svar beskeden
	svar.classList.remove("korrekt"); // Fjerner korrekt klasse hvis den var der
}

// Viser information om det nuværende interval
const rangeinfo = document.getElementById("rangeinfo");
// Opdaterer rangeinfo teksten
function updateRangeInfo() {
	rangeinfo.innerHTML = `Gæt et tal mellem ${min} og ${max}`;
}

// Event listener til knappen for at sætte min og max værdier
document.getElementById("setrange").addEventListener("click", function () {
	// Henter værdier fra input felterne, eller sætter dem til standardværdier hvis felterne er tomme
	// Bruger parseInt for at konvertere strenge til tal
	min = parseInt(document.getElementById("min").value) || 1;
	max = parseInt(document.getElementById("max").value) || 100;
	if (min < max) {
		getRandomNum(min, max);
		updateRangeInfo();
		console.log("Min: " + min + ", Max: " + max);
	} else {
		alert("Den laveste værdi skal være mindre end den højeste værdi.");
	}
});

// Event listener til knappen for at generere et nyt tal
document.getElementById("nyttal").addEventListener("click", nytTal);
function nytTal() {
	getRandomNum(min, max);
}

// Tjekker om tallet er korrekt, for lavt eller for højt
/* input.addEventListener("change", function () {
	if (input.value == num) {
		svar.innerHTML = "Korrekt!";
	} else if (input.value < num) {
		svar.innerHTML = "Tallet er for lavt!";
	} else {
		svar.innerHTML = "Tallet er for højt!";
	}
}); */

// Mere detaljeret feedback baseret på hvor langt væk gættet er fra det rigtige tal
input.addEventListener("change", function () {
	const value = Number(input.value);
	if (value === num) {
		svar.innerHTML = "Korrekt!";
		svar.classList.add("korrekt");
	} else if (value < num) {
		svar.classList.remove("korrekt");
		if (num - value > 5) {
			svar.innerHTML = "Tallet er meget for lavt!";
		} else {
			svar.innerHTML = "Tallet er lidt for lavt!";
		}
	} else {
		svar.classList.remove("korrekt");
		if (value - num > 5) {
			svar.innerHTML = "Tallet er meget for højt!";
		} else {
			svar.innerHTML = "Tallet er lidt for højt!";
		}
	}
});
