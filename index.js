let tasks = []
let taskId = 1
const taskNameInput= document.getElementById('taskName')
const addBtn= document.getElementById('addBtn')
const container =document.getElementById('container')

addBtn.addEventListener('click',()=>{
    const newTask = {
        id: taskId++,
        name: taskNameInput.value
    }
taskNameInput.value=''
tasks.push(newTask)
render()
})

const render = () => {
    container.innerHTML=''
    tasks.map((task)=>{
        const taskDiv=document.createElement('div')
        taskDiv.classList.add("task-div")
        taskDiv.innerText = task.name

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerText= "Удалить"
        deleteBtn.onclick=()=>{
            tasks= tasks.filter((item)=> item.id !== task.id)
            render()
        }

        taskDiv.appendChild(deleteBtn)

        container.appendChild(taskDiv)
    })
}