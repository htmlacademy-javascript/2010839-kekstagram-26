/* eslint-disable no-console */
// getRandomArrayElement Источник - https://efim360.ru/javascript-sluchajnyj-element-massiva/

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

function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength();    // для линта

// Рандомный элемент в заданном диапазоне
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Рандомный элемент из массива
function getRandomArrayElement(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

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
      }
    ]
  };
};

const similarCards = Array.from({length: 25}, getFotoInfo);

console.log(similarCards);
