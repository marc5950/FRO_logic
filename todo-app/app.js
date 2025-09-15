let lists = []; // Holder styr på alle lister (ikke implementeret endnu)
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let doneList = JSON.parse(localStorage.getItem("doneList")) || [];
let editingTodoId = null; // Holder styr på hvilken todo der redigeres

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
	console.log("Nuværende doneList:", doneList);
});
homeBtn.addEventListener("click", () => {
	todoListContainer.style.display = "block";
	doneListContainer.style.display = "none";
	completedBtn.classList.remove("active");
	newListBtn.classList.remove("active");
	console.log("Viser alle todos");
	console.log("Nuværende todoList:", todoList);
});

// Functions

// Tilføj eller redigér todo
// Hvis vi er i redigeringsmode, så gem ændringerne
// Ellers tilføj ny todo
function handleAddOrEdit() {
	console.log("Add/Edit button clicked");
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
					// ...todo tager alle properties fra den gamle todo
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
	console.log("Rendered todos. Current todoList:", todoList);

	// Render done list
	doneListContainer.innerHTML = "";
	doneList.forEach((todo) => {
		const todoElement = createTodoElement(todo);
		doneListContainer.appendChild(todoElement);
	});
	console.log("Rendered done todos. Current doneList:", doneList);
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

function handleToggleTodo(id) {
	const todoInTodoList = todoList.find((t) => t.id === id);
	const todoInDoneList = doneList.find((t) => t.id === id);

	if (todoInTodoList) {
		toggleTodoDone(id);
	} else if (todoInDoneList) {
		toggleTodoUndo(id);
	}
}

function toggleTodoDone(id) {
	const index = todoList.findIndex((t) => t.id === id);
	if (index !== -1) {
		const todo = todoList[index];
		todoList.splice(index, 1);
		todo.completed = true;
		doneList.push(todo);
		saveToStorage();
		renderTodos();
		console.log("Completed todo:", todo);
	}
}

function toggleTodoUndo(id) {
	const index = doneList.findIndex((t) => t.id === id);
	if (index !== -1) {
		const todo = doneList[index];
		doneList.splice(index, 1);
		todo.completed = false;
		todoList.push(todo);
		saveToStorage();
		renderTodos();
		console.log("Undid todo:", todo);
	}
}

function deleteTodo(id) {
	todoList = todoList.filter((t) => t.id !== id);
	saveToStorage();
	renderTodos();
	console.log("Slettet todo:", id);

	// Hvis vi sletter den todo vi redigerer, cancel redigering
	if (editingTodoId === id) {
		cancelEdit();
		console.log("Annulleret redigering for slettet todo:", id);
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
		addBtn.textContent = "✔";
		todoInput.placeholder = "Redigér todo...";
		console.log("Redigerer todo:", todo);
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
		console.log("Annulleret redigering via Escape key");
	}
});

// Load på page load
renderTodos();
console.log("App er klar til brug.");
