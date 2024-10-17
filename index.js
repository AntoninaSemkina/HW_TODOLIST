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

const userNameDisplay = document.getElementById('userNameDisplay');
const nameInput = document.getElementById('nameInput');
const saveNameBtn = document.getElementById('saveNameBtn');
const nameDisplay = document.getElementById('nameDisplay');


window.onload = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks); //загрузить сохраненные задачи
        taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; // устанавить корректный ID
        render(); // отобразить задачи
    }
    
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        userNameDisplay.innerText = `, ${savedName}!`;
        loadTasks(savedName);
    } else {
        userNameDisplay.innerText = ', гость!';
        loadTasks('guest');
    }
};

const loadTasks = (userName) => {
    const savedTasks = localStorage.getItem(`tasks_${userName}`);
    if (savedTasks) {
        tasks = JSON.parse(savedTasks); // Загружаем задачи из localStorage
        taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; // Устанавливаем корректный ID
    } else {
        tasks = []; // Если задач нет, создаем пустой список
        taskId = 1;
    }
    render()
};

const openModal = (task) => {
    modal.classList.remove('hidden');
    modalId.value = task.id;
    modalName.value = task.name;
    autoResizeTextarea(modalName);
};

const autoResizeTextarea = (textarea) => {
    textarea.style.height = 'auto'; // сброс высоты
    textarea.style.height = textarea.scrollHeight + 'px'; //высотa в зависимости от высоты содержимого
};

modalName.addEventListener('input', () => {
    autoResizeTextarea(modalName);
});

addBtn.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    if (taskName) {
        const newTask = {
            id: taskId++,
            name: taskName,
            completed: false
        };
        taskNameInput.value = '';
        tasks.push(newTask);
        saveTasksToLocalStorage(); // Сохранение в localStorage
        render();
    } else {
        alert('Введите текст задачи');
    }
});

saveBtn.addEventListener('click', () => {
    const newId = modalId.value;
    const newName = modalName.value.trim()
    tasks = tasks.map(task => {
        if (task.id === Number(newId)) {
            task.name = newName;
        }
        return task;
    });
    saveTasksToLocalStorage();
    render();
    modal.classList.add('hidden');
});

const saveTasksToLocalStorage = () => {
    const currentUser = localStorage.getItem('userName') || 'guest'; 
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks)); 
};

const toggleTaskStatus = (task) => {
    task.completed = !task.completed;
    saveTasksToLocalStorage();
};

const render = () => {
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
            tasks= tasks.filter((item)=> item.id !== task.id);
            saveTasksToLocalStorage();
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
 
        // const statusBtn = document.createElement('button')
        // statusBtn.classList.add('status-btn')
        // statusBtn.innerText = task.completed ? 'Задача выполнена' : 'Выполнить задачу';
        // statusBtn.onclick = () => {
        //     task.completed = !task.completed;
        //     saveTasksToLocalStorage();
        //     render();
        // };
        const statusBtn = document.createElement('button');
statusBtn.classList.add('status-btn');
statusBtn.innerText = task.completed ? 'Задача выполнена' : 'Выполнить задачу';
statusBtn.onclick = () => {
    toggleTaskStatus(task);  // Изменение статуса задачи
    
};
        
        taskActions.appendChild(statusBtn)
        taskActions.appendChild(deleteBtn)
        taskActions.appendChild(editBtn)

        taskDiv.appendChild(taskContent)
        taskDiv.appendChild(taskActions)

        container.appendChild(taskDiv)
    })
}

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
