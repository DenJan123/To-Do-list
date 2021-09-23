const addTaskButton = document.getElementById("add-task-button");
const addTaskTextField = document.getElementById("input-task");
const taskListDomObject = document.getElementById("task-list");
let deleteButtons = document.querySelectorAll(".delete-btn");
let checkBoxes = document.querySelectorAll("[type=checkbox]");
let taskCount = 0;

let template = (taskString, doneClass) => `<li><input type="checkbox"><span class="task-${++taskCount} task${doneClass}">${taskString}</span><button class="delete-btn"></button></li>`;
let taskListValuesInList = JSON.parse(localStorage.getItem("tasks")) || [];
let taskListObjectKeyValue = JSON.parse(localStorage.getItem("taskState")) || [];


function populateListFromStorage() {
    if (taskListValuesInList.length <= 0) {
        return;
    }
    for (let value of taskListObjectKeyValue) {
        let entry = template(value[0], value[1] ? " finished-task": "");
        taskListDomObject.insertAdjacentHTML('beforeend', entry);
        if (value[1]) {
            // taskListDomObject.lastChild.querySelector("[type='checkbox'").checked = true;
            // taskListDomObject.lastChild.querySelector("[type='checkbox'").checked = true;
            taskListDomObject.lastElementChild.querySelector("[type='checkbox']").checked = true;
        }
        updateEventListeners();
    }
}

function getValueTextField() {
    return addTaskTextField.value;
}

function clearTextField() {
    addTaskTextField.value = '';
}

function appendTask() {
    let value = getValueTextField();
    if (!value) return;
    let entry = template(value, "");
    taskListDomObject.insertAdjacentHTML('beforeend', entry);
    updateEventListeners();
    clearTextField();
    updateLocalStorageAllCurrentTasks();
}

function deleteRow(e) {
    e.path[1].remove();
    updateLocalStorageAllCurrentTasks();
}

function changeStyleTask(event) {
    //   event.currentTarget.nextElementSibling
    event.currentTarget.nextElementSibling.classList.toggle("finished-task");
    updateLocalStorageAllCurrentTasks();
}

function updateEventListeners() {
    let deleteButtons = document.querySelectorAll(".delete-btn");
    let checkBoxes = document.querySelectorAll("[type=checkbox]");
    deleteButtons.forEach(item => item.addEventListener("click", deleteRow));
    checkBoxes.forEach(item => item.addEventListener('change', changeStyleTask));
    addTaskButton.addEventListener("click", appendTask);
    document.getElementById("input-task")
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.key === 'Enter') {
                document.getElementById("add-task-button").click();
            }
        });

}

// let taskListObjectKeyValue = [];

function updateLocalStorageAllCurrentTasks() {
    taskListValuesInList = [];
    taskListObjectKeyValue = [];
    document.querySelectorAll(".task").forEach(item => {
        taskListValuesInList.push(item.textContent);
        taskListObjectKeyValue.push([item.textContent, item.classList.contains('finished-task')])
    })
    localStorage.setItem("tasks", JSON.stringify(taskListValuesInList));
    localStorage.setItem("taskState", JSON.stringify(taskListObjectKeyValue))
}


populateListFromStorage();
updateEventListeners();
