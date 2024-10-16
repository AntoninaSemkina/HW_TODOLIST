let tasks = []
let taskId = 1
let filter='all'

const taskNameInput= document.getElementById('taskName')
const addBtn= document.getElementById('addBtn')
const container =document.getElementById('container')

const modal= document.getElementById('modal')
const modalId= document.getElementById('modalId')
const modalName= document.getElementById('modalName')
const saveBtn= document.getElementById('saveBtn')

const autoResizeTextarea = (textarea) => {
    textarea.style.height = 'auto'; // Сброс высоту
    textarea.style.height = textarea.scrollHeight + 'px'; //высотa в зависимости от высоты содержимого
};

modalName.addEventListener('input', () => {
    autoResizeTextarea(modalName);
});

const openModal = (task) => {
    modal.classList.remove('hidden');
    modalId.value = task.id;
    modalName.value = task.name;
    autoResizeTextarea(modalName);
};

addBtn.addEventListener('click',()=>{
    const newTask = {
        id: taskId++,
        name: taskNameInput.value,
        completed: false
    }
    taskNameInput.value=''
    tasks.push(newTask)
    render()
})
saveBtn.addEventListener('click',()=>{
    const newId = modalId.value
    const newName= modalName.value
    tasks.map((task)=>{
        if (task.id === Number(newId)){
            task.name= newName
            task.completed= false
        }
    })
    render()
    modal.classList.add('hidden')
})

document.getElementById('showAllBtn').addEventListener('click', () => {
    filter = 'all';
    render();
});

document.getElementById('showCompletedBtn').addEventListener('click', () => {
    filter = 'completed';
    render();
});

document.getElementById('showUncompletedBtn').addEventListener('click', () => {
    filter = 'uncompleted';
    render();
});

const render = () => {
    tasks.sort((a, b) => a.completed - b.completed);

    container.innerHTML=''

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'uncompleted') {
        filteredTasks = 
        tasks.filter(task => !task.completed);
    }
    filteredTasks.sort((a, b) => a.completed - b.completed);

   filteredTasks.forEach((task)=>{
        const taskDiv=document.createElement('div')
        taskDiv.classList.add("task-div")
        taskDiv.style.backgroundColor = task.completed ? 'green' : 'rgb(205, 235, 221)';//изменение цвета фона в зависимости от статуса задачи

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');
        taskContent.innerText = task.name;

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerText= "Удалить"
        deleteBtn.onclick=()=>{
            tasks= tasks.filter((item)=> item.id !== task.id)
            render()
        }

        const editBtn = document.createElement('button')
        editBtn.classList.add('edit-btn')
        editBtn.innerText= "Редактировать"
        editBtn.onclick=()=>{
            openModal(task);
        }
        taskDiv.ondblclick = () => {
            openModal(task);
        };

        const statusBtn = document.createElement('button')
        statusBtn.classList.add('status-btn')
        statusBtn.innerText = task.completed ? 'Задача выполнена' : 'Выполнить задачу';
        statusBtn.onclick = () => {
            task.completed = !task.completed;
            render();
        };
        
        taskActions.appendChild(statusBtn)
        taskActions.appendChild(deleteBtn)
        taskActions.appendChild(editBtn)

        taskDiv.appendChild(taskContent)
        taskDiv.appendChild(taskActions)

        container.appendChild(taskDiv)
    })
}