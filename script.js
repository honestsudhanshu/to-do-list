// Global Variables
let currentView = "welcome"; // Tracks the current view
const contentDiv = document.getElementById("content");

// Predefined To-Do List
const predefinedTasks = [
    "4:00 AM – 6:30 AM: Wake up and get ready",
    "6:30 AM – 7:30 AM: Morning Study Session",
    "8:30 AM – 11:30 AM: Study Session",
    "12:00 PM – 1:00 PM: Revision",
    "2:30 PM – 5:30 PM: Study Session",
    "6:00 PM – 7:30 PM: Study Session",
    "8:00 PM – 9:00 PM: Read Books",
    "9:00 PM – 9:30 PM: Review the Day",
];

// Event Listeners for Navigation
document.getElementById("show-existing").addEventListener("click", showExistingToDo);
document.getElementById("create-new").addEventListener("click", createNewToDo);

// Show Existing To-Do List
function showExistingToDo() {
    currentView = "existing";
    contentDiv.innerHTML = `
        <h2>Existing To-Do List</h2>
        <ul id="task-list">
            ${predefinedTasks
                .map((task, index) => `<li><input type="checkbox" id="task${index}"> ${task}</li>`)
                .join("")}
        </ul>
        <button onclick="resetTasks()">Reset All Tasks</button>
    `;
    loadTaskStatus();
}

// Create New To-Do List
function createNewToDo() {
    currentView = "new";
    contentDiv.innerHTML = `
        <h2>Create Your Own To-Do List</h2>
        <input type="text" id="new-task" placeholder="Enter a new task" />
        <button onclick="addTask()">Add Task</button>
        <ul id="task-list"></ul>
        <button onclick="resetTasks()">Reset All Tasks</button>
    `;
}

// Add Task to New List
function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");

    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox"> ${taskInput.value}`;
        taskList.appendChild(li);
        taskInput.value = "";
    } else {
        alert("Task cannot be empty!");
    }
}

// Load Task Status from localStorage
function loadTaskStatus() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("task-list");

    if (savedTasks.length > 0) {
        taskList.querySelectorAll("li").forEach((li, index) => {
            const checkbox = li.querySelector("input[type='checkbox']");
            checkbox.checked = savedTasks[index]?.completed || false;
            if (checkbox.checked) {
                li.classList.add("completed");
            }
            checkbox.addEventListener("change", saveTaskStatus);
        });
    }
}

// Save Task Status to localStorage
function saveTaskStatus() {
    const taskList = document.getElementById("task-list");
    const tasks = [];

    taskList.querySelectorAll("li").forEach((li) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        tasks.push({ completed: checkbox.checked });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Reset All Tasks
function resetTasks() {
    const taskList = document.getElementById("task-list");
    taskList.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.closest("li").classList.remove("completed");
    });
    localStorage.removeItem("tasks");
}
