// Функция взята из интернета и доработана
// Источник - https://schoolsw3.com/js/js_random.php
// Функция  всегда возвращает случайное число от min до max (оба включены)

function getRndInteger(min, max) {
  if (max <= min) {
    'Что-то пошло не так';
  } else {
    Math.floor;
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
