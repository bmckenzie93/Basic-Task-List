// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners
loadEventListners();

// Load all event listners
function loadEventListners(){
  // Get tasks from local storage
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event on submit
  form.addEventListener('submit', addTask);
  // Remove task from list
  taskList.addEventListener('click', removeTask);
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterList);
} 

// Display tasks from LS in the DOM
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create li Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item'
    // Create Text Node + Append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  })
}

// Add Task function
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add Task');
  } else {
    // Create li Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item'
    // Create Text Node + Append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeLocal(taskInput.value);

    // Clear input
    taskInput.value = '';
    
    e.preventDefault();
  }
}

// Remove task function
function removeTask(e) {
  if(e.target.classList.contains('fa-remove')) {
    e.target.parentElement.parentElement.remove();
  }

  // Remove from LS
  removeFromLS(e.target.parentElement.parentElement);


}

// Clear all tasks
function clearTasks(e) {
  document.querySelectorAll('.collection-item').forEach(function(listItem) {
    listItem.remove();
  });

  // Clear all tasks from LS
  clearLocalStorage();
}

// Filter list
function filterList(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(listItem) {
    const item = listItem.firstChild.textContent.toLowerCase();
    if(item.indexOf(text) != -1){
      listItem.style.display = 'block';
    } else {
      listItem.style.display = 'none';
    }
  });
}

// Store in local storage function
function storeLocal(task) {
      let tasks;
  if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(taskInput.value); 

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove from local storage function
function removeFromLS(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Local Storage Function
function clearLocalStorage() {
  localStorage.clear();
}