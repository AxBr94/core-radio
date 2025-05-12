'use strict';

const audio = document.querySelector('#audio-tag');
const playlists = document.querySelector('#playlists');

const trackRequest = (playlist) => {
    fetch(`http://127.0.0.1:3000/track?playlist=${playlist}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    .then(response => {
        if (!response.ok) {
            throw new Error('Audio load error.');
        }
        return response.blob();
    })
    .then(blob => {
        const audioUrl = URL.createObjectURL(blob);
        audio.setAttribute('src', `${audioUrl}`);
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

window.onload = trackRequest(playlists.value);

playlists.addEventListener('change', () => {
    trackRequest(playlists.value);
});