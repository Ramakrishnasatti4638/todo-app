let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        return;
    }
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));
        
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        
        const upBtn = document.createElement('button');
        upBtn.className = 'move-btn';
        upBtn.textContent = '↑';
        upBtn.title = 'Move up';
        upBtn.disabled = index === 0;
        upBtn.addEventListener('click', () => swapTodos(index, index - 1));

        const downBtn = document.createElement('button');
        downBtn.className = 'move-btn';
        downBtn.textContent = '↓';
        downBtn.title = 'Move down';
        downBtn.disabled = index === todos.length - 1;
        downBtn.addEventListener('click', () => swapTodos(index, index + 1));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(index));

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(upBtn);
        li.appendChild(downBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function swapTodos(i, j) {
    if (i < 0 || j < 0 || i >= todos.length || j >= todos.length || i === j) {
        return;
    }
    [todos[i], todos[j]] = [todos[j], todos[i]];
    saveTodos();
    renderTodos();
}

function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    todos.push({
        text: text,
        completed: false
    });
    
    todoInput.value = '';
    saveTodos();
    renderTodos();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

renderTodos();
