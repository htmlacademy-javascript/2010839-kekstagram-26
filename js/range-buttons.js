const smallerButtonElement = document.querySelector('.scale__control--smaller');
const valueElement = document.querySelector('.scale__control--value');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const valueEffectPicturieElement = document.querySelector('.img-upload__preview');

const MIN_VALUE = 25;
const MAX_VALUE = 100;

valueElement.value = `${MAX_VALUE}%`;


const rangeButtons = () => {
  biggerButtonElement.addEventListener('click', ()=> {
    let parsNumber = parseInt(valueElement.value, 10) + MIN_VALUE;    // parseInt преобразование строки в число, потому что инпут type text   https://javascript.ru/parseInt
    if (parsNumber > MAX_VALUE) {
      parsNumber = MAX_VALUE;
    }
    valueEffectPicturieElement.style.transform = `scale(${parsNumber/100})`;
    valueElement.value = `${parsNumber}%`;
  });


  smallerButtonElement.addEventListener('click', ()=> {
    let parsNumber = parseInt(valueElement.value, 10) - MIN_VALUE;
    if (parsNumber < MIN_VALUE) {
      parsNumber = MIN_VALUE;
    }
    valueEffectPicturieElement.style.transform = `scale(${parsNumber/100})`;
    valueElement.value = `${parsNumber}%`;
  });
};

export {rangeButtons};
