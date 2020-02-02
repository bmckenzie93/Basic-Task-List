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
  // Add task event on submit
  form.addEventListener('submit', addTask);
  // Remove task from list
  taskList.addEventListener('click', removeTask);
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterList);
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
}

// Clear all tasks
function clearTasks(e) {
  document.querySelectorAll('.collection-item').forEach(function(listItem) {
    listItem.remove();
  });
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