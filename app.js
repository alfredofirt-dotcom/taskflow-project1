// --------------------------
// ELEMENTOS DEL DOM
// --------------------------
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

// --------------------------
// CARGAR TAREAS DESDE LOCALSTORAGE
// --------------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// --------------------------
// FUNCIONES
// --------------------------

// Guardar tareas en LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Añadir tarea
function addTask() {
    const text = taskInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;

    if (text === "") return;

    const task = {
        id: Date.now(),
        text: text,
        category: category,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    taskInput.value = "";
    renderTasks();
}

// Eliminar tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Marcar tarea como completada
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Actualizar estadísticas
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Renderizar tareas
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const card = document.createElement("div");
        card.classList.add("task-card", task.priority);
        if (task.completed) card.classList.add("completed");

        card.innerHTML = `
            <h3>${task.text}</h3>
            <p>Categoría: ${task.category}</p>
            <span class="badge ${task.priority}">${task.priority}</span>
        `;

        // Botón completar
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.title = "Marcar como completada";
        completeBtn.addEventListener("click", () => toggleComplete(index));

        // Botón eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.title = "Eliminar tarea";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        card.appendChild(completeBtn);
        card.appendChild(deleteBtn);

        taskList.appendChild(card);
    });

    // Actualizar estadísticas al final
    updateStats();
}

// Buscador
searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const cards = taskList.getElementsByClassName("task-card");

    for (let card of cards) {
        const text = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = text.includes(filter) ? "" : "none";
    }
});

// --------------------------
// EVENTOS
// --------------------------
addTaskBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", renderTasks);