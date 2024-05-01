let all_songs = [
  {
    id: 1,
    name: "Namo Namo",
    artist: "Rajni Rai",
    img: "url(assets/images/jai-shree-ram-dp-hd-download.webp)",
    gener: "gener_1",
    src: "assets/songs/Namo Namo - Lyrical  Kedarnath  Sushant Rajput  Sara Ali Khan  Amit Trivedi  Amitabh B.mp3",
  },
  {
    id: 2,
    name: "Kesari ke laal",
    artist: "Shivam Kumar",
    img: "url(assets/images/perfect.jpg)",
    gener: "gener_1",
    src: "assets/songs/Keejo Kesari Ke Laal (Lyrical)  Lakhbir Singh Lakha  Jai Shree Ram  Ram Mandir Viral Song.mp3",
  },
  {
    id: 3,
    name: "Indian Summer",
    artist: "Shubham kumar",
    img: "url(assets/images/roar.jpg)",
    gener: "gener_2",
    src: "assets/songs/Jai Wolf - Indian Summer (Official Music Video).mp3",
  },
  {
    id: 4,
    name: "Indian Summer 1",
    artist: "Ragini Rai",
    img: "url(assets/images/shapeofyou.jpg)",
    gener: "gener_2",
    src: "assets/songs/Jai Wolf - Indian Summer (Official Music Video).mp3",
  },
  {
    id: 5,
    name: "Indian Summer 3",
    artist: "Usha Singh",
    img: "url(assets/images/starboy.jpg)",
    gener: "gener_3",
    src: "assets/songs/Jai Wolf - Indian Summer (Official Music Video).mp3",
  },
];

const generList = ["All", "gener_1", "gener_2", "gener_3"];
let currInd = 0;

//html elements
const bodyEle = document.querySelector("body");
const themeEle = document.getElementById("toggle-switch");
const generEle = document.getElementById("gener-list");
const songContainerEle =
  document.getElementsByClassName("all-songs-content")[0];
const songsEle = songContainerEle.childNodes;
const nextBtnEle = document.getElementById("next-btn");
const prevBtnEle = document.getElementById("prev-btn");
const addToListBtnEle = document.getElementById("add-to-list-btn");
const imgEle = document.getElementsByClassName("song-img")[0];
const songNameEle = document.getElementsByClassName("song-name")[0];
const artistNameEle = document.getElementsByClassName("artist-name")[0];
const currPlaylistContainerEle =
  document.getElementsByClassName("current-playlist")[0];
const playlistInputEle = document.getElementById("playlist-input");
const playlistBtnEle = document.getElementById("playlist-btn");
const playlistContainerEle = document.getElementsByClassName("all-playlist")[0];
const audioPlayerEle = document.querySelector("audio");
const playlistSongsEle = currPlaylistContainerEle.childNodes;

//add options to gener dropdown
generList.forEach((gener) => {
  const optEle = document.createElement("option");
  optEle.value = gener;
  optEle.innerHTML = gener;
  generEle.appendChild(optEle);
});

//add all songs to list
all_songs.forEach((element) => {
  const songEle = document.createElement("div");
  songEle.classList.add("list-ele");
  const songNameEle = document.createElement("p");
  songNameEle.innerHTML = element.name;
  songEle.appendChild(songNameEle);
  songContainerEle.appendChild(songEle);
});

//display first song by default on player
songNameEle.innerHTML = all_songs[0].name;
artistNameEle.innerHTML = all_songs[0].artist;
imgEle.style.backgroundImage = all_songs[0].img;
audioPlayerEle.src = all_songs[0].src;

renderCurrentSong();

//functions
function createPlaylist() {
  console.log("inside createPlaylist");
  const playlistName = playlistInputEle.value.trim();
  if (playlistName != "") {
    console.log("inside createPlaylist if condition");
    const playlist = document.createElement("div");
    playlist.classList.add("list-ele");
    playlist.classList.add("playlists");
    const playlistNameEle = document.createElement("p");
    playlistNameEle.innerHTML = playlistName;
    playlist.appendChild(playlistNameEle);
    playlistContainerEle.appendChild(playlist);
  }
  playlistInputEle.value = "";
}

function toggleTheme() {
  if (!themeEle.checked) {
    bodyEle.removeAttribute("data-theme");
  } else {
    bodyEle.setAttribute("data-theme", "dark");
  }
}

function nextSong() {
  const len = all_songs.length;
  currInd++;
  currInd = currInd % len;
  imgEle.style.backgroundImage = all_songs[currInd].img;
  songNameEle.innerHTML = all_songs[currInd].name;
  artistNameEle.innerHTML = all_songs[currInd].artist;
}

function prevSong() {
  const len = all_songs.length;
  currInd--;
  if (currInd < 0) {
    currInd = len - 1;
  }
  imgEle.style.backgroundImage = all_songs[currInd].img;
  songNameEle.innerHTML = all_songs[currInd].name;
  artistNameEle.innerHTML = all_songs[currInd].artist;
}

function addToList() {
  console.log("Inside addToList");
  //check if any playlist present
  let listOfPlaylist = Array.from(playlistContainerEle.children);
  //if yes then check if any playlist is selected, else alert "create playlist"
  if (listOfPlaylist.length > 0) {
    console.log("Inside first if");
    var selectedPlaylist = false;
    let selectedPlaylistEle;
    //if playlist is selected then add songs, else alert "select playlist"
    listOfPlaylist.forEach((playlist) => {
      if (playlist.classList.contains("selected")) {
        selectedPlaylist = true;
        selectedPlaylistEle = playlist;
      }
    });
    if (selectedPlaylist) {
      console.log("Inside second if");
      //add check if the song is already present in current playlist
      let currentList = Array.from(currPlaylistContainerEle.children);
      var alreadyPresent = false;
      currentList.forEach((childDiv) => {
        let nameEle = childDiv.querySelector("p");
        if (songNameEle.innerText === nameEle.innerText) {
          alreadyPresent = true;
        }
      });

      if (!alreadyPresent) {
        console.log("Inside third if");
        const songEle = document.createElement("div");
        songEle.classList.add("list-ele");
        const songPlayNameEle = document.createElement("p");
        songPlayNameEle.innerHTML = songNameEle.innerText;
        songEle.appendChild(songPlayNameEle);
        songEle.addEventListener("click", (e) => {
          console.log("inside song name element");
          all_songs.forEach((song) => {
            console.log(songEle.querySelector("p").innerText);
            if (songEle.querySelector("p").innerText === song.name) {
              console.log("inside if condition");
              imgEle.style.backgroundImage = song.img;
              songNameEle.innerHTML = song.name;
              artistNameEle.innerHTML = song.artist;
              audioPlayerEle.src = song.src;
            }
          });
        });

        currPlaylistContainerEle.appendChild(songEle);
        selectedPlaylistEle.appendChild(songEle.cloneNode(true));
      } else {
        alert("Song already added to the current playlist");
      }
    } else {
      alert("please select a playlist");
    }
  } else {
    alert("Please create a playlist");
  }
}

function renderCurrentSong() {
  songsEle.forEach((songElem) => {
    songElem.addEventListener("click", (e) => {
      console.log("I am here");

      const songName = e.target.innerText;
      console.log(songName);

      all_songs.forEach((song) => {
        if (songName === song.name) {
          imgEle.style.backgroundImage = song.img;
          songNameEle.innerHTML = song.name;
          artistNameEle.innerHTML = song.artist;
          currInd = song.id - 1; //for rendering the next and prev song from the list
        }
      });
    });
  });
}

function showSongs() {
  const gener = generEle.value;
  console.log(gener);
  let childList = [];
  if (gener === "All") {
    all_songs.forEach((element) => {
      const songEle = document.createElement("div");
      songEle.classList.add("list-ele");
      const songNameEle = document.createElement("p");
      songNameEle.innerHTML = element.name;
      songEle.appendChild(songNameEle);
      childList.push(songEle);
    });
  } else {
    all_songs.forEach((element) => {
      if (element.gener === gener) {
        const songEle = document.createElement("div");
        songEle.classList.add("list-ele");
        const songNameEle = document.createElement("p");
        songNameEle.innerHTML = element.name;
        songEle.appendChild(songNameEle);
        childList.push(songEle);
      }
    });
  }
  songContainerEle.replaceChildren(...childList);
  renderCurrentSong();
}

//event listners
themeEle.addEventListener("change", toggleTheme);
generEle.addEventListener("change", showSongs);
nextBtnEle.addEventListener("click", nextSong);
prevBtnEle.addEventListener("click", prevSong);
addToListBtnEle.addEventListener("click", addToList);
playlistBtnEle.addEventListener("click", createPlaylist);
playlistContainerEle.addEventListener("click", function (event) {
  if (event.target.classList.contains("playlists")) {
    const songsListEle = [];
    for (const song of event.target.children) {
      if (song.classList.contains("list-ele")) {
        songsListEle.push(song.cloneNode(true));
      }
    }
    const playListEles = playlistContainerEle.querySelectorAll(".playlists");
    playListEles.forEach((playlist) => playlist.classList.remove("selected"));
    event.target.classList.add("selected");
    currPlaylistContainerEle.replaceChildren(...songsListEle);
    console.log("selected playlist: ", event.target.innerText);
  }
});
