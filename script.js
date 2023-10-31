document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskDateTimeInput = document.getElementById('taskDateTime');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    flatpickr(taskDateTimeInput, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date(),
    });

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskDateTime = taskDateTimeInput.value;

        if (taskText && taskDateTime) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('taskItem');
            taskItem.innerHTML = `
                <span class="taskText">${taskText}</span>
                <span class="taskDateTime">${taskDateTime}</span>
                <button class="editButton">Edit</button>
                <button class="deleteButton">Delete</button>
            `;
            taskList.appendChild(taskItem);

            taskInput.value = '';
            taskDateTimeInput._flatpickr.clear();

            const deleteButton = taskItem.querySelector('.deleteButton');
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
            });

            const editButton = taskItem.querySelector('.editButton');
            editButton.addEventListener('click', () => {
                const taskTextElement = taskItem.querySelector('.taskText');
                const taskDateTimeElement = taskItem.querySelector('.taskDateTime');

                const updatedText = prompt('Edit the task:', taskTextElement.textContent);
                const updatedDateTime = prompt('Edit the date and time:', taskDateTimeElement.textContent);

                if (updatedText !== null && updatedDateTime !== null) {
                    taskTextElement.textContent = updatedText;
                    taskDateTimeElement.textContent = updatedDateTime;
                }
            });
        }
    });

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });
});
