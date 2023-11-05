const taskList = document.getElementById('taskList');
const addNewTask = document.getElementById('addNewTask');
const deleteAllTasks = document.getElementById('deleteAllTasks');

//add task function
function addTask(taskContent,isChecked=false)
{
    const newTask = document.createElement('li');
    
    newTask.innerHTML = `
    <div>
    <input type="checkbox" ${isChecked ? 'checked' : ''}>
    <label>${taskContent}</label>
    </div>
    <div>
    <i class="fa-regular fa-pen-to-square update_task"></i>
    <i class="fa-solid fa-trash delete_task"></i>
    </div>
    `;
    taskList.appendChild(newTask);
    saveTasksInLS();
}

//load all tasks from local storage when the page uploaded
document.addEventListener('DOMContentLoaded', function () {
    const savedTasks = JSON.parse(localStorage.getItem('To-DoTasks')) || [];
    if(savedTasks.length > 0)
    {
        savedTasks.forEach(task => {
            addTask(task.taskData,task.taskChecked);
        });
    }else{
        addTask('Default Task');
    }

    const taskCheckboxes = taskList.querySelectorAll('input[type="checkbox"]');
    taskCheckboxes.forEach((checkbox,index)=>{
        if(savedTasks[index] && savedTasks[index].taskChecked)
        {
            let taskLabel = checkbox.nextElementSibling;
            taskLabel.style.textDecoration = 'line-through';
        }
    });

});

//save tasks in local storage (LS)
function saveTasksInLS()
{
    const tasks = Array.from(taskList.querySelectorAll('li')).map(task =>{
        let taskData =  task.querySelector('label').innerHTML;
        let taskChecked = task.querySelector('input[type="checkbox"]').checked;
        return{
            taskData:taskData,
            taskChecked:taskChecked
        }
    });

    localStorage.setItem('To-DoTasks', JSON.stringify(tasks));
}

//check exsisting of duplicate task
function checkDuplicateTask(taskContent)
{
    const savedTasks = JSON.parse(localStorage.getItem('To-DoTasks')) || [];
    return savedTasks.some(task => task.taskData === taskContent);
}

//Check tasks
taskList.addEventListener('change',(e)=>
{
    const taskLabel = e.target.nextElementSibling;
    if (e.target.checked) {
        taskLabel.style.textDecoration = 'line-through';
    } else {
        taskLabel.style.textDecoration = 'none';
    }
    saveTasksInLS();
})

//save updated task
function updateTask(event,isChecked)
{
    
    const listItem = event.target.closest('li');
    let listInputvalue = listItem.querySelector('input').value;
    listItem.innerHTML = `
    <div>
    <input type="checkbox" ${isChecked ? 'checked' : ''}>
    <label>${listInputvalue}</label>
    </div>
    <div>
    <i class="fa-regular fa-pen-to-square update_task"></i>
    <i class="fa-solid fa-trash delete_task"></i>
    </div>
    `;
    saveTasksInLS();
}

//add new task
addNewTask.addEventListener('click',(e)=>{
    const addTaskInput = document.getElementById('addTask_input');
    const addTaskError = document.getElementById('addTask_error');
    let taskContent = addTaskInput.value.trim();
    if(!taskContent)
    {
        addTaskInput.classList.add('invalid');
        addTaskError.innerHTML ="Can't add empty task! Please fill the input field.";
        addTaskError.style.display = "block";
    }else if(checkDuplicateTask(taskContent))
    {
        addTaskError.innerHTML ="This task is already exsist!";
        addTaskError.style.display = "block";
    }
    else{
        addTaskInput.classList.remove('invalid');
        addTaskError.style.display = "none";
        addTask(taskContent,false);
        addTaskInput.value = "";
    }
})

//delete all tasks
deleteAllTasks.addEventListener('click',(e)=>
{
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    saveTasksInLS();
})

//delete or update specific task
taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete_task')) {
        const listItem = event.target.closest('li');
        if (listItem) {
            taskList.removeChild(listItem);
            saveTasksInLS();
        }
    }else if (event.target.classList.contains('update_task'))
    {
        const listItem = event.target.closest('li');
        const isChecked = listItem.querySelector('input[type="checkbox"]').checked;
        let listInput = `
        <input type="text" id="updateTaskContent" value="${listItem.querySelector('label').innerHTML}">
        `;
        listItem.innerHTML = `
        <div>
        ${listInput}
        <button onClick="updateTask(event,${isChecked})" class="saveTaskButton"> Save </button>
        </div>
        `;
    }
});

