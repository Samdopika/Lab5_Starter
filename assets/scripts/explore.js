// explore.js

//window.addEventListener('DOMContentLoaded', init);

window.onload = () => {
  const synth = window.speechSynthesis;

  const voiceSelect = document.querySelector('#voice-select');
  const textarea = document.querySelector('#text-to-speak');
  const button = document.querySelector('button');
  const img = document.querySelector('img');

  let voices = [];

  const populateVoiceList = () => {
    voices = synth.getVoices();

    voiceSelect.innerHTML = '';

    voices.forEach(voice => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;

      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });

    voiceSelect.selectedIndex = 0;
  };

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  const speak = () => {
    if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    }
    if (textarea.value !== '') {
      const utterThis = new SpeechSynthesisUtterance(textarea.value);
      const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
      voices.forEach(voice => {
        if (voice.name === selectedVoice) {
          utterThis.voice = voice;
        }
      });

      img.src = 'assets/images/smiling-open.png';

      utterThis.onerror = () => {
        console.error('SpeechSynthesisUtterance.onerror');
      };

      utterThis.onend = () => {
        img.src = 'assets/images/smiling.png';
      };

      synth.speak(utterThis);
    }
  };

  button.addEventListener('click', speak);
};
