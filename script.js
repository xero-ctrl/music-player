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
        src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740143655/No._1_Party_Anthem_lfaf0r.mp3", 
        cover: "no1.jpg" // Add album cover here
    },
    { 
        title: "Come and Get Your Love", 
        artist: "Redbone", 
        src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740143628/Come_and_Get_Your_Love_oxhqai.mp3", 
        cover: "iyok.jpg" 
    },
    { 
        title: "Untouchable", 
        artist: "Taylor Swift", 
        src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740143552/Taylor_Swift_-_Untouchable_Taylor_s_Version_Lyric_Video_ku5dkr.mp3", 
        cover: "27a6c71ebd4732c24aa94de61f024c5c.jpg" 
    },
    {
       title: 'Jump Then Fall',
       artist: "Taylor Swift",
       src:"https://res.cloudinary.com/dcgehi8wi/video/upload/v1740119099/Taylor_Swift_-_Jump_Then_Fall_Taylor_s_Version_Lyric_Video_n5vdzp.mp3",
       cover: "606230e40d99538a48988e726e2938ba.jpg"
    },
    {
       title: "LOVE LOOKS PRETTY ON YOU",
       artist: "Nessa Barrett",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180094/LOVE_LOOKS_PRETTY_ON_YOU_lpvadk.mp3",
       cover: "763686f6e0f6072ac77563b1e4a503aa (1).jpg"
    },
    {
       title: "Nothin' On You",
       artist: "B.o.B ft. Bruno Mars",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180088/SpotifyMate.com_-_Nothin__on_You__feat._Bruno_Mars__-_B.o.B_jnop07.mp3",
       cover: "b908d595d0518d952939fc02dd7ec28a.jpg"
    },
    {
       title: "my strange addiction",
       artist: "Billie Eilish",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180085/SpotifyMate.com_-_my_strange_addiction_-_Billie_Eilish_apucwc.mp3",
       cover: "bd644a801a796ada7f5559dbc7418b68.jpg"
    },
    {
       title: "santa doesn't know you like i do,
       artist: "Sabrina Carpenter",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180085/SpotifyMate.com_-_santa_doesn_t_know_you_like_i_do_-_Sabrina_Carpenter_tw1n0t.mp",
       cover: "ac30f699162746e139e01bd44c5d4040.jpg"
    },
    {
       title: "Feels Like",
       artist: "Gracie Abrams",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180083/SpotifyMate.com_-_Feels_Like_-_Gracie_Abrams_pi8rzb.mp3",
       cover: "bc9226e19fffff948d816456bd91de07.jpg"
    },
    {
       title: "Dive",
       artist: "Ed Sheeran",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180073/Dive_whiekn.mp3",
       cover: "eca80ce920ace9ce947c76da2a19f355.jpg"
    },
    {
       title: "All Of The Stars",
       artist: "Ed Sheeran",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180072/All_of_the_Stars_updxxe.mp3",
       cover: ""
    },
    {
       title: "You And Me",
       artist: "Lifehouse",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180067/You_And_Me_rhpjav.mp3",
       cover: ""
    },
    {
       title: "So High School",
       artist: "Taylor Swift",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180066/So_High_School_gwcrha.mp3",
       cover: "5f2363e2ba725164641c759bfc13b98d.jpg"
    },
    {
       title: "I Love You, I'm Sorry",
       artist: "Gracie Abrams",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180065/Gracie_Abrams_-_I_Love_You_I_m_Sorry_Official_Lyric_Video_tydnlu.mp3",
       cover: "ilyis.jpg"
    },
    {
       title: "Guilty As Sin",
       artist: "Taylor Swift",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740180063/Guilty_as_Sin__wcnq5y.mp3",
       cover: "4a9f9efc1bfea8af1af02c0ef32d2024.jpg"
    },
    {
       title: "Lego House",
       artist: "Ed Sheeran",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740182315/Lego_House_mjh9qh.mp3",
       cover: "267c92b055e2a9e9d25aba878df20dbb.jpg"
    },
    {
       title: "Two Is Better Than One",
       artist: "Boys Like Girls",
       src: "https://res.cloudinary.com/dcgehi8wi/video/upload/v1740182312/Two_Is_Better_Than_One_zr0wg0.mp3",
       cover: "1f8e7bfebfa38a12feb7f820a03731c2.jpg"
    },
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