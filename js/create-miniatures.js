import {similarCards} from './data.js';
import {renderFullSizeMiniatures} from './full-size-miniatures.js';


const userPicture = document.querySelector('.pictures');    //  родитель куда засунем шаблон

const similarPictureTemplate = document.querySelector('#picture')    //  шаблон
  .content.querySelector('.picture');     // внутрянка шаблона

const pictureFragment = document.createDocumentFragment();     // фрагмент

similarCards.forEach(({url, likes, comments,description}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.addEventListener('click', () => renderFullSizeMiniatures({url, likes, comments, description}));     // добавил
  userPicture.append(pictureElement);
});

userPicture.append(pictureFragment);    // добавляю в родителя фрагмент
