const smallerButtonElement = document.querySelector('.scale__control--smaller');
const valueElement = document.querySelector('.scale__control--value');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const valueEffectPicturieElement = document.querySelector('.img-upload__preview');

const minValue = 25;
const maxValue = 100;

valueElement.value = `${maxValue}%`;


const rangeButtons = () => {
  biggerButtonElement.addEventListener('click', ()=> {
    let pars = parseInt(valueElement.value, 10) + minValue;    // parseInt преобразование строки в число, потому что инпут type text   https://javascript.ru/parseInt
    if (pars > maxValue) {
      pars = maxValue;
    }
    valueEffectPicturieElement.style.transform = `scale(${pars/100})`;
    valueElement.value = `${pars}%`;
  });


  smallerButtonElement.addEventListener('click', ()=> {
    let pars = parseInt(valueElement.value, 10) - minValue;
    if (pars < minValue) {
      pars = minValue;
    }
    valueEffectPicturieElement.style.transform = `scale(${pars/100})`;
    valueElement.value = `${pars}%`;
  });
};

export {rangeButtons};
