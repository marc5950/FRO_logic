// Hent data fra localStorage eller opret standard struktur
let lists = JSON.parse(localStorage.getItem("lists")) || {
	default: {
		name: "Min Todo Liste", // Tilføjet navn til default liste
		todos: [],
		done: [],
	},
};

// Sikr at default liste altid har et navn (for eksisterende data)
if (!lists.default.name) {
	lists.default.name = "Min Todo Liste";
	localStorage.setItem("lists", JSON.stringify(lists));
}

let currentList = "default";
let editingTodoId = null;

// Knapper i sidebar
const completedBtn = document.getElementById("completed-btn");
const newListBtn = document.getElementById("new-list-btn");
const homeBtn = document.getElementById("home");
const listsContainer = document.getElementById("lists"); // Tilføjet reference til lists div

// DOM elementer
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoListContainer = document.getElementById("todo-list");
const doneListContainer = document.getElementById("done-list");

const addTodoBeforeDate = document.getElementById("add-date");
const addTodoAmount = document.getElementById("add-amount");

// Event listeners
addBtn.addEventListener("click", handleAddOrEdit);
todoInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") handleAddOrEdit();
});

// Tilføjet event listener til newListBtn
newListBtn.addEventListener("click", createNewList);

// Tilføjet event listener til completedBtn og homeBtn
// Skift visning mellem todo og done lister
completedBtn.addEventListener("click", () => {
	todoListContainer.style.display = "none";
	doneListContainer.style.display = "block";
	completedBtn.classList.add("active");
	newListBtn.classList.remove("active");
	console.log("Viser færdige todos");
	console.log("Nuværende doneList:", lists[currentList].done);
});
homeBtn.addEventListener("click", () => {
	// Skift til default liste
	currentList = "default";
	renderTodos();
	renderLists(); // Opdater active state i sidebar

	// Vis todo-listen (ikke done-listen)
	todoListContainer.style.display = "block";
	doneListContainer.style.display = "none";
	completedBtn.classList.remove("active");
	newListBtn.classList.remove("active");

	console.log("Skiftede til default liste");
	console.log("Nuværende todoList:", lists[currentList].todos);
});

// Functions

// Opret ny liste
function createNewList() {
	const listName = prompt("Indtast navn på ny liste:");
	if (!listName || !listName.trim()) return;

	const listId = crypto.randomUUID();
	lists[listId] = {
		name: listName.trim(),
		todos: [],
		done: [],
	};

	currentList = listId;
	saveToStorage();
	renderLists();
	renderTodos();

	// Vis todo-listen (ikke done-listen)
	todoListContainer.style.display = "block";
	doneListContainer.style.display = "none";
	completedBtn.classList.remove("active");

	console.log("Oprettede ny liste:", listName);
}

// Skift til en specifik liste
function switchToList(listId) {
	currentList = listId;
	renderTodos();

	// Vis todo-listen (ikke done-listen)
	todoListContainer.style.display = "block";
	doneListContainer.style.display = "none";
	completedBtn.classList.remove("active");
	newListBtn.classList.remove("active");

	// Opdater active state for lister i sidebar
	renderLists(); // Genrender lister for at opdatere active state

	console.log("Skiftede til liste:", lists[listId].name);
}

// Render alle lister i sidebar
function renderLists() {
	if (!listsContainer) return; // Hvis lists div ikke findes

	listsContainer.innerHTML = "";

	Object.keys(lists).forEach((listId) => {
		const listContainer = document.createElement("div");
		listContainer.className = "list-item-container";

		// Markér den aktuelle liste som aktiv
		if (listId === currentList) {
			listContainer.classList.add("active");
		}

		listContainer.innerHTML = `
            <span class="list-name" onclick="switchToList('${listId}')">${lists[listId].name}</span>
            ${listId !== "default" ? `<button class="delete-list-btn" onclick="deleteList('${listId}')" title="Slet liste">🗑️</button>` : ""}
        `;

		listsContainer.appendChild(listContainer);
	});
	console.log(
		"Renderede lister i sidebar:",
		Object.values(lists).map((l) => l.name)
	);
}

// Funktion til at slette en liste
function deleteList(listId) {
	// Kan ikke slette default listen
	if (listId === "default") {
		alert("Du kan ikke slette standard listen!");
		return;
	}

	// Bekræft sletning
	const listName = lists[listId].name;
	if (!confirm(`Er du sikker på at du vil slette listen "${listName}"?\n\nAlle todos i listen vil blive slettet permanent.`)) {
		return;
	}

	// Slet listen
	delete lists[listId];

	// Hvis den slettede liste var den aktuelle, skift til default
	if (currentList === listId) {
		currentList = "default";
		renderTodos();

		// Vis todo-listen (ikke done-listen)
		todoListContainer.style.display = "block";
		doneListContainer.style.display = "none";
		completedBtn.classList.remove("active");
		newListBtn.classList.remove("active");
	}

	saveToStorage();
	renderLists();

	console.log("Slettede liste:", listName);
}

// Tilføj eller redigér todo
function handleAddOrEdit() {
	const text = todoInput.value.trim();
	if (!text) return;

	if (editingTodoId) {
		// Find og opdater eksisterende
		let todo = lists[currentList].todos.find((t) => t.id === editingTodoId);
		if (todo) {
			todo.text = text.charAt(0).toUpperCase() + text.slice(1);
			todo.date = new Date().toISOString();
			todo.amount = addTodoAmount.value || "";
			todo.beforeDate = addTodoBeforeDate.value || "";
		}
		editingTodoId = null;
		console.log("Opdaterede todo med id:", todo.id);
	} else {
		// Opret ny
		const todo = {
			id: crypto.randomUUID(),
			text: text.charAt(0).toUpperCase() + text.slice(1),
			completed: false,
			date: new Date().toISOString(),
			amount: addTodoAmount.value || "",
			beforeDate: addTodoBeforeDate.value || "",
		};
		// Tilføj ny todo til listen
		lists[currentList].todos.push(todo);
		console.log("Tilføjede ny todo:", todo);
	}

	// Nulstil input felter
	todoInput.value = "";
	addBtn.textContent = "+";
	addTodoBeforeDate.value = "";
	addTodoAmount.value = "";
	todoInput.placeholder = "Tilføj ny ToDo";
	saveToStorage();
	renderTodos();
	console.log("Opdateret todoList:", lists[currentList].todos);
}

//Lyt til ændringer i dato og antal felter og gem værdierne til createTodoElement funktionen
addTodoBeforeDate.addEventListener("change", () => {
	console.log("Valgt dato:", addTodoBeforeDate.value);
});

addTodoAmount.addEventListener("input", () => {
	console.log("Indtastet antal:", addTodoAmount.value);
});

// Render alle todos i den nuværende liste
function renderTodos() {
	// Hent todos og done fra den nuværende liste
	const { todos, done } = lists[currentList];

	// Todo-liste
	todoListContainer.innerHTML = "";
	todos.forEach((todo) => {
		todoListContainer.appendChild(createTodoElement(todo));
	});
	console.log("Renderede todo liste:", todos);
	// Done-liste
	doneListContainer.innerHTML = "";
	done.forEach((todo) => {
		doneListContainer.appendChild(createTodoElement(todo));
	});
	console.log("Renderede done liste:", done);
}

// Opret et DOM element for en todo
function createTodoElement(todo) {
	const div = document.createElement("div");
	div.className = "todo-item";

	// Tjek om beforeDate og amount har værdier (ikke tom eller kun mellemrum)
	const hasBeforeDate = todo.beforeDate && todo.beforeDate.trim() !== "";
	const hasAmount = todo.amount && todo.amount.trim() !== "";

	// Formater dato fra yyyy-mm-dd til dd-mm-yyyy
	let formattedDate = todo.beforeDate;
	if (hasBeforeDate) {
		const dateParts = todo.beforeDate.split("-");
		if (dateParts.length === 3) {
			formattedDate = `${dateParts[2]}/${dateParts[1]}-${dateParts[0]}`;
		}
	}

	div.innerHTML = `
        <div class="todo-checkbox ${todo.completed ? "completed" : ""}" onclick="handleToggleTodo('${todo.id}')"></div>
        <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
        <span class="todo-date" style="display:${hasBeforeDate ? "inline" : "none"}">Deadline ${formattedDate}</span>
        <span id="devider" style="display:${hasBeforeDate && hasAmount ? "inline" : "none"}">|</span>
        <span class="todo-amount" style="display:${hasAmount ? "inline" : "none"}">${todo.amount} stk.</span>
        <div class="todo-actions">
            <button class="edit-btn" onclick="editTodo('${todo.id}')" style="display:${todo.completed ? "none" : "inline-block"}">✏️</button>
            <button class="delete-btn" onclick="deleteTodo('${todo.id}')">🗑️</button>
        </div>
    `;
	return div;
}

// Skift mellem todo/done
function handleToggleTodo(id) {
	// Find todo i den nuværende liste
	const list = lists[currentList];
	// Find todo i todos array
	const todo = list.todos.find((t) => t.id === id);

	if (todo) {
		// Flyt todo til done listen
		// Fjern fra todos array
		list.todos = list.todos.filter((t) => t.id !== id);
		todo.completed = true;
		list.done.push(todo);
		console.log("Markerede todo som færdig:", todo);
	}
	// Hvis ikke fundet, prøv at finde i done array
	else {
		const doneTodo = list.done.find((t) => t.id === id);
		if (doneTodo) {
			list.done = list.done.filter((t) => t.id !== id);
			doneTodo.completed = false;
			list.todos.push(doneTodo);
			console.log("Markerede todo som ikke-færdig:", doneTodo);
		}
	}
	saveToStorage();
	renderTodos();
}

// Slet en todo
function deleteTodo(id) {
	// Find og fjern todo fra den nuværende liste
	let list = lists[currentList];
	// filter gør at vi fjerner todo med matching id
	// tager alle todos der ikke matcher id'et
	// og laver et nyt array med dem
	// altså fjerner vi todo med det id
	list.todos = list.todos.filter((t) => t.id !== id);
	list.done = list.done.filter((t) => t.id !== id);
	if (editingTodoId === id) cancelEdit();
	saveToStorage();
	renderTodos();
	console.log("Slettet todo med id:", id);
}

function editTodo(id) {
	const list = lists[currentList];
	const todo = list.todos.find((t) => t.id === id);
	if (todo) {
		editingTodoId = id;
		todoInput.value = todo.text;
		todoInput.focus();
		addTodoBeforeDate.value = todo.beforeDate;
		addTodoAmount.value = todo.amount;
		addBtn.textContent = "✔";
		todoInput.placeholder = "Redigér todo...";
		console.log("Redigerer todo med id:", id);
	}
}

function cancelEdit() {
	editingTodoId = null;
	todoInput.value = "";
	addBtn.textContent = "+";
	todoInput.placeholder = "Tilføj ny ToDo";
	addTodoBeforeDate.value = "";
	addTodoAmount.value = "";
	console.log("Annulleret redigering");
}

function saveToStorage() {
	localStorage.setItem("lists", JSON.stringify(lists));
	console.log("Gemte lister til localStorage");
}

// Tilføj escape-key for at annullere redigering
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && editingTodoId) {
		cancelEdit();
		console.log("Annulleret redigering via Escape key");
	}
});

// Load på page load
renderLists(); // Render lister først
renderTodos();
console.log("App er klar til brug.");
