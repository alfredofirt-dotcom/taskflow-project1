// --------------------------
// VARIABLES DEL DOM
// --------------------------
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
const searchInput = document.getElementById("searchInput");

// FILTRO
let currentFilter = "all";

// Traducción de prioridad
const priorityText = {
    high: "Alta",
    medium: "Media",
    low: "Baja"
};

// --------------------------
// CARGAR TAREAS
// --------------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Guardar tareas
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --------------------------
// AÑADIR TAREA (ANIMADA)
// --------------------------
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

    tasks.unshift(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// --------------------------
// ELIMINAR CON ANIMACIÓN
// --------------------------
function deleteTask(id) {
    const element = document.querySelector(`[data-id='${id}']`);

    if (element) {
        element.classList.add("opacity-0", "translate-x-10");

        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== id);
            updateAndRender();
        }, 300);
    }
}

// Completar tarea
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

    if (newText && newText.trim()) {
        task.text = newText.trim();
        updateAndRender();
    }
}

// Filtro
function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

// Guardar + render
function updateAndRender() {
    saveTasks();
    renderTasks();
}

// --------------------------
// ESTADÍSTICAS
// --------------------------
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

    donutChart.style.background = `conic-gradient(#4CAF50 0% ${completedPerc}%, #f44336 ${completedPerc}% 100%)`;

    donutText.textContent = completedPerc + "%";
    completedLabel.textContent = completedPerc + "%";
    pendingLabel.textContent = pendingPerc + "%";
}

// --------------------------
// RENDER CON ANIMACIONES PRO
// --------------------------
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = filteredTasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = filteredTasks.filter(t => t.completed);
    }

    const searchText = searchInput.value.toLowerCase();

    if (searchText) {
        filteredTasks = filteredTasks.filter(task =>
            task.text.toLowerCase().includes(searchText)
        );
    }

    filteredTasks.forEach((task, index) => {
        const div = document.createElement("div");

        div.setAttribute("data-id", task.id);

        div.className = `
            flex justify-between items-center p-4 rounded border-l-4 bg-white dark:bg-gray-800 shadow
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer
            ${task.completed ? "line-through opacity-60 scale-95" : ""}
            ${task.priority === "high" ? "border-red-500" : ""}
            ${task.priority === "medium" ? "border-yellow-500" : ""}
            ${task.priority === "low" ? "border-green-500" : ""}
            opacity-0 -translate-y-5
        `;

        div.innerHTML = `
            <div>
                <h3 class="font-semibold">${task.text}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">${task.category}</p>
                <span class="inline-block mt-1 px-2 py-1 text-xs rounded font-semibold
                    ${task.priority === "high" ? "bg-red-500 text-white" : ""}
                    ${task.priority === "medium" ? "bg-yellow-500 text-white" : ""}
                    ${task.priority === "low" ? "bg-green-500 text-white" : ""}">
                    ${priorityText[task.priority]}
                </span>
            </div>
        `;

        const btnComplete = document.createElement("button");
        btnComplete.textContent = "✔";
        btnComplete.className = "bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded";
        btnComplete.onclick = () => toggleComplete(task.id);

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "✏️";
        btnEdit.className = "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded";
        btnEdit.onclick = () => editTask(task.id);

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "X";
        btnDelete.className = "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded";
        btnDelete.onclick = () => deleteTask(task.id);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "flex gap-2";
        buttonsDiv.appendChild(btnComplete);
        buttonsDiv.appendChild(btnEdit);
        buttonsDiv.appendChild(btnDelete);

        div.appendChild(buttonsDiv);
        taskList.appendChild(div);

        // 🔥 ANIMACIÓN DE ENTRADA
        setTimeout(() => {
            div.classList.remove("opacity-0", "-translate-y-5");
        }, index * 100);
    });

    updateStats();
}

// --------------------------
// EVENTOS
// --------------------------
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

searchInput.addEventListener("input", renderTasks);

document.addEventListener("DOMContentLoaded", renderTasks);

// --------------------------
// MODO OSCURO
// --------------------------
const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
    darkModeToggle.textContent = "☀️ Modo Claro";
} else {
    darkModeToggle.textContent = "🌙 Modo Oscuro";
}

darkModeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);

    darkModeToggle.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
});