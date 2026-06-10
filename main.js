let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";
let darkMode = false;

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  let priority = document.getElementById("priority").value;

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    done: false,
    priority: priority
  });

  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  let newText = prompt("Edit task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText;
    renderTasks();
  }
}

function setFilter(value) {
  filter = value;
  renderTasks();
}

function toggleTheme() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark");
}

function renderTasks() {
  let list = document.getElementById("taskList");
  let search = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    let matchFilter =
      filter === "all" ||
      (filter === "active" && !task.done) ||
      (filter === "done" && task.done);

    let matchSearch = task.text.toLowerCase().includes(search);

    return matchFilter && matchSearch;
  });

  filtered.forEach((task, index) => {
    list.innerHTML += `
      <li class="${task.done ? 'done' : ''} ${task.priority.toLowerCase()}">
        <span onclick="toggleTask(${index})">
          ${task.text} (${task.priority})
        </span>

        <div>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">X</button>
        </div>
      </li>
    `;
  });

  document.getElementById("counter").innerText =
    `Total: ${tasks.length} | Completed: ${tasks.filter(t => t.done).length}`;

  save();
}

renderTasks();
