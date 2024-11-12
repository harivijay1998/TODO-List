const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close-btn");
const del = document.getElementById("del_all_row")

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("taskForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const taskNumber = document.getElementById("taskNumber").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const type = document.querySelector("#task_type").value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const notify = [];

  document
    .querySelectorAll('input[type="checkbox"]:checked')
    .forEach((checkbox) => {
      notify.push(checkbox.value);
    });

  const taskDate = `${startDate} to ${endDate}`;

  const taskData = {
    taskName,
    taskNumber,
    taskDate,
    type,
    status,
    notify: notify.join(", "),
  };

  addtaskData_to_table(taskData);

  event.target.reset();
  modal.style.display = "none";
});

let taskDataArray = [];
let tableBody='';
function initalLocalStorage() {
  if (!localStorage.getItem("taskDataArray")) {
    const initalData = [
      {
        taskName: "Task 1",
        taskNumber: "T001",
        taskDate: "2024-11-10 to 2024-11-15",
        type: "Development",
        status: "Pending",
        notify: "Email",
      },
      {
        taskName: "Task 2",
        taskNumber: "T002",
        taskDate: "2024-11-11 to 2024-11-16",
        type: "Testing",
        status: "Completed",
        notify: "SMS",
      },
      {
        taskName: "Task 3",
        taskNumber: "T003",
        taskDate: "2024-11-12 to 2024-11-17",
        type: "Design",
        status: "In Progress",
        notify: "Email",
      },
      {
        taskName: "Task 4",
        taskNumber: "T004",
        taskDate: "2024-11-13 to 2024-11-18",
        type: "Deployment",
        status: "Pending",
        notify: "Push Notification",
      },
      {
        taskName: "Task 5",
        taskNumber: "T005",
        taskDate: "2024-11-14 to 2024-11-19",
        type: "Maintenance",
        status: "In Progress",
        notify: "Email, SMS",
      },
    ];

    localStorage.setItem("taskDataArray", JSON.stringify(initalData));
  }

  taskDataArray = JSON.parse(localStorage.getItem("taskDataArray")) || [];

  renderTableData();
}

function renderTableData() {
 tableBody = document.getElementById("taskTable").querySelector("tbody");
  tableBody.innerHTML = "";
  console.log("taskDataArray", taskDataArray);

  taskDataArray.forEach((taskData) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
            <td>${taskData.taskName}</td>
            <td>${taskData.taskNumber}</td>
            <td>${taskData.taskDate}</td>
            <td>${taskData.type}</td>
            <td>${taskData.status}</td>
            <td>${taskData.notify}</td>
            <td>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </td>
        `;

    tableBody.appendChild(newRow);
  });
}

window.onload = () => {
  initalLocalStorage();
  renderTableData();
};

function addtaskData_to_table(taskData) {
  const tableBody = document.getElementById("taskTable").querySelector("tbody");

  const editingRow = document.querySelector('tr[data-editing="true"]');

  if (editingRow) {
    editingRow.cells[0].innerText = taskData.taskName;
    editingRow.cells[1].innerText = taskData.taskNumber;
    editingRow.cells[2].innerText = taskData.taskDate;
    editingRow.cells[3].innerText = taskData.type;
    editingRow.cells[4].innerText = taskData.status;
    editingRow.cells[5].innerText = taskData.notify;

    editingRow.removeAttribute("data-editing");
  } else {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
            <td>${taskData.taskName}</td>
            <td>${taskData.taskNumber}</td>
            <td>${taskData.taskDate}</td>
            <td>${taskData.type}</td>
            <td>${taskData.status}</td>
            <td>${taskData.notify}</td>
            <td>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </td>
        `;
    tableBody.appendChild(newRow);
  }
}

window.editTask = function (button) {
  const row = button.closest("tr");

  const taskData = {
    taskName: row.cells[0].innerText,
    taskNumber: row.cells[1].innerText,
    taskDate: row.cells[2].innerText,
    taskType: row.cells[3].innerText,
    status: row.cells[4].innerText,
    notify: row.cells[5].innerText,
  };

  const [startDate, endDate] = taskData.taskDate.split(" to ");

  document.getElementById("taskName").value = taskData.taskName;
  document.getElementById("taskNumber").value = taskData.taskNumber;
  document.getElementById("startDate").value = startDate;
  document.getElementById("endDate").value = endDate;
  document.getElementById("task_type").value = taskData.taskType;

  const statusRadios = document.querySelectorAll('input[name="status"]');
  statusRadios.forEach((radio) => {
    if (radio.value === taskData.status) {
      radio.checked = true;
    }
  });

  const notifyCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  const notifyValues = taskData.notify.split(", ");
  notifyCheckboxes.forEach((checkbox) => {
    checkbox.checked = notifyValues.includes(checkbox.value);
  });

  modal.style.display = "flex";

  row.setAttribute("data-editing", "true");
};

window.deleteTask = function (button) {
  const row = button.closest("tr");
  row.remove();
};


del.addEventListener('click',(e)=>{
    tableBody.remove();
})