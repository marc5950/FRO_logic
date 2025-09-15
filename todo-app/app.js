let lists = JSON.parse(localStorage.getItem("lists")) || {
	default: {
		todos: [],
		done: [],
	},
};

let currentList = "default";
let editingTodoId = null;

// Knapper i sidebar
const completedBtn = document.getElementById("completed-btn");
const newListBtn = document.getElementById("new-list-btn");
const homeBtn = document.getElementById("home");

// DOM elementer
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoListContainer = document.getElementById("todo-list");
const doneListContainer = document.getElementById("done-list");

// Event listeners
addBtn.addEventListener("click", handleAddOrEdit);
todoInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") handleAddOrEdit();
});

completedBtn.addEventListener("click", () => {
	todoListContainer.style.display = "none";
	doneListContainer.style.display = "block";
	completedBtn.classList.add("active");
	newListBtn.classList.remove("active");
	console.log("Viser færdige todos");
	console.log("Nuværende doneList:", lists[currentList].done);
});
homeBtn.addEventListener("click", () => {
	todoListContainer.style.display = "block";
	doneListContainer.style.display = "none";
	completedBtn.classList.remove("active");
	newListBtn.classList.remove("active");
	console.log("Viser alle todos");
	console.log("Nuværende todoList:", lists[currentList].todos);
});

// Functions

// Tilføj eller redigér todo
// Hvis vi er i redigeringsmode, så gem ændringerne
// Ellers tilføj ny todo
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
		}
		editingTodoId = null;
		console.log("Opdaterede todo med id:", todo.id);
	} else {
		// Opret ny
		const todo = {
			id: Date.now(),
			text: text.charAt(0).toUpperCase() + text.slice(1),
			completed: false,
			date: new Date().toISOString(),
		};
		lists[currentList].todos.push(todo);
		console.log("Tilføjede ny todo:", todo);
	}

	todoInput.value = "";
	addBtn.textContent = "+";
	todoInput.placeholder = "Tilføj ny ToDo";
	saveToStorage();
	renderTodos();
	console.log("Opdateret todoList:", lists[currentList].todos);
}

// Render alle todos i den nuværende liste
function renderTodos() {
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

function createTodoElement(todo) {
	const div = document.createElement("div");
	div.className = "todo-item";
	div.innerHTML = `
        <div class="todo-checkbox ${todo.completed ? "completed" : ""}" onclick="handleToggleTodo(${todo.id})"></div>
        <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
        <div class="todo-actions">
            <button class="edit-btn" onclick="editTodo(${todo.id})">✏️</button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
        </div>
    `;
	return div;
}

// Skift mellem todo/done
function handleToggleTodo(id) {
	const list = lists[currentList];
	const todo = list.todos.find((t) => t.id === id);
	if (todo) {
		list.todos = list.todos.filter((t) => t.id !== id);
		todo.completed = true;
		list.done.push(todo);
		console.log("Markerede todo som færdig:", todo);
	} else {
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

function deleteTodo(id) {
	let list = lists[currentList];
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
renderTodos();
console.log("App er klar til brug.");
