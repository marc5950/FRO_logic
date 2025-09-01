const bc = [
	{ name: "Hvidevarer", link: "/hvidevarer" },
	{ name: "Vaskemaskiner", link: "/hvidevarer/vaskemaskiner" },
	{ name: "Bosch", link: "/hvidevarer/vaskemaskiner/bosch/" },
	{ name: "Test", link: "/hvidevarer/vaskemaskiner/bosch/test/" },
];

const bcContainer = document.getElementById("breadcrumb");
const generateButton = document.getElementById("generate");

generateButton.addEventListener("click", generateBreadcrumbs);

/* function generateBreadcrumbs() {
	bcContainer.innerHTML = "";
	bc.forEach((item) => {
		const li = document.createElement("li");
		li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
		bcContainer.appendChild(li);
	});
} */

function generateBreadcrumbs() {
	bcContainer.innerHTML = "";

	bc.forEach((item, index) => {
		// Opret listeelement
		const li = document.createElement("li");

		// Sidste element skal ikke være et link
		if (index === bc.length - 1) {
			li.textContent = item.name;
		} else {
			li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
		}

		bcContainer.appendChild(li);

		// Tilføj separator ("/") efter hvert element undtagen det sidste
		if (index < bc.length - 1) {
			const separator = document.createElement("span");
			separator.textContent = " / ";
			bcContainer.appendChild(separator);
		}
	});
}
