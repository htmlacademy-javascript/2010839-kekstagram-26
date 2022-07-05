import {similarCards} from './data.js';


const userFullSizePicture = document.querySelector('.big-picture');
const bigPictureCancel = userFullSizePicture.querySelector('.big-picture__cancel');
userFullSizePicture.classList.remove('hidden');


// закрытие фото

bigPictureCancel.addEventListener('click', () => {
  userFullSizePicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) =>  {
  if (evt.keyCode === 27) {
    userFullSizePicture.classList.add('hidden');
  }
});


document.querySelector('.social__comment-count').classList.add('hidden');     // временное дз
document.querySelector('.comments-loader').classList.add('hidden');           // временное дз
document.querySelector('body').classList.add('modal-open');

similarCards.forEach(({url, likes, comments, description}) => {
  userFullSizePicture.querySelector('.big-picture__img').src = url;
  userFullSizePicture.querySelector('.likes-count').textContent = likes;
  userFullSizePicture.querySelector('.comments-count').textContent = comments;
  userFullSizePicture.querySelector('.social__caption').textContent = description;

  // сборка комментария

  userFullSizePicture.querySelector('.social__text').textContent = comments[0].message;
  userFullSizePicture.querySelector('.social__picture').src = comments[0].avatar;
  userFullSizePicture.querySelector('.social__picture').alt = comments[0].name;
});
