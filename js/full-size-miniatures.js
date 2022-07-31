import { isEscapeKey } from './utils.js';

const MAX_COMMENTS_TO_SHOW = 5;
const userFullSizePictureElement = document.querySelector('.big-picture');
const likesCountElement = userFullSizePictureElement.querySelector('.likes-count');
const commentsCountElement = userFullSizePictureElement.querySelector('.comments-count');
const socialCaptionElement = userFullSizePictureElement.querySelector('.social__caption');
const bigPictureCancelElement = userFullSizePictureElement.querySelector('.big-picture__cancel');
const bigPictureimgElement = userFullSizePictureElement.querySelector('.big-picture__img img');
const socialCommentElement = document.querySelector('.social__comments');                         //  блок с коментами
const commentsLoaderElement = userFullSizePictureElement.querySelector('.comments-loader');                  //  кнопка занрузки сообщений
const commentsShowCountElement = userFullSizePictureElement.querySelector('.social__comment-count');       //  счетчик
const commentTemplate = document.querySelector('#comment');

// закрытие фото

const closeFullSizeMiniatures = () => {
  userFullSizePictureElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onFullSizeMiniaturesKeydown);
};

bigPictureCancelElement.addEventListener('click', () => {
  closeFullSizeMiniatures ();
});

function onFullSizeMiniaturesKeydown(evt)  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizeMiniatures();
    evt.stopPropagation();
  }
}

// собираю шаблон

const createCommentTemplate = (comment) => {
  const commentElement = commentTemplate.cloneNode(true).content.querySelector('.social__comment');
  const commentImgElement = commentElement.querySelector('.social__picture');
  commentImgElement.src = comment.avatar;
  commentImgElement.alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  socialCommentElement.append(commentElement);
};

let commentsModule;
let count;

const renderComments = () => {
  socialCommentElement.innerHTML = '';
  const commentsRender = commentsModule.slice(0, count);
  commentsRender.forEach((comment) => createCommentTemplate(comment));

  // скрываю кнопку

  const isHideButton = commentsRender.length >= commentsModule.length;
  commentsLoaderElement.classList.toggle('hidden', isHideButton);

  // перезаписываю счетчик
  commentsShowCountElement.innerHTML = `${commentsRender.length} из <span class="comments-count">${commentsModule.length}</span> комментариев`;
};

// функция для счетчика, который делает +5 коментов, второй параметр - вызов функции генерации комментов

const commentsLoaderOnClick = () => {
  count += MAX_COMMENTS_TO_SHOW;
  renderComments();
};

const renderFullSizeMiniatures = (({url, likes, comments, description}) => {
  bigPictureimgElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  socialCaptionElement.textContent = description;
  userFullSizePictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentsModule = comments;
  count = comments.length < MAX_COMMENTS_TO_SHOW ? comments.length : MAX_COMMENTS_TO_SHOW;

  renderComments();
  // добавили слушателя на кнопку загрузки кнопки, делаем +5 каждый раз при нажатии
  commentsLoaderElement.addEventListener('click', commentsLoaderOnClick);
  document.addEventListener('keydown', onFullSizeMiniaturesKeydown);
});

export {renderFullSizeMiniatures};
