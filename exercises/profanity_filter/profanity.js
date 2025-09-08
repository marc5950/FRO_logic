const curseWords = [
	{ bad: "var", good: "const" },
	{ bad: "float", good: "grid" },
	{ bad: "marquee", good: "just don't" },
];

const text = document.getElementById("text");
console.log(text.innerText);

const button = document.getElementById("btn");
button.addEventListener("click", () => {
	if (curseWords.some((word) => text.innerText.includes(word.bad))) {
		makeSafe();
	} else {
		// hvis der ikke er bandeord, så bygges og vises en <dialog> med en luk knap
		const dialog = document.createElement("dialog"); // opret dialog elementet
		dialog.innerHTML = `
			<p>Der er ingen bandeord at fjerne!</p>
			<button id="closeBtn">Luk</button>
		`;
		document.body.appendChild(dialog); // tilføj dialogen til DOM'en
		//showModal er en blocking call, så koden stopper her indtil dialogen lukkes
		dialog.showModal(); // vis dialogen
		const closeBtn = dialog.querySelector("#closeBtn");
		closeBtn.addEventListener("click", () => {
			dialog.close(); // luk dialogen
			dialog.remove(); // fjern dialogen fra DOM'en
		});
	}
});

// version der bare erstatter de dårlige ord med de gode ord
/* function makeSafe() {
	let newText = text.innerText;
	curseWords.forEach((word) => {
		newText = newText.replaceAll(word.bad, word.good);
		
	});
	text.innerText = newText; // sæt tilbage i DOM'en
	console.log(newText);
} */

// version der fremhæver de gode ord med gul baggrund
function makeSafe() {
	let newText = text.innerText;
	curseWords.forEach((word) => {
		// wrap det gode ord i et <span> med inline-style
		newText = newText.replaceAll(word.bad, `<span style="background-color: yellow;">${word.good}</span>`);
	});
	text.innerHTML = newText; // vigtigt: brug innerHTML i stedet for innerText
	console.log(newText);
}
