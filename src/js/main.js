import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../vendor/icofont/icofont.min.css";
import "../css/main.css";
import "../css/home.css";
import $ from "jquery";
import _ from "lodash";
import { musics } from "./db";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";

// variables
let songIndex = 1;
const playBtn = $(".icon-music-play").find("i");
const audio = document.getElementById("audio");
// audio.src = musics[songIndex - 1].src;
const prev = $(".prev");
const next = $(".next");
const repeatBtn = $(".repeat");
const randomBtn = $(".random");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeAudio = document.querySelector(".curent-time");
const totalTimeAudio = document.querySelector(".total-time");
const volume = $(".volume");

// format Time
const formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
};

// handler play
const play = (item) => {
  $(".icon-music-play").addClass("playing");
  playBtn.addClass("icofont-ui-pause");
  playBtn.removeClass("icofont-ui-play");
  audio.play();
};

// handle pause
const pause = (item) => {
  $(".icon-music-play").removeClass("playing");
  playBtn.addClass("icofont-ui-play");
  playBtn.removeClass("icofont-ui-pause");
  audio.pause();
};

// handler play in albums
const playMusic = (item) => {
  songIndex = item.data.id;

  renderMusic();

  play();
};

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  currentTimeAudio.textContent = formatTime(currentTime);
  if (isNaN(duration)) {
    totalTimeAudio.textContent = "00:00";
  } else totalTimeAudio.textContent = formatTime(duration - currentTime);
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// prev song index
const prevSong = () => {
  if (randomBtn.hasClass("active-btn")) {
    // random music
    songIndex = Math.floor(Math.random() * musics.length) + 1;
  } else if (songIndex === 1) songIndex = musics.length;
  else songIndex--;

  renderMusic();

  play();
};

// next song index
const nextSong = () => {
  if (randomBtn.hasClass("active-btn")) {
    // random music
    songIndex = Math.floor(Math.random() * musics.length) + 1;
  } else if (songIndex >= musics.length) songIndex = 1;
  else songIndex++;

  renderMusic();

  play();
};

// render album
const renderAlbums = () => {
  // variables
  const $listAlbums = $(".list-albums");
  const musicBoxHtml = $("#music-box").html();
  const musicBox = _.template(musicBoxHtml);

  // appned albums
  $listAlbums
    .append(
      _.map(musics, (item) => {
        const dom = $(musicBox(item));

        dom.find(".icon-play-music-box").on("click", item, playMusic);

        return dom;
      })
    )
    .slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      prevArrow:
        '<div class="slick-prev"><i class="icofont-arrow-left"></i></div>',
      nextArrow:
        '<div class="slick-next"><i class="icofont-arrow-right"></i></i></div>',
    });
};

// render offcanvas music
const renderMusic = () => {
  // variables
  const $offcanvasMusic = $(".music-content");
  const offcanvasMusicHtml = $("#music-offcanvas").html();
  const musicIndex = _.template(offcanvasMusicHtml);
  const musicPlaying = _.filter(musics, (item) => item.id === songIndex);

  // appned music offcanvas
  $offcanvasMusic.html("");
  $offcanvasMusic.append(
    _.map(musicPlaying, (item) => {
      const dom = $(musicIndex(item));
      audio.src = item.src;

      return dom;
    })
  );
};

//
$(() => {
  renderAlbums();
  renderMusic();

  playBtn.on("click", () => {
    $(".icon-music-play").hasClass("playing") ? pause() : play();
  });

  repeatBtn.on("click", () => {
    repeatBtn.toggleClass("active-btn");
  });

  randomBtn.on("click", () => {
    randomBtn.toggleClass("active-btn");
  });

  // auto next song
  audio.addEventListener("ended", () => {
    if (repeatBtn.hasClass("active-btn")) {
      audio.currentTime = 0;
      play();
    } else if (randomBtn.hasClass("active-btn")) {
      // random music
      songIndex = Math.floor(Math.random() * musics.length) + 1;
      nextSong();
    } else nextSong();
  });

  // Time/song update
  audio.addEventListener("timeupdate", updateProgress);

  // Click on progress bar
  progressContainer.addEventListener("click", setProgress);

  prev.on("click", prevSong);
  next.on("click", nextSong);
  volume.on("click", () => {
    volume.toggleClass("mute");
    const isMute = volume.hasClass("mute");

    if (!isMute) {
      volume.find("i").removeClass("icofont-ui-volume");
      volume.find("i").addClass("icofont-ui-mute");
      audio.muted = true;
    } else {
      volume.find("i").removeClass("icofont-ui-mute");
      volume.find("i").addClass("icofont-ui-volume");
      audio.muted = false;
    }
  });
});
