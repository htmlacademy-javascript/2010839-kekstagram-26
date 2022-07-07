

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
});

document.addEventListener('keydown', (evt) =>  {
  if (evt.key === 'Escape') {
    closeFullSizeMiniatures ();
  }
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

  document.querySelector('.social__comment-count').classList.add('hidden');     // временное дз
  document.querySelector('.comments-loader').classList.add('hidden');           // временное дз
  document.querySelector('body').classList.add('modal-open');

  renderComents(comments);      // сборка комментария
});

export {renderFullSizeMiniatures};
