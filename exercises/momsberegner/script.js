"use strict";

const prisInput = document.getElementById("pris");
const momsInput = document.getElementById("moms");
const beregnButton = document.getElementById("beregn");
const resultatParagraph = document.getElementById("resultat");

let moms;

beregnButton.addEventListener("click", () => {
	const pris = parseFloat(prisInput.value); // Bruger parseFloat i stedet for parseInt for at få decimal tal med
	console.log("pris: " + pris);
	if (momsInput.value === "") {
		moms = 25; // Standard moms hvis feltet er tomt
	} else {
		moms = parseFloat(momsInput.value);
	}
	console.log("moms: " + moms);
	beregnTotal(pris, moms);

	function beregnTotal(pris, moms) {
		if (isNaN(pris) || isNaN(moms)) {
			resultatParagraph.textContent = "Indtast venligst gyldige tal for pris og moms.";
		} else {
			const total = pris + (pris * moms) / 100;
			resultatParagraph.textContent = `Totalpris inkl. moms: ${total.toFixed(2)} kr.`; // Kan både bruge textContent eller innerHTML
		}
	}
});
