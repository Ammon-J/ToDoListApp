window.onload = function() {
    let addItem = document.getElementById("add");
    addItem.onclick = main;

    loadSavedItems();
}

function loadSavedItems() {
    let itemArray = getToDoItems();

    if(itemArray != null) {
        for(let i = 0; i < itemArray.length; i++){
            displayToDoItem(itemArray[i]);
        }
    }
}

function main() {
    if(isValid()) {
        clearErrorSpans();
        let item = getToDoItem()
        displayToDoItem(item);
        saveToDo(item);
        clearForm();
    }
}

class ToDoItem {
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}

/**
 * Clear the form when an item has been added
 */
function clearForm() {
    getInput("title").value = "";
    getInput("due-date").value = "";
}

/**
 * Check form data is valid
 */
function isValid():boolean {
    // Clear errors
    clearErrorSpans();

    let isValid:boolean = true;

    let titleBox = <HTMLInputElement>getInput("title");
    let titleSpan = getInput("title-span");

    if(titleBox.value == "") {
        isValid = false;
        titleSpan.innerText = "Title is required";
    }

    let dateBox = <HTMLInputElement>getInput("due-date");
    let dateSpan = getInput("date-span");

    if(dateBox.value == "") {
        isValid = false;
        dateSpan.innerText = "Due date is required";
    }

    return isValid;
}

/**
 * If everything is valid clear the error messages
 */
function clearErrorSpans() {
    let allErrorSpans = document.querySelectorAll("span");
    for (var i = 0; i < allErrorSpans.length; i++) {
        allErrorSpans[i].innerHTML = "";
    }
}

/**
 * Get all input off form and wrap in
 * a ToDoItem
 */
function getToDoItem():ToDoItem {
    let myItem = new ToDoItem();

    // Get the title
    let titleBox = getInput("title");
    myItem.title = titleBox.value;

    // Get the due date
    let dueDateInput = getInput("due-date");
    myItem.dueDate = new Date(dueDateInput.value);

    return myItem;
}

function getInput(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}


/**
 * Display given ToDoItem on the web page
 * @param item ToDoItem
 */
function displayToDoItem(item:ToDoItem) {
    // Create the title of the task
    let itemText = document.createElement("h3");
    itemText.id = "item-text";
    itemText.innerText = item.title;

    // Create the due date and print the due date
    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    // Create a div for incomplete and completed tasks
    let itemDiv = document.createElement("div");
    itemDiv.id = "taskId";
    itemDiv.setAttribute("data-todo-title", item.title);
    itemDiv.onclick = toggleComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted) {
        itemDiv.classList.add("completed");
    }

    // Add the task to the completed div and incomplete div
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted) {
        let completedTask = document.getElementById("complete-items");
        completedTask.appendChild(itemDiv);
    }

    else {
        let incompleteTasks = document.getElementById("uncompleted-items");
        incompleteTasks.appendChild(itemDiv);
    }
}

/***
 * If an uncompleted task was clicked, it will be marked as complete.
 */
function toggleComplete() {
    let itemDiv = <HTMLDivElement>this;

    if(itemDiv.classList.contains("completed")) {
        // Add the clicked task to to do
        itemDiv.classList.remove("completed");
        let incompleteItems = getInput("uncompleted-items");
        incompleteItems.appendChild(itemDiv);
    }

    else {
        // Add complete tasks to completed 
        itemDiv.classList.add("completed");
        let completedItems = getInput("complete-items");
        completedItems.appendChild(itemDiv);
    }

    let allTodos = getToDoItems();
    let currentTodoTitle = itemDiv.getAttribute("data-todo-title");
    for(let index = 0; index < allTodos.length; index++){
        let nextTodo = allTodos[index]; // Get ToDo out of array
        if(nextTodo.title == currentTodoTitle){
            nextTodo.isCompleted = !nextTodo.isCompleted; // Flip complete/incomplete
        }
    }

    saveAllTasks(allTodos);  // Re-save into storage
}

/**
 * Clear all current tasks from storage
 * and save a new array
 * @param allTodos all tasks
 */

function saveAllTasks(allTodos: ToDoItem[]) {
    // clear the current array
    localStorage.setItem(todokey, "");
    let allItemsString = JSON.stringify(allTodos); // Get new storage string with all Todos
    localStorage.setItem(todokey, allItemsString);
}

function saveToDo(item:ToDoItem) {
    let currItems = getToDoItems();
    if(currItems == null) { // No items found
        currItems = new Array();
    }
    currItems.push(item); // Add the new item to the curr item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
const todokey = "todo";

function getToDoItems():ToDoItem[] {
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

function clearAllTasks() {
    let quit = confirm("Are you sure you want to clear all tasks?");

    if(quit) {
        let uncompletedTasks = document.getElementById("uncompleted-items");
        let completedTasks = document.getElementById("complete-items");

        uncompletedTasks.innerHTML = "";
        completedTasks.innerHTML = "";
        localStorage.clear();
    }
}