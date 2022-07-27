import {isEscapeKey} from './util.js';

const userFullSizePicture = document.querySelector('.big-picture');
const bigPictureCancel = userFullSizePicture.querySelector('.big-picture__cancel');
const bigPictureimg = userFullSizePicture.querySelector('.big-picture__img img');
const socialCommentElement = document.querySelector('.social__comments');                         //  блок с коментами
const commentsLoader = userFullSizePicture.querySelector('.comments-loader');                  //  кнопка занрузки сообщений
const commentsShowCount = userFullSizePicture.querySelector('.social__comment-count');       //  счетчик
const MAX_COMMENTS_TO_SHOW = 5;

// закрытие фото

const closeFullSizeMiniatures = () => {
  userFullSizePicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

bigPictureCancel.addEventListener('click', () => {
  closeFullSizeMiniatures ();
});

document.addEventListener('keydown', (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizeMiniatures ();
    evt.stopPropagation();
  }
});

// собираю шаблон

const createCommentTempate = (comment) => (
  `<li class="social__comment">
    <img class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
</li>`
);


let commentsModule;
let count;

const renderComments = () => {
  socialCommentElement.innerHTML = '';

  const commentsRender = commentsModule.slice(0, count);
  commentsRender.forEach((comment) => {
    socialCommentElement.insertAdjacentHTML('beforeend', createCommentTempate(comment));
  });

  // скрываю кнопку

  const isHideButton = commentsRender.length >= commentsModule.length;
  commentsLoader.classList.toggle('hidden', isHideButton);

  // перезаписываю счетчик
  commentsShowCount.innerHTML = `${commentsRender.length} из <span class="comments-count">${commentsModule.length}</span> комментариев`;
};

// функция для счетчика, который делает +5 коментов, второй параметр - вызов функции генерации комментов

const commentsLoaderOnClick = () => {
  count += MAX_COMMENTS_TO_SHOW;
  renderComments();
};

const renderFullSizeMiniatures = (({url, likes, comments, description}) => {
  bigPictureimg.src = url;
  userFullSizePicture.querySelector('.likes-count').textContent = likes;
  userFullSizePicture.querySelector('.comments-count').textContent = comments.length;
  userFullSizePicture.querySelector('.social__caption').textContent = description;
  userFullSizePicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  commentsModule = comments;
  count = comments.length < MAX_COMMENTS_TO_SHOW ? comments.length : MAX_COMMENTS_TO_SHOW;

  renderComments();
  // добавили слушателя на кнопку загрузки кнопки, делаем +5 каждый раз при нажатии
  commentsLoader.addEventListener('click', commentsLoaderOnClick);
});

export {renderFullSizeMiniatures};
