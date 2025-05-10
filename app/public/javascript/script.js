'use strict';

const trackRequest = () => {
    fetch(`http://127.0.0.1:3000/track?playlist=hardcore`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки аудио');
            }
            return response.blob();
        })
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            const audio = document.querySelector('#audio-tag');
            audio.setAttribute('src', `${audioUrl}`);
            console.log(blob.type);
            if (blob.type === 'audio/mpeg') {
                audio.setAttribute('type', 'audio/mpeg');
            } else if (blob.type === 'audio/ogg') {
                audio.setAttribute('type', 'audio/ogg');
            } else if (blob.type === 'audio/wav') {
                audio.setAttribute('type', 'audio/wav');
            }
            audio.play();
        })
        .catch(err => console.error('Fetch error:', err));
}

window.onload = trackRequest();