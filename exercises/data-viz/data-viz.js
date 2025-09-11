const queueDiv = document.getElementById("queue");
const queueCircle = document.getElementById("queue-circle");

let lastQueue = null;

function fetchData() {
	fetch("https://kea-alt-del.dk/kata-distortion/")
		.then((res) => res.json())
		.then((data) => {
			const current = data.inQueue;
			console.log(current);
			queueDiv.textContent = `Antal i kø: ${current}`;

			// Cirklen vokser med antallet (max 250px), farve skifter fra grøn til rød
			const minSize = 80;
			const maxSize = 250;
			const maxPeople = 30; // justér efter forventet max
			const size = Math.min(minSize + (current / maxPeople) * (maxSize - minSize), maxSize);
			const hue = Math.max(0, 120 - (current / maxPeople) * 120); // 120=grøn, 0=rød
			const color = `hsl(${hue}, 90%, 55%)`;

			queueCircle.style.setProperty("--circle-size", `${size}px`);
			queueCircle.style.setProperty("--circle-color", color);

			// Fjern evt. gamle klasser for at kunne trigge animation igen
			queueDiv.classList.remove("grow", "shrink", "same");

			// Tilføj klasse alt efter om tallet stiger, falder eller er det samme
			if (lastQueue !== null) {
				if (current > lastQueue) {
					queueDiv.classList.add("grow");
				} else if (current < lastQueue) {
					queueDiv.classList.add("shrink");
				} else {
					queueDiv.classList.add("same");
				}
			}
			lastQueue = current;
		});
}

// Animationen fjernes når den er færdig, så den kan trigges igen næste gang
queueDiv.addEventListener("animationend", () => {
	queueDiv.classList.remove("grow", "shrink", "same");
});

// Hent data med det samme og derefter hvert 5. sekund
fetchData();
setInterval(fetchData, 5000);
