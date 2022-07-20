
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const uploadEffects = document.querySelector('.effects__list');
const rangeContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = rangeContainer.querySelector('.effect-level__value');
const sliderElement = rangeContainer.querySelector('.effect-level__slider');

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
    rangeContainer.classList.add('hidden');
  } else {
    rangeContainer.classList.remove('hidden');
  }
};

// функция сброса параматров ренжа до базовых

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

const onEffectChange = (evt) => {
  imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = evt.target.value;
  imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);

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
  effectLevel.value = sliderElement.noUiSlider.get();

  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = 'none';
  }

  if (currentEffect === 'chrome') {
    imgUploadPreview.style.filter = `grayscale(${effectLevel.value})`;
  }

  if (currentEffect === 'sepia') {
    imgUploadPreview.style.filter = `sepia(${effectLevel.value})`;
  }

  if (currentEffect === 'marvin') {
    imgUploadPreview.style.filter = `invert(${effectLevel.value}%)`;
  }

  if (currentEffect === 'phobos') {
    imgUploadPreview.style.filter = `blur(${effectLevel.value}px)`;
  }
  if (currentEffect === 'heat') {
    imgUploadPreview.style.filter = `brightness(${effectLevel.value})`;
  }
});

uploadEffects.addEventListener('change', onEffectChange);
