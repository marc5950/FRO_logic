"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

function start() {
	console.log("ready");

	loadJSON();
}

function loadJSON() {
	fetch("animals.json")
		.then((response) => response.json())
		.then((jsonData) => {
			// when loaded, prepare objects
			prepareObjects(jsonData);
		});
}

function prepareObjects(jsonData) {
	jsonData.forEach((jsonObject) => {
		// TODO: Create new object with cleaned data - and store that in the allAnimals array
		const animal = { name: "NA", desc: "NA", type: "NA", age: 0 };
		// const fullname = jsonObject.fullname;
		// console.log(fullname);

		// const firstSpace = fullname.indexOf(" ");
		// const secondSpace = fullname.indexOf(" ", firstSpace + 1);
		// const lastSpace = fullname.lastIndexOf(" ");

		// animal.name = fullname.substring(0, fullname.indexOf(" "));
		// animal.desc = fullname.substring(secondSpace, lastSpace);
		// animal.type = fullname.substring(lastSpace + 1);
		// animal.age = jsonObject.age;

		const fullName = jsonObject.fullname.split(" ");

		animal.name = fullName[0];
		animal.desc = fullName[2];
		animal.type = fullName[3];
		animal.age = jsonObject.age;

		console.log(animal);

		// TODO: MISSING CODE HERE !!!
		allAnimals.push(animal);
		console.log(allAnimals);
	});

	displayList();
}

function displayList() {
	// clear the list
	document.querySelector("#list tbody").innerHTML = "";

	// build a new list
	allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
	// create clone
	const clone = document.querySelector("template#animal").content.cloneNode(true);

	// set clone data
	clone.querySelector("[data-field=name]").textContent = animal.name;
	clone.querySelector("[data-field=desc]").textContent = animal.desc;
	clone.querySelector("[data-field=type]").textContent = animal.type;
	clone.querySelector("[data-field=age]").textContent = animal.age;

	// append clone to list
	document.querySelector("#list tbody").appendChild(clone);
}
