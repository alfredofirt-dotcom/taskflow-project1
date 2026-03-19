const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const completedPercent = document.getElementById("completedPercent");
const pendingPercent = document.getElementById("pendingPercent");

const donutChart = document.getElementById("donutChart");
const donutText = document.getElementById("donutText");

const completedLabel = document.getElementById("completedLabel");
const pendingLabel = document.getElementById("pendingLabel");

const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// FILTRO
let currentFilter = "all"; // all, pending, completed

// Cargar tareas con protección
let tasks = [];
try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (error) {
    tasks = [];
}

// Guardar
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Añadir tarea
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const task = {
        id: Date.now(),
        text,
        category: categorySelect.value,
        priority: prioritySelect.value,
        completed: false
    };

    tasks.push(task);
    updateAndRender();
    taskInput.value = "";
}

// Eliminar por ID
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateAndRender();
}

// Completar por ID
function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateAndRender();
}

// Editar tarea
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt("Editar tarea:", task.text);

    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        updateAndRender();
    }
}

// Cambiar filtro
function setFilter(filter) {
    currentFilter = filter; // all, pending, completed
    renderTasks();
}

// Guardar + render
function updateAndRender() {
    saveTasks();
    renderTasks();
}

// Estadísticas
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    const completedPerc = total ? Math.round((completed / total) * 100) : 0;
    const pendingPerc = total ? Math.round((pending / total) * 100) : 0;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

    completedPercent.textContent = completedPerc + "%";
    pendingPercent.textContent = pendingPerc + "%";

    donutChart.style.background = `conic-gradient(
        #4CAF50 0% ${completedPerc}%,
        #f44336 ${completedPerc}% 100%
    )`;

    donutText.textContent = completedPerc + "%";

    completedLabel.textContent = completedPerc + "%";
    pendingLabel.textContent = pendingPerc + "%";
}

// Render
function renderTasks() {
    taskList.innerHTML = "";

    // Filtrar según currentFilter
    let filteredTasks = tasks;
    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => {
        const div = document.createElement("div");
        div.className = `task-card ${task.priority} ${task.completed ? "completed" : ""}`;

        div.innerHTML = `
            <h3>${task.text}</h3>
            <p>${task.category}</p>
        `;

        const btnComplete = document.createElement("button");
        btnComplete.textContent = "✔";
        btnComplete.onclick = () => toggleComplete(task.id);

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "✏️";
        btnEdit.onclick = () => editTask(task.id);

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "X";
        btnDelete.onclick = () => deleteTask(task.id);

        div.appendChild(btnComplete);
        div.appendChild(btnEdit);
        div.appendChild(btnDelete);

        taskList.appendChild(div);
    });

    updateStats();
}

// Eventos
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

document.addEventListener("DOMContentLoaded", renderTasks);

// 🌙 DARK MODE
const toggleButton = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

toggleButton.onclick = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
};