const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const countSpan = document.getElementById('count');
const clearBtn = document.getElementById('clear-completed');

let todos = [];

function render() {
  list.innerHTML = '';

  todos.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const left = document.createElement('div');
    left.className = 'todo-left';

    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox' + (t.done ? ' checked' : '');
    checkbox.setAttribute('role', 'button');
    checkbox.setAttribute('tabindex', '0');
    checkbox.addEventListener('click', () => toggleDone(idx));
    checkbox.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') toggleDone(idx); });
    checkbox.textContent = t.done ? '✓' : '';

    const span = document.createElement('span');
    span.className = 'task-text' + (t.done ? ' completed' : '');
    span.textContent = t.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    const remove = document.createElement('button');
    remove.className = 'remove-btn';
    remove.textContent = '✕';
    remove.title = 'Remove task';
    remove.addEventListener('click', () => removeTodo(idx));

    li.appendChild(left);
    li.appendChild(remove);
    list.appendChild(li);
  });

  updateCount();
}

function updateCount(){
  const remaining = todos.filter(t=>!t.done).length;
  countSpan.textContent = `${remaining} item${remaining!==1?'s':''} remaining`;
}

function addTodo(text){
  const trimmed = text.trim();
  if(!trimmed) return;
  todos.unshift({text:trimmed, done:false});
  render();
}

function toggleDone(i){
  todos[i].done = !todos[i].done;
  render();
}

function removeTodo(i){
  todos.splice(i,1);
  render();
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  addTodo(input.value);
  input.value = '';
  input.focus();
});

clearBtn.addEventListener('click', ()=>{
  todos = todos.filter(t=>!t.done);
  render();
});

todos = [
  {text: 'Learn DOM manipulation', done: false},
  {text: 'Build a To-Do app', done: true}
];

render();