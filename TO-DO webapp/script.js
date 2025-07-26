const addBtn = document.getElementById('add-task');
const input = document.getElementById('task-input');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleString();
}

function createTaskItem(taskText, timestamp, isCompleted = false) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const span = document.createElement('span');
  span.textContent = `${taskText} (${timestamp})`;

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", taskText);
    if (newText) {
      span.textContent = `${newText} (${timestamp})`;
    }
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑️';
  delBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  if (!isCompleted) {
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✅';
    completeBtn.onclick = () => {
      li.remove();
      completedList.appendChild(createTaskItem(taskText, getCurrentTime(), true));
    };
    li.appendChild(completeBtn);
  }

  return li;
}
addBtn.addEventListener('click', () => {
  const task = input.value.trim();
  const time = document.getElementById('task-time').value;

  if (task && time) {
    const formattedTime = formatToAMPM(time);
    const taskText = `${task} - at ${formattedTime}`;
    const taskItem = createTaskItem(taskText, getCurrentTime());
    pendingList.appendChild(taskItem);
    input.value = '';
    document.getElementById('task-time').value = '';
  }
});

function formatToAMPM(timeString) {
  const [hourStr, minuteStr] = timeString.split(":");
  let hour = parseInt(hourStr);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

