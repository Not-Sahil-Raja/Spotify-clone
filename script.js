console.log("Welcome to spotify");

let songIndex = 0;

let audioElement = new Audio("");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("songNameSpan");
let nowPlaying = document.querySelector(".nowPlaying");

let songs = [
  {
    songName: "Joji-Glimpes Of Us",
    filePath: "songs/1.mp3",
    coverPath:
      "https://upload.wikimedia.org/wikipedia/en/4/4a/Joji_-_Glimpse_of_Us.png",
  },
  {
    songName: "VØJ x Narvent",
    filePath: "songs/2.mp3",
    coverPath:
      "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/cd/0e/69/cd0e69b5-040b-8e57-8ba3-a1ed5e9a71bb/197187800414.jpg/1200x1200bb.jpg",
  },
  {
    songName: "The BatMan",
    filePath: "songs/3.mp3",
    coverPath:
      "https://m.media-amazon.com/images/I/81SXmmiTS+L._AC_UF1000,1000_QL80_.jpg",
  },
  {
    songName: "Lost Memory",
    filePath: "songs/4.mp3",
    coverPath:
      "https://a10.gaanacdn.com/images/albums/69/7362669/crop_480x480_7362669.jpg",
  },
  {
    songName: "Goth (Slowed + Reverb)",
    filePath: "songs/5.mp3",
    coverPath:
      "https://i.scdn.co/image/ab67616d0000b2731fd8d521988e4b390c339b7e",
  },
  {
    songName: "Die For You",
    filePath: "songs/6.mp3",
    coverPath:
      "https://external-preview.redd.it/BBUee0J4xCVgpJRdhptwnYjUXWZ3aobHSk7ZOERysFA.jpg?auto=webp&s=ce7434d6963112b0f3086da0c63aca03c4cbd66e",
  },
];

//play-pause button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    playIcon();
  } else {
    audioElement.pause();
    masterPlay.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
    pauseIcon();
  }
});

//seek-bar
audioElement.addEventListener("timeupdate", () => {
  progress = parseFloat(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;

  console.log((myProgressBar.value * audioElement.duration) / 100);
});

//covers and songs
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songsName")[0].innerHTML = songs[i].songName;
});

//func for plays
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};

//song play from cover
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      if (audioElement.paused || audioElement.currentTime <= 0) {
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText =
          "Now Playing: " + songs[songIndex - 1].songName;
        audioElement.play();
        // audioElement.currentTime = 0;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        playIcon();
        songItemChangePlay(songIndex);
      } else {
        e.target.classList.add("fa-circle-play");
        e.target.classList.remove("fa-circle-pause");
        // audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = "Paused: " + songs[songIndex - 1].songName;
        audioElement.pause();
        // audioElement.currentTime = 0;
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        pauseIcon();
        songItemChangePause(songIndex);
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 6) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = "Now Playing: " + songs[songIndex - 1].songName;
  audioElement.play();
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = "Now Playing: " + songs[songIndex - 1].songName;
  audioElement.play();
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

//for playing icon
const playIcon = () => {
  nowPlaying.style.opacity = "1";
};
const pauseIcon = () => {
  nowPlaying.style.opacity = "0";
};

//songItem changes after play
const songItemChangePlay = () => {
  songItems[songIndex - 1].style.backgroundColor = "rgba(219, 216, 216, 0.9)";
};

const songItemChangePause = () => {
  songItems[songIndex - 1].style.backgroundColor = "rgba(219, 216, 216, 0.5)";
};
