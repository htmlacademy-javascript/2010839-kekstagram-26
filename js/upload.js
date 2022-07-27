import { isEscapeKey } from './utils.js';
import { openMessagePopup } from './message-popup.js';
import { rangeButtons } from './range-buttons.js';
import { hideSlider } from './effect.js';
import { sendData } from './api.js';
import { resetEffects } from './effect.js';

const HASHTEG_MAX_COUNT = 5;
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadMiniaturesElement = document.querySelector('#upload-file');
const cancelEditMiniaturesElement = document.querySelector('#upload-cancel');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const form = document.getElementById('upload-select-image');
const submitButton = document.querySelector('#upload-submit');
// открытие && загрузка миниатюры

uploadMiniaturesElement.addEventListener('change', () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  const valueElement = document.querySelector('.scale__control--value');
  valueElement.value = '100%';    //  переписываю базовое значение
  rangeButtons();    //  подрубаю кнопки + -
  hideSlider();      //  скрываю слайдер на базовой картинке
});

// закрытие миниатюры и очищение полей

const closeEditMiniatures = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const resetForm = () => {
  uploadFormElement.reset();
  resetEffects();
};

cancelEditMiniaturesElement.addEventListener('click', () => {
  closeEditMiniatures ();
  resetForm();
});

document.addEventListener('keydown', (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditMiniatures ();
    uploadMiniaturesElement.value = '';
    resetForm();
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


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const validForm = pristine.validate();
    if (validForm) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          openMessagePopup('success');
          resetForm();
        },
        () => {
          unblockSubmitButton();
          openMessagePopup('error');
          resetForm();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, closeEditMiniatures};
