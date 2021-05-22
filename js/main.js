window.onload = function () {
    var addItem = document.getElementById("add");
    addItem.onclick = main;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = getToDoItems();
    if (itemArray != null) {
        for (var i = 0; i < itemArray.length; i++) {
            displayToDoItem(itemArray[i]);
        }
    }
}
function main() {
    if (isValid()) {
        clearErrorSpans();
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
        clearForm();
    }
}
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
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
    var itemText = document.createElement("h3");
    itemText.id = "item-text";
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toString();
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.id = "taskId";
    itemDiv.setAttribute("data-todo-title", item.title);
    itemDiv.onclick = toggleComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        var completedTask = document.getElementById("complete-items");
        completedTask.appendChild(itemDiv);
    }
    else {
        var incompleteTasks = document.getElementById("uncompleted-items");
        incompleteTasks.appendChild(itemDiv);
    }
}
function toggleComplete() {
    var itemDiv = this;
    if (itemDiv.classList.contains("completed")) {
        itemDiv.classList.remove("completed");
        var incompleteItems = getInput("uncompleted-items");
        incompleteItems.appendChild(itemDiv);
    }
    else {
        itemDiv.classList.add("completed");
        var completedItems = getInput("complete-items");
        completedItems.appendChild(itemDiv);
    }
    var allTodos = getToDoItems();
    var currentTodoTitle = itemDiv.getAttribute("data-todo-title");
    for (var index = 0; index < allTodos.length; index++) {
        var nextTodo = allTodos[index];
        if (nextTodo.title == currentTodoTitle) {
            nextTodo.isCompleted = !nextTodo.isCompleted;
        }
    }
    saveAllTasks(allTodos);
}
function saveAllTasks(allTodos) {
    localStorage.setItem(todokey, "");
    var allItemsString = JSON.stringify(allTodos);
    localStorage.setItem(todokey, allItemsString);
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
var todokey = "todo";
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
function clearAllTasks() {
    var quit = confirm("Are you sure you want to clear all tasks?");
    if (quit) {
        var uncompletedTasks = document.getElementById("uncompleted-items");
        var completedTasks = document.getElementById("complete-items");
        uncompletedTasks.innerHTML = "";
        completedTasks.innerHTML = "";
        localStorage.clear();
    }
}
