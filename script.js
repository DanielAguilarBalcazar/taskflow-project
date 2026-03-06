
const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const categorySelect = document.getElementById('categorySelect');
const prioritySelect = document.getElementById('prioritySelect');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const emptyState = document.getElementById('emptyState');


window.onload = () => {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }


    const tasks = getTasks();
    if (tasks && tasks.length > 0) {
        tasks.forEach(task => {
            addTaskToList(task.text, task.category, task.priority);
        });
    }

    updateEmptyState();
};


themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');


    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

/
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;

    if (taskText) {
        addTaskToList(taskText, category, priority);
        taskInput.value = '';
        taskInput.focus();
    }
});


taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskButton.click();
    }
});


function addTaskToList(taskText, category, priority) {
    const li = document.createElement('li');
    li.className = 'grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-l-4 border-transparent hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600/50 hover:translate-x-1 hover:shadow-md animate-slideIn';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'w-5 h-5 cursor-pointer accent-primary-500 transition-transform hover:scale-110 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-700';

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskSpan.classList.add('line-through', 'opacity-50');
        } else {
            taskSpan.classList.remove('line-through', 'opacity-50');
        }
    });

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'text-base text-gray-800 dark:text-gray-200 break-words transition-all duration-300';

    const categoryBadge = document.createElement('span');
    categoryBadge.textContent = category;

    const categoryClasses = {
        'Personal': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800/50',
        'Trabajo': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800/50',
        'Estudio': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800/50'
    };
    categoryBadge.className = `px-3 py-1.5 rounded-full text-xs font-semibold uppercase whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-sm ${categoryClasses[category]}`;

    const priorityBadge = document.createElement('span');
    priorityBadge.textContent = priority;

    const priorityClasses = {
        'Esencial': 'bg-red-50 text-red-700 border-2 border-red-700 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500 hover:bg-red-100 dark:hover:bg-red-900/50',
        'Intermedio': 'bg-yellow-50 text-yellow-700 border-2 border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/50',
        'Opcional': 'bg-green-50 text-green-700 border-2 border-green-700 dark:bg-green-900/30 dark:text-green-300 dark:border-green-500 hover:bg-green-100 dark:hover:bg-green-900/50'
    };
    priorityBadge.className = `px-3 py-1.5 rounded-full text-xs font-semibold uppercase whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-sm ${priorityClasses[priority]}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.className = 'px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 whitespace-nowrap shadow-md hover:shadow-lg';
    removeButton.onclick = () => {
        li.classList.add('animate-fadeOut');
        setTimeout(() => {
            li.remove();
            saveTasks();
            updateEmptyState();
        }, 300);
    };

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(categoryBadge);
    li.appendChild(priorityBadge);
    li.appendChild(removeButton);

    taskList.appendChild(li);
    saveTasks();
    updateEmptyState();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const taskText = li.querySelector('span').textContent;
        const badges = li.querySelectorAll('span[class*="rounded-full"]');
        const category = badges[0].textContent;
        const priority = badges[1].textContent;

        tasks.push({
            text: taskText,
            category: category,
            priority: priority
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function updateEmptyState() {
    if (taskList.children.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll('#taskList li');
    let visibleCount = 0;

    tasks.forEach(task => {
        const taskText = task.querySelector('span').textContent.toLowerCase();
        if (taskText.includes(searchTerm)) {
            task.style.display = 'grid';
            visibleCount++;
        } else {
            task.style.display = 'none';
        }
    });


    if (visibleCount === 0 && tasks.length > 0) {
        emptyState.classList.remove('hidden');
        emptyState.querySelector('p').textContent = '🔍 No se encontraron tareas';
    } else if (tasks.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.querySelector('p').textContent = '📝 No hay tareas aún';
    } else {
        emptyState.classList.add('hidden');
    }
});

console.log('TaskFlow inicializado correctamente');