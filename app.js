// Obtener elementos del DOM
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

// Cargar tareas guardadas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Mostrar tareas al cargar la página
document.addEventListener("DOMContentLoaded", renderTasks);

// Evento para añadir tarea
addTaskBtn.addEventListener("click", addTask);

// Función para añadir tarea
function addTask() {

    const text = taskInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;

    if (text === "") return;

    const task = {
        text: text,
        category: category,
        priority: priority
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();
}

// Mostrar tareas en pantalla
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const card = document.createElement("div");
        card.classList.add("task-card", task.priority);

        card.innerHTML = `
            <h3>${task.text}</h3>
            <p>Categoría: ${task.category}</p>
            <span class="badge ${task.priority}">
                ${task.priority}
            </span>
        `;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";

        deleteBtn.addEventListener("click", () => {
            deleteTask(index);
        });

        card.appendChild(deleteBtn);

        taskList.appendChild(card);
    });
}

// Eliminar tarea
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}

// Guardar tareas en LocalStorage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// BONUS: buscador de tareas
searchInput.addEventListener("input", function () {

    const filter = searchInput.value.toLowerCase();

    const cards = taskList.getElementsByClassName("task-card");

    for (let card of cards) {

        const text = card.querySelector("h3").textContent.toLowerCase();

        if (text.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    }

});