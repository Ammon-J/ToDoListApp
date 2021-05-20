window.onload = function() {
    let addItem = document.getElementById("add");
    addItem.onclick = main;

    
}

function main() {
    if(isValid()) {
        clearErrorSpans();
        let item = getToDoItem()
        displayToDoItem(item);
        clearForm();
    }
}

class ToDoItem {
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}

let item = new ToDoItem();
// item.title = "Testing";
item.dueDate = new Date(2021, 6, 1);
item.isCompleted = false;


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
    // Create an edit button
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.className = "edit-button";

    // Call editTask() if editbtn was clicked
    editBtn.onclick = editTask;

    // Create the title of the task
    let itemText = document.createElement("h3");
    itemText.className = "todo-title"
    itemText.innerText = item.title;

    // Create the due date
    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toString();

    // Create a div for incomplete and completed tasks
    let itemDiv = document.createElement("div");
    itemDiv.id = "itemDivId";
    itemDiv.classList.add("todo");
    if(item.isCompleted) {
        itemDiv.classList.add("completed");
    }

    itemText.onclick = markAsComplete;

    // Add the task to the completed div and incomplete div
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    itemDiv.appendChild(editBtn);

    if(item.isCompleted) {
        let completedTask = document.getElementById("complete-items");
        completedTask.appendChild(itemDiv);
    }

    else {
        let incompleteTasks = document.getElementById("incompleted-items");
        incompleteTasks.appendChild(itemDiv);
    }
}

// Allow user to mark a ToDoItem as completed
function markAsComplete() {
    let itemDiv = getInput("itemDivId");
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}

function editTask() {
    // Get the curr to do item
    let itemDiv = getInput("itemDivId");

    // Remove buttons of already created
    if(getInput("delete-todo")) {
        let deleteBtn = getInput("delete-todo");
        deleteBtn.remove();
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "delete-todo";
    deleteBtn.id = "delete-todo";
    itemDiv.appendChild(deleteBtn);
    
    
    
}

function markToDo() {
    let itemDiv = getInput("itemDivId");
    itemDiv.classList.add("todo");

    let incompletedItems = document.getElementById("incompleted-items");
    incompletedItems.appendChild(itemDiv);
}