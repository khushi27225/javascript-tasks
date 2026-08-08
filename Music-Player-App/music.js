let songCover = document.getElementById("songCover");
let songName = document.getElementById("songName");
let artistName = document.getElementById("artistName");
let currentTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");
let progressRange = document.getElementById("progressRange");
let previousBtn = document.getElementById("previousBtn");
let switchBtn = document.getElementById("switchBtn");
let nextBtn = document.getElementById("nextBtn");
let volumeRange = document.getElementById("volumeRange");
let audio = document.getElementById("audio");
let currentSong = 0;
let songs = [
    {
        songCover:"",
        songName :"First Song",
        artistName :"Demo Artist",
        audio :""
    },
    {
        songCover:"",
        songName :"Second Song",
        artistName :"Demo Artist",
        audio :""
    },
    {
        songCover:"",
        songName :"Third Song",
        artistName :"demo Artist",
        audio :""
    }
];
function loadSong() {
    songCover.src = songs[currentSong].songCover;
    songName.innerText = songs[currentSong].songName;
    artistName.innerText = songs[currentSong].artistName;
    audio.src = songs[currentSong].audio;
}
loadSong();
function formatTime(seconds){
    let minutes = Math.floor(seconds/60);
    let remainingSeconds = seconds % 60;
    remainingSeconds = String(remainingSeconds).padStart(2, "0");
    return minutes + ":" + remainingSeconds;
}
switchBtn.addEventListener("click", function(){
    if(audio.paused){
        audio.play();
        switchBtn.innerText = "❚❚";
    }
    else{
        audio.pause();
        switchBtn.innerText ="▶";
    }
});
nextBtn.addEventListener("click", function(){
    currentSong++;
    if(currentSong >= songs.length){
        currentSong = 0;
    }
    loadSong();
});
previousBtn.addEventListener("click", function(){
    currentSong--;
    if(currentSong < 0){
        currentSong = songs.length -1;
    }
    loadSong();
});
audio.addEventListener("loadedmetadata", function(){
        progressRange.max = audio.duration;
        totalTime.innerText = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", function(){
    currentTime.innerText = formatTime(audio.currentSong);
    progressRange.value = audio.currentTime;
});
progressRange.addEventListener("input", function(){
    audio.currentTime = progressRange.value;
});
volumeRange.addEventListener("input", function(){
    audio.volume = volumeRange.value / 100;
});
audio.addEventListener("ended", function(){
    currentSong++;
    if(currentSong >= songs.length){
        currentSong = 0;
    }
    loadSong();
    audio.play();
})
;