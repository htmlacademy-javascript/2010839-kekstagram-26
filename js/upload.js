import {isEscapeKey} from './util.js';

const uploadMiniaturesElement = document.querySelector('#upload-file');
const cancelEditMiniaturesElement = document.querySelector('#upload-cancel');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const form = document.getElementById('upload-select-image');

// открытие миниатюры

uploadMiniaturesElement.addEventListener('change', () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
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
});

const tags = (value) => value
  .split(' ')                   // разбивка строки в массив
  .trim()                       // удаляем пробелы
  .filter((tag) => tag !== ''); // не пустая строка // .filter - новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции

const hashtegRegex = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;

// кастомный валидатор

pristine.addValidator(hashtagsElement,
  () => {
    for(let i =0; i <= tags.length-1; i++) {
      if (tags.length > 5 || hashtegRegex.test(tags)){
        return false;
      }
    }
  },
  'проблема', 2, false
);

const validForm = pristine.validate();

form.addEventListener('submit', (evt) => {
  if(validForm) {
    evt.preventDefault();
  }
});
