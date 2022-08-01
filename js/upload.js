import { isEscapeKey } from './utils.js';
import { openMessagePopup } from './message-popup.js';
import { setListenersButtons, removeListenersButtons } from './range-buttons.js';
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
const submitButtonElement = document.querySelector('#upload-submit');
const imgOverlayElement = document.querySelector('.img-upload__overlay');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const scaleValueElement = document.querySelector('.scale__control--value');


// открытие && загрузка миниатюры

uploadMiniaturesElement.addEventListener('change', () => {
  imgOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  const valueElement = scaleValueElement;
  valueElement.value = '100%';    //  переписываю базовое значение
  setListenersButtons();    //  подрубаю кнопки + -
  hideSlider();      //  скрываю слайдер на базовой картинке
  document.addEventListener('keydown', onFormKeydown);
});

// закрытие миниатюры и очищение полей

const closeEditMiniatures = () => {
  imgOverlayElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onFormKeydown);
  removeListenersButtons();
};

const resetForm = () => {
  uploadFormElement.reset();
  resetEffects();
};

cancelEditMiniaturesElement.addEventListener('click', () => {
  closeEditMiniatures();
  resetForm();
});

function onFormKeydown(evt) {
  const errorElement = document.querySelector('.error');
  if (isEscapeKey(evt) && !errorElement) {
    evt.preventDefault();
    closeEditMiniatures();
    uploadMiniaturesElement.value = '';
    resetForm();
  }
}


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
  if (value.length === 0 && hashtegs.length === 1) {
    return true;
  }
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
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Сохранить';
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
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, closeEditMiniatures};
