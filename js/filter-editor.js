import { renderCards } from './create-miniatures.js';
import { debounce, getRandomPositiveInteger } from './utils.js';
import { state } from './data.js';

const POST_MAX_COUNT = 10;
const postsContainerElement = document.querySelector('.pictures');
const imageFiltersSectionElement = document.querySelector('.img-filters');
const imageFiltersFormElement = imageFiltersSectionElement.querySelector('.img-filters__form');
const filterButtonElement = imageFiltersSectionElement.querySelectorAll('.img-filters__button');

const showFilterPosts = () => {
  imageFiltersSectionElement.classList.remove('img-filters--inactive');
  imageFiltersSectionElement.classList.add('img-filters--active');
};

const enableFilterPosts = () => {
  filterButtonElement.forEach((button) => {
    button.disabled = false;
  });
};

// Фотографии в изначальном порядке с сервера

const filterPostsDefault = (userPosts) => userPosts;

// Фотографии, отсортированные в порядке убывания количества комментариев

const filterPostsDiscuss = (userPosts) =>
  userPosts
    .slice()
    .sort(
      (commentA, commentB) =>
        commentB.comments.length - commentA.comments.length
    );

// Случайные, не повторяющиеся фотографии

const filterPostsRandom = () => {
  const copyPhotos = state.miniatures.slice();
  const randomPosts = [];

  while(randomPosts.length !== POST_MAX_COUNT) {
    const firstIndex = 0;
    const lastIndex = copyPhotos - 1;
    const randomIndex = getRandomPositiveInteger(firstIndex, lastIndex);
    const randomPost = copyPhotos.splice(randomIndex, 1)[0];
    randomPosts.push(randomPost);
  }

  return randomPosts;
};

const changeFilterClassName = (filterName) => {
  filterButtonElement.forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterName}`).classList.add('img-filters__button--active');
};

const clearOldPosts = () => {
  const posts = postsContainerElement.querySelectorAll('.picture');

  posts.forEach((post) => {
    post.remove();
  });
};

const postFilterChange = debounce((evt, userPosts) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const filter = evt.target.id;

  clearOldPosts();

  switch (filter) {
    case 'filter-discussed':
      changeFilterClassName(filter);
      renderCards(filterPostsDiscuss(userPosts));
      break;
    case 'filter-random':
      changeFilterClassName(filter);
      renderCards(filterPostsRandom(userPosts, POST_MAX_COUNT));
      break;
    case 'filter-default':
      changeFilterClassName(filter);
      renderCards(filterPostsDefault(userPosts));
      break;
  }
});

const initPostsFilter = () => {
  imageFiltersFormElement.addEventListener('click', (evt) =>
    postFilterChange(evt, state.miniatures)
  );
  showFilterPosts();
  enableFilterPosts();
};

export { initPostsFilter };
