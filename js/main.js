window.onload = function () {
    var addItem = document.getElementById("add");
    addItem.onclick = main;
};
function main() {
    if (isValid()) {
        clearErrorSpans();
        var item_1 = getToDoItem();
        displayToDoItem(item_1);
        clearForm();
    }
}
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
var item = new ToDoItem();
item.dueDate = new Date(2021, 6, 1);
item.isCompleted = false;
function clearForm() {
    getInput("title").value = "";
    getInput("due-date").value = "";
}
function isValid() {
    clearErrorSpans();
    var isValid = true;
    var titleBox = getInput("title");
    var titleSpan = getInput("title-span");
    if (titleBox.value == "") {
        isValid = false;
        titleSpan.innerText = "Title is required";
    }
    var dateBox = getInput("due-date");
    var dateSpan = getInput("date-span");
    if (dateBox.value == "") {
        isValid = false;
        dateSpan.innerText = "Due date is required";
    }
    return isValid;
}
function clearErrorSpans() {
    var allErrorSpans = document.querySelectorAll("span");
    for (var i = 0; i < allErrorSpans.length; i++) {
        allErrorSpans[i].innerHTML = "";
    }
}
function getToDoItem() {
    var myItem = new ToDoItem();
    var titleBox = getInput("title");
    myItem.title = titleBox.value;
    var dueDateInput = getInput("due-date");
    myItem.dueDate = new Date(dueDateInput.value);
    return myItem;
}
function getInput(id) {
    return document.getElementById(id);
}
function displayToDoItem(item) {
    var editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.className = "edit-button";
    editBtn.onclick = editTask;
    var itemText = document.createElement("h3");
    itemText.className = "todo-title";
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toString();
    var itemDiv = document.createElement("div");
    itemDiv.id = "itemDivId";
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemText.onclick = markAsComplete;
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    itemDiv.appendChild(editBtn);
    if (item.isCompleted) {
        var completedTask = document.getElementById("complete-items");
        completedTask.appendChild(itemDiv);
    }
    else {
        var incompleteTasks = document.getElementById("incompleted-items");
        incompleteTasks.appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = getInput("itemDivId");
    itemDiv.classList.add("completed");
    var completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}
function editTask() {
    var itemDiv = getInput("itemDivId");
    if (getInput("delete-todo")) {
        var deleteBtn_1 = getInput("delete-todo");
        deleteBtn_1.remove();
    }
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "delete-todo";
    deleteBtn.id = "delete-todo";
    itemDiv.appendChild(deleteBtn);
}
function markToDo() {
    var itemDiv = getInput("itemDivId");
    itemDiv.classList.add("todo");
    var incompletedItems = document.getElementById("incompleted-items");
    incompletedItems.appendChild(itemDiv);
}
