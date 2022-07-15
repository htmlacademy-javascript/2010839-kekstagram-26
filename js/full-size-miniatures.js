import {isEscapeKey} from './util.js';


const userFullSizePicture = document.querySelector('.big-picture');
const bigPictureCancel = userFullSizePicture.querySelector('.big-picture__cancel');
const bigPictureimg = userFullSizePicture.querySelector('.big-picture__img img');
const socialCommentElement = document.querySelector('.social__comments');


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

const createComentTempate = (comment) => (
  `<li class="social__comment">
    <img class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
</li>`
);

// записываю шаблоном

const renderComents = (comments) => {
  socialCommentElement.innerHTML = '';

  comments.forEach((comment) => {
    socialCommentElement.insertAdjacentHTML('beforeend', createComentTempate(comment));
  });
};


const renderFullSizeMiniatures = (({url, likes, comments, description}) => {
  bigPictureimg.src = url;
  userFullSizePicture.querySelector('.likes-count').textContent = likes;
  userFullSizePicture.querySelector('.comments-count').textContent = comments.length;
  userFullSizePicture.querySelector('.social__caption').textContent = description;
  userFullSizePicture.classList.remove('hidden');


  document.querySelector('body').classList.add('modal-open');

  renderComents(comments);      // сборка комментария

  const arrSocialComments = Array.from(userFullSizePicture.querySelectorAll('.social__comment'));
  const socialCommentCount = document.querySelectorAll('.social__comment-count');                  // счётчик
  const socialCommentsLoaderButton = document.querySelectorAll('.social__comments-loader');              // кнопка загрузки
  const step = 5;
  let item = 0;

  arrSocialComments.slice(step).forEach((e) => e.classList.add('hidden'));
  item += step;

  socialCommentsLoaderButton.addEventListener('click', () => {
    const tmp = arrSocialComments.slice(item, item + step);

    tmp.forEach((e) => e.classList.remove('hidden'));
    item += step;

    const socialCommentCountHidden = Array.from(userFullSizePicture.querySelectorAll('.social__comment.hidden'));
    socialCommentCount.innerHTML = `${arrSocialComments.length - socialCommentCountHidden.length} из <span class="comments-count">${comments.length}</span> комментариев`;

    if (item >= arrSocialComments.length) {
      socialCommentsLoaderButton.classList.add('hidden');
    }
  });
});

export {renderFullSizeMiniatures};
