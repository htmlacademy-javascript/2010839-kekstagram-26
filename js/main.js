import './create-miniatures.js';
import './photo.js';
import './filter-editor.js';
import { setUserFormSubmit, closeEditMiniatures } from './upload.js';
import { initPostsFilter } from './filter-editor.js';
import { setMiniatures } from './data.js';
import { getData } from './api.js';
import { renderCards } from './create-miniatures.js';
import { showAlert } from './message-popup.js';

const onSuccessLoadData = (photos) => {
  setMiniatures(photos); // запишем в данные для дальнейшего использования
  renderCards(photos); // отрисуем фотки которые пришли с сервера
};

const onErrorLoadData = () => {
  showAlert('Не удалось загрузить данные');
  // можем дописать любой по обработке ошибки
};

getData(
  onSuccessLoadData,
  onErrorLoadData
);

const onSuccessSendData = () => {
  closeEditMiniatures();
};

initPostsFilter();
setUserFormSubmit(onSuccessSendData);
