import {isEscapeKey} from './util.js';
import {rangeButtons} from './range-buttons.js';

const uploadMiniaturesElement = document.querySelector('#upload-file');
const cancelEditMiniaturesElement = document.querySelector('#upload-cancel');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const form = document.getElementById('upload-select-image');
const HASHTEG_MAX_COUNT = 5;

// открытие/загрузка миниатюры

uploadMiniaturesElement.addEventListener('change', () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  const valueElement = document.querySelector('.scale__control--value');
  valueElement.value = '100%';    //  переписываю базовое значение
  rangeButtons();    //  подрубаю кнопки + -
});

// закрытие миниатюры и очищение полей

const closeEditMiniatures = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

cancelEditMiniaturesElement.addEventListener('click', () => {
  closeEditMiniatures ();
});

document.addEventListener('keydown', (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditMiniatures ();
    uploadMiniaturesElement.value = '';
  }
});

// сброс Esc при фокусе на input

hashtagsElement.addEventListener('keydown', (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

descriptionElement.addEventListener('keydown', (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});


//  валидация

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, true);

const getTags = (value) => value.trim().split(' ');                 //  получение тегов

const hashtegRegex = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;                //  регулярка

const isHashtegValid = (value) => hashtegRegex.test(value);         //  проверка строки на регулярку


//  проверка всех на Regex

const areHashtegsValid = (value) => {
  const hashtegs = getTags(value);

  return hashtegs.every((hashteg) => isHashtegValid(hashteg));
};

pristine.addValidator(hashtagsElement, areHashtegsValid,
  'проблема в хештегах'
);

//  проверка на кол-во

const isHashtegsCountValid = (value) => {
  const hashtegs = getTags(value);

  return (hashtegs.length <= HASHTEG_MAX_COUNT);
};

pristine.addValidator(hashtagsElement, isHashtegsCountValid,
  'количество не больше 5'
);

//  проверка на уникальность

const isHashtegsUnique = (value) => {
  const hashtegs = getTags(value);
  const lowercaseHashteg = hashtegs.map((hashteg) => hashteg.toLowerCase());
  const set = new Set(lowercaseHashteg);

  return (set.size === lowercaseHashteg.length);
};

pristine.addValidator(hashtagsElement, isHashtegsUnique,
  'каждый хэштег должен быть уникальным'
);


form.addEventListener('submit', (evt) => {
  const validForm = pristine.validate();
  if(validForm) {
    evt.preventDefault();
  }
});
