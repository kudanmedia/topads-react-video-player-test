import React, { Component } from 'react';
import { Player, ControlBar, ReplayControl, ForwardControl, PlaybackRateMenuButton, BigPlayButton, LoadingSpinner } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";
import './App.css';

// function goFull() used to make the video fullscreen
const goFull = () => {
  const videoplayer = document.getElementById('root').getElementsByTagName('video');
  document.getElementById('root').getElementsByTagName('div')[0].classList.add("video-react-fullscreen"); //fallback for devices which doesnt support Fullscreen API
  if (videoplayer.fullscreenEnabled) {
    videoplayer.requestFullscreen();
  } else if (videoplayer.webkitFullscreenEnabled) {
    videoplayer.webkitRequestFullscreen();
  } else if (videoplayer.mozFullScreenEnabled) {
    videoplayer.mozRequestFullScreen();
  } else if (videoplayer.msFullscreenEnabled) {
    videoplayer.msRequestFullscreen();
  }
}

// function exitFull() used to make the video exit fullscreen
const exitFull = () => {
  const videoplayer = document.getElementById('root').getElementsByTagName('video');
  document.getElementById('root').getElementsByTagName('div')[0].classList.remove("video-react-fullscreen"); //fallback for devices which doesnt support Fullscreen API
  if (videoplayer.exitFullscreen) {
    videoplayer.exitFullscreen();
  } else if (videoplayer.webkitExitFullscreen) {
    videoplayer.webkitExitFullscreen();
  } else if (videoplayer.mozCancelFullScreen) {
    videoplayer.mozCancelFullScreen();
  } else if (videoplayer.msExitFullscreen) {
    videoplayer.msExitFullscreen();
  }
}

// function to handle change of screen orientation
function handleScreenOrientationChange() {
  if (window.screen.orientation.type === "landscape-primary") {
    console.log("landscape");
    goFull();
  } else if (window.screen.orientation.type === "portrait-primary") {
    console.log("portrait");
    exitFull();
  };
};

// Event listener for orientation change
window.screen.orientation.addEventListener("change", handleScreenOrientationChange); 

// Main App Component
export default class TopAdsVideoPlayer extends Component {
  componentDidMount() {
    this.player.playbackRate = 1;
    this.forceUpdate();
  }
  
  render() {
    return (
      <React.StrictMode>
      <Player
          ref={c => {
            this.player = c;
          }}
          autoPlay
          startTime={200}
          src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4"
          id={"topadsvideo"}
      >
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar autoHide={false}>
          <ReplayControl seconds={5} order={2.1} />
          <ForwardControl seconds={5} order={3.1} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={6.1} />
        </ControlBar>
        </Player>
        </React.StrictMode>
    );
  };
}