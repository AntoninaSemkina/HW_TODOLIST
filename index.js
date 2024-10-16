let tasks = []
let taskId = 1
const taskNameInput= document.getElementById('taskName')
const addBtn= document.getElementById('addBtn')
const container =document.getElementById('container')

const modal= document.getElementById('modal')
const modalId= document.getElementById('modalId')
const modalName= document.getElementById('modalName')
const saveBtn= document.getElementById('saveBtn')

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
const render = () => {
    tasks.sort((a, b) => a.completed - b.completed);

    container.innerHTML=''
    tasks.map((task)=>{
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
            modal.classList.remove('hidden')
            modalId.value=task.id
            modalName.value=task.name
        }
        
        taskDiv.ondblclick = () => {
            modal.classList.remove('hidden');
            modalId.value = task.id;
            modalName.value = task.name;
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