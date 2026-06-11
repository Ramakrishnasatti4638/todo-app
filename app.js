document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('todo-form');
    var input = document.getElementById('todo-input');
    var list = document.getElementById('todo-list');
    var footer = document.getElementById('footer');
    var taskCount = document.getElementById('task-count');
    var clearBtn = document.getElementById('clear-completed');

    var todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function render() {
        list.innerHTML = '';

        todos.forEach(function (todo, index) {
            var li = document.createElement('li');
            if (todo.completed) {
                li.classList.add('completed');
            }

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', function () {
                toggleTodo(index);
            });

            var span = document.createElement('span');
            span.classList.add('task-text');
            span.textContent = todo.text;

            var deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = '\u00d7';
            deleteBtn.addEventListener('click', function () {
                deleteTodo(index);
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });

        updateFooter();
    }

    function updateFooter() {
        if (todos.length === 0) {
            footer.classList.add('hidden');
            return;
        }

        footer.classList.remove('hidden');
        var remaining = todos.filter(function (t) { return !t.completed; }).length;
        taskCount.textContent = remaining + ' task' + (remaining !== 1 ? 's' : '') + ' remaining';
    }

    function addTodo(text) {
        todos.push({ text: text, completed: false });
        saveTodos();
        render();
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        render();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        render();
    }

    function clearCompleted() {
        todos = todos.filter(function (t) { return !t.completed; });
        saveTodos();
        render();
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var text = input.value.trim();
        if (text) {
            addTodo(text);
            input.value = '';
        }
    });

    clearBtn.addEventListener('click', clearCompleted);

    render();
});
