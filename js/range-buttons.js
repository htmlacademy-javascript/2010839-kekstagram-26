const MIN_VALUE = 25;
const MAX_VALUE = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const valueElement = document.querySelector('.scale__control--value');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const valueEffectPicturieElement = document.querySelector('.img-upload__preview');

valueElement.value = `${MAX_VALUE}%`;


const plusValue = () => {
  let parsNumber = parseInt(valueElement.value, 10) + MIN_VALUE;    // parseInt преобразование строки в число, потому что инпут type text   https://javascript.ru/parseInt
  if (parsNumber > MAX_VALUE) {
    parsNumber = MAX_VALUE;
  }
  valueEffectPicturieElement.style.transform = `scale(${parsNumber/100})`;
  valueElement.value = `${parsNumber}%`;
};

const minusValue = ()=> {
  let parsNumber = parseInt(valueElement.value, 10) - MIN_VALUE;
  if (parsNumber < MIN_VALUE) {
    parsNumber = MIN_VALUE;
  }
  valueEffectPicturieElement.style.transform = `scale(${parsNumber/100})`;
  valueElement.value = `${parsNumber}%`;
};

const rangeButtons = () => {
  biggerButtonElement.addEventListener('click', plusValue);
  biggerButtonElement.removeEventListener('click', minusValue);
  smallerButtonElement.addEventListener('click', minusValue);
  smallerButtonElement.removeEventListener('click', plusValue);
};

export {rangeButtons};
