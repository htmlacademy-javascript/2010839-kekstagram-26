import {getRandomArrayElement, getRandomPositiveInteger} from './util.js';

const randomName = [
  'Артём',
  'Витя',
  'Петя',
  'Саша',
  'Катя'
];

const randomDescription = [
  'Это прекрасное фото!',
  'Это лучшее фото!',
  'Лето в сосновом бору',
  'Зимушка-зима'
];

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.','Как можно было поймать такой неудачный момент?!'
];

const getFotoInfo = (arrayItem, i) => {
  const randomAvatar = getRandomPositiveInteger (1, 6);
  const newI = i+1;                                       // потому что отсчёт идет с 0

  return {
    id: newI,
    url: `photos/${newI}.jpg`,
    description: getRandomArrayElement(randomDescription),
    likes: getRandomPositiveInteger(15, 200),
    comments: [
      {
        id: i + 1,
        avatar: `img/avatar-${randomAvatar}.svg`,
        message:  getRandomArrayElement(message),
        name: getRandomArrayElement(randomName),
      },
      {
        id: i + 1,
        avatar: `img/avatar-${randomAvatar}.svg`,
        message:  getRandomArrayElement(message),
        name: getRandomArrayElement(randomName),
      }
    ]
  };
};

const similarCards = Array.from({length: 25}, getFotoInfo);

export {similarCards};
