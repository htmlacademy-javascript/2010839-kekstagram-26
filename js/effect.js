const IMAGE_SCALE = 100;
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
const uploadEffectsElement = document.querySelector('.effects__list');
const rangeContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = rangeContainerElement.querySelector('.effect-level__value');
const sliderElement = rangeContainerElement.querySelector('.effect-level__slider');
const scaleElement = document.querySelector('.scale__control--value');
const uploadImageFormElement = document.querySelector('#upload-select-image');
const photoElement = document.querySelector('.img-upload__preview');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

let currentEffect = document.querySelector('.effects__list input:checked').value;

// функция скрытия ренжа для базового

const hideSlider = () => {
  if (currentEffect === 'none') {
    rangeContainerElement.classList.add('hidden');
  } else {
    rangeContainerElement.classList.remove('hidden');
  }
};

// функция сброса параметров ренжа до базовых

const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const resetEffects = () => {
  resetSlider();
  scaleElement.value = `${IMAGE_SCALE}%`;
  imgUploadPreviewElement.style = 'transform: scale(1)';
  uploadImageFormElement.reset();
  imgUploadPreviewElement.style.filter = 'none';
  imgUploadPreviewElement.src = '';
  currentEffect = 'none';
  photoElement.style.transform = 'scale(1)';
};

const onEffectChange = (evt) => {
  imgUploadPreviewElement.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = evt.target.value;
  imgUploadPreviewElement.classList.add(`effects__preview--${currentEffect}`);

  hideSlider();

  if (currentEffect === 'none' || currentEffect === 'chrome' || currentEffect === 'sepia') {
    resetSlider();
  }

  if (currentEffect === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }

  if (currentEffect === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }

  if (currentEffect === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
};

// связка на событие изменения

sliderElement.noUiSlider.on('update', () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();

  if (currentEffect === 'none') {
    imgUploadPreviewElement.style.filter = 'none';
  }

  if (currentEffect === 'chrome') {
    imgUploadPreviewElement.style.filter = `grayscale(${effectLevelElement.value})`;
  }

  if (currentEffect === 'sepia') {
    imgUploadPreviewElement.style.filter = `sepia(${effectLevelElement.value})`;
  }

  if (currentEffect === 'marvin') {
    imgUploadPreviewElement.style.filter = `invert(${effectLevelElement.value}%)`;
  }

  if (currentEffect === 'phobos') {
    imgUploadPreviewElement.style.filter = `blur(${effectLevelElement.value}px)`;
  }
  if (currentEffect === 'heat') {
    imgUploadPreviewElement.style.filter = `brightness(${effectLevelElement.value})`;
  }
});

uploadEffectsElement.addEventListener('change', onEffectChange);

export {hideSlider, resetEffects};
