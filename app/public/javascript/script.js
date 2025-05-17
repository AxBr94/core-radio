'use strict';

class TrackLoader {
    constructor(audioTagSelector, playlistsTagSelector, outputTagSelector) {
        this.audio = audioTagSelector;
        this.playlists = playlistsTagSelector;
        this.output = outputTagSelector;
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
            let trackName = response.headers.get('Content-Disposition')
                .replace('inline; filename=', '')
                .replace(/^"[\d{1,}]\./, '')
                .replace(/(.flac)|(.mp3)|(.wav)"$/, '');
            this.output.textContent = trackName;
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
            (() =>{
                if(this.audio.paused) {
                    alert(
                        'Your browser blocks autoplay. Turn it on in the panel before the site URL'
                    );
                }
            })();
        })
        .catch(err => console.error('Fetch error:', err));

    }
}

window.onload = () => {
    const trackLoader = new TrackLoader(
        document.querySelector('#audio-tag'),
        document.querySelector('#playlists'),
        document.querySelector('#track-name-output')
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