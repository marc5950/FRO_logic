"use strict";
const texts = {
	de: {
		texts: [
			{ text: "Das Bot", location: ".header" },
			{ text: "Das Ro-Bot", location: ".footer" },
		],
	},
	da: {
		texts: [
			{ text: "Båden", location: ".header" },
			{ text: "Robotten", location: ".footer" },
		],
	},
};

//alternativ måde ved brug af i18n attributter
/* const texts = {
	de: { header: "Das Bot", footer: "Das Ro-Bot" },
	da: { header: "Båden", footer: "Robotten" },
}; */

let locale = "da";
const languageSwitcher = document.getElementById("language");

languageSwitcher.addEventListener("change", (event) => {
	//bruger event.target.value fordi value tilhører det HTML-element, der udløste eventet – ikke selve event-objektet.
	locale = event.target.value;
	setLanguage();
});

function setLanguage() {
	// Opdater tekstindholdet for det valgte sprog
	texts[locale].texts.forEach((item) => {
		//texts[locale] henviser til det valgte sprog
		const element = document.querySelector(item.location);
		if (element) {
			element.textContent = item.text;
		}
	});
}

//alternativ måde ved brug af i18n attributter
/* function setLanguage() {
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		const location = el.getAttribute("data-i18n");
		el.textContent = texts[locale][location];
	});
} */
