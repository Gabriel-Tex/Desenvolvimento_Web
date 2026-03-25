// ============ querySelector ============ 
inputTask = document.querySelector("#input-task");
btnAdd = document.querySelector(".btn-add");
tasks = document.querySelector(".tasks");

// ============ Events ============ 

inputTask.addEventListener("keypress", function(e){
    if(e.keyCode === 13){
        if(!inputTask.value) return;
        createTask(inputTask.value);
    }
});

document.addEventListener("click", function(e){
    const element = e.target;

    if(element.classList.contains("btn-delete")){
        element.parentElement.remove();
        saveTasks();
    }
});

btnAdd.addEventListener("click", function(){
    if(!inputTask.value) return;
    createTask(inputTask.value);
});

// ============ Functions ============ 

function createLine(){
    const li = document.createElement("li");
    return li;
}

function cleanInput(){
    inputTask.value = "";
    inputTask.focus();
}

function createBtnDel(li){
    li.innerText += " ";
    const btnDel = document.createElement("button");
    btnDel.innerText = "Apagar";
    btnDel.setAttribute("class", "btn-delete");
    btnDel.setAttribute("title", "Clean this task");
    li.appendChild(btnDel);
}

function createTask(inputText){
    const li = createLine();
    li.innerText = inputText;
    tasks.appendChild(li);
    cleanInput();
    createBtnDel(li);
    saveTasks();
}

function saveTasks(){
    const liTasks = tasks.querySelectorAll("li");
    const taskList = [];

    for (let task of liTasks){
        let textTask = task.innerText;
        textTask = textTask.replace("Apagar", "").trim();
        taskList.push(textTask);
    }
    
    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem("tasks", tasksJSON);
}

function addSavedTasks(){
    const tasks = localStorage.getItem("tasks");
    const taskList = JSON.parse(tasks);

    for(let task of taskList){
        createTask(task);
    } 
}

addSavedTasks();