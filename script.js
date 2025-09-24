// Éléments
const input = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const tasksEl = document.getElementById('tasks');

// 1) Date
setDate();
function setDate() {
  const today = new Date();
  const dayName = today.toLocaleDateString('fr-FR', { weekday: 'long' });
  const dayNumber = today.getDate();
  const monthName = today.toLocaleDateString('fr-FR', { month: 'long' });
  document.getElementById('dayName').textContent = dayName;
  document.getElementById('dayNumber').textContent = dayNumber;
  document.getElementById('monthName').textContent = monthName;
}

// 2) Ajout/Suppression + état "done"
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTaskElement(text);
  input.value = '';
  updateProgress();
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

function addTaskElement(text) {
  const task = document.createElement('div');
  task.className = 'task';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('span');
  label.textContent = text;

  const remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = '✕';

  checkbox.addEventListener('change', () => {
    task.classList.toggle('done', checkbox.checked);
    updateProgress();
  });

  remove.addEventListener('click', () => {
    task.remove();
    updateProgress();
  });

  task.append(checkbox, label, remove);
  tasksEl.appendChild(task);
}

// 3) Barre de progression
function updateProgress() {
  const boxes = document.querySelectorAll('.task input[type="checkbox"]');
  const total = boxes.length;
  const checked = Array.from(boxes).filter(cb => cb.checked).length;
  const percent = total === 0 ? 0 : (checked / total) * 100;
  document.querySelector('.progress-fill').style.width = `${percent}%`;
  document.getElementById('progress-label').textContent = `${checked} / ${total} tasks done`;
}
