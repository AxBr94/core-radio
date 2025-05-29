'use strict';

class TrackLoader {
    constructor(audioTagSelector, playlistsTagSelector, outputTagSelector) {
        this.audio = audioTagSelector;
        this.playlists = playlistsTagSelector;
        this.output = outputTagSelector;
        this.audioUrl;
        this.switchers = {
            prev: document.querySelector('#prev-track'),
            next: document.querySelector('#next-track'),
        };
        this.playedTracks = new Set();
    }

    setAudioUrl(blob) {
        //checkig existing of old blobs in browser
        if (this.audioUrl) {
            URL.revokeObjectURL(this.audioUrl);
        }
        if (blob) {
            this.audioUrl = URL.createObjectURL(blob);
        }
    }
    
    trackRequest(playlist, direction) {
        //testing port :3000
        fetch(`http://127.0.0.1:80/playlist/${playlist}/direction/${direction}`, {
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
                .replace(/["_]/g, ' ')
                .replace(/(.flac)|(.mp3)|(.wav)$/, '');
            this.output.textContent = `🎵${trackName}`;
            this.playedTracks.add(trackName);
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
            this.audio.load();
            this.audio.play();
            (() =>{
                if(this.audio.paused) {
                    alert(
                        '⚙️ Your browser blocks autoplay.\nTurn it on in the panel before the site URL and reload the page'
                    );
                }
            })();
        })
        .catch(err => console.error('Fetch error:', err));

    }
}


const trackLoader = new TrackLoader(
    document.querySelector('#audio-tag'),
    document.querySelector('#playlists'),
    document.querySelector('#track-name-output'),
);

//event on changing playlist
trackLoader.playlists.addEventListener('change', () => {
    trackLoader.trackRequest(trackLoader.playlists.value);
});

//control buttons events
trackLoader.switchers.prev.addEventListener('click', () => {
    trackLoader.trackRequest(trackLoader.playlists.value, "prev");
});

trackLoader.switchers.next.addEventListener('click', () => {
    trackLoader.trackRequest(trackLoader.playlists.value, "next");
});

//random track
trackLoader.trackRequest(trackLoader.playlists.value);

//autoplay next tracks
setInterval(()=>{
    if (trackLoader.audio.ended) {
        trackLoader.trackRequest(trackLoader.playlists.value, "next");
    }

    const playedTracksOutput = document.querySelector('#played-tracks');

    for (let track of trackLoader.playedTracks) {
        if (!playedTracksOutput.textContent.includes(track)) {
            playedTracksOutput.textContent += `${track}; `;
        }
    }
}, 900);
