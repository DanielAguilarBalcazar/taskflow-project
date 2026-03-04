 console.log('Script cargado correctamente');

 const addTaskButton = document.getElementById('addTaskButton');
 const taskInput = document.getElementById('taskInput');
 const taskList = document.getElementById('taskList');
 const categorySelect = document.getElementById('categorySelect');
 const prioritySelect = document.getElementById('prioritySelect');



 window.onload = () => {
     const tasks = getTasks();
     if (tasks && tasks.length > 0) {
         tasks.forEach(task => {
             addTaskToList(task.text, task.category, task.priority);
         });
     }
 };

 addTaskButton.addEventListener('click', () => {
     const taskText = taskInput.value.trim();
     const category = categorySelect.value;
     const priority = prioritySelect.value;

     if (taskText) {
         addTaskToList(taskText, category, priority);
         taskInput.value = '';
     }
 });

 function addTaskToList(taskText, category, priority) {
     const li = document.createElement('li');

     const checkbox = document.createElement ('input');
     checkbox.type = 'checkbox';
     checkbox.className = 'task-checkbox';

     const taskSpan = document.createElement('span');
     taskSpan.textContent = taskText;


     const categoryBadge = document.createElement('span');
     categoryBadge.textContent = category;
     categoryBadge.className = 'badge ' + category;


     const priorityBadge = document.createElement('span');
     priorityBadge.textContent = priority;
     priorityBadge.className = 'badge priority-' + priority;


     const removeButton = document.createElement('button');
     removeButton.textContent = 'Remove';
     removeButton.className = 'remove-button';
     removeButton.onclick = () => {
         li.remove();
         saveTasks();
     };

     li.appendChild(taskSpan);
     li.appendChild(categoryBadge);
     li.appendChild(priorityBadge);
     li.appendChild(removeButton);
     taskList.appendChild(li);
     saveTasks();
 }

 taskInput.addEventListener('keypress', (e) => {
     if (e.key == 'Enter') {
         addTaskButton.click();
     }
 });

 function saveTasks() {
     const tasks = [];
     document.querySelectorAll('#taskList li').forEach(li => {
         const taskText = li.querySelector('span:first-child').textContent;
         const category = li.querySelectorAll('.badge')[0].textContent;
         const priority = li.querySelectorAll('.badge')[1].textContent;

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