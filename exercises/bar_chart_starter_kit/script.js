const list = document.querySelector("ul");

/* const li = document.createElement("li");
li.style.setProperty("--height", "30");
list.appendChild(li); */

/* const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
arr.forEach((num) => {
	const li = document.createElement("li");
	li.style.setProperty("--height", num);
	list.appendChild(li);
}); */

// Immutable array ændrer ikke det originale array
/* const addNum = [...arr, Math.floor(Math.random() * 100) + 1];
   console.log(addNum);
   
   if (arr.length === 20) {
	const removeNum = arr.slice(1);
	console.log(removeNum);
    } */

// Mutable array ændrer det originale array
// array til at gemme tal
const arr = [];

// opdaterer listen hvert sekund
setInterval(update, 1000);

// funktion til at opdatere listen
function update() {
	// rydder listen
	list.innerHTML = "";
	// tilføjer et nyt random tal til arrayet
	arr.push(Math.floor(Math.random() * 100) + 1);
	// hvis arrayet er længere end 20 fjernes det ældste tal
	if (arr.length === 20) {
		arr.shift();
	}
	// laver et li element for hvert tal i arrayet
	arr.forEach((num) => {
		const li = document.createElement("li");
		li.style.setProperty("--height", num);
		list.appendChild(li);
	});
	console.log(arr);
}
