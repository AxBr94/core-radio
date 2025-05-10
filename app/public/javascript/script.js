'use strict';

window.onload = () => {
    fetch('http://127.0.0.1:3000/track', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки аудио');
            }
            console.log('Script is loaded.');
            return response.blob();
        })
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            const audio = document.querySelector('#audio-tag');
            audio.setAttribute('src', `${audioUrl}`)
            audio.play();
        })
        .catch(err => console.error('Fetch error:', err));
}
