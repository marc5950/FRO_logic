let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let doneList = JSON.parse(localStorage.getItem("doneList")) || [];
let editingTodoId = null; // Holder styr på hvilken todo der redigeres

// Knapper i sidebar
const completedBtn = document.getElementById("completed-btn");
const newListBtn = document.getElementById("new-list-btn");

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

// Functions

function handleAddOrEdit() {
	if (editingTodoId) {
		// Hvis vi er i redigeringsmode, så gem ændringerne
		const text = todoInput.value.trim();
		if (text) {
			const todo = todoList.find((t) => t.id === editingTodoId);
			if (todo) {
				// Slet den gamle todo
				todoList = todoList.filter((t) => t.id !== editingTodoId);

				// Opret ny todo med samme id men ny tekst
				const updatedTodo = {
					...todo,
					text: text,
					date: new Date().toISOString(), // Opdater dato
				};
				todoList.push(updatedTodo);

				saveToStorage();
				renderTodos();

				// Reset redigering
				editingTodoId = null;
				todoInput.value = "";
				addBtn.textContent = "+";
				todoInput.placeholder = "Tilføj ny ToDo";
			}
		}
	} else {
		// Tilføj ny todo
		// Lav første bogstav stort
		const text = todoInput.value.trim();
		if (text) {
			const todo = {
				id: Date.now(),
				text: text.charAt(0).toUpperCase() + text.slice(1),
				completed: false,
				date: new Date().toISOString(),
			};
			todoList.push(todo);
			saveToStorage();
			renderTodos();
			todoInput.value = "";
		}
	}
	console.log("Todo List:", todoList);
}

// Push til todoList arrayet
// Gem i localStorage
// Render opdaterer visningen
// Tøm input feltet
function addTodo() {
	const text = todoInput.value.trim();
	if (text) {
		const todo = {
			id: Date.now(),
			text: text,
			completed: false,
			date: new Date().toISOString(),
		};
		todoList.push(todo);
		saveToStorage();
		renderTodos();
		todoInput.value = "";
	}
}

// Render todo liste
// Tøm containeren
// Loop gennem todoList arrayet
// Opret et nyt DOM element for hver todo
// Tilføj elementet til containeren
function renderTodos() {
	todoListContainer.innerHTML = "";
	todoList.forEach((todo) => {
		const todoElement = createTodoElement(todo);
		todoListContainer.appendChild(todoElement);
		addBtn.textContent = "+";
	});
}

function createTodoElement(todo) {
	const div = document.createElement("div");
	div.className = "todo-item";
	div.innerHTML = `
        <div class="todo-checkbox ${todo.completed ? "completed" : ""}" onclick="toggleTodo(${todo.id})"></div>
        <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
        <div class="todo-actions">
            <button class="edit-btn" onclick="editTodo(${todo.id})">✏️</button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
        </div>
    `;
	return div;
}

function toggleTodo(id) {
	const todo = todoList.find((t) => t.id === id);
	if (todo) {
		todo.completed = !todo.completed;
		if (todo.completed) {
			// Flyt til done list
			doneList.push(todo);
			todoList = todoList.filter((t) => t.id !== id);
		}
		saveToStorage();
		renderTodos();
	}
}

function deleteTodo(id) {
	todoList = todoList.filter((t) => t.id !== id);
	saveToStorage();
	renderTodos();

	// Hvis vi sletter den todo vi redigerer, cancel redigering
	if (editingTodoId === id) {
		cancelEdit();
	}
}

function cancelEdit() {
	editingTodoId = null;
	todoInput.value = "";
	addBtn.textContent = "+";
	todoInput.placeholder = "Tilføj ny ToDo";
}

function editTodo(id) {
	const todo = todoList.find((t) => t.id === id);
	if (todo) {
		editingTodoId = id;
		todoInput.value = todo.text;
		todoInput.focus();
		addBtn.textContent = "✓";
		todoInput.placeholder = "Redigér todo...";
	}
}

function saveToStorage() {
	localStorage.setItem("todoList", JSON.stringify(todoList));
	localStorage.setItem("doneList", JSON.stringify(doneList));
}

// Tilføj escape-key for at annullere redigering
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && editingTodoId) {
		cancelEdit();
	}
});

// Load på page load
renderTodos();
