import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;

// Шаблон сообщения о неудачной загрузки изображения

const errorUploadTemplate = document.body.querySelector('#error').content.querySelector('.error');

// Шаблон сообщения об успешной загрузки

const successUploadTemplate = document.body.querySelector('#success').content.querySelector('.success');

// Функция, показывающая попап об отправке формы успешно или нет

const openMessagePopup = (popupType) => {
  let popupTemplate;
  let popupInnerSection;
  let popupButtonElementClass;

  switch (popupType) {
    case 'success':
      popupTemplate = successUploadTemplate;
      popupInnerSection = '.success__inner';
      popupButtonElementClass = '.success__button';
      break;
    case 'error':
      popupTemplate = errorUploadTemplate;
      popupInnerSection = '.error__inner';
      popupButtonElementClass = '.error__button';
      break;
  }

  const innerPopup = popupTemplate.cloneNode(true);
  const innerPopupSection = innerPopup.querySelector(popupInnerSection);
  const popupButton = innerPopup.querySelector(popupButtonElementClass);

  const onMessagePopupEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessagePopup();
    }
  };

  // Функция, проверяющая клик вне области

  const onOutsideClick = (evt) => {
    const isOutsideClick = !evt.composedPath().includes(innerPopupSection);
    if (isOutsideClick) {
      closeMessagePopup();
    }
  };

  // Функция закрытия сообщения об успешной/ошибочной загрузки

  function closeMessagePopup() {
    popupButton.removeEventListener('click', closeMessagePopup);
    document.removeEventListener('keydown', onMessagePopupEsc);
    document.removeEventListener('click', onOutsideClick);
    innerPopup.remove();
  }

  document.addEventListener('keydown', onMessagePopupEsc);
  document.addEventListener('click', onOutsideClick);
  popupButton.addEventListener('click', closeMessagePopup);
  document.body.appendChild(innerPopup);
};

// всплывающее окно об ошибке
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { openMessagePopup, showAlert };
