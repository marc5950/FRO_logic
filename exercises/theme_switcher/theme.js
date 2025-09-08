// Henter dropdown elementet
const colorSelector = document.getElementById("theme-select");

// Henter det gemte tema fra localStorage, hvis det findes og opdatere dropdown og body attributten
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
	document.body.setAttribute("data-theme", savedTheme);
	colorSelector.value = savedTheme;
}

// Lytter efter ændringer i dropdown og opdaterer body attributten og gemmer valget i localStorage
colorSelector.addEventListener("change", (event) => {
	document.body.setAttribute("data-theme", event.target.value);
	localStorage.setItem("theme", event.target.value);
});
