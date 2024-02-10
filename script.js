document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-btn');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filterButtons = {
        all: document.getElementById('filter-all'),
        completed: document.getElementById('filter-completed'),
        incomplete: document.getElementById('filter-incomplete')
    };

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const addTodo = (text) => {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
    };

    const deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    const toggleComplete = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    const renderTodos = (filter = 'all') => {
        todoList.innerHTML = '';
        todos
            .filter(todo => filter === 'all' || (filter === 'completed' && todo.completed) || (filter === 'incomplete' && !todo.completed))
            .forEach((todo, index) => {
                const todoItem = document.createElement('li');
                todoItem.textContent = todo.text;
                if (todo.completed) {
                    todoItem.classList.add('completed');
                }
                todoItem.addEventListener('click', () => toggleComplete(index));
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    deleteTodo(index);
                });
                todoItem.appendChild(deleteButton);
                todoList.appendChild(todoItem);
            });
    };

    addButton.addEventListener('click', function() {
        const todoText = inputField.value.trim();
        if (todoText) {
            addTodo(todoText);
            inputField.value = '';
        }
    });

    Object.keys(filterButtons).forEach(key => {
        filterButtons[key].addEventListener('click', () => renderTodos(key));
    });

    renderTodos(); // initial render
});
