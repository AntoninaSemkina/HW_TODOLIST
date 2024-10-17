const nameInput = document.getElementById('nameInput');
const saveNameBtn = document.getElementById('saveNameBtn');
const nameDisplay = document.getElementById('nameDisplay');


saveNameBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('userName', name); 
        window.location.href = 'index.html';

        loadTasks(name); // Загружаем задачи нового пользователя
        taskNameInput.value = ''; // Очищаем поле для новой задачи
    } else {
        alert('Введите имя пользователя');
    }
});
