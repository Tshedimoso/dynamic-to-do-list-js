// JavaScript Code for To-Do List Application with Local Storage

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach((taskText) => addTask(taskText, false)); // Load tasks without saving them again
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map((taskItem) =>
            taskItem.textContent.replace('Remove', '').trim()
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Check if the task text is valid
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item (li) for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add click event to remove the task
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            saveTasks(); // Update Local Storage after removing a task
        };

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Save tasks to Local Storage if specified
        if (save) saveTasks();

        // Clear the task input field
        taskInput.value = '';
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', () => addTask(taskInput.value));

    // Add event listener to the task input for "Enter" keypress
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask(taskInput.value);
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
