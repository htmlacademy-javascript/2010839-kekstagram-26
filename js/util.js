// Рандомный элемент в заданном диапазоне
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Рандомный элемент из массива
function getRandomArrayElement(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

// кнопка Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, getRandomPositiveInteger, isEscapeKey};
