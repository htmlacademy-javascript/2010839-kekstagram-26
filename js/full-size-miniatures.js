import {isEscapeKey} from './util.js';

const userFullSizePicture = document.querySelector('.big-picture');
const bigPictureCancel = userFullSizePicture.querySelector('.big-picture__cancel');
const bigPictureimg = userFullSizePicture.querySelector('.big-picture__img img');
const socialCommentElement = document.querySelector('.social__comments');                         //  блок с коментами
const commentsLoader = userFullSizePicture.querySelector('.comments-loader');                  //  кнопка занрузки сообщений
const commentsShowCount = userFullSizePicture.querySelector('.social__comment-count');       //  счетчик
const MAX_COMMENTS_TO_SHOW = 5;
// eslint-disable-next-line no-unused-vars
let count = 0;

// закрытие фото

const closeFullSizeMiniatures = () => {
  userFullSizePicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

bigPictureCancel.addEventListener('click', () => {
  closeFullSizeMiniatures ();

  document.addEventListener('keydown', (evt) =>  {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeFullSizeMiniatures ();
      evt.stopPropagation();
    }
  });
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

// записываю шаблоном

const renderComments = () => {
  socialCommentElement.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();

  const commentsShow = 'тут не знаю';     //   тут над массив комментов заюзать, где его взять я не выкупаю

  commentsShow.forEach((comment) => {
    commentsFragment.append(createCommentTempate(comment));           // перебираю массив и добавляю шаблон
  });

  socialCommentElement.append(commentsFragment);
  commentsLoader.classList.toggle('hidden', 'все комменты' === commentsShow.length);      // скрываю кнопку когда длинна всех равно загрузу(второй арщумент это условие)
  // eslint-disable-next-line no-undef
  commentsShowCount.innerHTML = `${commentsShow.length} из <span class="comments-count">${comments.length}</span> комментариев`;   // перезаписываю счетчик
};

// функция для счетчика, который делает +5 коментов, второй параметр - вызов функции генерации комментов

function commentsLoaderOnClick() {
  count += MAX_COMMENTS_TO_SHOW;
  renderComments();
}

const renderFullSizeMiniatures = (({url, likes, comments, description}) => {
  bigPictureimg.src = url;
  userFullSizePicture.querySelector('.likes-count').textContent = likes;
  userFullSizePicture.querySelector('.comments-count').textContent = comments.length;
  userFullSizePicture.querySelector('.social__caption').textContent = description;
  userFullSizePicture.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');

  renderComments();
  commentsLoader.addEventListener('click', commentsLoaderOnClick);     // добавили слущателя на кнопку загрузки кнопки, делаем +5 каждый раз при нажатии
});

export {renderFullSizeMiniatures};
