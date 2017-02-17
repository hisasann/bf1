const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
  console.log('onYouTubeIframeAPIReady');
  player = new YT.Player('player', {
    height: '480',
    width: '853',
    // videoId: 'XtvKnpuv_K0',
    playerVars : {
      "controls" : '0'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log('onPlayerReady');

  event.target.loadPlaylist({
    list: 'PLYthkkwBsWxdv3kh9l_KVxMFfhghlmllS',
    listType: 'playlist',
    index: 0,
    startSeconds: 0,
    suggestedQuality: 'large'
  });
  // event.target.playVideo();
}

function onPlayerStateChange(event) {
  console.log('onPlayerStateChange');
  if (event.data == YT.PlayerState.ENDED) {
    var ipc = require('electron').ipcRenderer;
    ipc.send('close');
  }
}

function stopVideo() {
  console.log('stopVideo');
  player.stopVideo();
}