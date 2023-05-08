// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
}

const hornSelect = document.getElementById('horn-select');
const hornImage = document.querySelector('#expose img');
const hornAudio = document.querySelector('#expose audio');
const volumeSlider = document.getElementById('volume');
const volumeIcon = document.querySelector('#volume-controls img');
const playButton = document.querySelector('#expose button');

// Set the image and audio based on the selected horn
hornSelect.addEventListener('change', () => {
  const horn = hornSelect.value;
  switch (horn) {
    case 'air-horn':
      hornImage.src = 'assets/images/air-horn.svg';
      hornAudio.src = 'assets/audio/air-horn.mp3';
      break;
    case 'car-horn':
      hornImage.src = 'assets/images/car-horn.svg';
      hornAudio.src = 'assets/audio/car-horn.mp3';
      break;
    case 'party-horn':
      hornImage.src = 'assets/images/party-horn.svg';
      hornAudio.src = 'assets/audio/party-horn.mp3';
      break;
  }
});

// Set the volume icon and volume for the audio
volumeSlider.addEventListener('input', () => {
  const volume = volumeSlider.value;
  hornAudio.volume = volume / 100;
  if (volume === '0') {
    volumeIcon.src = 'assets/icons/volume-level-0.svg';
    volumeIcon.alt = 'Volume level 0';
  } else if (volume < 33) {
    volumeIcon.src = 'assets/icons/volume-level-1.svg';
    volumeIcon.alt = 'Volume level 1';
  } else if (volume < 67) {
    volumeIcon.src = 'assets/icons/volume-level-2.svg';
    volumeIcon.alt = 'Volume level 2';
  } else {
    volumeIcon.src = 'assets/icons/volume-level-3.svg';
    volumeIcon.alt = 'Volume level 3';
  }
});

// Play the audio and trigger confetti for the party horn
playButton.addEventListener('click', () => {
  hornAudio.play();
  if (hornSelect.value === 'party-horn') {
    confetti.start();
  }
});