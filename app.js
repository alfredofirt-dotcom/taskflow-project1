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

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

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
    saveTasks();
    taskInput.value = "";
    renderTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(i) {
    tasks[i].completed = !tasks[i].completed;
    saveTasks();
    renderTasks();
}

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

    // DONUT
    donutChart.style.background = `conic-gradient(
        #4CAF50 0% ${completedPerc}%,
        #f44336 ${completedPerc}% 100%
    )`;

    donutText.textContent = completedPerc + "%";

    completedLabel.textContent = completedPerc + "%";
    pendingLabel.textContent = pendingPerc + "%";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, i) => {
        const div = document.createElement("div");
        div.className = `task-card ${task.priority} ${task.completed ? "completed" : ""}`;

        div.innerHTML = `
            <h3>${task.text}</h3>
            <p>${task.category}</p>
        `;

        const btn1 = document.createElement("button");
        btn1.textContent = "✔";
        btn1.onclick = () => toggleComplete(i);

        const btn2 = document.createElement("button");
        btn2.textContent = "X";
        btn2.onclick = () => deleteTask(i);

        div.appendChild(btn1);
        div.appendChild(btn2);

        taskList.appendChild(div);
    });

    updateStats();
}

addTaskBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", renderTasks);

// 🌙 DARK MODE
const toggleButton = document.getElementById("darkModeToggle");

if(localStorage.getItem("darkMode") === "true"){
    document.body.classList.add("dark-mode");
}

toggleButton.onclick = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
};