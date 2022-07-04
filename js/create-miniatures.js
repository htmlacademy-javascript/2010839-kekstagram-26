import {similarCards} from './data.js';


const userPicture = document.querySelector('.pictures');    //  родитель куда засунем шаблон

const similarPictureTemplate = document.querySelector('#picture')    //  шаблон
  .content.querySelector('.picture');     // внутрянка шаблона

const similarCard = similarCards;

const pictureFragment = document.createDocumentFragment();


similarCard.forEach(({url, likes, comments}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments;
  userPicture.append(pictureElement);
});

userPicture.append(pictureFragment);
