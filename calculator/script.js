const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const themeToggle = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');


document.body.classList.add('light');
themeIcon.textContent = '🌙';  

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  
  if (document.body.classList.contains('dark')) {
    themeIcon.textContent = '☀️';  
  } else {
    themeIcon.textContent = '🌙';  
  }
});


let currentInput = '';
let operator = '';
let firstValue = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      currentInput = '';
      firstValue = '';
      operator = '';
      display.value = '';
    } else if (value === '=') {
      if (firstValue !== '' && operator !== '' && currentInput !== '') {
        let result = eval(`${firstValue}${operator}${currentInput}`);
        display.value = result;
        currentInput = result;
        firstValue = '';
        operator = '';
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput !== '') {
        firstValue = currentInput;
        operator = value;
        currentInput = '';
      }
    } else {
      currentInput += value;
      display.value = currentInput;
    }
    


  });
});
