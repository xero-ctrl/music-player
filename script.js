const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const seekBar = document.getElementById("seekBar");
const albumImage = document.getElementById("albumImage");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");

let currentTrack = 0;

const tracks = [
    { title: "About You", artist: "The 1975", src: "song1.mp3", cover: "cover1.jpg" },
    { title: "Song 2", artist: "Artist 2", src: "song2.mp3", cover: "cover2.jpg" },
    { title: "Song 3", artist: "Artist 3", src: "song3.mp3", cover: "cover3.jpg" },
    // Add more songs here up to 17
];

function loadTrack(index) {
    albumImage.style.opacity = "0"; // Fade out effect
    setTimeout(() => {
        trackTitle.textContent = tracks[index].title;
        trackArtist.textContent = tracks[index].artist;
        audioPlayer.src = tracks[index].src;
        albumImage.src = tracks[index].cover;
        albumImage.style.opacity = "1"; // Fade in effect
    }, 500);
}

playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    }
});

prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
});

nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
});

audioPlayer.addEventListener("timeupdate", () => {
    seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

seekBar.addEventListener("input", () => {
    audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

loadTrack(currentTrack);