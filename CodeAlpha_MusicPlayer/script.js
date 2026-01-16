const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const trackArt = document.getElementById('track-art');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const volSlider = document.getElementById('vol-slider');

let isPlaying = false;

// 1. iTunes API Fetch Function
async function fetchMusic(query = "Top Hits") {
    trackName.innerText = "Searching...";
    try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            loadTrack(data.results[0]);
        } else {
            trackName.innerText = "Not Found";
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        trackName.innerText = "Error Loading";
    }
}

// 2. Load Track Info
function loadTrack(track) {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    trackArt.classList.remove('rotate');

    trackName.innerText = track.trackName;
    trackArtist.innerText = track.artistName;
    audio.src = track.previewUrl; // 30s Preview
    trackArt.src = track.artworkUrl100.replace('100x100bb', '400x400bb');
}

// 3. Play/Pause with Promise
async function togglePlay() {
    if (!audio.src) return;
    try {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            trackArt.classList.remove('rotate');
            isPlaying = false;
        } else {
            await audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            trackArt.classList.add('rotate');
            isPlaying = true;
        }
    } catch (err) { console.log("Playback error", err); }
}

// 4. Time & Progress Update
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const prog = (audio.currentTime / audio.duration) * 100;
        progressBar.value = prog;
        
        // Time display update
        let curM = Math.floor(audio.currentTime / 60);
        let curS = Math.floor(audio.currentTime % 60);
        document.getElementById('current-time').innerText = `${curM}:${curS < 10 ? '0'+curS : curS}`;
        
        let durM = Math.floor(audio.duration / 60);
        let durS = Math.floor(audio.duration % 60);
        document.getElementById('duration').innerText = `${durM}:${durS < 10 ? '0'+durS : durS}`;
    }
});

// Seek Logic
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// 5. Volume Logic
volSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// 6. Events
searchBtn.addEventListener('click', () => fetchMusic(searchInput.value));
searchInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') searchBtn.click(); });
playBtn.addEventListener('click', togglePlay);

// Initial Song Load
fetchMusic();