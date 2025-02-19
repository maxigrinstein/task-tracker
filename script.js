// Initialize the tasks array
let tasks = [];

// Get elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add event listener to the "Add" button and input field
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Add a new task
function addTask() {
  const taskDescription = taskInput.value.trim();

  if (taskDescription !== '') {
    const newTask = {
      description: taskDescription,
      completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  }
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Toggle the completion status of a task
function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Render tasks in the DOM
function renderTasks() {
    taskList.innerHTML = ''; // Limpiar la lista antes de volver a renderizar
  
    const sortedTasks = tasks.slice().sort((a, b) => a.completed - b.completed);
  
    sortedTasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'p-3', 'rounded', 'mb-3'); // Aquí se agrega el margen inferior
  
      if (task.completed) {
        taskItem.classList.add('bg-light', 'text-decoration-line-through');
      }
  
      // Contenedor de la tarea (para flexibilidad)
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('d-flex', 'align-items-center', 'gap-2', 'flex-grow-1');
  
      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.classList.add('form-check-input', 'mt-1');
  
      // Evitar que el click en el checkbox afecte otros elementos
      checkbox.addEventListener('click', (event) => {
        event.stopPropagation(); 
        toggleTaskStatus(tasks.indexOf(task));
      });
  
      // Descripción de la tarea (ahora con padding y ajuste de texto)
      const taskDescription = document.createElement('span');
      taskDescription.textContent = task.description;
      taskDescription.classList.add('text-wrap', 'p-2', 'flex-grow-1', 'overflow-hidden'); // Asegura que el texto no desborde
  
      // Botón de eliminar con texto
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="bi bi-trash3 me-1"></i> Eliminar';
      deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'd-flex', 'align-items-center');
  
      deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); 
        deleteTask(tasks.indexOf(task));
      });
  
      // Construir estructura
      taskContainer.appendChild(checkbox);
      taskContainer.appendChild(taskDescription);
  
      taskItem.appendChild(taskContainer);
      taskItem.appendChild(deleteBtn);
  
      taskList.appendChild(taskItem);
    });
  
    taskList.classList.add('list-group', 'mt-3');
  
    // Ajustar el tamaño del input según la cantidad de tareas
    adjustInputSize();
}
  