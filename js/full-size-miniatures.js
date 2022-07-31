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

// закрытие фото

const closeFullSizeMiniatures = () => {
  userFullSizePictureElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

bigPictureCancelElement.addEventListener('click', () => {
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

// const createCommentTempate = (comment) => (
//   `<li class="social__comment">
//     <img class="social__picture"
//       src="${comment.avatar}"
//       alt="${comment.name}"
//       width="35" height="35">
//     <p class="social__text">${comment.message}</p>
// </li>`
// );


const createCommentTempate = (comment) => {
  const newCommentItem = document.createElement('li');
  newCommentItem.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  newCommentItem.appendChild(commentImage);
};

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
});

export {renderFullSizeMiniatures};
