const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const progressBar = document.getElementById("progressBar");
const progressIndicator = document.getElementById("progressIndicator");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");
const albumImage = document.getElementById("albumImage");
const progressContainer = document.querySelector(".progress-container");


let currentTrack = 0;
let isShuffle = false;
let isRepeat = false;
let favorites = new Set();

const tracks = [
    { 
        title: "No.1 Party Anthem", 
        artist: "Arctic Monkeys", 
        src: "No. 1 Party Anthem.mp3", 
        cover: "no1.jpg" // Add album cover here
    },
    { 
        title: "Come and Get Your Love", 
        artist: "Redbone", 
        src: "come and get your love.mp3", 
        cover: "cagyl.jpg" 
    },
    { 
        title: "Song 3", 
        artist: "Artist 3", 
        src: "song3.mp3", 
        cover: "cover3.jpg" 
    }
];

function loadTrack(index) {
    audioPlayer.src = tracks[index].src;
    favoriteBtn.classList.toggle("active", favorites.has(tracks[index].title));
}
function loadTrack(index) {
    albumImage.style.opacity = "0"; // Fade out effect

    setTimeout(() => {
        trackTitle.textContent = tracks[index].title;
        trackArtist.textContent = tracks[index].artist;
        audioPlayer.src = tracks[index].src;
        albumImage.src = tracks[index].cover; // Update album cover
        albumImage.style.opacity = "1"; // Fade in effect
    }, 500);
}

// Play/Pause Function
playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "||";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    }
});

// Previous Track
prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audioPlayer.play();
    playPauseBtn.textContent = "||";
});

// Next Track
nextBtn.addEventListener("click", () => {
    if (isShuffle) {
        currentTrack = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrack = (currentTrack + 1) % tracks.length;
    }
    loadTrack(currentTrack);
    audioPlayer.play();
    playPauseBtn.textContent = "||";
});

// Shuffle Toggle
shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle);
});

// Repeat Toggle
repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active", isRepeat);
    audioPlayer.loop = isRepeat;
});

// Favorite Toggle
favoriteBtn.addEventListener("click", () => {
    const song = tracks[currentTrack].title;
    if (favorites.has(song)) {
        favorites.delete(song);
    } else {
        favorites.add(song);
    }
    favoriteBtn.classList.toggle("active");
});

// Progress & Shuriken Rotation
audioPlayer.addEventListener("timeupdate", () => {
    if (audioPlayer.duration) {
        let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressIndicator.style.left = progress + "%";
        progressIndicator.style.transform = `rotate(${progress * 53.5}deg)`;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    }
});


function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Auto Next Song
audioPlayer.addEventListener("ended", () => {
    if (!isRepeat) nextBtn.click();
});

// Load First Track
loadTrack(currentTrack);