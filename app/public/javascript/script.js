'use strict';

class TrackLoader {
    constructor(audioTagSelector, playlistsTagSelector) {
        this.audio = audioTagSelector;
        this.playlists = playlistsTagSelector;
        this.audioUrl;

    }

    setAudioUrl(blob) {
        if (blob) {
            this.audioUrl = URL.createObjectURL(blob);
        }
    }
    
    trackRequest(playlist, direction) {
        fetch(`http://127.0.0.1:3000/playlist/${playlist}/direction/${direction}`, {
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
            this.setAudioUrl(blob);
            this.audio.setAttribute('src', `${this.audioUrl}`);
            if (blob.type === 'audio/mpeg') {
                this.audio.setAttribute('type', 'audio/mpeg');
            } else if (blob.type === 'audio/ogg') {
                this.audio.setAttribute('type', 'audio/ogg');
            } else if (blob.type === 'audio/wav') {
                this.audio.setAttribute('type', 'audio/wav');
            }
            this.audio.play();
        })
        .catch(err => console.error('Fetch error:', err));
    }
}

window.onload = () => {
    const trackLoader = new TrackLoader(
        document.querySelector('#audio-tag'),
        document.querySelector('#playlists')
    );

    trackLoader.playlists.addEventListener('change', () => {
        trackLoader.trackRequest(trackLoader.playlists.value);
    });
    
    trackLoader.trackRequest(trackLoader.playlists.value);//!

    setInterval(()=>{
		if (trackLoader.audio.ended) {
            trackLoader.trackRequest(trackLoader.playlists.value, "next");
		}
	}, 900);
}