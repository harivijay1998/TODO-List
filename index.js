
let taskDataArray = JSON.parse(localStorage.getItem("taskDataArray")) || [];
let tableBody = document.getElementById("taskTable").querySelector("tbody");
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close-btn");
const del = document.getElementById("del_all_row");


openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});


window.onload = () => {
  initalLocalStorage();
  renderTableData();
};


function initalLocalStorage() {
  if (!localStorage.getItem("taskDataArray")) {
    const initalData = [
      { id: Date.now(), taskName: "Task 1", taskNumber: "1", taskDate: "2024-11-10 to 2024-11-15", type: "Development", status: "Pending", notify: "karthick" }
    ];
    localStorage.setItem("taskDataArray", JSON.stringify(initalData));
  }
  taskDataArray = JSON.parse(localStorage.getItem("taskDataArray")) || [];
  console.log(taskDataArray)
}


function renderTableData() {
  tableBody.innerHTML = "";
  taskDataArray.forEach((task) => {
    const newRow = document.createElement("tr");
    newRow.setAttribute("data-id", task.id);
    newRow.innerHTML = `
      <td>${task.taskName}</td>
      <td>${task.taskNumber}</td>
      <td>${task.taskDate}</td>
      <td>${task.type}</td>
      <td>${task.status}</td>
      <td>${task.notify}</td>
      <td>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
      </td>
    `;
    tableBody.appendChild(newRow);
  });
}


function addtaskData_to_table(taskData) {
  const editingRow = document.querySelector('tr[data-editing="true"]');

  if (editingRow) {
    const id = editingRow.getAttribute("data-id");
    taskData.id = Number(id);
    taskDataArray = taskDataArray.map((task) =>
      task.id === taskData.id ? taskData : task
    );
    editingRow.removeAttribute("data-editing");
  } else {
    taskData.id = Date.now();
    taskDataArray.push(taskData);
  }

  localStorage.setItem("taskDataArray", JSON.stringify(taskDataArray));
  renderTableData();
  modal.style.display = "none";
}


document.getElementById("taskForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const taskName = document.getElementById("taskName").value;
  const taskNumber = document.getElementById("taskNumber").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const type = document.querySelector("#task_type").value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const notify = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((cb) => cb.value);

  const taskData = {
    taskName, taskNumber,
    taskDate: `${startDate} to ${endDate}`,
    type, status, notify: notify.join(", "),
  };

  addtaskData_to_table(taskData);
  event.target.reset();
});


window.editTask = (button) => {
  const row = button.closest("tr");
  const id = row.getAttribute("data-id");
  const task = taskDataArray.find((task) => task.id === Number(id));

  const [startDate, endDate] = task.taskDate.split(" to ");
  document.getElementById("taskName").value = task.taskName;
  document.getElementById("taskNumber").value = task.taskNumber;
  document.getElementById("startDate").value = startDate;
  document.getElementById("endDate").value = endDate;
  document.getElementById("task_type").value = task.type;

  document.querySelectorAll('input[name="status"]').forEach((radio) => {
    radio.checked = radio.value === task.status;
  });

  document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.checked = task.notify.split(", ").includes(cb.value);
  });

  modal.style.display = "flex";
  row.setAttribute("data-editing", "true");
};


window.deleteTask = (button) => {
  const row = button.closest("tr");
  const id = row.getAttribute("data-id");
  taskDataArray = taskDataArray.filter((task) => task.id !== Number(id));
  localStorage.setItem("taskDataArray", JSON.stringify(taskDataArray));
  row.remove();
};


del.addEventListener("click", () => {
  tableBody.innerHTML = "";
  taskDataArray = [];
  localStorage.setItem("taskDataArray", JSON.stringify(taskDataArray));
});
