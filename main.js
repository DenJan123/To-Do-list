const addTaskButton = document.getElementById("add-task-button");
const addTaskTextField = document.getElementById("input-task");
const taskList = document.getElementById("task-list");
let deleteButtons = document.querySelectorAll(".delete-btn");
let checkBoxes = document.querySelectorAll("[type=checkbox]");
let taskCount = 3;

let template = (taskString) => `<li><input type="checkbox"><span class="task-${++taskCount} task">${taskString}</span><button class="delete-btn">Delete task</button></li>`;

function getValueTextField() {
    return addTaskTextField.value;
}

function clearTextField() {
    addTaskTextField.value = '';
}

function appendTask() {
    let value = getValueTextField();
    if (!value) return;
    let entry = template(value);
    taskList.insertAdjacentHTML('beforeend', entry);
    updateEventListeners()
    clearTextField();
}

function deleteRow(e) {
    e.path[1].remove();
}
function changeStyleTask(event)  {
 //   event.currentTarget.nextElementSibling
    event.currentTarget.nextElementSibling.classList.toggle("finished-task");
    console.log('fired');
}

function updateEventListeners() {
    let deleteButtons = document.querySelectorAll(".delete-btn");
    let checkBoxes = document.querySelectorAll("[type=checkbox]");
    deleteButtons.forEach(item => item.addEventListener("click", deleteRow));
    checkBoxes.forEach(item => item.addEventListener('change', changeStyleTask));
    addTaskButton.addEventListener("click", appendTask);

}

updateEventListeners()